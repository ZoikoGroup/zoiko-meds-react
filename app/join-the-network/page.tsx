import type { Metadata } from "next";

import {
  JoinNetworkHeroSection,
  JoinNetworkBenefitsSection,
  JoinNetworkVerificationStepsSection,
  JoinNetworkControlsSection,
  JoinNetworkPathFormSection,
  JoinNetworkClosingCtaSection,
} from "@/components/join-network";

export const metadata: Metadata = {
  title: "Join Pharmacy Network for Medicine Search | ZoikoMeds",
  description:
    "Join the verified ZoikoMeds pharmacy network to share medicine availability signals, reduce avoidable calls & help patients plan pharmacy visits with ease.",
};

export default function JoinNetworkPage() {
  return (
    <main>
      <JoinNetworkHeroSection />
      <JoinNetworkBenefitsSection />
      <JoinNetworkVerificationStepsSection />
      <JoinNetworkControlsSection />
      <JoinNetworkPathFormSection />
      <JoinNetworkClosingCtaSection />
    </main>
  );
}
