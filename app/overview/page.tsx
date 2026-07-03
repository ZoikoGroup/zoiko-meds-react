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
    OverviewCTASection
} from "@/components/overview";

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