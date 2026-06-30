"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";
const SECTION_BG = "#0D1B3E";
const CARD_BG = "#112154";

const CARDS = [
  {
    icon: "shield",
    title: "Clinical boundary",
    description:
      "No prescribing, dispensing, substitutions, prescription validation, eligibility approval, clinical advice, or replacing provider/pharmacist judgment.",
    value: "protects clinical governance; avoids CDS misclassification.",
  },
  {
    icon: "no-person",
    title: "PHI & data minimization",
    description:
      "Default workflows don't collect diagnosis, symptoms, prescription images, insurance IDs, clinical notes, or medical records.",
    value: "reduces privacy risk; simplifies evaluation.",
  },
  {
    icon: "monitor",
    title: "Exact-stock suppression",
    description:
      "Confidence-based signals; exact pharmacy stock quantities are not publicly exposed.",
    value: "protects pharmacy operations; reduces false certainty.",
  },
  {
    icon: "lock",
    title: "Role-based access",
    description:
      "Organization permissions, role-based access, MFA, SSO readiness, and audit logging on authorized surfaces.",
    value: "supports security and access governance.",
  },
  {
    icon: "doc",
    title: "Contract-scoped outputs",
    description:
      "Intelligence, APIs, data products, and dashboards governed by contract, jurisdiction, and approved data-use scope.",
    value: "supports procurement, legal, and compliance review.",
  },
  {
    icon: "barchart",
    title: "Implementation governance",
    description:
      "Staged through discovery, workflow scoping, security review, pilot design, governance approval, and measured rollout.",
    value: "reduces operational risk; prevents uncontrolled spread.",
  },
] as const;

type IconName = "shield" | "no-person" | "monitor" | "lock" | "doc" | "barchart";

export default function HealthSystemsGovernanceSection() {
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

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="text-white opacity-40">04</span>
            <span className="text-white opacity-20">·</span>
            Governance, Security &amp; Procurement
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-white">Designed for </span>
            <span style={{ color: ACCENT }}>health-system review.</span>
          </h2>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-white/40">
            Enterprise-grade assurance before any workflow evaluation.
          </p>
        </Reveal>

        {/* ── 2×3 cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <GovCard key={card.title} card={card} index={i + 3} active={mounted} />
          ))}
        </div>

        {/* ── Procurement routes bar ── */}
        <Reveal index={9} active={mounted}>
          <div
            className="mt-5 flex items-center gap-3 rounded-2xl border p-4"
            style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <span className="flex-shrink-0 text-[#E05252]">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <circle cx="8" cy="8" r="5" />
              </svg>
            </span>
            <p className="text-[12.5px] leading-relaxed text-white/55">
              Procurement &amp; review routes:{" "}
              <span style={{ color: ACCENT }} className="font-medium">Request Security Pack</span>
              {" · "}
              <span style={{ color: ACCENT }} className="font-medium">Request Data Governance Review</span>
              {" · "}
              <span style={{ color: ACCENT }} className="font-medium">Request Commercial Briefing</span>
              {" · "}
              <span style={{ color: ACCENT }} className="font-medium">Discuss Integration</span>.
            </p>
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
        {/* Icon badge */}
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: "rgba(15,170,135,0.15)", color: ACCENT }}
        >
          <GovIcon name={card.icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[14px] font-bold text-white">{card.title}</h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-white/50">
          {card.description}
        </p>

        {/* Value */}
        <p className="mt-3 text-[12px] leading-relaxed">
          <span className="font-semibold text-white">Value:</span>{" "}
          <span style={{ color: ACCENT }}>{card.value}</span>
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
    case "shield":
      return (
        <svg {...c}>
          <path d="M12 2.5l7 2.8v5c0 4.8-3.1 8-7 9.4C8.1 18.3 5 15 5 10.3v-5l7-2.8z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
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
    case "monitor":
      return (
        <svg {...c}>
          <rect x="3" y="4" width="18" height="13" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "lock":
      return (
        <svg {...c}>
          <rect x="5" y="11" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "doc":
      return (
        <svg {...c}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
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
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `hsGovFadeUp 0.6s ease-out ${index * 80}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes hsGovFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}