"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const BOUNDARIES = [
  {
    id: "no-clinical-advice",
    title: "No clinical advice",
    description:
      "Briefings do not provide diagnosis, treatment, prescribing, substitution, or patient-specific medical guidance.",
    icon: (
      <path
        d="M8 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM4.2 4.2l7.6 7.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "no-dispensing",
    title: "No dispensing",
    description: "ZoikoMeds is not a pharmacy and does not sell, dispense, or deliver medicine.",
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
  {
    id: "controlled-access",
    title: "Controlled access",
    description:
      "Enterprise intelligence and reporting discussions are role-appropriate and access-controlled.",
    icon: (
      <>
        <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "no-unauthorized-quantity-exposure",
    title: "No unauthorized quantity exposure",
    description: "No exact inventory quantities or real-time stock details to unauthorized users.",
    icon: (
      <>
        <rect x="2.5" y="4.5" width="11" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M2.5 7h11" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "responsible-ai",
    title: "Responsible AI",
    description: "AI insights are operational intelligence, not medical decision-making.",
    icon: (
      <path
        d="M8 2.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5zM12.5 9.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "data-minimization",
    title: "Data minimization",
    description:
      "The form collects only what is necessary to route and respond to the briefing request.",
    icon: (
      <path
        d="M3 4.5h10M3 8h10M3 11.5h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
] as const;

export default function RequestABriefingSecurityBoundariesSection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: "#0C1B30" }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-white">06</span>
            <span className="opacity-30 text-white">·</span>
            Security &amp; Responsible Data Use
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-white">Boundaries healthcare buyers </span>
            <span style={{ color: ACCENT }}>evaluate first.</span>
          </h2>
        </Reveal>

        {/* ── Boundary grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {BOUNDARIES.map((item, i) => (
            <Reveal key={item.id} index={2 + i} active={mounted}>
              <div
                className="flex items-start gap-3.5 rounded-xl p-5 transition-all duration-250 ease-out hover:-translate-y-0.5"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(15,170,135,0.15)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {item.icon}
                  </svg>
                </span>
                <div>
                  <p className="text-[13.5px] font-bold text-white">{item.title}</p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-[#AEB6C9]">
                    {item.description}
                  </p>
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
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `requestBriefingBoundariesFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes requestBriefingBoundariesFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}