import {
  ClinicNetworksHeroSection,
  ClinicNetworksTrustBoundarySection,
  ClinicNetworksChallengeSection,
  ClinicNetworksOperatingDashboardSection,
  ClinicNetworksCoreCapabilitiesSection,
  ClinicNetworksMultiLocationWorkflowSection,
  ClinicNetworksRoleBasedViewsSection
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
    </main>
  );
}