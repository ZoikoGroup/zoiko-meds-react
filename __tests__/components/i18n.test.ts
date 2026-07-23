import { describe, it, expect } from "vitest";
import { t, availableLocales } from "@/components/zoi/i18n";

describe("i18n", () => {
  it("returns translated string for valid key", () => {
    expect(t("composer.placeholder")).toBe("Message Zoi\u2026");
  });

  it("returns key itself for missing key", () => {
    const result = t("nonexistent.key");
    expect(result).toBe("nonexistent.key");
  });

  it("interpolates variables in template", () => {
    const result = t("card.stockingPharmacies", { count: 5 });
    expect(result).toBe("5 stocking pharmacies");
  });

  it("returns english by default", () => {
    expect(t("header.title")).toBe("Zoi");
  });

  it("returns Swahili when locale is sw", () => {
    expect(t("header.title", undefined, "sw")).toBe("Zoi");
    expect(t("composer.placeholder", undefined, "sw")).toBe("Tuma ujumbe kwa Zoi\u2026");
  });

  it("falls back to key for unsupported locale", () => {
    const result = t("header.title", undefined, "fr");
    expect(result).toBe("header.title");
  });

  it("availableLocales returns en and sw", () => {
    const locales = availableLocales();
    expect(locales).toContain("en");
    expect(locales).toContain("sw");
  });
});
