import { describe, it, expect } from "vitest";
import { validateAvailabilityPayload } from "@/components/zoi/outputValidator";
import type { AvailabilityPayload } from "@/components/zoi/types";

describe("outputValidator", () => {
  it("passes valid payload", () => {
    const payload: AvailabilityPayload = {
      medicine: "PARACETAMOL",
      region: "Nakuru",
      confidence: "high",
      cardState: "available",
      stockingPharmacies: 5,
      timestamp: "10:30 AM EAT",
      source: "ZoikoAvail\u2122",
    };
    const result = validateAvailabilityPayload(payload);
    expect(result.valid).toBe(true);
  });

  it("rejects payload with missing medicine", () => {
    const payload = {
      region: "Nakuru",
      confidence: "high",
      cardState: "available",
      stockingPharmacies: 5,
      timestamp: "10:30 AM EAT",
      source: "ZoikoAvail\u2122",
    };
    const result = validateAvailabilityPayload(payload as AvailabilityPayload);
    expect(result.valid).toBe(false);
  });

  it("rejects payload with invalid confidence tier", () => {
    const payload: AvailabilityPayload = {
      medicine: "PARACETAMOL",
      region: "Nakuru",
      confidence: "extreme" as "high",
      cardState: "available",
      stockingPharmacies: 5,
      timestamp: "10:30 AM EAT",
      source: "ZoikoAvail\u2122",
    };
    const result = validateAvailabilityPayload(payload);
    expect(result.valid).toBe(false);
  });

  it("rejects payload with invalid cardState", () => {
    const payload: AvailabilityPayload = {
      medicine: "PARACETAMOL",
      region: "Nakuru",
      confidence: "high",
      cardState: "magical" as "available",
      stockingPharmacies: 5,
      timestamp: "10:30 AM EAT",
      source: "ZoikoAvail\u2122",
    };
    const result = validateAvailabilityPayload(payload);
    expect(result.valid).toBe(false);
  });

  it("rejects null payload", () => {
    const result = validateAvailabilityPayload(null as unknown as AvailabilityPayload);
    expect(result.valid).toBe(false);
  });

  it("rejects undefined payload", () => {
    const result = validateAvailabilityPayload(undefined as unknown as AvailabilityPayload);
    expect(result.valid).toBe(false);
  });

  it("accepts all valid confidence tiers", () => {
    for (const tier of ["high", "moderate", "low"] as const) {
      for (const state of ["available", "limited", "unavailable", "insufficient-signal", "stale-data"] as const) {
        const payload: AvailabilityPayload = {
          medicine: "TEST",
          region: "Nairobi",
          confidence: tier,
          cardState: state,
          stockingPharmacies: 3,
          timestamp: "10:30 AM EAT",
          source: "ZoikoAvail\u2122",
        };
        const result = validateAvailabilityPayload(payload);
        expect(result.valid).toBe(true);
      }
    }
  });
});
