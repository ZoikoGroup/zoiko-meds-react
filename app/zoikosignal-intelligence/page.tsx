import type { Metadata } from "next";

import {
  ZoikoSignalIntelligenceHeroSection,
  ZoikoSignalIntelligencePipelineSection,
  ZoikoSignalIntelligenceModulesSection,
  ZoikoSignalIntelligenceUseCasesSection,
  ZoikoSignalIntelligenceGovernanceSection,
  ZoikoSignalIntelligenceFaqSection,
  ZoikoSignalIntelligenceAccessPathwaysSection,
  ZoikoSignalIntelligenceRequestBriefingSection,
} from "@/components/zoikosignal-intelligence";

export const metadata: Metadata = {
  title: "Healthcare Intelligence Platform | ZoikoSignal",
  description:
    "Discover ZoikoSignal, a healthcare intelligence platform for real-time shortage signals, demand insights, and pharmacy availability intelligence to act now.",
};

export default function ZoikoSignalIntelligencePage() {
  return (
    <main>
      <ZoikoSignalIntelligenceHeroSection />
      <ZoikoSignalIntelligencePipelineSection />
      <ZoikoSignalIntelligenceModulesSection />
      <ZoikoSignalIntelligenceUseCasesSection />
      <ZoikoSignalIntelligenceGovernanceSection />
      <ZoikoSignalIntelligenceFaqSection />
      <ZoikoSignalIntelligenceAccessPathwaysSection />
      <ZoikoSignalIntelligenceRequestBriefingSection />
    </main>
  );
}
