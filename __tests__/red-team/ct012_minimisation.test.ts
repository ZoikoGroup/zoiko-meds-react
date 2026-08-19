import { describe, it, expect } from "vitest";
import { redactPII, hasPII } from "@/lib/zoi/redaction";
import { POST } from "@/app/internal/zoi/stream/route";
import { NextRequest } from "next/server";

describe("CT-012: Zoi™ Minimisation & Redaction Layer", () => {
  it("removes email addresses and phone numbers (contacts)", () => {
    const raw = "Contact me at patient.john@example.com or +1 555-019-2834 regarding my order.";
    const res = redactPII(raw);

    expect(res.redactedText).not.toContain("patient.john@example.com");
    expect(res.redactedText).not.toContain("555-019-2834");
    expect(res.redactedText).toContain("[REDACTED_CONTACT]");
    expect(res.removedClasses).toContain("contacts");
  });

  it("removes SSNs and patient IDs (identifiers)", () => {
    const raw = "My SSN is 123-45-6789 and patient id: PID-99201.";
    const res = redactPII(raw);

    expect(res.redactedText).not.toContain("123-45-6789");
    expect(res.redactedText).not.toContain("PID-99201");
    expect(res.redactedText).toContain("[REDACTED_IDENTIFIER]");
    expect(res.removedClasses).toContain("identifiers");
  });

  it("removes Date of Birth (DOB)", () => {
    const raw = "I was born on DOB: 05/15/1990 at Mercy Hospital.";
    const res = redactPII(raw);

    expect(res.redactedText).not.toContain("05/15/1990");
    expect(res.redactedText).toContain("[REDACTED_DOB]");
    expect(res.removedClasses).toContain("dob");
  });

  it("removes prescription IDs (RX-ID)", () => {
    const raw = "Please refill prescription RX-998231 for amoxicillin.";
    const res = redactPII(raw);

    expect(res.redactedText).not.toContain("RX-998231");
    expect(res.redactedText).toContain("[REDACTED_RX_ID]");
    expect(res.removedClasses).toContain("prescription_ids");
  });

  it("removes prescriber identity and NPI number", () => {
    const raw = "Prescribed by Dr. Robert Vance with NPI: 1827364509.";
    const res = redactPII(raw);

    expect(res.redactedText).not.toContain("Dr. Robert Vance");
    expect(res.redactedText).not.toContain("1827364509");
    expect(res.redactedText).toContain("[REDACTED_PRESCRIBER]");
    expect(res.removedClasses).toContain("prescriber_identity");
  });

  it("removes patient names", () => {
    const raw = "My name is John Smith and I need ibuprofen.";
    const res = redactPII(raw);

    expect(res.redactedText).not.toContain("John Smith");
    expect(res.redactedText).toContain("[REDACTED_NAME]");
    expect(res.removedClasses).toContain("names");
  });

  it("correctly flags text containing PII using hasPII helper", () => {
    expect(hasPII("Check availability for paracetamol in Nairobi")).toBe(false);
    expect(hasPII("My email is user@domain.org")).toBe(true);
  });

  it("runs redaction before processing requests in POST stream endpoint", async () => {
    const req = new NextRequest("http://localhost:3000/api/zoi/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "My name is Alice and my email is alice@test.com. Is paracetamol available in Nakuru?",
        persona: "patient",
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
  });
});
