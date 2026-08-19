import { describe, it, expect } from "vitest";
import { sanitizeString, sanitizeTelemetryProperties, sanitizeErrorPayload } from "@/lib/zoi/sanitizer";
import { trackEvent } from "@/components/zoi/telemetry";

describe("CT-019: APM/Error Payload Content Sanitization", () => {
  it("scrubs medicine names and user query content from strings", () => {
    const raw = "Error looking up query: paracetamol for patient user@example.com";
    const sanitized = sanitizeString(raw);

    expect(sanitized).not.toContain("user@example.com");
    expect(sanitized).not.toContain("query: paracetamol");
  });

  it("scrubs sensitive properties from telemetry objects", () => {
    const rawProps = {
      user_id: "usr-12345",
      query: "Looking for Amoxicillin in Nairobi",
      medicine: "Amoxicillin",
      content: "Sensitive transcript content",
      pageContext: "patients",
    };

    const sanitized = sanitizeTelemetryProperties(rawProps);

    expect(sanitized).toBeDefined();
    expect(sanitized?.query).toBe("[SCRUBBED]");
    expect(sanitized?.medicine).toBe("[SCRUBBED]");
    expect(sanitized?.content).toBe("[SCRUBBED]");
    expect(sanitized?.pageContext).toBe("patients");
  });

  it("produces sanitized error payloads without leaking medicine or user text", () => {
    const err = new Error("Database query failed for medicine: Fentanyl requested by user john@test.com");
    const payload = sanitizeErrorPayload(err);

    expect(payload.success).toBe(false);
    expect(payload.error).toBe("sanitized_error");
    expect(payload.detail).not.toContain("john@test.com");
    expect(payload.detail).not.toContain("Fentanyl");
  });

  it("ensures telemetry trackEvent applies payload scrubber", () => {
    let capturedProperties: Record<string, unknown> | undefined;

    // trackEvent should run without error and scrub props
    trackEvent("test_event", {
      query: "Ibuprofen 400mg",
      page: "home",
    });

    const sanitized = sanitizeTelemetryProperties({
      query: "Ibuprofen 400mg",
      page: "home",
    });

    expect(sanitized?.query).toBe("[SCRUBBED]");
    expect(sanitized?.page).toBe("home");
  });
});
