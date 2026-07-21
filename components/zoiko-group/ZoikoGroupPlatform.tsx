"use client"

import { useRouter } from "next/navigation";
import React from "react";

type Item = {
    src: string;
    title: string;
    desc: string;
};

const items: Item[] = [
    {
        src: "/zoiko-group/parents.png",
        title: "Corporate parent role",
        desc: "Zoiko Group provides group-level strategy, oversight and ecosystem support, overseeing responsibilities sit with the corresponding operated entity.",
    },
    {
        src: "/zoiko-group/meds.png",
        title: "ZoikoMeds role",
        desc: "ZoikoMeds provides medicine availability information and intelligence through governed availability signals.",
    },
    {
        src: "/zoiko-group/none.png",
        title: "Not a pharmacy",
        desc: "ZoikoMeds and Zoiko Group do not prescribe, dispense, sell, deliver, reserve, recommend, allocate, or guarantee medicines.",
    },
    {
        src: "/zoiko-group/call.png",
        title: "Pharmacy confirmation",
        desc: "Availability information must be confirmed directly with the pharmacy before travel or action.",
    },
];

const fadeUp = (delay: number): React.CSSProperties => ({
    animation: `fadeUp 0.6s ease-out ${delay}s both`,
});

export default function ZoikoGroupPlatform() {
    const router = useRouter();
    return (
        <section className="bg-slate-100 px-6 py-16 md:px-16">
            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <div className="mx-auto max-w-5xl">
                <p
                    style={fadeUp(0)}
                    className="text-xs font-semibold tracking-[2px] text-[#13A594]"
                >
                    05 · TRUST BOUNDARIES &amp; CLARITY
                </p>

                <h2
                    style={fadeUp(0.05)}
                    className="mt-2 max-w-full lg:w-[520px] text-2xl font-bold leading-tight text-slate-900 md:text-3xl lg:leading-11"
                >
                    Corporate clarity with{" "}
                    <span className="text-[#0FAA87]">platform boundaries.</span>
                </h2>

                <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
                    {items.map((item, i) => (
                        <div
                            key={item.title}
                            style={fadeUp(0.15 + i * 0.08)}
                            className="flex items-start gap-4 rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                        >
                            {/* Icon */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#13A5941A]">
                                <img
                                    src={item.src}
                                    alt={item.title}
                                    className="h-5 w-5 object-contain"
                                />
                            </div>

                            {/* Content */}
                            <div className="min-w-0 flex-1">
                                <p className="text-[16px] font-semibold text-[#0D1B2E]">
                                    {item.title}
                                </p>

                                <p className="mt-2 text-[13.5px] leading-6 text-[#566476]">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    style={fadeUp(0.55)}
                    className="mt-4 rounded-[16px] border border-[#FFFFFF1A] bg-[linear-gradient(180deg,#102540_0%,#0C1B30_100%)] pt-17 px-7 pb-12 text-center"
                >
                    <h3 className="text-2xl font-bold text-white">
                        Understand the group behind ZoikoMeds.
                    </h3>
                    <p className="mx-auto mt-3 max-w-102 leading-6 text-sm text-[#E7EEF6B2]">
                        Learn how Zoiko Group supports governed healthcare infrastructure, enterprise trust, and the
                        availability platform operated by Zoiko Healthcare Inc.
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-4">
                        <button onClick={()=>router.push("#")}
                         className="cursor-pointer rounded-lg bg-[#13A594] border border-[#13A594] px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-600">
                            Request Institutional Briefing
                        </button>
                        <button onClick={()=>router.push("/home")}
                         className="cursor-pointer rounded-lg border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                            Explore ZoikoMeds
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
