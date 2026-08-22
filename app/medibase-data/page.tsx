import type { Metadata } from "next";

import {
  MediBaseDataHeroSection,
  MediBaseDataIdentityModelSection,
  MediBaseDataUseCasesSection,
  MediBaseDataStandardsSection,
  MediBaseDataAccessLicensingSection,
  MediBaseDataFaqSection,
  MediBaseDataTrustSection,
  MediBaseDataContactSection,
} from "@/components/medibase-data";

export const metadata: Metadata = {
  title: "MediBase Data | Governed Medicine Data Platform",
  description:
    "Discover MediBase, a governed medicine data platform that standardizes medicine identities and powers enterprise search, APIs, and healthcare intelligence.",
};

export default function MediBaseDataPage() {
  return (
    <main>
      <MediBaseDataHeroSection />
      <MediBaseDataIdentityModelSection />
      <MediBaseDataUseCasesSection />
      <MediBaseDataStandardsSection />
      <MediBaseDataAccessLicensingSection />
      <MediBaseDataFaqSection />
      <MediBaseDataTrustSection />
      <MediBaseDataContactSection />
    </main>
  );
}
