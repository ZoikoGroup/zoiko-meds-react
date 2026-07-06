"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const EXPERIENCE_ITEMS = [
  {
    id: "developer-documentation",
    title: "Developer documentation",
    description:
      "API overview, authentication model, endpoint groups, example requests, webhooks, error codes, and integration patterns.",
    icon: (
      <path
        d="M4.5 5.5h7M4.5 8.5h7M4.5 11.5h3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "sandbox-environment",
    title: "Sandbox environment",
    description:
      "Mock medicine availability signals, test pharmacy workflows, sample reports, and non-sensitive demo data.",
    icon: (
      <path
        d="M5.5 4L2.5 8l3 4M10.5 4l3 4-3 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "implementation-guides",
    title: "Implementation guides",
    description:
      "Step-by-step guides by stakeholder type: pharmacy, wholesale, analytics, reporting, identity, and public health.",
    icon: (
      <path
        d="M3 8.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "integration-support",
    title: "Integration support",
    description:
      "Named support path, implementation office hours, escalation process, and launch checklist.",
    icon: (
      <>
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      </>
    ),
  },
  {
    id: "partner-certification",
    title: "Partner certification",
    description:
      "Optional partner validation process for approved technology or network partners.",
    icon: (
      <path
        d="M12 3l7.5 4.5v9L12 21l-7.5-4.5v-9L12 3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "change-management",
    title: "Change management",
    description:
      "Versioning, changelog, deprecation notices, and release communication.",
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

export default function IntegrationsDeveloperPartnerExperienceSection() {
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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>08</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Developer &amp; Partner Experience
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            A clear path from{" "}
            <span style={{ color: ACCENT }}>sandbox to production.</span>
          </h2>
        </Reveal>

        {/* ── Two-column layout ── */}
        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* ── Left: items list ── */}
          <div className="space-y-4">
            {EXPERIENCE_ITEMS.map((item, i) => (
              <Reveal key={item.id} index={2 + i} active={mounted}>
                <div className="flex gap-3.5 rounded-2xl border border-black/5 bg-white p-5 shadow-[0_1px_2px_rgba(15,31,78,0.04)]">
                  <div
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${ACCENT}1A`, color: ACCENT }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <p className="text-[13.5px] font-bold" style={{ color: NAVY }}>
                      {item.title}
                    </p>
                    <p className="mt-1 text-[12px] leading-relaxed" style={{ color: `${NAVY}99` }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* ── Right: visual ── */}
          <Reveal index={2} active={mounted}>
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border sm:aspect-[16/12]"
              style={{ borderColor: "#E7EAF1", boxShadow: "0 20px 48px -20px rgba(15,31,78,0.16)" }}
            >
              {/* Replace src with the real asset, e.g. /images/integrations-developer-partner.png */}
              <img
                src="/images/integrations-developer-partner.webp"
                alt="Development workflow from sandbox to production showing API development, testing, validation, and deployment stages"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
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
        animation: active ? `integrationsDeveloperPartnerFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes integrationsDeveloperPartnerFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}