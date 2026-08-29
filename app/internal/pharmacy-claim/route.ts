import { NextRequest, NextResponse } from "next/server";
import { getRateLimitHeaders, rateLimit } from "@/lib/api/rate-limit";
import { saveSubmission } from "@/lib/db/submissionDb";
import { dispatchFormEmails } from "@/lib/email/formMail";
import { submissionTimeForRequest } from "@/lib/email/requestTimezone";
import { isRegisteredPharmacy } from "@/lib/pharmacyDirectory";
import { lookupPharmacyMembership } from "@/lib/pharmacyMembership";
import { isConsumerEmailDomain, validateEmail } from "@/lib/validation";

export const dynamic = "force-dynamic";

/** Caps what gets persisted and rendered into an email. */
const MAX_FIELD_LENGTH = 200;

/** Trimmed, length-capped string from an untrusted body field. */
function field(value: unknown): string {
  if (typeof value === "string") return value.trim().slice(0, MAX_FIELD_LENGTH);
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

/**
 * POST /internal/pharmacy-claim
 *
 * Second step of "Claim or verify your pharmacy": the visitor has picked one of
 * the real records the search returned, and now supplies a work email. The
 * request is stored and both emails are dispatched.
 *
 * `emailSent` reports whether the confirmation actually reached the submitter —
 * the form only says "Check your inbox" when it did.
 *
 * Rate limited: this route sends mail to a caller-supplied address.
 */
export async function POST(req: NextRequest) {
  const pathname = (req as NextRequest).nextUrl?.pathname ?? (req.url ? new URL(req.url).pathname : "");
  if (pathname === "/internal/pharmacy-claim/search" || pathname.endsWith("/pharmacy-claim/search")) {
    const { POST: searchPOST } = await import("./search/route");
    return searchPOST(req);
  }

  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 },
      );
    }

    const pharmacy = (body.pharmacy ?? {}) as Record<string, unknown>;
    const pharmacyId = field(pharmacy.id);
    const pharmacyName = field(pharmacy.name);
    const workEmail = field(body.workEmail);
    const fullName = field(body.fullName);

    // The pharmacy must come from a search result, not from free-form input.
    if (!pharmacyId || !pharmacyName) {
      return NextResponse.json(
        { success: false, message: "Select the pharmacy you want to claim, then try again." },
        { status: 400 },
      );
    }

    /*
     * Format only. The address's domain is deliberately NOT a gate: a
     * pharmacist at an independent pharmacy routinely has no company domain,
     * and many existing ZoikoMeds users are registered on Gmail or Outlook.
     * How much corroboration the claim needs is decided below instead.
     */
    const emailCheck = validateEmail(workEmail);
    if (!emailCheck.isValid) {
      return NextResponse.json(
        { success: false, errors: { workEmail: emailCheck.error } },
        { status: 400 },
      );
    }

    /*
     * Budget the side effect, not the request: this is checked only once the
     * submission is known-good, so a visitor correcting a typo is never told
     * they are rate limited. A flood of invalid bodies costs a JSON parse.
     */
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rl = rateLimit(`pharmacy-claim:${clientIp}`, 5, 60000);
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please wait a moment and try again." },
        { status: 429, headers: getRateLimitHeaders(rl) },
      );
    }

    /*
     * Is this an existing registered pharmacy? Asked of the directory rather
     * than read off the submitted `verified` flag, which comes from the browser
     * — otherwise a caller could label a registered pharmacy "unclaimed" and
     * walk straight past the membership requirement below.
     */
    const registered = await isRegisteredPharmacy(pharmacyId);
    if (registered === null) {
      return NextResponse.json(
        {
          success: false,
          errors: {
            workEmail:
              "We couldn't verify that this email is associated with the selected pharmacy. Please try again or contact support.",
          },
        },
        { status: 503 },
      );
    }

    const membership = await lookupPharmacyMembership({ email: workEmail, pharmacyId });
    const consumerDomain = isConsumerEmailDomain(workEmail);

    // Ids and verdict only — never the address, never a credential.
    console.log(
      `[pharmacy-claim] selectedPharmacyId=${pharmacyId} registered=${registered} ` +
        `resolvedPharmacyId=${membership.resolvedPharmacyId ?? "none"} ` +
        `membership=${membership.status} via=${membership.source}`,
    );

    /*
     * An already-registered pharmacy has account holders, so the claim must come
     * from one of them. Both refusals happen here — before any record is saved
     * and before any mail is dispatched — so a rejected claim leaves no trace
     * and sends nothing.
     *
     * `unknown` is refused too: treating an unverifiable link as permission
     * would make an unreachable lookup a way past the check.
     */
    if (registered) {
      if (membership.status === "not-linked") {
        return NextResponse.json(
          {
            success: false,
            errors: {
              workEmail:
                "This email is not associated with the selected pharmacy. Please use the email linked to your pharmacy account or contact support.",
            },
          },
          { status: 403 },
        );
      }
      if (membership.status === "unknown") {
        return NextResponse.json(
          {
            success: false,
            errors: {
              workEmail:
                "We couldn't verify that this email is associated with the selected pharmacy. Please try again or contact support.",
            },
          },
          { status: 503 },
        );
      }
    }

    /*
     * Only an unclaimed pharmacy may be claimed from an address with no
     * established link, and that request still carries the flag telling the
     * reviewing team to confirm authority before granting anything.
     */
    const requiresAdditionalVerification = membership.status !== "linked";

    const isVerified = registered;
    const address = field(pharmacy.address);
    const searchedName = field(body.searchedName);
    const searchedLocation = field(body.searchedLocation);

    const record = await saveSubmission({
      type: "VERIFIED_NETWORK",
      title: `Pharmacy Claim Request: ${pharmacyName}`,
      fullName: fullName || pharmacyName,
      email: workEmail,
      organization: pharmacyName,
      payload: {
        pharmacyId,
        pharmacyName,
        pharmacyAddress: address,
        pharmacySource: field(pharmacy.source) || "unknown",
        registeredPharmacy: registered,
        searchedName,
        searchedLocation,
        membershipStatus: membership.status,
        membershipDetail: membership.detail,
        membershipSource: membership.source,
        membershipResolvedPharmacyId: membership.resolvedPharmacyId ?? null,
        consumerDomain,
        requiresAdditionalVerification,
      },
    });

    const mail = await dispatchFormEmails({
      formName: "Pharmacy Claim Request",
      submittedAt: submissionTimeForRequest(req, body),
      userEmail: workEmail,
      userName: fullName,
      subject: `Pharmacy Claim Request: ${pharmacyName}`,
      submission: [
        { label: "Pharmacy", value: pharmacyName },
        { label: "Pharmacy Address", value: address || "Not provided" },
        { label: "Record Id", value: pharmacyId },
        {
          label: "Record Source",
          value: isVerified
            ? "ZoikoMeds directory (registered)"
            : "Off-platform / unclaimed",
        },
        { label: "Requester", value: fullName || "Not provided" },
        { label: "Work Email", value: workEmail },
        { label: "Searched Name", value: searchedName || "Not provided" },
        { label: "Searched Location", value: searchedLocation || "Not provided" },
        {
          label: "Existing User On Pharmacy",
          value:
            membership.status === "linked"
              ? "Yes — confirmed existing user"
              : membership.status === "not-linked"
                ? `No — not an existing user (${membership.detail})`
                : `Unconfirmed (${membership.detail})`,
        },
        { label: "Address Type", value: consumerDomain ? "Consumer mailbox" : "Organisation domain" },
        {
          label: "Verification Required",
          value: requiresAdditionalVerification
            ? "YES — confirm authority before granting any control"
            : "Existing linked user",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      id: record.id,
      submittedAt: record.submittedAt,
      // Only true when the message to this address was actually accepted.
      emailSent: Boolean(mail.confirmation?.success),
      // Informational: the claim is a request either way, never a grant.
      requiresAdditionalVerification,
    });
  } catch (err) {
    console.error("[pharmacy-claim] POST error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
