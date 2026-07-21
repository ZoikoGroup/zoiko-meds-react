"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const USER_TYPES = [
  {
    icon: "search",
    title: "Patient",
    description:
      "Search for a medicine, review the signal, check pharmacy details, and confirm directly before traveling.",
    cta: "Search Medicines",
    href: "/searchmed",
  },
  {
    icon: "shield",
    title: "Caregiver",
    description:
      "Search or save availability checks for someone you support — without creating medical authority or clinical records.",
    cta: "Explore Caregiver Access",
    href: "/caregiver-access",
  },
  {
    icon: "home",
    title: "Provider or care team",
    description:
      "Support access conversations, not clinical decisions, prescribing, or substitution advice.",
    cta: "View Provider Guidance",
    href: "/provider-support",
  },
  {
    icon: "home2",
    title: "Pharmacy",
    description:
      "Manage availability participation and confirmation workflows without public exact-stock exposure.",
    cta: "Sign In to Pharmacy Portal",
    href: "/pharmacy-portal",
  },
  {
    icon: "home3",
    title: "Enterprise or public sector",
    description:
      "Use governed aggregate intelligence and APIs under contract, privacy controls, and approved access scope.",
    cta: "Request Enterprise Briefing",
    href: "/enterprise",
  },
] as const;

type IconName = "search" | "shield" | "home" | "home2" | "home3";

export default function MedicalDisclaimerSafeUsageSection() {
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

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">03</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            How to Use ZoikoMeds Safely
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Turn the signal into a safe </span>
            <span style={{ color: ACCENT }}>next step.</span>
          </h2>
        </Reveal>

        {/* ── Top row: 3 cards ── */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USER_TYPES.slice(0, 3).map((item, i) => (
            <UserCard key={item.title} item={item} index={i + 2} active={mounted} />
          ))}
        </div>

        {/* ── Bottom row: 2 cards left-aligned ── */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {USER_TYPES.slice(3).map((item, i) => (
            <UserCard key={item.title} item={item} index={i + 5} active={mounted} />
          ))}
          {/* Empty spacer on large screens */}
          <div className="hidden lg:block" />
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  UserCard                                                             */
/* ------------------------------------------------------------------ */
function UserCard({
  item,
  index,
  active,
}: {
  item: typeof USER_TYPES[number];
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index} active={active}>
      <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#9FE3D3] hover:shadow-[0_12px_30px_-14px_rgba(15,170,135,0.18)]">
        {/* Dark navy icon badge */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#1A2E5A", color: "#6EE7D0" }}
        >
          <UserIcon name={item.icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[14.5px] font-bold text-[#0F1F4E]">{item.title}</h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
          {item.description}
        </p>

        {/* CTA */}
        <Link
          href={item.href}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
        >
          {item.cta}
        </Link>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function UserIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 20, height: 20 } };
  switch (name) {
    case "search":
      return (
        <svg {...c}>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.7" />
          <path d="M16.5 16.5l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg {...c}>
          <path d="M12 2.5l7 2.8v5c0 4.8-3.1 8-7 9.4C8.1 18.3 5 15 5 10.3v-5l7-2.8z"
            stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      );
    case "home":
      return (
        <svg {...c}>
          <path d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "home2":
      return (
        <svg {...c}>
          <path d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 20v-5h4v5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "home3":
      return (
        <svg {...c}>
          <rect x="3" y="7" width="18" height="13" rx="1.4" stroke="currentColor" strokeWidth="1.7" />
          <path d="M3 11l9-8 9 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="10" y="14" width="4" height="6" rx="0.6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `medDiscSafeFadeUp 0.6s ease-out ${index * 75}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes medDiscSafeFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}