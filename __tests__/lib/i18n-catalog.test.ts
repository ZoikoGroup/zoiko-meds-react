import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { CATALOGS, en, missingKeys, type MessageKey } from "@/lib/i18n/messages";
import { availableLocales, SITE_LOCALES } from "@/lib/i18n/locales";
import { interpolate, translate } from "@/lib/i18n/translate";

const ENGLISH_KEYS = Object.keys(en) as MessageKey[];
const NON_ENGLISH = SITE_LOCALES.filter((l) => l.code !== "en");

describe("message catalogs", () => {
  it("every registered language has a catalog, and every catalog a language", () => {
    expect(Object.keys(CATALOGS).sort()).toEqual(SITE_LOCALES.map((l) => l.code).sort());
  });

  it("English defines every key and leaves none blank", () => {
    expect(missingKeys("en")).toEqual([]);
    expect(ENGLISH_KEYS.length).toBeGreaterThan(50);
  });

  it.each(NON_ENGLISH.map((l) => [l.code, l.name] as const))(
    "%s (%s) uses only keys English defines",
    (code) => {
      const unknown = Object.keys(CATALOGS[code]).filter((key) => !(key in en));
      expect(unknown).toEqual([]);
    },
  );

  it.each(NON_ENGLISH.map((l) => [l.code, l.name] as const))(
    "%s (%s) contains no placeholder or untranslated markers",
    (code) => {
      // Case-sensitive on purpose: "todos" is an ordinary Spanish word, "TODO" is a marker.
      const offenders = Object.entries(CATALOGS[code]).filter(([, value]) =>
        /\bTODO\b|\bFIXME\b|TRANSLATE[_ ]?ME|\bXXX\b|^\[[A-Z]{2,7}\]|Lorem ipsum/.test(value ?? ""),
      );
      expect(offenders).toEqual([]);
    },
  );

  it.each(NON_ENGLISH.map((l) => [l.code, l.name] as const))(
    "%s (%s) keeps every placeholder English uses in the same message",
    (code) => {
      const placeholders = (text: string) => (text.match(/\{(\w+)\}/g) ?? []).sort();
      const mismatched = Object.entries(CATALOGS[code])
        .filter(([key, value]) => {
          const source = en[key as MessageKey];
          return source !== undefined && placeholders(source).join() !== placeholders(value ?? "").join();
        })
        .map(([key]) => key);
      expect(mismatched).toEqual([]);
    },
  );

  it.each(NON_ENGLISH.map((l) => [l.code, l.name] as const))(
    "%s (%s) is a real translation, not a copy of English",
    (code) => {
      const entries = Object.entries(CATALOGS[code]);
      const identical = entries.filter(([key, value]) => value === en[key as MessageKey]);

      // Some entries are legitimately identical: brand names ("Zoiko Group"),
      // and words a language really does share with English — "Pharmacies" in
      // French, "Enterprise & Intelligence" in German. A catalog that had
      // simply been copied from English would be far above this share.
      expect(identical.length / entries.length, `identical: ${identical.map(([k]) => k).join(", ")}`).toBeLessThan(0.15);
    },
  );
});

describe("translate()", () => {
  it("uses the catalog for the active language", () => {
    expect(translate("de", "notFound.backHome")).toBe("Zurück zur Startseite");
    expect(translate("hi", "footer.columns.platform")).toBe("प्लेटफ़ॉर्म");
  });

  it("fills placeholders", () => {
    expect(translate("en", "language.switch", { language: "German" })).toBe("Switch to German");
    expect(translate("de", "language.stay", { language: "Englisch" })).toBe("Weiter auf Englisch");
    expect(interpolate("{a} and {b}", { a: "x", b: 2 })).toBe("x and 2");
  });

  it("falls back to English rather than showing a raw key, and warns in development", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const missing = "footer.tagline" as MessageKey;
    // A language with no catalog at all stands in for an incomplete one.
    const result = translate("xx", missing);

    expect(result).toBe(en["footer.tagline"]);
    expect(result).not.toContain("footer.");
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("footer.tagline"));
    warn.mockRestore();
  });

  it("never returns a bare key for any key, in any registered language", () => {
    for (const locale of SITE_LOCALES) {
      for (const key of ENGLISH_KEYS) {
        const text = translate(locale.code, key);
        expect(text, `${locale.code}/${key}`).not.toBe(key);
        expect(text.trim(), `${locale.code}/${key}`).not.toBe("");
      }
    }
  });
});

