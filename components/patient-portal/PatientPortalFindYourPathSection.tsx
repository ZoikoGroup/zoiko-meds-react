"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const PATH_CARDS = [
  {
    id: "new-patient",
    title: "New patient",
    description: "Account value, saved searches, alerts, and privacy controls.",
    ctaLabel: "Create Free Account",
    href: "/create-account",
    variant: "filled",
    icon: (
      <>
        <circle cx="8" cy="5.4" r="2.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path
          d="M3.4 13c0-2.4 2.06-4 4.6-4s4.6 1.6 4.6 4"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
      </>
    ),
  },
  {
    id: "returning-patient",
    title: "Returning patient",
    description: "Jump to sign-in, your saved medicine dashboard, and alert review.",
    ctaLabel: "Sign In",
    href: "/sign-in",
    variant: "outline",
    icon: (
      <>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 5.2V8l2 1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    id: "caregiver",
    title: "Caregiver",
    description: "Help organize medicine access for someone else, subject to permissions and consent.",
    ctaLabel: "Create Caregiver Account",
    href: "/caregiver-access",
    variant: "outline",
    icon: (
      <path
        d="M8 13.3S3 10.4 3 6.8A2.6 2.6 0 018 5.3a2.6 2.6 0 015 1.5c0 3.6-5 6.5-5 6.5z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "access-concern",
    title: "Access concern",
    description: "Guidance to medicine search and responsible support — not an emergency service.",
    ctaLabel: "Search Medicines",
    href: "/searchmed",
    variant: "outline",
    icon: (
      <>
        <circle cx="7" cy="7" r="4.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M10.1 10.1l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  },
  {
    id: "privacy-evaluator",
    title: "Privacy evaluator",
    description: "Review privacy, consent, security, and data-use controls before signing up.",
    ctaLabel: "Review Privacy Center",
    href: "/privacy-center",
    variant: "outline",
    icon: (
      <path
        d="M8 2l5 2.2v3.3c0 3.3-2.1 5.7-5 6.5-2.9-.8-5-3.2-5-6.5V4.2L8 2z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
] as const;

export default function PatientPortalFindYourPathSection() {
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
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">06</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Find Your Path
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Whether you&apos;re new, returning, or </span>
            <span style={{ color: ACCENT }}>helping someone else.</span>
          </h2>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5">
          {PATH_CARDS.map((card, i) => (
            <Reveal key={card.id} index={2 + i} active={mounted}>
              <div
                className="flex h-full flex-col rounded-2xl border bg-white p-6 transition-all duration-250 ease-out hover:-translate-y-1 hover:shadow-[0_16px_32px_-14px_rgba(15,31,78,0.18)]"
                style={{
                  borderColor: "#E7EAF1",
                  boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                }}
              >
                <div
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-250 ease-out group-hover:scale-110"
                  style={{ backgroundColor: "rgba(19,165,148,0.12)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {card.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{card.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {card.description}
                </p>

                <div className="mt-auto pt-5">
                  {card.variant === "filled" ? (
                    <Link
                      href={card.href}
                      className="flex w-full items-center justify-center rounded-full px-4 py-2.5 text-[11px] font-semibold text-white transition-colors duration-200 hover:opacity-90"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {card.ctaLabel}
                    </Link>
                  ) : (
                    <Link
                      href={card.href}
                      className="flex w-full items-center justify-center rounded-full border px-4 py-2.5 text-[11px] font-semibold transition-colors duration-200 hover:bg-[#F4F6FA]"
                      style={{ borderColor: "#D8DDE8", color: "#0F1F4E" }}
                    >
                      {card.ctaLabel}
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  index,
  active,
}: {
  children: React.ReactNode;
  index: number;
  active: boolean;
}) {
  return (
    <div
      className="h-full"
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `patientPortalFindYourPathFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes patientPortalFindYourPathFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}