"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const TRUST_BADGES = ["Not a pharmacy", "No medical advice", "Compliance-conscious intelligence"] as const;

export default function RequestABriefingHeroSection() {
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
            {/* Eyebrow */}
            <Reveal index={0} active={mounted}>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
                ZoikoMeds Enterprise Briefing
              </p>
            </Reveal>

            {/* Headline */}
            <Reveal index={1} active={mounted}>
              <h1 className="text-[2.3rem] font-extrabold leading-tight sm:text-[2.7rem]">
                <span className="text-[#0F1F4E]">Request a Briefing on</span>
                <br />
                <span className="text-[#0F1F4E]">Medicine </span>
                <span style={{ color: ACCENT }}>Availability</span>
                <br />
                <span style={{ color: ACCENT }}>Intelligence</span>
              </h1>
            </Reveal>

            {/* Description */}
            <Reveal index={2} active={mounted}>
              <p className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-[#5B6478]">
                Speak with ZoikoMeds about medicine availability intelligence, pharmacy network
                visibility, shortage signals, healthcare access reporting, and responsible data
                workflows for your organization.
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal index={3} active={mounted}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#start-briefing"
                  className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-[13.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                  style={{ backgroundColor: ACCENT }}
                >
                  Start Briefing Request
                </a>
                <a
                  href="/trust-center"
                  className="inline-flex items-center justify-center rounded-lg border border-[#E7EAF1] bg-white px-5 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-colors duration-150 hover:border-[#0F1F4E]"
                >
                  Explore Trust Center
                </a>
              </div>
            </Reveal>

            {/* Trust badges */}
            <Reveal index={4} active={mounted}>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {TRUST_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#E7EAF1] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#0F1F4E]"
                  >
                    <svg className="h-3.5 w-3.5 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                      <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
            </Reveal>

            {/* Disclaimer line */}
            <Reveal index={5} active={mounted}>
              <div className="mt-5 flex items-start gap-2.5 max-w-md">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M8 7.25v4M8 5.1v.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <p className="text-[12.5px] leading-relaxed text-[#8B93A7]">
                  Briefings are intended for organizations, pharmacy networks, healthcare
                  stakeholders, wholesalers, public-health teams, and approved enterprise
                  partners.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── Right column: hero image ── */}
          <Reveal index={2} active={mounted}>
            <div className="relative h-[320px] w-full overflow-hidden rounded-3xl sm:h-[380px] lg:h-[420px]">
              <Image
                src="/images/request-a-briefing-hero.webp"
                alt="Medicine vials and clinical supplies on a table with a healthcare professional in the background"
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `requestBriefingHeroFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes requestBriefingHeroFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}