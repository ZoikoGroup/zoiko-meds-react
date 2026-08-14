"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * AvailabilitySignalsHeroSection
 * First section of the Availability Signals page.
 *
 * Layout: two-column (left: copy + CTAs, right: hero image)
 * Background: light grey-white (#F4F6FA)
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";

export default function AvailabilitySignalsHeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative w-full bg-[#F4F6FA] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Left column ── */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <Reveal index={0} active={mounted}>
              <p
                className="mb-4 text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: ACCENT }}
              >
                Medication Availability Signals
              </p>
            </Reveal>

            {/* Headline */}
            <Reveal index={1} active={mounted}>
              <h1 className="text-[2.2rem] font-extrabold leading-[1.13] tracking-tight text-[#0F1F4E] sm:text-[2.6rem]">
                Help patients understand what{" "}
                <span style={{ color: ACCENT }}>
                  availability signals mean.
                </span>
              </h1>
            </Reveal>

            {/* Body */}
            <Reveal index={2} active={mounted}>
              <p className="mt-5 text-[14.5px] leading-relaxed text-[#5B6478]">
                ZoikoMeds gives providers and care teams plain-language medicine
                availability signals that help explain where pharmacy
                confirmation may be needed — without showing exact public stock
                counts or replacing clinical judgment.
              </p>
            </Reveal>

            {/* CTA buttons */}
            <Reveal index={3} active={mounted}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="#request"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Request Signal Workflow Briefing
                </Link>
                <Link
                  href="/patient-support"
                  className="inline-flex items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
                >
                  View Patient Support Workflows
                </Link>
              </div>
            </Reveal>

            {/* Text link */}
            <Reveal index={4} active={mounted}>
              <Link
                href="/searchmed"
                className="mt-4 inline-block text-[13px] font-medium transition-opacity hover:opacity-80"
                style={{ color: ACCENT }}
              >
                Search Medicines
              </Link>
            </Reveal>

            {/* Disclaimer */}
            <Reveal index={5} active={mounted}>
              <p className="mt-5 flex items-start gap-2 text-[12.5px] leading-relaxed text-[#5B6478]">
                <InfoIcon />
                <span>
                  Availability signals are informational. They do not guarantee
                  stock, validate prescriptions, approve dispensing, recommend
                  substitutions, or provide medical advice.
                </span>
              </p>
            </Reveal>
          </div>

          {/* ── Right column: Hero Image ── */}
          <div className="flex justify-center lg:justify-end">
            <Reveal index={2} active={mounted}>
              {mounted ? (
                <img
                  src="/avail-signal/hero.png"
                  alt="Medication Availability Signals Interface Preview"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              ) : (
                <div className="h-80 w-full animate-pulse rounded-2xl bg-[#E4E8F0]" />
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Info icon                                                         */
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
      <path
        d="M8 7v4M8 5.2v.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                            */
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
          ? `avSigHeroFadeUp 0.6s ease-out ${index * 90}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes avSigHeroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
