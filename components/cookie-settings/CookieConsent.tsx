type CookieCategory = {
    id: number;
    title: string;
    description: string;
    examples: string;
    enabled: boolean;
    alwaysOn?: boolean;
};

const cookieCategories: CookieCategory[] = [
    {
        id: 1,
        title: "Essential",
        alwaysOn: true,
        enabled: true,
        description:
            "Required for site security, navigation, accessibility, consent storage, fraud prevention, and core platform functionality.",
        examples:
            "session security, load balancing, consent receipt, form protection, account authentication.",
    },
    {
        id: 2,
        title: "Functional",
        enabled: true,
        description:
            "Remember preferences that improve the user experience.",
        examples:
            "language, region, display preferences, saved UI choices.",
    },
    {
        id: 3,
        title: "Analytics",
        enabled: false,
        description:
            "Help ZoikoMeds understand site performance and improve the product without sending sensitive medicine-search content to general analytics.",
        examples:
            "page views, button clicks, conversion funnels, anonymized performance metrics.",
    },
    {
        id: 4,
        title: "Personalization",
        enabled: false,
        description:
            "Support optional personalization only where approved and privacy-safe.",
        examples:
            "remembering preferred content paths or user-selected settings.",
    },
    {
        id: 5,
        title: "Third-party / embedded services",
        enabled: false,
        description:
            "Support approved embedded tools, video, maps, support widgets, or enterprise forms when enabled.",
        examples:
            "consent-managed third-party scripts, CRM forms, support widgets.",
    },
];

export default function CookieConsent() {
    return (
        <section id="manage" className="bg-[#f6f9fc] px-6 md:px-54 py-12">
            <div className="max-w-6xl mx-auto">

                <p className="text-xs text-[#13A594] tracking-[2px] font-semibold mb-4">
                    01 · Consent preference center
                </p>
                <h2 className="text-2xl sm:text-3xl max-w-155 font-bold text-slate-900 mb-4">
                    Accept, reject, or customize — with{" "}
                    <span className="text-[#0FAA87]">equal clarity.</span>
                </h2>
                <p className="text-[#566476] max-w-155 mb-4">
                    Rejecting non-essential cookies is exactly as easy as accepting them. Essential
                    cookies keep the site working and stay on.
                </p>
                <div className="bg-white rounded-2xl pt-4 shadow-sm mb-4">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 p-6 border-b border-[#E2E8F0]">
                        <div>
                            <h2 className="text-[16.8px] font-semibold text-[#0D1B2E]">
                                Your cookie choices
                            </h2>

                            <p className="mt-1 text-[13.4px] text-[#566476]">
                                Choose by category, then save. You can change these at any time.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button className="h-11 rounded-xl border cursor-pointer border-[#CDD7E3] bg-white px-6 font-semibold text-[#0F172A] transition hover:bg-slate-50">
                                Reject Non-Essential
                            </button>

                            <button className="h-11 rounded-xl border cursor-pointer border-[#CDD7E3] bg-white px-6 font-semibold text-[#0F172A] transition hover:bg-slate-50">
                                Accept All
                            </button>

                            <button className="h-11 rounded-xl bg-[#13A594] border cursor-pointer border-[#13A594] px-7 font-semibold text-white transition hover:bg-teal-600">
                                Save Choices
                            </button>
                        </div>
                    </div>
                    {/* Cookie Items */}
                    {cookieCategories.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex items-start justify-between gap-5 p-6 ${index !== cookieCategories.length - 1
                                    ? "border-b border-[#E2E8F0]"
                                    : ""
                                }`}
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3">

                                    <h3 className="text-[15.4px] font-semibold text-[#0D1B2E]">
                                        {item.title}
                                    </h3>

                                    {item.alwaysOn && (
                                        <span className="rounded-md border border-[#BFE5D8] bg-[#E8F6F1] px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#0F7A5A]">
                                            Always On
                                        </span>
                                    )}
                                </div>

                                <p className="text-[13.6px] leading-7 text-[#566476]">
                                    {item.description}
                                </p>

                                <p className="text-[12.5px] leading-6 text-[#7C8A9B]">
                                    <span className="font-semibold text-[#7C8A9B]">Examples:</span>{" "}
                                    {item.examples}
                                </p>
                            </div>

                            {/* Toggle */}
                            <div className="flex flex-col items-center gap-1">
                                <button
                                    className={`relative h-8 w-13 rounded-full transition ${item.enabled ? "bg-[#13A594]" : "bg-[#CDD7E3]"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition-all ${item.enabled ? "right-1" : "left-1"
                                            }`}
                                    >
                                        <svg
                                            className="h-4 w-4 text-[#13A594]"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </span>
                                </button>

                                <span className="text-[11px] font-medium uppercase tracking-wide text-[#94A3B8]">
                                    {item.enabled ? "ON" : "OFF"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-[#7C8A9B] text-[13.1px] mb-4">
                    Basic public medicine availability search is not blocked by non-essential cookie choices. Non-essential analytics, personalization, and third-party scripts do not run before
                    consent where consent is required.
                </p>

            </div>
        </section>
    )
}