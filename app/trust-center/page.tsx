import type { Metadata } from "next";
import {
  TrustCenterHeroSection,
  TrustCenterDoctrineSection,
  TrustCenterLayersSection,
  TrustCenterControlsSection,
  TrustCenterPlatformSection,
  TrustCenterAudienceSection,
  TrustCenterAccessSection,
  TrustCenterAISection,
} from "@/components/trust-center";

export const metadata: Metadata = {
  title: "Trust Center for Healthcare Data Security | ZoikoMeds",
  description:
    "Visit the ZoikoMeds Trust Center to understand healthcare data security, privacy controls, compliance, governance & responsible data protection practices.",
};

export default function TrustCenterPage() {
  return (
    <main>
      <TrustCenterHeroSection />
      <TrustCenterDoctrineSection />
      <TrustCenterAISection />
      <TrustCenterLayersSection />
      <TrustCenterControlsSection />
      <TrustCenterPlatformSection />
      <TrustCenterAudienceSection />
      <TrustCenterAccessSection />
    </main>
  );
}
