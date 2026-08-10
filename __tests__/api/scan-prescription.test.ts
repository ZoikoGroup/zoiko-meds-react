import { describe, it, expect } from "vitest";
import { NextRequest } from "next/server";
import { POST, getDynamicMedsForFile } from "@/app/internal/medicine/scan/route";

describe("Prescription Scan API (/internal/medicine/scan)", () => {
  it("rejects request if no file is uploaded", async () => {
    const formData = new FormData();
    const req = new NextRequest("http://localhost:3000/internal/medicine/scan", {
      method: "POST",
      body: formData,
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
    const json = await res.json();
    expect(json.success).toBe(false);
    expect(json.error).toContain("No file uploaded");
  });

  it("extracts Ibuprofen, Naproxen Sodium, and Acetaminophen from PDF stream text", () => {
    const pdfContent = "%PDF-1.4\nBT\n(Ibuprofen) Tj\n(Naproxen Sodium) Tj\n(Acetaminophen) Tj\nET";
    const buffer = Buffer.from(pdfContent);
    const meds = getDynamicMedsForFile("pain_relievers.pdf", buffer.length, buffer, pdfContent);
    expect(meds).toContain("Ibuprofen 400mg");
    expect(meds).toContain("Naproxen Sodium 500mg");
    expect(meds).toContain("Paracetamol 650mg");
  });

  it("extracts medicine from filename keyword via getDynamicMedsForFile (e.g. Dolo 650.pdf)", () => {
    const fileName = "Dolo 650.pdf";
    const buffer = Buffer.from("Prescription containing Dolo 650");
    const meds = getDynamicMedsForFile(fileName, buffer.length, buffer, buffer.toString("utf-8"));
    expect(meds).toContain("Dolo 650mg");
  });

  it("extracts brand medicine from file content via getDynamicMedsForFile (e.g. Calpol 250)", () => {
    const fileName = "prescription_scan.pdf";
    const text = "Rx: Calpol 250/5 Syrup 5ml TDS for 3 days";
    const buffer = Buffer.from(text);
    const meds = getDynamicMedsForFile(fileName, buffer.length, buffer, text);
    expect(meds).toContain("Calpol 250mg Syrup");
  });

  it("extracts pediatric brand medicines (Delcon, Levolin, Meftal-P)", () => {
    const text = "Adv: Syp Delcon 2.5ml, Syp Levolin 2ml, Syp Meftal-P 5ml";
    const buffer = Buffer.from(text);
    const meds = getDynamicMedsForFile("scan.txt", buffer.length, buffer, text);
    expect(meds).toContain("Delcon Syrup");
    expect(meds).toContain("Levolin Syrup");
    expect(meds).toContain("Meftal-P Syrup (100mg/5ml)");
  });

  it("returns fallback medicines array for image without explicit drug keywords when no Vision API key is set", () => {
    const buffer = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
    const meds = getDynamicMedsForFile("photo_123.png", buffer.length, buffer, "");
    expect(Array.isArray(meds)).toBe(true);
    expect(meds.length).toBeGreaterThan(0);
  });
});
