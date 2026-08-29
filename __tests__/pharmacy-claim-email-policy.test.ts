import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { isConsumerEmailDomain, validateEmail } from "@/lib/validation";
import {
  lookupPharmacyMembership,
  membershipLookupConfigured,
  resetPlatformTokenCache,
} from "@/lib/pharmacyMembership";

/**
 * The claim flow must never reject an address for its domain: an independent
 * pharmacist often has no company mailbox, and many existing ZoikoMeds users
 * are registered on Gmail or Outlook. The domain only decides how much
 * corroboration the claim needs.
 */
describe("claim email policy", () => {
  it("accepts consumer-domain addresses as valid emails", () => {
    for (const email of [
      "gdbdata3@gmail.com",
      "manualtester2000@gmail.com",
      "someone@outlook.com",
      "person@yahoo.co.in",
    ]) {
      expect(validateEmail(email).isValid).toBe(true);
    }
  });

  it("still rejects malformed addresses", () => {
    for (const email of ["not-an-email", "a@b", "@gmail.com", "a b@c.com", ""]) {
      expect(validateEmail(email).isValid).toBe(false);
    }
  });

  it("flags consumer domains advisorily, without rejecting them", () => {
    expect(isConsumerEmailDomain("gdbdata3@gmail.com")).toBe(true);
    expect(isConsumerEmailDomain("someone@outlook.com")).toBe(true);
    expect(isConsumerEmailDomain("owner@riversidepharmacy.co.uk")).toBe(false);
    // Advisory only — the address is still a valid email either way.
    expect(validateEmail("gdbdata3@gmail.com").isValid).toBe(true);
  });
});

describe("pharmacy membership lookup", () => {
  const ORIGINAL = process.env.PHARMACY_MEMBERSHIP_LOOKUP_URL;

  afterEach(() => {
    if (ORIGINAL === undefined) delete process.env.PHARMACY_MEMBERSHIP_LOOKUP_URL;
    else process.env.PHARMACY_MEMBERSHIP_LOOKUP_URL = ORIGINAL;
    vi.unstubAllGlobals();
    resetPlatformTokenCache();
  });

  it("reports unknown - never a guess - when no lookup is configured", async () => {
    delete process.env.PHARMACY_MEMBERSHIP_LOOKUP_URL;
    delete process.env.PLATFORM_SERVICE_TOKEN;
    delete process.env.PLATFORM_SERVICE_EMAIL;
    delete process.env.PLATFORM_SERVICE_PASSWORD;
    expect(membershipLookupConfigured()).toBe(false);

    const result = await lookupPharmacyMembership({
      email: "gdbdata3@gmail.com",
      pharmacyId: "ph_1",
    });
    expect(result.status).toBe("unknown");
  });

  describe("with a lookup configured", () => {
    beforeEach(() => {
      process.env.PHARMACY_MEMBERSHIP_LOOKUP_URL = "https://internal.example/membership";
    });

    it("confirms an existing linked user on a consumer domain", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({ ok: true, json: async () => ({ linked: true }) }),
      );
      const result = await lookupPharmacyMembership({
        email: "gdbdata3@gmail.com",
        pharmacyId: "ph_1",
      });
      expect(result.status).toBe("linked");
    });

    it("reports a brand-new address as not linked", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({ ok: true, json: async () => ({ linked: false }) }),
      );
      const result = await lookupPharmacyMembership({
        email: "brand-new@gmail.com",
        pharmacyId: "ph_1",
      });
      expect(result.status).toBe("not-linked");
    });

    it("degrades to unknown when the lookup fails, rather than assuming", async () => {
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
      const result = await lookupPharmacyMembership({
        email: "gdbdata3@gmail.com",
        pharmacyId: "ph_1",
      });
      expect(result.status).toBe("unknown");
    });

    it("degrades to unknown on an unreadable verdict", async () => {
      vi.stubGlobal(
        "fetch",
        vi.fn().mockResolvedValue({ ok: true, json: async () => ({ maybe: "?" }) }),
      );
      const result = await lookupPharmacyMembership({
        email: "gdbdata3@gmail.com",
        pharmacyId: "ph_1",
      });
      expect(result.status).toBe("unknown");
    });
  });
});
