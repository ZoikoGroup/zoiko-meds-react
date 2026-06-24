import type { Metadata } from "next";

import {
  EnterpriseHeroSection,
  EnterpriseIntelligenceStack,
  EnterpriseSectorsSection,
  EnterpriseStatsSection,
  EnterpriseContactSection

} from "@/components/enterprise";

export const metadata: Metadata = {
  title: "Enterprise — ZoikoMeds",
  description:
    "The institutional infrastructure for medicine availability intelligence. Built for health systems, governments, and digital-health platforms.",
};

export default function EnterprisePage() {
  return (
    <main>
      <EnterpriseHeroSection />
      <EnterpriseIntelligenceStack />
      <EnterpriseSectorsSection />
      <EnterpriseStatsSection />
      <EnterpriseContactSection />
    </main>
  );
}