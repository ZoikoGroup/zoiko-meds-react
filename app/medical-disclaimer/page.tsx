import {
  MedicalDisclaimerHeroSection,
  MedicalDisclaimerCapabilitiesSection,
  MedicalDisclaimerBoundariesSection,
  MedicalDisclaimerSafeUsageSection,
  MedicalDisclaimerRulesSection,
  MedicalDisclaimerNextSection,
} from "@/components/medical-disclaimer";

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