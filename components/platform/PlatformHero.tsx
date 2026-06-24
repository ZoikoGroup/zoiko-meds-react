"use client";
import { useState } from "react";
import Image from 'next/image';
const platformLayers = [
    {
        id: "experience",
        label: "Experience & Availability"
    },
    {
        id: "intelligence",
        label: "Intelligence Engine (ZoikoSignal™)",
    },
    {
        id: "data",
        label: "Data Substrate (MediBase™)",
    },
    {
        id: "governance",
        label: "Governance Plane",
        dark: true,
    }
];

export default function PlatformHero() {
    const [activeLayer, setActiveLayer] = useState("intelligence");

    const active = platformLayers.find((l) => l.id === activeLayer);

    return (
        <section className="relative overflow-hidden bg-[#F9F9FF] h-full flex items-center py-20 font-sans">

            {/* Background decorative circles */}
            <div
                aria-hidden="true"
                className="absolute -top-36 -right-40 w-[640px] h-[640px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(29,158,117,0.10) 0%, transparent 68%)" }}
            />
            <div
                aria-hidden="true"
                className="absolute -bottom-44 -left-24 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(29,158,117,0.06) 0%, transparent 70%)" }}
            />

            {/* Main grid */}
            <div className="relative max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">

                {/* ── Left column ── */}
                <div className="flex flex-col">

                    <p className="text-[13px] font-JetBrains Mono tracking-[.06em] uppercase text-[#005C55] mb-4">
                        The ZoikoMeds Platform
                    </p>

                    <h1 className="text-4xl lg:text-4xl font-extrabold leading-tight tracking-tight text-[#081A13] mb-5">
                        The infrastructure layer{" "}
                        <span className="block">for <span className="text-[#0FAA87]">medicine availability.</span></span>
                    </h1>

                    <p className="text-base lg:text-[17px] leading-relaxed text-[#3A5248] mb-8 max-w-[470px]">
                        ZoikoMeds connects verified pharmacies, confidence-based availability
                        signals, and governed intelligence to eliminate medicine supply chain
                        opaque spots.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3 mb-10">
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 bg-[#005C55] hover:bg-[#0a5241] text-white font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors duration-150 whitespace-nowrap"
                        >
                            Check Medicine Availability
                            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center border border-[#6E7977] text-[#131B2E] hover:bg-[#0F6E56]/5 font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors duration-150 whitespace-nowrap"
                        >
                            Request a Briefing
                        </a>
                    </div>

                </div>

                {/* ── Right column — Platform card ── */}
                <div>
                    <div className="w-full">
                        <Image src='/platform/hero.png' alt="hero" width={560} height={420} />           
                    </div>
                </div>

            </div>
        </section >
    );
}