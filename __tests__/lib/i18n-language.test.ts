import { describe, expect, it } from "vitest";
import { COUNTRY_LANGUAGE_MAP, localeForCountry, normalizeCountry } from "@/lib/i18n/country-language";
import { matchSiteLocale, parseAcceptLanguage, preferredAvailableLocale } from "@/lib/i18n/detect-language";
import { DEFAULT_LOCALE, SITE_LOCALES } from "@/lib/i18n/locales";
import {
  isLanguagePromptExcluded,
  LOCALE_COOKIE,
  preferenceCookie,
  resolveSiteLocale,
  suggestLocale,
} from "@/lib/i18n/locale-preference";
import { TEST_LOCALES } from "../fixtures/site-locales";

/** A visitor arriving from `country`, with nothing saved, on the home page. */
const fromCountry = (country: string | null, extra: Partial<Parameters<typeof suggestLocale>[0]> = {}) =>
  suggestLocale({ pathname: "/", country, ...extra }, TEST_LOCALES);

describe("country → language map", () => {
  it("maps the configured countries", () => {
    expect(localeForCountry("DE", TEST_LOCALES)?.code).toBe("de");
    expect(localeForCountry("AT", TEST_LOCALES)?.code).toBe("de");
    expect(localeForCountry("CH", TEST_LOCALES)?.code).toBe("de");
    expect(localeForCountry("FR", TEST_LOCALES)?.code).toBe("fr");
    expect(localeForCountry("IN", TEST_LOCALES)?.code).toBe("hi");
    expect(localeForCountry("BR", TEST_LOCALES)?.code).toBe("pt");
    expect(localeForCountry("AE", TEST_LOCALES)?.code).toBe("ar");
    expect(localeForCountry("SA", TEST_LOCALES)?.code).toBe("ar");
    expect(localeForCountry("CN", TEST_LOCALES)?.code).toBe("zh-hans");
    expect(localeForCountry("ES", TEST_LOCALES)?.code).toBe("es");
  });

  it("has nothing for an unmapped country", () => {
    for (const country of ["JP", "KR", "NG", "ZZ"]) expect(localeForCountry(country, TEST_LOCALES)).toBeUndefined();
  });

  it("leaves Traditional-Chinese markets unmapped rather than serving them Simplified", () => {
    expect(localeForCountry("TW", TEST_LOCALES)).toBeUndefined();
    expect(localeForCountry("HK", TEST_LOCALES)).toBeUndefined();
  });

  it("every mapped language is a language the site knows about", () => {
    const known = new Set(SITE_LOCALES.map((l) => l.code));
    for (const [country, code] of Object.entries(COUNTRY_LANGUAGE_MAP)) {
      expect(/^[A-Z]{2}$/.test(country), `${country} is not an ISO country code`).toBe(true);
      expect(known.has(code), `${country} → ${code} is not in SITE_LOCALES`).toBe(true);
    }
  });

  it("normalises the header's casing and rejects anything that is not a country code", () => {
    expect(normalizeCountry("de")).toBe("DE");
    expect(normalizeCountry(" fr ")).toBe("FR");
    for (const bad of ["", "D", "DEU", "1N", null, undefined, "XX1"]) expect(normalizeCountry(bad)).toBeUndefined();
    expect(localeForCountry("de", TEST_LOCALES)?.code).toBe("de");
  });
});

describe("suggestLocale — from the visitor's country", () => {
  it("Germany, France, India, Brazil and the UAE each get their language", () => {
    expect(fromCountry("DE")?.suggested).toMatchObject({ code: "de", name: "German", nativeName: "Deutsch" });
    expect(fromCountry("FR")?.suggested.name).toBe("French");
    expect(fromCountry("IN")?.suggested).toMatchObject({ name: "Hindi", nativeName: "हिन्दी" });
    expect(fromCountry("BR")?.suggested.name).toBe("Portuguese");
    expect(fromCountry("AE")?.suggested).toMatchObject({ name: "Arabic", dir: "rtl" });
  });

  it("reports the country it decided from, for the prompt's badge", () => {
    expect(fromCountry("DE")).toMatchObject({ country: "DE", current: { code: "en" } });
    expect(fromCountry("BR")?.country).toBe("BR");
  });

  it("an unmapped country (Japan) gets no prompt", () => {
    expect(fromCountry("JP")).toBeNull();
    expect(fromCountry("ZZ")).toBeNull();
  });

  it("a country whose language is not translated yet gets no prompt", () => {
    // Spanish is registered but not marked available in the test registry.
    expect(fromCountry("ES")).toBeNull();
    expect(fromCountry("MX")).toBeNull();
  });

  it("a country mapping to the language already shown gets no prompt", () => {
    expect(fromCountry("DE", { routeLocale: "de" })).toBeNull();
  });

  it("no country header and no fallback → no prompt", () => {
    expect(fromCountry(null)).toBeNull();
    expect(fromCountry("")).toBeNull();
  });

  it("ignores Accept-Language entirely when a country is known", () => {
    // German IP, English browser → still German; English IP-less case is separate.
    expect(fromCountry("DE", { preferences: ["en-GB", "en"] })?.suggested.code).toBe("de");
    // French browser in Japan → nothing, because the country decides.
    expect(fromCountry("JP", { preferences: ["fr-FR"] })).toBeNull();
  });
});

