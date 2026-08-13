
const scenarios = [
    {
        title: "Shortage-Prone Medicines",
        description:
            "Stay ahead of volatility for medications that frequently experience supply chain disruptions.",
        link: "Learn about supply monitoring",
        src: "/availability-alert/shortage.png",
        width: 20,
        height: 20
    },
    {
        title: "Chronic Medication Checks",
        description:
            "Automate the monthly check for your regular maintenance drugs before you head to the pharmacy.",
        link: "Set recurring monitor",
        src: "/availability-alert/check.png",
        width: 18,
        height: 18
    },
    {
        title: "Caregiver Support",
        description:
            "Monitor availability for dependents or elderly family members in different ZIP codes.",
        link: "Configure care network",
        src: "/availability-alert/caregiver.png",
        width: 20,
        height: 20
    },
    {
        title: "Travel & Temporary Locations",
        description:
            "Setting alerts for your travel destination ahead of your arrival to ensure continuity of care.",
        link: "Update travel region",
        src: "/availability-alert/plain.png",
        width: 20,
        height: 20
    },
];

export default function AvailabilityStrategic() {
    return (
        <section className="bg-[#F0F3FF] px-6 py-20 lg:px-12">
            <div className="mx-auto max-w-6xl">

                {/* Heading */}

                <div className="text-center">
                    <h2 className="text-3xl font-semibold leading-10 tracking-[-.32px] text-[#000615] md:text-[32px]">
                        Strategic{" "}
                        <span className="text-[#0FAA87]">
                            Awareness Scenarios
                        </span>
                    </h2>

                    <p className="text-[#44474D]">
                        Understanding where automated signal monitoring adds the
                        most value.
                    </p>
                </div>

                {/* Cards */}

                <div className="mt-12 grid gap-8 md:grid-cols-2">
                    {scenarios.map(
                        ({ title, description, link, src, height, width }) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-[#C4C6CE4D] bg-white p-6 shadow-sm transition hover:shadow-md"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#006A651A]">
                                    <img
                                        src={src} alt={title} width={width} height={height} />
                                </div>

                                <h3 className="mt-5 font-semibold text-[#000615]">
                                    {title}
                                </h3>

                                <p className="mt-4 text-[#44474D]">
                                    {description}
                                </p>
                            </div>
                        )
                    )}
                </div>

                {/* Bottom Banner */}

                <div className="mt-10 flex flex-col gap-6 rounded-[16px] border-2 border-[#009A6533] bg-[#009A651A] p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                        <img
                            src="/availability-alert/policy.png"
                            alt="policy"
                            width={24}
                            height={30}
                            className="mt-1 shrink-0"
                        />

                        <p className="max-w-[680px] text-sm leading-6 font-bold text-[#000615] sm:text-base">
                            <span className="font-extrabold">Scenario Safeguard:</span>{" "}
                            Alerts support availability awareness. They do not replace medical
                            advice, pharmacy consultation, or official prescription fulfillment
                            protocols.
                        </p>
                    </div>

                    <button className="w-full rounded-full bg-[#009A65] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#037f58] sm:w-auto sm:px-8 sm:text-base">
                        Full Policy Details
                    </button>
                </div>
            </div>
        </section>
    );
}