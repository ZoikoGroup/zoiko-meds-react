import type { Metadata } from "next";

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
  AnalyticsClosingCtaSection,
} from "@/components/analytics";

export const metadata: Metadata = {
  title: "Medicine Availability Analytics and Insights | ZoikoMeds",
  description:
    "ZoikoMeds provides medicine availability analytics to help stakeholders monitor trends, analyze pharmacy signals, and understand regional demand patterns.",
};

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
