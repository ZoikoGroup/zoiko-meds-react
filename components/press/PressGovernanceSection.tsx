"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";
const SECTION_BG = "#0D1B3E";
const CARD_BG = "#112154";

const CARDS = [
  {
    icon: "list",
    title: "Claim-controlled communications",
    description:
      "Public statements, metrics, partner claims, product claims, and certification language must be approved before publication.",
  },
  {
    icon: "no-circle",
    title: "No medical advice",
    description:
      "ZoikoMeds does not provide medical, clinical, prescribing, treatment, or substitution advice.",
  },
  {
    icon: "no-doc",
    title: "No pharmacy role",
    description:
      "ZoikoMeds is not a pharmacy and does not prescribe, dispense, sell, deliver, reserve, allocate, or guarantee medicines.",
  },
  {
    icon: "monitor",
    title: "No exact public stock",
    description:
      "ZoikoMeds uses confidence-based availability signals and does not publicly expose exact pharmacy stock quantities.",
  },
  {
    icon: "shield",
    title: "Privacy-conscious reporting",
    description:
      "Press materials must not expose patient data, pharmacy-sensitive data, internal scoring logic, or confidential enterprise information.",
  },
  {
    icon: "refresh",
    title: "Corrections process",
    description:
      "Corrections, clarifications, and statement updates are routed through official communications and legal review.",
  },
] as const;

type IconName = "list" | "no-circle" | "no-doc" | "monitor" | "shield" | "refresh";

export default function PressGovernanceSection() {
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
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(15,170,135,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="text-white opacity-40">05</span>
            <span className="text-white opacity-20">·</span>
            Governance &amp; Legal Boundaries
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-white">Reporting boundaries, </span>
            <span style={{ color: ACCENT }}>stated once.</span>
          </h2>
        </Reveal>

        {/* ── 2×3 cards ── */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <GovCard key={card.title} card={card} index={i + 2} active={mounted} />
          ))}
        </div>

        {/* ── Dark CTA banner ── */}
        <Reveal index={8} active={mounted}>
          <div
            className="relative mt-5 overflow-hidden rounded-2xl border px-8 py-14 text-center"
            style={{ borderColor: "rgba(255,255,255,0.08)", backgroundColor: CARD_BG }}
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(15,170,135,0.07) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <h3 className="mx-auto max-w-xl text-[1.45rem] font-bold leading-snug text-white sm:text-[1.65rem]">
                Need official information about ZoikoMeds?
              </h3>
              <p className="mx-auto max-w-md text-[13.5px] leading-relaxed text-[#8FA3C8]">
                Use approved press resources, company facts, and media
                contact routes for accurate reporting on medicine
                availability infrastructure.
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Contact Media Team
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5 active:scale-[0.97]"
                >
                  Download Press Kit
                </Link>
              </div>
              <Link
                href="/trust-center"
                className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-white/60 transition-colors hover:text-white"
              >
                Visit Trust Center
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  GovCard                                                              */
/* ------------------------------------------------------------------ */
function GovCard({
  card,
  index,
  active,
}: {
  card: typeof CARDS[number];
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
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: "rgba(15,170,135,0.15)", color: ACCENT }}
        >
          <GovIcon name={card.icon} />
        </div>

        <h3 className="mt-4 text-[14px] font-bold text-white">{card.title}</h3>

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
function GovIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 18, height: 18 } };
  switch (name) {
    case "list":
      return (
        <svg {...c}>
          <path d="M8 6h13M8 12h13M8 18h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="3.5" cy="6" r="1.3" fill="currentColor" />
          <circle cx="3.5" cy="12" r="1.3" fill="currentColor" />
          <circle cx="3.5" cy="18" r="1.3" fill="currentColor" />
        </svg>
      );
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
    case "monitor":
      return (
        <svg {...c}>
          <rect x="3" y="4" width="18" height="13" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg {...c}>
          <path d="M12 2.5l7 2.8v5c0 4.8-3.1 8-7 9.4C8.1 18.3 5 15 5 10.3v-5l7-2.8z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...c}>
          <path d="M4 12a8 8 0 0 1 14.93-4M20 12a8 8 0 0 1-14.93 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M18 4.5V8h-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 19.5V16h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `pressGovFadeUp 0.6s ease-out ${index * 80}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes pressGovFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}