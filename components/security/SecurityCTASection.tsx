"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SecurityCTASection
 * Closing call-to-action: "Security is the foundation of responsible
 * medicine availability intelligence."
 *
 * Layout: dark navy rounded card, centered content, headline
 *         (white + teal), subtext, two buttons (filled + outline),
 *         a row of secondary links, and a compliance footnote.
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const BG = "#0C1B30";
const PANEL = "#0B1226";

const SECONDARY_LINKS = [
  { label: "Visit Trust Center", href: "#trust-center" },
  { label: "Privacy Center", href: "#privacy-center" },
  { label: "Terms of Use", href: "#terms-of-use" },
] as const;

export default function SecurityCTASection() {
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
    <section className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div ref={ref} className="mx-auto max-w-6xl px-6 lg:px-8">
        <Reveal index={0} active={mounted}>
          <div
            className="relative overflow-hidden rounded-[1.75rem] border border-white/10 px-6 py-14 text-center sm:px-12 sm:py-16"
            style={{ backgroundColor: PANEL }}
          >
            {/* ambient glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
              style={{ backgroundColor: ACCENT }}
            />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-[1.65rem] font-extrabold leading-tight text-white sm:text-[2rem]">
                Security is the foundation of responsible{" "}
                <span style={{ color: ACCENT }}>medicine availability intelligence.</span>
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-[13.5px] leading-relaxed text-white/55">
                Request a security briefing or start an enterprise review to evaluate access
                models, data governance, responsible AI, auditability, and integration
                security for your organization.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href="#request-a-security-briefing"
                  className="w-full rounded-xl px-6 py-3 text-center text-[13.5px] font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
                  style={{ backgroundColor: ACCENT }}
                >
                  Request a Security Briefing
                </a>
                <a
                  href="#start-enterprise-review"
                  className="w-full rounded-xl border border-white/20 px-6 py-3 text-center text-[13.5px] font-semibold text-white transition-colors hover:bg-white/5 sm:w-auto"
                >
                  Start Enterprise Review
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {SECONDARY_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                    <ArrowRightIcon />
                  </a>
                ))}
              </div>

              <p className="mx-auto mt-6 max-w-lg text-[11.5px] leading-relaxed text-white/35">
                ZoikoMeds does not sell, prescribe, dispense, deliver, or provide medical
                advice, and does not expose exact inventory quantities to unauthorized users.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function ArrowRightIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `securityCtaFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes securityCtaFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}