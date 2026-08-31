import { NextRequest, NextResponse } from "next/server";
import { getRateLimitHeaders, rateLimit } from "@/lib/api/rate-limit";
import { lookupPharmacyMembership } from "@/lib/pharmacyMembership";
import { validateEmail } from "@/lib/validation";

export const dynamic = "force-dynamic";

/**
 * POST /internal/pharmacy-membership/check
 *
 * { email, pharmacyId } -> { linked: boolean } | { status: "unknown" }
 *
 * The membership question as a first-class endpoint, resolved from authoritative
 * platform data (see lib/pharmacyMembership). The claim route calls the resolver
 * in-process rather than looping back through here; this exists so the check is
 * addressable on its own — for operational verification, and for other clients.
 *
 * Access: this answers "does <email> belong to <pharmacy>?", which is an account
 * enumeration oracle if left open. It therefore requires
 * PHARMACY_MEMBERSHIP_CHECK_KEY as a bearer token and is rate limited. Without
 * that key configured the endpoint is disabled outright rather than public.
 */
export async function POST(req: NextRequest) {
  try {
    const expectedKey = process.env.PHARMACY_MEMBERSHIP_CHECK_KEY;
    if (!expectedKey) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This endpoint is disabled. Set PHARMACY_MEMBERSHIP_CHECK_KEY to enable it.",
        },
        { status: 404 },
      );
    }

    const presented = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
    if (!presented || presented !== expectedKey) {
      return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
    }

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rl = rateLimit(`membership-check:${clientIp}`, 30, 60000);
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many requests." },
        { status: 429, headers: getRateLimitHeaders(rl) },
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 },
      );
    }

    const email = String(body.email ?? "").trim().slice(0, 254);
    const pharmacyId = String(body.pharmacyId ?? "").trim().slice(0, 200);

    if (!validateEmail(email).isValid || !pharmacyId) {
      return NextResponse.json(
        { success: false, message: "A valid email and a pharmacyId are required." },
        { status: 400 },
      );
    }

    const membership = await lookupPharmacyMembership({ email, pharmacyId });

    return NextResponse.json({
      success: true,
      status: membership.status,
      // Absent rather than false when the answer is unknown, so a caller can
      // never read an unresolved lookup as a negative.
      ...(membership.status === "unknown" ? {} : { linked: membership.status === "linked" }),
      source: membership.source,
      detail: membership.detail,
      pharmacyId,
      resolvedPharmacyId: membership.resolvedPharmacyId ?? null,
    });
  } catch (err) {
    console.error("[pharmacy-membership/check] error:", err);
    return NextResponse.json(
      { success: false, message: "Membership check failed." },
      { status: 500 },
    );
  }
}
