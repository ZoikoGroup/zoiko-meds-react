"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const WORKFLOW_STEPS = [
  {
    id: "capture-signals",
    number: 1,
    title: "Capture signals",
    description:
      "Structured access, demand, pharmacy, and partner signals — verified, inferred, partner-provided, or pending.",
  },
  {
    id: "classify-confidence",
    number: 2,
    title: "Classify confidence",
    description:
      "Availability confidence by region, category, and facility group with trend arrows.",
  },
  {
    id: "identify-risk",
    number: 3,
    title: "Identify risk",
    description:
      "Access-risk movement and potential shortage pressure with explainable signals.",
  },
  {
    id: "route-review",
    number: 4,
    title: "Route review",
    description:
      "Review tasks to authorized teams via an action queue with role-based ownership.",
  },
  {
    id: "generate-reports",
    number: 5,
    title: "Generate reports",
    description:
      "Leadership and compliance-conscious reports with source context, timestamps, and disclaimers.",
  },
  {
    id: "retain-intelligence",
    number: 6,
    title: "Retain intelligence",
    description:
      "Saved views, briefing history, and recurring report schedules.",
  },
] as const;

export default function HospitalSystemsWorkflowMapSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">05</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Hospital Workflow Map
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">From signals to intelligence, </span>
            <span style={{ color: ACCENT }}>reports, and operational action.</span>
          </h2>
        </Reveal>

        {/* ── Step grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-6">
          {WORKFLOW_STEPS.map((step, i) => (
            <Reveal key={step.id} index={2 + i} active={mounted}>
              <div
                className="flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(15,31,78,0.18)]"
                style={{
                  borderColor: "#E7EAF1",
                  boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                }}
              >
                <div
                  className="mb-4 flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold text-white transition-transform duration-250 ease-out group-hover:scale-110"
                  style={{ backgroundColor: ACCENT }}
                >
                  {step.number}
                </div>

                <h3 className="text-[14px] font-bold text-[#0F1F4E]">{step.title}</h3>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#5B6478]">
                  {step.description}
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
        animation: active ? `hospitalSystemsWorkflowMapFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes hospitalSystemsWorkflowMapFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}