import {
    Hero,
    Regulatory,
    Workflow,
    Prescription,
    Medicine,
    PharmacistReviewSection,
    PatientCommunicationSection,
    ExceptionsEscalationsSection,
    Compliance,
    Analytics,
    Retention,
    IntegrationsDataFlowSection,
    Request,
    FaqSection,
    FinalCtaSection
} from "@/components/pharmacy-dispensing";

export default function PharmacyDispensing() {
    return (
        <main>
            <Hero />
            <Regulatory />
            <Workflow />
            <Prescription />
            <Medicine />
            <PharmacistReviewSection />
            <PatientCommunicationSection />
            <ExceptionsEscalationsSection />
            <Compliance />
            <Analytics />
            <IntegrationsDataFlowSection />
            <Retention />
            <Request />
            <FaqSection />
            <FinalCtaSection />
        </main>
    )
}