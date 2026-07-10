"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const PATHS = [
  {
    icon: "home",
    title: "Health-system strategy briefing",
    description: "C-suite, CIO, CMIO, pharmacy leadership, access leaders, population health, strategy, procurement.",
    cta: "Request Health System Briefing",
    href: "#",
  },
  {
    icon: "person",
    title: "Care-team workflow review",
    description: "Discharge teams, care coordinators, patient navigators, outpatient operations, clinic support.",
    cta: "Explore Care Team Workflows",
    href: "#",
  },
  {
    icon: "code",
    title: "Integration & API evaluation",
    description: "Digital front door, patient portal, telehealth, data engineering, architecture, and product teams.",
    cta: "Discuss Integration",
    href: "#",
  },
  {
    icon: "lock",
    title: "Security & procurement review",
    description: "Security, privacy, compliance, legal, procurement, and enterprise architecture teams.",
    cta: "Request Security Pack",
    href: "#",
  },
  {
    icon: "search",
    title: "Patient or caregiver self-service",
    description: "People checking medicine availability for themselves or someone they support.",
    cta: "Search Medicines",
    href: "#",
  },
] as const;

type IconName = "home" | "person" | "code" | "lock" | "search";

export default function HealthSystemsAccessSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.05 }
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
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Start with the right </span>
            <span style={{ color: ACCENT }}>health-system pathway.</span>
          </h2>
        </Reveal>

        {/* ── Top row: 3 cards ── */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PATHS.slice(0, 3).map((path, i) => (
            <PathCard key={path.title} path={path} index={i + 2} active={mounted} />
          ))}
        </div>

        {/* ── Bottom row: 2 cards (left-aligned) ── */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PATHS.slice(3).map((path, i) => (
            <PathCard key={path.title} path={path} index={i + 5} active={mounted} />
          ))}
          <div className="hidden lg:block" />
        </div>

        {/* ── Dark navy CTA banner ── */}
        <Reveal index={7} active={mounted}>
          <div
            className="relative mt-6 overflow-hidden rounded-2xl px-8 py-12 text-center"
            style={{ backgroundColor: "#0D1B3E" }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(15,170,135,0.08) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <h3 className="mx-auto max-w-xl text-[1.35rem] font-bold leading-snug sm:text-[1.55rem]">
                <span className="text-white">Support medicine access with </span>
                <span style={{ color: ACCENT }}>governed availability infrastructure.</span>
              </h3>
              <p className="mx-auto max-w-md text-[13.5px] leading-relaxed text-[#8FA3C8]">
                Support health-system workflows across discharge, care
                navigation, availability signals, API integration, and
                access-risk intelligence — without replacing clinical care.
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="#request"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Request Health System Briefing
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5 active:scale-[0.97]"
                >
                  Explore Care Team Workflows
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
/*  PathCard                                                             */
/* ------------------------------------------------------------------ */
function PathCard({
  path,
  index,
  active,
}: {
  path: typeof PATHS[number];
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index} active={active}>
      <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9FE3D3] hover:shadow-[0_12px_30px_-14px_rgba(15,170,135,0.18)]">
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#1A2E5A", color: "#6EE7D0" }}
        >
          <AccessIcon name={path.icon} />
        </div>

        <h3 className="mt-4 text-[14px] font-bold leading-snug text-[#0F1F4E]">
          {path.title}
        </h3>

        <p className="mt-2 flex-1 text-[12px] leading-relaxed text-[#5B6478]">
          {path.description}
        </p>

        <Link
          href={path.href}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
        >
          {path.cta}
        </Link>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function AccessIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 20, height: 20 } };
  switch (name) {
    case "home":
      return (
        <svg {...c}>
          <path d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "person":
      return (
        <svg {...c}>
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 20c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "code":
      return (
        <svg {...c}>
          <path d="M9 8l-4 4 4 4M15 8l4 4-4 4"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "lock":
      return (
        <svg {...c}>
          <rect x="5" y="11" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "search":
      return (
        <svg {...c}>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16.5 16.5l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `hsAccessFadeUp 0.6s ease-out ${index * 80}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes hsAccessFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}