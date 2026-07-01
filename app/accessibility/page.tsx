import { 
    AccessibilityHeroSection,
    AccessibilityCommitmentsSection,
    AccessibilityJourneysSection,
    AccessibilitySupportSection,
    AccessibilityReportSection,
    AccessibilityGovernanceSection 
} from "@/components/accessibility";

export default function AccessibilityPage() {
  return (
    <main>
      <AccessibilityHeroSection />
      <AccessibilityCommitmentsSection />
      <AccessibilityJourneysSection />
      <AccessibilitySupportSection />
      <AccessibilityReportSection />
      <AccessibilityGovernanceSection />
    </main>
  );
}