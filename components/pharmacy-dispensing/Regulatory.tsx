"use client"

import {
    Circle,
    Ban,
    UserRoundCheck,
    List,
    LucideIcon,
} from "lucide-react";

interface Card {
    icon: LucideIcon;
    title: string;
    description: string;
}

const cards: Card[] = [
    {
        icon: Circle,
        title: "Workflow support only",
        description:
            "ZoikoMeds helps pharmacies coordinate workflow visibility. The licensed pharmacy remains responsible for regulated dispensing activity.",
    },
    {
        icon: Ban,
        title: "No medical advice",
        description:
            "The platform does not provide diagnosis, treatment recommendations, prescribing guidance, or substitution advice.",
    },
    {
        icon: UserRoundCheck,
        title: "Role-based pharmacy access",
        description:
            "Dispensing workflows must be limited to authorized pharmacy users with appropriate permissions.",
    },
    {
        icon: List,
        title: "Audit-ready operations",
        description:
            "Status changes, handoffs, notes, and exceptions should be captured for operational review.",
    },
];

export default function Regulatory() {
    return (
        <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
                    01 · Regulatory boundary
                </p>

                <h1 className="text-3xl max-w-150 font-semibold leading-[45px] text-[#0D1B2E] md:text-[32px]">
                    Workflow infrastructure — {" "}
                    <span className="text-[#0FAA87]">not the
                        dispensing pharmacy.</span>
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
