"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const CARDS = [
  {
    title: "Verified pharmacy participation",
    description: "How ZoikoMeds reviews pharmacy identity, authorization, license/registry evidence where available, user roles, branch controls, and ongoing review triggers.",
    link: "View Verification Standards",
    href: "/verification-standards",
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Availability confidence",
    description: "What strong signal, limited signal, confirmation needed, and no current signal mean — and why pharmacy confirmation still matters.",
    link: "View Availability Confidence",
    href: "/availability-confidence",
    icon: (
      <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Exact-stock suppression",
    description: "Why public results use confidence-based signals rather than exact pharmacy stock counts.",
    link: "Learn About Data Controls",
    href: "/data-controls",
    icon: (
      <>
        <rect x="2" y="3" width="12" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M6 13.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Controlled medicine policy",
    description: "How controlled, restricted, high-risk, or jurisdiction-sensitive medicines may be suppressed, limited, routed, or governed under additional controls.",
    link: "View Controlled Medicine Policy",
    href: "/controlled-medicine-policy",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 5v6M5 8h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Medical boundary",
    description: "ZoikoMeds does not provide clinical advice, substitutions, dosing, treatment recommendations, prescribing, dispensing, or emergency support.",
    link: "View Medical Disclaimer",
    href: "/medical-disclaimer",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M4.2 4.2l7.6 7.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
] as const;

export default function TrustCenterPlatformSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">04</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Verification, Confidence &amp; Controlled Medicines
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Platform-specific trust, in </span>
            <span style={{ color: ACCENT }}>one place.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {card.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{card.title}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-[#5B6478]">
                  {card.description}
                </p>

                <a
                  href={card.href}
                  className="mt-4 inline-flex w-fit items-center gap-1.5 text-[13px] font-semibold transition-opacity duration-150 hover:opacity-80"
                  style={{ color: ACCENT }}
                >
                  {card.link} <span aria-hidden>→</span>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `trustPlatformFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes trustPlatformFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}