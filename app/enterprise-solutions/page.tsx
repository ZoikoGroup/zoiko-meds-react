import type { Metadata } from "next";

import {
  EnterpriseSolutionsHeroSection,
  EnterpriseSolutionsStackSection,
  EnterpriseSolutionsPathsSection,
  EnterpriseSolutionsOutcomesSection,
  EnterpriseSolutionsGovernanceSection,
  EnterpriseSolutionsFaqSection,
  EnterpriseSolutionsAccessSection,
  EnterpriseSolutionsRequestBriefingSection,
} from "@/components/enterprise-solutions";

export const metadata: Metadata = {
  title: "Enterprise Medicine Availability Solutions | ZoikoMeds",
  description:
    "ZoikoMeds helps enterprises transform pharmacy availability signals, medicine identity data, and access-risk patterns into governed intelligence and APIs.",
};

export default function EnterpriseSolutionsPage() {
  return (
    <main>
      <EnterpriseSolutionsHeroSection />
      <EnterpriseSolutionsStackSection />
      <EnterpriseSolutionsPathsSection />
      <EnterpriseSolutionsOutcomesSection />
      <EnterpriseSolutionsGovernanceSection />
      <EnterpriseSolutionsFaqSection />
      <EnterpriseSolutionsAccessSection />
      <EnterpriseSolutionsRequestBriefingSection />
    </main>
  );
}
