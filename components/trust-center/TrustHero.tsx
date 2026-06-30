export default function TrustHero() {
    return (
        <section className="bg-[linear-gradient(180deg,_#F6F9FC_0%,_#EEF2F7_100%),radial-gradient(circle,_#13A5940F_0%,_#13A59400_100%)] px-6 md:px-54 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-25 items-center max-w-6xl mx-auto">
                <div>
                    <div className="text-xs flex flex-wrap gap-2 md:gap-3 leading-4 tracking-[0.45px] text-[#566476]">
                        <span>Home</span>
                        <span className="text-[#CDD7E3]">/</span>
                        <span>Legal</span>
                        <span>&</span>
                        <span>Trust</span>
                        <span className="text-[#CDD7E3]">/</span>
                        <span className="text-[#7C8A9B]">Trust Center</span>
                    </div>

                    <p className="text-xs mt-4 font-medium tracking-[2px] text-[#13A594] mb-2">
                        TRUST CENTER
                    </p>

                    <h1 className="text-3xl sm:text-4xl max-w-full md:max-w-125 font-bold text-slate-900 leading-tight">
                        Trust infrastructure for{" "}
                        <span className="text-[#0FAA87]">medicine availability.</span>
                    </h1>

                    <p className="text-[#566476] max-w-full md:max-w-135 mt-4 leading-relaxed">
                        ZoikoMeds protects medicine availability search through verified
                        pharmacy participation, confidence-based signals,
                        privacy-conscious account design, exact-stock suppression,
                        enterprise governance, and clear medical and legal boundaries.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 mt-6">
                        <button className="bg-[#13A594] cursor-pointer border border-[#13A594] hover:bg-[#13A594]/90 text-white text-sm font-medium rounded-md px-5 py-2.5">
                            Request Trust Pack
                        </button>

                        <button className="bg-white border cursor-pointer border-[#CDD7E3] text-[#0D1B2E] hover:bg-white/10 text-sm font-medium rounded-md px-5 py-2.5">
                            View Privacy Center
                        </button>
                    </div>

                    <a
                        href="#"
                        className="mt-4 inline-block text-sm font-medium text-[#13A594] hover:underline"
                    >
                        View Zoiko Healthcare →
                    </a>

                    <p className="mt-4 flex max-w-full md:max-w-[450px] items-start gap-2 text-sm leading-6 text-[#566476]">
                        <img
                            src="/trust-center/view.png"
                            alt="image"
                            height={15}
                            width={15}
                            className="mt-1 shrink-0"
                        />
                        <span>
                            ZoikoMeds is not a pharmacy and does not prescribe,
                            dispense, sell, deliver, reserve, recommend, allocate,
                            or guarantee medicines.
                        </span>
                    </p>
                </div>

                <div className="flex justify-center">
                    <img
                        src="/trust-center/hero.png"
                        alt="hero"
                        className="w-full max-w-xs sm:max-w-sm md:w-[440px]"
                    />
                </div>
            </div>
        </section>
    );
}