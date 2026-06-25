"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * InventoryUploadBenefitsSection
 * "Fresher signals. Fewer unnecessary calls. More pharmacy control."
 * Centred header + 2×2 benefit cards + blue-accented disclaimer bar.
 *
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";

const BENEFITS = [
  {
    icon: "refresh",
    title: "Improve signal freshness.",
    description:
      'Structured inputs can help ZoikoMeds show more current confidence signals than stale or manual information — without publishing exact stock.',
    cta: "Discuss Inventory Signal Setup",
    ctaFilled: true,
    href: "#",
  },
  {
    icon: "phone",
    title: "Reduce repetitive calls.",
    description:
      '"do you have this?" inquiries and set clearer patient expectations.',
    descriptionPrefix: "Signals and confirmation workflows can reduce repetitive ",
    cta: "Learn About Confirmation Requests",
    ctaFilled: false,
    href: "#",
  },
  {
    icon: "lock",
    title: "Protect exact stock & sensitive data.",
    description:
      "Inputs become confidence signals, not public stock counts — patient support without exposing operational inventory.",
    cta: "View Data Controls",
    ctaFilled: false,
    href: "#",
  },
  {
    icon: "branch",
    title: "Scale across locations.",
    description:
      "Groups can manage branch-level signal participation, integration preferences, upload cadence, and governance settings.",
    cta: "Request Chain Integration",
    ctaFilled: false,
    href: "#",
  },
] as const;

export default function InventoryUploadBenefitsSection() {
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
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal index={0} active={mounted}>
            <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.2rem]">
              Fresher signals. Fewer unnecessary calls.
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="text-[2rem] font-extrabold leading-tight sm:text-[2.2rem]" style={{ color: ACCENT }}>
              More pharmacy control.
            </p>
          </Reveal>
          <Reveal index={2} active={mounted}>
            <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-[#5B6478]">
              Why structured inventory signals matter operationally — without
              ever publishing exact stock.
            </p>
          </Reveal>
        </div>

        {/* 2×2 grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.title} {...b} index={i} active={mounted} />
          ))}
        </div>

        {/* Disclaimer bar */}
        <Reveal index={6} active={mounted}>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5">
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3E8FB] text-[#3B5BDB]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 1.5l5 1.8v4c0 3.4-2.2 5.7-5 6.7-2.8-1-5-3.3-5-6.7v-4l5-1.8z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-[#5B6478]">
              Inventory signal participation does not create medicine
              reservations, dispensing obligations, stock guarantees, allocation
              commitments, clinical recommendations, or patient eligibility
              decisions.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BenefitCard                                                          */
/* ------------------------------------------------------------------ */
function BenefitCard({
  icon,
  title,
  description,
  descriptionPrefix,
  cta,
  ctaFilled,
  href,
  index,
  active,
}: {
  icon: "refresh" | "phone" | "lock" | "branch";
  title: string;
  description: string;
  descriptionPrefix?: string;
  cta: string;
  ctaFilled: boolean;
  href: string;
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index + 3} active={active}>
      <div
        className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#9FE3D3] hover:shadow-[0_14px_32px_-16px_rgba(15,170,135,0.2)]"
      >
        {/* Icon */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
        >
          <BenefitIcon name={icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[15px] font-bold text-[#0F1F4E]">{title}</h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#5B6478]">
          {descriptionPrefix
            ? <>{descriptionPrefix}<span className="font-medium text-[#0F1F4E]">&lsquo;do you have this?&rsquo;</span> inquiries and set clearer patient expectations.</>
            : description}
        </p>

        {/* CTA button */}
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
function BenefitIcon({ name }: { name: "refresh" | "phone" | "lock" | "branch" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };
  switch (name) {
    case "refresh":
      return (
        <svg {...common}>
          <path
            d="M4 12a8 8 0 0 1 14.93-4M20 12a8 8 0 0 1-14.93 4"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
          />
          <path d="M18 4.5V8h-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 19.5V16h3.5"  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path
            d="M5 4.5c0-.6.5-1 1-.9l3 .5c.4.1.8.4.9.8l.6 2.2c.1.4 0 .9-.3 1.2l-1.3 1.3c.8 1.8 2.3 3.3 4.1 4.1l1.3-1.3c.3-.3.8-.4 1.2-.3l2.2.6c.4.1.7.5.8.9l.5 3c.1.5-.3 1-.9 1C11.4 18.5 5.5 12.6 5 4.5z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
          />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.6" />
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
        animation: active ? `invBenefitsFadeUp 0.6s ease-out ${index * 80}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes invBenefitsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}