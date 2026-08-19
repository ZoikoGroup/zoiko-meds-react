import type { Metadata } from "next";

import {
  AvailabilityConfidenceHeroSection,
  AvailabilityConfidenceSignalsSection,
  AvailabilityConfidenceFactorsSection,
  AvailabilityConfidenceSafeUseSection,
  AvailabilityConfidenceTrustSection,
  AvailabilityConfidenceClosingCtaSection,
} from "@/components/availability-confidence";

export const metadata: Metadata = {
  title: "Medicine Availability Confidence | ZoikoMeds",
  description:
    "Understand ZoikoMeds availability confidence signals, what they mean, how freshness and pharmacy participation affect confidence, and when to confirm.",
};

export default function AvailabilityConfidencePage() {
  return (
    <main>
      <AvailabilityConfidenceHeroSection />
      <AvailabilityConfidenceSignalsSection />
      <AvailabilityConfidenceFactorsSection />
      <AvailabilityConfidenceSafeUseSection />
      <AvailabilityConfidenceTrustSection />
      <AvailabilityConfidenceClosingCtaSection />
    </main>
  );
}
