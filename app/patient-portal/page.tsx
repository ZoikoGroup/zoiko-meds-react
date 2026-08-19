import type { Metadata } from "next";

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
  PatientPortalFinalCtaSection,
} from "@/components/patient-portal";

export const metadata: Metadata = {
  title: "Patient Portal for Medicine Access | ZoikoMeds",
  description:
    "Access the ZoikoMeds Patient Portal for medicine availability insights, pharmacy information, and convenient tools to support smarter medicine access.",
};

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
