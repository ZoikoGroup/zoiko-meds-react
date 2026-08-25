import { NextRequest, NextResponse } from "next/server";
import { getRateLimitHeaders, rateLimit } from "@/lib/api/rate-limit";
import { searchPharmaciesForClaim } from "@/lib/pharmacyDirectory";

export const dynamic = "force-dynamic";

/** Shown whenever the sources answered and nothing matched. */
const NO_MATCH_MESSAGE =
  "We couldn't find a matching pharmacy. Please check the pharmacy name and location and try again.";

/** Longest input worth searching on — also caps what we forward to Places. */
const MAX_FIELD_LENGTH = 120;

/** Trimmed, length-capped string from an untrusted body field. */
function field(value: unknown): string {
  if (typeof value === "string") return value.trim().slice(0, MAX_FIELD_LENGTH);
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

/**
 * POST /internal/pharmacy-claim/search
 *
 * Looks the submitted pharmacy up in the real sources (verified directory +
 * Google Places). Responds with the records that actually matched — never a
 * synthesised one — so the form can only report a match when one exists.
 *
 * Rate limited because each call fans out to the platform directory, the
 * geocoder, and Google Places.
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

    const name = field(body.name);
    const location = field(body.location);

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Enter a pharmacy name.";
    else if (name.length < 3) errors.name = "Enter at least 3 characters of the pharmacy name.";
    else if (!/[a-zA-Z]/.test(name)) errors.name = "Enter the pharmacy's name, not a number.";
    if (!location) errors.location = "Enter a city, ZIP code, or postcode.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    /*
     * Budget the outbound fan-out, not the request: checked only once the input
     * is worth searching, so a visitor fixing a typo is never rate limited.
     */
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rl = rateLimit(`pharmacy-claim-search:${clientIp}`, 30, 60000);
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, message: "Too many searches. Please wait a moment and try again." },
        { status: 429, headers: getRateLimitHeaders(rl) },
      );
    }

    const outcome = await searchPharmaciesForClaim({ name, location });

    switch (outcome.status) {
      case "name-too-vague":
        return NextResponse.json(
          {
            success: false,
            errors: {
              name: "Enter the pharmacy's full name, including the part unique to it.",
            },
          },
          { status: 400 },
        );

      case "invalid-location":
        return NextResponse.json(
          {
            success: false,
            errors: { location: "Enter a valid city, ZIP code, or postcode." },
          },
          { status: 400 },
        );

      case "sources-unavailable":
        return NextResponse.json(
          {
            success: false,
            message: "The pharmacy directory is temporarily unavailable. Please try again shortly.",
          },
          { status: 503 },
        );

      case "no-match":
        return NextResponse.json({
          success: true,
          matched: false,
          matches: [],
          message: NO_MATCH_MESSAGE,
        });

      case "matched":
        return NextResponse.json({
          success: true,
          matched: true,
          matches: outcome.matches,
          locationLabel: outcome.locationLabel,
        });
    }
  } catch (err) {
    console.error("[pharmacy-claim/search] lookup error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong while searching. Please try again." },
      { status: 500 },
    );
  }
}
