/**
 * When a submission was received, described in the submitter's own timezone.
 *
 * The instant is always generated on the server. The browser only tells us
 * which timezone to *format* it in, so a wrong or forged value can shift the
 * displayed clock but never the recorded time.
 */

/** Used when the browser sent nothing usable. */
const FALLBACK_TIMEZONE = "UTC";

export interface SubmissionTime {
  /** Server-generated instant, ISO 8601. The authoritative value. */
  iso: string;
  /** The IANA zone actually used for formatting. */
  timezone: string;
  /** e.g. "21 August 2026, 4:35 PM". */
  formatted: string;
  /** e.g. "Asia/Kolkata (IST, UTC+05:30)". */
  zoneLabel: string;
}

/**
 * Validate an IANA timezone name by asking Intl to use it.
 *
 * There is no list to check against — the runtime's own tz database is the only
 * honest source, and it throws `RangeError` on anything it does not know.
 */
export function isValidTimezone(zone: unknown): zone is string {
  if (typeof zone !== "string") return false;
  const trimmed = zone.trim();
  // Guard the obvious junk before handing it to Intl.
  if (!trimmed || trimmed.length > 64) return false;
  try {
    new Intl.DateTimeFormat("en-GB", { timeZone: trimmed });
    return true;
  } catch {
    return false;
  }
}

/**
 * Pick the timezone to format in.
 *
 * Order: what the browser sent, then the deployment's configured zone, then
 * UTC. Never throws.
 */
export function resolveTimezone(candidate?: unknown): string {
  if (isValidTimezone(candidate)) return candidate.trim();

  const configured = process.env.APP_TIMEZONE;
  if (isValidTimezone(configured)) return configured.trim();

  return FALLBACK_TIMEZONE;
}

/**
 * Locales to consult for a zone's short name.
 *
 * No single locale abbreviates every zone: en-US knows EDT but calls Kolkata
 * "GMT+5:30", while en-IN calls it IST. Asking a few in turn and taking the
 * first real abbreviation covers the common zones without a lookup table.
 */
const ABBREVIATION_LOCALES = ["en-US", "en-GB", "en-IN"] as const;

/** A genuine abbreviation ("IST", "BST"), as opposed to a rendered offset. */
const ABBREVIATION_RE = /^[A-Za-z]{2,5}$/;

function zoneName(at: Date, timezone: string, locale: string, timeZoneName: "short" | "longOffset"): string {
  try {
    return (
      new Intl.DateTimeFormat(locale, { timeZone: timezone, timeZoneName })
        .formatToParts(at)
        .find((part) => part.type === "timeZoneName")?.value ?? ""
    );
  } catch {
    return "";
  }
}

/**
 * The zone's abbreviation and UTC offset, e.g. `IST, UTC+05:30`.
 *
 * Both values come from the runtime's tz database — nothing is hardcoded. A
 * zone with no common abbreviation yields the offset alone.
 */
function zoneDetail(at: Date, timezone: string): string {
  const abbreviation = ABBREVIATION_LOCALES.map((locale) =>
    zoneName(at, timezone, locale, "short"),
  ).find((value) => ABBREVIATION_RE.test(value));

  // "longOffset" always renders GMT+05:30; UTC±hh:mm is the more familiar label.
  const offset = zoneName(at, timezone, "en-GB", "longOffset").replace(/^GMT/, "UTC");

  return [abbreviation, offset]
    .filter(Boolean)
    .filter((value, i, all) => all.indexOf(value) === i)
    .join(", ");
}

/**
 * Describe a submission instant for display in an email.
 *
 * @param at         The server-generated instant. Callers pass `new Date()` at
 *                   the moment the request is handled.
 * @param timezone   An already-resolved IANA zone (see {@link resolveTimezone}).
 */
export function describeSubmission(at: Date, timezone: string): SubmissionTime {
  const safeZone = isValidTimezone(timezone) ? timezone : FALLBACK_TIMEZONE;

  let formatted: string;
  try {
    formatted = new Intl.DateTimeFormat("en-GB", {
      timeZone: safeZone,
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
      .format(at)
      // en-GB renders "21 August 2026 at 4:35 pm"; the house style is a comma
      // and an upper-case meridiem.
      .replace(" at ", ", ")
      .replace(/\b(am|pm)\b/i, (m) => m.toUpperCase());
  } catch {
    formatted = at.toISOString();
  }

  const detail = zoneDetail(at, safeZone);

  return {
    iso: at.toISOString(),
    timezone: safeZone,
    formatted,
    zoneLabel: detail ? `${safeZone} (${detail})` : safeZone,
  };
}

/**
 * Read the submission time straight from a request body.
 *
 * The timestamp is taken now, on the server; only the zone comes from the
 * client. This is the one entry point route handlers need.
 */
export function submissionTimeFrom(clientTimezone?: unknown): SubmissionTime {
  return describeSubmission(new Date(), resolveTimezone(clientTimezone));
}
