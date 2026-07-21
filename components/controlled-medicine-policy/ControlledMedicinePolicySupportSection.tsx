"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const ESCALATION_ROWS = [
  {
    title: "Patient or caregiver",
    description:
      "Route to public search with controlled-medicine safeguards and confirmation reminders.",
    cta: "Search Medicines Safely",
  },
  {
    title: "Pharmacy",
    description:
      "Route to pharmacy controls, participation settings, confirmation workflows, or sensitive-category support.",
  },
  {
    title: "Healthcare provider",
    description:
      "Route to provider support, referral guidance, and availability-signal education.",
  },
  {
    title: "Enterprise or public sector",
    description:
      "Route to enterprise, public-health, API, or intelligence governance discussion.",
  },
  {
    title: "Policy or safety concern",
    description:
      "Route to support or trust queue with privacy-safe intake — sensitive details are not requested in public fields.",
  },
] as const;

export default function ControlledMedicinePolicySupportSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#0B1530] py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Eyebrow + heading ---------------- */}
        {mounted ? (
          <>
            <Reveal index={0}>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                05 · Support &amp; Escalation
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-white sm:text-[2.35rem]">
                Find the{" "}
                <span style={{ color: ACCENT }}>right next action.</span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-44 animate-pulse rounded bg-white/10" />
            <div className="h-9 w-full max-w-md animate-pulse rounded-lg bg-white/10" />
          </div>
        )}

        {/* ---------------- Escalation rows card ---------------- */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04]">
          {mounted
            ? ESCALATION_ROWS.map((row, i) => (
                <Reveal key={row.title} index={2 + i}>
                  <EscalationRow
                    {...row}
                    isLast={i === ESCALATION_ROWS.length - 1}
                  />
                </Reveal>
              ))
            : Array.from({ length: 5 }).map((_, i) => (
                <EscalationRowSkeleton key={i} isLast={i === 4} />
              ))}
        </div>

        {/* ---------------- Closing CTA banner ---------------- */}
        <div className="mt-8">
          {mounted ? (
            <Reveal index={7}>
              <ClosingCtaBanner />
            </Reveal>
          ) : (
            <div className="h-64 w-full animate-pulse rounded-3xl bg-white/5" />
          )}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
/*  Reveal                                                             */
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
      style={{ opacity: 0, animationDelay: `${index * 65}ms` }}
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
/*  Escalation row                                                      */
/* ----------------------------------------------------------------- */
function EscalationRow({
  title,
  description,
  cta,
  isLast,
}: {
  title: string;
  description: string;
  cta?: string;
  isLast: boolean;
}) {
  return (
    <div
      className={`group flex items-start justify-between gap-6 px-7 py-5 transition-colors duration-200 hover:bg-white/[0.03] ${
        isLast ? "" : "border-b border-white/10"
      }`}
    >
      <div className="flex-1">
        <p className="text-[14px] font-bold text-white">{title}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-[#9AA3B5]">
          {description}
        </p>
      </div>

      {cta && (
        <button
          type="button"
          className="hidden flex-shrink-0 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] sm:block"
          style={{ backgroundColor: ACCENT }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 8px 24px -4px rgba(15,170,135,0.45)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          {cta}
        </button>
      )}
    </div>
  );
}

function EscalationRowSkeleton({ isLast }: { isLast: boolean }) {
  return (
    <div
      className={`flex items-start justify-between gap-6 px-7 py-5 ${
        isLast ? "" : "border-b border-white/10"
      }`}
    >
      <div className="flex-1">
        <div className="h-4 w-36 animate-pulse rounded bg-white/10" />
        <div className="mt-2 h-3 w-full animate-pulse rounded bg-white/10" />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Closing CTA banner                                                  */
/* ----------------------------------------------------------------- */
function ClosingCtaBanner() {
  const router = useRouter();
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-8 py-14 text-center sm:px-16">
      <h3 className="font-[var(--font-plus-jakarta-sans)] text-2xl font-bold leading-snug text-white sm:text-[1.75rem]">
        Search safely. Confirm directly. Respect{" "}
        <span style={{ color: ACCENT }}>
          controlled medicine safeguards.
        </span>
      </h3>

      <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-[#9AA3B5]">
        ZoikoMeds helps users understand medicine availability while
        applying stronger safeguards where controlled, restricted,
        high-risk, or jurisdiction-sensitive medicines are involved.
      </p>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
        onClick={()=>router.push("/searchmed")}
          type="button"
          className="group relative cursor-pointer overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          style={{ backgroundColor: ACCENT }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 8px 24px -4px rgba(15,170,135,0.45)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
          <span className="relative">Search Medicines Safely</span>
        </button>

        <button
        onClick={()=>router.push("/trust-center")}
          type="button"
          className="rounded-xl cursor-pointer border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 active:translate-y-0 active:scale-[0.98]"
        >
          Visit Trust Center
        </button>
      </div>

      <a
        href="#"
        className="mt-5 inline-block text-[13px] font-semibold text-[#9AA3B5] underline-offset-2 transition-colors duration-200 hover:text-white hover:underline"
      >
        Read Medical Disclaimer →
      </a>
    </div>
  );
}