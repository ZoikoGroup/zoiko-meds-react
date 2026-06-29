import { 
  ZoikoAvailApiHeroSection, 
  ZoikoAvailApiCapabilityModelSection,
  ZoikoAvailApiUseCasesSection,
  ZoikoAvailApiGovernanceSection,
  ZoikoAvailApiEvaluationSection,
  ZoikoAvailApiFaqSection,
  ZoikoAvailApiAccessPathwaysSection,
  ZoikoAvailApiRequestAccessSection
 } from "@/components/zoiko-avail-api";

export default function ZoikoAvailApiPage() {
  return (
    <main>
      <ZoikoAvailApiHeroSection />
      <ZoikoAvailApiCapabilityModelSection />
      <ZoikoAvailApiUseCasesSection />
      <ZoikoAvailApiGovernanceSection />
      <ZoikoAvailApiEvaluationSection />
      <ZoikoAvailApiFaqSection />
      <ZoikoAvailApiAccessPathwaysSection />
      <ZoikoAvailApiRequestAccessSection />
    </main>
  );
}