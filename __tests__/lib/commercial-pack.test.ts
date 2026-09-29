import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  getCountryCommercialPack,
  resolvePriceBook,
  validateCommercialPack,
  type CountryCommercialPack,
  type PriceBook,
} from "@/lib/commercial";
import { loadMarketPricing } from "@/lib/commercial/market-context";
import { formatMoney, presentMarketPricing } from "@/lib/commercial/present";

const AT = new Date("2026-09-24T12:00:00Z");
const inr = (rupees: number) => ({ amountMinor: rupees * 100, currency: "INR" as const });

describe("CountryCommercialPack(IN)", () => {
  it("is the India market: INR, India cell, Zoiko Industries as seller, prices ex-GST", async () => {
    const pack = await getCountryCommercialPack("IN");
    expect(pack).toMatchObject({
      market: "IN",
      cell: "IN",
      currency: "INR",
      defaultLocale: "en-IN",
      seller: {
        legalName: "Zoiko Industries Pvt Ltd",
        displayName: "Zoiko Industries Pvt Ltd, operating ZoikoMeds",
      },
      tax: { name: "GST", pricesInclusive: false },
    });
    expect(validateCommercialPack(pack)).toEqual([]);
  });

  // Pins the published version. If this fails because a price changed, the
  // change belongs in a NEW price book version, not an edit to IN-2026.09.
  it("IN-2026.09 carries the ZM-IN-SPEC-001 §4 launch prices", async () => {
    const book = resolvePriceBook(await getCountryCommercialPack("IN"), { at: AT });
    const { plans } = book;

    expect(book.version).toBe("IN-2026.09");
    expect(plans.publicSearch.price).toEqual({ kind: "free", permanent: false });
    expect(plans.networkCore.price).toEqual({ kind: "free", permanent: true });
    expect(plans.chemistPro.price).toEqual({
      kind: "per-store",
      options: [
        { amount: inr(499), interval: "month" },
        { amount: inr(4999), interval: "year" },
      ],
    });
    expect(plans.chemistPro.trial).toEqual({
      days: 30,
      startsAfter: "verification",
      cardRequired: false,
      downgradesTo: "networkCore",
    });
    expect(plans.multiSitePro.price).toEqual({
      kind: "per-store",
      options: [{ amount: inr(399), interval: "month", commitment: "annual" }],
    });
    expect(plans.multiSitePro.locations).toEqual({ min: 5, max: 25 });
    expect(plans.enterpriseNetwork.price).toEqual({ kind: "quoted", basis: "annual-contract" });
    expect(plans.enterpriseNetwork.locations).toEqual({ min: 26 });
    expect(plans.distributorIntelligence.price).toEqual({
      kind: "band",
      min: inr(9999),
      max: inr(29999),
      interval: "month",
      label: "Launch bands",
    });
    expect(plans.zoikoSignal.price).toEqual({ kind: "quoted", basis: "annual-data-contract" });
    expect(plans.publicHealth.price).toEqual({ kind: "quoted", basis: "tender-ppp-contract" });
  });

  it("carries the spec's commercial boundaries for each pharmacy plan", async () => {
    const { plans } = resolvePriceBook(await getCountryCommercialPack("IN"), { at: AT });

    expect(plans.networkCore.benefits).toEqual([
      "Claimed and verified pharmacy profile",
      "Availability publishing and sync",
      "Confirmation controls",
      "Basic profile engagement",
    ]);
    expect(plans.networkCore.limitations).toEqual(["No local demand intelligence"]);

    expect(plans.chemistPro.includes).toBe("networkCore");
    expect(plans.chemistPro.benefits).toEqual([
      "Demand bands",
      "Unmet-demand and shortage alerts",
      "12-month trends",
      "Integration-health views",
      "Staff roles",
      "Reports",
    ]);

    expect(plans.multiSitePro.includes).toBe("chemistPro");
    expect(plans.multiSitePro.benefits).toEqual([
      "Group console",
      "Role delegation",
      "Consolidated operational reporting",
    ]);
    expect(plans.multiSitePro.limitations).toEqual(["No ranking benefit"]);

    expect(plans.enterpriseNetwork.benefits).toEqual([
      "SSO",
      "APIs",
      "SLAs",
      "Custom governance",
      "Multi-entity administration",
      "Service desk",
    ]);
  });
});

