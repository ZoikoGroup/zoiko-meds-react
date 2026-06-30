"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const STEPS = [
  {
    number: 1,
    title: "Identify the access barrier",
    description:
      "A patient, care team, discharge planner, or workflow flags that availability may be part of the access problem.",
  },
  {
    number: 2,
    title: "Search or integrate signals",
    description:
      "Check confidence-based availability signals by medicine, location, and approved workflow context.",
  },
  {
    number: 3,
    title: "Normalize medicine identity",
    description:
      "MediBase™ aligns names, brands, generics, strengths, forms, and jurisdictional context.",
  },
  {
    number: 4,
    title: "Interpret availability confidence",
    description:
      "Show signal strength, freshness, and confirmation guidance — never exact public stock.",
  },
  {
    number: 5,
    title: "Guide the patient to confirm",
    description:
      "Direct the patient or caregiver to confirm directly with the pharmacy before traveling or acting.",
  },
  {
    number: 6,
    title: "Support follow-up",
    description:
      "Patients save searches, create alerts, or return when availability signals change.",
  },
  {
    number: 7,
    title: "Aggregate institutional learning",
    description:
      "Contract-scoped, privacy-safe outputs may inform access-risk and shortage intelligence for authorized teams.",
  },
] as const;

export default function HealthSystemsOperatingModelSection() {
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
            Operating Model
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">From patient access question to</span>
          </h2>
        </Reveal>
        <Reveal index={2} active={mounted}>
          <p className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: ACCENT }}>
            pharmacy-confirmed next step.
          </p>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal index={3} active={mounted}>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
            Plain enough for care teams, credible enough for compliance and
            enterprise architecture.
          </p>
        </Reveal>

        {/* ── Row 1: steps 1-3 ── */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.slice(0, 3).map((step, i) => (
            <StepCard key={step.number} step={step} index={i + 4} active={mounted} />
          ))}
        </div>

        {/* ── Row 2: steps 4-6 ── */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.slice(3, 6).map((step, i) => (
            <StepCard key={step.number} step={step} index={i + 7} active={mounted} />
          ))}
        </div>

        {/* ── Row 3: step 7 (left-aligned, 1/3 width) ── */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.slice(6).map((step, i) => (
            <StepCard key={step.number} step={step} index={i + 10} active={mounted} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  StepCard                                                             */
/* ------------------------------------------------------------------ */
function StepCard({
  step,
  index,
  active,
}: {
  step: typeof STEPS[number];
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index} active={active}>
      <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:shadow-[0_10px_24px_-14px_rgba(15,170,135,0.15)]">
        {/* Number badge */}
        <div
          className="flex h-7 w-7 items-center justify-center rounded-full text-[12.5px] font-bold"
          style={{ backgroundColor: "#DCF5EE", color: "#0B7A62" }}
        >
          {step.number}
        </div>

        {/* Title */}
        <h3 className="mt-3.5 text-[13.5px] font-bold text-[#0F1F4E]">{step.title}</h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
          {step.description}
        </p>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `hsOpModelFadeUp 0.6s ease-out ${index * 70}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes hsOpModelFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}