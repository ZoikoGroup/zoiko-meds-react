"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const BOUNDARY_CARDS = [
  {
    icon: "box",
    title: "No exact public stock counts",
    description:
      "ZoikoMeds displays confidence-based availability signals, not exact pharmacy stock quantities.",
  },
  {
    icon: "clock",
    title: "Signal freshness matters",
    description:
      "Signals degrade when they are stale, incomplete, unsupported, or no longer reliable.",
  },
  {
    icon: "shield",
    title: "Controlled medicine safeguards",
    description:
      "Controlled, restricted, high-risk, or jurisdiction-sensitive medicines may be suppressed, limited, or routed through extra controls.",
  },
  {
    icon: "doc",
    title: "Patient-safe language",
    description:
      "Provider-facing guidance avoids false certainty, clinical recommendations, or substitution claims.",
  },
  {
    icon: "doc-minus",
    title: "Data-minimized by default",
    description:
      "Provider signal education does not require diagnosis, symptoms, prescription images, insurance data, or medical records.",
  },
  {
    icon: "layers",
    title: "Versioned signal logic",
    description:
      "User-facing signal labels and definitions are versioned and governed across product, legal, compliance, UX, and pharmacy operations.",
  },
] as const;

type IconName = "box" | "clock" | "shield" | "doc" | "doc-minus" | "layers";

const MAY_REFLECT = [
  "Participating pharmacy updates",
  "Structured pharmacy feeds",
  "Confirmation workflows",
  "Signal freshness",
  "Medicine identity matching",
  "Location relevance",
  "Approved operational data",
  "Aggregated search patterns, where privacy-safe and legally approved",
];

const NEVER_REPRESENT = [
  "Exact public stock count",
  "Dispensing approval",
  "Prescription validation",
  "Clinical suitability",
  "Patient eligibility",
  "Medicine reservation",
  "Treatment recommendation",
  "Official shortage declaration or guaranteed pharmacy fulfillment",
];

export default function AvailabilitySignalsReflectSection() {
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

        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal index={0} active={mounted}>
            <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.2rem]">
              What signals may reflect — and what
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="text-[2rem] font-extrabold leading-tight sm:text-[2.2rem]" style={{ color: ACCENT }}>
              they never represent.
            </p>
          </Reveal>
          <Reveal index={2} active={mounted}>
            <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
              Institutional trust comes from clear limits, stated once with authority.
            </p>
          </Reveal>
        </div>

        {/* ── 2×3 boundary cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BOUNDARY_CARDS.map((card, i) => (
            <BoundaryCard key={card.title} {...card} index={i} active={mounted} />
          ))}
        </div>

        {/* ── May / Never two-column cards ── */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* May reflect */}
          <Reveal index={9} active={mounted}>
            <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
              <p className="mb-4 flex items-center gap-2 text-[13.5px] font-bold" style={{ color: ACCENT }}>
                <CheckIcon />
                Signals may reflect approved inputs such as
              </p>
              <ul className="flex flex-col gap-2.5">
                {MAY_REFLECT.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0" style={{ color: ACCENT }}>
                      <CheckIcon size={14} />
                    </span>
                    <span className="text-[12.5px] leading-relaxed text-[#5B6478]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Never represent */}
          <Reveal index={10} active={mounted}>
            <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
              <p className="mb-4 flex items-center gap-2 text-[13.5px] font-bold text-[#0F1F4E]">
                <XIcon />
                Signals do not represent
              </p>
              <ul className="flex flex-col gap-2.5">
                {NEVER_REPRESENT.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0 text-[#E05252]">
                      <XIcon size={14} />
                    </span>
                    <span className="text-[12.5px] leading-relaxed text-[#5B6478]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>

        {/* ── CTA ── */}
        <Reveal index={11} active={mounted}>
          <div className="mt-7">
            <Link
              href="trust-center"
              className="inline-flex items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
            >
              Visit Trust Center
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BoundaryCard                                                         */
/* ------------------------------------------------------------------ */
function BoundaryCard({
  icon,
  title,
  description,
  index,
  active,
}: {
  icon: IconName;
  title: string;
  description: string;
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index + 3} active={active}>
      <div className="flex h-full items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:shadow-[0_8px_24px_-14px_rgba(15,170,135,0.15)]">
        <div
          className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
        >
          <BoundaryIcon name={icon} />
        </div>
        <div>
          <p className="text-[13.5px] font-bold text-[#0F1F4E]">{title}</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-[#5B6478]">{description}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function BoundaryIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 18, height: 18 } };
  switch (name) {
    case "box":
      return (
        <svg {...c}>
          <rect x="3" y="7" width="18" height="13" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 11h18M9 7V4h6v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 14.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "clock":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "shield":
      return (
        <svg {...c}>
          <path d="M12 2.5l7 2.8v5c0 4.8-3.1 8-7 9.4C8.1 18.3 5 15 5 10.3v-5l7-2.8z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "doc":
      return (
        <svg {...c}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "doc-minus":
      return (
        <svg {...c}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "layers":
      return (
        <svg {...c}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `avSigReflectFadeUp 0.6s ease-out ${index * 70}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes avSigReflectFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}