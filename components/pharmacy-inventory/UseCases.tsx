import {
    Boxes,
    MapPin,
    Shield,
    ChartColumn,
    Package,
    List,
    LucideIcon,
    ArrowRight
} from "lucide-react";

interface Capability {
    icon: LucideIcon;
    title: string;
    description: string;
    linkLabel: string;
}

const capabilities: Capability[] = [
    {
        icon: Boxes,
        title: "Independent pharmacy",
        description:
            "Improve local discoverability for medicines while controlling public availability claims.",
        linkLabel: "Join Pharmacy Network",
    },
    {
        icon: MapPin,
        title: "Multi-location pharmacy",
        description:
            "Standardize availability signal updates and monitor stale signals across branches.",
        linkLabel: "Request Multi-Location Briefing",
    },
    {
        icon: Shield,
        title: "Specialty pharmacy",
        description:
            "Manage controlled visibility for high-touch or shortage-sensitive medicines.",
        linkLabel: "Discuss Specialty Workflow",
    },
    {
        icon: ChartColumn,
        title: "Pharmacy network",
        description:
            "Monitor participation, verification coverage, demand pressure, and reporting across locations.",
        linkLabel: "Talk to Network Sales",
    },
    {
        icon: Package,
        title: "Procurement team",
        description:
            "Use demand and stock-risk intelligence to prioritize review and replenishment planning.",
        linkLabel: "Request Inventory Intelligence Briefing",
    },
    {
        icon: List,
        title: "Compliance lead",
        description:
            "Review audit trails, permission settings, and availability-governance workflows.",
        linkLabel: "Review Trust Controls",
    },
];

export default function UseCases() {
    return (
        <section className="bg-[#F6F9FC] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
                    07 · Use cases by segment
                </p>

                <h1 className="text-3xl max-w-160 font-semibold leading-[45px] text-[#0D1B2E] md:text-[32px]">
                    Value mapped to{" "}
                    <span className="text-[#0FAA87]"> every pharmacy
                        segment.</span>
                </h1>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {capabilities.map(({ icon: Icon, title, description, linkLabel }) => (
                        <div
                            key={title}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 flex h-9 w-9 items-center p-2 justify-center rounded-[9px] bg-[#13A5941A] text-teal-600">
                                <Icon size={18} strokeWidth={2} />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
                            <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700">
                                {linkLabel}
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
