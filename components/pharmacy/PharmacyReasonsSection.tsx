"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PharmacyReasonsSection
 * Light "why join the network" section — eyebrow badge, heading,
 * subtext, and three reason cards with icon, copy, and a text link.
 */

const REASONS = [
  {
    title: "Reduce avoidable phone traffic",
    description:
      "Convert repetitive availability calls into structured digital signals and pharmacist-controlled confirmation workflows. Free up counter staff.",
    linkLabel: "See how it works",
    icon: "phone",
    tone: "teal",
  },
  {
    title: "Capture local demand",
    description:
      "Appear when nearby patients search for medicines your pharmacy has indicated as available or likely available — driving footfall and fulfillment.",
    linkLabel: "Claim your pharmacy",
    icon: "person",
    tone: "indigo",
  },
  {
    title: "Understand unmet demand",
    description:
      "Use anonymized local search and zero-result signals to improve ordering, anticipate demand, and reduce missed fulfillment opportunities.",
    linkLabel: "Explore Intelligence Pro",
    icon: "bars",
    tone: "amber",
  },
] as const;

export default function PharmacyReasonsSection() {
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-4xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <span className="inline-flex items-center rounded-full border-[#1CC9A838] bg-[#E4F7F2] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#139E85] transition-colors duration-300 hover:bg-[#D5F1EC]">
                  Why join the network
                </span>
              </Reveal>

              <Reveal index={1}>
                <h2 className="mt-5 font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[38px]">
                  Three reasons pharmacies{" "}
                  <span className="text-[#00A99D]">join ZoikoMeds</span>.
                </h2>
              </Reveal>

              <Reveal index={2}>
                <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#5B6478]">
                  Operational relief, patient routing, and demand
                  intelligence — without surrendering control of your data.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Cards ---------------- */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? REASONS.map((reason, i) => (
                <ReasonCard key={reason.title} {...reason} index={i} />
              ))
            : REASONS.map((_, i) => <CardSkeleton key={i} />)}
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
      className="animate-[pharmacyReasonsFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes pharmacyReasonsFadeUp {
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
/*  Reason card                                                       */
/* ----------------------------------------------------------------- */
function ReasonCard({
  title,
  description,
  linkLabel,
  icon,
  tone,
  index,
}: {
  title: string;
  description: string;
  linkLabel: string;
  icon: "phone" | "person" | "bars";
  tone: "teal" | "indigo" | "amber";
  index: number;
}) {
  const iconBg =
    tone === "teal"
      ? "bg-[#DCF5F0] text-[#00A99D]"
      : tone === "indigo"
      ? "bg-[#E3E8FB] text-[#4B5FD9]"
      : "bg-[#FBE9CF] text-[#C8821E]";

  const linkColor =
    tone === "amber"
      ? "text-[#C8821E] hover:text-[#A86A14]"
      : "text-[#00A99D] hover:text-[#03877D]";

  return (
    <div
      className="group rounded-2xl bg-[#F4F6FA] p-7 transition-all duration-300 ease-out animate-[pharmacyReasonsFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_32px_-12px_rgba(15,31,78,0.18)]"
      style={{ opacity: 0, animationDelay: `${300 + index * 130}ms` }}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${iconBg}`}
      >
        <ReasonIcon name={icon} />
      </div>

      <h3 className="mt-5 text-[17px] font-bold text-[#0F1F4E]">{title}</h3>

      <p className="mt-2.5 text-[14px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      <a
        href="#"
        className={`mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold transition-colors duration-200 ${linkColor}`}
      >
        {linkLabel}
        <svg
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3 8H13M13 8L9 4M13 8L9 12"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <style jsx>{`
        @keyframes pharmacyReasonsFadeUp {
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

function ReasonIcon({ name }: { name: "phone" | "person" | "bars" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
    case "phone":
      return (
        <svg {...common}>
          <path
            d="M5 4.5c0-.6.5-1 1-.9l3 .5c.4.1.8.4.9.8l.6 2.2c.1.4 0 .9-.3 1.2l-1.3 1.3c.8 1.8 2.3 3.3 4.1 4.1l1.3-1.3c.3-.3.8-.4 1.2-.3l2.2.6c.4.1.7.5.8.9l.5 3c.1.5-.3 1-.9 1-7.7 0-13.1-5.4-13.1-13.1z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "person":
      return (
        <svg {...common}>
          <circle cx="12" cy="8.5" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M5.5 19c.8-3 3.3-5 6.5-5s5.7 2 6.5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "bars":
      return (
        <svg {...common}>
          <path
            d="M5 19V11M10.5 19V7M16 19V13M21 19H3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                          */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-6 w-44 animate-pulse rounded-full bg-[#EEF1F6]" />
      <div className="h-9 w-[26rem] max-w-full animate-pulse rounded-lg bg-[#EEF1F6]" />
      <div className="h-4 w-full max-w-xl animate-pulse rounded bg-[#EEF1F6]" />
      <div className="h-4 w-2/3 max-w-md animate-pulse rounded bg-[#EEF1F6]" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-[#F4F6FA] p-7">
      <div className="h-11 w-11 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-5 h-5 w-3/4 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-4 h-4 w-32 animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}