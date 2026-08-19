import type { Metadata } from "next";

import {
  ReportsHeroSection,
  ReportsSuiteSection,
  ReportsAnatomySection,
  ReportsByStakeholderSection,
  ReportsSamplePreviewSection,
  ReportsGovernanceSection,
  ReportsRelationshipSection,
  ReportsSampleRequestSection,
  ReportsFAQSection,
  ReportsCTASection,
} from "@/components/reports";

export const metadata: Metadata = {
  title: "Medicine Availability Reports for Healthcare | ZoikoMeds",
  description:
    "Create compliance-ready medicine availability reports with ZoikoMeds using shortage indicators, pharmacy network activity, and regional access patterns.",
};

export default function ReportsPage() {
  return (
    <main>
      <ReportsHeroSection />
      <ReportsSuiteSection />
      <ReportsAnatomySection />
      <ReportsByStakeholderSection />
      <ReportsSamplePreviewSection />
      <ReportsGovernanceSection />
      <ReportsRelationshipSection />
      <ReportsSampleRequestSection />
      <ReportsFAQSection />
      <ReportsCTASection />
    </main>
  );
}
