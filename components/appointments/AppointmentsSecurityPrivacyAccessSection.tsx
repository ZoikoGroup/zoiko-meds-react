"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const SECURITY_CARDS = [
  {
    id: "secure-access",
    title: "Secure access",
    description:
      "Protected sign-in, optional 2-step verification, and session controls for your account.",
    icon: (
      <>
        <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "access-controls",
    title: "Access controls",
    description:
      "Manage reminders, shared access, communication preferences, and saved providers.",
    icon: (
      <path
        d="M8 3.5c3 0 5.5 2.5 5.5 5.5S11 14.5 8 14.5 2.5 12 2.5 9 5 3.5 8 3.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "patient-privacy",
    title: "Patient privacy",
    description:
      "Appointment information is handled with privacy-aware, consent-based design.",
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
    id: "non-emergency-boundary",
    title: "Non-emergency boundary",
    description:
      "ZoikoMeds is not for emergencies; urgent situations should go to emergency services.",
    icon: (
      <path
        d="M8 2.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "clinical-boundary",
    title: "Clinical boundary",
    description:
      "ZoikoMeds supports coordination and visibility — not diagnosis, treatment, or prescribing.",
    icon: (
      <path
        d="M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM4.2 4.2l7.6 7.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "accessibility",
    title: "Accessibility",
    description:
      "All dashboards, forms, checklists, and controls meet WCAG 2.2 AA.",
    icon: (
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
    ),
  },
];

export default function AppointmentsSecurityPrivacyAccessSection() {
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
            Security, Privacy &amp; Access
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-white sm:text-[2.3rem]">
            Healthcare-grade trust,{" "}
            <span style={{ color: ACCENT }}>built in.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {SECURITY_CARDS.map((card, i) => (
            <Reveal key={card.id} index={2 + i} active={mounted}>
              <div
                className="flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(15,31,78,0.18)]"
                style={{
                  borderColor: "#E7EAF1",
                  boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                }}
              >
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-250 ease-out hover:scale-110"
                  style={{ backgroundColor: "rgba(19,165,148,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {card.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{card.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
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
        animation: active ? `appointmentsSecurityPrivacyAccessFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes appointmentsSecurityPrivacyAccessFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}