"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

// Cards rendered in visual order (row-by-row), number is display label
const STEPS = [
  {
    number: 1,
    title: "Identify access need",
    description:
      "The care team identifies that the patient may need help checking availability for a prescribed or discussed medicine.",
  },
  {
    number: 2,
    title: "Search availability signals",
    description:
      "The provider, care coordinator, patient, or caregiver searches by medicine, location, and radius where appropriate.",
  },
  {
    number: 3,
    title: "Explain the signal",
    description:
      "The care team explains whether the result shows a strong, limited, confirmation-needed, or no-current signal.",
  },
  {
    number: 6,
    title: "Keep clinical decisions outside",
    description:
      "Substitutions, dosing, treatment, eligibility, or prescription changes are handled by the appropriate professional or pharmacist.",
  },
  {
    number: 4,
    title: "Guide the confirmation step",
    description:
      "The patient is directed to confirm directly with the pharmacy before traveling.",
  },
  {
    number: 5,
    title: "Support follow-up",
    description:
      "The patient or caregiver can save the search, create an alert, or return when availability changes.",
  },
] as const;

export default function PatientSupportWorkflowSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mx-auto max-w-xl text-center">
          <Reveal index={0} active={mounted}>
            <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.2rem]">
              A simple workflow for safer{" "}
              <span style={{ color: ACCENT }}>availability guidance.</span>
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="mx-auto mt-4 max-w-md text-[14px] leading-relaxed text-[#5B6478]">
              One shared workflow language — simple enough for care
              coordinators, safe for regulated healthcare environments.
            </p>
          </Reveal>
        </div>

        {/* ── 2×3 numbered cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} {...step} index={i} active={mounted} />
          ))}
        </div>

        {/* ── CTA ── */}
        <Reveal index={9} active={mounted}>
          <div className="mt-8">
            <Link
              href="#request"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
              style={{ backgroundColor: ACCENT }}
            >
              Request Workflow Briefing
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  StepCard                                                             */
/* ------------------------------------------------------------------ */
function StepCard({
  number,
  title,
  description,
  index,
  active,
}: {
  number: number;
  title: string;
  description: string;
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index + 2} active={active}>
      <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9FE3D3] hover:shadow-[0_12px_28px_-14px_rgba(15,170,135,0.18)]">
        {/* Number badge */}
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[13px] font-bold"
          style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
        >
          {number}
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[14px] font-bold text-[#0F1F4E]">{title}</h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
          {description}
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
    <div
      style={{
        opacity: active ? undefined : 0,
        animation: active
          ? `patientWorkflowFadeUp 0.6s ease-out ${index * 75}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes patientWorkflowFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}