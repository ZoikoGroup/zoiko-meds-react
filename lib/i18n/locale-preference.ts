import { normalizeCountry, localeForCountry } from "./country-language";
import { preferredAvailableLocale } from "./detect-language";
import { DEFAULT_LOCALE, findSiteLocale, SITE_LOCALES, type SiteLocale } from "./locales";

/**
 * The visitor's language choice and when to suggest one.
 *
 * Priority for the language the site is in:
 *   1. the visitor's saved choice (LOCALE_COOKIE)
 *   2. an explicit language route — the site has none today; callers pass it
 *      in if one is ever added
 *   3. the site default
 * Detection is deliberately NOT in that list: it only ever produces a
 * *suggestion*, and nothing changes until the visitor accepts it.
 *
 * The suggestion comes from the visitor's country (CF-IPCountry, resolved at
 * the edge), mapped in ./country-language.ts. Nothing is persisted from
 * detection alone — cookies are written only when the visitor answers the
 * prompt — and neither the IP nor the country is stored.
 */

/** The visitor's explicit choice, e.g. "en" or "de". */
export const LOCALE_COOKIE = "zoiko_locale";
/** Set when the visitor closes the prompt without choosing (Escape). */
export const LOCALE_PROMPT_COOKIE = "zoiko_locale_prompt";
export const LOCALE_PROMPT_DISMISSED = "dismissed";
/** One year, like the site's other preference cookie (zm_tz). */
export const LOCALE_COOKIE_MAX_AGE = 31_536_000;

/**
 * Routes the prompt must never interrupt: sign-in/OAuth hand-offs, password
 * recovery and route handlers. Matched on whole path segments, so /authority
 * or /api-access are not caught by /auth or /api.
 */
const PROMPT_EXCLUDED_PATHS = ["/auth", "/reset-password", "/forgot-password", "/api", "/internal"];

/** Market roots from proxy.ts: /in/forgot-password is the same page as /forgot-password. */
const MARKET_ROOTS = ["/in"];

function withoutMarketRoot(pathname: string): string {
  const root = MARKET_ROOTS.find((r) => pathname === r || pathname.startsWith(`${r}/`));
  return root ? pathname.slice(root.length) || "/" : pathname;
}

export function isLanguagePromptExcluded(pathname: string, search = ""): boolean {
  const path = withoutMarketRoot(pathname);
  if (PROMPT_EXCLUDED_PATHS.some((p) => path === p || path.startsWith(`${p}/`))) return true;
  // Any link carrying a token (invites, verification, OAuth) is a hand-off, not browsing.
  return new URLSearchParams(search).has("token");
}

/** The language the site is shown in, by the priority above. */
export function resolveSiteLocale(
  input: { saved?: string | null; routeLocale?: string | null },
  locales: readonly SiteLocale[] = SITE_LOCALES,
): SiteLocale {
  for (const code of [input.saved, input.routeLocale]) {
    const locale = findSiteLocale(code, locales);
    if (locale?.available) return locale;
  }
  return findSiteLocale(DEFAULT_LOCALE, locales)!;
}

export interface SuggestionInput {
  pathname: string;
  search?: string;
  /** Value of LOCALE_COOKIE, if any. */
  saved?: string | null;
  /** Whether LOCALE_PROMPT_COOKIE says the prompt was dismissed. */
  dismissed?: boolean;
  routeLocale?: string | null;
  /** Trusted country code from the edge (CF-IPCountry) — the signal used in production. */
  country?: string | null;
  /**
   * Accept-Language tags, most preferred first. Isolated fallback, read ONLY
   * when `country` is absent — a direct origin request that never passed
   * through Cloudflare, or local development without a spoofed header.
   */
  preferences?: readonly string[];
}

export interface LanguageSuggestion {
  current: SiteLocale;
  suggested: SiteLocale;
  /** The country the suggestion came from, when it came from one. */
  country?: string;
}

/**
 * A language to offer, or null. Offered only when the visitor has neither
 * chosen nor dismissed, the route is safe to interrupt, and the language their
 * country maps to is translated and different from the current one.
 */
export function suggestLocale(
  input: SuggestionInput,
  locales: readonly SiteLocale[] = SITE_LOCALES,
): LanguageSuggestion | null {
  if (input.saved || input.dismissed) return null;
  if (isLanguagePromptExcluded(input.pathname, input.search)) return null;

  const current = resolveSiteLocale({ routeLocale: input.routeLocale }, locales);
  const country = normalizeCountry(input.country);
  const suggested = country
    ? localeForCountry(country, locales)
    : preferredAvailableLocale(input.preferences ?? [], locales);

  if (!suggested?.available || suggested.code === current.code) return null;
  return country ? { current, suggested, country } : { current, suggested };
}

/** A `document.cookie` assignment for one of the preference cookies. */
export function preferenceCookie(name: string, value: string, secure: boolean): string {
  return `${name}=${encodeURIComponent(value)}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax${secure ? "; secure" : ""}`;
}
