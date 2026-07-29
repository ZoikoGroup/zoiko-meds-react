"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ACCENT = "#0FAA87";
const SECTION_BG = "#0D1B3E";
const CARD_BG = "#112154";

const CARDS = [
  {
    icon: "shield",
    title: "Privacy & data governance",
    bullets: [
      "No identifiable patient-level data sales",
      "Aggregation & anonymization controls",
      "Privacy thresholds for intelligence outputs",
      "Contract-scoped data products",
      "Jurisdiction-aware data rights",
      "Data minimization by default",
    ],
    cta: "View Data Governance",
    href: "/privacy-center",
  },
  {
    icon: "lock",
    title: "Security & access control",
    bullets: [
      "Role-based access",
      "Organization-level permissions",
      "Encryption in transit and at rest",
      "Audit logging for enterprise surfaces",
      "SSO readiness where applicable",
      "Step-up authentication for sensitive actions",
    ],
    cta: "Request Security Pack",
    href: "/security",
  },
  {
    icon: "doc",
    title: "Commercial & procurement",
    bullets: [
      "Enterprise subscriptions",
      "API & data licensing",
      "Dashboard & intelligence access",
      "Public-sector contract structures",
      "Integration & implementation scope",
      "MSA governance, jurisdiction-scoped terms",
    ],
    cta: "Request Commercial Briefing",
    href: "/request-a-briefing",
  },
] as const;

type IconName = "shield" | "lock" | "doc";

export default function EnterpriseSolutionsGovernanceSection() {
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
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(15,170,135,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">

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
          <h2 className="text-[2rem] font-extrabold leading-tight text-white sm:text-[2.3rem]">
            Built to clear enterprise review.
          </h2>
        </Reveal>

        {/* ── 3-column cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <GovernanceCard key={card.title} card={card} index={i + 2} active={mounted} />
          ))}
        </div>

        {/* ── Bottom disclaimer bar ── */}
        <Reveal index={6} active={mounted}>
          <div
            className="mt-6 flex items-center gap-3 rounded-2xl border p-4"
            style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <span className="flex-shrink-0" style={{ color: ACCENT }}>
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-[12.5px] leading-relaxed text-white/50">
              Enterprise access is governed by verification, contract,
              jurisdiction, data-use scope, privacy controls, and approved
              implementation pathways.
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
        className="flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-0.5"
        style={{
          backgroundColor: CARD_BG,
          borderColor: "rgba(255,255,255,0.08)",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(15,170,135,0.35)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
      >
        {/* Icon badge */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "rgba(15,170,135,0.15)", color: ACCENT }}
        >
          <GovIcon name={card.icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[15px] font-bold text-white">{card.title}</h3>

        {/* Bullet list */}
        <ul className="mt-3 flex flex-1 flex-col gap-2">
          {card.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span
                className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              <span className="text-[12.5px] leading-relaxed text-white/55">{b}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href={card.href}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl border px-4 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/5 active:scale-[0.97]"
          style={{ borderColor: "rgba(255,255,255,0.2)" }}
        >
          {card.cta}
        </Link>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function GovIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 20, height: 20 } };
  switch (name) {
    case "shield":
      return (
        <svg {...c}>
          <path d="M12 2.5l7 2.8v5c0 4.8-3.1 8-7 9.4C8.1 18.3 5 15 5 10.3v-5l7-2.8z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
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
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `entGovFadeUp 0.6s ease-out ${index * 85}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes entGovFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}