import type { Metadata } from "next";

import {
  GovernmentPublicHealthHeroSection,
  GovernmentPublicHealthUseCasesSection,
  GovernmentPublicHealthOutputsSection,
  GovernmentPublicHealthTrustSection,
  GovernmentPublicHealthLaunchPathSection,
  GovernmentPublicHealthFaqSection,
  GovernmentPublicHealthAccessPathwaysSection,
  GovernmentPublicHealthRequestBriefingSection,
} from "@/components/government-public-health";

export const metadata: Metadata = {
  title: "Public Health Medicine Availability | ZoikoMeds",
  description:
    "Access public health medicine availability intelligence with ZoikoMeds, including shortage signals, regional access insights, and governed reporting.",
};

export default function GovernmentPublicHealthPage() {
  return (
    <main>
      <GovernmentPublicHealthHeroSection />
      <GovernmentPublicHealthUseCasesSection />
      <GovernmentPublicHealthOutputsSection />
      <GovernmentPublicHealthTrustSection />
      <GovernmentPublicHealthLaunchPathSection />
      <GovernmentPublicHealthFaqSection />
      <GovernmentPublicHealthAccessPathwaysSection />
      <GovernmentPublicHealthRequestBriefingSection />
    </main>
  );
}
