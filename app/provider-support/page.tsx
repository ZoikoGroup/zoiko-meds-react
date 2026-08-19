import type { Metadata } from "next";

import {
  ProviderSupportHeroSection,
  ProviderSupportPathsSection,
  ProviderSupportPriorityIssuesSection,
  ProviderSupportBoundariesSection,
  ProviderSupportFormSection,
  ProviderSupportClosingCtaSection,
} from "@/components/provider-support";

export const metadata: Metadata = {
  title: "Provider Support & Medicine Workflows | ZoikoMeds",
  description:
    "Access ZoikoMeds provider support for availability signals, patient workflows, care-team access, referral guidance, organization reviews, privacy & security.",
};

export default function ProviderSupportPage() {
  return (
    <main>
      <ProviderSupportHeroSection />
      <ProviderSupportPathsSection />
      <ProviderSupportPriorityIssuesSection />
      <ProviderSupportBoundariesSection />
      <ProviderSupportFormSection />
      <ProviderSupportClosingCtaSection />
    </main>
  );
}
