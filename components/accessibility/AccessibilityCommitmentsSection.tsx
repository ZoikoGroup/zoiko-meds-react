"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const CARDS = [
  {
    title: "WCAG 2.2 AA baseline",
    description: "ZoikoMeds targets WCAG 2.2 AA as the minimum across public pages and core flows, with stronger contrast for signal-critical UI where practical.",
    link: "Review Commitment",
    href: "/accessibility-commitment",
    icon: (
      <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Keyboard access",
    description: "Navigate search, forms, account flows, settings, and support paths without a mouse.",
    link: "View Keyboard Guidance",
    href: "/keyboard-guidance",
    icon: (
      <>
        <rect x="2" y="4.5" width="12" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M4.5 7h.01M7 7h.01M9.5 7h.01M12 7h.01M5.5 9h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Screen reader support",
    description: "Core pages use semantic structure, visible labels, ARIA only where appropriate, clear headings, and accessible status messages.",
    link: "Report Screen Reader Issue",
    href: "/report-screen-reader-issue",
    icon: (
      <>
        <path d="M2 6.5h2.5L8 3.5v9L4.5 9.5H2v-3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
        <path d="M10.5 5.5a4 4 0 010 5M12.5 3.5a7 7 0 010 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    title: "No color-only meaning",
    description: "Availability signals, status labels, error states, and alerts use icon, text label, and color together.",
    link: "Learn About Signals",
    href: "/availability-confidence",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 1.75v12.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 1.75a6.25 6.25 0 010 12.5z" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Readable healthcare copy",
    description: "User-facing content is plain-language, structured, and readable under stress — especially for patients and caregivers.",
    link: "View Medical Disclaimer",
    href: "/medical-disclaimer",
    icon: (
      <path d="M3 4.5h10M3 8h10M3 11.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    ),
  },
  {
    title: "Reduced motion support",
    description: "Animation should not block understanding and respects reduced-motion preferences where implemented.",
    link: "Report Motion Issue",
    href: "/report-motion-issue",
    icon: (
      <>
        <circle cx="8" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 1.75v1.5M8 12.75v1.5M1.75 8h1.5M12.75 8h1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
] as const;

export default function AccessibilityCommitmentsSection() {
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
            Accessibility Commitments
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Designed to be usable, </span>
            <span style={{ color: ACCENT }}>readable, and</span>
            <br />
            <span style={{ color: ACCENT }}>supportable.</span>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `accessibilityCommitmentsFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes accessibilityCommitmentsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}