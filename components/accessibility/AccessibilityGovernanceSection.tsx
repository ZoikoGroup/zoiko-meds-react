"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";
const NAVY = "#0F1F4E";

const CARDS = [
  {
    title: "Built into review",
    description: "Accessibility requirements are included in design review, QA, release readiness, and acceptance criteria for public and authenticated surfaces.",
    icon: (
      <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "High-impact flows first",
    description: "Search, account creation, alerts, pharmacy portal, provider workflows, and enterprise forms receive priority accessibility validation.",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 4.75V8l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Severity-based triage",
    description: "Defects are triaged by severity, user impact, surface criticality, and legal/compliance relevance.",
    icon: (
      <path d="M3 4.5h10M3 8h10M3 11.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    ),
  },
  {
    title: "Privacy-safe remediation",
    description: "Remediation preserves privacy, security, medical boundaries, and jurisdiction-specific requirements.",
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Data minimization",
    description: "We collect only what is needed to identify, reproduce, triage, and resolve an accessibility issue.",
    icon: (
      <path d="M3 4.5h10M3 8h10M3 11.5h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    ),
  },
  {
    title: "Connected controls",
    description: "Cross-linked with Privacy Center, Trust Center, Cookie Settings, Medical Disclaimer, and Contact.",
    icon: (
      <path d="M2 3h12v7H6.5L4 12.5V10H2V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    ),
  },
] as const;

export default function AccessibilityGovernanceSection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: NAVY }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-60 text-white">05</span>
            <span className="opacity-40 text-white">·</span>
            Governance &amp; Trust
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-white sm:text-[2.3rem]">
            Accessibility is part of <span style={{ color: ACCENT }}>product</span>
            <br />
            <span style={{ color: ACCENT }}>governance.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div
                className="flex h-full flex-col rounded-2xl border border-white/10 p-6"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <div
                  className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(15,170,135,0.15)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {card.icon}
                  </svg>
                </div>

                <h3 className="text-[14px] font-bold text-white">{card.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/50">
                  {card.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Bottom CTA panel ── */}
        <Reveal index={8} active={mounted}>
          <div
            className="mt-8 rounded-2xl border border-white/10 px-6 py-14 text-center sm:px-12"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <h3 className="mx-auto max-w-lg text-[1.4rem] font-extrabold leading-snug text-white sm:text-[1.6rem]">
              Help us make ZoikoMeds easier to use.
            </h3>
            <p className="mx-auto mt-4 max-w-md text-[13.5px] leading-relaxed text-white/50">
              Report accessibility barriers, request help with a ZoikoMeds journey, or review
              how accessibility is governed across medicine availability infrastructure.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#report-issue"
                className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-[13.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                style={{ backgroundColor: ACCENT }}
              >
                Report Accessibility Issue
              </a>
              <a
                href="/contact-support"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-150 hover:border-white/40"
              >
                Contact Support
              </a>
            </div>

            <a
              href="/privacy-center"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 transition-colors duration-150 hover:text-white"
            >
              Visit Privacy Center <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `accessibilityGovernanceFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes accessibilityGovernanceFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}