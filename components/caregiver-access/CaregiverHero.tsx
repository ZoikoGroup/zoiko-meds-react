import React from "react";

const caregivers = [
    {
        label: "MOM",
        title: "Saved Search: Blood Pressure Monitor",
        subtitle: "Location: 5 Mile Radius (Active)",
        src: "/caregiver-access/bell.png",
    },
    {
        label: "CHILD",
        title: "Saved Search: Pediatric Allergy Meds",
        subtitle: "Alerts: Paused until July",
        src: "/caregiver-access/bell-off.png",
    },
];

const stats = [
    {
        title: "Latest Signal",
        value: "High Stability",
        bg: "bg-[#00B7A80D]",
        border:"border-[#00B7A81A]",
        color: "text-[#00B7A8]",
    },
    {
        title: "Alert Status",
        value: "4 Active",
        bg: "bg-[#F4B9420D]",
        border:"border-[#F4B9421A]",
        color: "text-[#F4B942]",
    },
];

export default function CaregiverHero() {
    return (
        <section className="bg-[#F8F6F7] px-4 py-16">
            <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
                {/* Left */}
                <div>
                    <span className="rounded-full bg-[#00B7A81A] px-3 py-1 text-[20px] leading-6 font-bold text-[#00B7A8]">
                        Caregiver Access
                    </span>

                    <h1 className="mt-6 max-w-[540px] text-[44px] font-bold leading-tight text-[#081B33]">
                        Help someone check medicine availability{" "}
                        <span className="text-[#0FAA87]">
                            without starting over every time.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-[520px] text-[16px] leading-7 text-[#44474D]">
                        Use ZoikoMeds to search, save, and monitor medicine availability
                        signals for a parent, child, spouse, or someone you support. No
                        prescription upload or medical record required.
                    </p>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <button className="rounded-xl flex gap-2 cursor-pointer justify-center items-center bg-[#081B33] px-12 py-4 font text-white transition active:bg-[#15253D] hover:bg-[#15253D]">
                            <span>Create Free Account</span>
                            <img src="/caregiver-access/arrow.png" alt="Image" width={16} height={16} />
                        </button>

                        <button className="rounded-xl border cursor-pointer border-[#C4C6CE] bg-white px-12 py-4 font text-[#081B33] transition active:bg-gray-50 hover:bg-gray-50">
                            Search Medicines
                        </button>
                    </div>
                </div>

                {/* Right Card */}
                <div className="rounded-2xl p-6 bg-[#FFFFFFCC] border border-[#E5E7EB80] shadow-2xl">
                    {/* Header */}
                    <div className="flex pb-4 border-b border-[#C4C6CE] gap-6 sm:flex-row sm:items-start justify-between">
                        <div className="flex gap-4">
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#081B330D]">
                                <img
                                    src="/caregiver-access/workspace.png"
                                    alt="Workspace"
                                    className="h-4 w-4"
                                />
                            </div>

                            <div>
                                <h3 className="text-[18px] leading-7 text-[#081B33]">
                                    My Caregiver Workspace
                                </h3>

                                <p className="text-[#75777E] leading-6">
                                    3 Managed Labels
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start justify-center gap-2 mt-2 font-bold text-[#00B7A8]">
                            <img src="/caregiver-access/dot.png" alt="dot" width={8} height={8} />
                            <span>LIVE SIGNALS</span>
                        </div>
                    </div>

                    {/* Search Cards */}
                    <div className="mt-6 space-y-4">
                        {caregivers.map((item) => (
                            <div
                                key={item.title}
                                className="flex gap-4 rounded-xl border border-[#C4C6CE] p-4 sm:flex-row sm:items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="rounded-[6px] bg-[#DCE2F3] px-3 py-1 text-xs leading-[16px] font-bold text-[#081B33]">
                                        {item.label}
                                    </span>

                                    <div>
                                        <h4 className=" text-[16px] leading-6 text-[#081B33]">
                                            {item.title}
                                        </h4>

                                        <p className="text-[16px] leading-6 text-[#75777E]">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>

                                <img
                                    src={item.src}
                                    alt="image"
                                    className="h-5 w-5"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {stats.map((item) => (
                            <div
                                key={item.title}
                                className={`${item.bg} rounded-2xl border ${item.border} p-5`}
                            >
                                <p className={`font-semibold ${item.color}`}>
                                    {item.title}
                                </p>

                                <h4 className="mt-2 text-[20px] font-medium text-[#081B33]">
                                    {item.value}
                                </h4>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}