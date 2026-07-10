"use client"
import { useRouter } from "next/navigation";
import React from "react";

type Card = {
    src:string;
    title: string;
    desc: string;
    cta: string;
    link:string;
};

const cards: Card[] = [
    {
        src:"/zoiko-group/users.png",
        title: "ZoikoMeds users",
        desc: "Follow up and caregivers checking medicine availability.",
        cta: "Search Medicines",
        link:"/searchmed"
    },
    {
        src:"/zoiko-group/operators.png",
        title: "Healthcare operators",
        desc: "Zoiko Healthcare context, platform governance, and the healthcare operating model.",
        cta: "View Zoiko Healthcare",
        link:"/zoiko-healthcare"
    },
    {
        src:"/zoiko-group/home.png",
        title: "Enterprise & institutional buyers",
        desc: "Health systems, governments, public health, life sciences, payers, digital health, and partners.",
        cta: "Request Institutional Briefing",
        link:"#"
    },
    {
        src:"/zoiko-group/network.png",
        title: "Pharmacies & network participants",
        desc: "Pharmacy owners, PBOs, branch teams, groups, and integration teams.",
        cta: "Join the Verified Network",
        link:"/join-the-network"
    },
    {
        src:"/zoiko-group/press.png",
        title: "Press & media",
        desc: "Journalists, analysts, and public communication stakeholders.",
        cta: "Press Inquiries",
        link:"/press"
    },
    {
        src:"/zoiko-group/career.png",
        title: "Careers",
        desc: "Candidates and future team members.",
        cta: "View Careers",
        link:"/careers"
    },
];

const fadeUp = (delay: number): React.CSSProperties => ({
    animation: `fadeUp 0.6s ease-out ${delay}s both`,
});

export default function ZoikoGroupStakeholders() {
    const router = useRouter();
    return (
        <section className="bg-slate-50 px-6 py-16 md:px-16">
            <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <div className="mx-auto max-w-5xl">
                <p style={fadeUp(0)} className="text-xs font-semibold tracking-[2px] text-[#13A594]">
                    04 · STAKEHOLDER PATHWAYS
                </p>
                <h2 style={fadeUp(0.05)} className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
                    Find the right <span className="text-[#0FAA87]">Zoiko Group pathway.</span>
                </h2>
                <p style={fadeUp(0.1)} className="mt-4 text-sm text-[#566476]">
                    Every route names its destination — no generic "learn more."
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {cards.map((card, i) => (
                        <div
                            key={card.title}
                            style={fadeUp(0.15 + i * 0.08)}
                            className="flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-sm"
                        >
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0C1B30] text-sm text-white">
                               <img src={card.src} alt="image" />
                            </div>
                            <p className="mt-4 font-semibold text-[#0D1B2E]">{card.title}</p>
                            <p className="mt-2 flex-1 text-sm text-[#566476]">{card.desc}</p>
                            <button onClick={()=>router.push(card.link)}
                             className="mt-5 rounded-lg cursor-pointer border border-[#CDD7E3] bg-white px-4 py-2 text-sm font-semibold text-[#0D1B2E] transition hover:bg-slate-50">
                                {card.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
