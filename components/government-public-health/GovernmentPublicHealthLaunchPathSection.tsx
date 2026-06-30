"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const STEPS = [
  {
    number: 1,
    title: "Public health briefing",
    description:
      "Review capability, scope, boundaries, and fit with the relevant team.",
  },
  {
    number: 2,
    title: "Data governance review",
    description:
      "Privacy, legal, and security review permitted outputs, thresholds, and prohibited uses.",
  },
  {
    number: 3,
    title: "Jurisdiction scoping",
    description:
      "Define geography, medicine categories, roles, controlled handling, and cadence.",
  },
  {
    number: 6,
    title: "Operational launch",
    description:
      "Train users, activate access, monitor audit trails, and set governance cadence.",
  },
  {
    number: 4,
    title: "Pilot configuration",
    description:
      "Configure dashboards, reports, signal views, access, and agency caveats.",
  },
  {
    number: 5,
    title: "Security & procurement review",
    description:
      "Security pack, governance pack, data-use schedule, commercial model, and proposal.",
  },
] as const;

const COMMERCIAL_MODELS = [
  "Annual public-sector intelligence subscription scoped by jurisdiction, output type, and user roles.",
  "Data governance & implementation package for agency-specific review and configuration.",
  "Emergency preparedness / access-monitoring program under an MSA or approved procurement vehicle.",
  "Pilot program fee for a defined jurisdiction, medicine categories, dashboards, reports, and governance setup.",
  "API or signal-feed licensing where outputs integrate into approved public-sector systems.",
] as const;

export default function GovernmentPublicHealthLaunchPathSection() {
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
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Header (left-aligned) ---------------- */}
        <div className="max-w-2xl">
          {mounted ? (
            <>
              <Reveal index={0}>
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: ACCENT }}
                >
                  04 · Implementation &amp; procurement
                </p>
              </Reveal>

              <Reveal index={1}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] mt-2 text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
                  From <span style={{ color: ACCENT }}>briefing to launch.</span>
                </h2>
              </Reveal>

              <Reveal index={2}>
                <p className="mt-3 text-[14.5px] leading-relaxed text-[#5B6478]">
                  A procurement-aware path that shows serious agencies
                  how evaluation proceeds.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Step cards ---------------- */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? STEPS.map((s, i) => <StepCard key={s.number} {...s} index={i} />)
            : STEPS.map((_, i) => <StepCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Commercial models panel ---------------- */}
        <div className="mt-6">
          {mounted ? <CommercialModelsPanel /> : <CommercialModelsPanelSkeleton />}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
/*  Reveal: bottom -> top staggered fade-up wrapper                   */
/* ----------------------------------------------------------------- */
function Reveal({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <div
      className="animate-[govPublicHealthLaunchFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes govPublicHealthLaunchFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Step card                                                           */
/* ----------------------------------------------------------------- */
function StepCard({
  number,
  title,
  description,
  index,
}: {
  number: number;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="group flex flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[govPublicHealthLaunchFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{
        opacity: 0,
        animationDelay: `${250 + index * 90}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#9FE3D3";
        e.currentTarget.style.boxShadow =
          "0 14px 32px -16px rgba(15,170,135,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E7EAF1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <span
        className="flex h-7 w-7 items-center justify-center rounded-lg text-[13px] font-bold transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
      >
        {number}
      </span>

      <h3 className="mt-4 text-[14.5px] font-bold text-[#0F1F4E]">{title}</h3>

      <p className="mt-2 text-[12.5px] leading-relaxed text-[#5B6478]">
        {description}
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Commercial models panel                                             */
/* ----------------------------------------------------------------- */
function CommercialModelsPanel() {
  return (
    <div
      className="rounded-2xl border border-[#E7EAF1] bg-white p-6 sm:p-8 animate-[govPublicHealthLaunchFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "850ms" }}
    >
      <p
        className="text-[11px] font-bold uppercase tracking-[0.12em]"
        style={{ color: ACCENT }}
      >
        Public-sector commercial models
      </p>

      <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {COMMERCIAL_MODELS.map((item) => (
          <li key={item} className="flex items-start gap-2.5">
            <span
              className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            <p className="text-[13px] leading-relaxed text-[#3A4258]">
              {item}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-5 h-px w-full bg-[#EEF0F5]" />

      <p className="mt-4 text-[12px] leading-relaxed text-[#A6ADBD]">
        Pricing is shown only after approval — commercial-model language
        explains how the product is bought, without exposing unapproved
        numbers.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                           */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-3 w-56 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-8 w-full max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="h-3.5 w-full max-w-xl animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}

function StepCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-7 w-7 animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}

function CommercialModelsPanelSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6 sm:p-8">
      <div className="h-3 w-56 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
        ))}
      </div>
      <div className="mt-5 h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}