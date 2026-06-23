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
  title: "ZoikoMeds — Global Medicine Availability Search",
  description:
    "Search verified pharmacies, check medicine availability confidence, and monitor updates — without prescribing or dispensing.",
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