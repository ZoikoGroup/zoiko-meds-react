import { getCountryCommercialPack, resolvePriceBook, type PriceBookQuery } from "./index";
import type { CountryCommercialPack, CurrencyCode, MarketCode, PriceBook } from "./types";

/**
 * MarketContext — ZM-IN-083's {market, cell, legal_entity, pack_versions,
 * locale} (request_id belongs to API calls, not a prerendered page).
 *
 * For a market page it is built on the server from the route the page lives
 * at (app/in/... is India) and that market's pack. It is deliberately NOT
 * derived from anything the visitor sends: not the CF-IPCountry header, the
 * x-zoiko-* headers, Accept-Language, cookies, a browser-selected currency or
 * a payment card's country. Those can suggest a market; they never set one.
 */
export interface MarketContext {
  readonly market: MarketCode;
  readonly cell: MarketCode;
  readonly legalEntity: string;
  readonly locale: string;
  readonly currency: CurrencyCode;
  readonly packVersions: { readonly commercial: string };
}

export interface MarketPricing {
  readonly context: MarketContext;
  readonly pack: CountryCommercialPack;
  readonly priceBook: PriceBook;
}

/** Everything a market's pricing page needs, resolved server-side. */
export async function loadMarketPricing(market: MarketCode, query?: PriceBookQuery): Promise<MarketPricing> {
  const pack = await getCountryCommercialPack(market);
  const priceBook = resolvePriceBook(pack, query);
  return {
    pack,
    priceBook,
    context: {
      market: pack.market,
      cell: pack.cell,
      legalEntity: pack.seller.legalName,
      locale: pack.defaultLocale,
      currency: pack.currency,
      packVersions: { commercial: priceBook.version },
    },
  };
}
