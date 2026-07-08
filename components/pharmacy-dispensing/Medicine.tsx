import {
    CheckCircle2,
    Activity,
    Layers,
    AlertTriangle,
    MessageSquare,
    Info,
    ArrowRight,
    LucideIcon,
} from "lucide-react";

interface Card {
    icon: LucideIcon;
    title: string;
    description: string;
    footer:
    | { type: "callout"; text: string }
    | { type: "link"; text: string }
    | { type: "note"; text: string };
}

const cards: Card[] = [
    {
        icon: CheckCircle2,
        title: "Readiness status",
        description:
            "Pending Review, Availability Confirmed, Awaiting Preparation, Ready for Pickup, Delayed, Exception, Closed.",
        footer: {
            type: "callout",
            text: 'Do not show "dispensed" unless the pharmacy user has authority and the system records it appropriately.',
        },
    },
    {
        icon: Activity,
        title: "Availability confidence",
        description:
            "Signals whether the pharmacy has sufficient confidence to proceed with the next workflow action.",
        footer: {
            type: "callout",
            text: "Do not expose exact stock quantities to unauthorized users or public pages.",
        },
    },
    {
        icon: Layers,
        title: "Inventory dependency",
        description: "Connects to the Inventory module for internal pharmacy operations only.",
        footer: { type: "link", text: "View Inventory module" },
    },
    {
        icon: AlertTriangle,
        title: "Substitution boundary",
        description:
            'If a medicine is unavailable, the platform may flag "requires pharmacist review" — but never recommends clinical substitutions.',
        footer: { type: "callout", text: "No treatment, prescribing, or substitution advice." },
    },
    {
        icon: MessageSquare,
        title: "Patient status translation",
        description: "Internal workflow states map to patient-friendly readiness messages.",
        footer: {
            type: "note",
            text: "Patient messaging is safe, non-clinical, and configurable.",
        },
    },
];

export default function MedicineReadinessSection() {
    return (
        <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
                    04 · Medicine readiness & availability confidence
                </p>
                <h2 className="max-w-150 text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
                    Internal readiness, separated from{" "}
                    <span className="text-[#0FAA87]">public availability claims.</span>
                </h2>
                <p className="mt-4 max-w-160 leading-relaxed text-[#566476]">
                    Dispensing workflows connect to ZoikoMeds intelligence only through permitted
                    pharmacy, inventory, and confirmation signals.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map(({ icon: Icon, title, description, footer }) => (
                        <div
                            key={title}
                            className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 flex h-9 w-9 items-center p-2 justify-center rounded-[9px] bg-[#13A5941A] text-teal-600">
                                <Icon size={18} strokeWidth={2} />
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">{description}</p>

                            <div className="mt-4 flex-1" />

                            {footer.type === "callout" && (
                                <div className="mt-4 flex gap-2 rounded-lg border-l-3 border-l-[#1F6FB2] border border-[#C4DCEF] bg-[#EAF3FB] p-3">
                                    <Info size={14} className="mt-0.5 shrink-0 text-[#1C4E74]" />
                                    <p className="text-xs leading-relaxed text-[#1C4E74]">{footer.text}</p>
                                </div>
                            )}

                            {footer.type === "link" && (
                                <button className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700">
                                    {footer.text}
                                    <ArrowRight size={14} />
                                </button>
                            )}

                            {footer.type === "note" && (
                                <p className="mt-4 font-mono text-xs leading-relaxed text-teal-600">
                                    {footer.text}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}