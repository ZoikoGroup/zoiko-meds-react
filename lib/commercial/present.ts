import { appUrl } from "@/lib/config";
import type { MarketPricing } from "./market-context";
import type {
  CommercialPlan,
  MarketCode,
  Money,
  PerStorePriceOption,
  PlanCtaAction,
  PlanKey,
  PlanPrice,
  PriceBook,
  QuoteBasis,
} from "./types";

/**
 * Turns a resolved market price book into display strings for the pricing
 * page. Runs on the server so client components receive finished text and
 * never re-format money in the browser (no Intl differences at hydration).
 */

/** Canonical site root of each market (ZM-IN-140: zoikomeds.com/in/). */
const MARKET_ROOT: { readonly [M in MarketCode]: string } = { IN: "/in" };

const QUOTE_TERMS: { readonly [B in QuoteBasis]: string } = {
  "annual-contract": "Quoted annual contract",
  "annual-data-contract": "Quoted annual data contract",
  "tender-ppp-contract": "Tender / PPP / contract",
};

export function formatMoney(money: Money, locale: string): string {
  const digits = money.amountMinor % 100 === 0 ? 0 : 2;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: money.currency,
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(money.amountMinor / 100);
}

export interface PriceDisplay {
  /** "Free", "₹499", "₹9,999–₹29,999" or "Custom". */
  readonly amount: string;
  /** Unit after the amount, e.g. "/ store / month". */
  readonly unit?: string;
  /** Other ways to pay, e.g. "or ₹4,999 / store / year". */
  readonly alternatives: readonly string[];
  /** Commercial terms, e.g. "Annual commitment", "Quoted annual contract". */
  readonly terms: readonly string[];
}

const perStoreUnit = (option: PerStorePriceOption) => `/ store / ${option.interval}`;

export function describePrice(price: PlanPrice, locale: string): PriceDisplay {
  switch (price.kind) {
    case "free":
      return { amount: "Free", alternatives: [], terms: price.permanent ? ["Free permanently"] : [] };
    case "per-store": {
      const [first, ...others] = price.options;
      return {
        amount: formatMoney(first.amount, locale),
        unit: perStoreUnit(first),
        alternatives: others.map((o) => `or ${formatMoney(o.amount, locale)} ${perStoreUnit(o)}`),
        terms: price.options.some((o) => o.commitment === "annual") ? ["Annual commitment"] : [],
      };
    }
    case "band":
      return {
        amount: `${formatMoney(price.min, locale)}–${formatMoney(price.max, locale)}`,
        unit: `/ ${price.interval}`,
        alternatives: [],
        terms: price.label ? [price.label] : [],
      };
    case "quoted":
      return { amount: "Custom", alternatives: [], terms: [QUOTE_TERMS[price.basis]] };
  }
}

export interface Link {
  readonly label: string;
  readonly href: string;
}

export interface PlanView {
  readonly key: PlanKey;
  readonly name: string;
  readonly buyer: string;
  readonly price: PriceDisplay;
  /** e.g. "5–25 India locations". */
  readonly eligibility?: string;
  /** e.g. "Everything in Network Core, plus:". */
  readonly includesLabel?: string;
  readonly benefits: readonly string[];
  readonly limitations: readonly string[];
  readonly trialTerms: readonly string[];
  readonly trial?: { readonly days: number; readonly cardRequired: boolean; readonly downgradesTo: string };
  readonly cta: Link;
}

export interface MarketPricingView {
  readonly market: MarketCode;
  readonly marketName: string;
  readonly locale: string;
  readonly currency: string;
  /** e.g. "₹". */
  readonly currencySymbol: string;
  readonly priceBookVersion: string;
  /** "Prices shown ex-GST". */
  readonly taxNote: string;
  readonly seller: string;
  readonly signIn: Link;
  readonly createAccount: Link;
  readonly contactSales: Link;
  readonly plans: { readonly [K in PlanKey]: PlanView };
}

/** Where a plan's call to action goes. Platform links go through appUrl(). */
export function ctaHref(action: PlanCtaAction, market: MarketCode): string {
  switch (action) {
    case "register":
      return appUrl("/register");
    case "search":
      return `${MARKET_ROOT[market]}/searchmed`;
    case "contact-sales":
      return `${MARKET_ROOT[market]}/talk-to-sales`;
  }
}

function eligibilityLabel(plan: CommercialPlan, marketName: string): string | undefined {
  if (!plan.locations) return undefined;
  const { min, max } = plan.locations;
  return max === undefined ? `${min}+ ${marketName} locations` : `${min}–${max} ${marketName} locations`;
}

function trialTerms(plan: CommercialPlan, book: PriceBook): string[] {
  if (!plan.trial) return [];
  const { days, cardRequired, downgradesTo } = plan.trial;
  return [
    `${days}-day trial after verification`,
    ...(cardRequired ? [] : ["No card required"]),
    `Trial ends on ${book.plans[downgradesTo].name}; your listing and availability sync continue`,
  ];
}

export function presentMarketPricing({ context, pack, priceBook }: MarketPricing): MarketPricingView {
  const plans = Object.fromEntries(
    Object.values(priceBook.plans).map((plan): [PlanKey, PlanView] => [
      plan.key,
      {
        key: plan.key,
        name: plan.name,
        buyer: plan.buyer,
        price: describePrice(plan.price, context.locale),
        eligibility: eligibilityLabel(plan, pack.marketName),
        includesLabel: plan.includes ? `Everything in ${priceBook.plans[plan.includes].name}, plus:` : undefined,
        benefits: plan.benefits,
        limitations: plan.limitations,
        trialTerms: trialTerms(plan, priceBook),
        trial: plan.trial && {
          days: plan.trial.days,
          cardRequired: plan.trial.cardRequired,
          downgradesTo: priceBook.plans[plan.trial.downgradesTo].name,
        },
        cta: { label: plan.cta.label, href: ctaHref(plan.cta.action, context.market) },
      },
    ]),
  ) as { [K in PlanKey]: PlanView };

  return {
    market: context.market,
    marketName: pack.marketName,
    locale: context.locale,
    currency: context.currency,
    currencySymbol:
      new Intl.NumberFormat(context.locale, { style: "currency", currency: context.currency })
        .formatToParts(0)
        .find((part) => part.type === "currency")?.value ?? context.currency,
    priceBookVersion: context.packVersions.commercial,
    taxNote: pack.tax.pricesInclusive ? `Prices include ${pack.tax.name}` : `Prices shown ex-${pack.tax.name}`,
    seller: pack.seller.displayName,
    signIn: { label: "Sign In", href: appUrl("/login") },
    createAccount: { label: "Create Account", href: appUrl("/register") },
    contactSales: { label: "Contact Sales", href: ctaHref("contact-sales", context.market) },
    plans,
  };
}
