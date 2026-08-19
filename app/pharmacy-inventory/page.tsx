import type { Metadata } from "next";

import {
  Hero,
  TrustAndSafety,
  AvailabilityFrictionSection,
  InventoryCapabilitiesSection,
  InventoryDashboardSection,
  SignalPermissionModelSection,
  Insight,
  UseCases,
  Integrations,
  Recurring,
  Governance,
  FaqSection,
  FinalCtaSection,
  Briefing,
} from "@/components/pharmacy-inventory";

export const metadata: Metadata = {
  title: "Pharmacy Inventory Visibility | ZoikoMeds",
  description:
    "Help patients understand medicine availability while keeping pharmacy inventory signals, permissions, and workflows under your control with ZoikoMeds.",
};

export default function page() {
  return (
    <main>
      <Hero />
      <TrustAndSafety />
      <AvailabilityFrictionSection />
      <InventoryCapabilitiesSection />
      <InventoryDashboardSection />
      <SignalPermissionModelSection />
      <Insight />
      <UseCases />
      <Integrations />
      <Recurring />
      <Governance />
      <Briefing />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
