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
    PrescriptionsCTASection 
} from "@/components/prescriptions";

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