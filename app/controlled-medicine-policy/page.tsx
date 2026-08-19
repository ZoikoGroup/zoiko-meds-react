import type { Metadata } from "next";

import {
  ControlledMedicinePolicyHeroSection,
  ControlledMedicinePolicyCoverageSection,
  ControlledMedicinePolicySensitiveSearchSection,
  ControlledMedicinePolicyResponsibilitiesSection,
  ControlledMedicinePolicyGovernanceSection,
  ControlledMedicinePolicySupportSection,
} from "@/components/controlled-medicine-policy";

export const metadata: Metadata = {
  title: "ZoikoMeds Controlled Medicine Policy | Safe Access Guide",
  description:
    "Learn about ZoikoMeds controlled medicine policy, including prescription requirements, safe handling, responsible use, ordering rules, and patient safety.",
};

export default function ControlledMedicinePolicyPage() {
  return (
    <main>
      <ControlledMedicinePolicyHeroSection />
      <ControlledMedicinePolicyCoverageSection />
      <ControlledMedicinePolicySensitiveSearchSection />
      <ControlledMedicinePolicyResponsibilitiesSection />
      <ControlledMedicinePolicyGovernanceSection />
      <ControlledMedicinePolicySupportSection />
    </main>
  );
}
