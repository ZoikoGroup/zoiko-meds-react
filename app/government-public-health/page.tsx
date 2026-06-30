import { 
    GovernmentPublicHealthHeroSection,
    GovernmentPublicHealthUseCasesSection,
    GovernmentPublicHealthOutputsSection,
    GovernmentPublicHealthTrustSection,
    GovernmentPublicHealthLaunchPathSection,
    GovernmentPublicHealthFaqSection,
    GovernmentPublicHealthAccessPathwaysSection,
    GovernmentPublicHealthRequestBriefingSection 
} from "@/components/government-public-health";

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