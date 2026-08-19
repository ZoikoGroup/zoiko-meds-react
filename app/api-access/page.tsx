import type { Metadata } from "next";

import {
  Hero,
  TrustBoundary,
  Value,
  Integration,
  ApiCapabilityMatrix,
  TechnicalArchitecturePreview,
  SecurityPrivacyGovernanceSection,
  DeveloperExperienceSection,
  ApiAccessRequestFlowSection,
  RetentionCustomerSuccessSection,
  RequestApiAccessBriefingSection,
  ApiAccessFaqSection,
  CtaPage,
} from "@/components/api-access";

export const metadata: Metadata = {
  title: "Enterprise Healthcare API Access | ZoikoMeds",
  description:
    "Access secure healthcare APIs for medicine availability intelligence, pharmacy network signals, shortage indicators, alerts, and governed reporting.",
};

export default function page() {
  return (
    <main>
      <Hero />
      <TrustBoundary />
      <Value />
      <Integration />
      <ApiCapabilityMatrix />
      <TechnicalArchitecturePreview />
      <SecurityPrivacyGovernanceSection />
      <DeveloperExperienceSection />
      <ApiAccessRequestFlowSection />
      <RetentionCustomerSuccessSection />
      <RequestApiAccessBriefingSection />
      <ApiAccessFaqSection />
      <CtaPage />
    </main>
  );
}
