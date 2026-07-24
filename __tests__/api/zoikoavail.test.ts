import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "@/app/api/zoikoavail/route";

async function postZoikoAvail(body: unknown) {
  const req = new NextRequest("http://localhost:3456/api/zoikoavail", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
  return POST(req);
}

describe("/api/zoikoavail", () => {
  it("returns 400 when medicine is missing", async () => {
    const res = await postZoikoAvail({ region: "Nakuru" });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toBe("medicine_required");
  });

  it("returns 404 for unknown medicine", async () => {
    const res = await postZoikoAvail({ medicine: "not-a-drug" });
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toBe("medicine_not_found");
  });

  it("returns 400 for invalid JSON", async () => {
    const res = await postZoikoAvail("not-json");
    expect(res.status).toBe(400);
  });

  it("returns availability for paracetamol in Nakuru", async () => {
    const res = await postZoikoAvail({ medicine: "paracetamol", region: "Nakuru" });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.medicine).toBe("PARACETAMOL");
    expect(json.data.region).toBe("Nakuru");
    expect(["high", "moderate", "low"]).toContain(json.data.confidence.tier);
    expect(json.data.stockingPharmacies).toBeGreaterThan(0);
    expect(json.data.source).toBe("ZoikoAvail\u2122");
  });

  it("returns nationwide availability for amoxicillin", async () => {
    const res = await postZoikoAvail({ medicine: "amoxicillin" });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.region).toBe("Kenya (nationwide)");
    expect(json.data.totalPharmacies).toBe(12);
  });

  it("resolves alias amoxil to amoxicillin", async () => {
    const res = await postZoikoAvail({ medicine: "amoxil", region: "Nairobi" });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.data.medicine).toBe("AMOXICILLIN");
  });

  it("returns 400 for unsupported region", async () => {
    const res = await postZoikoAvail({ medicine: "paracetamol", region: "Paris" });
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.error).toBe("region_not_supported");
  });

  it("returns X-RateLimit headers", async () => {
    const res = await postZoikoAvail({ medicine: "ibuprofen", region: "Kisumu" });
    expect(res.headers.has("X-RateLimit-Limit")).toBe(true);
    expect(res.headers.has("X-RateLimit-Remaining")).toBe(true);
  });

  it("computes confidence correctly", async () => {
    const res = await postZoikoAvail({ medicine: "aspirin", region: "Nairobi" });
    const json = await res.json();
    expect(json.data.confidence.tier).toBe("low");
    expect(json.data.cardState).toBe("limited");
  });

  it("returns pharmacies array", async () => {
    const res = await postZoikoAvail({ medicine: "dolo", region: "Eldoret" });
    const json = await res.json();
    expect(json.data.pharmacies).toBeInstanceOf(Array);
    expect(json.data.pharmacies.length).toBeGreaterThan(0);
    expect(json.data.pharmacies[0]).toHaveProperty("name");
    expect(json.data.pharmacies[0]).toHaveProperty("city");
    expect(json.data.pharmacies[0].city).toBe("Eldoret");
  });
});
