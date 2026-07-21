"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const REFERRAL_CARDS = [
  {
    icon: "doc",
    title: "After a prescription is discussed or issued",
    description:
      "When a patient may need help checking where a medicine could be available near them.",
    dos: ["Guide search and pharmacy confirmation."],
    donts: ["Not for changing the prescription, selecting substitutes, or confirming suitability."],
    cta: "View Signal Guide",
    ctaFilled: false,
    href: "#",
    colSpan: 1,
  },
  {
    icon: "home",
    title: "Before discharge",
    description:
      "When a patient leaving a hospital, urgent care, or outpatient setting may face uncertainty finding a medicine locally.",
    dos: ["Guide availability search and pharmacy confirmation."],
    donts: ["Not for guaranteeing post-discharge access or dispensing."],
    cta: "View Patient Support Workflows",
    ctaFilled: false,
    href: "/patient-support",
    colSpan: 1,
  },
  {
    icon: "alert",
    title: "During shortage or access pressure",
    description:
      "When patients are calling repeatedly, struggling to find supply, or facing local availability uncertainty.",
    dos: ["Explain search results, set alerts, encourage follow-up."],
    donts: ["Not for declaring official shortages or recommending alternative therapy."],
    cta: "View Medication Availability Signals",
    ctaFilled: false,
    href: "#",
    colSpan: 1,
  },
] as const;

const CAREGIVER_CARD = {
  icon: "people",
  title: "When a caregiver is helping",
  description:
    "When an adult child, parent, spouse, guardian, or trusted helper is assisting with medicine availability searches.",
  dos: ["Support caregiver search organisation and alerts."],
  donts: ["Not for creating legal authority, power of attorney, or medical decisions."],
  cta: "Explore Caregiver Access",
  ctaFilled: false,
  href: "/caregiver-access",
} as const;

type IconName = "doc" | "home" | "alert" | "people";

export default function ReferralGuidanceWhenToReferSection() {
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

        {/* Header */}
        <div className="mx-auto max-w-xl text-center">
          <Reveal index={0} active={mounted}>
            <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.2rem]">
              When to refer a patient to{" "}
              <span style={{ color: ACCENT }}>availability search.</span>
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-[#5B6478]">
              Appropriate handoff moments — and the clinical lines a referral
              never crosses.
            </p>
          </Reveal>
        </div>

        {/* Top 3-column grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {REFERRAL_CARDS.map((card, i) => (
            <ReferralCard key={card.title} {...card} index={i + 2} active={mounted} />
          ))}
        </div>

        {/* Bottom single card (left-aligned, 1/3 width on lg) */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal index={6} active={mounted}>
            <ReferralCardInner {...CAREGIVER_CARD} />
          </Reveal>
        </div>

        {/* Disclaimer bar */}
        <Reveal index={8} active={mounted}>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5">
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3E8FB] text-[#3B5BDB]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-[#5B6478]">
              ZoikoMeds should be used for availability guidance only.{" "}
              <span className="font-bold text-[#0F1F4E]">
                Medical, prescribing, substitution, eligibility, and dispensing
                questions must remain with qualified healthcare professionals
                and pharmacies.
              </span>
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ReferralCard (with Reveal wrapper)                                  */
/* ------------------------------------------------------------------ */
function ReferralCard({
  icon, title, description, dos, donts, cta, ctaFilled, href, index, active,
}: {
  icon: IconName; title: string; description: string;
  dos: readonly string[]; donts: readonly string[];
  cta: string; ctaFilled: boolean; href: string;
  index: number; active: boolean;
}) {
  return (
    <Reveal index={index} active={active}>
      <ReferralCardInner
        icon={icon} title={title} description={description}
        dos={dos} donts={donts} cta={cta} ctaFilled={ctaFilled} href={href}
      />
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  ReferralCardInner (pure UI, no Reveal)                              */
/* ------------------------------------------------------------------ */
function ReferralCardInner({
  icon, title, description, dos, donts, cta, ctaFilled, href,
}: {
  icon: IconName; title: string; description: string;
  dos: readonly string[]; donts: readonly string[];
  cta: string; ctaFilled: boolean; href: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:shadow-[0_10px_28px_-14px_rgba(15,170,135,0.15)]">
      {/* Icon */}
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
      >
        <ReferralIcon name={icon} />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-[14px] font-bold text-[#0F1F4E]">{title}</h3>

      {/* Description */}
      <p className="mt-2 text-[12.5px] leading-relaxed text-[#5B6478]">{description}</p>

      {/* Do / Don't list */}
      <ul className="mt-3 flex flex-1 flex-col gap-2">
        {dos.map((item) => (
          <li key={item} className="flex items-start gap-1.5">
            <span className="mt-0.5 flex-shrink-0" style={{ color: ACCENT }}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[12px] leading-relaxed text-[#5B6478]">{item}</span>
          </li>
        ))}
        {donts.map((item) => (
          <li key={item} className="flex items-start gap-1.5">
            <span className="mt-0.5 flex-shrink-0 text-[#E05252]">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-[12px] leading-relaxed text-[#5B6478]">{item}</span>
          </li>
        ))}
      </ul>

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
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                                */
/* ------------------------------------------------------------------ */
function ReferralIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 20, height: 20 } };
  switch (name) {
    case "doc":
      return (
        <svg {...c}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `refWhenFadeUp 0.6s ease-out ${index * 80}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes refWhenFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}