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
    ClinicNetworksCTASection
} from "@/components/clinic-networks";

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