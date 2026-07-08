"use client"
import {
    CodeXml,
    KeyRound,
    Gauge,
    Expand,
    LucideIcon,
} from "lucide-react";

interface Card {
    icon: LucideIcon;
    title: string;
    description: string;
}

const cards: Card[] = [
    {
        icon: CodeXml,
        title: "Interoperability",
        description:
            "Connect ZoikoMeds intelligence to authorized healthcare, pharmacy, distribution, and analytics systems.",
    },
    {
        icon: KeyRound,
        title: "Governed access",
        description:
            "Use role-based permissions, scopes, audit logs, and approval workflows.",
    },
    {
        icon: Gauge,
        title: "Operational intelligence",
        description:
            "Route signals, alerts, and reports into workflows where teams already act.",
    },
    {
        icon: Expand,
        title: "Enterprise scalability",
        description:
            "Support pilots, phased rollouts, monitoring, and lifecycle management.",
    },
];

export default function Value() {
    return (
        <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">

                <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
                    02 · API value summary
                </p>
                <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
                    Connect medicine availability
                    intelligence into the systems your
                    <br />
                    <span className="text-[#0FAA87]">organization already uses.</span>
                </h2>
                <p className="mt-4 max-w-160 leading-relaxed text-[#566476]">
                    ZoikoMeds API Access helps approved organizations bring medicine availability
                    signals, pharmacy network activity, shortage awareness, regional access
                    intelligence, and reporting outputs into enterprise systems, analytics
                    environments, operational workflows, and partner platforms.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 flex h-9 w-9 items-center p-2 justify-center rounded-[9px] bg-[#13A5941A] text-teal-600">
                                <Icon size={18} strokeWidth={2} />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                            <p className="mt-2 text-[12.5px] leading-relaxed text-gray-500">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
