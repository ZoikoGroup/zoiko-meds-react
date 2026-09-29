import { findSiteLocale, SITE_LOCALES, type SiteLocale } from "./locales";

/**
 * Which language to *offer* a visitor, from the country their request arrives
 * from (Cloudflare's CF-IPCountry, resolved at the edge — never a raw IP, and
 * nothing about the IP is stored).
 *
 * A country is a weak signal for a person's language: plenty of people in
 * Germany read English, and India has many languages. So this map only ever
 * produces a *suggestion* the visitor must accept, and their explicit choice
 * always wins from then on (lib/i18n/locale-preference.ts).
 *
 * Language is not market. The market — prices, currency, seller, /in/ routing —
 * is decided elsewhere (proxy.ts, lib/commercial) and never changes because
 * someone picked a language.
 *
 * Adding a country = one line here. A country may be listed before its
 * language is translated; the prompt stays silent until that language is
 * marked `available` in ./locales.ts.
 *
 * Multilingual countries are listed under their most widely used language
 * where the choice is clear, and left out where it is not (for example
 * Belgium, Canada and Hong Kong): a wrong guess is worse than no prompt.
 */
export const COUNTRY_LANGUAGE_MAP: Readonly<Record<string, string>> = {
  // German
  DE: "de",
  AT: "de",
  CH: "de",
  // French
  FR: "fr",
  // Spanish
  ES: "es",
  MX: "es",
  AR: "es",
  CO: "es",
  CL: "es",
  PE: "es",
  // Hindi
  IN: "hi",
  // Portuguese
  PT: "pt",
  BR: "pt",
  // Arabic
  AE: "ar",
  SA: "ar",
  QA: "ar",
  KW: "ar",
  BH: "ar",
  OM: "ar",
  EG: "ar",
  // Chinese (Simplified). Taiwan and Hong Kong read Traditional Chinese, which
  // is a different catalog: they stay unmapped until a zh-Hant translation
  // exists, rather than being served Simplified.
  CN: "zh-hans",
};

/** An ISO 3166-1 alpha-2 country code in upper case, or undefined if it is not one. */
export function normalizeCountry(country: string | null | undefined): string | undefined {
  const code = country?.trim().toUpperCase();
  return code && /^[A-Z]{2}$/.test(code) ? code : undefined;
}

/**
 * The site language mapped to a country, whether or not it is translated yet.
 * Callers check `available` before offering it.
 */
export function localeForCountry(
  country: string | null | undefined,
  locales: readonly SiteLocale[] = SITE_LOCALES,
  map: Readonly<Record<string, string>> = COUNTRY_LANGUAGE_MAP,
): SiteLocale | undefined {
  const code = normalizeCountry(country);
  return code ? findSiteLocale(map[code], locales) : undefined;
}
