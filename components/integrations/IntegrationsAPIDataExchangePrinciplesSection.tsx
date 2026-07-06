"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const PRINCIPLES = [
  {
    id: "api-first",
    title: "API-first where appropriate",
    description:
      "Approved enterprise and partner integrations use secure APIs, scoped credentials, and documented endpoints.",
    icon: (
      <path
        d="M5.5 4L2.5 8l3 4M10.5 4l3 4-3 4"
        stroke="#13A594"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "role-based-access",
    title: "Role-based access",
    description: "Data access aligns to organization type, user role, permissions, and approved use case.",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" stroke="#13A594" strokeWidth="1.4" fill="none" />
        <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="#13A594" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "data-minimization",
    title: "Data minimization",
    description: "Only necessary data moves between systems for the approved workflows.",
    icon: (
      <path
        d="M3 4.5h10M3 8h10M3 11.5h6"
        stroke="#13A594"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "no-clinical-substitution",
    title: "No clinical substitution logic",
    description:
      "Integrations must not provide diagnosis, prescribing, treatment, or medicine substitution advice.",
    icon: (
      <path
        d="M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM4.2 4.2l7.6 7.6"
        stroke="#13A594"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "confidence-based-availability",
    title: "Confidence-based availability",
    description:
      "Availability is represented through signal confidence, not unauthorized exact inventory disclosure.",
    icon: (
      <path
        d="M3 8.5l3 3 7-7"
        stroke="#13A594"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "auditability",
    title: "Auditability",
    description: "Relevant exchanges produce logs, timestamps, system events, and report history.",
    icon: (
      <path
        d="M3 4.5h10M3 8h10M3 11.5h6"
        stroke="#13A594"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "explainability",
    title: "Explainability",
    description:
      "AI-assisted insights include reason codes, confidence context, and review pathways where applicable.",
    icon: (
      <path
        d="M8 2.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5zM12.5 9.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4z"
        stroke="#13A594"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "revocation-rotation",
    title: "Revocation & rotation",
    description:
      "Credentials, tokens, and partner access are revocable and rotatable.",
    icon: (
      <path
        d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 4.5v4l3 2"
        stroke="#13A594"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
] as const;

export default function IntegrationsAPIDataExchangePrinciplesSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>05</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            API &amp; Data Exchange Principles
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Secure, bounded, role-based{" "}
            <span style={{ color: ACCENT }}>data exchange.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.id} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                <div
                  className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${ACCENT}1A` }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {principle.icon}
                  </svg>
                </div>
                <p className="text-[13.5px] font-bold" style={{ color: NAVY }}>
                  {principle.title}
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                  {principle.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  index,
  active,
}: {
  children: React.ReactNode;
  index: number;
  active: boolean;
}) {
  return (
    <div
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `integrationsApiDataExchangeFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes integrationsApiDataExchangeFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}