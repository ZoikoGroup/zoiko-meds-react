import {
  EnterpriseIdentityHero,
  SeparateControlsSection,
  RequirementAreasSection,
  RequirementBoundariesSection,
  WhoThisIsForSection,
  SSORequirementsFormSection,
  HowYourRequestIsRoutedSection,
  ReviewConfirmFAQSection,
} from "@/components/sso-requirement";

export default function SsoReqPage() {
  return (
    <main>
      <EnterpriseIdentityHero />
      <SeparateControlsSection />
      <RequirementAreasSection />
      <RequirementBoundariesSection />
      <WhoThisIsForSection />
      <SSORequirementsFormSection />
      <HowYourRequestIsRoutedSection />
      <ReviewConfirmFAQSection />
    </main>
  );
}
