/**
 * Form routes and their email side effects.
 *
 * The contract each route must keep: validate, persist, then send two emails
 * whose failure cannot cost the visitor their submission.
 *
 * @vitest-environment node
 *
 * These are server handlers; jsdom's Request/Response differ from Next's.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/** Records handed to the store. */
const saved: Array<Record<string, unknown>> = [];
vi.mock("@/lib/db/submissionDb", () => ({
  saveSubmission: vi.fn(async (data: Record<string, unknown>) => {
    saved.push(data);
    return { id: `sub_${saved.length}`, submittedAt: new Date().toISOString(), ...data };
  }),
}));

vi.mock("@/lib/db/verifiedNetworkDb", () => ({
  saveVerifiedNetworkRegistration: vi.fn(async (data: Record<string, unknown>) => {
    saved.push(data);
    return { id: `vn_${saved.length}`, submittedAt: new Date().toISOString(), ...data };
  }),
}));

/** Messages nodemailer was asked to send. */
const sent: Array<Record<string, string>> = [];
const sendMail = vi.fn(async (options: Record<string, string>) => {
  sent.push(options);
  return { messageId: `msg_${sent.length}` };
});
vi.mock("nodemailer", () => ({
  default: { createTransport: () => ({ sendMail }) },
}));

const { POST: contactPost } = await import("@/app/internal/contact/route");
const { POST: healthSystemsPost } = await import("@/app/internal/health-systems/route");
const { POST: salesPost } = await import("@/app/internal/talk-to-sales/route");
const { resetTransportForTesting } = await import("@/lib/email/transport");

