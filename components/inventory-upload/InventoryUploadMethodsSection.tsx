"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * InventoryUploadMethodsSection
 * "Choose the signal connection method that fits your pharmacy."
 * Centred header + 4-column method cards (2 with "STRONGER FRESHNESS" badge + teal border)
 * + blue-accented disclaimer bar.
 *
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";

type EffortLevel = 1 | 2 | 3;

const METHODS = [
  {
    icon: "monitor",
    title: "Portal updates",
    description:
      "Independent pharmacies, pilot locations, and lower-volume participants. Manual signal controls, visibility settings, and pause/resume.",
    effort: 1 as EffortLevel,
    freshness: "Manual",
    freshnessStrong: false,
    badge: false,
    cta: "Sign In to Pharmacy Portal",
    ctaFilled: false,
    href: "#",
  },
  {
    icon: "file",
    title: "Secure file exchange",
    description:
      "Regional groups and multi-location pharmacies without live API readiness. Approved CSV/structured files, SFTP, scheduled updates, validation, and error reporting.",
    effort: 2 as EffortLevel,
    freshness: "Scheduled",
    freshnessStrong: false,
    badge: false,
    cta: "View Upload Requirements",
    ctaFilled: false,
    href: "#",
  },
  {
    icon: "branch",
    title: "PMS/POS integration",
    description:
      "Chains, high-volume locations, and hospital outpatient pharmacies. System-level signal feeds, branch mapping, and integration monitoring.",
    effort: 3 as EffortLevel,
    freshness: "Stronger",
    freshnessStrong: true,
    badge: true,
    cta: "Request PMS/POS Integration",
    ctaFilled: true,
    href: "#",
  },
  {
    icon: "code",
    title: "API integration",
    description:
      "Enterprise pharmacy operators, health-system pharmacies, and technology partners. API submission, webhooks where supported, and scoped access controls.",
    effort: 3 as EffortLevel,
    freshness: "Strongest",
    freshnessStrong: true,
    badge: true,
    cta: "Discuss API Integration",
    ctaFilled: true,
    href: "#",
  },
] as const;

export default function InventoryUploadMethodsSection() {
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
              Choose the signal connection method
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="text-[2rem] font-extrabold leading-tight sm:text-[2.2rem]" style={{ color: ACCENT }}>
              that fits your pharmacy.
            </p>
          </Reveal>
          <Reveal index={2} active={mounted}>
            <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
              From independent portal updates to enterprise-grade integration —
              structured, automated methods deliver the strongest freshness.
            </p>
          </Reveal>
        </div>

        {/* ── Cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METHODS.map((m, i) => (
            <MethodCard key={m.title} {...m} index={i} active={mounted} />
          ))}
        </div>

        {/* ── Disclaimer bar ── */}
        <Reveal index={7} active={mounted}>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5">
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3E8FB] text-[#3B5BDB]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-[#5B6478]">
              Connection options depend on pharmacy verification status, system
              readiness, jurisdiction, contract scope, data quality,
              controlled-category handling, and platform approval.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MethodCard                                                           */
/* ------------------------------------------------------------------ */
function MethodCard({
  icon,
  title,
  description,
  effort,
  freshness,
  freshnessStrong,
  badge,
  cta,
  ctaFilled,
  href,
  index,
  active,
}: {
  icon: "monitor" | "file" | "branch" | "code";
  title: string;
  description: string;
  effort: EffortLevel;
  freshness: string;
  freshnessStrong: boolean;
  badge: boolean;
  cta: string;
  ctaFilled: boolean;
  href: string;
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index + 3} active={active}>
      <div
        className="relative flex h-full flex-col rounded-2xl bg-white p-5 transition-all duration-300 hover:-translate-y-1"
        style={{
          border: badge ? `1.5px solid ${ACCENT}` : "1.5px solid #E7EAF1",
          boxShadow: badge
            ? "0 8px 32px -12px rgba(15,170,135,0.18)"
            : undefined,
        }}
      >
        {/* Badge */}
        {badge && (
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-[10px] font-bold tracking-widest uppercase text-white"
            style={{ backgroundColor: ACCENT }}
          >
            Stronger Freshness
          </div>
        )}

        {/* Icon */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
        >
          <MethodIcon name={icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[14.5px] font-bold text-[#0F1F4E]">{title}</h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
          {description}
        </p>

        {/* Effort dots */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-[11.5px] text-[#5B6478]">Effort</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((d) => (
              <span
                key={d}
                className="h-2 w-2 rounded-full"
                style={{
                  backgroundColor:
                    d <= effort ? ACCENT : "#D8DCE6",
                }}
              />
            ))}
          </div>
        </div>

        {/* Freshness tag */}
        <div className="mt-2">
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-[11.5px] font-medium"
            style={{
              backgroundColor: freshnessStrong ? "#DCF5EE" : "#F0F2F7",
              color: freshnessStrong ? "#0B7A62" : "#5B6478",
            }}
          >
            Freshness: {freshness}
          </span>
        </div>

        {/* CTA */}
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
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function MethodIcon({ name }: { name: "monitor" | "file" | "branch" | "code" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };
  switch (name) {
    case "monitor":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="13" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "file":
      return (
        <svg {...common}>
          <path
            d="M14 3H7a1.4 1.4 0 0 0-1.4 1.4v15.2A1.4 1.4 0 0 0 7 21h10a1.4 1.4 0 0 0 1.4-1.4V7.4L14 3z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
          />
          <path d="M14 3v4.4H18.4M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "branch":
      return (
        <svg {...common}>
          <rect x="4"  y="14" width="4" height="6" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10" y="9"  width="4" height="11" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16" y="4"  width="4" height="16" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path
            d="M9 8l-4 4 4 4M15 8l4 4-4 4"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
          />
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
          ? `invMethodsFadeUp 0.6s ease-out ${index * 80}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes invMethodsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}