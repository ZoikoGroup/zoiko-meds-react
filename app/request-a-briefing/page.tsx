import { 
    RequestABriefingHeroSection,
    RequestABriefingSelectTypeSection,
    RequestABriefingFormSection,
    RequestABriefingWhatHappensNextSection,
    RequestABriefingAgendaModulesSection,
    RequestABriefingByStakeholderSection,
    RequestABriefingSecurityBoundariesSection,
    RequestABriefingFAQSection,
    RequestABriefingCTASection
} from "@/components/request-a-briefing";

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