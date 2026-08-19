import type { Metadata } from "next";

import {
  ProviderOverviewHeroSection,
  ProviderOverviewUseCasesSection,
  ProviderOverviewWhatProvidersSeeSection,
  ProviderOverviewGovernanceSection,
  ProviderOverviewGetStartedSection,
  ProviderOverviewCtaSection,
} from "@/components/provider-overview";

export const metadata: Metadata = {
  title: "Healthcare Provider Medicine Access | ZoikoMeds",
  description:
    "Support patients with medicine access using ZoikoMeds. View availability signals, guide pharmacy confirmation, and simplify everyday access conversations.",
};

export default function ProviderOverviewPage() {
  return (
    <main>
      <ProviderOverviewHeroSection />
      <ProviderOverviewUseCasesSection />
      <ProviderOverviewWhatProvidersSeeSection />
      <ProviderOverviewGovernanceSection />
      <ProviderOverviewGetStartedSection />
      <ProviderOverviewCtaSection />
    </main>
  );
}
