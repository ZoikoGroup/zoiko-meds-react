import type { CountryCommercialPack, Money } from "../types";

/**
 * CountryCommercialPack(IN) — India launch price book.
 *
 * Source of truth: ZM-IN-SPEC-001 v1.0 (21 September 2026), §4 "India
 * commercial architecture". Prices are INR, exclusive of GST. This is the only
 * place India amounts live; pages and components read them through
 * getCountryCommercialPack("IN").
 *
 * ₹499 is a launch price hypothesis (spec §4, Commercial Control). To change a
 * price, do NOT edit IN-2026.09 — append a new version with a later
 * `effectiveFrom` (ZM-IN-016). Existing contracts keep their bound version.
 *
 * `effectiveFrom` is the spec's issue date; the spec does not state a separate
 * go-live date for this version. Confirm with Commercial before launch.
 */

const inr = (rupees: number): Money => ({ amountMinor: rupees * 100, currency: "INR" });

export const IN_COMMERCIAL_PACK: CountryCommercialPack = {
  market: "IN",
  marketName: "India",
  cell: "IN",
  currency: "INR",
  defaultLocale: "en-IN",
  timeZone: "Asia/Kolkata",
  seller: {
    legalName: "Zoiko Industries Pvt Ltd",
    displayName: "Zoiko Industries Pvt Ltd, operating ZoikoMeds",
  },
  tax: { name: "GST", pricesInclusive: false },
  priceBooks: [
    {
      version: "IN-2026.09",
      effectiveFrom: "2026-09-21",
      source: "ZM-IN-SPEC-001 v1.0 §4 (21 September 2026)",
      plans: {
        publicSearch: {
          key: "publicSearch",
          name: "Public Search",
          audience: "people",
          buyer: "People / caregivers",
          price: { kind: "free", permanent: false },
          benefits: ["Anonymous search", "Availability results", "Directions", "Privacy-safe alerts"],
          limitations: ["No clinical features"],
          cta: { action: "search", label: "Search Medicines" },
        },
        networkCore: {
          key: "networkCore",
          name: "Network Core",
          audience: "pharmacy",
          buyer: "Independent pharmacy / chemist",
          price: { kind: "free", permanent: true },
          benefits: [
            "Claimed and verified pharmacy profile",
            "Availability publishing and sync",
            "Confirmation controls",
            "Basic profile engagement",
          ],
          limitations: ["No local demand intelligence"],
          cta: { action: "register", label: "Join the Network" },
        },
        chemistPro: {
          key: "chemistPro",
          name: "Chemist Pro",
          audience: "pharmacy",
          buyer: "Independent pharmacy",
          price: {
            kind: "per-store",
            options: [
              { amount: inr(499), interval: "month" },
              { amount: inr(4_999), interval: "year" },
            ],
          },
          includes: "networkCore",
          benefits: [
            "Demand bands",
            "Unmet-demand and shortage alerts",
            "12-month trends",
            "Integration-health views",
            "Staff roles",
            "Reports",
          ],
          limitations: [],
          trial: { days: 30, startsAfter: "verification", cardRequired: false, downgradesTo: "networkCore" },
          cta: { action: "register", label: "Start Free Trial" },
        },
        multiSitePro: {
          key: "multiSitePro",
          name: "Multi-site Pro",
          audience: "pharmacy",
          buyer: "Pharmacy groups",
          price: {
            kind: "per-store",
            options: [{ amount: inr(399), interval: "month", commitment: "annual" }],
          },
          locations: { min: 5, max: 25 },
          includes: "chemistPro",
          benefits: ["Group console", "Role delegation", "Consolidated operational reporting"],
          limitations: ["No ranking benefit"],
          cta: { action: "register", label: "Create Account" },
        },
        enterpriseNetwork: {
          key: "enterpriseNetwork",
          name: "Enterprise Network",
          audience: "pharmacy",
          buyer: "Chains / hospitals",
          price: { kind: "quoted", basis: "annual-contract" },
          locations: { min: 26 },
          benefits: [
            "SSO",
            "APIs",
            "SLAs",
            "Custom governance",
            "Multi-entity administration",
            "Service desk",
          ],
          limitations: [],
          cta: { action: "contact-sales", label: "Contact Sales" },
        },
        distributorIntelligence: {
          key: "distributorIntelligence",
          name: "Distributor Intelligence",
          audience: "organisation",
          buyer: "Stockist / distributor",
          price: {
            kind: "band",
            min: inr(9_999),
            max: inr(29_999),
            interval: "month",
            label: "Launch bands",
          },
          benefits: ["Opted-in retailer demand-gap intelligence by approved geography"],
          limitations: ["No consumer-level or non-consenting retailer data"],
          cta: { action: "contact-sales", label: "Contact Sales" },
        },
        zoikoSignal: {
          key: "zoikoSignal",
          name: "ZoikoSignal™ India",
          audience: "organisation",
          buyer: "Pharma / institutions",
          price: { kind: "quoted", basis: "annual-data-contract" },
          benefits: ["Aggregated supply and availability intelligence"],
          limitations: [
            "Availability and shortage intelligence, not a promotional channel",
            "No message delivery, individual targeting or pharmacy identity",
          ],
          cta: { action: "contact-sales", label: "Contact Sales" },
        },
        publicHealth: {
          key: "publicHealth",
          name: "Public Health",
          audience: "organisation",
          buyer: "State / central programmes",
          price: { kind: "quoted", basis: "tender-ppp-contract" },
          benefits: [
            "Essential-medicine availability dashboards",
            "Governed exports",
            "Programme-specific reporting",
          ],
          limitations: [],
          cta: { action: "contact-sales", label: "Contact Sales" },
        },
      },
    },
  ],
};
