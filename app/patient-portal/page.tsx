import { 
    PatientPortalHeroSection,
    PatientPortalTrustSafetySection,
    PatientPortalAccountValueSection,
    PatientPortalDashboardPreviewSection,
    PatientPortalCoreFeaturesSection,
    PatientPortalHowItWorksSection,
    PatientPortalFindYourPathSection,
    PatientPortalPrivacySecuritySection,
    PatientPortalWhyUsersReturnSection,
    PatientPortalSupportSection,
    PatientPortalFaqSection,
    PatientPortalFinalCtaSection
} from "@/components/patient-portal";

export default function PatientPortalPage() {
  return (
    <main>
      <PatientPortalHeroSection />
      <PatientPortalTrustSafetySection />
      <PatientPortalAccountValueSection />
      <PatientPortalDashboardPreviewSection />
      <PatientPortalCoreFeaturesSection />
      <PatientPortalHowItWorksSection />
      <PatientPortalFindYourPathSection />
      <PatientPortalPrivacySecuritySection />
      <PatientPortalWhyUsersReturnSection />
      <PatientPortalSupportSection />
      <PatientPortalFaqSection />
      <PatientPortalFinalCtaSection />
    </main>
  );
}