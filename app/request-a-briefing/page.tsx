import type { Metadata } from "next";

import {
  RequestABriefingHeroSection,
  RequestABriefingSelectTypeSection,
  RequestABriefingFormSection,
  RequestABriefingWhatHappensNextSection,
  RequestABriefingAgendaModulesSection,
  RequestABriefingByStakeholderSection,
  RequestABriefingSecurityBoundariesSection,
  RequestABriefingFAQSection,
  RequestABriefingCTASection,
} from "@/components/request-a-briefing";

export const metadata: Metadata = {
  title: "Request a Medicine Availability Briefing | ZoikoMeds",
  description:
    "Request a briefing from ZoikoMeds to discuss medicine availability, pharmacy network intelligence, healthcare access, enterprise tools, analytics & reports.",
};

export default function RequestABriefingPage() {
  return (
    <main>
      <RequestABriefingHeroSection />
      <RequestABriefingSelectTypeSection />
      <RequestABriefingFormSection />
      <RequestABriefingWhatHappensNextSection />
      <RequestABriefingAgendaModulesSection />
      <RequestABriefingByStakeholderSection />
      <RequestABriefingSecurityBoundariesSection />
      <RequestABriefingFAQSection />
      <RequestABriefingCTASection />
    </main>
  );
}
