"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Legal & Trust", href: "/legal-trust" },
  { label: "Privacy Center", href: "/privacy-center" },
] as const;

export default function PrivacyCenterHeroSection() {
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
                Privacy Center
              </p>
            </Reveal>

            {/* Headline */}
            <Reveal index={2} active={mounted}>
              <h1 className="text-[2.3rem] font-extrabold leading-tight sm:text-[2.7rem]">
                <span className="text-[#0F1F4E]">Your privacy controls for</span>
                <br />
                <span style={{ color: ACCENT }}>medicine availability search.</span>
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal index={3} active={mounted}>
              <p className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-[#5B6478]">
                ZoikoMeds lets users search without an account, manage saved-search and alert
                data, control cookies and notifications, and submit privacy requests through
                governed privacy workflows.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal index={4} active={mounted}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="/privacy-choices"
                  className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-[13.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                  style={{ backgroundColor: ACCENT }}
                >
                  Manage Privacy Choices
                </a>
                <a
                  href="/submit-privacy-request"
                  className="inline-flex items-center justify-center rounded-lg border border-[#E7EAF1] bg-white px-5 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-colors duration-150 hover:border-[#0F1F4E]"
                >
                  Submit Privacy Request
                </a>
              </div>
            </Reveal>

            {/* Text link */}
            <Reveal index={5} active={mounted}>
              <a
                href="/search"
                className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-semibold transition-opacity duration-150 hover:opacity-80"
                style={{ color: ACCENT }}
              >
                Search Without an Account <span aria-hidden>→</span>
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
                  ZoikoMeds does not require prescription uploads, diagnosis, symptoms,
                  insurance details, or medical records for public medicine availability search.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Right column: hero image ── */}
          <Reveal index={2} active={mounted}>
            <div className="relative h-[320px] w-full overflow-hidden rounded-3xl bg-white sm:h-[380px] lg:h-[420px]">
              <Image
                src="/images/privacy-center-hero.webp"
                alt="Illustration of a first-aid kit representing medicine privacy and safety"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain p-6"
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `privacyHeroFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes privacyHeroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}