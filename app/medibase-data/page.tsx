import { 
    MediBaseDataHeroSection,
    MediBaseDataIdentityModelSection,
    MediBaseDataUseCasesSection,
    MediBaseDataStandardsSection,
    MediBaseDataAccessLicensingSection,
    MediBaseDataFaqSection,
    MediBaseDataTrustSection,
    MediBaseDataContactSection
} from "@/components/medibase-data";

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