"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";
const SECTION_BG = "#0D1B3E";
const CARD_BG = "#112154";

const BOUNDARY_CARDS = [
  {
    icon: "no-circle",
    title: "No clinical advice",
    description:
      "No recommending medicines, doses, treatments, substitutes, or clinical decisions.",
  },
  {
    icon: "no-doc",
    title: "No prescription validation",
    description:
      "No validating prescriptions, confirming patient eligibility, or approving dispensing.",
  },
  {
    icon: "no-person",
    title: "No patient data product",
    description:
      "MediBase™ is a medicine identity layer; it is not a patient-level dataset.",
  },
  {
    icon: "no-box",
    title: "No exact stock exposure",
    description:
      "Availability is handled through governed ZoikoAvail™ workflows, not exact stock.",
  },
  {
    icon: "globe",
    title: "Jurisdiction-aware controls",
    description:
      "Identity, identifiers, classifications, and visibility may vary by jurisdiction and license scope.",
  },
  {
    icon: "lock",
    title: "Licensed, contract-scoped use",
    description:
      "Access depends on contract, source licensing, data-use scope, and approved implementation pathway.",
  },
] as const;

type IconName = "no-circle" | "no-doc" | "no-person" | "no-box" | "globe" | "lock";

export default function MediBaseDataTrustSection() {
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
    <section
      ref={ref}
      className="relative w-full py-20 sm:py-24"
      style={{ backgroundColor: SECTION_BG }}
    >
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(15,170,135,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="text-white opacity-40">06</span>
            <span className="text-white opacity-20">·</span>
            Trust &amp; Boundaries
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-white">Governed medicine data, </span>
            <span style={{ color: ACCENT }}>not medical advice.</span>
          </h2>
        </Reveal>

        {/* ── 2×3 boundary cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BOUNDARY_CARDS.map((card, i) => (
            <BoundaryCard key={card.title} card={card} index={i + 2} active={mounted} />
          ))}
        </div>

        {/* ── Dark CTA banner card ── */}
        <Reveal index={9} active={mounted}>
          <div
            className="relative mt-5 overflow-hidden rounded-2xl border px-8 py-12 text-center"
            style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: CARD_BG }}
          >
            {/* Subtle glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(15,170,135,0.07) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <h3 className="mx-auto max-w-xl text-[1.35rem] font-bold leading-snug text-white sm:text-[1.55rem]">
                Build enterprise availability workflows on cleaner medicine identity.
              </h3>
              <p className="mx-auto max-w-md text-[13.5px] leading-relaxed text-[#8FA3C8]">
                Normalize medicine names, identifiers, presentations, and
                jurisdictional context for search, APIs, availability signals,
                and intelligence workflows.
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="#request"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Request MediBase™ Data Briefing
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5 active:scale-[0.97]"
                >
                  Discuss Data/API Access
                </Link>
              </div>
            </div>
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
  card,
  index,
  active,
}: {
  card: typeof BOUNDARY_CARDS[number];
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index} active={active}>
      <div
        className="flex h-full flex-col rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5"
        style={{ backgroundColor: CARD_BG, borderColor: "rgba(255,255,255,0.08)" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(15,170,135,0.35)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
      >
        {/* Icon badge */}
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: "rgba(15,170,135,0.15)", color: ACCENT }}
        >
          <TrustIcon name={card.icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[14px] font-bold text-white">{card.title}</h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-white/50">
          {card.description}
        </p>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function TrustIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 18, height: 18 } };
  switch (name) {
    case "no-circle":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 12h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "no-doc":
      return (
        <svg {...c}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M5 5l14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "no-person":
      return (
        <svg {...c}>
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 20c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "no-box":
      return (
        <svg {...c}>
          <rect x="3" y="7" width="18" height="13" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 7V4h6v3M3 11h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "globe":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "lock":
      return (
        <svg {...c}>
          <rect x="5" y="11" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `mediTrustFadeUp 0.6s ease-out ${index * 80}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes mediTrustFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}