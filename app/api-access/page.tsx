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
  CtaPage
} from "@/components/api-access";

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
