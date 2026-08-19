import type { Metadata } from "next";

import {
  HospitalSystemsHeroSection,
  HospitalSystemsTrustBoundariesSection,
  HospitalSystemsTheChallengeSection,
  HospitalSystemsEnterprisePlatformValueSection,
  HospitalSystemsMultiSiteOperatingModelSection,
  HospitalSystemsWorkflowMapSection,
  HospitalSystemsExecutiveDashboardSection,
  HospitalSystemsSecurityPrivacyGovernanceSection,
  HospitalSystemsIntegrationsDeploymentSection,
  HospitalSystemsReportingRetentionSection,
  HospitalSystemsComparisonSection,
  HospitalSystemsEnterpriseBriefingFormSection,
  HospitalSystemsFaqSection,
  HospitalSystemsFinalCtaSection,
} from "@/components/hospital-systems";

export const metadata: Metadata = {
  title: "Hospital Medicine Availability Insights | ZoikoMeds",
  description:
    "Monitor hospital medicine availability with ZoikoMeds using pharmacy signals, shortage indicators, regional access insights, and governed intelligence.",
};

export default function HospitalSystemsPage() {
  return (
    <main>
      <HospitalSystemsHeroSection />
      <HospitalSystemsTrustBoundariesSection />
      <HospitalSystemsTheChallengeSection />
      <HospitalSystemsEnterprisePlatformValueSection />
      <HospitalSystemsMultiSiteOperatingModelSection />
      <HospitalSystemsWorkflowMapSection />
      <HospitalSystemsExecutiveDashboardSection />
      <HospitalSystemsSecurityPrivacyGovernanceSection />
      <HospitalSystemsIntegrationsDeploymentSection />
      <HospitalSystemsReportingRetentionSection />
      <HospitalSystemsComparisonSection />
      <HospitalSystemsEnterpriseBriefingFormSection />
      <HospitalSystemsFaqSection />
      <HospitalSystemsFinalCtaSection />
    </main>
  );
}
