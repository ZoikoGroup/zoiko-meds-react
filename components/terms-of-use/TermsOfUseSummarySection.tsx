"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const CARDS = [
  {
    title: "What ZoikoMeds does",
    description: "Provides medicine availability information, confidence-based signals, account tools, pharmacy workflows, provider guidance, enterprise intelligence, APIs, and data products.",
    link: "Explore Platform",
    href: "/home",
    icon: (
      <path d="M2 8.5h2.5l1.5-3.5 2.5 6 1.5-3.5H14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "What it does not do",
    description: "Does not prescribe, dispense, sell, deliver, reserve, recommend, allocate, guarantee medicines, validate prescriptions, or provide medical advice.",
    link: "Medical Disclaimer",
    href: "/medical-disclaimer",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M4.2 4.2l7.6 7.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Availability signals",
    description: "Signals help users decide what to check next. They are not exact stock counts or guarantees.",
    link: "Availability Confidence",
    href: "/availability-confidence",
    icon: (
      <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Accounts and alerts",
    description: "Accounts help users save searches, alerts, preferences, and caregiver labels. Users remain responsible for confirming with pharmacies.",
    link: "Create Account",
    href: "/create-account",
    icon: (
      <path d="M8 1.5c-2 0-3.5 1.6-3.5 3.6v2.7c0 .6-.2 1.2-.6 1.7L3 10.5h10l-.9-1c-.4-.5-.6-1.1-.6-1.7V5.1c0-2-1.5-3.6-3.5-3.6zM6.5 12.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Pharmacy & enterprise use",
    description: "Professional and institutional access is governed by verification, permissions, contract, platform controls, and applicable law.",
    link: "Enterprise Solutions",
    href: "/enterprise-solutions",
    icon: (
      <path d="M8 1.5l6 4v3c0 4-2.6 6.5-6 7.5-3.4-1-6-3.5-6-7.5v-3l6-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "User responsibility",
    description: "Users must use ZoikoMeds lawfully, accurately, and without abuse, scraping, fraud, misinformation, or unauthorized access.",
    link: "Acceptable Use",
    href: "/acceptable-use",
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
] as const;

export default function TermsOfUseSummarySection() {
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
            <span className="opacity-50 text-[#0F1F4E]">01</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Plain-English Summary
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">The most important rules, in </span>
            <span style={{ color: ACCENT }}>plain</span>
            <br />
            <span style={{ color: ACCENT }}>English.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {card.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{card.title}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-[#5B6478]">
                  {card.description}
                </p>

                <a
                  href={card.href}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold transition-opacity duration-150 hover:opacity-80"
                  style={{ color: ACCENT }}
                >
                  {card.link} <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `termsSummaryFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes termsSummaryFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}