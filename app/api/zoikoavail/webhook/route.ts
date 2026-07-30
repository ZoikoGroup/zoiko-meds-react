import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getRateLimitHeaders } from "@/lib/api/rate-limit";
import { updatePharmacyInventorySignal, type WebhookInventoryPayload } from "@/lib/availability";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const rl = rateLimit(`zoikoavail-webhook:${clientIp}`, 60, 60000);

    if (!rl.allowed) {
      return NextResponse.json(
        { success: false, error: "rate_limit_exceeded" },
        { status: 429, headers: getRateLimitHeaders(rl) }
      );
    }

    // Webhook authentication check
    const expectedSecret = process.env.ZOIKO_WEBHOOK_SECRET || "zoiko_live_webhook_secret_key";
    const authHeader = req.headers.get("authorization") ?? "";
    const customHeaderSecret = req.headers.get("x-zoiko-secret") ?? "";

    const tokenFromAuth = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : authHeader.trim();
    const isAuthorized = tokenFromAuth === expectedSecret || customHeaderSecret === expectedSecret;

    if (!isAuthorized) {
      return NextResponse.json(
        { success: false, error: "unauthorized_webhook_access", detail: "Invalid or missing webhook authorization secret" },
        { status: 401 }
      );
    }

    let body: Partial<WebhookInventoryPayload>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ success: false, error: "invalid_json" }, { status: 400 });
    }

    // Input validations
    if (!body.medicine || typeof body.medicine !== "string" || !body.medicine.trim()) {
      return NextResponse.json({ success: false, error: "medicine_required" }, { status: 400 });
    }
    if (!body.city || typeof body.city !== "string" || !body.city.trim()) {
      return NextResponse.json({ success: false, error: "city_required" }, { status: 400 });
    }
    if (!body.pharmacyId || typeof body.pharmacyId !== "number") {
      return NextResponse.json({ success: false, error: "pharmacy_id_required" }, { status: 400 });
    }
    if (!body.pharmacyName || typeof body.pharmacyName !== "string") {
      return NextResponse.json({ success: false, error: "pharmacy_name_required" }, { status: 400 });
    }
    if (!body.status || !["in_stock", "limited", "out_of_stock"].includes(body.status)) {
      return NextResponse.json({ success: false, error: "invalid_status", detail: "status must be in_stock, limited, or out_of_stock" }, { status: 400 });
    }

    const result = updatePharmacyInventorySignal({
      pharmacyId: body.pharmacyId,
      pharmacyName: body.pharmacyName.trim(),
      address: body.address?.trim(),
      city: body.city.trim(),
      phone: body.phone?.trim(),
      medicine: body.medicine.trim(),
      status: body.status,
      quantity: body.quantity,
      reportedAt: body.reportedAt || new Date().toISOString(),
    });

    if (!result) {
      return NextResponse.json(
        { success: false, error: "unsupported_medicine", detail: `Medicine "${body.medicine}" could not be mapped to MediBase registry` },
        { status: 404 }
      );
    }

    const res = NextResponse.json({
      success: true,
      message: "Pharmacy inventory signal registered successfully",
      canonicalMedicine: result.canonicalMedicine.toUpperCase(),
      entry: result.entry,
      timestamp: new Date().toISOString(),
    });

    const rlHeaders = getRateLimitHeaders(rl);
    for (const [k, v] of Object.entries(rlHeaders)) {
      res.headers.set(k, v);
    }
    return res;
  } catch (err) {
    console.error("[ZoikoAvail Webhook] Error processing incoming payload:", err);
    return NextResponse.json({ success: false, error: "internal_server_error" }, { status: 500 });
  }
}