describe("resolvePriceBook — effective dating and grandfathering (ZM-IN-016)", () => {
  async function withNextVersion(): Promise<CountryCommercialPack> {
    const pack = await getCountryCommercialPack("IN");
    const current = pack.priceBooks[0];
    const next: PriceBook = {
      ...current,
      version: "IN-2027.01",
      effectiveFrom: "2027-01-01",
      plans: {
        ...current.plans,
        chemistPro: {
          ...current.plans.chemistPro,
          price: { kind: "per-store", options: [{ amount: inr(599), interval: "month" }] },
        },
      },
    };
    return { ...pack, priceBooks: [current, next] };
  }

  it("returns the version in effect on the given date", async () => {
    const pack = await withNextVersion();
    expect(resolvePriceBook(pack, { at: new Date("2026-12-15T12:00:00Z") }).version).toBe("IN-2026.09");
    expect(resolvePriceBook(pack, { at: new Date("2027-02-01T12:00:00Z") }).version).toBe("IN-2027.01");
  });

  it("reads effective dates in India time, not UTC", async () => {
    const pack = await withNextVersion();
    // Midnight 1 January in IST is 18:30 UTC on 31 December.
    expect(resolvePriceBook(pack, { at: new Date("2026-12-31T18:29:59Z") }).version).toBe("IN-2026.09");
    expect(resolvePriceBook(pack, { at: new Date("2026-12-31T18:30:00Z") }).version).toBe("IN-2027.01");
  });

  it("keeps a cohort bound to an earlier version on that version's prices", async () => {
    const pack = await withNextVersion();
    const book = resolvePriceBook(pack, { at: new Date("2027-06-01T12:00:00Z"), boundVersion: "IN-2026.09" });
    expect(book.plans.chemistPro.price).toEqual({
      kind: "per-store",
      options: [
        { amount: inr(499), interval: "month" },
        { amount: inr(4999), interval: "year" },
      ],
    });
  });

  it("refuses an unknown bound version and a date before any version", async () => {
    const pack = await getCountryCommercialPack("IN");
    expect(() => resolvePriceBook(pack, { boundVersion: "IN-1999.01" })).toThrow(/no price book version/);
    expect(() => resolvePriceBook(pack, { at: new Date("2026-01-01T00:00:00Z") })).toThrow(/no price book in effect/);
  });
});

describe("validateCommercialPack", () => {
  it("rejects wrong currency, out-of-order versions and inverted bands", async () => {
    const pack = await getCountryCommercialPack("IN");
    const current = pack.priceBooks[0];
    const broken: CountryCommercialPack = {
      ...pack,
      priceBooks: [
        current,
        {
          ...current,
          version: "IN-2026.08",
          effectiveFrom: "2026-08-01",
          plans: {
            ...current.plans,
            chemistPro: {
              ...current.plans.chemistPro,
              price: {
                kind: "per-store",
                options: [{ amount: { amountMinor: 14900, currency: "USD" as unknown as "INR" }, interval: "month" }],
              },
            },
            distributorIntelligence: {
              ...current.plans.distributorIntelligence,
              price: { kind: "band", min: inr(29999), max: inr(9999), interval: "month" },
            },
          },
        },
      ],
    };

    const problems = validateCommercialPack(broken).join("\n");
    expect(problems).toMatch(/IN-2026\.08: effectiveFrom must be later/);
    expect(problems).toMatch(/chemistPro\.options\[0\]: currency USD is not the pack currency INR/);
    expect(problems).toMatch(/distributorIntelligence: band min must be below max/);
  });
});

