import type { Metadata } from "next";

import {
  CaregiverCta,
  CaregiverDashboard,
  CaregiverFeatures,
  CaregiverHero,
  CaregiverPrivacy,
} from "@/components/caregiver-access";

export const metadata: Metadata = {
  title: "Medicine Availability for Caregivers | ZoikoMeds",
  description:
    "Find medicine availability for caregivers with ZoikoMeds. Search, save, and monitor medicine availability for loved ones without starting over each time.",
};

export default function CaregiverAccessPage() {
  return (
    <main>
      <CaregiverHero />
      <CaregiverFeatures />
      <CaregiverDashboard />
      <CaregiverPrivacy />
      <CaregiverCta />
    </main>
  );
}
