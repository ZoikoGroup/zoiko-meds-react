"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const USE_CASES = [
  {
    icon: "home",
    title: "Discharge medication access",
    description:
      "Help patients understand availability signals and pharmacy confirmation steps before they leave a hospital, clinic, or outpatient setting.",
    outcome: "Fewer post-discharge access surprises; clearer next steps.",
    cta: "Explore Discharge Support",
    href: "#",
  },
  {
    icon: "people",
    title: "Care navigation & patient access",
    description:
      "Coordinators and navigators guide patients toward availability search, saved searches, alerts, and pharmacy confirmation.",
    outcome: "Consistent access support without becoming clinical care.",
    cta: "Request Workflow Briefing",
    href: "#",
  },
  {
    icon: "pin",
    title: "Ambulatory & specialty care support",
    description:
      "Outpatient and specialty teams support patients who repeatedly struggle with recurring or shortage-prone medicines.",
    outcome: "Better continuity support around access friction.",
    cta: "Explore Care Team Access",
    href: "#",
  },
  {
    icon: "barchart",
    title: "Health-system pharmacy strategy",
    description:
      "Pharmacy leadership reviews availability pressure, confirmation demand, access friction, and signal coverage under governed controls.",
    outcome: "Institutional visibility without public exact-stock exposure.",
    cta: "Request Health System Briefing",
    href: "#",
  },
  {
    icon: "pulse",
    title: "Shortage pressure & access risk",
    description:
      "Aggregated, privacy-safe intelligence to understand emerging access pressure across regions or service lines.",
    outcome: "Earlier visibility into access-risk patterns.",
    cta: "Explore ZoikoSignal™",
    href: "#",
  },
  {
    icon: "code",
    title: "Digital front door integration",
    description:
      "Digital products evaluate availability-aware workflows through ZoikoAvail™ API and patient-safe guidance pathways.",
    outcome: "Availability-aware journeys across digital access channels.",
    cta: "Discuss Integration",
    href: "#",
  },
] as const;

type IconName = "home" | "people" | "pin" | "barchart" | "pulse" | "code";

export default function HealthSystemsUseCasesSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">01</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Health System Use Cases
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Built for the points where </span>
            <span style={{ color: ACCENT }}>medicine access breaks down.</span>
          </h2>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
            Specific institutional workflows across access, discharge, care
            navigation, pharmacy coordination, and shortage visibility.
          </p>
        </Reveal>

        {/* ── 2×3 use case cards ── */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((card, i) => (
            <UseCaseCard key={card.title} card={card} index={i + 3} active={mounted} />
          ))}
        </div>

        {/* ── Disclaimer bar ── */}
        <Reveal index={9} active={mounted}>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5">
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3E8FB] text-[#3B5BDB]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-[#5B6478]">
              ZoikoMeds supports medicine availability guidance and
              access-risk visibility. It does not recommend clinical
              alternatives, change prescriptions, validate dispensing
              eligibility, or replace provider–pharmacist communication
              where required.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  UseCaseCard                                                          */
/* ------------------------------------------------------------------ */
function UseCaseCard({
  card,
  index,
  active,
}: {
  card: typeof USE_CASES[number];
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index} active={active}>
      <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#9FE3D3] hover:shadow-[0_12px_30px_-14px_rgba(15,170,135,0.18)]">
        {/* Dark navy icon badge */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#1A2E5A", color: "#6EE7D0" }}
        >
          <UseCaseIcon name={card.icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[14.5px] font-bold leading-snug text-[#0F1F4E]">
          {card.title}
        </h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
          {card.description}
        </p>

        {/* Outcome */}
        <p className="mt-3 text-[12px] leading-relaxed">
          <span className="font-semibold text-[#0F1F4E]">Outcome:</span>{" "}
          <span style={{ color: ACCENT }}>{card.outcome}</span>
        </p>

        {/* CTA */}
        <Link
          href={card.href}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
        >
          {card.cta}
        </Link>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons — dark navy badge style                                        */
/* ------------------------------------------------------------------ */
function UseCaseIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 20, height: 20 } };
  switch (name) {
    case "home":
      return (
        <svg {...c}>
          <path d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "people":
      return (
        <svg {...c}>
          <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M2 20c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="17" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M22 20c0-2.76-2.24-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "pin":
      return (
        <svg {...c}>
          <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "barchart":
      return (
        <svg {...c}>
          <rect x="4" y="13" width="3.5" height="7" rx="0.6" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10.25" y="9" width="3.5" height="11" rx="0.6" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16.5" y="5" width="3.5" height="15" rx="0.6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...c}>
          <polyline points="2,12 6,12 8,5 10,19 13,9 15,14 17,12 22,12"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "code":
      return (
        <svg {...c}>
          <path d="M9 8l-4 4 4 4M15 8l4 4-4 4"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `hsUseCasesFadeUp 0.6s ease-out ${index * 75}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes hsUseCasesFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}