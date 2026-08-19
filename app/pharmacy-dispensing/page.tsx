import type { Metadata } from "next";

import {
  Hero,
  Regulatory,
  Workflow,
  Prescription,
  Medicine,
  PharmacistReviewSection,
  PatientCommunicationSection,
  ExceptionsEscalationsSection,
  Compliance,
  Analytics,
  Retention,
  IntegrationsDataFlowSection,
  Request,
  FaqSection,
  FinalCtaSection,
} from "@/components/pharmacy-dispensing";

export const metadata: Metadata = {
  title: "Pharmacy Dispensing Workflow Management | ZoikoMeds",
  description:
    "Streamline pharmacy dispensing workflow management with prescription visibility, medicine readiness, exception routing, and secure handoffs with ZoikoMeds.",
};

export default function PharmacyDispensing() {
  return (
    <main>
      <Hero />
      <Regulatory />
      <Workflow />
      <Prescription />
      <Medicine />
      <PharmacistReviewSection />
      <PatientCommunicationSection />
      <ExceptionsEscalationsSection />
      <Compliance />
      <Analytics />
      <IntegrationsDataFlowSection />
      <Retention />
      <Request />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