describe("suggestLocale — Accept-Language fallback when no country header", () => {
  it("is used only when the country is missing", () => {
    const result = suggestLocale({ pathname: "/", preferences: parseAcceptLanguage("de-DE,de;q=0.9") }, TEST_LOCALES);
    expect(result?.suggested.code).toBe("de");
    expect(result?.country).toBeUndefined();
  });

  it("still respects availability and the current language", () => {
    expect(suggestLocale({ pathname: "/", preferences: ["es-ES", "en"] }, TEST_LOCALES)).toBeNull();
    expect(suggestLocale({ pathname: "/", preferences: ["en-US"] }, TEST_LOCALES)).toBeNull();
  });
});

describe("an explicit choice always wins over detection", () => {
  it("a saved language means no prompt, whatever the country says", () => {
    expect(fromCountry("DE", { saved: "en" })).toBeNull();
    expect(fromCountry("DE", { saved: "de" })).toBeNull();
    expect(fromCountry("IN", { saved: "en" })).toBeNull();
  });

  it("a dismissed prompt stays dismissed", () => {
    expect(fromCountry("DE", { dismissed: true })).toBeNull();
  });

  it("the current language is the saved choice, then the route, then English — never the country", () => {
    expect(resolveSiteLocale({}, TEST_LOCALES).code).toBe(DEFAULT_LOCALE);
    expect(resolveSiteLocale({ routeLocale: "fr" }, TEST_LOCALES).code).toBe("fr");
    expect(resolveSiteLocale({ saved: "de", routeLocale: "fr" }, TEST_LOCALES).code).toBe("de");
    expect(resolveSiteLocale({ saved: "es" }, TEST_LOCALES).code).toBe("en");
    expect(resolveSiteLocale({ saved: "xx" }, TEST_LOCALES).code).toBe("en");
  });
});

describe("routes the prompt never interrupts", () => {
  it.each([
    ["/auth", ""], ["/auth/callback", "?token=TEST"], ["/reset-password", "?token=TEST"], ["/forgot-password", ""],
    ["/api/contact", ""], ["/internal/zoiko/search", ""], ["/pricing", "?token=abc"],
    // Indian visitors reach the same pages under the /in market root.
    ["/in/forgot-password", ""], ["/in/reset-password", ""], ["/in/auth/callback", ""],
  ])("%s%s is excluded", (pathname, search) => {
    expect(isLanguagePromptExcluded(pathname, search)).toBe(true);
    expect(fromCountry("DE", { pathname, search })).toBeNull();
  });

  it.each(["/", "/pricing", "/in", "/in/pricing", "/in/about", "/authority", "/api-access", "/india"])(
    "%s is not excluded",
    (pathname) => {
      expect(isLanguagePromptExcluded(pathname)).toBe(false);
      expect(fromCountry("DE", { pathname })?.suggested.code).toBe("de");
    },
  );
});

describe("Accept-Language parsing (fallback path only)", () => {
  it("keeps the browser's order and honours q-values", () => {
    expect(parseAcceptLanguage("de-DE,de;q=0.9,en;q=0.8")).toEqual(["de-de", "de", "en"]);
    expect(parseAcceptLanguage("en;q=0.5, fr-CA, fr;q=0.9")).toEqual(["fr-ca", "fr", "en"]);
  });

  it("drops q=0, the wildcard, junk and empty headers", () => {
    expect(parseAcceptLanguage("de;q=0, *;q=0.1, fr")).toEqual(["fr"]);
    expect(parseAcceptLanguage("en-US, <script>, ;q=1")).toEqual(["en-us"]);
    expect(parseAcceptLanguage(null)).toEqual([]);
  });

  it.each([
    ["de-DE", "de"], ["de-AT", "de"], ["fr-CA", "fr"], ["hi-IN", "hi"], ["en-IN", "en"], ["en_GB", "en"],
  ])("%s → %s", (tag, code) => {
    expect(matchSiteLocale(tag, TEST_LOCALES)?.code).toBe(code);
  });

  it("skips registered-but-untranslated languages when picking a preference", () => {
    expect(preferredAvailableLocale(["es-ES", "de"], TEST_LOCALES)?.code).toBe("de");
    expect(matchSiteLocale("ja-JP", TEST_LOCALES)).toBeUndefined();
  });
});

describe("the real registry", () => {
  it("offers only English, because that is the only language the site is translated into", () => {
    expect(SITE_LOCALES.filter((l) => l.available).map((l) => l.code)).toEqual(["en"]);
    expect(SITE_LOCALES.filter((l) => !l.available).map((l) => l.code)).toEqual([
      "hi", "de", "fr", "es", "pt", "ar", "zh-hans",
    ]);
  });

  it("never suggests anything yet, from any mapped country", () => {
    for (const country of Object.keys(COUNTRY_LANGUAGE_MAP)) {
      expect(suggestLocale({ pathname: "/", country }), country).toBeNull();
    }
  });
});

describe("preferenceCookie", () => {
  it("is a first-party, year-long, Lax cookie, Secure on https", () => {
    expect(preferenceCookie(LOCALE_COOKIE, "de", false)).toBe("zoiko_locale=de; path=/; max-age=31536000; samesite=lax");
    expect(preferenceCookie(LOCALE_COOKIE, "de", true)).toBe("zoiko_locale=de; path=/; max-age=31536000; samesite=lax; secure");
  });
});
