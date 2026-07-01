import {
  PrivacyCenterHeroSection,
  PrivacyCenterControlHubSection,
  PrivacyCenterDataCategoriesSection,
  PrivacyCenterAudienceSection,
  PrivacyCenterRightsSection,
  PrivacyCenterGovernanceSection,
} from "@/components/privacy-center";

export default function PrivacyCenterPage() {
  return (
    <main>
      <PrivacyCenterHeroSection />
      <PrivacyCenterControlHubSection />
      <PrivacyCenterDataCategoriesSection />
      <PrivacyCenterAudienceSection />
      <PrivacyCenterRightsSection />
      <PrivacyCenterGovernanceSection />
    </main>
  );
}