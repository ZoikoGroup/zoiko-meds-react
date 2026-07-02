"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const MODULES = [
  {
    id: "platform-overview",
    title: "Platform overview",
    description:
      "ZoikoMeds as medicine availability infrastructure — not a pharmacy or marketplace.",
    icon: (
      <path
        d="M3 4.5h10M3 8h10M3 11.5h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "medicine-availability-intelligence",
    title: "Medicine availability intelligence",
    description:
      "How availability confidence, regional access signals, and demand patterns support decisions.",
    icon: (
      <path
        d="M2.5 10.5l3.2-3.5 2.3 2 3.5-4.5M11.5 4.5h2v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "ai-insights",
    title: "AI insights",
    description:
      "Predictive shortage signals, access risk scoring, and responsible AI guardrails.",
    icon: (
      <path
        d="M8 2.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5zM12.5 9.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "pharmacy-network-workflows",
    title: "Pharmacy network workflows",
    description:
      "Participation, confirmation, verification, and network signal strength.",
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
    id: "reports-compliance",
    title: "Reports & compliance",
    description:
      "Stakeholder-ready reporting, auditability, and governance controls.",
    icon: (
      <path
        d="M4.5 2.5h7v11h-7v-11zM6 5h4M6 7.2h4M6 9.4h2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "integration-commercial-path",
    title: "Integration & commercial path",
    description:
      "API, data, rollout, procurement, and partnership next steps.",
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

export default function RequestABriefingAgendaModulesSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">04</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            What a Briefing Can Cover
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Agenda modules, </span>
            <span style={{ color: ACCENT }}>tailored to you.</span>
          </h2>
        </Reveal>

        {/* ── Module grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module, i) => (
            <Reveal key={module.id} index={2 + i} active={mounted}>
              <div
                className="group relative flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(15,31,78,0.18)]"
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
                    {module.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{module.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {module.description}
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
        animation: active ? `requestBriefingAgendaFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes requestBriefingAgendaFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}