"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const ACCENT = "#0FAA87";

export default function ConfirmationRequestsHeroSection() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-20 sm:py-24">
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* ---------------- Left column ---------------- */}
        <div>
          {mounted ? (
            <div className="flex flex-col gap-5">
              <Reveal index={0}>
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: ACCENT }}
                >
                  Confirmation Requests
                </span>
              </Reveal>

              <Reveal index={1}>
                <h1 className="font-[var(--font-plus-jakarta-sans)] text-4xl font-bold leading-[1.15] text-[#0F1F4E] sm:text-[2.65rem]">
                  Manage medicine availability
                  <br />
                  inquiries{" "}
                  <span style={{ color: ACCENT }}>without losing</span>
                  <br />
                  <span style={{ color: ACCENT }}>pharmacy control.</span>
                </h1>
              </Reveal>

              <Reveal index={2}>
                <p className="max-w-lg text-[15px] leading-relaxed text-[#5B6478]">
                  ZoikoMeds confirmation requests give verified pharmacies a
                  structured way to respond to availability inquiries,
                  reduce repetitive calls, and help patients know what to
                  confirm next — without exposing exact public stock or
                  promising dispensing.
                </p>
              </Reveal>

              <Reveal index={3}>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <button
                  onClick={()=>router.push("#confirmation-request")}
                    type="button"
                    className="group relative cursor-pointer overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
                    style={{ backgroundColor: ACCENT }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 8px 24px -4px rgba(15,170,135,0.45)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow = "none")
                    }
                  >
                    <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
                    <span className="relative">Set Up Confirmation Requests</span>
                  </button>

                  <button
                  onClick={()=>router.push("/pharmacy-portal")}
                    type="button"
                    className="rounded-xl cursor-pointer border border-[#D7DCE6] bg-white px-6 py-3 text-sm font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
                  >
                    Sign In to Pharmacy Portal
                  </button>
                </div>
              </Reveal>

              <Reveal index={4}>
                <a
                  href="#"
                  className="inline-flex items-center text-[13.5px] font-semibold transition-colors duration-200"
                  style={{ color: ACCENT }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#0C8A6E")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = ACCENT)}
                >
                  View Pharmacy Data Controls
                </a>
              </Reveal>

              <Reveal index={5}>
                <p className="mt-1 flex max-w-lg items-start gap-2.5 text-[12.5px] leading-relaxed text-[#8891A4]">
                  <svg
                    className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                  A confirmation response is informational. It does not
                  reserve medicine, guarantee stock, approve dispensing,
                  validate prescriptions, or replace pharmacist judgment.
                </p>
              </Reveal>
            </div>
          ) : (
            <LeftSkeleton />
          )}
        </div>

        {/* ---------------- Right column: confirmation queue card ---------------- */}
        <div>
          {mounted ? <QueueCard /> : <CardSkeleton />}
          {mounted && (
            <p
              className="mt-3 animate-[confirmReqFadeUp_0.5s_ease-out_forwards] text-center text-[11.5px] leading-relaxed text-[#9AA3B5]"
              style={{ opacity: 0, animationDelay: "950ms" }}
            >
              Illustrative interface. Confirmation workflows are subject to
              pharmacy verification, role permissions, queue capacity
              settings, platform controls, approved response templates, and
              applicable law.
            </p>
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
      className="animate-[confirmReqFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes confirmReqFadeUp {
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
/*  Confirmation queue card                                            */
/* ----------------------------------------------------------------- */
function QueueCard() {
  // Live countdown, starting at 22:14 as shown in the reference.
  const [secondsLeft, setSecondsLeft] = useState(22 * 60 + 14);
  const [template, setTemplate] = useState("Direct confirmation recommended");

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secondsLeft % 60).toString().padStart(2, "0");

  return (
    <div
      className="animate-[confirmReqFadeUp_0.65s_ease-out_forwards] overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_16px_40px_-16px_rgba(15,31,78,0.18)] transition-shadow duration-300 hover:shadow-[0_20px_48px_-16px_rgba(15,31,78,0.24)]"
      style={{ opacity: 0, animationDelay: "150ms" }}
    >
      <div className="flex items-center justify-between border-b border-[#EEF1F6] px-6 py-4">
        <h3 className="text-[15px] font-bold text-[#0F1F4E]">
          Confirmation queue
        </h3>
        <Pill tone="blue">Open</Pill>
      </div>

      <CardRow label="Medicine" delay={250}>
        <Pill tone="blue">Ibuprofen 200 mg</Pill>
      </CardRow>

      <CardRow label="Branch" delay={320}>
        <Pill tone="blue">Austin, TX</Pill>
      </CardRow>

      <CardRow label="Availability signal" delay={390}>
        <Pill tone="muted" icon="caution">
          Limited
        </Pill>
      </CardRow>

      <CardRow label="Expires in" delay={460}>
        <Pill tone="blue" mono>
          {minutes}:{seconds}
        </Pill>
      </CardRow>

      <div
        className="border-b border-[#EEF1F6] px-6 py-4 transition-colors duration-200 hover:bg-[#F7F9FC]"
        style={{
          animation: "confirmReqFadeUp 0.5s ease-out forwards",
          opacity: 0,
          animationDelay: "530ms",
        }}
      >
        <span className="block text-[10.5px] font-semibold uppercase tracking-wide text-[#9AA3B5]">
          Approved response template
        </span>
        <div className="relative mt-2">
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full appearance-none rounded-lg border border-[#E0E4EC] bg-[#FAFBFD] px-3.5 py-2.5 pr-9 text-[13.5px] text-[#0F1F4E] transition-colors duration-200 focus:border-[#0FAA87] focus:bg-white focus:outline-none"
          >
            <option>Direct confirmation recommended</option>
            <option>Limited availability — call to confirm</option>
            <option>Not currently available</option>
          </select>
          <svg
            className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8891A4]"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <CardRow label="Daily volume" delay={600}>
        <Pill tone="green">12 / 40</Pill>
      </CardRow>

      <div
        className="group flex items-center justify-between px-6 py-3.5 transition-colors duration-200 hover:bg-[#F7F9FC]"
        style={{
          animation: "confirmReqFadeUp 0.5s ease-out forwards",
          opacity: 0,
          animationDelay: "670ms",
        }}
      >
        <span className="text-[13.5px] text-[#5B6478]">Audit</span>
        <Pill tone="green">On</Pill>
      </div>
    </div>
  );
}

function CardRow({
  label,
  delay,
  children,
}: {
  label: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="group flex items-center justify-between border-b border-[#EEF1F6] px-6 py-3.5 transition-colors duration-200 hover:bg-[#F7F9FC]"
      style={{
        animation: "confirmReqFadeUp 0.5s ease-out forwards",
        opacity: 0,
        animationDelay: `${delay}ms`,
      }}
    >
      <span className="text-[13.5px] text-[#5B6478]">{label}</span>
      {children}
    </div>
  );
}

function Pill({
  tone,
  icon,
  mono,
  children,
}: {
  tone: "green" | "blue" | "muted";
  icon?: "caution";
  mono?: boolean;
  children: React.ReactNode;
}) {
  const toneClasses =
    tone === "green"
      ? "bg-[#DCF5EE] text-[#0C8A6E]"
      : tone === "blue"
      ? "bg-[#E3E8FB] text-[#3B5BDB]"
      : "bg-[#EEF1F6] text-[#5B6478]";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition-transform duration-200 group-hover:scale-105 ${toneClasses} ${
        mono ? "font-mono tabular-nums" : ""
      }`}
    >
      {icon === "caution" && (
        <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 2.5l6 10.5H2L8 2.5z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path d="M8 7v2.5M8 11.5v.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      )}
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                          */
/* ----------------------------------------------------------------- */
function LeftSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="h-4 w-40 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="space-y-3">
        <div className="h-9 w-full max-w-lg animate-pulse rounded-lg bg-[#E4E8F0]" />
        <div className="h-9 w-5/6 max-w-lg animate-pulse rounded-lg bg-[#E4E8F0]" />
        <div className="h-9 w-2/3 max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
      </div>
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-4 w-5/6 max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-4 w-3/4 max-w-md animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 flex gap-3">
        <div className="h-11 w-60 animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="h-11 w-52 animate-pulse rounded-xl bg-[#E4E8F0]" />
      </div>
      <div className="h-4 w-48 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-10 w-full max-w-lg animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white">
      <div className="flex items-center justify-between border-b border-[#EEF1F6] px-6 py-4">
        <div className="h-4 w-36 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-6 w-14 animate-pulse rounded-full bg-[#E4E8F0]" />
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between border-b border-[#EEF1F6] px-6 py-3.5 last:border-b-0"
        >
          <div className="h-3.5 w-28 animate-pulse rounded bg-[#E4E8F0]" />
          <div className="h-5 w-24 animate-pulse rounded-full bg-[#E4E8F0]" />
        </div>
      ))}
    </div>
  );
}