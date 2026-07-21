"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";
const NAVY = "#0F1F4E";

const CARDS = [
  {
    title: "Trust Center",
    description: "Security, governance, platform boundaries, and infrastructure trust.",
    cta: "Visit Trust Center",
    href: "/trust-center",
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Privacy Center",
    description: "Privacy rights, data controls, saved searches, alerts, and privacy choices.",
    cta: "Visit Privacy Center",
    href: "/privacy-center",
    icon: (
      <>
        <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M2.5 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    title: "Terms of Use",
    description: "The legal terms governing site and product use.",
    cta: "Read Terms of Use",
    href: "/terms-of-use",
    icon: (
      <>
        <path d="M4 1.5h6l2.5 2.5V14a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-12a.5.5 0 01.5-.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M5.5 7h5M5.5 9.5h5M5.5 11.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Controlled Medicine Policy",
    description: "Rules for restricted, controlled, high-risk, or jurisdiction-sensitive medicines.",
    cta: "Read Policy",
    href: "#",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 7.25v4M8 5.1v.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Accessibility",
    description: "Our accessibility commitments and support route.",
    cta: "View Accessibility",
    href: "/accessibility",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 7.25v4M8 5.1v.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Search Medicines",
    description: "Return safely to medicine availability search.",
    cta: "Search Medicines",
    href: "/searchmed",
    icon: (
      <>
        <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M10.2 10.2L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
] as const;

export default function MedicalDisclaimerNextSection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: NAVY }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-60 text-white">05</span>
            <span className="opacity-40 text-white">·</span>
            Related Trust Resources
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-white sm:text-[2.3rem]">
            Where to <span style={{ color: ACCENT }}>go next.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white p-6 shadow-[0_4px_24px_-10px_rgba(0,0,0,0.35)]">
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4.5 w-4.5">
                    {card.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{card.title}</h3>
                <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-[#5B6478]">
                  {card.description}
                </p>

                <a
                  href={card.href}
                  className="mt-5 inline-flex w-fit items-center justify-center rounded-lg border border-[#E7EAF1] px-4 py-2 text-[12.5px] font-semibold text-[#0F1F4E] transition-colors duration-150 hover:border-[#0F1F4E]"
                >
                  {card.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── CTA panel ── */}
        <Reveal index={8} active={mounted}>
          <div
            className="mt-10 rounded-2xl border border-white/10 px-6 py-14 text-center sm:px-12"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <h3 className="mx-auto max-w-2xl text-[1.4rem] font-extrabold leading-snug text-white sm:text-[1.6rem]">
              Use ZoikoMeds for availability guidance, then confirm with the pharmacy.
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-[13.5px] leading-relaxed text-white/60">
              Use ZoikoMeds for availability guidance. Confirm with the pharmacy. Rely on healthcare professionals for clinical decisions.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/search"
                className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-[13.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                style={{ backgroundColor: ACCENT }}
              >
                Search Medicines
              </a>
              <a
                href="/availability-confidence"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-150 hover:border-white/40"
              >
                Learn About Availability Confidence
              </a>
            </div>

            <a
              href="/trust-center"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/60 transition-colors duration-150 hover:text-white"
            >
              Visit Trust Center <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `medDiscNextFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes medDiscNextFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}