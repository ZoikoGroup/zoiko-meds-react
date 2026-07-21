"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const ROUTES = [
  {
    number: 1,
    title: "Direct patient search",
    providerAction: "Direct the patient to Search Medicines.",
    patientAction: "Enter medicine, location, and radius.",
    nextStep: "Confirm directly with the pharmacy before traveling.",
    cta: "Search Medicines",
    link:"/searchmed"
  },
  {
    number: 2,
    title: "Saved search handoff",
    providerAction: "Explain saved searches and account creation.",
    patientAction: "Create a free account and save a medicine/location search.",
    nextStep: "Run the saved search again when needed.",
    cta: "Learn About Saved Searches",
    link:"/saved-searches"
  },
  {
    number: 3,
    title: "Availability alert handoff",
    providerAction: "Explain alerts as signal-change notifications.",
    patientAction: "Create an alert from a saved search.",
    nextStep: "Review the updated signal and confirm with the pharmacy.",
    cta: "Learn About Alerts",
    link:"/availability-alert"
  },
  {
    number: 4,
    title: "Caregiver handoff",
    providerAction: "Point the caregiver to caregiver access guidance.",
    patientAction: "Organize searches with labels and alerts.",
    nextStep: "Confirm directly with the pharmacy before acting.",
    cta: "Explore Caregiver Access",
    link:"/caregiver-access"
  },
] as const;

export default function ReferralGuidanceHandoffRoutesSection() {
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
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                  Practical handoff routes for{" "}
                  <span style={{ color: ACCENT }}>patients and caregivers.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Each pathway pairs a provider action with a clear
                  patient or caregiver next step.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Route cards ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {mounted
            ? ROUTES.map((r, i) => (
                <RouteCard key={r.number} {...r} index={i} />
              ))
            : ROUTES.map((_, i) => <RouteCardSkeleton key={i} />)}
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
      className="animate-[referralHandoffFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes referralHandoffFadeUp {
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
/*  Route card                                                          */
/* ----------------------------------------------------------------- */
function RouteCard({
  number,
  title,
  providerAction,
  patientAction,
  nextStep,
  cta,
  index,
  link
}: {
  number: number;
  title: string;
  providerAction: string;
  patientAction: string;
  nextStep: string;
  cta: string;
  index: number;
  link:string;
}) {
  return (
    <div
      className="group flex flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[referralHandoffFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{
        opacity: 0,
        animationDelay: `${250 + index * 100}ms`,
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
      <div className="flex items-center gap-3">
        <span
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-[13px] font-bold transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
        >
          {number}
        </span>
        <h3 className="text-[15px] font-bold text-[#0F1F4E]">{title}</h3>
      </div>

      <div className="mt-4 h-px w-full bg-[#EEF0F5]" />

      <RouteRow label="Provider action" text={providerAction} />

      <div className="h-px w-full bg-[#EEF0F5]" />

      <RouteRow label="Patient or caregiver" text={patientAction} />

      <div className="h-px w-full bg-[#EEF0F5]" />

      <RouteRow label="Next step" text={nextStep} last />

      <a
        href={link}
        className="mt-5 inline-flex w-fit items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
      >
        {cta}
      </a>
    </div>
  );
}

function RouteRow({
  label,
  text,
  last,
}: {
  label: string;
  text: string;
  last?: boolean;
}) {
  return (
    <div className={last ? "py-3" : "py-3"}>
      <p className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#A6ADBD]">
        {label}
      </p>
      <p className="mt-1 text-[13px] leading-relaxed text-[#3A4258]">
        {text}
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                           */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-full max-w-sm animate-pulse rounded-lg bg-white" />
      <div className="h-8 w-2/3 max-w-xs animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white" />
    </div>
  );
}

function RouteCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="flex items-center gap-3">
        <div className="h-7 w-7 animate-pulse rounded-lg bg-[#E4E8F0]" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-4 space-y-4">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <div className="h-2.5 w-24 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="mt-1.5 h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
          </div>
        ))}
      </div>
      <div className="mt-5 h-9 w-44 animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}