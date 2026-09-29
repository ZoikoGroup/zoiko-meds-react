/**
 * Country commercial packs — the typed shape of a market's price book.
 *
 * ZM-IN-SPEC-001 ZM-IN-010: every India offer, price, trial and plan name
 * resolves from CountryCommercialPack(IN); no UI may hard-code them. The
 * website reads a pack through `getCountryCommercialPack()` (./index.ts), so
 * the bundled data in ./packs can later be swapped for the platform's own
 * CountryCommercialPack without touching any page or component.
 *
 * This is display data for the public pricing page. It is not a billing
 * system: whether a customer may actually be charged India pricing (ZM-IN-011
 * — India tenant, valid tax profile, India seller, INR, India cell) is decided
 * by the platform at checkout, never here.
 */

/** Markets that have a commercial pack. Extend when a new pack is added. */
export type MarketCode = "IN";

/** ISO 4217 currency codes used by the packs. */
export type CurrencyCode = "INR";

/** An amount in the currency's minor unit (paise for INR) — never a float. */
export interface Money {
  readonly amountMinor: number;
  readonly currency: CurrencyCode;
}

export type BillingInterval = "month" | "year";

/** One way to pay for a per-store plan, e.g. ₹499 / store / month. */
export interface PerStorePriceOption {
  readonly amount: Money;
  readonly interval: BillingInterval;
  /** Set when the price is only available on an annual commitment. */
  readonly commitment?: "annual";
}

/** How a quoted (non-list) price is agreed. */
export type QuoteBasis = "annual-contract" | "annual-data-contract" | "tender-ppp-contract";

export type PlanPrice =
  | { readonly kind: "free"; readonly permanent: boolean }
  | { readonly kind: "per-store"; readonly options: readonly PerStorePriceOption[] }
  | {
      readonly kind: "band";
      readonly min: Money;
      readonly max: Money;
      readonly interval: BillingInterval;
      /** How the band is described, e.g. "Launch bands". */
      readonly label?: string;
    }
  | { readonly kind: "quoted"; readonly basis: QuoteBasis };

export interface TrialRule {
  readonly days: number;
  /** The trial starts only once the pharmacy is verified (ZM-IN-013). */
  readonly startsAfter: "verification";
  readonly cardRequired: boolean;
  /** Where the account lands when the trial ends without payment. */
  readonly downgradesTo: PlanKey;
}

/** What a plan's call to action does. Hosts/URLs are resolved by the site. */
export type PlanCtaAction = "search" | "register" | "contact-sales";

export type PlanKey =
  | "publicSearch"
  | "networkCore"
  | "chemistPro"
  | "multiSitePro"
  | "enterpriseNetwork"
  | "distributorIntelligence"
  | "zoikoSignal"
  | "publicHealth";

/** Who the offer is for — used to group offers on the page. */
export type PlanAudience = "people" | "pharmacy" | "organisation";

export interface CommercialPlan {
  readonly key: PlanKey;
  readonly name: string;
  readonly audience: PlanAudience;
  /** Buyer column of the price book, e.g. "Independent pharmacy / chemist". */
  readonly buyer: string;
  readonly price: PlanPrice;
  /** Location-count eligibility, e.g. Multi-site Pro is 5–25 locations. */
  readonly locations?: { readonly min: number; readonly max?: number };
  /** Plan whose entitlements this one includes ("Everything in …, plus"). */
  readonly includes?: PlanKey;
  readonly benefits: readonly string[];
  /** Explicit commercial boundaries, e.g. "No local demand intelligence". */
  readonly limitations: readonly string[];
  readonly trial?: TrialRule;
  readonly cta: { readonly action: PlanCtaAction; readonly label: string };
}

/**
 * One immutable, effective-dated version of a market's prices (ZM-IN-016).
 * Never edit a version once it is live: publish a new version with a later
 * `effectiveFrom`. Customers on an earlier version keep it (grandfathering)
 * by resolving with `boundVersion` — see resolvePriceBook().
 */
export interface PriceBook {
  /** Immutable version id, e.g. "IN-2026.09". */
  readonly version: string;
  /** Date (YYYY-MM-DD, in the pack's time zone) from which this version is current. */
  readonly effectiveFrom: string;
  /** Where the numbers come from, for audit. */
  readonly source: string;
  readonly plans: { readonly [K in PlanKey]: CommercialPlan };
}

export interface CountryCommercialPack {
  readonly market: MarketCode;
  /** Display name of the market, e.g. "India". */
  readonly marketName: string;
  /** Data-plane cell the market's tenants are bound to. */
  readonly cell: MarketCode;
  readonly currency: CurrencyCode;
  /** BCP 47 locale used to format this market's prices. */
  readonly defaultLocale: string;
  /** IANA time zone in which price-book effective dates are read. */
  readonly timeZone: string;
  readonly seller: {
    readonly legalName: string;
    /** How the seller is named on invoices and legal surfaces. */
    readonly displayName: string;
  };
  /** Published prices exclude this tax; it is added on the invoice. */
  readonly tax: { readonly name: string; readonly pricesInclusive: boolean };
  /** All versions, oldest first. Append only. */
  readonly priceBooks: readonly PriceBook[];
}
