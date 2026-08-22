import type { Metadata } from "next";

import {
  HealthSystemsHeroSection,
  HealthSystemsUseCasesSection,
  HealthSystemsOperatingModelSection,
  HealthSystemsInfrastructureStackSection,
  HealthSystemsGovernanceSection,
  HealthSystemsFaqSection,
  HealthSystemsAccessSection,
  HealthSystemsContactSection,
} from "@/components/health-systems";

export const metadata: Metadata = {
  title: "Medicine Availability for Health Systems | ZoikoMeds",
  description:
    "Improve medicine availability for health systems with real-time insights, connected workflows, APIs, and trusted data from ZoikoMeds for better access.",
};

export default function HealthSystemsPage() {
  return (
    <main>
      <HealthSystemsHeroSection />
      <HealthSystemsUseCasesSection />
      <HealthSystemsOperatingModelSection />
      <HealthSystemsInfrastructureStackSection />
      <HealthSystemsGovernanceSection />
      <HealthSystemsFaqSection />
      <HealthSystemsAccessSection />
      <HealthSystemsContactSection />
    </main>
  );
}
