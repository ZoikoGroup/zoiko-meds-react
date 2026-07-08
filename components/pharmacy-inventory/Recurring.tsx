import {
    Bookmark,
    Bell,
    ChartColumn,
    Check,
    FileText,
    UserRound,
    Gauge,
    ArrowRight,
    LucideIcon,
} from "lucide-react";

interface Card {
    icon: LucideIcon;
    title: string;
    description: string;
    cta?: string;
    highlighted?: boolean;
}

const cards: Card[] = [
    {
        icon: Bookmark,
        title: "Saved medicine watchlists",
        description:
            "Return to monitor medicines that matter most to your business and patients.",
    },
    {
        icon: Bell,
        title: "Stale signal alerts",
        description:
            "Prompts regular updates and maintains platform freshness.",
    },
    {
        icon: ChartColumn,
        title: "Demand signal summaries",
        description:
            "Shows where local interest is increasing.",
    },
    {
        icon: Check,
        title: "Participation score",
        description:
            "Rewards consistent verified updates without gamifying clinical decisions.",
    },
    {
        icon: FileText,
        title: "Recurring reports",
        description:
            "Supports owners, network leaders, and compliance teams.",
    },
    {
        icon: UserRound,
        title: "Role-based tasks",
        description:
            "Keeps staff accountable for assigned updates and reviews.",
    },
    {
        icon: Gauge,
        title: "Network visibility benefits",
        description:
            "Shows how better participation improves confidence and routing quality.",
    },
    {
        icon: ArrowRight,
        title: "Start now",
        description:
            "Join the network and set your first watchlist.",
        cta: "Join network",
        highlighted: true,
    },
];

export default function Recurring() {
    return (
        <section className="bg-[#F6F9FC] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
                    09 · Recurring value
                </p>
                <h2 className="max-w-150 text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
                    Reasons pharmacies{" "}
                    <span className="text-[#0FAA87]"> stay engaged.</span>
                </h2>

                <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map(({ icon: Icon, title, description, cta, highlighted }) => (
                        <div
                            key={title}
                            className={`rounded-xl border p-5 ${highlighted
                                    ? "border-[#13A59440] bg-[#13A5941A]"
                                    : "border-[#E4EBF4] bg-white"
                                }`}
                        >
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-lg ${highlighted ? "bg-white" : "bg-[#13A5941A]"
                                    }`}
                            >
                                <Icon className="h-5 w-5 text-[#009D8C]" strokeWidth={2} />
                            </div>

                            <h3 className="mt-2 text-[13.3px] font-semibold text-[#0D1526]">
                                {title}
                            </h3>

                            <p className="text-xs mt-1 max-w-50 text-[#5A6E87]">
                                {description}
                            </p>

                            {cta && (
                                <button className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#009D8C]">
                                    {cta}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 12h14m-6-6 6 6-6 6"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
