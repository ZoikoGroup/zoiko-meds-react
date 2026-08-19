import type { Metadata } from "next";

import {
  PrivacyCenterHeroSection,
  PrivacyCenterControlHubSection,
  PrivacyCenterDataCategoriesSection,
  PrivacyCenterAudienceSection,
  PrivacyCenterRightsSection,
  PrivacyCenterGovernanceSection,
} from "@/components/privacy-center";

export const metadata: Metadata = {
  title: "Privacy Center Manage Your Data and Rights | ZoikoMeds",
  description:
    "Visit the ZoikoMeds privacy center to manage your privacy choices, understand data practices, review your rights, and control how your information is used.",
};

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
