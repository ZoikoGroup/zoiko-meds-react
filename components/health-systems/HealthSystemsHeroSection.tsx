"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * HealthSystemsHeroSection
 * First section of the Health Systems page.
 *
 * Left:  breadcrumb + eyebrow + headline + body + CTAs + link + disclaimer
 * Right: Hero image replacing mock console card
 *
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";

export default function HealthSystemsHeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative w-full bg-[#F4F6FA] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ── Left column ── */}
          <div className="flex flex-col">
            {/* Breadcrumb */}
            <Reveal index={0} active={mounted}>
              <nav className="mb-5 flex items-center gap-1.5 text-[11.5px] text-[#8A96B0]">
                <Link
                  href="/"
                  className="hover:text-[#0F1F4E] transition-colors"
                >
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="#"
                  className="hover:text-[#0F1F4E] transition-colors"
                >
                  Enterprise &amp; Intelligence
                </Link>
                <span>/</span>
                <span className="text-[#0F1F4E] font-medium">
                  Health systems
                </span>
              </nav>
            </Reveal>

            {/* Eyebrow */}
            <Reveal index={1} active={mounted}>
              <p
                className="mb-4 text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: ACCENT }}
              >
                For Health Systems
              </p>
            </Reveal>

            {/* Headline */}
            <Reveal index={2} active={mounted}>
              <h1 className="text-[2.3rem] font-extrabold leading-[1.1] tracking-tight sm:text-[2.7rem]">
                <span className="text-[#0F1F4E]">Medicine availability </span>
                <span style={{ color: ACCENT }}>
                  infrastructure for health systems.
                </span>
              </h1>
            </Reveal>

            {/* Body */}
            <Reveal index={3} active={mounted}>
              <p className="mt-5 text-[14.5px] leading-relaxed text-[#5B6478]">
                ZoikoMeds helps hospitals, care teams, pharmacy leaders, and
                patient access organizations understand medicine availability
                signals, guide patients toward pharmacy confirmation, support
                discharge workflows, and monitor access-risk patterns through
                governed infrastructure.
              </p>
            </Reveal>

            {/* CTA buttons */}
            <Reveal index={4} active={mounted}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="#request"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Request Health System Briefing
                </Link>
                <Link
                  href="/care-team-access"
                  className="inline-flex items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
                >
                  Explore Care Team Workflows
                </Link>
              </div>
            </Reveal>

            {/* Arrow text link */}
            <Reveal index={5} active={mounted}>
              <Link
                href="#"
                className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium transition-opacity hover:opacity-80"
                style={{ color: ACCENT }}
              >
                View Signal Governance
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </Reveal>

            {/* Disclaimer */}
            <Reveal index={6} active={mounted}>
              <p className="mt-5 flex items-start gap-2 text-[12.5px] leading-relaxed text-[#5B6478]">
                <InfoIcon />
                <span>
                  ZoikoMeds provides availability intelligence and workflow
                  support. It does not prescribe, dispense, recommend
                  substitutions, validate prescriptions, or guarantee stock.
                </span>
              </p>
            </Reveal>
          </div>

          {/* ── Right column: Hero Image ── */}
          <div className="relative flex items-center justify-center">
            {mounted ? (
              <Reveal index={3} active={mounted}>
                <div className="relative w-full overflow-hidden rounded-2xl">
                  <img
                    src="/health/hero.png"
                    alt="Health Systems Infrastructure Illustration"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </Reveal>
            ) : (
              <div className="h-[350px] w-full animate-pulse rounded-2xl bg-[#E4E8F0]" />
            )}
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
          ? `hsHeroFadeUp 0.6s ease-out ${index * 80}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes hsHeroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
