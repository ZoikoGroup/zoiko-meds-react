"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const STAKEHOLDER_BRIEFINGS = [
  {
    id: "pharmacy-network",
    description: "Strengthen availability confidence through verified participation.",
    cta: "Request Pharmacy Network Briefing",
    icon: (
      <path
        d="M8 2l5 2.2v3.3c0 3.3-2.1 5.7-5 6.5-2.9-.8-5-3.2-5-6.5V4.2L8 2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "healthcare-access",
    description: "Identify access patterns before they become operational blind spots.",
    cta: "Request Healthcare Access Briefing",
    icon: (
      <path
        d="M8 2l6 4v3c0 4-2.6 6.5-6 7.5-3.4-1-6-3.5-6-7.5V6l6-4z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "wholesale",
    description: "Understand responsible intelligence signals without exposing sensitive inventory data.",
    cta: "Request Wholesale Briefing",
    icon: (
      <>
        <path d="M8 1.5l6 3.5v6L8 14.5 2 11v-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M2 5l6 3.5L14 5M8 8.5v6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
      </>
    ),
  },
  {
    id: "public-health",
    description: "Review regional medicine access patterns and shortage awareness signals.",
    cta: "Request Public Health Briefing",
    icon: (
      <path
        d="M2 14V7.5L8 3l6 4.5V14H9.5v-4h-3v4H2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "enterprise",
    description: "Explore secure integrations, data governance, and strategic partnership models.",
    cta: "Request Enterprise Briefing",
    icon: (
      <path
        d="M5.5 4L2.5 8l3 4M10.5 4l3 4-3 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
] as const;

export default function RequestABriefingByStakeholderSection() {
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
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">05</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Briefings by Stakeholder
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Matched to your </span>
            <span style={{ color: ACCENT }}>organization.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STAKEHOLDER_BRIEFINGS.map((item, i) => (
            <Reveal key={item.id} index={2 + i} active={mounted}>
              <div
                className="group flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(15,31,78,0.18)]"
                style={{
                  borderColor: "#E7EAF1",
                  boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                }}
              >
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-250 ease-out group-hover:scale-110"
                  style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {item.icon}
                  </svg>
                </div>

                <p className="flex-1 text-[13.5px] font-bold leading-relaxed text-[#0F1F4E]">
                  {item.description}
                </p>

                <button
                  type="button"
                  className="mt-5 w-fit rounded-lg border px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-all duration-200 ease-out hover:border-[#0FAA87] hover:text-[#0FAA87]"
                  style={{ borderColor: "#E7EAF1" }}
                >
                  {item.cta}
                </button>
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
        animation: active ? `requestBriefingStakeholderFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes requestBriefingStakeholderFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}