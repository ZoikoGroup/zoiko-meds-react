import type { Metadata } from "next";

import {
  ZoikoAvailApiHeroSection,
  ZoikoAvailApiCapabilityModelSection,
  ZoikoAvailApiUseCasesSection,
  ZoikoAvailApiGovernanceSection,
  ZoikoAvailApiEvaluationSection,
  ZoikoAvailApiFaqSection,
  ZoikoAvailApiAccessPathwaysSection,
  ZoikoAvailApiRequestAccessSection,
} from "@/components/zoiko-avail-api";

export const metadata: Metadata = {
  title: "ZoikoAvail API | Real-Time Medicine Availability",
  description:
    "ZoikoAvail API delivers real time medicine availability data from pharmacy networks, helping healthcare platforms improve access and decision-making.",
};

export default function ZoikoAvailApiPage() {
  return (
    <main>
      <ZoikoAvailApiHeroSection />
      <ZoikoAvailApiCapabilityModelSection />
      <ZoikoAvailApiUseCasesSection />
      <ZoikoAvailApiGovernanceSection />
      <ZoikoAvailApiEvaluationSection />
      <ZoikoAvailApiFaqSection />
      <ZoikoAvailApiAccessPathwaysSection />
      <ZoikoAvailApiRequestAccessSection />
    </main>
  );
}
