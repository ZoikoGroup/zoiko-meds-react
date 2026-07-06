"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const IMPLEMENTATION_STEPS = [
  {
    id: "request-sample",
    step: 1,
    title: "Request sample",
    description: "Tell us which systems and use cases matter to your team.",
  },
  {
    id: "scope-alignment",
    step: 2,
    title: "Scope alignment",
    description: "Confirm systems, stakeholders, regions, and governance requirements.",
  },
  {
    id: "sandbox-review",
    step: 3,
    title: "Sandbox review",
    description: "Connect a sandbox and review the integration model safely.",
  },
  {
    id: "pilot",
    step: 4,
    title: "Pilot",
    description: "Run a limited production pilot with monitoring and rollback.",
  },
  {
    id: "go-live",
    step: 5,
    title: "Go-live",
    description: "Activate production with support and reporting cadence.",
  },
  {
    id: "ongoing-review",
    step: 6,
    title: "Ongoing review",
    description: "Monitor sync health, adoption, governance, and expansion.",
  },
] as const;

export default function IntegrationsImplementationPathSection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>10</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Implementation Path
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            A phased rollout with clear{" "}
            <span style={{ color: ACCENT }}>acceptance gates.</span>
          </h2>
        </Reveal>

        {/* ── Step cards grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 xl:grid-cols-6">
          {IMPLEMENTATION_STEPS.map((step, i) => (
            <Reveal key={step.id} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                {/* Step badge */}
                <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#0B1530] text-[12px] font-bold text-white">
                  {step.step}
                </div>

                {/* Title */}
                <p className="text-[13.5px] font-bold" style={{ color: NAVY }}>
                  {step.title}
                </p>

                {/* Description */}
                <p className="mt-2 text-[12px] leading-relaxed" style={{ color: `${NAVY}99` }}>
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
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `integrationsImplementationPathFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes integrationsImplementationPathFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}