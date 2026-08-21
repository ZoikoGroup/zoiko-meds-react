/**
 * Work out which timezone to format a submission time in.
 *
 * Precedence: the `timezone` field on the request body, then the cookie set by
 * `components/layout/ClientTimezone.tsx`, then the deployment default, then UTC.
 *
 * Both client-supplied sources are untrusted and validated against the
 * runtime's tz database before use. They affect formatting only — the timestamp
 * itself is taken on the server.
 */
import type { NextRequest } from "next/server";
import {
  isValidTimezone,
  resolveTimezone,
  submissionTimeFrom,
  type SubmissionTime,
} from "./submissionTime";

/** Must match TIMEZONE_COOKIE in components/layout/ClientTimezone.tsx. */
const TIMEZONE_COOKIE = "zm_tz";

function fromCookie(req: NextRequest): string | undefined {
  const raw = req.cookies.get(TIMEZONE_COOKIE)?.value;
  if (!raw) return undefined;
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

/** The IANA zone to use for this request. Always returns a usable zone. */
export function timezoneForRequest(req: NextRequest, body?: Record<string, unknown>): string {
  const fromBody = body?.timezone ?? body?.timeZone;
  // Checked explicitly rather than by comparing resolved values, so a body that
  // legitimately says "UTC" is honoured instead of falling through.
  if (isValidTimezone(fromBody)) return fromBody.trim();

  return resolveTimezone(fromCookie(req));
}

/**
 * The server timestamp plus the visitor's zone, ready for both emails.
 *
 * This is the single call a route handler needs.
 */
export function submissionTimeForRequest(
  req: NextRequest,
  body?: Record<string, unknown>,
): SubmissionTime {
  return submissionTimeFrom(timezoneForRequest(req, body));
}
