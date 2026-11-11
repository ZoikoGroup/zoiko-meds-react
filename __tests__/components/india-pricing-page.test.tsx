import React from "react";
import { fireEvent, render, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// jsdom has no IntersectionObserver; framer-motion's whileInView needs one.
// Content is in the DOM either way — only the reveal animation never fires.
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

const push = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push, replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }),
  usePathname: () => "/pricing",
}));

import IndiaPricingPage, { generateMetadata } from "@/app/in/pricing/page";
import GlobalPricingPage from "@/app/pricing/page";

async function renderIndiaPage() {
  const utils = render(await IndiaPricingPage());
  const card = (key: string) => {
    const element = utils.container.querySelector<HTMLElement>(`[data-plan="${key}"]`);
    if (!element) throw new Error(`no card for plan ${key}`);
    return element;
  };
  const hrefs = () =>
    Array.from(utils.container.querySelectorAll("a[href]")).map((a) => a.getAttribute("href") ?? "");
  return { ...utils, card, hrefs };
}

describe("/in/pricing page", () => {
  it("shows India prices in INR, ex-GST", async () => {
    const { container, card } = await renderIndiaPage();
    const text = container.textContent ?? "";

    expect(text).toContain("India · INR (₹)");
    expect(text).toContain("Prices shown ex-GST");
    expect(text).toContain("Zoiko Industries Pvt Ltd, operating ZoikoMeds");

    expect(within(card("publicSearch")).getByText("Free")).toBeInTheDocument();

    const core = within(card("networkCore"));
    expect(core.getByText("Free")).toBeInTheDocument();
    expect(core.getByText("Free permanently")).toBeInTheDocument();
    expect(core.getByText("No local demand intelligence")).toBeInTheDocument();

    const pro = within(card("chemistPro"));
    expect(pro.getByText("₹499")).toBeInTheDocument();
    expect(pro.getByText("/ store / month")).toBeInTheDocument();
    expect(pro.getByText("or ₹4,999 / store / year")).toBeInTheDocument();
    expect(pro.getByText("30-day trial after verification")).toBeInTheDocument();
    expect(pro.getByText("Everything in Network Core, plus:")).toBeInTheDocument();

    const multiSite = within(card("multiSitePro"));
    expect(multiSite.getByText("₹399")).toBeInTheDocument();
    expect(multiSite.getByText("/ store / month")).toBeInTheDocument();
    expect(multiSite.getByText("Annual commitment")).toBeInTheDocument();
    expect(multiSite.getByText("5–25 India locations")).toBeInTheDocument();
    expect(multiSite.getByText("No ranking benefit")).toBeInTheDocument();

    const enterprise = within(card("enterpriseNetwork"));
    expect(enterprise.getByText("Custom")).toBeInTheDocument();
    expect(enterprise.getByText("Quoted annual contract")).toBeInTheDocument();
    expect(enterprise.getByText("26+ India locations")).toBeInTheDocument();
    expect(enterprise.getByRole("link")).toHaveTextContent("Contact Sales");

    expect(within(card("distributorIntelligence")).getByText("₹9,999–₹29,999")).toBeInTheDocument();
    expect(within(card("zoikoSignal")).getByText("Quoted annual data contract")).toBeInTheDocument();
    expect(within(card("publicHealth")).getByText("Tender / PPP / contract")).toBeInTheDocument();
  });

  it("never shows the global USD pricing", async () => {
    const { container } = await renderIndiaPage();
    const text = container.textContent ?? "";

    expect(text).not.toContain("$149");
    expect(text).not.toMatch(/\$\s?\d/);
    expect(text).not.toContain("USD");
    expect(text).not.toContain("Intelligence Pro");
  });

  it("sends Sign In to the platform login and account CTAs to the platform register page", async () => {
    const { getAllByRole, card } = await renderIndiaPage();

    const signIn = getAllByRole("link", { name: "Sign In" });
    expect(signIn.length).toBeGreaterThan(0);
    signIn.forEach((link) => expect(link).toHaveAttribute("href", "https://app.zoikomeds.com/login"));

    const createAccount = getAllByRole("link", { name: "Create Account" });
    expect(createAccount.length).toBeGreaterThan(0);
    createAccount.forEach((link) => expect(link).toHaveAttribute("href", "https://app.zoikomeds.com/register"));

    expect(within(card("networkCore")).getByRole("link")).toHaveAttribute("href", "https://app.zoikomeds.com/register");
    expect(within(card("chemistPro")).getByRole("link")).toHaveAttribute("href", "https://app.zoikomeds.com/register");
    expect(within(card("multiSitePro")).getByRole("link")).toHaveAttribute("href", "https://app.zoikomeds.com/register");
  });

  it("links nowhere near the old Vercel host or a /en-in/ URL", async () => {
    const { hrefs } = await renderIndiaPage();
    const all = hrefs();

    expect(all.length).toBeGreaterThan(5);
    expect(all.filter((href) => /vercel\.app/.test(href))).toEqual([]);
    expect(all.filter((href) => /\/en-in(\/|$)/.test(href))).toEqual([]);
  });

  it("has India metadata built from the pack", async () => {
    const metadata = await generateMetadata();
    expect(metadata.title).toBe("Pricing & Plans in India (INR) | ZoikoMeds");
    expect(metadata.description).toContain("₹499 / store / month");
    expect(metadata.description).toContain("Prices shown ex-GST");
  });
});

describe("global /pricing page (unchanged)", () => {
  it("still shows the global USD price, not INR", () => {
    const { container } = render(<GlobalPricingPage />);
    const text = container.textContent ?? "";

    expect(text).toContain("$149");
    expect(text).not.toContain("₹");
  });

  it("has no pricing CTA pointing at the old Vercel host", () => {
    push.mockClear();
    const { container } = render(<GlobalPricingPage />);

    const hrefs = Array.from(container.querySelectorAll("a[href]")).map((a) => a.getAttribute("href") ?? "");
    container.querySelectorAll("button").forEach((button) => fireEvent.click(button));
    const pushed = push.mock.calls.map(([url]) => String(url));

    expect(pushed.length).toBeGreaterThan(0);
    expect([...hrefs, ...pushed].filter((url) => /vercel\.app/.test(url))).toEqual([]);
    expect(pushed).toContain("https://app.zoikomeds.com/dashboard");
  });
});
