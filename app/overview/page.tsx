import type { Metadata } from "next";

import {
  OverviewHeroSection,
  OverviewTrustSafetySection,
  OverviewPlatformSummarySection,
  OverviewCoreCapabilitiesSection,
  OverviewPlatformEcosystemSection,
  OverviewHowItWorksSection,
  OverviewStakeholderUseCasesSection,
  OverviewSecurityComplianceSection,
  OverviewIntegrationsSection,
  OverviewAnalyticsIntelligenceSection,
  OverviewCustomerSuccessSection,
  OverviewComparisonSection,
  OverviewBookDemoSection,
  OverviewFAQSection,
  OverviewCTASection,
} from "@/components/overview";

export const metadata: Metadata = {
  title: "Medicine Availability Platform Overview | ZoikoMeds",
  description:
    "Discover ZoikoMeds, a medicine availability intelligence platform helping healthcare teams track pharmacy signals, shortage risks, and regional access.",
};

export default function OverviewPage() {
  return (
    <main>
      <OverviewHeroSection />
      <OverviewTrustSafetySection />
      <OverviewPlatformSummarySection />
      <OverviewCoreCapabilitiesSection />
      <OverviewPlatformEcosystemSection />
      <OverviewHowItWorksSection />
      <OverviewStakeholderUseCasesSection />
      <OverviewSecurityComplianceSection />
      <OverviewIntegrationsSection />
      <OverviewAnalyticsIntelligenceSection />
      <OverviewCustomerSuccessSection />
      <OverviewComparisonSection />
      <OverviewBookDemoSection />
      <OverviewFAQSection />
      <OverviewCTASection />
    </main>
  );
}
