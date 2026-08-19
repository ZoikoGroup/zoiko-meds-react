import type { Metadata } from "next";
import {
  VerificationStandardsSection,
  VerificationLayersSection,
  VerificationStatusSection,
  VerificationOngoingGovernanceSection,
  VerificationLimitsAndNextStepSection,
  VerificationCtaSection,
} from "@/components/verification";

export const metadata: Metadata = {
  title: "Pharmacy Verification Standards & Trust | ZoikoMeds",
  description:
    "Learn how ZoikoMeds verifies pharmacy profiles, authorized users, and participation workflows to support trusted pharmacy searches and availability signals.",
};

export default function VerificationPage() {
  return (
    <main>
      <VerificationStandardsSection />
      <VerificationLayersSection />
      <VerificationStatusSection />
      <VerificationOngoingGovernanceSection />
      <VerificationLimitsAndNextStepSection />
      <VerificationCtaSection />
    </main>
  );
}
