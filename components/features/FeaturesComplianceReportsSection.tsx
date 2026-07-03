"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const REPORT_POINTS = [
  {
    id: "medicine-availability-report",
    label: "Medicine availability report",
    description: "confidence, signal changes, and regional access patterns.",
  },
  {
    id: "shortage-signal-report",
    label: "Shortage signal report",
    description: "potential access pressure and confidence movement with evidence notes.",
  },
  {
    id: "pharmacy-network-report",
    label: "Pharmacy network report",
    description: "participation, verification activity, and network contribution.",
  },
  {
    id: "regional-access-report",
    label: "Regional access report",
    description: "geographic trends by market, city, state, region, or territory.",
  },
  {
    id: "executive-briefing",
    label: "Executive briefing",
    description: "leadership-ready recommendations and decision points.",
  },
  {
    id: "compliance-evidence-report",
    label: "Compliance evidence report",
    description: "governance, auditability, and stakeholder review without unsafe claims.",
  },
] as const;

export default function FeaturesComplianceReportsSection() {
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
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          {/* ── Left: copy ── */}
          <div>
            <Reveal index={0} active={mounted}>
              <p
                className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                Reports and Briefings
              </p>
            </Reveal>

            <Reveal index={1} active={mounted}>
              <h2 className="text-[1.9rem] font-extrabold leading-[1.2] sm:text-[2.2rem]">
                <span className="text-[#0F1F4E]">Compliance-Conscious Reports and </span>
                <span style={{ color: ACCENT }}>Executive Briefings</span>
              </h2>
            </Reveal>

            <Reveal index={2} active={mounted}>
              <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
                ZoikoMeds helps convert medicine availability intelligence into structured reports
                for operations, leadership, partner discussions, public-health review, and
                compliance workflows.
              </p>
            </Reveal>

            {/* ── Checklist ── */}
            <div className="mt-6">
              {REPORT_POINTS.map((point, i) => (
                <Reveal key={point.id} index={3 + i} active={mounted}>
                  <div
                    className="flex items-start gap-2.5 py-3.5"
                    style={{ borderTop: i === 0 ? "none" : "1px solid #E7EAF1" }}
                  >
                    <span className="mt-0.5 shrink-0" style={{ color: ACCENT }}>
                      <CheckIcon />
                    </span>
                    <p className="text-[13.5px] leading-relaxed text-[#5B6478]">
                      <span className="font-bold text-[#0F1F4E]">{point.label}</span> —{" "}
                      {point.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ── Right: visual ── */}
          <Reveal index={2} active={mounted}>
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border sm:aspect-[16/12]"
              style={{ borderColor: "#E7EAF1", boxShadow: "0 20px 48px -20px rgba(15,31,78,0.16)" }}
            >
              {/* Replace src with the real asset, e.g. /images/features-compliance-reports.png */}
              <img
                src="/images/features-compliance-reports.webp"
                alt="Compliance-conscious reports and executive briefings shown on a laptop and printed briefing document, including a medicine availability report and executive summary"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
      <path
        d="M3 8.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
        animation: active ? `featuresComplianceReportsFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes featuresComplianceReportsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}