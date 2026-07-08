"use client"

export default function Hero() {
    return (
        <section className="bg-[#EEF2F7] px-4 py-8 lg:py-24">
            <div className="mx-auto max-w-6xl">
                <div className="grid items-center gap-6 lg:grid-cols-2">
                    {/* Left Content */}
                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
                            ZoikoMeds for Pharmacies
                        </p>

                        <h1 className="text-3xl font-semibold leading-[45px] text-[#0D1B2E] md:text-[40px]">
                            Pharmacy Inventory Visibility
                            Without Unsafe {" "}
                            <span className="text-[#0FAA87]">Public Stock
                                Exposure</span>
                        </h1>

                        <p className="mt-6 text-[16px] leading-[26px] text-[#566476]">
                            Help patients and healthcare stakeholders understand medicine
                            availability direction while your pharmacy keeps control over inventory
                            signals, permissions, and operational workflows. ZoikoMeds Inventory
                            supports pharmacy-owned availability updates, stock-risk alerts, demand
                            insights, and verified network participation.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button className="rounded-xl bg-[#13A594] border border-[#13A594] px-6 cursor-pointer py-3 font-semibold text-white transition hover:bg-[#119485]">
                                Join Pharmacy Network
                            </button>

                            <button className="rounded-xl border border-[#D0D5DD] bg-white px-6 cursor-pointer py-3 font-semibold text-[#0D1B2E] transition hover:bg-gray-50">
                                Request Inventory Briefing
                            </button>
                        </div>

                        <div className="mt-6 flex items-start gap-2 text-sm text-[#98A2B3]">
                            <img src="/pharmacy-inventory/view.png" alt="view" height={18} width={18} />
                            <p className=" max-w-[430px] text-[14px] leading-[19px] text-[#7C8A9B]">
                                ZoikoMeds does not publicly expose exact inventory quantities to
                                unauthorized users. Availability signals are controlled,
                                confidence-based, and pharmacy-governed.
                            </p>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="flex flex-col items-center">
                        <img src="/pharmacy-inventory/hero.png" alt="hero" />
                    </div>

                </div>
            </div>
        </section>
    );
}