describe("India pricing presentation", () => {
  it("formats INR with Indian digit grouping", () => {
    expect(formatMoney(inr(499), "en-IN")).toBe("₹499");
    expect(formatMoney(inr(4999), "en-IN")).toBe("₹4,999");
    expect(formatMoney(inr(100000), "en-IN")).toBe("₹1,00,000");
    expect(formatMoney({ amountMinor: 49950, currency: "INR" }, "en-IN")).toBe("₹499.50");
  });

  it("resolves a server-side market context of IN / IN / en-IN / INR", async () => {
    const { context } = await loadMarketPricing("IN", { at: AT });
    expect(context).toEqual({
      market: "IN",
      cell: "IN",
      legalEntity: "Zoiko Industries Pvt Ltd",
      locale: "en-IN",
      currency: "INR",
      packVersions: { commercial: "IN-2026.09" },
    });
  });

  it("describes each plan's price from the pack", async () => {
    const view = presentMarketPricing(await loadMarketPricing("IN", { at: AT }));
    const { plans } = view;

    expect(view.taxNote).toBe("Prices shown ex-GST");
    expect(view.currencySymbol).toBe("₹");
    expect(view.seller).toBe("Zoiko Industries Pvt Ltd, operating ZoikoMeds");
    expect(plans.publicSearch.price).toEqual({ amount: "Free", alternatives: [], terms: [] });
    expect(plans.networkCore.price).toEqual({ amount: "Free", alternatives: [], terms: ["Free permanently"] });
    expect(plans.chemistPro.price).toEqual({
      amount: "₹499",
      unit: "/ store / month",
      alternatives: ["or ₹4,999 / store / year"],
      terms: [],
    });
    expect(plans.chemistPro.trialTerms).toEqual([
      "30-day trial after verification",
      "No card required",
      "Trial ends on Network Core; your listing and availability sync continue",
    ]);
    expect(plans.multiSitePro.price).toEqual({
      amount: "₹399",
      unit: "/ store / month",
      alternatives: [],
      terms: ["Annual commitment"],
    });
    expect(plans.multiSitePro.eligibility).toBe("5–25 India locations");
    expect(plans.enterpriseNetwork.price).toEqual({
      amount: "Custom",
      alternatives: [],
      terms: ["Quoted annual contract"],
    });
    expect(plans.enterpriseNetwork.eligibility).toBe("26+ India locations");
    expect(plans.distributorIntelligence.price).toEqual({
      amount: "₹9,999–₹29,999",
      unit: "/ month",
      alternatives: [],
      terms: ["Launch bands"],
    });
    expect(plans.zoikoSignal.price.terms).toEqual(["Quoted annual data contract"]);
    expect(plans.publicHealth.price.terms).toEqual(["Tender / PPP / contract"]);
  });

  it("sends account CTAs to the platform and sales CTAs to the /in/ site", async () => {
    const view = presentMarketPricing(await loadMarketPricing("IN", { at: AT }));

    expect(view.signIn.href).toBe("https://app.zoikomeds.com/login");
    expect(view.createAccount.href).toBe("https://app.zoikomeds.com/register");
    expect(view.plans.networkCore.cta.href).toBe("https://app.zoikomeds.com/register");
    expect(view.plans.chemistPro.cta.href).toBe("https://app.zoikomeds.com/register");
    expect(view.plans.multiSitePro.cta.href).toBe("https://app.zoikomeds.com/register");
    expect(view.plans.enterpriseNetwork.cta.href).toBe("/in/talk-to-sales");
    expect(view.plans.publicSearch.cta.href).toBe("/in/searchmed");
    expect(view.contactSales.href).toBe("/in/talk-to-sales");
  });
});

describe("platform URL", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("defaults to app.zoikomeds.com, not the old Vercel host", async () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", undefined);
    vi.resetModules();
    const { APP_BASE_URL, appUrl } = await import("@/lib/config");

    expect(APP_BASE_URL).toBe("https://app.zoikomeds.com");
    expect(appUrl("/login")).toBe("https://app.zoikomeds.com/login");
    expect(appUrl("/register")).toBe("https://app.zoikomeds.com/register");
  });
});

// ---------------------------------------------------------------------------
// Source guards: prices live only in the pack, and India pricing never reads
// anything the visitor sends.
// ---------------------------------------------------------------------------

const ROOT = path.resolve(__dirname, "../..");
const INDIA_PRICING_SOURCES = ["app/in", "components/pricing/india", "lib/commercial"];

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(ts|tsx)$/.test(name) ? [full] : [];
  });
}

function withoutComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

describe("India pricing source guards", () => {
  const files = INDIA_PRICING_SOURCES.flatMap((dir) => sourceFiles(path.join(ROOT, dir)));

  it("finds the India pricing sources", () => {
    expect(files.length).toBeGreaterThan(5);
  });

  it("keeps India amounts out of pages and components (they live in lib/commercial/packs)", () => {
    const offenders = files
      .filter((file) => !file.includes(`${path.sep}packs${path.sep}`))
      .filter((file) => /₹|\b(?:499|4,?999|399|9,?999|29,?999)\b/.test(withoutComments(readFileSync(file, "utf8"))));
    expect(offenders).toEqual([]);
  });

  it("never derives the market from request headers, cookies or geo", () => {
    const offenders = files.filter((file) =>
      /from\s+["']next\/headers["']|\bheaders\(\)|\bcookies\(\)|["'](?:cf-ipcountry|x-zoiko-region|x-zoiko-locale|accept-language)["']/i.test(
        withoutComments(readFileSync(file, "utf8")),
      ),
    );
    expect(offenders).toEqual([]);
  });
});
