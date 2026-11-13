import type { Metadata } from "next";
import {
  HeroSection,
  PlansSection,
  BoundariesSection,
  EnquirySection,
  FaqSection,
  CtaBannerSection,
} from "@/components/black-friday";

export const metadata: Metadata = {
  title: "Black Friday Sale 2026 – Special Offers | ZoikoMeds",
  description:
  "Explore ZoikoMeds Black Friday offers and special discounts. Visit our website to discover available deals and learn more about our healthcare platform."
};

export default function BlackFridayLandingPage() {
  return (
    <main>
      <HeroSection />
      <PlansSection />
      <BoundariesSection />
      <EnquirySection />
      <FaqSection />
      <CtaBannerSection />
    </main>
  );
}
