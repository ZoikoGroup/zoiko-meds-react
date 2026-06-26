import React from "react";
import Image from 'next/image'
const tabs = [
    "With saved searches",
    "Stale",
    "Empty",
    "Deleted",
];

const searches = [
    {
        title: "Ibuprofen 200 mg",
        location: "Austin, TX · within 10 miles · last checked Today",
        note: "Recently updated. Confirm before traveling. · Alert on",
        badge: "Strong signal",
        badgeColor:
            "border-[#BFE5D8] bg-[#E8F6F1] text-[#0F7A5A]",
        src: "/saved-searches/tick.png",
        alt: "Image"
    },
    {
        title: "Albuterol inhaler",
        location: "Round Rock, TX · within 25 miles · last checked 2 days ago",
        note: "Contact the pharmacy directly. · No alert",
        badge: "Confirmation needed",
        badgeColor:
            "border-[#EAF3FB] bg-[#EAF3FB] text-[#1F6FB2]",
        src: "/saved-searches/call.png",
        alt: "Image"
    },
];

const actions = [
    "Run search again",
    "Create alert",
    "Edit",
    "Rename",
    "Delete",
];

const includeList = [
    "Medicine name you entered (brand or generic)",
    "Strength or form, if you provided it",
    "Location or service area, and search radius",
    "Preferred pharmacy and alert preference, where enabled",
    "A caregiver label and last-run date",
];

const notIncludeList = [
    "A prescription, refill, or pharmacy order",
    "Reserved medicine or confirmed stock",
    "A clinical recommendation or diagnosis",
    "Eligibility to receive medicine, or adherence tracking",
    "A guarantee of future availability",
];

export default function SavedManage() {
    return (
        <section className="bg-[#EEF2F7] px-4 py-16">
            <div className="mx-auto max-w-6xl">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-[32px] font-semibold text-[#0D1B2E]">
                        Manage saved{" "}
                        <span className="text-[#0FAA87]">
                            searches in your account.
                        </span>
                    </h2>

                    <p className="mx-auto mt-4 max-w-[595px] text-center text-[16px] leading-6 text-[#566476]">
                        After you sign in, your saved searches live in a private
                        workspace. Here's what it looks like.
                    </p>
                </div>

                {/* Tabs */}
                <div className="mt-12 md:mt-24 grid grid-cols-2 md:flex flex-wrap gap-3">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab}
                            className={`rounded-full border px-3.5 py-2.5 text-sm font-medium transition ${index === 0
                                ? "border-[#13A594] bg-[#13A594]/10 text-[#0F8B7D]"
                                : "border-[#CDD7E3] bg-white text-[#0D1B2E]"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Search Cards */}
                <div className="mt-6 space-y-3">
                    {searches.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-[13px] border border-[#E2E8F0] bg-white p-6"
                        >
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                    <h3 className="text-[16px] font-semibold text-[#0D1B2E]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-[13px] text-[#566476] leading-5">
                                        {item.location}
                                    </p>

                                    <p className="mt-2 text-[12.8px] text-[#7C8A9B]">
                                        {item.note}
                                    </p>
                                </div>

                                <div
                                    className={`w-fit flex  items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${item.badgeColor}`}
                                >
                                    <Image src={item.src} alt={item.alt} width={12} height={12} />
                                    <span>{item.badge}</span>
                                </div>
                            </div>

                            <div className="mt-5 flex flex-wrap gap-2">
                                {actions.map((action, index) => (
                                    <button
                                        key={action}
                                        className={`rounded-xl px-3.5 py-2.5 text-sm cursor-pointer font-semibold transition ${index === 0
                                            ? "bg-[#13A594] border border-[#13A594] text-white hover:bg-[#109889]"
                                            : "border border-[#CDD7E3] bg-white text-[#0D1B2E] hover:bg-gray-50"
                                            }`}
                                    >
                                        {action}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Cards */}
                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-[#0F7A5A]">
                            <img src="/saved-searches/tick.png" alt="Image" width={18} height={18} />
                            <span>What a saved search can include</span>
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {includeList.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3 text-[13.4px] text-[#506277]"
                                >
                                    <img src="/saved-searches/right.png" alt="Image" width={13} height={13} />
                                    <span className="text-[#506277]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
                        <h3 className="flex items-center gap-2 text-[15.2px] leading-6 font-semibold text-[#2B3A4F]">
                            <img src="/saved-searches/wrong.png" alt="Image" width={12} height={12} />
                            <span>What it never means</span>
                        </h3>

                        <ul className="mt-5 space-y-3">
                            {notIncludeList.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3 text-sm text-[#566476]"
                                >
                                    <img src="/saved-searches/wrong.png" alt="Image" width={8} height={8} />
                                    <span className="text-[#506277]">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}