"use client"
import {
    LayoutGrid,
    Funnel,
    CreditCard,
    PanelLeft,
    TriangleAlert,
    MapPin,
    LucideIcon,
} from "lucide-react";

interface Card {
    icon: LucideIcon;
    title: string;
    description: string;
}

const cards: Card[] = [
    {
        icon: LayoutGrid,
        title: "Queue board",
        description:
            "Board with status lanes, compact cards, urgency badges, patient-safe labels, and action-owner indicators.",
    },
    {
        icon: Funnel,
        title: "Priority filters",
        description:
            "Today, overdue, needs pharmacist review, patient response required, delayed, and ready for pickup — persisted per role.",
    },
    {
        icon: CreditCard,
        title: "Prescription card",
        description:
            "Masked identifier, medicine where permitted, status, last action, next action, and due time. Never exposes sensitive details to unauthorized roles.",
    },
    {
        icon: PanelLeft,
        title: "Action drawer",
        description:
            "Slide-out panel for review, note, patient update, status change, and audit history — every change writes an event log.",
    },
    {
        icon: TriangleAlert,
        title: "Exception banner",
        description:
            "Highlights blocked or delayed workflows with reason and next step, with role-specific messaging and no restricted data leakage.",
    },
    {
        icon: MapPin,
        title: "Location selector",
        description:
            "For multi-location pharmacies and groups, permission-gated by location access.",
    },
];

export default function Workflow() {
    return (
        <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">

                <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
                    02 · Workflow command center
                </p>

                <h1 className="text-3xl max-w-150 font-semibold leading-[45px] text-[#0D1B2E] md:text-[32px]">
                    The complete dispensing  {" "}
                    <span className="text-[#0FAA87]">queue and
                        status model.</span>
                </h1>
                <p className="mt-4 max-w-160 leading-relaxed text-[#566476]">
                    A pharmacy workflow command center your team can understand immediately —
                    queues, statuses, owners, and next actions.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
