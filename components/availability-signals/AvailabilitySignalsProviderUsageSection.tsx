"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ACCENT = "#0FAA87";

const USAGE_CARDS = [
  {
    icon: "phone",
    title: "During patient conversations",
    dos: ["Use for access guidance, next-step explanation, and expectation-setting."],
    donts: ["Don't use for clinical decisions, substitutions, dose changes, or treatment recommendations."],
    cta: "View Patient Support Workflows",
    ctaFilled: false,
    href: "/patient-support",
  },
  {
    icon: "home",
    title: "During discharge planning",
    dos: ["Use for pharmacy confirmation guidance and patient handoff."],
    donts: ["Don't use signals to guarantee medication access after discharge."],
    cta: "Request Workflow Briefing",
    ctaFilled: false,
    href: "#request",
  },
  {
    icon: "alert",
    title: "During shortage or access pressure",
    dos: ["Use to explain search results, set alerts, and encourage follow-up."],
    donts: ["Don't use as official shortage declarations or a replacement for regulator, manufacturer, or wholesaler data."],
    cta: "Learn About Alerts",
    ctaFilled: false,
    href: "#",
  },
  {
    icon: "people",
    title: "During caregiver support",
    dos: ["Use for family support, caregiver education, and safer pharmacy confirmation."],
    donts: ["Don't use as legal caregiver authority, care plans, or medical proxy decisions."],
    cta: "Explore Caregiver Access",
    ctaFilled: false,
    href: "/caregiver-access",
  },
] as const;

type IconName = "phone" | "home" | "alert" | "people";

export default function AvailabilitySignalsProviderUsageSection() {
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
        <div className="mx-auto max-w-xl text-center">
          <Reveal index={0} active={mounted}>
            <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.2rem]">
              How providers should{" "}
              <span style={{ color: ACCENT }}>use signals.</span>
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-[#5B6478]">
              Signal education turned into safe provider behavior — for access
              guidance, never clinical decisions.
            </p>
          </Reveal>
        </div>

        {/* ── 2×2 usage cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {USAGE_CARDS.map((card, i) => (
            <UsageCard key={card.title} {...card} index={i} active={mounted} />
          ))}
        </div>

        {/* ── Disclaimer bar ── */}
        <Reveal index={7} active={mounted}>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5">
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3E8FB] text-[#3B5BDB]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-[#5B6478]">
              A signal helps the patient or care team decide what to check next.{" "}
              <span className="font-bold text-[#0F1F4E]">
                It does not reserve medicine, guarantee stock, validate
                eligibility, or replace professional judgment.
              </span>
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  UsageCard                                                            */
/* ------------------------------------------------------------------ */
function UsageCard({
  icon,
  title,
  dos,
  donts,
  cta,
  ctaFilled,
  href,
  index,
  active,
}: {
  icon: IconName;
  title: string;
  dos: readonly string[];
  donts: readonly string[];
  cta: string;
  ctaFilled: boolean;
  href: string;
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index + 2} active={active}>
      <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:shadow-[0_10px_28px_-14px_rgba(15,170,135,0.15)]">
        {/* Icon */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
        >
          <UsageIcon name={icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[14.5px] font-bold text-[#0F1F4E]">{title}</h3>

        {/* Do / Don't list */}
        <ul className="mt-3 flex flex-1 flex-col gap-2">
          {dos.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0" style={{ color: ACCENT }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[12.5px] leading-relaxed text-[#5B6478]">{item}</span>
            </li>
          ))}
          {donts.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0 text-[#E05252]">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-[12.5px] leading-relaxed text-[#5B6478]">{item}</span>
            </li>
          ))}
        </ul>

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
function UsageIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 20, height: 20 } };
  switch (name) {
    case "phone":
      return (
        <svg {...c}>
          <path d="M5 4.5c0-.6.5-1 1-.9l3 .5c.4.1.8.4.9.8l.6 2.2c.1.4 0 .9-.3 1.2l-1.3 1.3c.8 1.8 2.3 3.3 4.1 4.1l1.3-1.3c.3-.3.8-.4 1.2-.3l2.2.6c.4.1.7.5.8.9l.5 3c.1.5-.3 1-.9 1C11.4 18.5 5.5 12.6 5 4.5z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
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
    case "people":
      return (
        <svg {...c}>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `avSigUsageFadeUp 0.6s ease-out ${index * 80}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes avSigUsageFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}