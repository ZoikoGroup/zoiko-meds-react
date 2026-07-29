import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  lookupAvailabilityAsync,
} from "@/lib/availability";

describe("Live Pharmacy Inventory API Integration (lib/availability.ts)", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it("falls back to local database when LIVE_INVENTORY_API_URL is unconfigured", async () => {
    delete process.env.LIVE_INVENTORY_API_URL;
    const result = await lookupAvailabilityAsync({ medicine: "paracetamol", region: "nakuru" });

    expect(result).not.toBeNull();
    expect(result?.medicine).toBe("PARACETAMOL");
    expect(result?.source).toBe("ZoikoAvail™");
  });

  it("fetches real-time stock when LIVE_INVENTORY_API_URL is configured", async () => {
    process.env.LIVE_INVENTORY_API_URL = "https://api.zoikomeds.com/v1/live-inventory";
    process.env.LIVE_INVENTORY_API_KEY = "test-secret-key";

    const mockLivePharmacies = [
      {
        id: 999,
        name: "Metro Central Pharmacy",
        address: "Kenyatta Ave 12",
        city: "Nairobi",
        phone: "+254 700 999 888",
        reportedAt: new Date().toISOString(),
        signalStrength: 0.98,
      },
      {
        id: 1000,
        name: "Express Meds Clinic",
        address: "Moi Ave 45",
        city: "Nairobi",
        phone: "+254 700 888 777",
        reportedAt: new Date().toISOString(),
        signalStrength: 0.95,
      },
    ];

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ pharmacies: mockLivePharmacies }),
    } as Response);

    const result = await lookupAvailabilityAsync({ medicine: "amoxicillin", region: "nairobi" });

    expect(result).not.toBeNull();
    expect(result?.source).toBe("ZoikoAvail™ Live Inventory API");
    expect(result?.stockingPharmacies).toBe(2);
    expect(result?.pharmacies[0].name).toBe("Metro Central Pharmacy");
  });

  it("falls back to local signal data if live API returns HTTP 500 error", async () => {
    process.env.LIVE_INVENTORY_API_URL = "https://api.zoikomeds.com/v1/live-inventory";

    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    const result = await lookupAvailabilityAsync({ medicine: "ibuprofen", region: "london" });

    // Must gracefully fall back to local signal data
    expect(result).not.toBeNull();
    expect(result?.source).toBe("ZoikoAvail™");
    expect(result?.medicine).toBe("IBUPROFEN");
  });

  it("falls back to local signal data if live API times out", async () => {
    process.env.LIVE_INVENTORY_API_URL = "https://api.zoikomeds.com/v1/live-inventory";
    process.env.LIVE_INVENTORY_TIMEOUT_MS = "50";

    global.fetch = vi.fn().mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 500))
    );

    const result = await lookupAvailabilityAsync({ medicine: "paracetamol", region: "nakuru" });

    expect(result).not.toBeNull();
    expect(result?.source).toBe("ZoikoAvail™");
  });
});
