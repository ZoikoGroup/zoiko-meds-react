"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const PATHS = [
  {
    icon: "home",
    title: "Strategic Enterprise Briefing",
    description: "C-suite, strategy, partnerships, procurement, and commercial teams.",
    cta: "Request Enterprise Briefing",
    href: "#request",
  },
  {
    icon: "code",
    title: "API Evaluation",
    description: "CTOs, product teams, engineering, digital health, and platform teams.",
    cta: "Discuss API Access",
    href: "/zoiko-avail-api",
  },
  {
    icon: "pulse",
    title: "Intelligence Review",
    description: "Public health, manufacturers, payers, health systems, and access-risk teams.",
    cta: "Explore ZoikoSignal™",
    href: "/zoikosignal-intelligence",
  },
  {
    icon: "db",
    title: "Data & Standards Review",
    description: "Data teams, integration teams, and platform partners.",
    cta: "Explore MediBase™",
    href: "/medibase-data",
  },
] as const;

type IconName = "home" | "code" | "pulse" | "db";

export default function EnterpriseSolutionsAccessSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">06</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Access Pathways
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.3rem]">
            Choose your route in.
          </h2>
        </Reveal>

        {/* ── 4-column path cards ── */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PATHS.map((path, i) => (
            <Reveal key={path.title} index={i + 2} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9FE3D3] hover:shadow-[0_12px_30px_-14px_rgba(15,170,135,0.18)]">
                {/* Dark navy icon badge */}
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "#1A2E5A", color: "#6EE7D0" }}
                >
                  <AccessIcon name={path.icon} />
                </div>

                {/* Title */}
                <h3 className="mt-4 text-[14.5px] font-bold leading-snug text-[#0F1F4E]">
                  {path.title}
                </h3>

                {/* Description */}
                <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
                  {path.description}
                </p>

                {/* CTA */}
                <Link
                  href={path.href}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
                >
                  {path.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Dark navy CTA banner ── */}
        <Reveal index={7} active={mounted}>
          <div
            className="relative mt-6 overflow-hidden rounded-2xl px-8 py-12 text-center"
            style={{ backgroundColor: "#112154" }}
          >
            {/* Subtle radial glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(15,170,135,0.08) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 flex flex-col items-center gap-4">
              {/* Headline */}
              <h3 className="mx-auto max-w-xl text-[1.35rem] font-bold leading-snug text-white sm:text-[1.55rem]">
                Build medicine availability intelligence on governed infrastructure.
              </h3>

              {/* Subtitle */}
              <p className="mx-auto max-w-md text-[13.5px] leading-relaxed text-[#8FA3C8]">
                Convert fragmented medicine availability into governed enterprise
                intelligence.
              </p>

              {/* Buttons */}
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="#request"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Request Enterprise Briefing
                </Link>
                <Link
                  href="/zoikosignal-intelligence"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5 active:scale-[0.97]"
                >
                  Explore Intelligence Stack
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function AccessIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 22, height: 22 } };
  switch (name) {
    case "home":
      return (
        <svg {...c}>
          <path d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "code":
      return (
        <svg {...c}>
          <path d="M9 8l-4 4 4 4M15 8l4 4-4 4"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...c}>
          <polyline points="2,12 6,12 8,5 10,19 13,9 15,14 17,12 22,12"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "db":
      return (
        <svg {...c}>
          <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `entAccessFadeUp 0.6s ease-out ${index * 80}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes entAccessFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}