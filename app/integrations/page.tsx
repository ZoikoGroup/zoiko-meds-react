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
    IntegrationsCTASection
} from "@/components/integrations";

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