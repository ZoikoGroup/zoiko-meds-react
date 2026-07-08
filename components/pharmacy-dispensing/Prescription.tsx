"use client"
import {
    Grid2x2,
    GitBranch,
    TriangleAlert,
    UserRound,
    EyeOff,
    LucideIcon,
    ArrowRight
} from "lucide-react";

interface Card {
    icon: LucideIcon;
    title: string;
    description: string;
    action: string;
}

const cards: Card[] = [
    {
        icon: Grid2x2,
        title: "Centralized intake view",
        description:
            "See new prescriptions, transfers, refill requests, and pending actions in one queue.",
        action: "See intake workflow",
    },
    {
        icon: GitBranch,
        title: "Triage rules",
        description:
            "Route items by urgency, availability confidence, pharmacist review need, patient response, and operational deadline.",
        action: "Configure triage",
    },
    {
        icon: TriangleAlert,
        title: "Duplicate & conflict awareness",
        description:
            "Flags possible duplicate tasks, unresolved handoffs, or conflicting readiness states for review.",
        action: "Request demo",
    },
    {
        icon: UserRound,
        title: "Role-based task assignment",
        description:
            "Assign intake tasks to technicians, pharmacists, or managers according to permissions.",
        action: "Manage roles",
    },
    {
        icon: EyeOff,
        title: "Patient-safe masking",
        description:
            "Masks sensitive information in previews where full access is not required.",
        action: "Explore security controls",
    },
];

export default function Prescription() {
    return (
        <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">

                <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
                    03 · Prescription intake & triage
                </p>
                <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
                    See what needs action — and {" "}
                    <span className="text-[#0FAA87]">route it
                        responsibly. </span>
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map(({ icon: Icon, title, description, action }) => (
                        <div
                            key={title}
                            className="rounded-xl border flex flex-col justify-between border-gray-200 bg-white p-6 shadow-sm"
                        >
                            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                                <Icon size={18} strokeWidth={2} />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                            <p className="mt-1 text-sm leading-relaxed text-gray-500">{description}</p>
                            <button className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700">
                                {action}
                                <ArrowRight size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
