import type { Metadata } from "next";

import {
  ConfirmationRequestsHeroSection,
  ConfirmationRequestsWorkflowSection,
  ConfirmationRequestsControlsSection,
  ConfirmationRequestsStatesSection,
  ConfirmationRequestsGovernanceSection,
  ConfirmationRequestsPathFormSection,
  ConfirmationRequestsFinalCtaSection,
} from "@/components/confirmation-requests";

export const metadata: Metadata = {
  title: "Medicine Availability Confirmation Requests | ZoikoMeds",
  description:
    "ZoikoMeds helps verified pharmacies manage medicine availability inquiries, reduce repetitive calls, guide patients, and protect exact stock information.",
};

export default function ConfirmationRequestsPage() {
  return (
    <main>
      <ConfirmationRequestsHeroSection />
      <ConfirmationRequestsWorkflowSection />
      <ConfirmationRequestsControlsSection />
      <ConfirmationRequestsStatesSection />
      <ConfirmationRequestsGovernanceSection />
      <ConfirmationRequestsPathFormSection />
      <ConfirmationRequestsFinalCtaSection />
    </main>
  );
}
