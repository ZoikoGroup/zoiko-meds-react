"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const CARDS = [
  {
    title: "Patients & caregivers",
    description: "Medicine search, saved searches, alerts, account rules, no medical advice, pharmacy confirmation, and the emergency boundary.",
    cta: "View Patient Terms",
    href: "patients",
    icon: (
      <>
        <circle cx="7" cy="7" r="4.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M10.2 10.2L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Pharmacies",
    description: "Verified participation, portal access, signal controls, confirmation requests, data limits, pharmacist judgment, and no exact public stock exposure.",
    cta: "View Pharmacy Terms",
    href: "pharmacy",
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Healthcare providers",
    description: "Patient-support workflows, signal explanation, referral guidance, no clinical decision support, and data minimization.",
    cta: "View Provider Terms",
    href: "/provider-overview",
    icon: (
      <path d="M8 1.5l6 4v3c0 4-2.6 6.5-6 7.5-3.4-1-6-3.5-6-7.5v-3l6-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Enterprise & API users",
    description: "Contract scope, data-use restrictions, API access, security review, no patient-level targeting, no exact stock exposure.",
    cta: "View Enterprise Terms",
    href: "enterprise",
    icon: (
      <path d="M5.5 4L2.5 8l3 4M10.5 4l3 4-3 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Wholesale participants",
    description: "Contracted access, procurement workflows, data controls, standards, confidentiality, and no public marketplace claims.",
    cta: "View Wholesale Terms",
    href: "#",
    icon: (
      <>
        <ellipse cx="8" cy="4" rx="4.5" ry="1.8" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M3.5 4v4c0 1 2 1.8 4.5 1.8s4.5-.8 4.5-1.8V4" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M3.5 8v4c0 1 2 1.8 4.5 1.8s4.5-.8 4.5-1.8V8" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    title: "General visitors",
    description: "Website use, intellectual property, acceptable use, privacy, cookies, accessibility, and support routes.",
    cta: "Visit Trust Center",
    href: "/trust-center",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M1.75 8h12.5M8 1.75c1.7 1.8 2.6 4 2.6 6.25S9.7 12.45 8 14.25c-1.7-1.8-2.6-4-2.6-6.25S6.3 3.55 8 1.75z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      </>
    ),
  },
] as const;

export default function TermsOfUseByRoleSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">02</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Terms By Role
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Jump to the terms that </span>
            <span style={{ color: ACCENT }}>apply to you.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} index={2 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)]">
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                      {card.icon}
                    </svg>
                  </div>
                  <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{card.title}</h3>
                </div>

                <p className="flex-1 text-[13px] leading-relaxed text-[#5B6478]">
                  {card.description}
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `termsByRoleFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes termsByRoleFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}