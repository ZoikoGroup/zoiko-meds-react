import { IN_COMMERCIAL_PACK } from "./packs/in";
import type { CountryCommercialPack, MarketCode, Money, PlanKey, PriceBook } from "./types";

export type * from "./types";

const PACKS: { readonly [M in MarketCode]: CountryCommercialPack } = {
  IN: IN_COMMERCIAL_PACK,
};

/**
 * The market's commercial pack. Today it is the bundled data in ./packs; when
 * the platform exposes CountryCommercialPack publicly, replace this body with
 * that call — callers already await it, so nothing else has to change.
 */
export async function getCountryCommercialPack(market: MarketCode): Promise<CountryCommercialPack> {
  return PACKS[market];
}

export interface PriceBookQuery {
  /** Resolve the version current at this instant. Defaults to now. */
  at?: Date;
  /**
   * A cohort's or contract's bound version (grandfathering, ZM-IN-016). When
   * set, that exact version is returned regardless of `at`.
   */
  boundVersion?: string;
}

/** The price book version that applies — bound version first, else by effective date. */
export function resolvePriceBook(pack: CountryCommercialPack, query: PriceBookQuery = {}): PriceBook {
  if (query.boundVersion !== undefined) {
    const bound = pack.priceBooks.find((b) => b.version === query.boundVersion);
    if (!bound) {
      throw new Error(`${pack.market} has no price book version "${query.boundVersion}".`);
    }
    return bound;
  }

  // Effective dates are market-local: an India version dated 2026-10-01 takes
  // effect at midnight IST, not midnight UTC. en-CA formats as YYYY-MM-DD.
  const day = new Intl.DateTimeFormat("en-CA", {
    timeZone: pack.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(query.at ?? new Date());
  // Versions are ordered by effectiveFrom (enforced below), so the last one
  // already in effect is current; each later version supersedes the earlier.
  const current = pack.priceBooks.filter((b) => b.effectiveFrom <= day).at(-1);
  if (!current) {
    throw new Error(`${pack.market} has no price book in effect on ${day}.`);
  }
  return current;
}

/**
 * Structural problems with a pack, as messages; empty when valid. Checked for
 * every bundled pack at module load so a bad edit fails the build instead of
 * publishing a wrong price.
 */
export function validateCommercialPack(pack: CountryCommercialPack): string[] {
  const problems: string[] = [];
  const checkMoney = (where: string, money: Money) => {
    if (money.currency !== pack.currency) {
      problems.push(`${where}: currency ${money.currency} is not the pack currency ${pack.currency}`);
    }
    if (!Number.isInteger(money.amountMinor) || money.amountMinor < 0) {
      problems.push(`${where}: amountMinor must be a non-negative integer`);
    }
  };

  if (pack.priceBooks.length === 0) problems.push(`${pack.market}: no price books`);

  const seen = new Set<string>();
  let previousFrom = "";
  for (const book of pack.priceBooks) {
    if (seen.has(book.version)) problems.push(`${book.version}: duplicate version`);
    seen.add(book.version);
    if (!book.version.startsWith(`${pack.market}-`)) {
      problems.push(`${book.version}: version must start with "${pack.market}-"`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(book.effectiveFrom) || Number.isNaN(Date.parse(book.effectiveFrom))) {
      problems.push(`${book.version}: effectiveFrom "${book.effectiveFrom}" is not a YYYY-MM-DD date`);
    } else if (book.effectiveFrom <= previousFrom) {
      problems.push(`${book.version}: effectiveFrom must be later than the previous version's`);
    }
    previousFrom = book.effectiveFrom;

    for (const [key, plan] of Object.entries(book.plans) as [PlanKey, PriceBook["plans"][PlanKey]][]) {
      const where = `${book.version}.${key}`;
      if (plan.key !== key) problems.push(`${where}: plan.key is "${plan.key}"`);
      if (plan.includes && !(plan.includes in book.plans)) {
        problems.push(`${where}: includes unknown plan "${plan.includes}"`);
      }
      if (plan.trial && !(plan.trial.downgradesTo in book.plans)) {
        problems.push(`${where}: trial downgrades to unknown plan "${plan.trial.downgradesTo}"`);
      }
      const { price } = plan;
      if (price.kind === "per-store") {
        if (price.options.length === 0) problems.push(`${where}: per-store price has no options`);
        price.options.forEach((o, i) => checkMoney(`${where}.options[${i}]`, o.amount));
      } else if (price.kind === "band") {
        checkMoney(`${where}.min`, price.min);
        checkMoney(`${where}.max`, price.max);
        if (price.min.amountMinor >= price.max.amountMinor) problems.push(`${where}: band min must be below max`);
      }
    }
  }
  return problems;
}

for (const pack of Object.values(PACKS)) {
  const problems = validateCommercialPack(pack);
  if (problems.length > 0) {
    throw new Error(`Invalid CountryCommercialPack(${pack.market}):\n  ${problems.join("\n  ")}`);
  }
}
