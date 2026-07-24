import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getRateLimitHeaders } from "@/lib/api/rate-limit";
import { successResponse, errorResponse, validateRequired } from "@/lib/api/helpers";
import { lookupAvailability, KNOW_MEDICINES, VALID_REGIONS, extractRegion } from "@/lib/availability";

export async function POST(req: NextRequest) {
  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rl = rateLimit(`zoikoavail:${clientIp}`, 30, 60000);
    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, error: "rate_limit_exceeded" },
        { status: 429, headers: getRateLimitHeaders(rl) }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return errorResponse("invalid_json", 400);
    }

    const missing = validateRequired(body, ["medicine"]);
    if (missing) {
      return errorResponse(`${missing}_required`, 400);
    }

    const rawMedicine = String(body.medicine).trim();
    if (!rawMedicine || rawMedicine.length > 100) {
      return errorResponse("medicine_invalid", 400);
    }

    const rawRegion = body.region ? String(body.region).trim() : undefined;
    if (rawRegion && rawRegion.toLowerCase() !== "any") {
      const isExtracted = extractRegion(rawRegion);
      if (!isExtracted && !VALID_REGIONS.includes(rawRegion.toLowerCase())) {
        return errorResponse("region_not_supported", 400);
      }
    }

    const result = lookupAvailability({ medicine: rawMedicine, region: rawRegion });

    if (!result) {
      return errorResponse("medicine_not_found", 404, {
        supported: KNOW_MEDICINES.slice(0, 10),
        hint: `Medicine "${rawMedicine}" not found in ZoikoAvail\u2122 database`,
      });
    }

    const res = successResponse(result);
    const rlHeaders = getRateLimitHeaders(rl);
    for (const [k, v] of Object.entries(rlHeaders)) {
      res.headers.set(k, v);
    }
    return res;
  } catch (err) {
    console.error("[ZoikoAvail] Internal error:", err);
    return errorResponse("internal_error", 500);
  }
}