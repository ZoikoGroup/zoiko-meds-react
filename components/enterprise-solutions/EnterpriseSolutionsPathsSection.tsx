"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const PATHS = [
  {
    icon: "pulse",
    title: "Intelligence & access-risk monitoring",
    description:
      "Visibility into availability pressure, shortage signals, demand movement, and regional access risk.",
    bestFit: "Strategy, public health, health systems, manufacturers, payers.",
    cta: "Explore ZoikoSignal™",
    href: "/zoikosignal-intelligence",
  },
  {
    icon: "code",
    title: "API & platform integration",
    description:
      "Embed availability checks, confidence signals, or confirmation workflows inside existing digital products.",
    bestFit: "Telehealth, digital health, provider platforms, payer apps, pharmacy systems.",
    cta: "Discuss API Access",
    href: "/zoiko-avail-api",
  },
  {
    icon: "db",
    title: "Medicine identity & data normalization",
    description:
      "Cleaner medicine matching across brands, generics, strengths, forms, markets, and identifiers.",
    bestFit: "Health data teams, pharmacy systems, manufacturers, integration partners.",
    cta: "Explore MediBase™ Data",
    href: "/medibase-data",
  },
  {
    icon: "home",
    title: "Health system workflow support",
    description:
      "Support discharge, care coordination, and patient access workflows without clinical overreach.",
    bestFit: "Hospitals, clinics, provider organizations, care teams.",
    cta: "Request Health System Briefing",
    href: "/health-systems",
  },
  {
    icon: "globe",
    title: "Public health & government visibility",
    description:
      "Monitor availability pressure, shortage movement, population access risk, and jurisdictional intelligence.",
    bestFit: "Governments, public-health agencies, emergency preparedness teams.",
    cta: "Request Public Health Briefing",
    href: "/government-public-health",
  },
] as const;

type IconName = "pulse" | "code" | "db" | "home" | "globe";

export default function EnterpriseSolutionsPathsSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.06 }
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
            <span className="opacity-50 text-[#0F1F4E]">02</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Enterprise Solution Paths
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.3rem]">
            Routed by institutional need.
          </h2>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
            Pick the path that matches your responsibility — no persona sprawl.
          </p>
        </Reveal>

        {/* ── Top row: 3 cards ── */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PATHS.slice(0, 3).map((path, i) => (
            <PathCard key={path.title} path={path} index={i + 3} active={mounted} />
          ))}
        </div>

        {/* ── Bottom row: 2 cards (last cell empty on lg) ── */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PATHS.slice(3).map((path, i) => (
            <PathCard key={path.title} path={path} index={i + 6} active={mounted} />
          ))}
          {/* Empty spacer on large screens */}
          <div className="hidden lg:block" />
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
      <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#9FE3D3] hover:shadow-[0_12px_30px_-14px_rgba(15,170,135,0.18)]">
        {/* Dark navy icon badge */}
        <div
          className="flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#1A2E5A", color: "#6EE7D0" }}
        >
          <PathIcon name={path.icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[15px] font-bold leading-snug text-[#0F1F4E]">
          {path.title}
        </h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#5B6478]">
          {path.description}
        </p>

        {/* Best fit */}
        <p className="mt-3 text-[12.5px] leading-relaxed text-[#5B6478]">
          <span className="font-semibold text-[#0F1F4E]">Best fit:</span>{" "}
          <span className="text-[#8A96B0]">{path.bestFit}</span>
        </p>

        {/* CTA */}
        <Link
          href={path.href}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
        >
          {path.cta}
        </Link>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons — dark navy badge style                                        */
/* ------------------------------------------------------------------ */
function PathIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 22, height: 22 } };
  switch (name) {
    case "pulse":
      return (
        <svg {...c}>
          <polyline points="2,12 6,12 8,5 10,19 13,9 15,14 17,12 22,12"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "code":
      return (
        <svg {...c}>
          <path d="M9 8l-4 4 4 4M15 8l4 4-4 4"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "db":
      return (
        <svg {...c}>
          <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "home":
      return (
        <svg {...c}>
          <path d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `entPathsFadeUp 0.6s ease-out ${index * 75}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes entPathsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}