import type { Metadata } from "next";

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

export const metadata: Metadata = {
  title: "Talk to Sales for Healthcare Solutions | ZoikoMeds",
  description:
    "Connect with our sales team to explore healthcare solutions tailored to your business needs. Get expert guidance and discover more with ZoikoMeds.",
};

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
