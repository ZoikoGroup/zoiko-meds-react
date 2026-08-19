import type { Metadata } from "next";

import {
  PrescriptionsHeroSection,
  PrescriptionsTrustSafetySection,
  PrescriptionsSummarySection,
  PrescriptionsCoreFeaturesSection,
  PrescriptionsHowItWorksSection,
  PrescriptionsTimelineSection,
  PrescriptionsRefillTrackingSection,
  PrescriptionsCaregiverSection,
  PrescriptionsSecurityPrivacySection,
  PrescriptionsFAQSection,
  PrescriptionsCTASection,
} from "@/components/prescriptions";

export const metadata: Metadata = {
  title: "Prescription Management & Medicine Access | ZoikoMeds",
  description:
    "Simplify prescription management with ZoikoMeds. Keep prescription information organized and connect it with medicine availability for easier access.",
};

export default function PrescriptionsPage() {
  return (
    <main>
      <PrescriptionsHeroSection />
      <PrescriptionsTrustSafetySection />
      <PrescriptionsSummarySection />
      <PrescriptionsCoreFeaturesSection />
      <PrescriptionsHowItWorksSection />
      <PrescriptionsTimelineSection />
      <PrescriptionsRefillTrackingSection />
      <PrescriptionsCaregiverSection />
      <PrescriptionsSecurityPrivacySection />
      <PrescriptionsFAQSection />
      <PrescriptionsCTASection />
    </main>
  );
}
