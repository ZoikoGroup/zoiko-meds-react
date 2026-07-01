import {
  TrustCenterHeroSection,
  TrustCenterDoctrineSection,
  TrustCenterLayersSection,
  TrustCenterControlsSection,
  TrustCenterPlatformSection,
  TrustCenterAudienceSection,
  TrustCenterAccessSection,
} from "@/components/trust-center";

export default function TrustCenterPage() {
  return (
    <main>
      <TrustCenterHeroSection />
      <TrustCenterDoctrineSection />
      <TrustCenterLayersSection />
      <TrustCenterControlsSection />
      <TrustCenterPlatformSection />
      <TrustCenterAudienceSection />
      <TrustCenterAccessSection />
    </main>
  );
}