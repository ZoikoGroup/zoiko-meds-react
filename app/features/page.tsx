import type { Metadata } from "next";

import {
  FeaturesHeroSection,
  FeaturesTrustSafetySection,
  FeaturesIndexSection,
  FeaturesCorePlatformCapabilitiesSection,
  FeaturesAvailabilityDeepDiveSection,
  FeaturesShortageSignalAwarenessSection,
  FeaturesAnalyticsDashboardsSection,
  FeaturesComplianceReportsSection,
  FeaturesSecureIntegrationsSection,
  FeaturesStakeholderValueMatrixSection,
  FeaturesProcessFlowSection,
  FeaturesEnterpriseControlsSection,
  FeaturesRetentionExpansionSection,
  FeaturesComparisonTableSection,
  FeaturesBookDemoSection,
  FeaturesFaqSection,
  FeaturesFinalCtaSection,
} from "@/components/features";

export const metadata: Metadata = {
  title: "Healthcare Access Platform Features | ZoikoMeds",
  description:
    "ZoikoMeds delivers healthcare access intelligence with medicine availability tracking, shortage signals, regional insights, analytics, reporting & more.",
};

export default function FeaturesPage() {
  return (
    <main>
      <FeaturesHeroSection />
      <FeaturesTrustSafetySection />
      <FeaturesIndexSection />
      <FeaturesCorePlatformCapabilitiesSection />
      <FeaturesAvailabilityDeepDiveSection />
      <FeaturesShortageSignalAwarenessSection />
      <FeaturesAnalyticsDashboardsSection />
      <FeaturesComplianceReportsSection />
      <FeaturesSecureIntegrationsSection />
      <FeaturesStakeholderValueMatrixSection />
      <FeaturesProcessFlowSection />
      <FeaturesEnterpriseControlsSection />
      <FeaturesRetentionExpansionSection />
      <FeaturesComparisonTableSection />
      <FeaturesBookDemoSection />
      <FeaturesFaqSection />
      <FeaturesFinalCtaSection />
    </main>
  );
}
