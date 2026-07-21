"use client"
import { useRouter } from "next/navigation";
import React from "react";

type StructureItem = {
    name: string;
    desc: string;
    tag: string;
    highlighted?: boolean;
};

const structure: StructureItem[] = [
    { name: "Zoiko Group Inc.", desc: "Group direction & governance", tag: "PARENT" },
    { name: "Zoiko Healthcare Inc.", desc: "Healthcare operating company", tag: "OPERATING" },
    { name: "ZoikoMeds", desc: "Medicine availability infrastructure", tag: "PLATFORM", highlighted: true },
    { name: "Zoiko Tech Inc.", desc: "Technology enablement (where assigned)", tag: "SUPPORT" },
];

const fadeUp = (delay: number): React.CSSProperties => ({
    animation: `fadeUp 0.6s ease-out ${delay}s both`,
});

export default function ZoikoGroupHero() {
    const router = useRouter();
    return (
        <section className="bg-linear-to-b from-slate-50 px-5 sm:px-8 lg:px-54 to-slate-100 py-16">
            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:gap-30 lg:grid-cols-2 lg:items-start">
                {/* Left column */}
                <div>
                    <div style={fadeUp(0)} className="text-xs flex gap-3 leading-4 tracking-[0.45px] text-[#566476]">
                        <span>Home</span>
                        <span className="text-[#CDD7E3]">/</span>
                        <span>Trust</span>
                        <span>&</span>
                        <span>Legal</span>
                        <span className="text-[#CDD7E3]">/</span>
                        <span className="text-[#7C8A9B]">Zoiko Group</span>
                    </div>

                    <p style={fadeUp(0.05)} className="mt-5 text-xs font-semibold tracking-widest text-[#13A594]">
                        ZOIKO GROUP
                    </p>

                    <h1 style={fadeUp(0.1)} className="mt-3 text-3xl leading-tight font-bold tracking-[-0.8px] text-[#0D1B2E] md:text-[40px] lg:min-w-[550px] lg:leading-12">
                        The group behind ZoikoMeds and governed{" "}
                        <span className="text-[#0FAA87]">healthcare infrastructure.</span>
                    </h1>

                    <p style={fadeUp(0.2)} className="mt-4 text-[#566476] lg:min-w-[580px]">
                        Zoiko Group supports ZoikoMeds and Zoiko Healthcare Inc with strategic direction,
                        governance standards, and ecosystem infrastructure for trusted medicine availability access.
                    </p>

                    <div style={fadeUp(0.3)} className="mt-8 flex flex-col sm:flex-row gap-4 lg:min-w-[580px]">
                        <button onClick={()=>router.push("#")}
                         className="rounded-xl bg-[#13A594] px-6 py-3 font-semibold border cursor-pointer border-[#13A594] text-white transition hover:bg-teal-700">
                            Request Institutional Briefing
                        </button>
                        <button
                        onClick={()=>router.push("/home")}
                         className="rounded-xl border border-[#CDD7E3] bg-white px-6 py-3 cursor-pointer font-semibold text-[#0D1B2E] transition hover:bg-slate-50">
                            Explore ZoikoMeds
                        </button>
                    </div>

                    <a
                        style={fadeUp(0.4)}
                        href="/health-systems"
                        className="mt-4 inline-block text-sm font-medium text-[#13A594] hover:underline"
                    >
                        View Zoiko Healthcare →
                    </a>

                    <p style={fadeUp(0.5)} className="mt-4 flex max-w-[450px] items-start gap-2 text-sm leading-6 text-[#566476]">
                        <img src="/zoiko-group/view.png" alt="image" height={15} width={15} />
                        <span>
                            ZoikoMeds is a governed platform operated by Zoiko Healthcare
                            Inc, a subsidiary of Zoiko Group Inc. ZoikoMeds is not a pharmacy
                            and does not prescribe, dispense, sell, deliver, reserve,
                            recommend, or guarantee medicines.
                        </span>
                    </p>
                </div>

                {/* Right column - Corporate structure card */}
                <div>
                    <img src="/zoiko-group/hero.png" alt="hero" height={440} width={440} className="mt-10" />
                </div>
            </div>
        </section>
    );
}