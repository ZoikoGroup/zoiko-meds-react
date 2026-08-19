import type { Metadata } from "next";

import {
  IntelligenceHero,
  IntelligenceTrustSafetySection,
  IntelligenceOverviewSection,
  AnalyticsCapabilitiesSection,
  IntelligenceAIInsightsSection,
  IntelligenceReportsSection,
  IntelligenceUseCasesSection,
  IntelligenceGovernanceSection,
  IntelligenceBriefingRequestSection,
  IntelligenceRecurringSection,
  IntelligenceFAQSection,
  IntelligenceFinalCTASection,
} from "@/components/intelligence";

export const metadata: Metadata = {
  title: "Medicine Availability Intelligence | ZoikoMeds",
  description:
    "Discover medicine availability intelligence with ZoikoMeds. Track signals, pharmacy networks, AI insights & reports for smarter decision",
};

export default function IntelligencePage() {
  return (
    <main>
      <IntelligenceHero />
      <IntelligenceTrustSafetySection />
      <IntelligenceOverviewSection />
      <AnalyticsCapabilitiesSection />
      <IntelligenceAIInsightsSection />
      <IntelligenceReportsSection />
      <IntelligenceUseCasesSection />
      <IntelligenceGovernanceSection />
      <IntelligenceBriefingRequestSection />
      <IntelligenceRecurringSection />
      <IntelligenceFAQSection />
      <IntelligenceFinalCTASection />
    </main>
  );
}
