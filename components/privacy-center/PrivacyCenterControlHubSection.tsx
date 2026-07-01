"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const CARDS = [
  {
    title: "Search privacy",
    description: "Understand anonymous-first search and what is not required to search.",
    cta: "Learn About Search Privacy",
    href: "/search-privacy",
    icon: (
      <>
        <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M10.2 10.2L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Account data",
    description: "View and manage saved searches, alerts, preferences, and profile data.",
    cta: "Manage Account Data",
    href: "/account-data",
    icon: (
      <>
        <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M2.5 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    title: "Saved searches",
    description: "Review, edit, delete, or export saved medicine and location searches.",
    cta: "Manage Saved Searches",
    href: "/saved-searches",
    icon: (
      <path d="M4 2h8v12l-4-2.5L4 14V2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Availability alerts",
    description: "Control alert channels, frequency, pause/resume, and notification privacy.",
    cta: "Manage Alerts",
    href: "/manage-alerts",
    icon: (
      <path d="M8 1.5c-2 0-3.5 1.6-3.5 3.6v2.7c0 .6-.2 1.2-.6 1.7L3 10.5h10l-.9-1c-.4-.5-.6-1.1-.6-1.7V5.1c0-2-1.5-3.6-3.5-3.6zM6.5 12.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Caregiver labels",
    description: "Manage labels used to organize someone else's availability searches.",
    cta: "Manage Caregiver Labels",
    href: "/caregiver-labels",
    icon: (
      <path d="M8 13.5s-5.5-3.2-5.5-7.2A3 3 0 018 4.3a3 3 0 015.5 2c0 4-5.5 7.2-5.5 7.2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Cookie settings",
    description: "Accept, reject, or customize non-essential cookies and tracking choices.",
    cta: "Cookie Settings",
    href: "/cookie-settings",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <circle cx="6" cy="6.5" r="0.9" fill="currentColor" />
        <circle cx="10" cy="7.5" r="0.7" fill="currentColor" />
        <circle cx="7.5" cy="10" r="0.7" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Data request",
    description: "Submit access, correction, deletion, or portability requests where applicable.",
    cta: "Submit Privacy Request",
    href: "/submit-privacy-request",
    icon: (
      <path d="M8 13V3M4.5 6.5L8 3l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Account deletion",
    description: "Start account deletion or understand lawful retention limits.",
    cta: "Delete Account",
    href: "/delete-account",
    icon: (
      <>
        <path d="M3.5 4.5h9M6.5 4.5V3a1 1 0 011-1h1a1 1 0 011 1v1.5M5 4.5l.5 9a1 1 0 001 1h3a1 1 0 001-1l.5-9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </>
    ),
  },
] as const;

export default function PrivacyCenterControlHubSection() {
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
            Privacy Control Hub
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Find the right control in </span>
            <span style={{ color: ACCENT }}>one click.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-[#5B6478]">
            Plain actions, not legal vocabulary — so you can act fast.
          </p>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={3 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {card.icon}
                  </svg>
                </div>

                <h3 className="text-[14px] font-bold text-[#0F1F4E]">{card.title}</h3>
                <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
                  {card.description}
                </p>

                <a
                  href={card.href}
                  className="mt-5 inline-flex w-fit items-center justify-center rounded-lg border border-[#E7EAF1] px-4 py-2.5 text-[12px] font-semibold text-[#0F1F4E] transition-colors duration-150 hover:border-[#0F1F4E]"
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `privacyHubFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes privacyHubFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}