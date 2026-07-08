"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const SECURITY_CARDS = [
  {
    id: "role-based-access",
    title: "Role-based access control",
    description:
      "Every sensitive dashboard, report, export, and admin function is permission controlled.",
    icon: (
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
    ),
  },
  {
    id: "auditability",
    title: "Auditability",
    description:
      "User activity, report generation, access changes, and workflow actions are traceable.",
    icon: (
      <path
        d="M4.5 2.5h7v11h-7v-11zM6 5h4M6 7.2h4M6 9.4h2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "data-minimization",
    title: "Data minimization",
    description:
      "Only necessary access intelligence is shown to the appropriate role.",
    icon: (
      <path
        d="M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM6.5 8l1.5 1.5 2-2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "no-unsafe-inventory",
    title: "No unsafe inventory exposure",
    description:
      "Exact stock quantities are not publicly exposed to unauthorized users.",
    icon: (
      <path
        d="M2 5l12 6-12 6V5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "responsible-ai-boundaries",
    title: "Responsible AI boundaries",
    description:
      "AI outputs are explainable, non-clinical, reviewable, and framed as operational intelligence.",
    icon: (
      <path
        d="M8 2l1.5 4h4l-3 2.4 1.5 4L8 10l-3.8 2.4 1.5-4-3-2.4h4L8 2z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "clinical-boundary-language",
    title: "Clinical boundary language",
    description:
      "UI copy does not suggest diagnosis, prescribing, treatment, substitution, or medical advice.",
    icon: (
      <path
        d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 4.5v4l3 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "privacy-by-design",
    title: "Privacy by design",
    description:
      "Supports healthcare-adjacent privacy expectations and clear consent language where relevant.",
    icon: (
      <path
        d="M2.5 8.5c0-.8.1-1.5.3-2.2L8 3l5.2 3.3c.2.7.3 1.4.3 2.2v3.5c0 1.8-.7 3.4-1.9 4.6L8 14.5l-4.6-2.9c-1.2-1.2-1.9-2.8-1.9-4.6V8.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "accessibility",
    title: "Accessibility",
    description:
      "Page and product patterns meet WCAG 2.2 AA standards.",
    icon: (
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
    ),
  },
];

export default function ClinicNetworksSecurityPrivacyResponsibleAISection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: "#0B1530" }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-white">08</span>
            <span className="opacity-30 text-white">·</span>
            Security, Privacy &amp; Responsible AI
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-white sm:text-[2.3rem]">
            <span>Enterprise controls, </span>
            <span style={{ color: ACCENT }}>healthcare-safe boundaries.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {SECURITY_CARDS.map((card, i) => (
            <Reveal key={card.id} index={2 + i} active={mounted}>
              <div
                className="flex h-full flex-col rounded-2xl border bg-transparent p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(19,165,148,0.3)]"
                style={{
                  borderColor: "rgba(19,165,148,0.3)",
                }}
              >
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-250 ease-out hover:scale-110"
                  style={{ backgroundColor: "rgba(19,165,148,0.2)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {card.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-white">{card.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#AEB6C9]">
                  {card.description}
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
        animation: active ? `clinicNetworksSecurityPrivacyResponsibleAIFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes clinicNetworksSecurityPrivacyResponsibleAIFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}