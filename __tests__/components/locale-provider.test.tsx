import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TEST_LOCALES } from "../fixtures/site-locales";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ refresh: vi.fn(), push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }),
}));

import LocaleProvider, { useLocale, useTranslation } from "@/components/language/LocaleProvider";
import Footer from "@/components/layout/Footer";
import NotFound from "@/app/not-found";

function Probe() {
  const { locale } = useLocale();
  const t = useTranslation();
  return (
    <div>
      <span data-testid="code">{locale.code}</span>
      <span data-testid="tagline">{t("footer.tagline")}</span>
      <span data-testid="stay">{t("language.stay", { language: locale.name })}</span>
    </div>
  );
}

function clearCookies() {
  for (const entry of document.cookie.split("; ").filter(Boolean)) {
    document.cookie = `${entry.split("=")[0]}=; path=/; max-age=0`;
  }
}

beforeEach(() => {
  clearCookies();
  document.documentElement.lang = "en";
  document.documentElement.dir = "";
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("LocaleProvider", () => {
  it("defaults to English and leaves the document in English", async () => {
    render(
      <LocaleProvider locales={TEST_LOCALES}>
        <Probe />
      </LocaleProvider>,
    );
    await act(async () => {});

    expect(screen.getByTestId("code")).toHaveTextContent("en");
    expect(screen.getByTestId("tagline").textContent).toContain("Global medicine availability infrastructure");
    expect(document.documentElement.lang).toBe("en");
    expect(document.documentElement.dir).toBe("ltr");
  });

  it("applies a saved language and translates the chrome", async () => {
    document.cookie = "zoiko_locale=de; path=/";
    render(
      <LocaleProvider locales={TEST_LOCALES}>
        <Probe />
      </LocaleProvider>,
    );

    await waitFor(() => expect(screen.getByTestId("code")).toHaveTextContent("de"));
    expect(screen.getByTestId("tagline").textContent).toContain("Globale Infrastruktur");
    expect(screen.getByTestId("stay")).toHaveTextContent("Weiter auf German");
    expect(document.documentElement.lang).toBe("de");
  });

  it("sets lang and direction for a right-to-left language", async () => {
    document.cookie = "zoiko_locale=ar; path=/";
    render(
      <LocaleProvider locales={TEST_LOCALES}>
        <Probe />
      </LocaleProvider>,
    );

    await waitFor(() => expect(document.documentElement.dir).toBe("rtl"));
    expect(document.documentElement.lang).toBe("ar");
  });

  it("uses the canonical BCP 47 tag for Simplified Chinese", async () => {
    document.cookie = "zoiko_locale=zh-hans; path=/";
    render(
      <LocaleProvider locales={TEST_LOCALES}>
        <Probe />
      </LocaleProvider>,
    );

    await waitFor(() => expect(document.documentElement.lang).toBe("zh-Hans"));
    expect(document.documentElement.dir).toBe("ltr");
  });

  it("ignores a cookie naming a language that is not finished", async () => {
    document.cookie = "zoiko_locale=es; path=/"; // Spanish is unavailable in the test registry
    render(
      <LocaleProvider locales={TEST_LOCALES}>
        <Probe />
      </LocaleProvider>,
    );
    await act(async () => {});

    expect(screen.getByTestId("code")).toHaveTextContent("en");
    expect(document.documentElement.lang).toBe("en");
  });
});

describe("migrated chrome renders from the catalogs", () => {
  it("the footer is English by default", async () => {
    render(
      <LocaleProvider locales={TEST_LOCALES}>
        <Footer />
      </LocaleProvider>,
    );
    await act(async () => {});

    expect(screen.getByText("Infrastructure monitoring active")).toBeInTheDocument();
    expect(screen.getByText("Platform")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Search medicines" })).toHaveAttribute("href", "/searchmed");
    expect(screen.getByText(/Zoiko Group Inc. All rights reserved/)).toBeInTheDocument();
  });

  it("the footer follows a saved language, keeping its links", async () => {
    document.cookie = "zoiko_locale=de; path=/";
    render(
      <LocaleProvider locales={TEST_LOCALES}>
        <Footer />
      </LocaleProvider>,
    );

    await waitFor(() => expect(screen.getByText("Infrastrukturüberwachung aktiv")).toBeInTheDocument());
    expect(screen.getByText("Plattform")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Arzneimittel suchen" })).toHaveAttribute("href", "/searchmed");
    expect(screen.queryByText("Infrastructure monitoring active")).toBeNull();
  });

  it("the 404 page follows the language too", async () => {
    document.cookie = "zoiko_locale=hi; path=/";
    render(
      <LocaleProvider locales={TEST_LOCALES}>
        <NotFound />
      </LocaleProvider>,
    );

    await waitFor(() => expect(screen.getByText("यह फ़ार्मेसी पथ मौजूद नहीं है।")).toBeInTheDocument());
    expect(screen.getByRole("link", { name: /होम पर वापस जाएँ/ })).toHaveAttribute("href", "/");
  });

  it("a year is interpolated, not left as a placeholder", async () => {
    render(
      <LocaleProvider locales={TEST_LOCALES}>
        <Footer />
      </LocaleProvider>,
    );
    await act(async () => {});

    const year = String(new Date().getFullYear());
    expect(screen.getByText(new RegExp(`${year} Zoiko Group Inc`))).toBeInTheDocument();
    expect(document.body.textContent).not.toContain("{year}");
  });
});
