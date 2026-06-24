import {
  PharmacyHeroSection,
  PharmacyTrustBarSection,
  PharmacyReasonsSection,
  PharmacyInventorySyncSection,
  PharmacyOnboardingStepsSection,
  PharmacyPricingSection,
  PharmacyFinalCtaSection
} from "@/components/pharmacy";

export default function PharmacyPage() {
  return (
    <main>
      <PharmacyHeroSection />
      <PharmacyTrustBarSection />
      <PharmacyReasonsSection />
      <PharmacyInventorySyncSection />
      <PharmacyOnboardingStepsSection />
      <PharmacyPricingSection />
      <PharmacyFinalCtaSection />
      {/* Next sections will be added here as you share more screenshots */}
    </main>
  );
}