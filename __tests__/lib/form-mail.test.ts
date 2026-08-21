/**
 * The shared form mail layer.
 *
 * What matters here: the internal notification always goes to the
 * server-controlled address, the confirmation always goes to the address the
 * visitor typed, user content is escaped, and no failure ever throws.
 *
 * @vitest-environment node
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/** Every message handed to nodemailer during a test. */
const sent: Array<Record<string, string>> = [];
const sendMail = vi.fn(async (options: Record<string, string>) => {
  sent.push(options);
  return { messageId: `msg_${sent.length}` };
});
const createTransport = vi.fn(() => ({ sendMail }));

vi.mock("nodemailer", () => ({
  default: { createTransport: (...args: unknown[]) => createTransport(...(args as [])) },
}));

const { dispatchFormEmails, isSendableAddress, sendUserConfirmation } = await import(
  "@/lib/email/formMail"
);
const { INTERNAL_RECIPIENT, resetTransportForTesting } = await import("@/lib/email/transport");
const { describeSubmission } = await import("@/lib/email/submissionTime");

const AT = describeSubmission(new Date("2026-08-21T11:05:00Z"), "Asia/Kolkata");

/** A configured SMTP environment. */
function configureSmtp() {
  vi.stubEnv("SMTP_HOST", "smtp.example.com");
  vi.stubEnv("SMTP_PORT", "465");
  vi.stubEnv("SMTP_USER", "info@zoikomeds.com");
  vi.stubEnv("SMTP_PASSWORD", "super-secret-password");
  vi.stubEnv("SMTP_FROM_ADDRESS", "info@zoikomeds.com");
  vi.stubEnv("SMTP_FROM_NAME", "ZoikoMeds");
}

/** The message addressed to a given recipient. */
function messageTo(address: string) {
  return sent.find((m) => m.to === address);
}

beforeEach(() => {
  sent.length = 0;
  sendMail.mockClear();
  createTransport.mockClear();
  sendMail.mockImplementation(async (options: Record<string, string>) => {
    sent.push(options);
    return { messageId: `msg_${sent.length}` };
  });
  resetTransportForTesting();
  configureSmtp();
});

afterEach(() => {
  vi.unstubAllEnvs();
  resetTransportForTesting();
});

describe("recipient addressing", () => {
  it("sends the internal notification to the server-controlled address", async () => {
    await dispatchFormEmails({
      formName: "Talk to Sales",
      submittedAt: AT,
      userEmail: "naveen@example.com",
      submission: [{ label: "Full Name", value: "Naveen" }],
    });

    expect(INTERNAL_RECIPIENT).toBe("info@zoikomeds.com");
    expect(messageTo("info@zoikomeds.com")).toBeTruthy();
  });

  it("sends the confirmation to the exact address the visitor entered", async () => {
    await dispatchFormEmails({
      formName: "Request a Briefing",
      submittedAt: AT,
      userEmail: "naveen@example.com",
      userName: "Naveen",
      submission: [],
    });

    const confirmation = messageTo("naveen@example.com");
    expect(confirmation).toBeTruthy();
    expect(confirmation!.subject).toContain("Request a Briefing");
    expect(confirmation!.html).toContain("Thank you, Naveen.");
  });

  it("sends exactly two emails and no more", async () => {
    await dispatchFormEmails({
      formName: "Contact",
      submittedAt: AT,
      userEmail: "someone@example.org",
      submission: [],
    });

    expect(sent).toHaveLength(2);
  });

  it("cannot be redirected by the submitted data", async () => {
    await dispatchFormEmails({
      formName: "Contact",
      submittedAt: AT,
      userEmail: "visitor@example.com",
      submission: [
        { label: "Message", value: "recipient: attacker@evil.test" },
        { label: "To", value: "attacker@evil.test" },
      ],
    });

    // Only the fixed internal address and the visitor's own address.
    expect(sent.map((m) => m.to).sort()).toEqual(["info@zoikomeds.com", "visitor@example.com"]);
  });

  it("still notifies the team when no email was collected", async () => {
    const result = await dispatchFormEmails({
      formName: "Pharmacy Activation",
      submittedAt: AT,
      submission: [{ label: "Pharmacy Name", value: "Shabbir Medical Hall" }],
    });

    expect(messageTo("info@zoikomeds.com")).toBeTruthy();
    expect(result.confirmation).toBeNull();
    expect(sent).toHaveLength(1);
  });
});

