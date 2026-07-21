"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const USE_CASES = [
  {
    icon: "building",
    title: "Discharge planning",
    description:
      "Help patients understand where to check availability before leaving a hospital, urgent-care center, or outpatient setting — reducing post-discharge access surprises.",
    cta: "Explore Patient Support Workflows",
    ctaFilled: true,
    href: "/patient-support",
  },
  {
    icon: "refresh",
    title: "Chronic medication access",
    description:
      "Clinics supporting recurring therapies can help patients repeat searches, save medicines, and monitor signals — improving follow-through during recurring access issues.",
    cta: "Learn About Saved Searches",
    ctaFilled: false,
    href: "/saved-searches",
  },
  {
    icon: "alert",
    title: "Shortage-aware patient guidance",
    description:
      "During shortages or regional access pressure, care teams can use confidence-based signals to guide patients toward pharmacy confirmation — avoiding unsafe substitution language.",
    cta: "Learn About Availability Confidence",
    ctaFilled: false,
    href: "/availability-confidence",
  },
  {
    icon: "people",
    title: "Care coordination",
    description:
      "Care coordinators, nurses, patient-support staff, and clinic administrators can help patients and caregivers understand availability next steps — reducing manual guesswork.",
    cta: "Request Provider Briefing",
    ctaFilled: false,
    href: "#request",
  },
] as const;

type IconName = "building" | "refresh" | "alert" | "people";

export default function ProviderOverviewUseCasesSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.08 }
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
              Where providers{" "}
              <span style={{ color: ACCENT }}>use ZoikoMeds.</span>
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
              Practical support for everyday access conversations — without
              clinical overreach.
            </p>
          </Reveal>
        </div>

        {/* ── 2×2 grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {USE_CASES.map((item, i) => (
            <UseCaseCard key={item.title} {...item} index={i} active={mounted} />
          ))}
        </div>

        {/* ── Disclaimer bar ── */}
        <Reveal index={7} active={mounted}>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5">
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3E8FB] text-[#3B5BDB]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1.5l5 1.8v4c0 3.4-2.2 5.7-5 6.7-2.8-1-5-3.3-5-6.7v-4l5-1.8z"
                  stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-[#5B6478]">
              ZoikoMeds supports availability awareness.{" "}
              <span className="font-semibold text-[#0F1F4E]">
                It does not recommend clinical alternatives, change
                prescriptions, authorize dispensing, or replace
                provider–pharmacist communication where required.
              </span>
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  UseCaseCard                                                          */
/* ------------------------------------------------------------------ */
function UseCaseCard({
  icon,
  title,
  description,
  cta,
  ctaFilled,
  href,
  index,
  active,
}: {
  icon: IconName;
  title: string;
  description: string;
  cta: string;
  ctaFilled: boolean;
  href: string;
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index + 2} active={active}>
      <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#9FE3D3] hover:shadow-[0_14px_32px_-16px_rgba(15,170,135,0.18)]">
        {/* Icon */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
        >
          <UseCaseIcon name={icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[15px] font-bold text-[#0F1F4E]">{title}</h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#5B6478]">
          {description}
        </p>

        {/* CTA */}
        <div className="mt-5">
          {ctaFilled ? (
            <Link
              href={href}
              className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
              style={{ backgroundColor: ACCENT }}
            >
              {cta}
            </Link>
          ) : (
            <Link
              href={href}
              className="inline-flex items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
            >
              {cta}
            </Link>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function UseCaseIcon({ name }: { name: IconName }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 20, height: 20 } };
  switch (name) {
    case "building":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="14" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 21V11h8v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 11l9-8 9 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="10" y="15" width="4" height="6" rx="0.6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 0 1 14.93-4M20 12a8 8 0 0 1-14.93 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 4.5V8h-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 19.5V16h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "alert":
      return (
        <svg {...common}>
          <path
            d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
          />
          <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M2 20c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="17" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M22 20c0-2.76-2.24-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
          ? `providerUseFadeUp 0.6s ease-out ${index * 85}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes providerUseFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}