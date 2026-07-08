interface Step {
    step: number;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        step: 1,
        title: "Review priority",
        description:
            "Pharmacy reviews dashboard alerts or search demand.",
    },
    {
        step: 2,
        title: "Update signal",
        description:
            "Authorized user updates availability status with visibility level and confirmation.",
    },
    {
        step: 3,
        title: "Classify",
        description:
            "System classifies confidence and freshness automatically.",
    },
    {
        step: 4,
        title: "Approved layer",
        description:
            "Signal appears in the approved visibility layer, respecting permissions.",
    },
    {
        step: 5,
        title: "Feed analytics",
        description:
            "Demand and performance data feeds analytics without exposing unsafe data.",
    },
    {
        step: 6,
        title: "Recurring review",
        description:
            "Weekly summary, saved watchlists, and alerts encourage retention.",
    },
];


export default function AvailabilitySignalsSection() {
    return (
        <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-6xl">
                <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
                    06 · Update to insight
                </p>
                <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
                    How inventory signals become
                    {" "}
                    <span className="text-[#0FAA87]">responsible availability intelligence.</span>
                </h2>

                <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-6">
                    {steps.map(({ step, title, description }) => (
                        <div
                            key={title}
                            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#13A594] text-teal-600">
                                <span className="text-xs text-white font-medium">{step}</span>
                            </div>
                            <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                            <p className="mt-2 text-xs max-w-40 leading-relaxed text-gray-500">{description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
