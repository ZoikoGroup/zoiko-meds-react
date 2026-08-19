import type { Metadata } from "next";

import {
  EnterpriseHeroSection,
  EnterpriseIntelligenceStack,
  EnterpriseSectorsSection,
  EnterpriseStatsSection,
  EnterpriseContactSection,
} from "@/components/enterprise";

export const metadata: Metadata = {
  title: "Enterprise Medicine Availability Intelligence | ZoikoMeds",
  description:
    "Access real-time medicine availability intelligence with ZoikoMeds. Empower health systems, pharmacies, governments, and enterprises with trusted data.",
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
