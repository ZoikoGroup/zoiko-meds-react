import { 
    HealthSystemsHeroSection,
    HealthSystemsUseCasesSection,
    HealthSystemsOperatingModelSection,
    HealthSystemsInfrastructureStackSection,
    HealthSystemsGovernanceSection,
    HealthSystemsFaqSection,
    HealthSystemsAccessSection,
    HealthSystemsContactSection 
} from "@/components/health-systems";

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