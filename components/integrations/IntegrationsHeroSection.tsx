"use client";

import { useEffect, useRef, useState } from "react";

/**
 * IntegrationsHeroSection
 * "Connect Medicine Availability Intelligence to the Systems Your
 *  Organization Already Uses."
 *
 * Layout: light section, 2-column grid — left: eyebrow, 4-line
 *         headline (black + teal), paragraph, CTA buttons, explore
 *         link, compliance footnote. Right: full-bleed image.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

// Replace with your actual image path (e.g. an import from /public, or a full URL).
const HERO_IMAGE_SRC = "/images/integrations-hero.webp";

export default function IntegrationsHeroSection() {
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
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr]">

          {/* ── Left: copy ── */}
          <div>
            <Reveal index={0} active={mounted}>
              <p
                className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                ZoikoMeds Integrations
              </p>
            </Reveal>

            <Reveal index={1} active={mounted}>
              <h1 className="text-[2rem] font-extrabold leading-[1.15] sm:text-[2.5rem]" style={{ color: NAVY }}>
                Connect Medicine Availability Intelligence to the Systems{" "}
                <span style={{ color: ACCENT }}>Your Organization Already Uses</span>
              </h1>
            </Reveal>

            <Reveal index={2} active={mounted}>
              <p className="mt-5 max-w-xl text-[14px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                ZoikoMeds integrations help approved healthcare, pharmacy, wholesale,
                distribution, manufacturer, public-health, and enterprise teams connect
                medicine availability intelligence, pharmacy network signals, reporting
                workflows, identity controls, and analytics outputs through secure, governed
                data pathways.
              </p>
            </Reveal>

            <Reveal index={3} active={mounted}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#request-an-integration-briefing"
                  className="rounded-xl px-6 py-3 text-center text-[13.5px] font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: ACCENT }}
                >
                  Request an Integration Briefing
                </a>
                <a
                  href="#talk-to-sales"
                  className="rounded-xl border px-6 py-3 text-center text-[13.5px] font-semibold transition-colors hover:bg-black/[0.03]"
                  style={{ borderColor: `${NAVY}26`, color: NAVY }}
                >
                  Talk to Sales
                </a>
              </div>
            </Reveal>

            <Reveal index={4} active={mounted}>
              <a
                href="#integration-categories"
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold hover:underline"
                style={{ color: ACCENT }}
              >
                Explore integration categories
                <ArrowRightIcon />
              </a>
            </Reveal>

            <Reveal index={5} active={mounted}>
              <p
                className="mt-6 flex items-start gap-1.5 text-[12px] leading-relaxed"
                style={{ color: `${NAVY}80` }}
              >
                <ShieldIcon />
                ZoikoMeds does not sell, prescribe, dispense, deliver, or provide medical
                advice. Integrations are designed for responsible medicine availability
                intelligence.
              </p>
            </Reveal>
          </div>

          {/* ── Right: image ── */}
          <Reveal index={2} active={mounted}>
            <img
              src={HERO_IMAGE_SRC}
              alt="ZoikoMeds integrations connecting medicine availability intelligence to enterprise systems"
              className="w-full rounded-3xl object-cover"
            />
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function ArrowRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0" style={{ color: ACCENT }}>
      <path
        d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `integrationsHeroFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes integrationsHeroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}