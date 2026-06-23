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
  AboutGlobalReachAndCta

} from "@/components/about/";



export const metadata: Metadata = {
  title: "About ZoikoMeds — The Global Intelligence Layer for Medicine Availability",
  description:
    "ZoikoMeds helps make medicine availability visible, verifiable, and actionable — connecting verified pharmacy inventory signals with patient search, pharmacy workflows, health system visibility, and shortage intelligence.",
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