"use client";

import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const STEPS = [
  {
    number: 1,
    title: "API interest",
    description:
      "Submit an API access request with organization type, use case, and integration context.",
  },
  {
    number: 2,
    title: "Qualification",
    description:
      "ZoikoMeds reviews organization, jurisdiction, use case, data need, and risk profile.",
  },
  {
    number: 3,
    title: "Security & governance review",
    description:
      "Security, privacy, data-use, procurement, and legal materials shared where appropriate.",
  },
  {
    number: 4,
    title: "Sandbox access",
    description:
      "Approved teams get contract-scoped docs, test credentials, sample responses, and rate-limit guidance.",
  },
  {
    number: 5,
    title: "Implementation planning",
    description:
      "Define endpoints, integration method, success criteria, support model, and launch path.",
  },
  {
    number: 6,
    title: "Production approval",
    description:
      "Requires signed terms, credential governance, monitoring, support routing, and approved data scope.",
  },
] as const;

const COMMERCIAL_SIGNALS_LEFT = [
  "API licensing — usage-tiered and contract-scoped.",
  "Implementation support — scoped by integration complexity.",
  "Enterprise support — governed by service model and contract tier.",
] as const;

const COMMERCIAL_SIGNALS_RIGHT = [
  "Sandbox evaluation — gated and qualification-based.",
  "Jurisdiction expansion — reviewed by market, compliance, and data readiness.",
] as const;

export default function ZoikoAvailApiEvaluationSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Eyebrow + heading ---------------- */}
        {mounted ? (
          <>
            <Reveal index={0}>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                04 · Evaluation &amp; Procurement
              </span>
            </Reveal>

            <Reveal index={1}>
               <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                  Enterprise API evaluation without{" "}
                <span style={{ color: ACCENT }}>    uncontrolled data
                exposure.</span>
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#5B6478]">
                Public content sells the API; gated content provides
                docs, sandbox, keys, and implementation details.
              </p>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-52 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-[#E4E8F0]" />
            <div className="h-4 w-96 animate-pulse rounded bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Step cards grid ---------------- */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {mounted
            ? STEPS.map((step, i) => (
                <Reveal key={step.number} index={3 + i}>
                  <StepCard {...step} />
                </Reveal>
              ))
            : Array.from({ length: 6 }).map((_, i) => <StepCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Commercial model signals ---------------- */}
        <div className="mt-8">
          {mounted ? (
            <Reveal index={10}>
              <CommercialSignalsCard />
            </Reveal>
          ) : (
            <div className="h-48 w-full animate-pulse rounded-2xl bg-[#E4E8F0]" />
          )}
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
      className="animate-[zoikoSignalFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 60}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes zoikoSignalFadeUp {
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
/*  Step card                                                          */
/* ----------------------------------------------------------------- */
function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="group h-full rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D7DCE6] hover:shadow-[0_16px_36px_-12px_rgba(15,31,78,0.12)]">
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#DCF5EE", color: "#0C8A6E" }}
      >
        {number}
      </span>
      <h4 className="mt-3.5 text-[14.5px] font-bold leading-snug text-[#0F1F4E]">
        {title}
      </h4>
      <p className="mt-2 text-[12.5px] leading-relaxed text-[#8891A4]">
        {description}
      </p>
    </div>
  );
}

function StepCardSkeleton() {
  return (
    <div className="h-full rounded-2xl border border-[#E7EAF1] bg-white p-5">
      <div className="h-7 w-7 animate-pulse rounded-full bg-[#E4E8F0]" />
      <div className="mt-3.5 h-4 w-24 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Commercial model signals card                                      */
/* ----------------------------------------------------------------- */
function CommercialSignalsCard() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-7 shadow-[0_16px_40px_-16px_rgba(15,31,78,0.10)]">
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: ACCENT }}
      >
        Commercial model signals
      </span>

      <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-2.5 sm:grid-cols-2">
        {COMMERCIAL_SIGNALS_LEFT.map((item) => (
          <SignalItem key={item} text={item} />
        ))}
        {COMMERCIAL_SIGNALS_RIGHT.map((item) => (
          <SignalItem key={item} text={item} />
        ))}
      </div>

      <div className="mt-5 border-t border-[#EEF1F6] pt-4">
        <p className="text-[12px] leading-relaxed text-[#9AA3B5]">
          A Master Services Agreement and data-use restrictions are
          required for production use. Pricing is shown only after
          approval.
        </p>
      </div>
    </div>
  );
}

function SignalItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span
        className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
        style={{ backgroundColor: ACCENT }}
      />
      <p className="text-[13.5px] leading-relaxed text-[#5B6478]">{text}</p>
    </div>
  );
}