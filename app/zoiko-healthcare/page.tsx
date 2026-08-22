import type { Metadata } from "next";

import {
  ZoikoHealthcareHeroSection,
  ZoikoHealthcareCorporateRoleSection,
  ZoikoHealthcareBuildsSection,
  ZoikoHealthcareGovernanceSection,
  ZoikoHealthcareStakeholderPathwaysSection,
  ZoikoHealthcareCorporateContactSection,
} from "@/components/zoiko-healthcare";

export const metadata: Metadata = {
  title: "Zoiko Healthcare | Digital Healthcare & Medicine Access",
  description:
    "Discover Zoiko Healthcare digital healthcare & medicine access solutions, supported by secure technology, privacy, governance, and reliable infrastructure.",
};

export default function ZoikoHealthcarePage() {
  return (
    <main>
      <ZoikoHealthcareHeroSection />
      <ZoikoHealthcareCorporateRoleSection />
      <ZoikoHealthcareBuildsSection />
      <ZoikoHealthcareGovernanceSection />
      <ZoikoHealthcareStakeholderPathwaysSection />
      <ZoikoHealthcareCorporateContactSection />
    </main>
  );
}
