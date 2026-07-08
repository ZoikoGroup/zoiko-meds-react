import {
    Lock,
    List,
    Filter,
    CircleSlash,
    LockKeyhole,
    Feather,
    Check,
    CircleAlert,
    LucideIcon,
} from "lucide-react";

interface Card {
    icon: LucideIcon;
    title: string;
    description: string;
}

const cards: Card[] = [
    {
        icon: Lock,
        title: "Role-based access control",
        description:
            "Only authorized users can update, approve, export, or view restricted inventory data.",
    },
    {
        icon: List,
        title: "Audit logs",
        description:
            "Record user, role, action, timestamp, old value, new value, visibility level, and source.",
    },
    {
        icon: Filter,
        title: "Data minimization",
        description:
            "Collect only inventory signal data necessary for platform purpose.",
    },
    {
        icon: CircleSlash,
        title: "No patient-specific data",
        description:
            "Workflows must not require patient diagnosis, treatment information, or protected clinical details.",
    },
    {
        icon: LockKeyhole,
        title: "Public quantity restriction",
        description:
            "Public pages must not expose exact stock quantities to unauthorized users.",
    },
    {
        icon: Feather,
        title: "Responsible language",
        description:
            "Use “availability signal,” “confidence,” and “review needed” rather than guaranteed stock claims.",
    },
    {
        icon: Check,
        title: "Human review",
        description:
            "Sensitive changes, bulk uploads, or high-risk medicine categories may require approval.",
    },
    {
        icon: CircleAlert,
        title: "Accessibility",
        description:
            "All dashboard and form workflows meet WCAG 2.2 AA.",
    },
];

export default function Governance() {
    return (
        <section className="bg-[#0C1B30] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <p className="mb-3 uppercase text-sm font-semibold tracking-[2px] text-[#34D6C4]">
                    10 · Security, compliance & governance
                </p>
                <h2 className="max-w-2xl text-3xl md:text-[32px] text-white font-semibold leading-snug text-gray-900">
                    Governance and{" "}
                    <span className="text-[#0FAA87]">controls, built in.</span>
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="rounded-xl border border-white/10 bg-white/5 p-6"
                        >
                            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
                                <Icon size={18} strokeWidth={2} />
                            </div>
                            <h3 className="text-[13px] font-semibold text-white">{title}</h3>
                            <p className="mt-1 text-xs leading-relaxed text-[#E7EEF69E] ">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
