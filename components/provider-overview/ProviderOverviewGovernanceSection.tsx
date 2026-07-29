"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ACCENT = "#0FAA87";

const BOUNDARIES = [
  {
    icon: "no-doc",
    title: "Not a prescribing tool",
    description:
      "ZoikoMeds does not create, modify, validate, transmit, or renew prescriptions.",
  },
  {
    icon: "no-circle",
    title: "Not clinical decision support",
    description:
      "ZoikoMeds does not recommend medicines, doses, substitutes, treatment plans, or clinical decisions.",
  },
  {
    icon: "no-lock",
    title: "Not a pharmacy or dispenser",
    description:
      "ZoikoMeds does not sell, dispense, deliver, reserve, allocate, or guarantee medicines.",
  },
  {
    icon: "no-box",
    title: "No exact public stock counts",
    description:
      "ZoikoMeds displays confidence-based availability signals, not public exact pharmacy stock quantities.",
  },
  {
    icon: "person",
    title: "Pharmacist judgment applies",
    description:
      "Prescription rules, pharmacist judgment, eligibility checks, counseling obligations, pharmacy policy, and local laws always apply.",
  },
  {
    icon: "shield-check",
    title: "Privacy-conscious by design",
    description:
      "Provider workflows avoid unnecessary collection of diagnosis, symptoms, prescription images, insurance details, clinical notes, or patient records.",
  },
] as const;

type IconName = "no-doc" | "no-circle" | "no-lock" | "no-box" | "person" | "shield-check";

export default function ProviderOverviewGovernanceSection() {
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
              Governance and{" "}
              <span style={{ color: ACCENT }}>clinical boundaries.</span>
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
              Stated once, with authority — so clinicians, pharmacy teams,
              legal, and compliance know exactly where ZoikoMeds stops.
            </p>
          </Reveal>
        </div>

        {/* ── 2×3 grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BOUNDARIES.map((item, i) => (
            <BoundaryCard key={item.title} {...item} index={i} active={mounted} />
          ))}
        </div>

        {/* ── CTA button ── */}
        <Reveal index={9} active={mounted}>
          <div className="mt-7">
            <Link
              href="/trust-center"
              className="inline-flex items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
            >
              Visit Trust Center
            </Link>
          </div>
        </Reveal>

        {/* ── Disclaimer bar ── */}
        <Reveal index={10} active={mounted}>
          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#E7EAF1] border-l-4 border-l-[#3B5BDB] bg-white p-5">
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E3E8FB] text-[#3B5BDB]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-[#5B6478]">
              Provider use of ZoikoMeds should support patient access
              conversations — not clinical decision-making, emergency care, or
              regulated prescribing workflows. Availability information must be
              confirmed directly with the pharmacy.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BoundaryCard — horizontal layout: icon left, text right            */
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
    <Reveal index={index + 2} active={active}>
      <div className="flex h-full items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:shadow-[0_8px_24px_-14px_rgba(15,170,135,0.15)]">
        {/* Icon badge */}
        <div
          className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
        >
          <BoundaryIcon name={icon} />
        </div>

        {/* Text */}
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
function BoundaryIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 18, height: 18 } };
  switch (name) {
    case "no-doc":
      // Document with a slash through it
      return (
        <svg {...c}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 5l14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "no-circle":
      // Circle with minus/dash
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 12h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "no-lock":
      // Lock with slash
      return (
        <svg {...c}>
          <rect x="5" y="11" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 5l14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "no-box":
      // Box/inventory with minus
      return (
        <svg {...c}>
          <rect x="3" y="7" width="18" height="13" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 11h18" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 7V4h6v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 14.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "person":
      // Single person outline
      return (
        <svg {...c}>
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 20c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "shield-check":
      // Shield with checkmark
      return (
        <svg {...c}>
          <path
            d="M12 2.5l7 2.8v5c0 4.8-3.1 8-7 9.4C8.1 18.3 5 15 5 10.3v-5l7-2.8z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
          />
          <path d="M9 10.5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
          ? `providerGovFadeUp 0.6s ease-out ${index * 75}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes providerGovFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}