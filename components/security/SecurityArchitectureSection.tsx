"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SecurityArchitectureSection
 * "A layered trust architecture, not a marketing promise."
 *
 * Layout: light section, left-aligned eyebrow
 *         (02 · SECURITY ARCHITECTURE)
 *         + 2-line headline (black + teal) + stacked list of 7
 *           individual white row cards, each with an icon badge,
 *           title, a small tag pill, and a description.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const LAYERS = [
  {
    title: "Identity layer",
    tag: "Authentication",
    body: "Authentication, SSO readiness, MFA support, session control, and account recovery safeguards.",
    icon: "shield",
  },
  {
    title: "Authorization layer",
    tag: "Least privilege",
    body: "Role-based access control, least privilege, tenant boundaries, and permission inheritance.",
    icon: "search",
  },
  {
    title: "Data protection layer",
    tag: "Encryption",
    body: "Encryption in transit and at rest, data minimization, controlled retention, and secure storage.",
    icon: "lock-cam",
  },
  {
    title: "Signal governance layer",
    tag: "Confidence tiers",
    body: "Confidence-tier logic, pharmacy confirmation pathways, and inventory non-exposure controls.",
    icon: "check",
  },
  {
    title: "Responsible AI layer",
    tag: "Non-clinical",
    body: "Bounded AI outputs, explainability, human review, and non-clinical restrictions.",
    icon: "spark",
  },
  {
    title: "Audit & evidence layer",
    tag: "Logs",
    body: "Activity logs, report export records, review history, and governance evidence.",
    icon: "lines",
  },
  {
    title: "Monitoring layer",
    tag: "Resilience",
    body: "Security monitoring, anomaly detection, incident workflow, and operational resilience.",
    icon: "monitor",
  },
] as const;

export default function SecurityArchitectureSection() {
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
            <span className="opacity-60" style={{ color: NAVY }}>02</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Security Architecture
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            A layered trust architecture, not a
            <br />
            <span style={{ color: ACCENT }}>marketing promise.</span>
          </h2>
        </Reveal>

        {/* ── Layer list ── */}
        <div className="mt-8 flex flex-col gap-3.5">
          {LAYERS.map((layer, i) => (
            <Reveal key={layer.title} index={2 + i} active={mounted}>
              <div className="flex items-start gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(15,31,78,0.04)] sm:p-6">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${ACCENT}1A` }}
                >
                  <LayerIcon name={layer.icon} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <p className="text-[14px] font-bold" style={{ color: NAVY }}>
                      {layer.title}
                    </p>
                    <span
                      className="rounded px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.1em]"
                      style={{ backgroundColor: "rgba(15,31,78,0.06)", color: `${NAVY}99` }}
                    >
                      {layer.tag}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                    {layer.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function LayerIcon({ name }: { name: (typeof LAYERS)[number]["icon"] }) {
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
    case "shield":
      return (
        <svg {...props}>
          <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />
        </svg>
      );
    case "search":
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "lock-cam":
      return (
        <svg {...props}>
          <rect x="5" y="5" width="14" height="14" rx="3" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <path d="M5 13l4 4L19 7" />
        </svg>
      );
    case "spark":
      return (
        <svg {...props}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
        </svg>
      );
    case "lines":
      return (
        <svg {...props}>
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
      );
    case "monitor":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="13" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `securityArchitectureFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes securityArchitectureFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}