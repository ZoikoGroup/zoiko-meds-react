"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ReportsAnatomySection
 * "What a high-quality report contains."
 *
 * Layout: left-aligned eyebrow (02 · INSIDE A ZOIKOMEDS REPORT) + 1-line headline (black + teal)
 *         + subtext + full-width white card containing 8 numbered rows:
 *           numbered teal badge | bold title + description | muted "why it matters" text.
 *
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";

const SECTIONS = [
  {
    title: "Executive summary",
    description: "Plain-language overview of key availability patterns, confidence movement, access concerns, and review priorities.",
    why: "Supports fast decision-making by leadership.",
  },
  {
    title: "Scope & method notes",
    description: "Report date, region, medicine category, data sources, confidence logic, exclusions, and disclaimers.",
    why: "Prevents overclaiming and supports governance.",
  },
  {
    title: "Availability confidence",
    description: "Confidence tiers, signal strength, regional movement, category trends, and confirmation coverage.",
    why: "Communicates availability without exposing exact inventory.",
  },
  {
    title: "Shortage & access signals",
    description: "Emerging risk indicators, demand movement, confidence decline, access-gap patterns, and review flags.",
    why: "Supports early operational awareness.",
  },
  {
    title: "Pharmacy network activity",
    description: "Participation signals, confirmation cadence, regional coverage, and verification quality.",
    why: "Shows the value of network participation.",
  },
  {
    title: "Regional access view",
    description: "Map, heat zones, high-interest areas, and access-risk clusters.",
    why: "Helps teams prioritize outreach and market response.",
  },
  {
    title: "Governance & compliance notes",
    description: "Data-use limitations, AI boundaries, audit-trail references, report owner, and disclaimer text.",
    why: "Protects trust, compliance, and enterprise adoption.",
  },
  {
    title: "Recommended operational review",
    description: "Non-clinical next steps such as review coverage, engage partner network, request briefing, or monitor threshold.",
    why: "Converts insight into responsible action.",
  },
] as const;

export default function ReportsAnatomySection() {
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
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">02</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Inside A ZoikoMeds Report
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">What a high-quality </span>
            <span style={{ color: ACCENT }}>report contains.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 text-[14px] leading-relaxed text-[#5B6478]">
            Know the anatomy before you request access — every section earns its place.
          </p>
        </Reveal>

        {/* ── Anatomy card ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)]">
            <div className="divide-y divide-[#F0F2F7]">
              {SECTIONS.map((section, i) => (
                <div
                  key={section.title}
                  className="grid grid-cols-1 items-start gap-4 px-6 py-5 transition-colors duration-150 hover:bg-[#F8FAFC] sm:grid-cols-[auto_1.6fr_1fr] sm:gap-6 sm:px-8"
                >
                  {/* Number badge */}
                  <span
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[12.5px] font-bold"
                    style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
                  >
                    {i + 1}
                  </span>

                  {/* Title + description */}
                  <div>
                    <h3 className="text-[13.5px] font-bold text-[#0F1F4E]">{section.title}</h3>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-[#5B6478]">
                      {section.description}
                    </p>
                  </div>

                  {/* Why it matters */}
                  <p className="text-[12.5px] leading-relaxed text-[#9AA1B4] sm:text-right">
                    {section.why}
                  </p>
                </div>
              ))}
            </div>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `reportsAnatomyFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes reportsAnatomyFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}