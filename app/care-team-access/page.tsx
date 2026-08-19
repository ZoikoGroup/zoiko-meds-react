import type { Metadata } from "next";

import {
  CareTeamAccessHeroSection,
  CareTeamAccessRolesSection,
  CareTeamAccessToolsSection,
  CareTeamAccessGovernanceSection,
  CareTeamAccessPathwaySection,
  CareTeamAccessFinalCtaSection,
} from "@/components/care-team-access";

export const metadata: Metadata = {
  title: "Care Team Access for Medicine Availability | ZoikoMeds",
  description:
    "ZoikoMeds helps authorized care teams guide patients through medicine availability using signals, pharmacy confirmation, saved searches & privacy controls.",
};

export default function CareTeamAccessPage() {
  return (
    <main>
      <CareTeamAccessHeroSection />
      <CareTeamAccessRolesSection />
      <CareTeamAccessToolsSection />
      <CareTeamAccessGovernanceSection />
      <CareTeamAccessPathwaySection />
      <CareTeamAccessFinalCtaSection />
    </main>
  );
}
