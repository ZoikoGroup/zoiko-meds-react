"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";
const NAVY = "#0F1F4E";

const CARDS = [
  {
    title: "Patients",
    description: "Search can start without an account. No prescription upload or diagnosis is required for public search.",
    concern: "will my search expose medical information?",
    cta: "Search Without Account",
    href: "/search",
    icon: (
      <>
        <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M10.2 10.2L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Caregivers",
    description: "Caregiver labels are organizational tools — not clinical records or legal authority.",
    concern: "will labels become medical records?",
    cta: "View Caregiver Privacy",
    href: "/caregiver-privacy",
    icon: (
      <path d="M8 13.5s-5.5-3.2-5.5-7.2A3 3 0 018 4.3a3 3 0 015.5 2c0 4-5.5 7.2-5.5 7.2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Pharmacies",
    description: "Public pages use confidence signals and suppress exact public stock counts.",
    concern: "will exact stock be exposed?",
    cta: "View Pharmacy Data Controls",
    href: "/pharmacy-data-controls",
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Providers",
    description: "Provider workflows are data-minimized by default and avoid PHI unless separately governed.",
    concern: "will workflows require PHI?",
    cta: "View Provider Privacy",
    href: "/provider-privacy",
    icon: (
      <path d="M8 1.5l6 4v3c0 4-2.6 6.5-6 7.5-3.4-1-6-3.5-6-7.5v-3l6-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Enterprise buyers",
    description: "Enterprise outputs are aggregated, anonymized, thresholded, and contract-scoped.",
    concern: "is patient-level data sold?",
    cta: "Request Privacy Pack",
    href: "/request-privacy-pack",
    icon: (
      <path d="M8 1.5c-2 0-3.5 1.6-3.5 3.6v2.7c0 .6-.2 1.2-.6 1.7L3 10.5h10l-.9-1c-.4-.5-.6-1.1-.6-1.7V5.1c0-2-1.5-3.6-3.5-3.6zM6.5 12.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    ),
  },
] as const;

export default function PrivacyCenterAudienceSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">03</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Privacy By Audience
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Your privacy, answered for </span>
            <span style={{ color: ACCENT }}>your role.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: NAVY, color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {card.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{card.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {card.description}
                </p>

                <p className="mt-3 flex-1 text-[12.5px] leading-relaxed">
                  <span className="font-semibold text-[#0F1F4E]">Concern: </span>
                  <span className="text-[#9AA1B4]">{card.concern}</span>
                </p>

                <a
                  href={card.href}
                  className="mt-5 inline-flex w-fit items-center justify-center rounded-lg border border-[#E7EAF1] px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-colors duration-150 hover:border-[#0F1F4E]"
                >
                  {card.cta}
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `privacyAudienceFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes privacyAudienceFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}