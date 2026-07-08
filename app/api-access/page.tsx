import {
    Hero,
    TrustBoundary,
    Value,
    Integration
} from '@/components/api-access'

export default function page() {
    return (
        <main>
            <Hero />
            <TrustBoundary />
            <Value />
            <Integration />
        </main>
    )
}