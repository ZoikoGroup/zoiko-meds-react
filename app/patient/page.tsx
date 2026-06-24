import { PatientHero, PatientCaregiver, PatientCta, PatientFeatures, PatientSignal, PatientTrust } from "@/components/patient";

export default function PatientPage() {
    return (
        <main>
            <PatientHero />
            <PatientFeatures />
            <PatientSignal />
            <PatientCaregiver />
            <PatientTrust />
            <PatientCta />
        </main>
    )
}