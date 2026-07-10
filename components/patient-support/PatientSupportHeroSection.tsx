"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * PatientSupportHeroSection
 * First section of the Patient Support page.
 *
 * Layout: two-column (left: copy + CTAs, right: pharmacy shelf image)
 * Background: light grey-white (#F4F6FA)
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";

export default function PatientSupportHeroSection() {
  const [mounted, setMounted] = useState(false);
  // Hero is always in view — mount immediately after hydration
  useEffect(() => { setMounted(true); }, []);

  return (
    <section className="relative w-full bg-[#F4F6FA] py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">

          {/* ── Left column ── */}
          <div className="flex flex-col">

            {/* Eyebrow */}
            <Reveal index={0} active={mounted}>
              <p
                className="mb-4 text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: ACCENT }}
              >
                Patient Support Workflows
              </p>
            </Reveal>

            {/* Headline */}
            <Reveal index={1} active={mounted}>
              <h1 className="text-[2.2rem] font-extrabold leading-[1.13] tracking-tight text-[#0F1F4E] sm:text-[2.6rem]">
                Help patients take the next step when{" "}
                <span style={{ color: ACCENT }}>
                  medicine availability is unclear.
                </span>
              </h1>
            </Reveal>

            {/* Body */}
            <Reveal index={2} active={mounted}>
              <p className="mt-5 text-[14.5px] leading-relaxed text-[#5B6478]">
                ZoikoMeds helps care teams guide patients through medicine
                availability checks, pharmacy confirmation, saved searches,
                and alerts — without replacing clinical judgment,
                prescriptions, pharmacists, or pharmacy confirmation.
              </p>
            </Reveal>

            {/* CTA buttons */}
            <Reveal index={3} active={mounted}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="#request"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Request Workflow Briefing
                </Link>
                <Link
                  href="/searchmed"
                  className="inline-flex items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
                >
                  Search Medicines
                </Link>
              </div>
            </Reveal>

            {/* Text link */}
            <Reveal index={4} active={mounted}>
              <Link
                href="#"
                className="mt-4 inline-block text-[13px] font-medium transition-opacity hover:opacity-80"
                style={{ color: ACCENT }}
              >
                View Availability Signal Guide
              </Link>
            </Reveal>

            {/* Disclaimer */}
            <Reveal index={5} active={mounted}>
              <p className="mt-5 flex items-start gap-2 text-[12.5px] leading-relaxed text-[#5B6478]">
                <InfoIcon />
                <span>
                  ZoikoMeds supports access conversations. It does not
                  prescribe, dispense, recommend substitutions, validate
                  prescriptions, or guarantee stock.
                </span>
              </p>
            </Reveal>
          </div>

          {/* ── Right column: pharmacy shelf image ── */}
          <Reveal index={2} active={mounted}>
            <div className="relative overflow-hidden rounded-2xl shadow-[0_16px_48px_-16px_rgba(15,31,78,0.18)]">
              <Image
                src="/images/pharmacy-shelves.webp"
                alt="Well-stocked pharmacy shelves with medicines"
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
          ? `patientHeroFadeUp 0.6s ease-out ${index * 90}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes patientHeroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}