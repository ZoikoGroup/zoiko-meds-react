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
