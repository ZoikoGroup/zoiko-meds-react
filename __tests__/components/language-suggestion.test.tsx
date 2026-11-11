import React from "react";
import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TEST_LOCALES } from "../fixtures/site-locales";

// jsdom has no IntersectionObserver; the India pricing page's reveal animation needs one.
vi.stubGlobal(
  "IntersectionObserver",
  class {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  },
);

let pathname = "/";
const router = { refresh: vi.fn(), push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() };
vi.mock("next/navigation", () => ({
  usePathname: () => pathname,
  useRouter: () => router,
}));

import LanguageSuggestion from "@/components/language/LanguageSuggestion";
import IndiaPricingPage from "@/app/in/pricing/page";
import { loadMarketPricing } from "@/lib/commercial/market-context";

const fetchMock = vi.fn();

/** The server decided this from the request's trusted CF-IPCountry header. */
function serverSuggests(code: string | null, country: string | null = null) {
  fetchMock.mockResolvedValue({ ok: true, json: async () => ({ suggestion: code, country }) });
}

function cookie(name: string): string | undefined {
  return document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

function clearCookies() {
  for (const entry of document.cookie.split("; ").filter(Boolean)) {
    document.cookie = `${entry.split("=")[0]}=; path=/; max-age=0`;
  }
}

function visit(path: string) {
  const url = new URL(path, "http://localhost:3000");
  pathname = url.pathname;
  window.history.pushState({}, "", url.pathname + url.search);
}

beforeEach(() => {
  clearCookies();
  visit("/");
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
  Object.values(router).forEach((fn) => fn.mockReset());
});

afterEach(() => {
  document.body.innerHTML = "";
});

describe("language prompt — shown only with a real suggestion", () => {
  it("visitor in Germany on an English site: offers German, asks once", async () => {
    serverSuggests("de", "DE");
    render(<LanguageSuggestion locales={TEST_LOCALES} />);

    const dialog = await screen.findByRole("dialog", { name: "We detected your region" });
    expect(within(dialog).getByText("DE")).toBeInTheDocument();
    expect(within(dialog).getByText("German")).toBeInTheDocument();
    expect(within(dialog).getByText("Deutsch")).toHaveAttribute("lang", "de");
    expect(within(dialog).getByText("Would you like to switch language?")).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Continue in English" })).toBeInTheDocument();
    expect(within(dialog).getByRole("button", { name: "Switch to German" })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith("/internal/locale-suggestion?path=%2F", { cache: "no-store" });
  });

  it("uses the same component for every country — names come from the registry", async () => {
    serverSuggests("fr", "FR");
    const first = render(<LanguageSuggestion locales={TEST_LOCALES} />);
    expect(await screen.findByRole("button", { name: "Switch to French" })).toBeInTheDocument();
    expect(within(await screen.findByRole("dialog")).getByText("FR")).toBeInTheDocument();
    first.unmount();

    serverSuggests("pt", "BR");
    const second = render(<LanguageSuggestion locales={TEST_LOCALES} />);
    const brazil = await screen.findByRole("dialog");
    // The badge is the region the suggestion came from, not the language code.
    expect(within(brazil).getByText("BR")).toBeInTheDocument();
    expect(within(brazil).getByRole("button", { name: "Switch to Portuguese" })).toBeInTheDocument();
    second.unmount();

    serverSuggests("hi", "IN");
    render(<LanguageSuggestion locales={TEST_LOCALES} />);
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByText("IN")).toBeInTheDocument();
    expect(within(dialog).getByText("हिन्दी")).toHaveAttribute("lang", "hi");
    expect(within(dialog).getByRole("button", { name: "Switch to Hindi" })).toBeInTheDocument();
  });

  it("stays in the current language when the server check is unreachable", async () => {
    fetchMock.mockRejectedValue(new Error("offline"));
    render(<LanguageSuggestion locales={TEST_LOCALES} />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    await act(async () => {});
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("an unmapped country (Japan) gets no prompt", async () => {
    serverSuggests(null, null);
    render(<LanguageSuggestion locales={TEST_LOCALES} />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("never offers a language the registry does not mark translated", async () => {
    serverSuggests("es", "ES"); // Spanish is registered but untranslated
    render(<LanguageSuggestion locales={TEST_LOCALES} />);
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("with the real registry (English only) it renders nothing and makes no request", async () => {
    render(<LanguageSuggestion />);
    await act(async () => {});
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).toBeNull();
  });
});

describe("language prompt — the visitor's answer", () => {
  it("Continue in English: closes, saves English, stays put", async () => {
    serverSuggests("de", "DE");
    render(<LanguageSuggestion locales={TEST_LOCALES} />);
    fireEvent.click(await screen.findByRole("button", { name: "Continue in English" }));

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(cookie("zoiko_locale")).toBe("en");
    expect(router.refresh).not.toHaveBeenCalled();
    expect(router.push).not.toHaveBeenCalled();
  });

  it("Switch to German: saves German and refreshes the same URL", async () => {
    serverSuggests("de", "DE");
    render(<LanguageSuggestion locales={TEST_LOCALES} />);
    fireEvent.click(await screen.findByRole("button", { name: "Switch to German" }));

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(cookie("zoiko_locale")).toBe("de");
    expect(router.refresh).toHaveBeenCalledTimes(1);
    expect(router.push).not.toHaveBeenCalled();
    expect(router.replace).not.toHaveBeenCalled();
  });

  it("Escape dismisses and is remembered", async () => {
    serverSuggests("de", "DE");
    render(<LanguageSuggestion locales={TEST_LOCALES} />);
    await screen.findByRole("dialog");
    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(cookie("zoiko_locale_prompt")).toBe("dismissed");
    expect(cookie("zoiko_locale")).toBeUndefined();
  });

  it("after any answer it does not come back — on reload or on the next page", async () => {
    serverSuggests("de", "DE");
    const first = render(<LanguageSuggestion locales={TEST_LOCALES} />);
    fireEvent.click(await screen.findByRole("button", { name: "Continue in English" }));
    first.unmount();
    fetchMock.mockClear();

    for (const next of ["/", "/pricing", "/in/pricing"]) {
      visit(next);
      const view = render(<LanguageSuggestion locales={TEST_LOCALES} />);
      await act(async () => {});
      expect(screen.queryByRole("dialog")).toBeNull();
      view.unmount();
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("a saved choice (English or German) means no request and no prompt", async () => {
    for (const saved of ["en", "de"]) {
      clearCookies();
      document.cookie = `zoiko_locale=${saved}; path=/`;
      const view = render(<LanguageSuggestion locales={TEST_LOCALES} />);
      await act(async () => {});
      expect(screen.queryByRole("dialog")).toBeNull();
      view.unmount();
    }
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("language prompt — never on sign-in or recovery routes", () => {
  it.each(["/auth/callback?token=TEST", "/reset-password?token=TEST", "/forgot-password", "/in/forgot-password"])(
    "%s: no request, no prompt",
    async (path) => {
      serverSuggests("de", "DE");
      visit(path);
      render(<LanguageSuggestion locales={TEST_LOCALES} />);
      await act(async () => {});
      expect(fetchMock).not.toHaveBeenCalled();
      expect(screen.queryByRole("dialog")).toBeNull();
    },
  );

  it("waits for a safe page after a client-side navigation away from a recovery route", async () => {
    serverSuggests("de", "DE");
    visit("/reset-password?token=TEST");
    const view = render(<LanguageSuggestion locales={TEST_LOCALES} />);
    await act(async () => {});
    expect(fetchMock).not.toHaveBeenCalled();

    visit("/pricing");
    view.rerender(<LanguageSuggestion locales={TEST_LOCALES} />);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});

describe("language prompt — accessibility and layout", () => {
  it("is a labelled modal dialog that traps focus, starting on the non-switching choice", async () => {
    serverSuggests("de", "DE");
    render(<LanguageSuggestion locales={TEST_LOCALES} />);
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription(/German.*Would you like to switch language\?/);

    const stay = within(dialog).getByRole("button", { name: "Continue in English" });
    const switchButton = within(dialog).getByRole("button", { name: "Switch to German" });
    await waitFor(() => expect(stay).toHaveFocus());

    switchButton.focus();
    fireEvent.keyDown(document, { key: "Tab" });
    expect(stay).toHaveFocus();
    fireEvent.keyDown(document, { key: "Tab", shiftKey: true });
    expect(switchButton).toHaveFocus();
  });

  it("does not touch the page's own layout (no scroll lock, no padding shift) and fits small screens", async () => {
    serverSuggests("de", "DE");
    render(<LanguageSuggestion locales={TEST_LOCALES} />);
    const dialog = await screen.findByRole("dialog");

    expect(document.body.getAttribute("style")).toBeNull();
    expect(document.documentElement.getAttribute("style")).toBeNull();
    expect(dialog.parentElement).toHaveClass("fixed", "inset-0", "p-4");
    expect(dialog).toHaveClass("w-full", "max-w-md");
  });
});

describe("/in/pricing — language never changes the market", () => {
  it("switching language on /in/pricing keeps the URL, and the page stays IN / INR", async () => {
    serverSuggests("hi", "IN");
    visit("/in/pricing");
    render(<LanguageSuggestion locales={TEST_LOCALES} />);
    fireEvent.click(await screen.findByRole("button", { name: "Switch to Hindi" }));
    expect(cookie("zoiko_locale")).toBe("hi");
    expect(router.push).not.toHaveBeenCalled();
    expect(window.location.pathname).toBe("/in/pricing");

    const { context } = await loadMarketPricing("IN", { at: new Date("2026-09-29T12:00:00Z") });
    expect(context).toMatchObject({ market: "IN", cell: "IN", currency: "INR" });

    const page = render(await IndiaPricingPage());
    const chemistPro = page.container.querySelector<HTMLElement>('[data-plan="chemistPro"]')!;
    expect(within(chemistPro).getByText("₹499")).toBeInTheDocument();
    expect(within(chemistPro).getByText("or ₹4,999 / store / year")).toBeInTheDocument();
    expect(page.container.textContent).not.toContain("$149");
  });
});
