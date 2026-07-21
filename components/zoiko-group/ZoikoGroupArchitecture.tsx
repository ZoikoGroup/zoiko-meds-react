"use client"
import { useRouter } from "next/navigation";
import React from "react";

type Row = {
    tag: string;
    tagColor: string;
    tagdesc: string;
    name: string;
    desc: string;
    cta: string;
    link:string;
};

const rows: Row[] = [
    {
        tag: "PARENT Group",
        tagColor: "bg-[#13A5941A] text-[#0F8B7D]",
        tagdesc: "Strategic parent organization",
        name: "Zoiko Group Inc.",
        desc: "Provides group-level direction, governance expectations, brand stewardship, and ecosystem support.",
        cta: "Contact Zoiko Group",
        link:"#contact"
    },
    {
        tag: "OPERATING COMPANY",
        tagColor: "bg-[#13A5941A] text-[#0F8B7D]",
        tagdesc: "Healthcare operating company",
        name: "Zoiko Healthcare Inc.",
        desc: "The healthcare-focused entity operating ZoikoMeds and responsible for the governed medicine availability platform context.",
        cta: "View Zoiko Healthcare",
        link:"/zoiko-healthcare"
    },
    {
        tag: "PLATFORM",
        tagColor: "bg-[#13A5941A] text-[#0F8B7D]",
        tagdesc: "Medicine availability platform",
        name: "ZoikoMeds",
        desc: "Global medicine availability infrastructure for search, verified pharmacy signals, availability confidence, and enterprise intelligence.",
        cta: "Explore ZoikoMeds",
        link:"/home"
    },
    {
        tag: "TECHNOLOGY",
        tagColor: "bg-[#13A5941A] text-[#0F8B7D]",
        tagdesc: "Technology enablement, where applicable",
        name: "Zoiko Tech Inc.",
        desc: "Supports engineering, infrastructure, data, AI, and platform capabilities where contractually and operationally assigned.",
        cta: "Request Technical Briefing",
        link:"#"
    },
];

const fadeUp = (delay: number): React.CSSProperties => ({
    animation: `fadeUp 0.6s ease-out ${delay}s both`,
});

export default function ZoikoGroupArchitecture() {
    const router = useRouter();
    return (
        <section className="bg-[#EEF2F7] px-6 py-16 md:px-16">
            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <div className="mx-auto max-w-5xl">
                <p style={fadeUp(0)} className="text-xs font-medium uppercase leading-6 tracking-[1.71px] text-[#13A594]">
                    01 · CORPORATE ARCHITECTURE
                </p>
                <h2 style={fadeUp(0.05)} className="mt-3 text-2xl font-bold text-slate-900 md:text-3xl">
                    How ZoikoMeds fits within <span className="text-[#0FAA87]">Zoiko Group.</span>
                </h2>
                <p style={fadeUp(0.1)} className="mt-3 text-sm text-[#566476] md:max-w-145 leading-6">
                    Parent company, operating company, platform, and technology support — kept as distinct roles.
                </p>

                <div style={fadeUp(0.15)} className="mt-2 py-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {rows.map((row, i) => (
                        <div
                            key={row.name}
                            style={fadeUp(0.2 + i * 0.1)}
                            className="flex flex-col gap-4 border-b border-slate-100 px-6 py-6 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className={`rounded-md px-2 py-1 text-[10px] tracking-[0.80px] leading-4 ${row.tagColor}`}>
                                        {row.tag}
                                    </span>
                                    <div className="flec flex-col">
                                        <p className="font-semibold text-slate-900">{row.name}</p>
                                        <p className="text-xs text-[#7C8A9B]">{row.tagdesc}</p>
                                    </div>
                                </div>
                                <p className="mt-4 max-w-175 text-[14.4px] text-[#2B3A4F]">{row.desc}</p>
                            </div>
                            <button onClick={()=>router.push(row.link)}
                            className="shrink-0 cursor-pointer self-start rounded-lg border border-[#CDD7E3] bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 sm:self-center">
                                {row.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
