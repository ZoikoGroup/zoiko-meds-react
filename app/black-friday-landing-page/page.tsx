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
  title: "Black Friday & Cyber Monday Deals | ZoikoMeds",
  description:
    "Better medication discovery starts with information. Explore eligible ZoikoMeds pharmacy-partner terms for independent pharmacies, pharmacy groups, chains and hospitals in India.",
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
