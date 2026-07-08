import {
    UserRoundCog,
    List,
    MessageSquare,
    Lock,
    EyeOff,
    FileSpreadsheet,
    LucideIcon,
} from "lucide-react";

interface Card {
    icon: LucideIcon;
    title: string;
    description: string;
}

const cards: Card[] = [
    {
        icon: UserRoundCog,
        title: "Role-based permissions",
        description:
            "Permissions for pharmacist, technician, manager, compliance reviewer, owner, and viewer roles.",
    },
    {
        icon: List,
        title: "Status audit trail",
        description:
            "Every status change records user, timestamp, previous state, new state, and optional note.",
    },
    {
        icon: MessageSquare,
        title: "Message governance",
        description:
            "Patient message templates are approved and configurable by pharmacy admin.",
    },
    {
        icon: Lock,
        title: "Access review",
        description:
            "Admins can review user access by role, location, and permission group.",
    },
    {
        icon: EyeOff,
        title: "Data minimization",
        description:
            "Preview cards show only what is necessary for the task and user role.",
    },
    {
        icon: FileSpreadsheet,
        title: "Export controls",
        description:
            "Reports export only to authorized users and permitted formats.",
    },
];


export default function EnterpriseNetworksSection() {
    return (
        <section className="bg-[#0C1B30] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <p className="mb-3 uppercase text-sm font-semibold tracking-[2px] text-[#34D6C4]">
                    08 · Compliance, audit & role-based access
                </p>
                <h2 className="max-w-2xl text-3xl md:text-[32px] text-white font-semibold leading-snug text-gray-900">
                    Enterprise trust,{" "}
                    <span className="text-[#0FAA87]">built into every action.</span>
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="rounded-xl border border-white/10 bg-white/5 p-6"
                        >
                            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
                                <Icon size={18} strokeWidth={2} />
                            </div>
                            <h3 className="text-sm font-semibold text-white">{title}</h3>
                            <p className="mt-2 text-xs leading-relaxed text-[#E7EEF69E] ">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
