"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const RETURN_REASONS = [
  {
    id: "saved-searches",
    title: "Saved searches",
    description: "Store medicine, location, and preference criteria to reduce repeat work.",
    icon: (
      <path
        d="M4.5 3h7a1 1 0 011 1v9.2l-4.5-2.6-4.5 2.6V4a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "availability-alerts",
    title: "Availability alerts",
    description: "Get notified when confidence changes or new signals appear.",
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
    id: "medicine-watchlists",
    title: "Medicine watchlists",
    description: "Keep priority medicines visible on your dashboard.",
    icon: (
      <path
        d="M8 13.3S3 10.4 3 6.8A2.6 2.6 0 018 5.3a2.6 2.6 0 015 1.5c0 3.6-5 6.5-5 6.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "weekly-summary",
    title: "Weekly summary",
    description: "Optional digest of saved medicine updates.",
    icon: (
      <path
        d="M4.5 2.5h5.6L12 4.9v8.6a.6.6 0 01-.6.6H4.5a.6.6 0 01-.6-.6V3.1a.6.6 0 01.6-.6zM9.3 2.5v2.6h2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "support-history",
    title: "Support history",
    description: "Keep non-clinical support interactions accessible.",
    icon: (
      <path
        d="M3.2 4.6h9.6a.9.9 0 01.9.9v5a.9.9 0 01-.9.9H8.6L6 13.3v-1.9H3.2a.9.9 0 01-.9-.9v-5a.9.9 0 01.9-.9z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "preference-center",
    title: "Preference center",
    description: "Control alert frequency and communication channels.",
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
    id: "caregiver-mode",
    title: "Caregiver mode",
    description: "Allow permitted caregivers to help manage searches.",
    icon: (
      <path
        d="M8 13.3S3 10.4 3 6.8A2.6 2.6 0 018 5.3a2.6 2.6 0 015 1.5c0 3.6-5 6.5-5 6.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
] as const;

export default function PatientPortalWhyUsersReturnSection() {
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
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">08</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Why Users Return
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Built-in reasons to </span>
            <span style={{ color: ACCENT }}>come back.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {RETURN_REASONS.map((reason, i) => (
            <Reveal key={reason.id} index={2 + i} active={mounted}>
              <div
                className="flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(15,31,78,0.18)]"
                style={{
                  borderColor: "#E7EAF1",
                  boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                }}
              >
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-250 ease-out group-hover:scale-110"
                  style={{ backgroundColor: "rgba(19,165,148,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {reason.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{reason.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {reason.description}
                </p>
              </div>
            </Reveal>
          ))}

          {/* ── Start now (highlighted CTA card) ── */}
          <Reveal index={2 + RETURN_REASONS.length} active={mounted}>
            <Link
              href="/patient-portal/create-account"
              className="flex h-full flex-col rounded-2xl border p-6 transition-all duration-250 ease-out hover:-translate-y-1"
              style={{
                borderColor: "rgba(19,165,148,0.35)",
                backgroundColor: "rgba(19,165,148,0.08)",
              }}
            >
              <div
                className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-white transition-transform duration-250 ease-out group-hover:scale-110"
                style={{ color: ACCENT }}
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path
                    d="M3 8h10M9 4.5L12.5 8 9 11.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">Start now</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                Create your account and set your first alert.
              </p>

              <span
                className="mt-auto inline-flex items-center gap-1 pt-4 text-[13px] font-semibold"
                style={{ color: ACCENT }}
              >
                Create account
                <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                  <path
                    d="M3.5 8h9M8.5 4.5L12 8l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </Reveal>
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
        animation: active ? `patientPortalWhyUsersReturnFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes patientPortalWhyUsersReturnFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}