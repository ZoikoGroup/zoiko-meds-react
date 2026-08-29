import { describe, it, expect, vi, beforeEach } from "vitest";

/**
 * The membership verdict must GATE the claim, not merely annotate it.
 *
 * The regression this locks down: the route computed
 * `requiresAdditionalVerification` and then fell through to saveSubmission +
 * dispatchFormEmails regardless, so a `not-linked` or `unknown` verdict still
 * emailed the submitter about a pharmacy they had no link to.
 */

const saveSubmission = vi.fn();
const dispatchFormEmails = vi.fn();
const isRegisteredPharmacy = vi.fn();
const lookupPharmacyMembership = vi.fn();

vi.mock("@/lib/db/submissionDb", () => ({ saveSubmission }));
vi.mock("@/lib/email/formMail", () => ({ dispatchFormEmails }));
vi.mock("@/lib/pharmacyDirectory", () => ({ isRegisteredPharmacy }));
vi.mock("@/lib/pharmacyMembership", () => ({ lookupPharmacyMembership }));
vi.mock("@/lib/email/requestTimezone", () => ({
  submissionTimeForRequest: () => ({ formatted: "now", zoneLabel: "UTC" }),
}));

const { POST } = await import("@/app/internal/pharmacy-claim/route");

function claim(email = "gdbdata3@gmail.com") {
  return new Request("http://localhost/internal/pharmacy-claim", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": `10.0.0.${Math.ceil(Math.random() * 250)}` },
    body: JSON.stringify({
      pharmacy: { id: "ph_real_1", name: "Zoiko Group Pharmacy", verified: true },
      workEmail: email,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;
}

beforeEach(() => {
  saveSubmission.mockReset().mockResolvedValue({ id: "sub_1", submittedAt: "now" });
  dispatchFormEmails.mockReset().mockResolvedValue({ confirmation: { success: true }, internal: {} });
  isRegisteredPharmacy.mockReset();
  lookupPharmacyMembership.mockReset();
});

describe("registered pharmacy", () => {
  beforeEach(() => isRegisteredPharmacy.mockResolvedValue(true));

  it("allows the claim when the email is linked", async () => {
    lookupPharmacyMembership.mockResolvedValue({ status: "linked", detail: "ok" });

    const res = await POST(claim());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.requiresAdditionalVerification).toBe(false);
    expect(saveSubmission).toHaveBeenCalledTimes(1);
    expect(dispatchFormEmails).toHaveBeenCalledTimes(1);
  });

  it("blocks an unlinked email: no email, no record, exact message", async () => {
    lookupPharmacyMembership.mockResolvedValue({ status: "not-linked", detail: "no" });

    const res = await POST(claim());
    const body = await res.json();

    expect(res.status).toBe(403);
    expect(body.errors.workEmail).toBe(
      "This email is not associated with the selected pharmacy. Please use the email linked to your pharmacy account or contact support.",
    );
    expect(saveSubmission).not.toHaveBeenCalled();
    expect(dispatchFormEmails).not.toHaveBeenCalled();
  });

  it("fails safe on an unknown verdict: no email, no record, exact message", async () => {
    lookupPharmacyMembership.mockResolvedValue({ status: "unknown", detail: "unreachable" });

    const res = await POST(claim());
    const body = await res.json();

    expect(res.status).toBe(503);
    expect(body.errors.workEmail).toBe(
      "We couldn't verify that this email is associated with the selected pharmacy. Please try again or contact support.",
    );
    expect(saveSubmission).not.toHaveBeenCalled();
    expect(dispatchFormEmails).not.toHaveBeenCalled();
  });
});

describe("unclaimed pharmacy", () => {
  it("allows a brand-new email, flagged for extra verification", async () => {
    isRegisteredPharmacy.mockResolvedValue(false);
    lookupPharmacyMembership.mockResolvedValue({ status: "not-linked", detail: "no" });

    const res = await POST(claim("brand-new@gmail.com"));
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.requiresAdditionalVerification).toBe(true);
    expect(dispatchFormEmails).toHaveBeenCalledTimes(1);
  });
});

describe("directory unreachable", () => {
  it("refuses rather than assuming the pharmacy is unclaimed", async () => {
    isRegisteredPharmacy.mockResolvedValue(null);
    lookupPharmacyMembership.mockResolvedValue({ status: "linked", detail: "ok" });

    const res = await POST(claim());

    expect(res.status).toBe(503);
    expect(saveSubmission).not.toHaveBeenCalled();
    expect(dispatchFormEmails).not.toHaveBeenCalled();
  });
});
