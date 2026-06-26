import React from "react";

const details = [
    { label: "Location", value: "Austin, TX" },
    { label: "Radius", value: "10 miles" },
    { label: "Last Checked", value: "Today" },
    { label: "Alert", value: "Off" },
];

const actions = [
    {
        label: "Run again",
        primary: true,
    },
    {
        label: "Create alert",
    },
    {
        label: "Edit",
    },
    {
        label: "Delete",
    },
];

export default function SavedHero() {
    return (
        <section className="bg-[#F4F7FB] px-4 py-8 lg:py-24">
            <div className="mx-auto max-w-6xl">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    {/* Left Content */}
                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
                            Saved Searches
                        </p>

                        <h1 className="max-w-[700px] text-4xl font-semibold leading-[45px] text-[#0D1B2E] md:text-[40px]">
                            Save the medicine searches{" "}
                            <span className="text-[#0FAA87]">
                                you need to check again.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-[17px] leading-[26px] text-[#566476]">
                            Create a free ZoikoMeds account to save medicine and location
                            searches, run them again, and create alerts when availability
                            signals change.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button className="rounded-xl bg-[#13A594] border border-[#13A594] px-6 cursor-pointer py-3 font-semibold text-white transition hover:bg-[#119485]">
                                Create Free Account
                            </button>

                            <button className="rounded-xl border border-[#D0D5DD] bg-white px-6 cursor-pointer py-3 font-semibold text-[#0D1B2E] transition hover:bg-gray-50">
                                Search Medicines
                            </button>
                        </div>

                        <div className="mt-6 flex items-start gap-2 text-sm text-[#98A2B3]">
                            <img src="/saved-searches/lock.png" alt="lock" height={18} width={18} />
                            <p className="max-w-[350px] text-[14px] leading-[19px] text-[#7C8A9B]">
                                You can search without an account. Saving searches requires
                                an account so you can manage, update, and delete them
                                securely.
                            </p>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="flex flex-col items-center">
                        <div className="mx-auto w-full max-w-md rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-xl">
                            <div className="flex items-start justify-between">
                                <div className="pb-[2.3px] leading-[11px]">
                                    <h3 className="text-base font-semibold text-[#0D1B2E]">
                                        Ibuprofen 200 mg
                                    </h3>

                                    <p className="mt-2 text-xs uppercase leading-[16px] tracking-[1px] text-[#7C8A9B]">
                                        Saved Search
                                    </p>
                                </div>

                                <div className="rounded-full border border-[#BFE5D8] bg-[#E8F6F1] p-2 text-xs font-medium text-[#0F7A5A] flex items-center justify-center gap-2">
                                    <img src="/saved-searches/tick.png" alt="lock" height={15} width={15} />
                                    <span className="font-bold">Strong signal</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 my-4 gap-y-5 border-y border-[#E2E8F0] px-3 py-4">
                                {details.map((item) => (
                                    <div key={item.label} className="pb-[1px]">
                                        <p className="text-xs uppercase text-[#98A2B3]">
                                            {item.label}
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-[#0D1B2E]">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2">
                                {actions.map((action) => (
                                    <button
                                        key={action.label}
                                        className={`rounded-xl min-h-[40px] cursor-pointer px-4 py-2 text-sm font-semibold transition ${action.primary
                                            ? "bg-[#13A594] text-white hover:bg-[#119485]"
                                            : "border border-[#CDD7E3] bg-white text-[#0D1B2E] hover:bg-gray-50"
                                            }`}
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <p className="mt-4 max-w-[440px] text-center text-[11px] leading-5 text-[#7C8A9B]">
                            Illustrative example. Saved searches are not prescriptions, reservations, or stock
                            guarantees.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}