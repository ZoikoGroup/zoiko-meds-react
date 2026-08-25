import { NextRequest, NextResponse } from "next/server";
import { getRateLimitHeaders, rateLimit } from "@/lib/api/rate-limit";
import { saveSubmission } from "@/lib/db/submissionDb";
import { dispatchFormEmails } from "@/lib/email/formMail";
import { submissionTimeForRequest } from "@/lib/email/requestTimezone";
import { validateWorkEmail } from "@/lib/validation";

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

    const emailCheck = validateWorkEmail(workEmail);
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

    const isVerified = pharmacy.verified === true;
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
        alreadyVerified: isVerified,
        searchedName,
        searchedLocation,
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
          value: isVerified ? "ZoikoMeds verified directory" : "Google Places (unclaimed)",
        },
        { label: "Requester", value: fullName || "Not provided" },
        { label: "Work Email", value: workEmail },
        { label: "Searched Name", value: searchedName || "Not provided" },
        { label: "Searched Location", value: searchedLocation || "Not provided" },
      ],
    });

    return NextResponse.json({
      success: true,
      id: record.id,
      submittedAt: record.submittedAt,
      // Only true when the message to this address was actually accepted.
      emailSent: Boolean(mail.confirmation?.success),
    });
  } catch (err) {
    console.error("[pharmacy-claim] POST error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
