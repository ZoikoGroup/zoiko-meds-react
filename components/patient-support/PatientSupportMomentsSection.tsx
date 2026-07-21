"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const SCENARIOS = [
  {
    icon: "home",
    title: "Discharge support",
    description:
      "Help patients understand where to check availability before leaving the hospital, clinic, or urgent-care setting.",
    highlight: "Reduces post-discharge confusion and avoidable pharmacy trips.",
    cta: "Request Workflow Briefing",
    ctaFilled: false,
    href: "#request",
  },
  {
    icon: "alert",
    title: "Shortage follow-up",
    description:
      "During shortages or regional access pressure, guide patients toward availability searches, confirmation steps, and alert setup.",
    highlight: "Standardizes access conversations during high-friction periods.",
    cta: "View Signal Guide",
    ctaFilled: false,
    href: "#",
  },
  {
    icon: "refresh",
    title: "Chronic medication support",
    description:
      "For patients who regularly check the same medicines, explain saved searches and alerts so they or their caregiver can monitor changes.",
    highlight: "Encourages patient self-service and repeat access support.",
    cta: "Learn About Saved Searches",
    ctaFilled: false,
    href: "/saved-searches",
  },
  {
    icon: "people",
    title: "Caregiver handoff",
    description:
      "Guide caregivers to save searches, organize caregiver labels, and monitor availability signals for someone they support.",
    highlight: "Supports families without creating a clinical proxy system.",
    cta: "Explore Caregiver Access",
    ctaFilled: false,
    href: "caregiver-access",
  },
  {
    icon: "monitor",
    title: "Telehealth follow-up",
    description:
      "Digital care teams can point patients to safe availability checks and pharmacy confirmation after a remote consultation.",
    highlight: "Keeps access guidance practical while preserving clinical boundaries.",
    cta: "Request Workflow Briefing",
    ctaFilled: true,
    href: "#request",
  },
  {
    icon: "shield",
    title: "Always an access layer",
    description:
      "Every moment supports the same job: help patients understand availability and confirm with the pharmacy — never clinical decisions.",
    highlight: null,
    cta: null,
    ctaFilled: false,
    href: "#request",
  },
] as const;

type IconName = "home" | "alert" | "refresh" | "people" | "monitor" | "shield";

export default function PatientSupportMomentsSection() {
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

        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal index={0} active={mounted}>
            <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.2rem]">
              Built for the moments when access
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p
              className="text-[2rem] font-extrabold leading-tight sm:text-[2.2rem]"
              style={{ color: ACCENT }}
            >
              becomes the barrier.
            </p>
          </Reveal>
          <Reveal index={2} active={mounted}>
            <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-[#5B6478]">
              Where ZoikoMeds fits into real provider-side patient support —
              without overclaiming.
            </p>
          </Reveal>
        </div>

        {/* ── 2×3 grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SCENARIOS.map((s, i) => (
            <ScenarioCard key={s.title} {...s} index={i} active={mounted} />
          ))}
        </div>

        {/* ── Disclaimer bar ── */}
        <Reveal index={9} active={mounted}>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5">
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3E8FB] text-[#3B5BDB]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-[#5B6478]">
              ZoikoMeds does not recommend clinical alternatives, alter
              prescriptions, validate medication suitability, approve
              dispensing, or replace provider–pharmacist communication where
              required.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ScenarioCard                                                         */
/* ------------------------------------------------------------------ */
function ScenarioCard({
  icon,
  title,
  description,
  highlight,
  cta,
  ctaFilled,
  href,
  index,
  active,
}: {
  icon: IconName;
  title: string;
  description: string;
  highlight: string | null;
  cta: string | null;
  ctaFilled: boolean;
  href: string;
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index + 3} active={active}>
      <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9FE3D3] hover:shadow-[0_12px_28px_-14px_rgba(15,170,135,0.18)]">
        {/* Icon */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
        >
          <ScenarioIcon name={icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[14px] font-bold text-[#0F1F4E]">{title}</h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
          {description}
        </p>

        {/* Teal checkmark highlight */}
        {highlight && (
          <p
            className="mt-3 flex items-start gap-1.5 text-[12px] font-medium leading-relaxed"
            style={{ color: ACCENT }}
          >
            <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8.5l3.5 3.5 6.5-7"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {highlight}
          </p>
        )}

        {/* CTA */}
        {cta && (
          <div className="mt-4">
            {ctaFilled ? (
              <Link
                href={href}
                className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                style={{ backgroundColor: ACCENT }}
              >
                {cta}
              </Link>
            ) : (
              <Link
                href={href}
                className="inline-flex w-full items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
              >
                {cta}
              </Link>
            )}
          </div>
        )}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function ScenarioIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 20, height: 20 } };
  switch (name) {
    case "home":
      return (
        <svg {...c}>
          <path d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "alert":
      return (
        <svg {...c}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...c}>
          <path d="M4 12a8 8 0 0 1 14.93-4M20 12a8 8 0 0 1-14.93 4"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 4.5V8h-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 19.5V16h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "people":
      return (
        <svg {...c}>
          <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M2 20c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="17" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M22 20c0-2.76-2.24-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "monitor":
      return (
        <svg {...c}>
          <rect x="3" y="4" width="18" height="13" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg {...c}>
          <path d="M12 2.5l7 2.8v5c0 4.8-3.1 8-7 9.4C8.1 18.3 5 15 5 10.3v-5l7-2.8z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div
      style={{
        opacity: active ? undefined : 0,
        animation: active
          ? `patientMomentsFadeUp 0.6s ease-out ${index * 75}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes patientMomentsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}