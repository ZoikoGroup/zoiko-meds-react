import type { Metadata } from "next";

import {
  ClinicNetworksHeroSection,
  ClinicNetworksTrustBoundarySection,
  ClinicNetworksChallengeSection,
  ClinicNetworksOperatingDashboardSection,
  ClinicNetworksCoreCapabilitiesSection,
  ClinicNetworksMultiLocationWorkflowSection,
  ClinicNetworksRoleBasedViewsSection,
  ClinicNetworksIntegrationsDeploymentSection,
  ClinicNetworksSecurityPrivacyResponsibleAISection,
  ClinicNetworksOutcomesRetentionSection,
  ClinicNetworksRequestBriefingSection,
  ClinicNetworksFAQSection,
  ClinicNetworksCTASection,
} from "@/components/clinic-networks";

export const metadata: Metadata = {
  title: "Medicine Availability for Clinic Networks | ZoikoMeds",
  description:
    "Help multi-location clinic networks understand medicine availability with ZoikoMeds. Track access signals, regional gaps, pharmacy activity & shortage trends.",
};

export default function ClinicNetworksPage() {
  return (
    <main>
      <ClinicNetworksHeroSection />
      <ClinicNetworksTrustBoundarySection />
      <ClinicNetworksChallengeSection />
      <ClinicNetworksOperatingDashboardSection />
      <ClinicNetworksCoreCapabilitiesSection />
      <ClinicNetworksMultiLocationWorkflowSection />
      <ClinicNetworksRoleBasedViewsSection />
      <ClinicNetworksIntegrationsDeploymentSection />
      <ClinicNetworksSecurityPrivacyResponsibleAISection />
      <ClinicNetworksOutcomesRetentionSection />
      <ClinicNetworksRequestBriefingSection />
      <ClinicNetworksFAQSection />
      <ClinicNetworksCTASection />
    </main>
  );
}
