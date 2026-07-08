"use client"

export default function Hero() {
    return (
        <section className="bg-[#F4F7FB] px-4 py-8 lg:py-24">
            <div className="mx-auto max-w-6xl">
                <div className="grid items-center gap-6 lg:grid-cols-2">
                    {/* Left Content */}
                    <div>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[#13A594]">
                            Enterprise API Access
                        </p>

                        <h1 className="text-4xl font-semibold leading-[45px] text-[#0D1B2E] md:text-[40px]">
                            Secure Healthcare APIs for
                            {" "}
                            <span className="text-[#0FAA87]">Medicine Availability
                                Intelligence.</span>
                        </h1>

                        <p className="mt-6 text-[17px] leading-[26px] text-[#566476]">
                            Connect approved healthcare, pharmacy, distribution, and enterprise
                            systems to ZoikoMeds medicine availability signals, pharmacy network
                            intelligence, shortage indicators, and compliance-conscious reporting
                            through governed API access.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button className="rounded-xl bg-[#13A594] border border-[#13A594] px-6 cursor-pointer py-3 font-semibold text-white transition hover:bg-[#119485]">
                                Request API Access Briefing
                            </button>

                            <button className="rounded-xl border border-[#D0D5DD] bg-white px-6 cursor-pointer py-3 font-semibold text-[#0D1B2E] transition hover:bg-gray-50">
                                Talk to Integration Team
                            </button>
                        </div>

                        <div className="mt-6 flex items-start gap-2 text-sm text-[#98A2B3]">
                            <img src="/api-access/view.png" alt="view" height={18} width={18} />
                            <p className=" max-w-[440px] text-[14px] leading-[19px] text-[#7C8A9B]">
                                API Access is available to approved organizations only.
                                ZoikoMeds does not provide medical advice, prescribe, sell,
                                dispense, or deliver medicine.
                            </p>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="flex flex-col items-center">
                        <img src="/api-access/hero.png" alt="hero" />
                    </div>

                </div>
            </div>
        </section>
    );
}