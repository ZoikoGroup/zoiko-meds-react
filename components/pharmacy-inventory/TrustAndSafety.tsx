"use client"

import {
    Ban,
    UserRoundCheck,
    List,
    LucideIcon,
    Lock,
} from "lucide-react";

interface Card {
    icon: LucideIcon;
    title: string;
    description: string;
}

const cards: Card[] = [
    {
        icon: Lock,
        title: "Pharmacy-controlled visibility",
        description:
            "Your pharmacy controls what availability signals are updated, reviewed, and made visible through approved workflows.",
    },
    {
        icon: Ban,
        title: "No unsafe public quantity exposure",
        description:
            "ZoikoMeds should not display exact inventory quantities publicly to unauthorized users.",
    },
    {
        icon: UserRoundCheck,
        title: "Verified network participation",
        description:
            "Structured confirmations can strengthen confidence and improve responsible patient routing.",
    },
    {
        icon: List,
        title: "Audit-ready operations",
        description:
            "Role-based access, timestamped updates, and evidence trails support governance and review.",
    },
];

export default function TrustAndSafety() {
    return (
        <section className="bg-[#F6F9FC] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
                    01 · Trust & safety
                </p>

                <h1 className="text-3xl font-semibold leading-[45px] text-[#0D1B2E] md:text-[32px]">
                    Pharmacy-{" "}
                    <span className="text-[#0FAA87]">controlled by design.</span>
                </h1>

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
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
