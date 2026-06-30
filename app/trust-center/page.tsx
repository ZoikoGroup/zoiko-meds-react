import { TrustHero, TrustDoctrine, TrustStack, TrustControls, TrustVerify, TrustAudience,TrustEnterprise } from "@/components/trust-center";

export default function TrustCenter() {
    return (
        <main>
            <TrustHero />
            <TrustDoctrine />
            <TrustStack />
            <TrustControls />
            <TrustVerify />
            <TrustAudience />
            <TrustEnterprise />
        </main>
    )
}