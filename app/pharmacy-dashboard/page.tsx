import type { Metadata } from "next";

import {
  AvailabilitySignalsSection,
  DashboardValueSection,
  CoreModulesSection,
  Hero,
  OperatingOverviewSection,
  TrustEquitySection,
  EnterpriseNetworksSection,
  AccessDemandSection,
  ReportingInsightSection,
  PrivacySafeguardsSection,
  ProcessStepsSection,
  JoinNetworkFormSection,
  FaqSection,
  FinalCtaSection,
} from "@/components/pharmacy-dashboard";

export const metadata: Metadata = {
  title: "Pharmacy Participation Dashboard | ZoikoMeds",
  description:
    "Manage pharmacy participation dashboard, medicine availability signals, verification tasks, patient access inquiries, and reporting securely with ZoikoMeds.",
};

export default function PharmacyDashboard() {
  return (
    <main>
      <Hero />
      <TrustEquitySection />
      <OperatingOverviewSection />
      <CoreModulesSection />
      <AvailabilitySignalsSection />
      <DashboardValueSection />
      <EnterpriseNetworksSection />
      <AccessDemandSection />
      <ReportingInsightSection />
      <PrivacySafeguardsSection />
      <ProcessStepsSection />
      <JoinNetworkFormSection />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
