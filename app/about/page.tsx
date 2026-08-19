import type { Metadata } from "next";

import {
  AboutHero,
  AboutStatsSection,
  AboutWhyZoikomeds,
  AboutPlatformCapabilities,
  AboutGovernance,
  AboutThreeEngines,
  AboutMedicineAccessChain,
  AboutWhatZoikomedsDoesNot,
  AboutGlobalReachAndCta,
} from "@/components/about/";

export const metadata: Metadata = {
  title: "About ZoikoMeds | Medicine Availability Platform",
  description:
    "Learn about ZoikoMeds, a platform making medicine availability pharmacy signals, intelligence engines, and secure systems.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutStatsSection />
      <AboutWhyZoikomeds />
      <AboutPlatformCapabilities />
      <AboutGovernance />
      <AboutThreeEngines />
      <AboutMedicineAccessChain />
      <AboutWhatZoikomedsDoesNot />
      <AboutGlobalReachAndCta />
    </main>
  );
}
