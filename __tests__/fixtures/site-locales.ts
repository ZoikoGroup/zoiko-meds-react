import type { SiteLocale } from "@/lib/i18n/locales";

/**
 * A locale registry for tests only. The real one (lib/i18n/locales.ts) offers
 * English alone, because the website's copy has not been migrated into the
 * message catalogs yet; this one pretends German, French, Hindi, Portuguese,
 * Arabic and Simplified Chinese are finished so the prompt's behaviour can be
 * exercised. Spanish stays unavailable to cover a registered-but-untranslated
 * language.
 */
export const TEST_LOCALES: readonly SiteLocale[] = [
  { code: "en", htmlLang: "en", name: "English", nativeName: "English", badge: "EN", dir: "ltr", available: true },
  { code: "de", htmlLang: "de", name: "German", nativeName: "Deutsch", badge: "DE", dir: "ltr", available: true },
  { code: "fr", htmlLang: "fr", name: "French", nativeName: "Français", badge: "FR", dir: "ltr", available: true },
  { code: "hi", htmlLang: "hi", name: "Hindi", nativeName: "हिन्दी", badge: "HI", dir: "ltr", available: true },
  { code: "pt", htmlLang: "pt", name: "Portuguese", nativeName: "Português", badge: "PT", dir: "ltr", available: true },
  { code: "ar", htmlLang: "ar", name: "Arabic", nativeName: "العربية", badge: "AR", dir: "rtl", available: true },
  {
    code: "zh-hans",
    htmlLang: "zh-Hans",
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
    badge: "ZH",
    dir: "ltr",
    available: true,
  },
  { code: "es", htmlLang: "es", name: "Spanish", nativeName: "Español", badge: "ES", dir: "ltr", available: false },
];
