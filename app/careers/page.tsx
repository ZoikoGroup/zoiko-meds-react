import type { Metadata } from "next";

import {
  CareersHeroSection,
  CareersWhyBuildHereSection,
  CareersTeamsSection,
  CareersHowWeWorkSection,
  CareersHiringProcessSection,
  CareersNextStepSection,
} from "@/components/careers";

export const metadata: Metadata = {
  title: "Careers at ZoikoMeds | Join Our Healthcare Team Now",
  description:
    "Explore career opportunities at ZoikoMeds and join a passionate team transforming healthcare through innovation, technology, and better patient care today.",
};

export default function CareersPage() {
  return (
    <main>
      <CareersHeroSection />
      <CareersWhyBuildHereSection />
      <CareersTeamsSection />
      <CareersHowWeWorkSection />
      <CareersHiringProcessSection />
      <CareersNextStepSection />
    </main>
  );
}
