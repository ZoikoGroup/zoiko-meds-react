import type { Metadata } from "next";
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
  SecurityCTASection,
} from "@/components/security";

export const metadata: Metadata = {
  title: "Healthcare Data Security & Protection | ZoikoMeds",
  description:
    "Protect healthcare data with ZoikoMeds through role-based access, encryption, privacy controls, auditability, security monitoring, and AI-first governance.",
};

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
