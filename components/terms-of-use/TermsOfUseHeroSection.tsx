"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const BREADCRUMBS = [
  { label: "Home", href: "/" },
  { label: "Legal & Trust", href: "/legal-trust" },
  { label: "Terms of Use", href: "/terms-of-use" },
] as const;

const RELATED_LINKS = [
  { label: "Privacy Center", href: "/privacy-center" },
  { label: "Trust Center", href: "/trust-center" },
  { label: "Contact Support", href: "/contact-support" },
] as const;

export default function TermsOfUseHeroSection() {
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
                Legal Agreement
              </p>
            </Reveal>

            {/* Headline */}
            <Reveal index={2} active={mounted}>
              <h1 className="text-[2.3rem] font-extrabold leading-tight sm:text-[2.7rem]">
                <span className="text-[#0F1F4E]">Terms of Use for </span>
                <span style={{ color: ACCENT }}>ZoikoMeds.</span>
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal index={3} active={mounted}>
              <p className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-[#5B6478]">
                These Terms explain the rules for using ZoikoMeds, including medicine
                availability search, accounts, saved searches, alerts, pharmacy participation,
                provider workflows, enterprise access, APIs, data products, and support
                services.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal index={4} active={mounted}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#summary"
                  className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-[13.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                  style={{ backgroundColor: ACCENT }}
                >
                  Read Terms Summary
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E7EAF1] bg-white px-5 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-colors duration-150 hover:border-[#0F1F4E]"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path d="M4.5 6V2h7v4" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    <rect x="2.5" y="6" width="11" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M4.5 11h7v3h-7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                  Download / Print Terms
                </a>
              </div>
            </Reveal>

            {/* Related links */}
            <Reveal index={5} active={mounted}>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-[13.5px] font-semibold">
                {RELATED_LINKS.map((link, i) => (
                  <span key={link.label} className="flex items-center gap-2">
                    {i > 0 && <span className="text-[#C7CCDA]">·</span>}
                    <a href={link.href} style={{ color: ACCENT }} className="transition-opacity duration-150 hover:opacity-80">
                      {link.label}
                    </a>
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Disclaimer line */}
            <Reveal index={6} active={mounted}>
              <div className="mt-5 flex items-start gap-2.5 max-w-md">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M8 7.25v4M8 5.1v.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <p className="text-[12.5px] leading-relaxed text-[#8B93A7]">
                  By using ZoikoMeds, users agree to follow these Terms. If a user does not
                  agree, they should not use the platform. Emergency and clinical questions must
                  be directed to qualified professionals or emergency services.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Right column: hero image ── */}
          <Reveal index={2} active={mounted}>
            <div className="relative h-[320px] w-full overflow-hidden rounded-3xl sm:h-[380px] lg:h-[420px]">
              <Image
                src="/images/terms-of-use-hero.webp"
                alt="Person using the ZoikoMeds medicine search platform on a laptop"
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `termsHeroFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes termsHeroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}