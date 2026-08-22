import type { Metadata } from "next";

import {
  PharmacyPortalHeroSection,
  PharmacyPortalWorkspaces,
  PharmacyPortalDataProtection,
  PharmacyPortalAccessScale,
  PharmacyPortalFindPath,
  PharmacyPortalFinalCta,
} from "@/components/pharmacy-portal";

export const metadata: Metadata = {
  title: "Pharmacy Portal for Medicine Availability | ZoikoMeds",
  description:
    "ZoikoMeds pharmacy portal helps verified pharmacies manage medicine availability, profiles, branch settings, availability signals, integrations & support.",
};

export default function PharmacyPortalPage() {
  return (
    <main>
      <PharmacyPortalHeroSection />
      <PharmacyPortalWorkspaces />
      <PharmacyPortalDataProtection />
      <PharmacyPortalAccessScale />
      <PharmacyPortalFindPath />
      <PharmacyPortalFinalCta />
    </main>
  );
}
