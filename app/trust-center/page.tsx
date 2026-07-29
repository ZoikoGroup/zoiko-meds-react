
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