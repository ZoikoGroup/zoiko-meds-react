"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#2FD4B0";

const PRIVACY_SECURITY_POINTS = [
  {
    id: "account-security",
    title: "Account security",
    description:
      "Password rules, optional 2-step verification, session management, and account recovery.",
    icon: (
      <>
        <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "consent-clarity",
    title: "Consent clarity",
    description:
      "Consent explains communications and data-use scope in plain language before you opt in.",
    icon: (
      <path
        d="M8 2.4l.9 2.7 2.7.9-2.7.9-.9 2.7-.9-2.7-2.7-.9 2.7-.9.9-2.7zM12.6 9.6l.5 1.4 1.4.5-1.4.5-.5 1.4-.5-1.4-1.4-.5 1.4-.5.5-1.4z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "no-sensitive-overexposure",
    title: "No sensitive overexposure",
    description:
      "No diagnosis, clinical notes, exact pharmacy inventory, or unnecessary health details.",
    icon: (
      <path
        d="M3.5 4.5h9M3.5 8h9M3.5 11.5h6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    ),
  },
  {
    id: "responsible-ai-boundaries",
    title: "Responsible AI boundaries",
    description:
      "Any AI-driven suggestions are non-clinical, explainable, and limited to access intelligence.",
    icon: (
      <path
        d="M8 2.4c.35 1.9 1.1 3.05 2.9 3.6-1.8.55-2.55 1.7-2.9 3.6-.35-1.9-1.1-3.05-2.9-3.6 1.8-.55 2.55-1.7 2.9-3.6zM12.4 9.6c.2 1.05.6 1.7 1.6 2-1 .3-1.4.95-1.6 2-.2-1.05-.6-1.7-1.6-2 1-.3 1.4-.95 1.6-2z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "preference-control",
    title: "Preference control",
    description:
      "Manage alert frequency, communication channels, and saved medicines any time.",
    icon: (
      <path
        d="M8 2.5a3.2 3.2 0 013.2 3.2v1.9c0 .9.35 1.76.98 2.4l.42.42H3.4l.42-.42c.63-.64.98-1.5.98-2.4V5.7A3.2 3.2 0 018 2.5zM6.6 12.3a1.4 1.4 0 002.8 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "accessibility",
    title: "Accessibility",
    description:
      "All forms, alerts, controls, dashboards, and modals meet WCAG 2.2 AA.",
    icon: (
      <>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 5.4h.01M8 7.5v3.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
] as const;

export default function PatientPortalPrivacySecuritySection() {
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
    <section ref={ref} className="relative w-full overflow-hidden bg-[#0F1F4E] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60">07</span>
            <span className="opacity-40">·</span>
            Privacy, Consent &amp; Security
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-white">Trust before you </span>
            <span style={{ color: ACCENT }}>enter any data.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {PRIVACY_SECURITY_POINTS.map((point, i) => (
            <Reveal key={point.id} index={2 + i} active={mounted}>
              <div
                className="flex h-full flex-col rounded-2xl border p-6 transition-all duration-250 ease-out hover:-translate-y-1"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  backgroundColor: "rgba(255,255,255,0.035)",
                }}
              >
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-250 ease-out group-hover:scale-110"
                  style={{ backgroundColor: "rgba(47,212,176,0.14)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {point.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-white">{point.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: "#9AA3C0" }}>
                  {point.description}
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
      className="h-full"
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `patientPortalPrivacySecurityFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes patientPortalPrivacySecurityFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}