"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const OUTCOMES = [
  {
    id: "better-access-visibility",
    title: "Better access visibility",
    description: "Know where access issues may be developing across the network.",
    retention: "Saved regional dashboards and location views.",
    icon: (
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
    ),
  },
  {
    id: "faster-escalation",
    title: "Faster escalation",
    description:
      "Route access concerns to the right team before they become operational failures.",
    retention: "Escalation queue, owners, SLA status, and history.",
    icon: (
      <path
        d="M2 6l2 2 7-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "stronger-executive-reporting",
    title: "Stronger executive reporting",
    description:
      "Give leadership a recurring view of medicine access pressure and network performance.",
    retention: "Scheduled reports and briefing history.",
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
    id: "reduced-ambiguity",
    title: "Reduced ambiguity",
    description:
      "Avoid confusing search signals with clinical advice or dispensing claims.",
    retention: "Disclaimers, role controls, and responsible workflow design.",
    icon: (
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
    ),
  },
  {
    id: "more-valuable-partner-network",
    title: "More valuable partner network",
    description:
      "Pharmacy participation strengthens availability confidence over time.",
    retention: "Network signal monitoring and participation reports.",
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
];

export default function ClinicNetworksOutcomesRetentionSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">09</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Outcomes &amp; Retention
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Ongoing value and </span>
            <span style={{ color: ACCENT }}>renewal drivers.</span>
          </h2>
        </Reveal>

        {/* ── Outcomes table ── */}
        <Reveal index={2} active={mounted}>
          <div
            className="mt-10 overflow-hidden rounded-2xl border bg-white lg:mt-12"
            style={{
              borderColor: "#E7EAF1",
              boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
            }}
          >
            {OUTCOMES.map((outcome, i) => (
              <div
                key={outcome.id}
                className="flex items-center gap-4 border-b px-6 py-5 sm:gap-6 sm:px-7 sm:py-6"
                style={{ borderColor: i === OUTCOMES.length - 1 ? "transparent" : "#E7EAF1" }}
              >
                {/* Icon */}
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded"
                  style={{ backgroundColor: "rgba(19,165,148,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                    {outcome.icon}
                  </svg>
                </div>

                {/* Title - on same line as icon */}
                <p className="min-w-[140px] text-[13px] font-bold text-[#0F1F4E]">
                  {outcome.title}
                </p>

                {/* Description */}
                <p className="flex-1 text-[13px] leading-relaxed text-[#5B6478]">
                  {outcome.description}
                </p>

                {/* Retention Label + Text */}
                <div className="min-w-[320px] flex-shrink-0">
                  <span
                    className="text-[12px] font-medium"
                    style={{ color: ACCENT }}
                  >
                    Retention:{" "}
                  </span>
                  <span className="text-[13px] leading-relaxed text-[#5B6478]">
                    {outcome.retention}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

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
        animation: active ? `clinicNetworksOutcomesRetentionFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes clinicNetworksOutcomesRetentionFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}