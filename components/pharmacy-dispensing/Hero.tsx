"use client"

import { useRouter } from "next/navigation";

export default function Hero() {
    const router = useRouter();
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
                            Streamline Pharmacy
                            Dispensing Workflows With{" "}
                            <span className="text-[#0FAA87]">Confidence, Control, and
                                Auditability</span>
                        </h1>

                        <p className="mt-6 text-[17px] leading-[26px] text-[#566476]">
                            ZoikoMeds helps authorized pharmacy teams manage prescription
                            workflow visibility, medicine readiness, exception routing, patient
                            communication, and compliance-conscious handoffs from one secure
                            pharmacy workspace.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button onClick={()=>router.push("#request-demo")} 
                            className="rounded-xl bg-[#13A594] border border-[#13A594] px-6 cursor-pointer py-3 font-semibold text-white transition hover:bg-[#119485]">
                                Request a Pharmacy Demo
                            </button>

                            <button 
                            className="rounded-xl border border-[#D0D5DD] bg-white px-6 cursor-pointer py-3 font-semibold text-[#0D1B2E] transition hover:bg-gray-50">
                                Sign In to Pharmacy Portal
                            </button>
                        </div>

                        <div className="mt-6 flex items-start gap-2 text-sm text-[#98A2B3]">
                            <img src="/pharmacy-dispensing/view.png" alt="view" height={18} width={18} />
                            <p className=" max-w-[440px] text-[14px] leading-[19px] text-[#7C8A9B]">
                                ZoikoMeds supports pharmacy workflows. ZoikoMeds does not
                                prescribe, dispense, sell, fulfill, or deliver medicine.
                            </p>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="flex flex-col items-center">
                        <img src="/pharmacy-dispensing/hero.png" alt="hero" />
                    </div>

                </div>
            </div>
        </section>
    );
}