"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const CARDS = [
  {
    title: "Screen readers",
    description: "Pages use semantic HTML, correct heading order, descriptive links, labelled controls, accessible dialogs, and status updates announced through assistive technology.",
    link: "Report Issue",
    href: "/report-screen-reader-issue",
    icon: (
      <>
        <path d="M2 6.5h2.5L8 3.5v9L4.5 9.5H2v-3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
        <path d="M10.5 5.5a4 4 0 010 5M12.5 3.5a7 7 0 010 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    title: "Keyboard-only use",
    description: "All interactive components are reachable, operable, and visible via keyboard — including modals, filters, forms, cookie settings, and support flows.",
    link: "View Keyboard Standard",
    href: "/keyboard-standard",
    icon: (
      <>
        <rect x="2" y="4.5" width="12" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M4.5 7h.01M7 7h.01M9.5 7h.01M12 7h.01M5.5 9h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Focus & error states",
    description: "Focus states are visible. Errors are explained in text, tied to fields, and announced without exposing sensitive data.",
    link: "Report Form Issue",
    href: "/report-form-issue",
    icon: (
      <path d="M8 1.5v2M8 12.5v2M2.6 4.2l1.4 1.4M12 10.4l1.4 1.4M1.5 8h2M12.5 8h2M2.6 11.8l1.4-1.4M12 5.6l1.4-1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    ),
  },
  {
    title: "Mobile & touch",
    description: "Touch targets are at least 44px, with 48px preferred for high-friction healthcare journeys and older users.",
    link: "Search Medicines",
    href: "/search",
    icon: (
      <>
        <rect x="4.5" y="2" width="7" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M7 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Color & contrast",
    description: "Critical text, signal labels, CTAs, and status messages meet accessible contrast requirements and avoid color-only meaning.",
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
    title: "Plain language",
    description: "Patient and caregiver copy targets Grade 6–8 readability where practical, especially in search, alerts, disclaimers, and support flows.",
    link: "Review Medical Disclaimer",
    href: "/medical-disclaimer",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M1.75 8h12.5M8 1.75c1.7 1.8 2.6 4 2.6 6.25S9.7 12.45 8 14.25c-1.7-1.8-2.6-4-2.6-6.25S6.3 3.55 8 1.75z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </>
    ),
  },
] as const;

export default function AccessibilitySupportSection() {
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
            Assistive Technology &amp; Usability Support
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Support for real users, real devices, and </span>
            <span style={{ color: ACCENT }}>real constraints.</span>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `accessibilitySupportFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes accessibilitySupportFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}