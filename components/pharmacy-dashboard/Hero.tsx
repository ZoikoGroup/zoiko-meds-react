"use client"

export default function Hero() {
    return (
        <section className="bg-[#F4F7FB] px-4 py-8 lg:py-24">
            <div className="mx-auto max-w-6xl">
                <div className="grid items-center gap-6 lg:grid-cols-2">
                    {/* Left Content */}
                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
                            ZoikoMeds Pharmacy Dashboard
                        </p>

                        <h1 className="text-4xl font-semibold leading-[45px] text-[#0D1B2E] md:text-[40px]">
                            A Secure Dashboard for
                            Pharmacy Participation and {" "}
                            <span className="text-[#0FAA87]">Medicine Availability Visibility</span>
                        </h1>

                        <p className="mt-6 text-[17px] leading-[26px] text-[#566476]">
                            Manage availability signals, verification tasks, patient access inquiries,
                            network reporting and pharmacy participation workflows from one secure
                            ZoikoMeds dashboard — designed for responsible visibility without
                            unauthorized public exposure of exact stock quantities.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button className="rounded-xl bg-[#13A594] border border-[#13A594] px-6 cursor-pointer py-3 font-semibold text-white transition hover:bg-[#119485]">
                                Join Pharmacy Network
                            </button>

                            <button className="rounded-xl border border-[#D0D5DD] bg-white px-6 cursor-pointer py-3 font-semibold text-[#0D1B2E] transition hover:bg-gray-50">
                                Request a Dashboard Demo
                            </button>
                        </div>

                        <div className="mt-6 flex items-start gap-2 text-sm text-[#98A2B3]">
                            <img src="/pharmacy-dashboard/view.png" alt="view" height={18} width={18} />
                            <p className=" max-w-[440px] text-[14px] leading-[19px] text-[#7C8A9B]">
                                ZoikoMeds does not prescribe, dispense or provide medical
                                advice. Exact inventory quantities are not publicly exposed to
                                unauthorized users.
                            </p>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="flex flex-col items-center">
                        <img src="/pharmacy-dashboard/hero.png" alt="hero" className="shadow-[0_4px_10px_#00000040]" />
                    </div>

                </div>
            </div>
        </section>
    );
}