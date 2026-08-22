import type { Metadata } from "next";

import {
  IntegrationsHeroSection,
  IntegrationsTrustSafetySection,
  IntegrationsOverviewSection,
  IntegrationsCategoriesSection,
  IntegrationsHowItWorksSection,
  IntegrationsAPIDataExchangePrinciplesSection,
  IntegrationsStakeholderWorkflowsSection,
  IntegrationsSecurityPrivacyComplianceSection,
  IntegrationsDeveloperPartnerExperienceSection,
  IntegrationsMonitoringRetentionSection,
  IntegrationsImplementationPathSection,
  IntegrationsRequestBriefingSection,
  IntegrationsFAQSection,
  IntegrationsCTASection,
} from "@/components/integrations";

export const metadata: Metadata = {
  title: "ZoikoMeds Integrations | Healthcare Data & APIs",
  description:
    "ZoikoMeds integrations connect approved healthcare, pharmacy, distribution, and enterprise systems to medicine availability intelligence and data workflows.",
};

export default function IntegrationsPage() {
  return (
    <main>
      <IntegrationsHeroSection />
      <IntegrationsTrustSafetySection />
      <IntegrationsOverviewSection />
      <IntegrationsCategoriesSection />
      <IntegrationsHowItWorksSection />
      <IntegrationsAPIDataExchangePrinciplesSection />
      <IntegrationsStakeholderWorkflowsSection />
      <IntegrationsSecurityPrivacyComplianceSection />
      <IntegrationsDeveloperPartnerExperienceSection />
      <IntegrationsMonitoringRetentionSection />
      <IntegrationsImplementationPathSection />
      <IntegrationsRequestBriefingSection />
      <IntegrationsFAQSection />
      <IntegrationsCTASection />
    </main>
  );
}
