import { describe, it, expect, beforeEach } from "vitest";
import { NextRequest } from "next/server";
import { POST as webhookPOST } from "@/app/api/zoikoavail/webhook/route";
import { POST as zoikoavailPOST, GET as zoikoavailGET } from "@/app/api/zoikoavail/route";
import { clearLiveSignalStore } from "@/lib/availability";

describe("Real Pharmacy Webhook & Live Signals (/api/zoikoavail/webhook)", () => {
  beforeEach(() => {
    clearLiveSignalStore();
    process.env.ZOIKO_WEBHOOK_SECRET = "test_webhook_secret_123";
  });

  it("rejects unauthorized webhook requests", async () => {
    const req = new NextRequest("http://localhost:3000/api/zoikoavail/webhook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pharmacyId: 999,
        pharmacyName: "Test Webhook Chemist",
        city: "nairobi",
        medicine: "paracetamol",
        status: "in_stock",
      }),
    });

    const res = await webhookPOST(req);
    expect(res.status).toBe(401);

    const data = await res.json();
    expect(data.success).toBe(false);
    expect(data.error).toBe("unauthorized_webhook_access");
  });

  it("accepts authorized webhook request and registers real-time inventory signal", async () => {
    const req = new NextRequest("http://localhost:3000/api/zoikoavail/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer test_webhook_secret_123",
      },
      body: JSON.stringify({
        pharmacyId: 888,
        pharmacyName: "Apex Live Pharmacy",
        address: "Kenyatta Ave, Nairobi",
        city: "nairobi",
        phone: "+254 700 999888",
        medicine: "amoxicillin",
        status: "in_stock",
        quantity: 150,
      }),
    });

    const res = await webhookPOST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.canonicalMedicine).toBe("AMOXICILLIN");
    expect(data.entry.pharmacyId).toBe(888);
    expect(data.entry.name).toBe("Apex Live Pharmacy");
  });

  it("reflects incoming webhook signals in /api/zoikoavail queries immediately", async () => {
    // 1. Post live webhook update
    const webhookReq = new NextRequest("http://localhost:3000/api/zoikoavail/webhook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer test_webhook_secret_123",
      },
      body: JSON.stringify({
        pharmacyId: 777,
        pharmacyName: "Metro Care Pharmacy",
        address: "5th Ave, Nairobi",
        city: "nairobi",
        medicine: "metformin",
        status: "in_stock",
      }),
    });
    const webhookRes = await webhookPOST(webhookReq);
    expect(webhookRes.status).toBe(200);

    // 2. Query /api/zoikoavail for Metformin in Nairobi
    const queryReq = new NextRequest("http://localhost:3000/api/zoikoavail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        medicine: "metformin",
        region: "nairobi",
      }),
    });

    const queryRes = await zoikoavailPOST(queryReq);
    expect(queryRes.status).toBe(200);

    const queryData = await queryRes.json();
    expect(queryData.success).toBe(true);
    expect(queryData.data.medicine).toBe("METFORMIN");

    const foundPharmacy = queryData.data.pharmacies.find((p: { id: number }) => p.id === 777);
    expect(foundPharmacy).toBeDefined();
    expect(foundPharmacy.name).toBe("Metro Care Pharmacy");
  });

  it("supports GET method on /api/zoikoavail", async () => {
    const getReq = new NextRequest("http://localhost:3000/api/zoikoavail?medicine=ibuprofen&region=london", {
      method: "GET",
    });

    const getRes = await zoikoavailGET(getReq);
    expect(getRes.status).toBe(200);

    const data = await getRes.json();
    expect(data.success).toBe(true);
    expect(data.data.medicine).toBe("IBUPROFEN");
    expect(data.data.webhookSupported).toBe(true);
  });
});
