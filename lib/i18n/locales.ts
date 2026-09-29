/**
 * Website languages — the one place that decides which languages exist and
 * which may be offered to visitors.
 *
 * Language is separate from market: /in/ is the India *market* (prices, seller,
 * currency); the language is a visitor preference stored in a cookie
 * (lib/i18n/locale-preference.ts). Choosing a language never changes the URL or
 * the market.
 *
 * `available` must only be true when the whole website really renders in that
 * language. Two gates guard it, both enforced by
 * __tests__/lib/i18n-catalog.test.ts:
 *   1. the language's catalog has every key English has, and
 *   2. the website's copy has actually been migrated into the catalog.
 *
 * Today only English passes: roughly 8,250 user-visible strings still live
 * inside components, and only the shared chrome has been migrated. Every other
 * language is registered — its country mapping and draft catalog exist — but
 * stays unavailable, so the language prompt never offers it.
 */

export interface SiteLocale {
  /** Lowercase tag the site uses internally and stores in the cookie, e.g. "de", "zh-hans". */
  readonly code: string;
  /** Canonical BCP 47 tag for <html lang>, e.g. "de", "zh-Hans". */
  readonly htmlLang: string;
  /** English name, shown in the language prompt. */
  readonly name: string;
  /** The language's own name for itself, e.g. "Deutsch". */
  readonly nativeName: string;
  /** Short label for the prompt's badge when no country is known, e.g. "DE". */
  readonly badge: string;
  readonly dir: "ltr" | "rtl";
  /** True only when the website has a complete, approved translation. */
  readonly available: boolean;
}

export const DEFAULT_LOCALE = "en";

export const SITE_LOCALES: readonly SiteLocale[] = [
  { code: "en", htmlLang: "en", name: "English", nativeName: "English", badge: "EN", dir: "ltr", available: true },
  { code: "hi", htmlLang: "hi", name: "Hindi", nativeName: "हिन्दी", badge: "HI", dir: "ltr", available: false },
  { code: "de", htmlLang: "de", name: "German", nativeName: "Deutsch", badge: "DE", dir: "ltr", available: false },
  { code: "fr", htmlLang: "fr", name: "French", nativeName: "Français", badge: "FR", dir: "ltr", available: false },
  { code: "es", htmlLang: "es", name: "Spanish", nativeName: "Español", badge: "ES", dir: "ltr", available: false },
  { code: "pt", htmlLang: "pt", name: "Portuguese", nativeName: "Português", badge: "PT", dir: "ltr", available: false },
  { code: "ar", htmlLang: "ar", name: "Arabic", nativeName: "العربية", badge: "AR", dir: "rtl", available: false },
  // Simplified Han, for mainland China. Traditional (zh-Hant) is a separate
  // catalog and a separate translation job — see messages/zh-hans.ts.
  {
    code: "zh-hans",
    htmlLang: "zh-Hans",
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
    badge: "ZH",
    dir: "ltr",
    available: false,
  },
];

export function findSiteLocale(code: string | null | undefined, locales: readonly SiteLocale[] = SITE_LOCALES) {
  if (!code) return undefined;
  const wanted = code.toLowerCase();
  return locales.find((l) => l.code === wanted);
}

/** The locales a visitor may actually be switched into. */
export function availableLocales(locales: readonly SiteLocale[] = SITE_LOCALES): readonly SiteLocale[] {
  return locales.filter((l) => l.available);
}
