import type { Metadata } from "next";

import {
  AiInsightsHeroSection,
  AiInsightsTrustBoundariesSection,
  AiInsightsHowItWorksSection,
  AiInsightsModulesSection,
  AiInsightsShortageSignalsSection,
  AiInsightsRiskScoringSection,
  AiInsightsExplainabilitySection,
  AiInsightsComplianceSection,
  AiInsightsRoleViewsSection,
  AiInsightsUseCasesSection,
  AiInsightsBriefingFormSection,
  AiInsightsRecurringValueSection,
  AiInsightsFaqSection,
  AiInsightsClosingCtaSection,
} from "@/components/ai-insights";

export const metadata: Metadata = {
  title: "AI Insights for Medicine Availability | ZoikoMeds",
  description:
    "ZoikoMeds AI Insights help authorized stakeholders monitor medicine availability, access risk, shortage signals, demand changes, and confidence movement.",
};

export default function AiInsightsPage() {
  return (
    <main>
      <AiInsightsHeroSection />
      <AiInsightsTrustBoundariesSection />
      <AiInsightsHowItWorksSection />
      <AiInsightsModulesSection />
      <AiInsightsShortageSignalsSection />
      <AiInsightsRiskScoringSection />
      <AiInsightsExplainabilitySection />
      <AiInsightsComplianceSection />
      <AiInsightsRoleViewsSection />
      <AiInsightsUseCasesSection />
      <AiInsightsBriefingFormSection />
      <AiInsightsRecurringValueSection />
      <AiInsightsFaqSection />
      <AiInsightsClosingCtaSection />
    </main>
  );
}
