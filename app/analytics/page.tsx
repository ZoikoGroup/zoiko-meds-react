import {
  AnalyticsHeroSection,
  AnalyticsTrustScopeSection,
  AnalyticsCommandViewSection,
  AnalyticsSignalSourcesSection,
  AnalyticsModulesSection,
  AnalyticsStakeholderSection,
  AnalyticsGovernanceSection,
  AnalyticsDashboardStatesSection,
  AnalyticsFaqSection,
  AnalyticsClosingCtaSection
} from "@/components/analytics";

export default function AnalyticsPage() {
  return (
    <main>
      <AnalyticsHeroSection />
      <AnalyticsTrustScopeSection />
      <AnalyticsCommandViewSection />
      <AnalyticsSignalSourcesSection />
      <AnalyticsModulesSection />
      <AnalyticsStakeholderSection />
      <AnalyticsGovernanceSection />
      <AnalyticsDashboardStatesSection />
      <AnalyticsFaqSection />
      <AnalyticsClosingCtaSection />
    </main>
  );
}