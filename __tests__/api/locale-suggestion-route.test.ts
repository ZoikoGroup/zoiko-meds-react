/**
 * GET /internal/locale-suggestion — the server-side read of the trusted country.
 *
 * @vitest-environment node
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { TEST_LOCALES } from "../fixtures/site-locales";

async function loadRoute(registry: "test" | "real") {
  vi.resetModules();
  if (registry === "test") {
    vi.doMock("@/lib/i18n/locales", async (importOriginal) => ({
      ...(await importOriginal<typeof import("@/lib/i18n/locales")>()),
      SITE_LOCALES: TEST_LOCALES,
    }));
  } else {
    vi.doUnmock("@/lib/i18n/locales");
  }
  return import("@/app/internal/locale-suggestion/route");
}

async function ask(
  registry: "test" | "real",
  { path = "/", country = "", acceptLanguage = "", cookie = "" } = {},
) {
  const { GET } = await loadRoute(registry);
  const headers = new Headers();
  if (country) headers.set("cf-ipcountry", country);
  if (acceptLanguage) headers.set("accept-language", acceptLanguage);
  if (cookie) headers.set("cookie", cookie);
  const url = `http://localhost:3000/internal/locale-suggestion?path=${encodeURIComponent(path)}`;
  const res = GET(new NextRequest(url, { headers }));
  return { res, body: (await res.json()) as { suggestion: string | null; country: string | null } };
}

const NONE = { suggestion: null, country: null };

afterEach(() => {
  vi.doUnmock("@/lib/i18n/locales");
  vi.resetModules();
});

describe("with German, French, Hindi, Portuguese and Arabic translated (test registry)", () => {
  it("suggests from the request's CF-IPCountry header", async () => {
    expect((await ask("test", { country: "DE" })).body).toEqual({ suggestion: "de", country: "DE" });
    expect((await ask("test", { country: "FR" })).body).toEqual({ suggestion: "fr", country: "FR" });
    expect((await ask("test", { country: "BR" })).body).toEqual({ suggestion: "pt", country: "BR" });
    expect((await ask("test", { country: "AE" })).body).toEqual({ suggestion: "ar", country: "AE" });
    expect((await ask("test", { country: "IN", path: "/in/pricing" })).body).toEqual({ suggestion: "hi", country: "IN" });
  });

  it("suggests nothing for an unmapped country or an untranslated language", async () => {
    expect((await ask("test", { country: "JP" })).body).toEqual(NONE);
    expect((await ask("test", { country: "ES" })).body).toEqual(NONE); // Spanish not translated yet
  });

  it("ignores Accept-Language when the country header is present", async () => {
    expect((await ask("test", { country: "DE", acceptLanguage: "en-GB,en" })).body.suggestion).toBe("de");
    expect((await ask("test", { country: "JP", acceptLanguage: "de-DE" })).body).toEqual(NONE);
  });

  it("falls back to Accept-Language only when no country header arrives", async () => {
    expect((await ask("test", { acceptLanguage: "de-DE,de;q=0.9,en;q=0.8" })).body).toEqual({
      suggestion: "de",
      country: null,
    });
    expect((await ask("test", {})).body).toEqual(NONE);
  });

  it("respects a saved choice and a dismissal", async () => {
    expect((await ask("test", { country: "DE", cookie: "zoiko_locale=en" })).body).toEqual(NONE);
    expect((await ask("test", { country: "DE", cookie: "zoiko_locale=de" })).body).toEqual(NONE);
    expect((await ask("test", { country: "DE", cookie: "zoiko_locale_prompt=dismissed" })).body).toEqual(NONE);
  });

  it("never suggests on sign-in or password-recovery routes, including under /in", async () => {
    for (const path of [
      "/auth/callback?token=TEST",
      "/reset-password?token=TEST",
      "/forgot-password",
      "/in/forgot-password",
    ]) {
      expect((await ask("test", { country: "DE", path })).body, path).toEqual(NONE);
    }
  });

  it("is never cached in a shared cache and varies on the country", async () => {
    const { res } = await ask("test", { country: "DE" });
    expect(res.headers.get("cache-control")).toBe("private, no-store");
    expect(res.headers.get("vary")).toBe("CF-IPCountry, Accept-Language, Cookie");
  });
});

describe("with the real registry (English only)", () => {
  it("suggests nothing, from any country", async () => {
    for (const country of ["DE", "FR", "IN", "BR", "AE", "CN", "ES"]) {
      expect((await ask("real", { country })).body, country).toEqual(NONE);
    }
  });
});
