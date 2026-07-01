"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * TrustCenterHeroSection
 * "Trust infrastructure for medicine availability."
 *
 * Layout: breadcrumb + eyebrow (TRUST CENTER) + 2-line headline (black + teal)
 *         + description + 2 CTAs (filled teal / outline) + text link
 *         + small disclaimer line with icon — left column
 *         right column: teal rounded hero image card.
 *
 * Brand accent: #0FAA87 | Navy: #0F1F4E
 */

const ACCENT = "#0FAA87";
const NAVY = "#0F1F4E";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Legal & Trust", href: "/legal-trust" },
  { label: "Trust Center", href: "/trust-center" },
] as const;

export default function TrustCenterHeroSection() {
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
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

          {/* ── Left column ── */}
          <div>
            {/* Breadcrumb */}
            <Reveal index={0} active={mounted}>
              <nav className="mb-6 flex items-center gap-2 text-[12px] font-medium text-[#8B93A7]">
                {BREADCRUMBS.map((crumb, i) => (
                  <span key={crumb.label} className="flex items-center gap-2">
                    {i > 0 && <span className="text-[#C7CCDA]">/</span>}
                    {i === BREADCRUMBS.length - 1 ? (
                      <span className="text-[#8B93A7]">{crumb.label}</span>
                    ) : (
                      <a href={crumb.href} className="transition-colors duration-150 hover:text-[#0F1F4E]">
                        {crumb.label}
                      </a>
                    )}
                  </span>
                ))}
              </nav>
            </Reveal>

            {/* Eyebrow */}
            <Reveal index={1} active={mounted}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                Trust Center
              </p>
            </Reveal>

            {/* Headline */}
            <Reveal index={2} active={mounted}>
              <h1 className="text-[2.3rem] font-extrabold leading-tight sm:text-[2.7rem]">
                <span className="text-[#0F1F4E]">Trust infrastructure for</span>
                <br />
                <span style={{ color: ACCENT }}>medicine availability.</span>
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal index={3} active={mounted}>
              <p className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-[#5B6478]">
                ZoikoMeds protects medicine availability search through verified pharmacy
                participation, confidence-based signals, privacy-conscious account design,
                exact-stock suppression, enterprise governance, and clear medical and legal
                boundaries.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal index={4} active={mounted}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="/request-trust-pack"
                  className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-[13.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                  style={{ backgroundColor: NAVY }}
                >
                  Request Trust Pack
                </a>
                <a
                  href="/privacy-center"
                  className="inline-flex items-center justify-center rounded-lg border border-[#E7EAF1] bg-white px-5 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-colors duration-150 hover:border-[#0F1F4E]"
                >
                  View Privacy Center
                </a>
              </div>
            </Reveal>

            {/* Text link */}
            <Reveal index={5} active={mounted}>
              <a
                href="/medical-disclaimer"
                className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold transition-opacity duration-150 hover:opacity-80"
                style={{ color: ACCENT }}
              >
                View Medical Disclaimer <span aria-hidden>→</span>
              </a>
            </Reveal>

            {/* Disclaimer line */}
            <Reveal index={6} active={mounted}>
              <div className="mt-5 flex items-start gap-2.5 max-w-md">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M8 7.25v4M8 5.1v.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <p className="text-[12.5px] leading-relaxed text-[#8B93A7]">
                  ZoikoMeds is not a pharmacy and does not prescribe, dispense, sell, deliver,
                  reserve, recommend, allocate, or guarantee medicines.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Right column: hero image ── */}
          <Reveal index={2} active={mounted}>
            <div className="relative h-[320px] w-full overflow-hidden rounded-3xl sm:h-[380px] lg:h-[420px]">
              <Image
                src="/images/trust-center-hero.webp"
                alt="Trust and safety tools for medicine availability"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `trustHeroFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes trustHeroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}