// ---------------------------------------------------------------------------
// The two gates that decide whether a language may be offered to visitors.
// ---------------------------------------------------------------------------

const ROOT = path.resolve(__dirname, "../..");

/** Files whose copy has been migrated into the catalogs. */
const MIGRATED = ["components/layout/Footer.tsx", "app/not-found.tsx", "components/language/LanguageSuggestion.tsx"];

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return entry.name.startsWith(".") ? [] : sourceFiles(full);
    return /\.tsx$/.test(entry.name) ? [full] : [];
  });
}

describe("a language may only be offered when it is genuinely finished", () => {
  it("every available language has full parity with English", () => {
    for (const locale of availableLocales()) {
      expect(missingKeys(locale.code), `${locale.code} is missing keys`).toEqual([]);
    }
  });

  it("no language is available while website copy still lives outside the catalogs", () => {
    const enabled = availableLocales().filter((l) => l.code !== "en");
    if (enabled.length === 0) return; // nothing to guard yet

    // Once a second language ships, every page and component must read its copy
    // from the catalog. This fails loudly if one is enabled too early.
    const unmigrated = [...sourceFiles(path.join(ROOT, "app")), ...sourceFiles(path.join(ROOT, "components"))]
      .map((f) => path.relative(ROOT, f).replace(/\\/g, "/"))
      .filter((f) => !MIGRATED.includes(f))
      .filter((f) => /<[a-z][^>]*>\s*[A-Z][A-Za-z ,'-]{12,}/.test(readFileSync(path.join(ROOT, f), "utf8")));

    expect(unmigrated, `${unmigrated.length} files still hold hard-coded English copy`).toEqual([]);
  });

  it("English is the only language currently offered", () => {
    expect(availableLocales().map((l) => l.code)).toEqual(["en"]);
  });

  it("the migrated files no longer hold their English copy inline", () => {
    const footer = readFileSync(path.join(ROOT, "components/layout/Footer.tsx"), "utf8");
    expect(footer).not.toContain("Infrastructure monitoring active");
    expect(footer).not.toContain("Global medicine availability infrastructure");
    expect(footer).toContain('t("footer.tagline")');

    const notFound = readFileSync(path.join(ROOT, "app/not-found.tsx"), "utf8");
    expect(notFound).not.toContain("This pharmacy path");
    expect(notFound).toContain('t("notFound.title")');
  });
});

describe("Chinese is explicit about its writing system", () => {
  it("is registered as Simplified, not an ambiguous zh", () => {
    const codes = SITE_LOCALES.map((l) => l.code);
    expect(codes).toContain("zh-hans");
    expect(codes).not.toContain("zh");
    expect(SITE_LOCALES.find((l) => l.code === "zh-hans")?.htmlLang).toBe("zh-Hans");
  });

  it("is never offered to a Traditional-reading market", async () => {
    const { COUNTRY_LANGUAGE_MAP } = await import("@/lib/i18n/country-language");
    expect(COUNTRY_LANGUAGE_MAP.CN).toBe("zh-hans");
    expect(COUNTRY_LANGUAGE_MAP.TW).toBeUndefined();
    expect(COUNTRY_LANGUAGE_MAP.HK).toBeUndefined();
  });
});

describe("html lang and direction", () => {
  it("each language carries a canonical BCP 47 tag and a direction", () => {
    for (const locale of SITE_LOCALES) {
      expect(locale.htmlLang, locale.code).toMatch(/^[a-z]{2}(-[A-Z][a-z]{3})?$/);
      expect(["ltr", "rtl"]).toContain(locale.dir);
    }
    expect(SITE_LOCALES.find((l) => l.code === "ar")?.dir).toBe("rtl");
    expect(SITE_LOCALES.filter((l) => l.dir === "rtl").map((l) => l.code)).toEqual(["ar"]);
  });
});
