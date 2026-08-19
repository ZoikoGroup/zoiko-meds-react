import type { Metadata } from "next";

import {
  PatientHero,
  PatientCaregiver,
  PatientCta,
  PatientFeatures,
  PatientSignal,
  PatientTrust,
} from "@/components/patient";

export const metadata: Metadata = {
  title: "Medicine Availability for Patients | ZoikoMeds",
  description:
    "Check medicine availability near you with ZoikoMeds. Search verified pharmacies, view recent stock signals, save medicines, and get restock alerts.",
};

export default function PatientPage() {
  return (
    <main>
      <PatientHero />
      <PatientFeatures />
      <PatientSignal />
      <PatientCaregiver />
      <PatientTrust />
      <PatientCta />
    </main>
  );
}
