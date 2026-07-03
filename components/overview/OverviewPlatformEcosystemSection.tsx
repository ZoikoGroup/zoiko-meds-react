"use client";

import { useEffect, useRef, useState } from "react";

/**
 * OverviewPlatformEcosystemSection
 * "Connected product layers and one operating model."
 *
 * Layout: light section, left-aligned eyebrow
 *         (04 · PLATFORM ECOSYSTEM)
 *         + 2-line headline (black + teal) + 3-column card grid where
 *           the center card (5th position) is a dark "ZoikoMeds /
 *           Availability Infrastructure" hub card.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";
const PANEL = "#0B1226";

const LAYERS = [
  {
    title: "Patient-facing search",
    body: "Helps users understand availability direction and access pathways — no medical advice or dispensing.",
    icon: "search",
  },
  {
    title: "Pharmacy Portal",
    body: "Participate in verification, update structured signals, and strengthen availability confidence.",
    icon: "portal",
  },
  {
    title: "Wholesale Portal",
    body: "Authorized wholesale and distribution stakeholders access intelligence and partner workflows.",
    icon: "hex",
  },
  {
    title: "Intelligence layer",
    body: "Analytics, AI insights, shortage signals, and regional access intelligence.",
    icon: "chart",
  },
  null, // center hub card
  {
    title: "Reporting layer",
    body: "Converts platform intelligence into compliance-conscious reports and executive briefings.",
    icon: "document",
  },
  {
    title: "Trust & governance",
    body: "Privacy, security, role-based access, disclaimers, auditability, and responsible AI boundaries.",
    icon: "hex",
  },
] as const;

export default function OverviewPlatformEcosystemSection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>04</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Platform Ecosystem
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Connected product layers and one
            <br />
            <span style={{ color: ACCENT }}>operating model.</span>
          </h2>
        </Reveal>

        {/* ── Ecosystem grid ── */}
        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LAYERS.map((card, i) =>
            card === null ? (
              <Reveal key="hub" index={2 + i} active={mounted}>
                <div
                  className="flex h-full min-h-[190px] flex-col items-center justify-center rounded-2xl p-6 text-center"
                  style={{ backgroundColor: PANEL }}
                >
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15">
                    <ShieldIcon />
                  </div>
                  <p className="text-[15px] font-bold text-white">ZoikoMeds</p>
                  <p
                    className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: ACCENT }}
                  >
                    Availability Infrastructure
                  </p>
                </div>
              </Reveal>
            ) : (
              <Reveal key={card.title} index={2 + i} active={mounted}>
                <div className="h-full rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                  <div
                    className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${ACCENT}1A` }}
                  >
                    <LayerIcon name={card.icon} />
                  </div>
                  <p className="text-[14px] font-bold" style={{ color: NAVY }}>
                    {card.title}
                  </p>
                  <p className="mt-2 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                    {card.body}
                  </p>
                </div>
              </Reveal>
            )
          )}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function LayerIcon({ name }: { name: "search" | "portal" | "hex" | "chart" | "document" }) {
  const props = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: ACCENT,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "portal":
      return (
        <svg {...props}>
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <path d="M9 15V9l6 6V9" />
        </svg>
      );
    case "hex":
      return (
        <svg {...props}>
          <path d="M12 3l7.5 4.5v9L12 21l-7.5-4.5v-9L12 3Z" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <path d="M4 20V10M12 20V4M20 20v-7" />
        </svg>
      );
    case "document":
      return (
        <svg {...props}>
          <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M14 3v5h5" />
        </svg>
      );
    default:
      return null;
  }
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z"
        stroke="white"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `overviewEcosystemFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes overviewEcosystemFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}