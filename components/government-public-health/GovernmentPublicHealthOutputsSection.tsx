"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const OUTPUTS = [
  {
    icon: "dashboard",
    title: "Jurisdiction dashboard",
    description:
      "Aggregated availability pressure, pharmacy signal coverage, freshness, and regional trends.",
    users: "Public health teams, agency analysts",
  },
  {
    icon: "pulse",
    title: "Shortage pressure signals",
    description:
      "Contract-scoped indicators showing where availability friction may be increasing.",
    users: "Preparedness, policy, agency leadership",
  },
  {
    icon: "monitor",
    title: "Access-risk heatmaps",
    description:
      "Privacy-thresholded geographic views of signal strength, no-signal areas, and emerging pressure.",
    users: "Public health intelligence teams",
  },
  {
    icon: "doc",
    title: "Scheduled intelligence reports",
    description:
      "Periodic summaries of access pressure, signal movement, and relevant medicine categories.",
    users: "Agency leadership, program teams",
  },
  {
    icon: "code",
    title: "Signal feeds & API outputs",
    description:
      "Approved, governed feeds for integration into public-sector workflows or analytical environments.",
    users: "Data teams, integration teams",
  },
  {
    icon: "chat",
    title: "Public communications support pack",
    description:
      "Internal guidance on what can and cannot be communicated publicly.",
    users: "Communications, legal, policy teams",
  },
] as const;

type IconName = "dashboard" | "pulse" | "monitor" | "doc" | "code" | "chat";

export default function GovernmentPublicHealthOutputsSection() {
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
            <span className="opacity-50 text-[#0F1F4E]">02</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Public Health Intelligence Outputs
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">What agencies </span>
            <span style={{ color: ACCENT }}>can evaluate.</span>
          </h2>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
            Defined outputs — without exposing sensitive datasets or implying
            unrestricted access.
          </p>
        </Reveal>

        {/* ── 2×3 output cards ── */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {OUTPUTS.map((card, i) => (
            <OutputCard key={card.title} card={card} index={i + 3} active={mounted} />
          ))}
        </div>

        {/* ── Filled blue info bar ── */}
        <Reveal index={9} active={mounted}>
          <div
            className="mt-5 flex items-start gap-3 rounded-2xl border p-5"
            style={{ borderColor: "#BFDBFE", backgroundColor: "#EFF6FF" }}
          >
            <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-[#2563EB]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-[13px] leading-relaxed text-[#1E3A6E]">
              UX rule: every dashboard and report shows its data scope,
              freshness window, jurisdiction, aggregation threshold, and
              caveat language. Outputs are never presented as exact stock,
              official shortage declarations, or clinical recommendations.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  OutputCard                                                           */
/* ------------------------------------------------------------------ */
function OutputCard({
  card,
  index,
  active,
}: {
  card: typeof OUTPUTS[number];
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index} active={active}>
      <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:shadow-[0_10px_28px_-14px_rgba(15,170,135,0.15)]">
        {/* Teal icon badge */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
        >
          <OutputIcon name={card.icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[14.5px] font-bold leading-snug text-[#0F1F4E]">
          {card.title}
        </h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
          {card.description}
        </p>

        {/* Users */}
        <p className="mt-3 text-[12px] leading-relaxed">
          <span className="font-semibold text-[#0F1F4E]">Users:</span>{" "}
          <span className="text-[#9AA3B5]">{card.users}</span>
        </p>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function OutputIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 20, height: 20 } };
  switch (name) {
    case "dashboard":
      return (
        <svg {...c}>
          <rect x="3" y="4" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13" y="4" width="8" height="10" rx="1" stroke="currentColor" strokeWidth="1.6" />
          <rect x="3" y="12" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.6" />
          <rect x="13" y="16" width="8" height="4" rx="1" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "pulse":
      return (
        <svg {...c}>
          <polyline points="2,12 6,12 8,5 10,19 13,9 15,14 17,12 22,12"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "monitor":
      return (
        <svg {...c}>
          <rect x="3" y="4" width="18" height="13" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "doc":
      return (
        <svg {...c}>
          <rect x="5.5" y="3.5" width="13" height="17" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "code":
      return (
        <svg {...c}>
          <path d="M9 8l-4 4 4 4M15 8l4 4-4 4"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "chat":
      return (
        <svg {...c}>
          <path d="M4 4.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `gphOutputsFadeUp 0.6s ease-out ${index * 75}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes gphOutputsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}