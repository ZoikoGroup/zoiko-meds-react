"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";


const ACCENT = "#0FAA87";

const HERO_IMAGE_SRC = "/images/contact-hero.webp";

export default function ContactHeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative w-full bg-[#F4F6FA] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* ── Left column ── */}
          <div className="flex flex-col">

            {/* Breadcrumb */}
            <Reveal index={0} active={mounted}>
              <nav className="mb-5 flex items-center gap-1.5 text-[11.5px] text-[#8A96B0]">
                <Link href="/" className="hover:text-[#0F1F4E] transition-colors">Home</Link>
                <span>/</span>
                <Link href="#" className="hover:text-[#0F1F4E] transition-colors">Trust &amp; Legal</Link>
                <span>/</span>
                <span className="text-[#0F1F4E] font-medium">Contact</span>
              </nav>
            </Reveal>

            {/* Eyebrow */}
            <Reveal index={1} active={mounted}>
              <p className="mb-4 text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color: ACCENT }}>
                Contact ZoikoMeds
              </p>
            </Reveal>

            {/* Headline */}
            <Reveal index={2} active={mounted}>
              <h1 className="text-[2.3rem] font-extrabold leading-[1.1] tracking-tight sm:text-[2.7rem]">
                <span className="text-[#0F1F4E]">Contact the right </span>
                <span style={{ color: ACCENT }}>ZoikoMeds team.</span>
              </h1>
            </Reveal>

            {/* Body */}
            <Reveal index={3} active={mounted}>
              <p className="mt-5 text-[14.5px] leading-relaxed text-[#5B6478]">
                Choose the right contact path for medicine availability
                search, pharmacy participation, provider workflows,
                enterprise briefings, press inquiries, careers, privacy,
                security, and corporate questions.
              </p>
            </Reveal>

            {/* CTA buttons */}
            <Reveal index={4} active={mounted}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Choose Your Contact Path
                </Link>
                <Link
                  href="/searchmed"
                  className="inline-flex items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
                >
                  Search Medicines
                </Link>
              </div>
            </Reveal>

            {/* Arrow text link */}
            <Reveal index={5} active={mounted}>
              <Link
                href="/trust-center"
                className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium transition-opacity hover:opacity-80"
                style={{ color: ACCENT }}
              >
                View Trust Center
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>

            {/* Disclaimer */}
            <Reveal index={6} active={mounted}>
              <p className="mt-5 flex items-start gap-2 text-[12.5px] leading-relaxed text-[#5B6478]">
                <InfoIcon />
                <span>
                  ZoikoMeds does not provide medical advice, emergency
                  support, prescription validation, dispensing decisions, or
                  stock guarantees through contact forms.
                </span>
              </p>
            </Reveal>
          </div>

          {/* ── Right column: hero image ── */}
          <Reveal index={3} active={mounted}>
            <div className="relative overflow-hidden rounded-2xl shadow-[0_16px_48px_-16px_rgba(15,31,78,0.18)]">
              <Image
                src={HERO_IMAGE_SRC}
                alt="Shopping cart filled with medicine packaging, bottles, and supplies"
                width={680}
                height={480}
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
    <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `contactHeroFadeUp 0.6s ease-out ${index * 80}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes contactHeroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}