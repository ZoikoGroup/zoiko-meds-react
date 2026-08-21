"use client";

import { useEffect } from "react";

/**
 * Record the visitor's IANA timezone in a first-party cookie.
 *
 * Form routes read it to format the submission time in the visitor's own zone.
 * It is used for *formatting only* — the authoritative timestamp is always
 * generated on the server when the request arrives.
 *
 * A cookie rather than a field on every form: it covers all ~37 forms and every
 * future one without each having to remember to send it. A form that does send
 * `timezone` in its body takes precedence over this value.
 *
 * Renders nothing and stores no personal data — just a zone name such as
 * "Asia/Kolkata".
 */
export const TIMEZONE_COOKIE = "zm_tz";

export default function ClientTimezone() {
  useEffect(() => {
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (!zone || zone.length > 64 || /[;,\s]/.test(zone)) return;

      // Lax keeps the cookie on top-level navigations to our own forms while
      // withholding it from third-party requests.
      document.cookie = `${TIMEZONE_COOKIE}=${encodeURIComponent(zone)}; path=/; max-age=31536000; samesite=lax`;
    } catch {
      // A browser without a resolvable zone simply gets the server default.
    }
  }, []);

  return null;
}
