import type { Metadata } from "next";

import {
  PharmacySupportHeroSection,
  PharmacySupportPathsSection,
  PharmacySupportPriorityIssuesSection,
  PharmacySupportSecuritySection,
  PharmacySupportFormSection,
  PharmacySupportFinalCtaSection,
} from "@/components/pharmacy-support";

export const metadata: Metadata = {
  title: "Pharmacy Support & Help Center | ZoikoMeds",
  description:
    "Need help with your ZoikoMeds pharmacy workspace? Get support for verification, portal access, settings, integrations, confirmation requests, and security.",
};

export default function PharmacySupportPage() {
  return (
    <main>
      <PharmacySupportHeroSection />
      <PharmacySupportPathsSection />
      <PharmacySupportPriorityIssuesSection />
      <PharmacySupportSecuritySection />
      <PharmacySupportFormSection />
      <PharmacySupportFinalCtaSection />
    </main>
  );
}
