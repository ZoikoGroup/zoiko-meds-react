"use client"
import {
    ClipboardList,
    Funnel,
    CalendarDays,
    ChartColumn,
    BookOpen,
    Check,
    LucideIcon,
} from "lucide-react";

interface Card {
    icon: LucideIcon;
    title: string;
    description: string;
}

const cards: Card[] = [
    {
        icon: ClipboardList,
        title: "Workflow templates",
        description:
            "Preconfigured workflows for independent pharmacies, groups, and enterprise chains.",
    },
    {
        icon: Funnel,
        title: "Saved views",
        description:
            "Save filters for review queue, ready queue, exceptions, and delayed items.",
    },
    {
        icon: CalendarDays,
        title: "Recurring operational reports",
        description:
            "Weekly or monthly dispensing workflow summaries.",
    },
    {
        icon: ChartColumn,
        title: "Location benchmarking",
        description:
            "Compare performance across stores where permitted.",
    },
    {
        icon: BookOpen,
        title: "Training & playbooks",
        description:
            "In-product guidance for admins, pharmacists, technicians, and managers.",
    },
    {
        icon: Check,
        title: "Implementation review",
        description:
            "Post-launch review of adoption, bottlenecks, and workflow optimization.",
    },
];

export default function Retention() {
    return (
        <section className="bg-[#f6f9fc] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">

                <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
                    11 · Customer success & retention
                </p>

                <h1 className="text-3xl max-w-150 font-semibold leading-[45px] text-[#0D1B2E] md:text-[32px]">
                    A daily pharmacy {" "}
                    <span className="text-[#0FAA87]">operating habit.</span>
                </h1>

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
