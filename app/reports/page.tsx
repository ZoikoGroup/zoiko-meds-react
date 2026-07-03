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
    ReportsCTASection 
} from "@/components/reports";

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