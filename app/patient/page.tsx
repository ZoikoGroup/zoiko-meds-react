import { PatientHero } from "@/components/patient";
import PatientCaregiver from "@/components/patient/PatientCaregiver";
import PatientCta from "@/components/patient/PatientCta";
import PatientFeatures from "@/components/patient/PatientFeatures";
import PatientSignal from "@/components/patient/PatientSignal";
import PatientTrust from "@/components/patient/PatientTrust";

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