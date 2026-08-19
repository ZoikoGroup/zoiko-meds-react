import type { Metadata } from "next";

import {
  ReferralGuidanceHeroSection,
  ReferralGuidanceWhenToReferSection,
  ReferralGuidanceHandoffRoutesSection,
  ReferralGuidanceLanguageSection,
  ReferralGuidancePathwaySection,
  ReferralGuidanceFinalCtaSection,
} from "@/components/referral-guidance";

export const metadata: Metadata = {
  title: "Patient Referral Guidance & Support | ZoikoMeds",
  description:
    "Get clear patient referral guidance and support from ZoikoMeds. Understand the referral process, explore next steps, and navigate medicine access with ease.",
};

export default function ReferralGuidancePage() {
  return (
    <main>
      <ReferralGuidanceHeroSection />
      <ReferralGuidanceWhenToReferSection />
      <ReferralGuidanceHandoffRoutesSection />
      <ReferralGuidanceLanguageSection />
      <ReferralGuidancePathwaySection />
      <ReferralGuidanceFinalCtaSection />
    </main>
  );
}
