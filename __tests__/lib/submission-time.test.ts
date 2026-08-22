/**
 * Submission timestamps and timezone formatting.
 *
 * The instant is the server's; the browser only chooses how it is displayed.
 *
 * @vitest-environment node
 */
import { describe, it, expect, afterEach, vi } from "vitest";
import {
  describeSubmission,
  isValidTimezone,
  resolveTimezone,
  submissionTimeFrom,
} from "@/lib/email/submissionTime";

/** A fixed instant: 21 August 2026, 11:05 UTC. */
const AT = new Date("2026-08-21T11:05:00Z");

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("timezone validation", () => {
  it("accepts real IANA zones", () => {
    for (const zone of ["Asia/Kolkata", "America/New_York", "Europe/London", "UTC", "Australia/Eucla"]) {
      expect(isValidTimezone(zone)).toBe(true);
    }
  });

  it("rejects anything the runtime does not know", () => {
    for (const value of ["Mars/Olympus", "", "   ", "Asia/Kolkata; DROP TABLE", "x".repeat(80)]) {
      expect(isValidTimezone(value)).toBe(false);
    }
  });

  it("accepts the legacy aliases the runtime still resolves", () => {
    // A browser always sends a full IANA name, but "IST"/"GMT" are real
    // identifiers to Intl, so accepting them is a harmless superset rather
    // than a validation hole.
    expect(isValidTimezone("IST")).toBe(true);
    expect(describeSubmission(AT, "IST").formatted).toBe("21 August 2026, 4:35 PM");
  });

  it("rejects non-strings", () => {
    for (const value of [undefined, null, 42, {}, ["Asia/Kolkata"]]) {
      expect(isValidTimezone(value)).toBe(false);
    }
  });
});

describe("timezone resolution", () => {
  it("uses the browser's zone when it is valid", () => {
    expect(resolveTimezone("Asia/Kolkata")).toBe("Asia/Kolkata");
  });

  it("falls back to the configured application zone", () => {
    vi.stubEnv("APP_TIMEZONE", "Europe/London");
    expect(resolveTimezone("Not/AZone")).toBe("Europe/London");
  });

  it("falls back to UTC when nothing is usable", () => {
    vi.stubEnv("APP_TIMEZONE", "");
    expect(resolveTimezone(undefined)).toBe("UTC");
    expect(resolveTimezone("Not/AZone")).toBe("UTC");
  });

  it("ignores an invalid configured zone rather than throwing", () => {
    vi.stubEnv("APP_TIMEZONE", "Nowhere/Special");
    expect(resolveTimezone(undefined)).toBe("UTC");
  });
});

describe("formatting a submission time", () => {
  it("renders an Asia/Kolkata submission in local time", () => {
    const described = describeSubmission(AT, "Asia/Kolkata");

    expect(described.formatted).toBe("21 August 2026, 4:35 PM");
    expect(described.zoneLabel).toBe("Asia/Kolkata (IST, UTC+05:30)");
  });

  it("renders the same instant in America/New_York", () => {
    const described = describeSubmission(AT, "America/New_York");

    expect(described.formatted).toBe("21 August 2026, 7:05 AM");
    expect(described.zoneLabel).toBe("America/New_York (EDT, UTC-04:00)");
  });

  it("keeps the instant identical across zones", () => {
    const kolkata = describeSubmission(AT, "Asia/Kolkata");
    const newYork = describeSubmission(AT, "America/New_York");

    // Only the presentation differs — this is the same moment.
    expect(kolkata.iso).toBe(newYork.iso);
    expect(kolkata.iso).toBe("2026-08-21T11:05:00.000Z");
  });

  it("shows the offset alone for a zone with no common abbreviation", () => {
    const described = describeSubmission(AT, "Asia/Tokyo");

    expect(described.zoneLabel).toBe("Asia/Tokyo (UTC+09:00)");
  });

  it("handles a half-hour and a three-quarter-hour offset", () => {
    expect(describeSubmission(AT, "Australia/Eucla").zoneLabel).toContain("UTC+08:45");
    expect(describeSubmission(AT, "Asia/Kathmandu").zoneLabel).toContain("UTC+05:45");
  });

  it("falls back to UTC when handed an invalid zone", () => {
    const described = describeSubmission(AT, "Not/AZone");

    expect(described.timezone).toBe("UTC");
    expect(described.formatted).toBe("21 August 2026, 11:05 AM");
  });
});

describe("server-generated timestamps", () => {
  it("takes the instant now, not from the client", () => {
    const before = Date.now();
    const described = submissionTimeFrom("Asia/Kolkata");
    const after = Date.now();

    const stamped = new Date(described.iso).getTime();
    expect(stamped).toBeGreaterThanOrEqual(before);
    expect(stamped).toBeLessThanOrEqual(after);
  });

  it("cannot be told what time it is by the client", () => {
    // A client-supplied timestamp has nowhere to enter: the only input is a zone.
    const described = submissionTimeFrom("America/New_York");
    const drift = Math.abs(Date.now() - new Date(described.iso).getTime());

    expect(drift).toBeLessThan(5_000);
    expect(described.timezone).toBe("America/New_York");
  });
});
