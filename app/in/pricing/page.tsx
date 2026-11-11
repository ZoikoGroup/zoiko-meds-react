import type { Metadata } from "next";

import SearchNeutralitySection from "@/components/pricing/SearchNeutralitySection";
import {
  IndiaPricingHeroSection,
  IndiaPlansSection,
  IndiaOrganisationPlansSection,
  IndiaHowPricingWorksSection,
  IndiaBillingSection,
  IndiaCtaBannerSection,
} from "@/components/pricing/india";
import { loadMarketPricing } from "@/lib/commercial/market-context";
import { presentMarketPricing } from "@/lib/commercial/present";

// The market is fixed by this route (/in/pricing) and resolved on the server
// from CountryCommercialPack(IN). Nothing the visitor sends — geo headers,
// x-zoiko-* headers, cookies, a chosen currency — is read here, so the page is
// the same for everyone who opens it, wherever they are.
const MARKET = "IN";

async function loadView() {
  return presentMarketPricing(await loadMarketPricing(MARKET));
}

export async function generateMetadata(): Promise<Metadata> {
  const view = await loadView();
  const { networkCore, chemistPro } = view.plans;
  return {
    title: `Pricing & Plans in ${view.marketName} (${view.currency}) | ZoikoMeds`,
    description: `Public medicine search is free and pharmacy ${networkCore.name} is free permanently. ${chemistPro.name} from ${chemistPro.price.amount} ${chemistPro.price.unit ?? ""}. ${view.taxNote}.`,
  };
}

export default async function IndiaPricingPage() {
  const view = await loadView();

  return (
    <main lang={view.locale}>
      <IndiaPricingHeroSection view={view} />
      <IndiaPlansSection view={view} />
      <IndiaOrganisationPlansSection view={view} />
      <IndiaHowPricingWorksSection view={view} />
      <IndiaBillingSection view={view} />
      <SearchNeutralitySection />
      <IndiaCtaBannerSection view={view} />
    </main>
  );
}
