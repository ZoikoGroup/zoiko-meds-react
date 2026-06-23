import { PlatformEngage, PlatformFeatures, PlatformHero, PlatformManifesto, PlatformProtocol, PlatformStats } from "@/components/platform";

export default function PlatformPage() {
    return (
        <main>
            <PlatformHero />
            <PlatformFeatures />
            <PlatformProtocol />
            <PlatformManifesto />
            <PlatformEngage />
            <PlatformStats />
        </main>
    )
}