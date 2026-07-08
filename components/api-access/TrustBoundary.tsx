"use client"

"use client";

import {
    KeyRound,
    CircleSlash,
    FileText,
    Lock,
    LucideIcon,
} from "lucide-react";

interface Card {
    icon: LucideIcon;
    title: string;
    description: string;
}

const cards: Card[] = [
    {
        icon: KeyRound,
        title: "Approved access only",
        description:
            "API access is provided through qualification, security review, defined scopes, and approved implementation pathways.",
    },
    {
        icon: CircleSlash,
        title: "No clinical advice",
        description:
            "ZoikoMeds APIs do not provide diagnosis, treatment recommendations, prescribing guidance, or substitution advice.",
    },
    {
        icon: FileText,
        title: "No dispensing or fulfillment",
        description:
            "ZoikoMeds does not sell, prescribe, dispense, deliver, or fulfill medicine orders through API access.",
    },
    {
        icon: Lock,
        title: "Controlled signal exposure",
        description:
            "Availability intelligence is delivered through governed confidence signals and authorized reporting, not unsafe public exposure of exact inventory quantities.",
    },
];

export default function TrustBoundary() {
    return (
        <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <p className="mb-3 text-sm font-semibold tracking-[2px] text-teal-600">
                    01 · Trust boundaries
                </p>
                <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
                    Controlled healthcare interoperability,
                    with {" "}<span className="text-[#0FAA87]">the boundaries first.</span>
                </h2>

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
                            <p className="mt-2 text-xs leading-relaxed text-gray-500">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
