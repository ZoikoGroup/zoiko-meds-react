import {
    Sun,
    FileText,
    CodeXml,
    Clock3,
    LucideIcon,
} from "lucide-react";

interface Capability {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    description: string;
}

const capabilities: Capability[] = [
    {
        icon: Sun,
        title: "Manual update",
        subtitle: "Independent & MVP",
        description:
            "Simple update drawer with required role permission, audit log, and timestamp.",
    },
    {
        icon: FileText,
        title: "CSV upload",
        subtitle: "Batch updates",
        description:
            "Template validation, preview screen, error handling, and rollback option.",
    },
    {
        icon: CodeXml,
        title: "API integration",
        subtitle: "Enterprise & networks",
        description:
            "Secure authentication, field mapping, rate limits, audit logs, and sandbox testing.",
    },
    {
        icon: CodeXml,
        title: "Pharmacy system connector",
        subtitle: "Mature partners",
        description:
            "Formal integration review, data minimization, permission model, and monitoring.",
    },
    {
        icon: Clock3,
        title: "Scheduled review",
        subtitle: "No deep integration",
        description:
            "Reminder cadence, saved medicine groups, and stale signal alerts.",
    },
];


export default function UseCases() {
    return (
        <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
                    08 · Integrations & data entry
                </p>

                <h1 className="text-3xl max-w-160 font-semibold leading-[45px] text-[#0D1B2E] md:text-[32px]">
                    Update signals the way that {" "}
                    <span className="text-[#0FAA87]"> fits your
                        pharmacy.</span>
                </h1>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                    {capabilities.map(({ icon: Icon, title, subtitle, description }) => (
                        <div
                            key={title}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 flex h-9 w-9 items-center p-2 justify-center rounded-[9px] bg-[#13A5941A] text-teal-600">
                                <Icon size={18} strokeWidth={2} />
                            </div>
                            <h3 className="text-[13px] font-semibold text-gray-900">{title}</h3>
                            <a className="mt-2 inline-flex items-center gap-1 text-[11.5px] tracking-[1px] font-medium text-teal-600 hover:text-teal-700">
                                {subtitle}
                            </a>
                            <p className="mt-2 text-xs leading-relaxed text-gray-500">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}