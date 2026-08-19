import type { Metadata } from "next";

import {
  PressHeroSection,
  PressNewsroomSection,
  PressAssetsSection,
  PressCompanyFactsSection,
  PressContactSection,
  PressGovernanceSection,
} from "@/components/press";

export const metadata: Metadata = {
  title: "ZoikoMeds Press | Latest News, Media Coverage & Updates",
  description:
    "Stay updated with ZoikoMeds through press releases, media coverage, company news, announcements & the latest developments in accessible medicine services.",
};

export default function PressPage() {
  return (
    <main>
      <PressHeroSection />
      <PressNewsroomSection />
      <PressAssetsSection />
      <PressCompanyFactsSection />
      <PressContactSection />
      <PressGovernanceSection />
    </main>
  );
}
