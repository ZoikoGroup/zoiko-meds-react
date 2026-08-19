import type { Metadata } from "next";

import {
  PatientSupportHeroSection,
  PatientSupportMomentsSection,
  PatientSupportWorkflowSection,
  PatientSupportBoundariesSection,
  PatientSupportPathFormSection,
  PatientSupportClosingCtaSection,
} from "@/components/patient-support";

export const metadata: Metadata = {
  title: "Patient Support & Medicine Access Help | ZoikoMeds",
  description:
    "Find patient support for medicine access with ZoikoMeds. Understand availability signals, confirm directly with pharmacies & use saved searches and alerts.",
};

export default function PatientSupportPage() {
  return (
    <main>
      <PatientSupportHeroSection />
      <PatientSupportMomentsSection />
      <PatientSupportWorkflowSection />
      <PatientSupportBoundariesSection />
      <PatientSupportPathFormSection />
      <PatientSupportClosingCtaSection />
    </main>
  );
}