async function post(
  handler: (req: never) => Promise<Response>,
  path: string,
  body: unknown,
  cookie?: string,
) {
  const { NextRequest } = await import("next/server");
  const req = new NextRequest(`http://localhost/internal/${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify(body),
  });
  const res = await handler(req as never);
  return { status: res.status, json: await res.json() };
}

const CONTACT_BODY = {
  name: "Naveen",
  email: "naveen@example.com",
  subject: "Partnership",
  organization: "Example Health",
  message: "We would like to integrate.",
};

beforeEach(() => {
  saved.length = 0;
  sent.length = 0;
  sendMail.mockClear();
  sendMail.mockImplementation(async (options: Record<string, string>) => {
    sent.push(options);
    return { messageId: `msg_${sent.length}` };
  });
  resetTransportForTesting();
  vi.stubEnv("SMTP_HOST", "smtp.example.com");
  vi.stubEnv("SMTP_PORT", "465");
  vi.stubEnv("SMTP_USER", "info@zoikomeds.com");
  vi.stubEnv("SMTP_PASSWORD", "top-secret-value");
});

afterEach(() => {
  vi.unstubAllEnvs();
  resetTransportForTesting();
});

describe("a successful submission", () => {
  it("saves the record and sends both emails", async () => {
    const { status, json } = await post(contactPost, "contact", CONTACT_BODY);

    expect(status).toBe(200);
    expect(json.success).toBe(true);
    expect(saved).toHaveLength(1);
    expect(sent.map((m) => m.to).sort()).toEqual(["info@zoikomeds.com", "naveen@example.com"]);
  });

  it("sends the confirmation to the exact address submitted", async () => {
    await post(contactPost, "contact", { ...CONTACT_BODY, email: "someone.else+tag@other.example" });

    expect(sent.some((m) => m.to === "someone.else+tag@other.example")).toBe(true);
  });

  it("keeps the internal recipient fixed regardless of the payload", async () => {
    await post(contactPost, "contact", {
      ...CONTACT_BODY,
      recipient: "attacker@evil.test",
      to: "attacker@evil.test",
      SMTP_HOST: "smtp.evil.test",
    });

    expect(sent.some((m) => m.to === "info@zoikomeds.com")).toBe(true);
    expect(sent.some((m) => m.to?.includes("evil.test"))).toBe(false);
  });

  it("works the same way on a briefing route", async () => {
    const { status, json } = await post(healthSystemsPost, "health-systems", {
      fullName: "Asha Menon",
      workEmail: "asha@hospital.example",
      organization: "City Hospital",
      note: "Interested in a pilot.",
    });

    expect(status).toBe(200);
    expect(json.success).toBe(true);
    expect(sent.map((m) => m.to).sort()).toEqual(["asha@hospital.example", "info@zoikomeds.com"]);
  });

  it("works the same way on the sales route", async () => {
    const { status } = await post(salesPost, "talk-to-sales", {
      fullName: "Ravi Kumar",
      workEmail: "ravi@pharma.example",
      orgName: "Pharma Ltd",
      primaryReason: "Pricing",
    });

    expect(status).toBe(200);
    expect(sent).toHaveLength(2);
  });
});

describe("validation", () => {
  it("rejects an invalid email before saving or sending", async () => {
    const { status, json } = await post(contactPost, "contact", {
      ...CONTACT_BODY,
      email: "not-an-email",
    });

    expect(status).toBe(400);
    expect(json.success).toBe(false);
    expect(saved).toHaveLength(0);
    expect(sent).toHaveLength(0);
  });

  it("rejects a missing required field", async () => {
    const { status } = await post(contactPost, "contact", { ...CONTACT_BODY, message: "" });

    expect(status).toBe(400);
    expect(sent).toHaveLength(0);
  });
});

describe("SMTP failure must not cost the submission", () => {
  it("returns success when both emails fail", async () => {
    sendMail.mockRejectedValue(new Error("ECONNREFUSED smtp.example.com:465"));

    const { status, json } = await post(contactPost, "contact", CONTACT_BODY);

    expect(status).toBe(200);
    expect(json.success).toBe(true);
    // The record is what matters, and it was stored.
    expect(saved).toHaveLength(1);
  });

  it("returns success when SMTP is not configured at all", async () => {
    vi.stubEnv("SMTP_HOST", "");
    vi.stubEnv("SMTP_USER", "");
    vi.stubEnv("SMTP_PASSWORD", "");
    vi.stubEnv("NODE_ENV", "production");
    resetTransportForTesting();

    const { status, json } = await post(contactPost, "contact", CONTACT_BODY);

    expect(status).toBe(200);
    expect(json.success).toBe(true);
    expect(saved).toHaveLength(1);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("returns success on a briefing route when mail fails", async () => {
    sendMail.mockRejectedValue(new Error("535 authentication failed"));

    const { status, json } = await post(healthSystemsPost, "health-systems", {
      fullName: "Asha Menon",
      workEmail: "asha@hospital.example",
      organization: "City Hospital",
    });

    expect(status).toBe(200);
    expect(json.success).toBe(true);
  });
});

describe("nothing sensitive leaves the server", () => {
  it("returns no credentials in the response body", async () => {
    const { json } = await post(contactPost, "contact", CONTACT_BODY);
    const body = JSON.stringify(json);

    expect(body).not.toContain("top-secret-value");
    expect(body).not.toContain("smtp.example.com");
    expect(body).not.toMatch(/SMTP_/);
  });

  it("returns no raw SMTP error text when delivery fails", async () => {
    sendMail.mockRejectedValue(new Error("535 auth failed for top-secret-value"));

    const { json } = await post(contactPost, "contact", CONTACT_BODY);
    const body = JSON.stringify(json);

    expect(body).not.toContain("top-secret-value");
    expect(body).not.toContain("535");
  });

  it("returns no server paths", async () => {
    const { json } = await post(contactPost, "contact", CONTACT_BODY);
    const body = JSON.stringify(json);

    expect(body).not.toContain(process.cwd());
    expect(body).not.toMatch(/\/var\/www|node_modules/);
  });
});

describe("timezone handling", () => {
  it("formats the submission in a timezone sent on the body", async () => {
    await post(contactPost, "contact", { ...CONTACT_BODY, timezone: "Asia/Kolkata" });

    const confirmation = sent.find((m) => m.to === "naveen@example.com")!;
    expect(confirmation.html).toContain("Asia/Kolkata");
  });

  it("uses the cookie when the body carries no timezone", async () => {
    await post(contactPost, "contact", CONTACT_BODY, "zm_tz=America%2FNew_York");

    const confirmation = sent.find((m) => m.to === "naveen@example.com")!;
    expect(confirmation.html).toContain("America/New_York");
  });

  it("prefers the body over the cookie", async () => {
    await post(
      contactPost,
      "contact",
      { ...CONTACT_BODY, timezone: "Asia/Kolkata" },
      "zm_tz=America%2FNew_York",
    );

    const confirmation = sent.find((m) => m.to === "naveen@example.com")!;
    expect(confirmation.html).toContain("Asia/Kolkata");
    expect(confirmation.html).not.toContain("America/New_York");
  });

  it("falls back safely when the client sends a bogus timezone", async () => {
    const { status } = await post(contactPost, "contact", {
      ...CONTACT_BODY,
      timezone: "Not/AZone",
    });

    expect(status).toBe(200);
    const confirmation = sent.find((m) => m.to === "naveen@example.com")!;
    expect(confirmation.html).toContain("UTC");
  });

  it("generates the timestamp on the server, ignoring any client-sent time", async () => {
    const before = Date.now();
    await post(contactPost, "contact", {
      ...CONTACT_BODY,
      timezone: "Asia/Kolkata",
      submittedAt: "1999-01-01T00:00:00Z",
      timestamp: "1999-01-01T00:00:00Z",
    });

    const confirmation = sent.find((m) => m.to === "naveen@example.com")!;
    expect(confirmation.html).not.toContain("1999");
    // The rendered year is this year, taken from the server clock.
    const year = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
    }).format(new Date(before));
    expect(confirmation.html).toContain(year);
  });
});
