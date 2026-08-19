import type { Metadata } from "next";

import {
  PharmacyHeroSection,
  PharmacyTrustBarSection,
  PharmacyReasonsSection,
  PharmacyInventorySyncSection,
  PharmacyOnboardingStepsSection,
  PharmacyPricingSection,
  PharmacyFinalCtaSection,
} from "@/components/pharmacy";

export const metadata: Metadata = {
  title: "ZoikoMeds Pharmacy Network | Verified Medicine Availability",
  description:
    "Discover the ZoikoMeds pharmacy network and find medicines near you. Search pharmacy availability and connect with trusted pharmacies when you need them.",
};

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
