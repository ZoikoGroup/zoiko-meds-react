import {
    AvailabilitySignalsSection,
    DashboardValueSection,
    CoreModulesSection,
    Hero,
    OperatingOverviewSection,
    TrustEquitySection,
    EnterpriseNetworksSection,
    AccessDemandSection,
    ReportingInsightSection,
    PrivacySafeguardsSection,
    ProcessStepsSection,
    JoinNetworkFormSection,
    FaqSection,
    FinalCtaSection
} from "@/components/pharmacy-dashboard";

export default function PharmacyDashboard() {
    return (
        <main>
            <Hero />
            <TrustEquitySection />
            <OperatingOverviewSection />
            <CoreModulesSection />
            <AvailabilitySignalsSection />
            <DashboardValueSection />
            <EnterpriseNetworksSection />
            <AccessDemandSection />
            <ReportingInsightSection />
            <PrivacySafeguardsSection />
            <ProcessStepsSection />
            <JoinNetworkFormSection />
            <FaqSection />
            <FinalCtaSection />
        </main>
    )
}