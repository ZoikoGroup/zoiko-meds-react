"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";
const NAVY = "#0F1F4E";

const CARDS = [
  {
    title: "Anonymous-first search",
    description: "Users can search medicine availability without creating an account.",
    icon: (
      <>
        <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M10.2 10.2L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Data minimization",
    description: "Collect only what is needed for search, account features, privacy controls, security, pharmacy participation, and governed intelligence.",
    icon: (
      <>
        <path d="M4 2h8v12H4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M6 5.5h4M6 8h4M6 10.5h2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "No prescription upload required",
    description: "Public search and standard patient accounts do not require prescription images or medical records.",
    icon: (
      <>
        <path d="M4 1.5h6l2.5 2.5V14a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-12a.5.5 0 01.5-.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M5 9l2 2 4-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
  {
    title: "Notification privacy",
    description: "Default notifications avoid sensitive details on lock screens unless you opt into detailed notifications.",
    icon: (
      <path d="M8 1.5c-2 0-3.5 1.6-3.5 3.6v2.7c0 .6-.2 1.2-.6 1.7L3 10.5h10l-.9-1c-.4-.5-.6-1.1-.6-1.7V5.1c0-2-1.5-3.6-3.5-3.6zM6.5 12.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Enterprise data guardrails",
    description: "Enterprise intelligence is aggregated, anonymized, thresholded, and contract-scoped.",
    icon: (
      <path d="M3 13V7.5h2.5V13M6.75 13V4h2.5v9M10.5 13V9.5H13V13" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Security controls",
    description: "Authentication, MFA where appropriate, role-based access, encryption, audit logging, and secure request handling.",
    icon: (
      <>
        <rect x="3.5" y="7" width="9" height="6.5" rx="1" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
] as const;

export default function PrivacyCenterGovernanceSection() {
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
            Governance &amp; Security
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-white sm:text-[2.3rem]">
            Privacy commitments, <span style={{ color: ACCENT }}>in one place.</span>
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

        {/* ── Info banner ── */}
        <Reveal index={8} active={mounted}>
          <div
            className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 p-5"
            style={{ backgroundColor: "rgba(15,170,135,0.06)" }}
          >
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
              <path d="M8 7.25v4M8 5.1v.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <p className="text-[12.5px] leading-relaxed text-white/60">
              ZoikoMeds uses GDPR-conscious, CCPA-conscious, and HIPAA-aware design language and
              routes users to current legal policies rather than making unsupported
              certification claims. Privacy controls, rights requests, retention, and available
              choices may vary by account state, jurisdiction, contract, feature availability,
              and applicable law.
            </p>
          </div>
        </Reveal>

        {/* ── Bottom CTA panel ── */}
        <Reveal index={9} active={mounted}>
          <div
            className="mt-8 rounded-2xl border border-white/10 px-6 py-14 text-center sm:px-12"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <h3 className="mx-auto max-w-lg text-[1.4rem] font-extrabold leading-snug text-white sm:text-[1.6rem]">
              Control your privacy settings in one place.
            </h3>
            <p className="mx-auto mt-4 max-w-md text-[13.5px] leading-relaxed text-white/50">
              Manage cookies, account data, saved searches, alerts, notification preferences,
              data exports, deletion, and privacy requests through the ZoikoMeds Privacy Center.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/privacy-choices"
                className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-[13.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                style={{ backgroundColor: ACCENT }}
              >
                Manage Privacy Choices
              </a>
              <a
                href="#request"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-150 hover:border-white/40"
              >
                Submit Privacy Request
              </a>
            </div>

            <a
              href="/search"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 transition-colors duration-150 hover:text-white"
            >
              Search Without an Account <span aria-hidden>→</span>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `privacyGovernanceFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes privacyGovernanceFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}