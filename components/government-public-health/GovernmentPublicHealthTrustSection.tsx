"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";
const SECTION_BG = "#0D1B3E";
const CARD_BG = "#112154";

const CARDS = [
  {
    icon: "no-person",
    title: "No identifiable patient intelligence",
    description:
      "No patient behavior, search histories, identities, or individualized health inferences.",
  },
  {
    icon: "monitor",
    title: "No exact public stock",
    description:
      "Confidence-based signals and aggregation; exact stock stays suppressed unless separately governed and approved.",
  },
  {
    icon: "target",
    title: "Privacy thresholds",
    description:
      "Outputs must meet aggregation and privacy thresholds before public-sector visibility.",
  },
  {
    icon: "globe",
    title: "Jurisdiction-aware controls",
    description:
      "Access, data use, controlled medicine handling, retention, and communications align to jurisdiction rules.",
  },
  {
    icon: "chat",
    title: "Public communications control",
    description:
      "Approved language and boundaries to prevent false certainty, panic, or unsupported shortage claims.",
  },
  {
    icon: "lock",
    title: "Controlled medicine safeguards",
    description:
      "Sensitive medicines may require suppression, stricter thresholds, or special routing.",
  },
  {
    icon: "list",
    title: "Auditability",
    description:
      "Access, export, dashboard configuration, data scope, and major output changes are logged.",
  },
  {
    icon: "doc",
    title: "Contract-scoped data use",
    description:
      "Each implementation defines permitted use, prohibited use, retention, outputs, users, and escalation.",
  },
] as const;

type IconName = "no-person" | "monitor" | "target" | "globe" | "chat" | "lock" | "list" | "doc";

export default function GovernmentPublicHealthTrustSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.04 }
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
            <span className="text-white opacity-40">03</span>
            <span className="text-white opacity-20">·</span>
            Governance, Privacy &amp; Public Trust
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-white">The </span>
            <span style={{ color: ACCENT }}>trust core.</span>
          </h2>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-white/40">
            Built for public accountability, privacy, and non-surveillance.
          </p>
        </Reveal>

        {/* ── 2×4 cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <TrustCard key={card.title} card={card} index={i + 3} active={mounted} />
          ))}
        </div>

        {/* ── Non-surveillance commitment bar ── */}
        <Reveal index={11} active={mounted}>
          <div
            className="mt-5 flex items-start gap-3 rounded-2xl border p-5"
            style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <span
              className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: "rgba(15,170,135,0.15)", color: ACCENT }}
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-white/55">
              <span className="font-semibold text-white">Non-surveillance commitment:</span>{" "}
              ZoikoMeds public-sector intelligence is for population- and
              jurisdiction-level visibility. It must not become patient
              surveillance, individual targeting, enforcement targeting, or a
              tool for identifying specific patient behavior.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TrustCard                                                            */
/* ------------------------------------------------------------------ */
function TrustCard({
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
          <TrustIcon name={card.icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[13.5px] font-bold leading-snug text-white">{card.title}</h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[12px] leading-relaxed text-white/50">
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
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 17, height: 17 } };
  switch (name) {
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
    case "target":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 2v3M12 19v3M22 12h-3M5 12H2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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
    case "chat":
      return (
        <svg {...c}>
          <path d="M4 4.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z"
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
    case "list":
      return (
        <svg {...c}>
          <path d="M8 6h13M8 12h13M8 18h13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="3.5" cy="6" r="1.3" fill="currentColor" />
          <circle cx="3.5" cy="12" r="1.3" fill="currentColor" />
          <circle cx="3.5" cy="18" r="1.3" fill="currentColor" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `gphTrustFadeUp 0.6s ease-out ${index * 70}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes gphTrustFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}