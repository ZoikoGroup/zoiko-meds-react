import type { Metadata } from "next";

import {
  TermsOfUseHeroSection,
  TermsOfUseSummarySection,
  TermsOfUseByRoleSection,
  TermsOfUseFullTermsSection,
  TermsOfUseAcceptanceSection,
  TermsOfUseLegalBoundariesSection,
} from "@/components/terms-of-use";

export const metadata: Metadata = {
  title: "Terms of Use and Service Conditions | ZoikoMeds",
  description:
    "Read ZoikoMeds terms of use to understand platform rules, medicine searches, accounts, pharmacy workflows, APIs, data use, privacy, and user duties.",
};

export default function TermsOfUsePage() {
  return (
    <main>
      <TermsOfUseHeroSection />
      <TermsOfUseSummarySection />
      <TermsOfUseByRoleSection />
      <TermsOfUseFullTermsSection />
      <TermsOfUseAcceptanceSection />
      <TermsOfUseLegalBoundariesSection />
    </main>
  );
}
