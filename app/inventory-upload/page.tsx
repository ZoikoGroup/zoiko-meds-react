import {
     InventoryUploadHeroSection,
     InventoryUploadBenefitsSection,
     InventoryUploadMethodsSection,
     InventoryUploadDataStructureSection,
     InventoryUploadGovernanceSection,
     InventoryUploadGetStartedSection,
     InventoryUploadCtaSection 
    } from "@/components/inventory-upload";

export default function InventoryUploadPage() {
  return (
    <main>
      <InventoryUploadHeroSection />
      <InventoryUploadBenefitsSection />
      <InventoryUploadMethodsSection />
      <InventoryUploadDataStructureSection />
      <InventoryUploadGovernanceSection />
      <InventoryUploadGetStartedSection />
      <InventoryUploadCtaSection />
    </main>
  );
}