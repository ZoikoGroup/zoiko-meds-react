"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const CHALLENGE_ROWS = [
  {
    id: "fragmented-patient-access-feedback",
    title: "Fragmented patient access feedback",
    problem: "Teams rely on anecdotal reports and inconsistent escalation paths.",
    solutionLead: "Structured signal capture and ",
    solutionHighlight: "location-level dashboards.",
  },
  {
    id: "uneven-pharmacy-visibility",
    title: "Uneven pharmacy visibility",
    problem: "Clinics cannot easily see where access confidence is strengthening or weakening.",
    solutionLead: "Pharmacy network signal intelligence and ",
    solutionHighlight: "confidence movement.",
  },
  {
    id: "regional-shortages-or-access-pressure",
    title: "Regional shortages or access pressure",
    problem: "Leaders may detect issues late, after patient friction increases.",
    solutionLead: "Shortage signal awareness and ",
    solutionHighlight: "regional access monitoring.",
  },
  {
    id: "no-central-reporting-layer",
    title: "No central reporting layer",
    problem: "Executives lack repeatable briefing material for operations and governance.",
    solutionLead: "Recurring reports, executive summaries, and ",
    solutionHighlight: "evidence-ready exports.",
  },
  {
    id: "clinical-compliance-sensitivity",
    title: "Clinical & compliance sensitivity",
    problem: "Unsafe wording can create risk around advice, prescribing, or dispensing.",
    solutionLead: "Bounded operating language, disclaimers, and ",
    solutionHighlight: "role-based controls.",
  },
] as const;

export default function ClinicNetworksChallengeSection() {
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
            <span className="text-[#0F1F4E]">Clinic networks need more than </span>
            <span style={{ color: ACCENT }}>isolated location data.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-3xl text-[14.5px] leading-relaxed text-[#5B6478]">
            When medicine access issues appear across multiple clinics, leaders need to know
            whether the problem is local, regional, medicine-specific, pharmacy-network related,
            or part of a wider shortage pattern. ZoikoMeds turns fragmented access signals into
            a coordinated operating view.
          </p>
        </Reveal>

        {/* ── Table ── */}
        <Reveal index={3} active={mounted}>
          <div
            className="mt-10 overflow-hidden rounded-2xl border bg-white lg:mt-12"
            style={{
              borderColor: "#E7EAF1",
              boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
            }}
          >
            {CHALLENGE_ROWS.map((row, i) => (
              <div
                key={row.id}
                className={`grid grid-cols-1 gap-2 px-6 py-5 sm:grid-cols-3 sm:gap-6 ${i !== 0 ? "border-t" : ""}`}
                style={{ borderColor: "#ECEFF5" }}
              >
                <div className="flex items-start gap-2">
                  <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#C97A1E" }}>
                    <path
                      d="M8 1.6L14.9 13.4a1 1 0 01-.86 1.5H2a1 1 0 01-.87-1.5L8 1.6z"
                      stroke="currentColor"
                      strokeWidth="1.3"
                      strokeLinejoin="round"
                      fill="none"
                    />
                    <path d="M8 6.4v3.2M8 11.6h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <span className="text-[13.5px] font-bold text-[#0F1F4E]">{row.title}</span>
                </div>

                <p className="text-[13px] leading-relaxed text-[#8A93A8]">{row.problem}</p>

                <p className="text-[13px] leading-relaxed text-[#0F1F4E]">
                  {row.solutionLead}
                  <span className="font-semibold" style={{ color: ACCENT }}>
                    {row.solutionHighlight}
                  </span>
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
        animation: active ? `clinicNetworksChallengeFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes clinicNetworksChallengeFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}