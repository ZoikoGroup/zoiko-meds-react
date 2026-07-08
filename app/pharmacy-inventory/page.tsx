import {
    Hero,
    TrustAndSafety,
    AvailabilityFrictionSection,
    InventoryCapabilitiesSection,
    InventoryDashboardSection,
    SignalPermissionModelSection,
    Insight,
    UseCases,
    Integrations,
    Recurring,
    Governance,
    FaqSection,
    FinalCtaSection,
    Briefing
} from '@/components/pharmacy-inventory'

export default function page() {
    return (
        <main>
            <Hero />
            <TrustAndSafety />
            <AvailabilityFrictionSection />
            <InventoryCapabilitiesSection />
            <InventoryDashboardSection />
            <SignalPermissionModelSection />
            <Insight />
            <UseCases />
            <Integrations />
            <Recurring />
            <Governance />
            <Briefing />
            <FaqSection />
            <FinalCtaSection />
        </main>
    )
}
