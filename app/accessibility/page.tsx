import type { Metadata } from "next";

import {
  AccessibilityHeroSection,
  AccessibilityCommitmentsSection,
  AccessibilityJourneysSection,
  AccessibilitySupportSection,
  AccessibilityReportSection,
  AccessibilityGovernanceSection,
} from "@/components/accessibility";

export const metadata: Metadata = {
  title: "ZoikoMeds Accessibility | Inclusive Medicine Access Now",
  description:
    "Learn how ZoikoMeds supports inclusive medicine access with accessible design, keyboard navigation, screen reader support, readable content & WCAG 2.2 AA.",
};

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
