import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "SSO Requirements Review for Enterprises | ZoikoMeds",
  description:
    "Review your SSO requirements and explore secure identity solutions for enterprise access, authentication, and user management with ZoikoMeds.",
};

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
