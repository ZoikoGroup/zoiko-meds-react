import type { Metadata } from "next";

import {
  ContactHeroSection,
  ContactPathSelectorSection,
  ContactHighIntentPathsSection,
  ContactSafeStandardsSection,
  ContactFormSection,
} from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact Us for Healthcare Support | ZoikoMeds",
  description:
    "Contact ZoikoMeds for questions about medicine availability, healthcare information, partnerships, business inquiries, or support from our team.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHeroSection />
      <ContactPathSelectorSection />
      <ContactHighIntentPathsSection />
      <ContactSafeStandardsSection />
      <ContactFormSection />
    </main>
  );
}
