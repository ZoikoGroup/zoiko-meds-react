import type { Metadata } from "next";

import {
  MedicalDisclaimerHeroSection,
  MedicalDisclaimerCapabilitiesSection,
  MedicalDisclaimerBoundariesSection,
  MedicalDisclaimerSafeUsageSection,
  MedicalDisclaimerRulesSection,
  MedicalDisclaimerNextSection,
} from "@/components/medical-disclaimer";

export const metadata: Metadata = {
  title: "Medical Disclaimer and Medicine Information | ZoikoMeds",
  description:
    "Learn about the ZoikoMeds medical disclaimer, medicine availability information, verified pharmacy signals, and the limits of its platform and services.",
};

export default function MedicalDisclaimerPage() {
  return (
    <main>
      <MedicalDisclaimerHeroSection />
      <MedicalDisclaimerCapabilitiesSection />
      <MedicalDisclaimerBoundariesSection />
      <MedicalDisclaimerSafeUsageSection />
      <MedicalDisclaimerRulesSection />
      <MedicalDisclaimerNextSection />
    </main>
  );
}
