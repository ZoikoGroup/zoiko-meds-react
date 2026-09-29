import { NextRequest, NextResponse } from "next/server";
import { parseAcceptLanguage } from "@/lib/i18n/detect-language";
import {
  LOCALE_COOKIE,
  LOCALE_PROMPT_COOKIE,
  LOCALE_PROMPT_DISMISSED,
  suggestLocale,
} from "@/lib/i18n/locale-preference";

/**
 * Which language, if any, to suggest to this visitor.
 *
 * The signal is Cloudflare's CF-IPCountry header, set at the edge on every
 * production request — the same trusted country the proxy uses for market
 * routing, and the only country the browser cannot forge here, since this
 * reads the request as it arrives rather than anything the page sends.
 *
 * Accept-Language is read only when that header is missing: a direct origin
 * request, or local development. To exercise a country locally, send the
 * header yourself:
 *   curl -H "CF-IPCountry: DE" localhost:3000/internal/locale-suggestion
 *
 * GET /internal/locale-suggestion?path=/in/pricing
 * → { "suggestion": "de", "country": "DE" } or { "suggestion": null, "country": null }
 */
export function GET(req: NextRequest) {
  const target = new URL(req.nextUrl.searchParams.get("path") || "/", req.nextUrl.origin);
  const country = req.headers.get("cf-ipcountry");

  const result = suggestLocale({
    pathname: target.pathname,
    search: target.search,
    saved: req.cookies.get(LOCALE_COOKIE)?.value,
    dismissed: req.cookies.get(LOCALE_PROMPT_COOKIE)?.value === LOCALE_PROMPT_DISMISSED,
    country,
    preferences: country ? undefined : parseAcceptLanguage(req.headers.get("accept-language")),
  });

  return NextResponse.json(
    { suggestion: result?.suggested.code ?? null, country: result?.country ?? null },
    // Per-visitor answer: never cache it in a shared cache.
    { headers: { "Cache-Control": "private, no-store", Vary: "CF-IPCountry, Accept-Language, Cookie" } },
  );
}
