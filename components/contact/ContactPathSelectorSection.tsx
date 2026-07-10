"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const PATHS = [
  {
    icon: "search",
    title: "Patient or caregiver",
    description:
      "Search medicine availability, saved searches, alerts, caregiver access, availability confidence.",
    warning: "No medical advice or emergency support.",
    cta: "Search Medicines",
    href: "/searchmed",
  },
  {
    icon: "home",
    title: "Pharmacy",
    description:
      "Join the verified network, claim a pharmacy, portal access, verification, inventory signals, confirmation requests, support.",
    warning: "No exact stock in public forms.",
    cta: "Get Pharmacy Support",
    href: "/pharmacy-support",
  },
  {
    icon: "home",
    title: "Healthcare provider",
    description:
      "Provider workflows, patient support, care-team access, referral guidance, signal education.",
    warning: "No PHI in public forms.",
    cta: "Get Provider Support",
    href: "/provider-support",
  },
  {
    icon: "home",
    title: "Enterprise or public sector",
    description:
      "Enterprise briefings, APIs, intelligence, health systems, government, public health, procurement.",
    warning: "Contract-scoped review required.",
    cta: "Request Enterprise Briefing",
    href: "/enterprise",
  },
  {
    icon: "chat",
    title: "Press and media",
    description:
      "Media inquiries, official statements, logos, leadership background, interview requests.",
    warning: "No confidential claims without approval.",
    cta: "Contact Press Team",
    href: "/press",
  },
  {
    icon: "person",
    title: "Careers",
    description:
      "Open roles, talent pipeline, internships, candidate questions, hiring process.",
    warning: "Applications route through the careers workflow.",
    cta: "View Careers",
    href: "/careers",
  },
  {
    icon: "shield",
    title: "Privacy, legal, or security",
    description:
      "Privacy requests, legal notices, accessibility, cookie questions, security concerns.",
    warning: "Sensitive issues require controlled workflows.",
    cta: "Submit Trust Request",
    href: "/trust-center",
  },
  {
    icon: "globe",
    title: "General corporate inquiry",
    description:
      "Partnerships, corporate questions, non-urgent routing, investor or strategic introductions.",
    warning: "Triage before response.",
    cta: "Contact ZoikoMeds",
    href: "/home",
  },
] as const;

type IconName = "search" | "home" | "chat" | "person" | "shield" | "globe";

export default function ContactPathSelectorSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.04 }
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
            <span className="opacity-50 text-[#0F1F4E]">01</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Contact Path Selector
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Start with the reason you are </span>
            <span style={{ color: ACCENT }}>contacting us.</span>
          </h2>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
            Route first, then share details — so sensitive information never
            lands in the wrong channel.
          </p>
        </Reveal>

        {/* ── 2-column path cards ── */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {PATHS.map((path, i) => (
            <PathCard key={path.title} path={path} index={i + 3} active={mounted} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PathCard                                                             */
/* ------------------------------------------------------------------ */
function PathCard({
  path,
  index,
  active,
}: {
  path: typeof PATHS[number];
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index} active={active}>
      <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:shadow-[0_10px_28px_-14px_rgba(15,170,135,0.15)]">

        {/* Header row: icon + title */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
          >
            <PathIcon name={path.icon} />
          </div>
          <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{path.title}</h3>
        </div>

        {/* Description */}
        <p className="mt-3 text-[12.5px] leading-relaxed text-[#5B6478]">
          {path.description}
        </p>

        {/* Amber warning pill */}
        <div className="mt-4 flex items-start gap-2 rounded-lg px-3 py-2.5" style={{ backgroundColor: "#FDF1DD" }}>
          <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: "#C2740A" }} viewBox="0 0 16 16" fill="none">
            <path d="M8 1.8L1 13.5h14L8 1.8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M8 6.5v3.5M8 11.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="text-[12px] leading-relaxed" style={{ color: "#92540A" }}>
            {path.warning}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={path.href}
          className="mt-4 inline-flex w-fit items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
        >
          {path.cta}
        </Link>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function PathIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 18, height: 18 } };
  switch (name) {
    case "search":
      return (
        <svg {...c}>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16.5 16.5l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "home":
      return (
        <svg {...c}>
          <path d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chat":
      return (
        <svg {...c}>
          <path d="M4 4.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "person":
      return (
        <svg {...c}>
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 20c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "shield":
      return (
        <svg {...c}>
          <path d="M12 2.5l7 2.8v5c0 4.8-3.1 8-7 9.4C8.1 18.3 5 15 5 10.3v-5l7-2.8z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "globe":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 12h18M12 3c-2.5 3-4 5.5-4 9s1.5 6 4 9M12 3c2.5 3 4 5.5 4 9s-1.5 6-4 9"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `contactPathFadeUp 0.6s ease-out ${index * 65}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes contactPathFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}