describe("recipient validation", () => {
  it("accepts an ordinary address", () => {
    expect(isSendableAddress("naveen@example.com")).toBe(true);
    expect(isSendableAddress("first.last+tag@sub.example.co.uk")).toBe(true);
  });

  it("rejects malformed addresses", () => {
    for (const value of ["", "   ", "not-an-email", "@example.com", "user@", "user@host"]) {
      expect(isSendableAddress(value)).toBe(false);
    }
  });

  it("rejects header injection and address lists", () => {
    for (const value of [
      "a@b.com\nBcc: attacker@evil.test",
      "a@b.com\r\nTo: attacker@evil.test",
      "a@b.com, attacker@evil.test",
      "a@b.com; attacker@evil.test",
      '"name" <a@b.com>',
    ]) {
      expect(isSendableAddress(value)).toBe(false);
    }
  });

  it("does not send a confirmation to an invalid address", async () => {
    const result = await sendUserConfirmation({
      to: "not-an-email",
      formName: "Contact",
      submittedAt: AT,
    });

    expect(result.success).toBe(false);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("skips the confirmation but keeps the notification for a bad address", async () => {
    const result = await dispatchFormEmails({
      formName: "Contact",
      submittedAt: AT,
      userEmail: "a@b.com\nBcc: attacker@evil.test",
      submission: [],
    });

    expect(result.confirmation).toBeNull();
    expect(sent.map((m) => m.to)).toEqual(["info@zoikomeds.com"]);
  });
});

describe("escaping user content", () => {
  it("escapes HTML in the visitor's name", async () => {
    await dispatchFormEmails({
      formName: "Contact",
      submittedAt: AT,
      userEmail: "visitor@example.com",
      userName: '<script>alert("xss")</script>',
      submission: [],
    });

    const confirmation = messageTo("visitor@example.com")!;
    expect(confirmation.html).not.toContain("<script>");
    expect(confirmation.html).toContain("&lt;script&gt;");
  });

  it("escapes HTML in submitted fields of the internal email", async () => {
    await dispatchFormEmails({
      formName: "Contact",
      submittedAt: AT,
      userEmail: "visitor@example.com",
      note: '<img src=x onerror="alert(1)">',
      submission: [{ label: "Organization", value: "<b>Acme</b>" }],
    });

    const internal = messageTo("info@zoikomeds.com")!;
    expect(internal.html).not.toContain("<img src=x");
    expect(internal.html).not.toContain("<b>Acme</b>");
    expect(internal.html).toContain("&lt;b&gt;Acme&lt;/b&gt;");
  });

  it("escapes the form name", async () => {
    await dispatchFormEmails({
      formName: '</title><script>bad()</script>',
      submittedAt: AT,
      userEmail: "visitor@example.com",
      submission: [],
    });

    expect(messageTo("visitor@example.com")!.html).not.toContain("<script>bad()");
  });
});

describe("timestamp and timezone in the emails", () => {
  it("shows the submission time and zone in the confirmation", async () => {
    await dispatchFormEmails({
      formName: "Request a Briefing",
      submittedAt: AT,
      userEmail: "visitor@example.com",
      submission: [],
    });

    const confirmation = messageTo("visitor@example.com")!;
    expect(confirmation.html).toContain("21 August 2026, 4:35 PM");
    expect(confirmation.html).toContain("Asia/Kolkata (IST, UTC+05:30)");
    expect(confirmation.text).toContain("21 August 2026, 4:35 PM");
  });

  it("shows the same time and zone in the internal notification", async () => {
    await dispatchFormEmails({
      formName: "Request a Briefing",
      submittedAt: AT,
      userEmail: "visitor@example.com",
      submission: [],
    });

    const internal = messageTo("info@zoikomeds.com")!;
    expect(internal.html).toContain("21 August 2026, 4:35 PM");
    expect(internal.html).toContain("Asia/Kolkata");
  });

  it("generates the time server-side when the caller passes only a zone", async () => {
    const before = Date.now();
    const result = await dispatchFormEmails({
      formName: "Contact",
      submittedAt: undefined,
      timezone: "America/New_York",
      userEmail: "visitor@example.com",
      submission: [],
    });

    expect(result.submittedAt.timezone).toBe("America/New_York");
    expect(new Date(result.submittedAt.iso).getTime()).toBeGreaterThanOrEqual(before);
  });

  it("falls back to UTC for an invalid client zone", async () => {
    const result = await dispatchFormEmails({
      formName: "Contact",
      submittedAt: undefined,
      timezone: "Not/AZone",
      userEmail: "visitor@example.com",
      submission: [],
    });

    expect(result.submittedAt.timezone).toBe("UTC");
    expect(sent).toHaveLength(2);
  });
});

describe("plain-text alternative", () => {
  it("gives both emails a text body", async () => {
    await dispatchFormEmails({
      formName: "Contact",
      submittedAt: AT,
      userEmail: "visitor@example.com",
      submission: [{ label: "Full Name", value: "Naveen" }],
    });

    for (const message of sent) {
      expect(message.text).toBeTruthy();
      expect(message.text.length).toBeGreaterThan(20);
    }
  });
});

describe("failure handling", () => {
  it("never throws when SMTP rejects the message", async () => {
    sendMail.mockRejectedValue(new Error("535 authentication failed"));

    const result = await dispatchFormEmails({
      formName: "Contact",
      submittedAt: AT,
      userEmail: "visitor@example.com",
      submission: [],
    });

    expect(result.internal.success).toBe(false);
    expect(result.confirmation?.success).toBe(false);
  });

  it("never throws when SMTP is not configured", async () => {
    vi.unstubAllEnvs();
    vi.stubEnv("SMTP_HOST", "");
    vi.stubEnv("SMTP_USER", "");
    vi.stubEnv("SMTP_PASSWORD", "");
    vi.stubEnv("NODE_ENV", "production");
    resetTransportForTesting();

    const result = await dispatchFormEmails({
      formName: "Contact",
      submittedAt: AT,
      userEmail: "visitor@example.com",
      submission: [],
    });

    expect(result.internal.success).toBe(false);
    expect(result.confirmation?.success).toBe(false);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("still sends the confirmation when the internal notification fails", async () => {
    // Only the message to the team fails.
    sendMail.mockImplementation(async (options: Record<string, string>) => {
      if (options.to === "info@zoikomeds.com") throw new Error("451 temporary failure");
      sent.push(options);
      return { messageId: "ok" };
    });

    const result = await dispatchFormEmails({
      formName: "Contact",
      submittedAt: AT,
      userEmail: "visitor@example.com",
      submission: [],
    });

    expect(result.internal.success).toBe(false);
    expect(result.confirmation?.success).toBe(true);
    expect(messageTo("visitor@example.com")).toBeTruthy();
  });

  it("still notifies the team when the confirmation bounces", async () => {
    sendMail.mockImplementation(async (options: Record<string, string>) => {
      if (options.to !== "info@zoikomeds.com") throw new Error("550 mailbox unavailable");
      sent.push(options);
      return { messageId: "ok" };
    });

    const result = await dispatchFormEmails({
      formName: "Contact",
      submittedAt: AT,
      userEmail: "nobody@invalid.example",
      submission: [],
    });

    expect(result.internal.success).toBe(true);
    expect(result.confirmation?.success).toBe(false);
  });
});

describe("credential safety", () => {
  it("never puts the SMTP password in a message", async () => {
    await dispatchFormEmails({
      formName: "Contact",
      submittedAt: AT,
      userEmail: "visitor@example.com",
      submission: [{ label: "Note", value: "hello" }],
    });

    const serialized = JSON.stringify(sent);
    expect(serialized).not.toContain("super-secret-password");
  });

  it("never logs the SMTP password on failure", async () => {
    const errors: string[] = [];
    const spy = vi.spyOn(console, "error").mockImplementation((...args) => {
      errors.push(args.map(String).join(" "));
    });
    const logs: string[] = [];
    const logSpy = vi.spyOn(console, "log").mockImplementation((...args) => {
      logs.push(args.map(String).join(" "));
    });

    sendMail.mockRejectedValue(new Error("535 auth failed for super-secret-password"));
    await dispatchFormEmails({
      formName: "Contact",
      submittedAt: AT,
      userEmail: "visitor@example.com",
      submission: [],
    });

    const everything = [...errors, ...logs].join("\n");
    expect(everything).not.toContain("super-secret-password");
    // The category is logged instead, so the failure is still diagnosable.
    expect(everything).toContain("auth-rejected");

    spy.mockRestore();
    logSpy.mockRestore();
  });
});

describe("the shared transport", () => {
  it("is created once and reused across submissions", async () => {
    for (let i = 0; i < 3; i++) {
      await dispatchFormEmails({
        formName: "Contact",
        submittedAt: AT,
        userEmail: `visitor${i}@example.com`,
        submission: [],
      });
    }

    expect(sent).toHaveLength(6);
    expect(createTransport).toHaveBeenCalledTimes(1);
  });
});
