"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const BRIEFING_TYPES = [
  {
    id: "medicine-availability",
    title: "Medicine Availability Intelligence",
    description: "Understand availability signals, access gaps, confidence tiers, and regional medicine visibility.",
    icon: (
      <path d="M2.5 13.5V8.5M6.5 13.5V5M10.5 13.5V9.5M14 13.5V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    ),
  },
  {
    id: "pharmacy-network",
    title: "Pharmacy Network Participation",
    description: "Explore how pharmacy participation, verification, and confirmation workflows can strengthen availability confidence.",
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    id: "wholesale-distributor",
    title: "Wholesale & Distributor Intelligence",
    description: "Discuss responsible demand signals, shortage intelligence, market access patterns, and reporting needs.",
    icon: (
      <>
        <path d="M8 1.5l6 3.5v6L8 14.5 2 11v-6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M2 5l6 3.5L14 5M8 8.5v6" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
      </>
    ),
  },
  {
    id: "public-health-government",
    title: "Public Health & Government",
    description: "Review regional access reporting, shortage awareness, and public-health intelligence use cases.",
    icon: (
      <path d="M8 1.5l6 4v3c0 4-2.6 6.5-6 7.5-3.4-1-6-3.5-6-7.5v-3l6-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    id: "enterprise-partnership",
    title: "Enterprise Partnership or Integration",
    description: "Discuss APIs, data governance, identity, reporting, and strategic integration opportunities.",
    icon: (
      <path d="M5.5 4L2.5 8l3 4M10.5 4l3 4-3 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    id: "other-authorized-inquiry",
    title: "Other Authorized Inquiry",
    description: "Route qualified institutional inquiries that do not fit the standard categories.",
    icon: (
      <path d="M2 3h12v7H6.5L4 12.5V10H2V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    ),
  },
] as const;

export default function RequestABriefingSelectTypeSection() {
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
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
            <span className="opacity-50 text-[#0F1F4E]">01</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Choose Your Briefing
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Start by selecting the </span>
            <span style={{ color: ACCENT }}>right briefing.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[#5B6478]">
            This routes your request to the correct team and tailors the questions to your use
            case.
          </p>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BRIEFING_TYPES.map((type, i) => {
            const isSelected = selected === type.id;
            return (
              <Reveal key={type.id} index={3 + i} active={mounted}>
                <button
                  type="button"
                  onClick={() => setSelected(type.id)}
                  aria-pressed={isSelected}
                  className="group relative flex h-full w-full flex-col rounded-2xl border bg-white p-6 text-left transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(15,31,78,0.18)]"
                  style={{
                    borderColor: isSelected ? ACCENT : "#E7EAF1",
                    boxShadow: isSelected
                      ? "0 12px 28px -12px rgba(15,170,135,0.28)"
                      : "0 4px 24px -10px rgba(15,31,78,0.06)",
                    backgroundColor: isSelected ? "rgba(15,170,135,0.03)" : "#FFFFFF",
                  }}
                >
                  {/* Radio indicator */}
                  <span
                    className="absolute right-5 top-5 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all duration-200"
                    style={{ borderColor: isSelected ? ACCENT : "#D7DCE6" }}
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full transition-transform duration-200 ease-out"
                      style={{
                        backgroundColor: ACCENT,
                        transform: isSelected ? "scale(1)" : "scale(0)",
                      }}
                    />
                  </span>

                  <div
                    className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-250 ease-out group-hover:scale-110"
                    style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                      {type.icon}
                    </svg>
                  </div>

                  <h3 className="pr-6 text-[14.5px] font-bold text-[#0F1F4E]">{type.title}</h3>
                  <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-[#5B6478]">
                    {type.description}
                  </p>

                  <span
                    className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold transition-all duration-200"
                    style={{ color: ACCENT }}
                  >
                    Select this briefing
                    <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden>
                      →
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `requestBriefingSelectFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes requestBriefingSelectFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}