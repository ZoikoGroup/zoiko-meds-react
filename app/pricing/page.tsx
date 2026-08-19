import type { Metadata } from "next";

import {
  PricingHeroSection,
  CommercialBoundariesSection,
  PlansSection,
  HowPricingWorksSection,
  CompareTiersSection,
  SearchNeutralitySection,
  ProAndEnterpriseDetailSection,
  BillingAndTaxTransparencySection,
  CtaBannerSection,
} from "@/components/pricing";

export const metadata: Metadata = {
  title: "Pricing & Plans for Medicine Availability | ZoikoMeds",
  description:
    "Explore simple, governed pricing for medicine availability infrastructure. Patients search free, pharmacies join free, and enterprise tools are priced.",
};

export default function PricingPage() {
  return (
    <main>
      <PricingHeroSection />
      <CommercialBoundariesSection />
      <PlansSection />
      <HowPricingWorksSection />
      <CompareTiersSection />
      <SearchNeutralitySection />
      <ProAndEnterpriseDetailSection />
      <BillingAndTaxTransparencySection />
      <CtaBannerSection />
    </main>
  );
}
