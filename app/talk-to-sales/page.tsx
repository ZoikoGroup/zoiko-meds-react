import {
  EnterpriseSalesHeroSection,
  ChooseRightRouteSection,
  WhoWeWorkWithSection,
  TopicsWeCanExploreSection,
  SalesVsSpecialistPathsSection,
  HowConversationGetsStartedSection,
  ShareContextFormSection,
  ResponsibleDataUseSection,
  SalesFAQSection,
} from "@/components/talk-to-sales";

export default function TalkToSalesPage() {
  return (
    <main>
      <EnterpriseSalesHeroSection />
      <ChooseRightRouteSection />
      <WhoWeWorkWithSection />
      <TopicsWeCanExploreSection />
      <SalesVsSpecialistPathsSection />
      <HowConversationGetsStartedSection />
      <ShareContextFormSection />
      <ResponsibleDataUseSection />
      <SalesFAQSection />
    </main>
  );
}
