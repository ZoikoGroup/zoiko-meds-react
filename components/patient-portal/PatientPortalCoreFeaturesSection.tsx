"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const CORE_FEATURES = [
  {
    id: "personal-dashboard",
    title: "Personal dashboard",
    description:
      "Saved medicines, alerts, access activity, account status, and non-clinical next steps.",
    caption: "A reason to return each week.",
    icon: (
      <>
        <circle cx="8" cy="5.4" r="2.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path
          d="M3.4 13c0-2.4 2.06-4 4.6-4s4.6 1.6 4.6 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
  },
  {
    id: "saved-medicine-watchlists",
    title: "Saved medicine watchlists",
    description:
      "Save medicines, dosage forms, locations, and search preferences.",
    caption: "Builds ongoing personalization.",
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
    id: "availability-alert-center",
    title: "Availability alert center",
    description:
      "Subscribe to confidence changes, pharmacy network updates, and regional access signals.",
    caption: "Turns search intent into engagement.",
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
    id: "search-history",
    title: "Search history",
    description: "Review prior searches and update saved criteria.",
    caption: "Reduces repeat friction.",
    icon: (
      <>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 5.2V8l2 1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    id: "pharmacy-information-links",
    title: "Pharmacy information links",
    description:
      "Where appropriate, view pharmacy information or verified participation status.",
    caption: "Safe progression to action.",
    icon: (
      <path
        d="M3 6.2L8 3l5 3.2v6.6a.7.7 0 01-.7.7H3.7a.7.7 0 01-.7-.7V6.2z M6.3 12.5V9.2h3.4v3.3"
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
    description: "Review non-clinical support requests and responses.",
    caption: "Builds trust, fewer repeat tickets.",
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
    id: "privacy-consent-controls",
    title: "Privacy & consent controls",
    description:
      "Manage email, SMS, data-use preferences, and account security.",
    caption: "Improves trust and readiness.",
    icon: (
      <>
        <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "caregiver-support-pathway",
    title: "Caregiver support pathway",
    description:
      "Optionally support caregiver-managed searches with clear permissions.",
    caption: "Household-level relevance.",
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

export default function PatientPortalCoreFeaturesSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">04</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Core Portal Features
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Built to organize </span>
            <span style={{ color: ACCENT }}>medicine access, safely.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {CORE_FEATURES.map((feature, i) => (
            <Reveal key={feature.id} index={2 + i} active={mounted}>
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
                    {feature.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{feature.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {feature.description}
                </p>

                <div className="mt-auto pt-4">
                  <div className="border-t pt-3" style={{ borderColor: "#ECEFF5" }}>
                    <p className="text-[12px] font-medium italic" style={{ color: ACCENT }}>
                      {feature.caption}
                    </p>
                  </div>
                </div>
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
        animation: active ? `patientPortalCoreFeaturesFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes patientPortalCoreFeaturesFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}