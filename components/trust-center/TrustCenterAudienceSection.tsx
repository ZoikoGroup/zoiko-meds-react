"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";
const NAVY = "#0F1F4E";

const CARDS = [
  {
    title: "Patients & caregivers",
    description: "Search safely and understand what results mean.",
    trust: "Privacy Center, Medical Disclaimer, Availability Confidence, Accessibility.",
    cta: "Search Medicines",
    href: "/searchmed",
    icon: (
      <>
        <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M10.2 10.2L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Pharmacies",
    description: "Protect exact stock and pharmacy control.",
    trust: "Verification Standards, Pharmacy Data Controls, Confirmation Requests, Inventory Signal Governance.",
    cta: "Join Verified Network",
    href: "/join-the-network",
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Healthcare providers",
    description: "Support patients without clinical overreach.",
    trust: "Provider Workflows, Availability Signals, Referral Guidance, Medical Disclaimer.",
    cta: "Request Provider Briefing",
    href: "/provider-support",
    icon: (
      <path d="M8 1.5l6 4v3c0 4-2.6 6.5-6 7.5-3.4-1-6-3.5-6-7.5v-3l6-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Enterprise buyers",
    description: "Trust the data, APIs, governance, and security posture.",
    trust: "Enterprise Trust Pack, Security Pack, Data Governance, ZoikoSignal™, ZoikoAvail™ API.",
    cta: "Request Enterprise Briefing",
    href: "/enterprise",
    icon: (
      <>
        <path d="M3 14V6.5L8 3l5 3.5V14" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M6.5 14v-4h3v4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
      </>
    ),
  },
  {
    title: "Government & public health",
    description: "Public-interest visibility without exposing sensitive data.",
    trust: "Public Health Trust Review, Controlled Medicine Policy, Data Governance, Jurisdiction Controls.",
    cta: "Request Public Health Briefing",
    href: "/health-systems",
    icon: (
      <>
        <path d="M3 14V6.5L8 3l5 3.5V14" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M8 8.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Legal, security & procurement",
    description: "Review policies, controls, and available evidence.",
    trust: "Trust Pack, Privacy Center, Terms of Use, Security Review, Accessibility Statement.",
    cta: "Request Trust Pack",
    href: "#trust",
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
] as const;

export default function TrustCenterAudienceSection() {
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
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">05</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Audience Trust Pathways
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">The right trust content for </span>
            <span style={{ color: ACCENT }}>each audience.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: NAVY, color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {card.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{card.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {card.description}
                </p>

                <p className="mt-3 flex-1 text-[12px] leading-relaxed text-[#9AA1B4]">
                  <span className="font-semibold text-[#5B6478]">Trust: </span>
                  {card.trust}
                </p>

                <a
                  href={card.href}
                  className="mt-5 inline-flex w-fit items-center justify-center rounded-lg border border-[#E7EAF1] px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-colors duration-150 hover:border-[#0F1F4E]"
                >
                  {card.cta}
                </a>
              </div>
            </Reveal>
          ))}
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `trustAudienceFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes trustAudienceFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}