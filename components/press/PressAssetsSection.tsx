"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const ASSETS = [
  {
    icon: "doc",
    title: "Company fact sheet",
    description:
      "Official description, operating company, category, headquarters, legal boundaries, and approved boilerplate.",
    tags: ["PDF", "v1.0", "Public"],
    status: "Approved · reviewed on publish",
    cta: "Download",
    ctaVariant: "outline" as const,
  },
  {
    icon: "image",
    title: "Brand assets",
    description:
      "Approved ZoikoMeds logo files, favicon, color palette, spacing rules, and brand usage rules.",
    tags: ["SVG / PNG", "v1.0", "Usage rules apply"],
    status: "Approved · subject to legal terms",
    cta: "Download",
    ctaVariant: "outline" as const,
  },
  {
    icon: "monitor",
    title: "Product screenshots",
    description:
      "Approved, anonymized UI for search, availability confidence, enterprise dashboard, and pharmacy portal contexts.",
    tags: ["PNG", "Anonymized", "Claim-reviewed"],
    status: "No patient or stock data",
    cta: "Download",
    ctaVariant: "outline" as const,
  },
  {
    icon: "person",
    title: "Leadership materials",
    description:
      "Approved leadership bios, headshots, and spokesperson topics.",
    tags: ["PDF / JPG", "Media-request gated"],
    status: "Request access",
    cta: "Request",
    ctaVariant: "outline" as const,
  },
  {
    icon: "list",
    title: "Media backgrounder",
    description:
      "Plain-English explanation of medicine availability infrastructure, confidence-based signals, and governance boundaries.",
    tags: ["PDF", "v1.0", "Public"],
    status: "Approved",
    cta: "Download",
    ctaVariant: "outline" as const,
  },
  {
    icon: "shield",
    title: "Trust & legal summary",
    description:
      "Not-a-pharmacy statement, privacy stance, no stock guarantee, and no exact public stock exposure.",
    tags: ["PDF", "v1.0", "Public"],
    status: "Approved",
    cta: "Download",
    ctaVariant: "outline" as const,
  },
] as const;

type IconName = "doc" | "image" | "monitor" | "person" | "list" | "shield";

export default function PressAssetsSection() {
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
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">02</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Press Kit &amp; Brand Assets
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Approved, current, and </span>
            <span style={{ color: ACCENT }}>version-controlled.</span>
          </h2>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
            Each asset shows file type, version, and usage rule. Only approved,
            non-superseded assets are downloadable.
          </p>
        </Reveal>

        {/* ── 2×3 asset cards ── */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ASSETS.map((asset, i) => (
            <AssetCard
              key={asset.title}
              asset={asset}
              index={i + 3}
              active={mounted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  AssetCard                                                            */
/* ------------------------------------------------------------------ */
function AssetCard({
  asset,
  index,
  active,
}: {
  asset: (typeof ASSETS)[number];
  index: number;
  active: boolean;
}) {
  return (
    <Reveal index={index} active={active}>
      <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:shadow-[0_10px_28px_-14px_rgba(15,170,135,0.15)]">
        {/* Icon */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
        >
          <AssetIcon name={asset.icon} />
        </div>

        {/* Title */}
        <h3 className="mt-4 text-[14.5px] font-bold text-[#0F1F4E]">
          {asset.title}
        </h3>

        {/* Description */}
        <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
          {asset.description}
        </p>

        {/* Tag pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {asset.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[#E0E4EF] bg-[#F4F6FA] px-2 py-1 text-[10.5px] font-medium text-[#5B6478]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status line */}
        <p
          className="mt-3 flex items-center gap-1.5 text-[12px] font-medium"
          style={{ color: ACCENT }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 8.5l3.5 3.5 6.5-7"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {asset.status}
        </p>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function AssetIcon({ name }: { name: IconName }) {
  const c = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    style: { width: 20, height: 20 },
  };
  switch (name) {
    case "doc":
      return (
        <svg {...c}>
          <rect
            x="5.5"
            y="3.5"
            width="13"
            height="17"
            rx="1.4"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "image":
      return (
        <svg {...c}>
          <rect
            x="3"
            y="4"
            width="18"
            height="16"
            rx="1.6"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle
            cx="8.5"
            cy="9.5"
            r="1.6"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M3 16l5-5 4 4 3-3 6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "monitor":
      return (
        <svg {...c}>
          <rect
            x="3"
            y="4"
            width="18"
            height="13"
            rx="1.6"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8 21h8M12 17v4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "person":
      return (
        <svg {...c}>
          <circle
            cx="12"
            cy="8"
            r="3.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M4.5 20c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "list":
      return (
        <svg {...c}>
          <path
            d="M8 6h13M8 12h13M8 18h13"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="3.5" cy="6" r="1.3" fill="currentColor" />
          <circle cx="3.5" cy="12" r="1.3" fill="currentColor" />
          <circle cx="3.5" cy="18" r="1.3" fill="currentColor" />
        </svg>
      );
    case "shield":
      return (
        <svg {...c}>
          <path
            d="M12 2.5l7 2.8v5c0 4.8-3.1 8-7 9.4C8.1 18.3 5 15 5 10.3v-5l7-2.8z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
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
        animation: active
          ? `pressAssetsFadeUp 0.6s ease-out ${index * 75}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes pressAssetsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
