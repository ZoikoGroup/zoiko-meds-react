"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const CHALLENGES = [
  {
    id: "fragmented-visibility",
    title: "Fragmented visibility across locations",
    problem: "Leadership may lack a consolidated picture of medicine access patterns.",
    solution: "Unified dashboards by facility, region, medicine category, and confidence tier.",
  },
  {
    id: "delayed-recognition",
    title: "Delayed recognition of shortage pressure",
    problem: "Teams may respond after access friction has already escalated.",
    solution: "Early signal monitoring and trend detection across availability and demand patterns.",
  },
  {
    id: "inconsistent-pharmacy",
    title: "Inconsistent pharmacy confirmation",
    problem: "Confidence varies across internal and external pharmacy participation.",
    solution: "Structured confirmation pathways and coverage reporting.",
  },
  {
    id: "inventory-concerns",
    title: "Sensitive inventory & patient-data concerns",
    problem: "Unsafe exposure can create operational, privacy, and compliance risk.",
    solution: "Confidence-based visibility and role-based access controls.",
  },
  {
    id: "manual-reporting",
    title: "Manual executive reporting",
    problem: "Teams spend time compiling reports across disconnected sources.",
    solution: "Compliance-conscious reports and executive briefing outputs.",
  },
];

export default function HospitalSystemsTheChallengeSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">02</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            The Challenge
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Medicine access pressure can emerge before </span>
            <span style={{ color: ACCENT }}>leadership has a complete view.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[#5B6478]">
            Hospital systems operate across many facilities, pharmacies, partners, service lines,
            and regions. Generic analytics, directories, and isolated inventory systems don&apos;t provide
            a responsible, system-wide view.
          </p>
        </Reveal>

        {/* ── Challenges table ── */}
        <Reveal index={3} active={mounted}>
          <div
            className="mt-10 overflow-hidden rounded-2xl border bg-white"
            style={{
              borderColor: "#E7EAF1",
              boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
            }}
          >
            {CHALLENGES.map((challenge, i) => (
              <div
                key={challenge.id}
                className="grid grid-cols-1 items-start gap-4 border-b px-6 py-5 sm:grid-cols-[220px_1fr_1fr] sm:gap-6 sm:px-7 sm:py-6"
                style={{ borderColor: i === CHALLENGES.length - 1 ? "transparent" : "#E7EAF1" }}
              >
                {/* Left: Challenge title with icon */}
                <div className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{ color: "#F97316" }}
                  >
                    <path
                      d="M8 1.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5z"
                      fill="currentColor"
                    />
                  </svg>
                  <p className="text-[13.5px] font-bold text-[#0F1F4E]">
                    {challenge.title}
                  </p>
                </div>

                {/* Middle: Problem */}
                <p className="text-[13px] leading-relaxed text-[#5B6478]">
                  {challenge.problem}
                </p>

                {/* Right: Solution */}
                <p
                  className="text-[13px] leading-relaxed font-medium"
                  style={{ color: ACCENT }}
                >
                  {challenge.solution}
                </p>
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
        animation: active ? `hospitalSystemsThallengeFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes hospitalSystemsThallengeFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}