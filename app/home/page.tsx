import type { Metadata } from "next";

import {
HomeHeroSection,
HomeFreeAccountSection,
HomeStatsSection,
HomeStakeholdersSection,
HomeEnginesSection,
HomeEnterpriseSection,
HomeTrustSection,
HomeGlobalExpansionSection


} from "@/components/home";

export const metadata = {
  title: "ZoikoMeds | Global Medicine Availability Platform",
  description:
    "ZoikoMeds helps users search medicines, check availability signals, and connect with verified pharmacy networks through a secure global platform.",
};

export default function HomePage() {
  return (
    <main>
      <HomeHeroSection />
      <HomeFreeAccountSection />
      <HomeStatsSection />
      <HomeStakeholdersSection />
      <HomeEnginesSection />
      <HomeEnterpriseSection />
      <HomeTrustSection />
      <HomeGlobalExpansionSection />
    </main>
  );
}