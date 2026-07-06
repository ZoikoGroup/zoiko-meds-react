import { 
    SecurityHeroSection,
    SecurityTrustBoundariesSection,
    SecurityArchitectureSection,
    SecurityAccessControlSection,
    SecurityDataProtectionSection,
    SecurityInventorySafetySection,
    SecurityAIGovernanceSection,
    SecurityAuditabilitySection,
    SecurityMonitoringSection,
    SecurityImplementationReadinessSection,
    SecurityComparisonSection,
    SecurityBriefingRequestSection,
    SecurityFAQSection,
    SecurityCTASection
} from "@/components/security";

export default function SecurityPage() {
  return (
    <main>
      <SecurityHeroSection />
      <SecurityTrustBoundariesSection />
      <SecurityArchitectureSection />
      <SecurityAccessControlSection />
      <SecurityDataProtectionSection />
      <SecurityInventorySafetySection />
      <SecurityAIGovernanceSection />
      <SecurityAuditabilitySection />
      <SecurityMonitoringSection />
      <SecurityImplementationReadinessSection />
      <SecurityComparisonSection />
      <SecurityBriefingRequestSection />
      <SecurityFAQSection />
      <SecurityCTASection />
    </main>
  );
}