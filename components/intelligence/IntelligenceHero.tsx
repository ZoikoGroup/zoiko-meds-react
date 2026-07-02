"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";



const ACCENT = "#0FAA87";
const HERO_IMAGE_SRC = "/images/intelligencehero.webp";

export default function IntelligenceHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative w-full bg-[#F4F6FA] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* ── Left column ── */}
          <div className="flex flex-col">

            {/* Eyebrow */}
            <Reveal index={0} active={mounted}>
              <p className="mb-5 text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: ACCENT }}>
                ZoikoMeds Intelligence
              </p>
            </Reveal>

            {/* Headline — 3 lines: black / black / teal / teal / teal */}
            <Reveal index={1} active={mounted}>
              <h1 className="text-[2.55rem] font-extrabold leading-[1.1] tracking-tight sm:text-[3rem]">
                <span className="text-[#0F1F4E]">Medicine Availability</span>
                <br />
                <span className="text-[#0F1F4E]">Intelligence for a More</span>
                <br />
                <span style={{ color: ACCENT }}>Responsive Healthcare</span>
                <br />
                <span style={{ color: ACCENT }}>Network</span>
              </h1>
            </Reveal>

            {/* Body */}
            <Reveal index={2} active={mounted}>
              <p className="mt-6 max-w-lg text-[14.5px] leading-relaxed text-[#5B6478]">
                Turn medicine availability signals into actionable
                intelligence. ZoikoMeds helps healthcare organizations,
                pharmacy networks, wholesalers, distributors, and
                public-health stakeholders understand where medicines may be
                available, where access gaps are emerging, and where
                operational attention may be needed.
              </p>
            </Reveal>

            {/* CTA buttons */}
            <Reveal index={3} active={mounted}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Request a Briefing
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
                >
                  Explore Intelligence Modules
                </Link>
              </div>
            </Reveal>

            {/* Disclaimer */}
            <Reveal index={4} active={mounted}>
              <p className="mt-5 flex items-start gap-2 text-[12.5px] leading-relaxed text-[#5B6478]">
                <InfoIcon />
                <span>
                  Built for healthcare access visibility, pharmacy network
                  coordination, shortage awareness, and
                  compliance-conscious decision-making. ZoikoMeds does not
                  sell, prescribe, dispense, or deliver medicine.
                </span>
              </p>
            </Reveal>
          </div>

          {/* ── Right column: hero image ── */}
          <Reveal index={2} active={mounted}>
            <div className="relative overflow-hidden rounded-2xl shadow-[0_16px_48px_-16px_rgba(15,31,78,0.18)]">
              <Image
                src={HERO_IMAGE_SRC}
                alt="Vitamin D medicine bottle and yellow capsule pill on warm amber background"
                width={680}
                height={520}
                className="h-full w-full object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Info icon                                                            */
/* ------------------------------------------------------------------ */
function InfoIcon() {
  return (
    <svg
      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
      style={{ color: ACCENT }}
      viewBox="0 0 16 16"
      fill="none"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  index,
  active,
}: {
  children: React.ReactNode;
  index: number;
  active: boolean;
}) {
  return (
    <div
      style={{
        opacity: active ? undefined : 0,
        animation: active
          ? `intHeroFadeUp 0.6s ease-out ${index * 90}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes intHeroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}