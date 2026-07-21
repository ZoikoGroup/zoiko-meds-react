"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const BOUNDARY_CARDS = [
  {
    icon: "box",
    title: "No exact public stock counts",
    description:
      "ZoikoMeds uses confidence-based availability signals, not public exact pharmacy stock.",
  },
  {
    icon: "doc-minus",
    title: "Data-minimized workflow",
    description:
      "Avoid collecting diagnosis, symptoms, prescription images, clinical notes, insurance IDs, and PHI unless a separately approved workflow requires it.",
  },
  {
    icon: "person",
    title: "Patient-owned follow-up",
    description:
      "Where possible, patients and caregivers own saved searches, alerts, and notification preferences through their own account.",
  },
  {
    icon: "share",
    title: "Privacy-safe sharing",
    description:
      "Shared guidance should be plain-language, limited, and free from unnecessary clinical or personal health information.",
  },
  {
    icon: "phone",
    title: "Pharmacy confirmation still required",
    description:
      "Availability signals direct patients toward pharmacy confirmation rather than imply stock certainty.",
  },
  {
    icon: "alert",
    title: "Emergency care excluded",
    description:
      "Emergency situations must be routed to emergency services, not ZoikoMeds workflows.",
  },
] as const;

const CAN_DO = [
  "Helping patients understand what an availability signal means",
  "Checking medicine availability signals by location",
  "Guiding patients to confirm directly with pharmacies",
  "Explaining saved searches and alerts",
  "Sharing patient-safe next-step guidance",
  "Supporting caregivers with availability search organization",
  "Routing institutional teams to enterprise/provider briefings",
];

const CANNOT_DO = [
  "Prescribing or changing prescriptions",
  "Recommending substitutes, doses, or treatment changes",
  "Validating prescriptions or dispensing eligibility",
  "Guaranteeing medicine availability",
  "Reserving, allocating, selling, or delivering medicine",
  "Storing patient medical records by default",
  "Replacing pharmacist or provider judgment, or handling emergencies",
];

type IconName = "box" | "doc-minus" | "person" | "share" | "phone" | "alert";

export default function PatientSupportBoundariesSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mx-auto max-w-xl text-center">
          <Reveal index={0} active={mounted}>
            <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.2rem]">
              Clear support,{" "}
              <span style={{ color: ACCENT }}>clear boundaries.</span>
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-[#5B6478]">
              What care teams can do with ZoikoMeds — and what always stays
              outside it.
            </p>
          </Reveal>
        </div>

        {/* ── 2×3 boundary cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {BOUNDARY_CARDS.map((card, i) => (
            <BoundaryCard key={card.title} {...card} index={i} active={mounted} />
          ))}
        </div>

        {/* ── Can / Cannot two-column cards ── */}
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Can do */}
          <Reveal index={9} active={mounted}>
            <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
              <p className="mb-4 flex items-center gap-2 text-[13.5px] font-bold" style={{ color: ACCENT }}>
                <CheckIcon />
                What care teams can use ZoikoMeds for
              </p>
              <ul className="flex flex-col gap-2.5">
                {CAN_DO.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0" style={{ color: ACCENT }}>
                      <CheckIcon size={14} />
                    </span>
                    <span className="text-[12.5px] leading-relaxed text-[#5B6478]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Cannot do */}
          <Reveal index={10} active={mounted}>
            <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
              <p className="mb-4 flex items-center gap-2 text-[13.5px] font-bold text-[#0F1F4E]">
                <XIcon />
                What ZoikoMeds must not be used for
              </p>
              <ul className="flex flex-col gap-2.5">
                {CANNOT_DO.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0 text-[#E05252]">
                      <XIcon size={14} />
                    </span>
                    <span className="text-[12.5px] leading-relaxed text-[#5B6478]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>

        {/* ── CTA button ── */}
        <Reveal index={11} active={mounted}>
          <div className="mt-7">
            <Link
              href="/trust-center"
              className="inline-flex items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
            >
              Visit Trust Center
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  BoundaryCard — horizontal: icon left, text right                    */
/* ------------------------------------------------------------------ */
function BoundaryCard({
  icon,
  title,
  description,
  index,
  active,
}: {
  icon: IconName;
  title: string;
  description: string;
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index + 2} active={active}>
      <div className="flex h-full items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:shadow-[0_8px_24px_-14px_rgba(15,170,135,0.15)]">
        <div
          className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
        >
          <BoundaryIcon name={icon} />
        </div>
        <div>
          <p className="text-[13.5px] font-bold text-[#0F1F4E]">{title}</p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-[#5B6478]">{description}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function BoundaryIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 18, height: 18 } };
  switch (name) {
    case "box":
      return (
        <svg {...c}>
          <rect x="3" y="7" width="18" height="13" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 11h18M9 7V4h6v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 14.5h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "doc-minus":
      return (
        <svg {...c}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "person":
      return (
        <svg {...c}>
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 20c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "share":
      return (
        <svg {...c}>
          <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6"  cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8.5 10.5l7-4M8.5 13.5l7 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "phone":
      return (
        <svg {...c}>
          <path
            d="M5 4.5c0-.6.5-1 1-.9l3 .5c.4.1.8.4.9.8l.6 2.2c.1.4 0 .9-.3 1.2l-1.3 1.3c.8 1.8 2.3 3.3 4.1 4.1l1.3-1.3c.3-.3.8-.4 1.2-.3l2.2.6c.4.1.7.5.8.9l.5 3c.1.5-.3 1-.9 1C11.4 18.5 5.5 12.6 5 4.5z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"
          />
        </svg>
      );
    case "alert":
      return (
        <svg {...c}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M12 9v4M12 17h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div
      style={{
        opacity: active ? undefined : 0,
        animation: active
          ? `patientBoundsFadeUp 0.6s ease-out ${index * 70}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes patientBoundsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}