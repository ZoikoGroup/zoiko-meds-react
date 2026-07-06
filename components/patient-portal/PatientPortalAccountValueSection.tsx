"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const ACCOUNT_VALUE_POINTS = [
  {
    id: "save-medicine-searches",
    title: "Save medicine searches",
    description: "Keep priority medicines organized and easy to revisit.",
    linkLabel: "Create account",
    href: "/patient-portal/create-account",
    icon: (
      <path
        d="M4.5 3h7a1 1 0 011 1v9.2l-4.5-2.6-4.5 2.6V4a1 1 0 011-1z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    id: "receive-availability-alerts",
    title: "Receive availability alerts",
    description: "Get notified when availability confidence changes in relevant areas.",
    linkLabel: "Set up alerts",
    href: "/patient-portal/alerts",
    icon: (
      <path
        d="M8 2.5a3.2 3.2 0 013.2 3.2v1.9c0 .9.35 1.76.98 2.4l.42.42H3.4l.42-.42c.63-.64.98-1.5.98-2.4V5.7A3.2 3.2 0 018 2.5zM6.6 12.3a1.4 1.4 0 002.8 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    ),
  },
  {
    id: "review-access-activity",
    title: "Review access activity",
    description: "See recent searches, saved results, alert changes, and support interactions.",
    linkLabel: "View portal preview",
    href: "/patient-portal/preview",
    icon: (
      <>
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 5.2V8l2 1.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    id: "manage-preferences",
    title: "Manage preferences",
    description: "Control communication channels, regions, saved medicines, and privacy settings.",
    linkLabel: "Manage preferences",
    href: "/patient-portal/preferences",
    icon: (
      <>
        <circle cx="8" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path
          d="M8 2.5v1.6M8 11.9v1.6M13.5 8h-1.6M4.1 8H2.5M11.66 4.34l-1.13 1.13M5.47 10.53l-1.13 1.13M11.66 11.66l-1.13-1.13M5.47 5.47L4.34 4.34"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    id: "connect-to-safe-next-steps",
    title: "Connect to safe next steps",
    description: "Use responsible links to pharmacy information, support, and access education.",
    linkLabel: "Search medicines",
    href: "/search",
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

export default function PatientPortalAccountValueSection() {
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
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">02</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Why Create an Account
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">More than a </span>
            <span style={{ color: ACCENT }}>one-time search.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#5B6478]">
            A ZoikoMeds account turns a single medicine lookup into an organized, ongoing view
            of the access that matters to you.
          </p>
        </Reveal>

        {/* ── Card grid ── */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-5">
          {ACCOUNT_VALUE_POINTS.map((point, i) => (
            <Reveal key={point.id} index={3 + i} active={mounted}>
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
                    {point.icon}
                  </svg>
                </div>

                <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{point.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                  {point.description}
                </p>

                <Link
                  href={point.href}
                  className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold transition-colors duration-200"
                  style={{ color: ACCENT }}
                >
                  {point.linkLabel}
                  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                    <path
                      d="M3.5 8h9M8.5 4.5L12 8l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
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
        animation: active ? `patientPortalAccountValueFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes patientPortalAccountValueFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}