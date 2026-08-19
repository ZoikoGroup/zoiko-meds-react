import type { Metadata } from "next";

import {
  InventoryUploadHeroSection,
  InventoryUploadBenefitsSection,
  InventoryUploadMethodsSection,
  InventoryUploadDataStructureSection,
  InventoryUploadGovernanceSection,
  InventoryUploadGetStartedSection,
  InventoryUploadCtaSection,
} from "@/components/inventory-upload";

export const metadata: Metadata = {
  title: "Pharmacy Inventory Management | ZoikoMeds",
  description:
    "Upload pharmacy inventory data to ZoikoMeds and manage medicine stock information with structured tools for availability signals and pharmacy insights.",
};

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
