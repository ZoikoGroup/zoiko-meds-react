import type { Metadata } from "next";

import {
  AvailabilitySignalsHeroSection,
  AvailabilitySignalsLanguageSection,
  AvailabilitySignalsProviderUsageSection,
  AvailabilitySignalsReflectSection,
  AvailabilitySignalsGetStartedSection,
  AvailabilitySignalsCtaSection,
} from "@/components/availability-signals";

export const metadata: Metadata = {
  title: "Medication Availability Signals for Patients | ZoikoMeds",
  description:
    "Understand medicine availability signals with ZoikoMeds. Help patients and care teams interpret pharmacy confirmation needs without exact stock counts.",
};

export default function AvailabilitySignalsPage() {
  return (
    <main>
      <AvailabilitySignalsHeroSection />
      <AvailabilitySignalsLanguageSection />
      <AvailabilitySignalsProviderUsageSection />
      <AvailabilitySignalsReflectSection />
      <AvailabilitySignalsGetStartedSection />
      <AvailabilitySignalsCtaSection />
    </main>
  );
}
