import React from "react";

const features = [
    {
        icon: "/caregiver-access/search.png",
        title: "Search on Their Behalf",
        description:
            "Perform anonymous searches for medicine availability in their specific zip code or preferred pharmacy network without needing their credentials.",
        iconBg: "bg-[#00B7A81A]",
    },
    {
        icon: "/caregiver-access/folder.png",
        title: "Organize Saved Searches",
        description:
            "Use custom labels like 'Mom', 'Child', or 'Spouse' to keep different search parameters separate and clearly organized in one dashboard.",
        iconBg: "bg-[#F4B9421A]",
    },
    {
        icon: "/caregiver-access/notification.png",
        title: "Get Availability Alerts",
        description:
            "Receive automated notifications when stock levels fluctuate for the medicines you are monitoring, allowing for proactive care management.",
        iconBg: "bg-[#081B331A]",
    },
];

export default function CaregiverFeatures() {
    return (
        <section className="bg-[#FFFFFF] px-4 py-16">
            <div className="mx-auto max-w-6xl">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl sm:text-[38px] leading-10 font-semibold text-[#081B33]">
                        Three simple ways to{" "}
                        <span className="text-[#0FAA87]">
                            help someone you support.
                        </span>
                    </h2>
                </div>

                {/* Cards */}
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-2xl border border-[#C4C6CE] bg-white p-6"
                        >
                            <div
                                className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}
                            >
                                <img
                                    src={item.icon}
                                    alt={item.title}
                                    width={25}
                                    height={20}
                                />
                            </div>

                            <h3 className="mt-3 text-[20px] font-semibold leading-6 text-[#081B33]">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-[16px] leading-6 text-[#44474D]">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Bottom Banner */}
                <div className="mt-10 md:max-h-[110px] flex flex-col gap-6 rounded-3xl bg-[#0B1F3A] p-4 md:py-8 md:px-12 sm:flex-row sm:items-center">
                    <img
                        src="/caregiver-access/governance.png"
                        alt="Governance"
                        width={24}
                        height={24}
                    />
                    <div>
                        <h4 className="text-base font-bold leading-6 text-[#00B7A8]">
                            Governance Boundary
                        </h4>

                        <p className="mt-1 text-[16px] leading-6 text-white">
                            ZoikoMeds Infrastructure does not manage treatment, verify
                            prescriptions, or provide clinical medical advice. We provide
                            technical availability signals only.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}