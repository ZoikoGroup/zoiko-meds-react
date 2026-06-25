"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * InventoryUploadGovernanceSection
 * "Inventory signals are governed before they become public guidance."
 *
 * Layout: centred header + 2×4 governance cards (icon, title, description)
 *         + outlined CTA button + blue-accent disclaimer bar
 *
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";

const GOVERNANCE_ITEMS = [
  {
    icon: "monitor",
    title: "Exact public stock stays hidden",
    description:
      "Inputs are converted into confidence-based signals. ZoikoMeds does not publicly display exact stock counts.",
  },
  {
    icon: "settings",
    title: "Pharmacy visibility controls",
    description:
      "Manage participation settings, visibility preferences, upload methods, and pause controls where supported.",
  },
  {
    icon: "shield",
    title: "Controlled medicine safeguards",
    description:
      "Controlled, restricted, high-risk, or jurisdiction-sensitive medicines may be suppressed, limited, or routed through extra controls.",
  },
  {
    icon: "lock",
    title: "Confidential data protection",
    description:
      "No confidential pricing, wholesale inventory, procurement terms, supplier relationships, or internal notes on public pages.",
  },
  {
    icon: "check-doc",
    title: "Data quality validation",
    description:
      "Files, feeds, and API submissions are validated for structure, format, mapping, freshness, authorization, and medicine identity.",
  },
  {
    icon: "doc",
    title: "Auditability",
    description:
      "Material changes to upload settings, signal participation, visibility, mappings, and integration status are logged.",
  },
  {
    icon: "refresh",
    title: "Signal degradation",
    description:
      "Stale or uncertain inputs degrade gracefully and must not continue to present as strong signals.",
  },
  {
    icon: "person",
    title: "Human & pharmacy control",
    description:
      "Pharmacist judgment, prescription requirements, pharmacy policy, workflow capacity, and local laws remain controlling.",
  },
] as const;

type IconName = typeof GOVERNANCE_ITEMS[number]["icon"];

export default function InventoryUploadGovernanceSection() {
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
        <div className="mx-auto max-w-2xl text-center">
          <Reveal index={0} active={mounted}>
            <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.2rem]">
              Inventory signals are governed before
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="text-[2rem] font-extrabold leading-tight sm:text-[2.2rem]" style={{ color: ACCENT }}>
              they become public guidance.
            </p>
          </Reveal>
          <Reveal index={2} active={mounted}>
            <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
              The commitments that protect exact stock, controlled medicines,
              confidentiality, and pharmacist judgment.
            </p>
          </Reveal>
        </div>

        {/* ── 2×4 grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {GOVERNANCE_ITEMS.map((item, i) => (
            <GovernanceCard key={item.title} {...item} index={i} active={mounted} />
          ))}
        </div>

        {/* ── CTA button ── */}
        <Reveal index={11} active={mounted}>
          <div className="mt-6">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
            >
              View Pharmacy Data Controls
            </Link>
          </div>
        </Reveal>

        {/* ── Disclaimer bar ── */}
        <Reveal index={12} active={mounted}>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5">
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3E8FB] text-[#3B5BDB]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-[#5B6478]">
              Inventory inputs help inform availability confidence. They do not
              guarantee medicine availability, reserve stock, confirm dispensing
              eligibility, allocate supply, or replace pharmacist judgment.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  GovernanceCard                                                       */
/* ------------------------------------------------------------------ */
function GovernanceCard({
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
      <div className="flex items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:shadow-[0_8px_24px_-14px_rgba(15,170,135,0.15)]">
        {/* Icon badge */}
        <div
          className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
        >
          <GovIcon name={icon} />
        </div>

        {/* Content */}
        <div>
          <p className="text-[13.5px] font-bold text-[#0F1F4E]">{title}</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-[#5B6478]">
            {description}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function GovIcon({ name }: { name: IconName }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-4.5 w-4.5", style: { width: 18, height: 18 } };
  switch (name) {
    case "monitor":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="13" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
          />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M12 2.5l7 2.8v5c0 4.8-3.1 8-7 9.4C8.1 18.3 5 15 5 10.3v-5l7-2.8z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
          />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "check-doc":
      return (
        <svg {...common}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 0 1 14.93-4M20 12a8 8 0 0 1-14.93 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 4.5V8h-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 19.5V16h3.5"  stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "person":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 20c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
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
          ? `invGovFadeUp 0.6s ease-out ${index * 70}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes invGovFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}