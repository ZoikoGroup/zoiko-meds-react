"use client";

import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const LAYERS = [
  {
    layer: 1,
    title: "Canonical medicine entity",
    description:
      "Creates a normalized medicine entity across brand, generic, active ingredient, synonyms, spelling variants, and market-specific naming patterns.",
    value:
      "Improves search precision, matching consistency, and data reuse across products.",
  },
  {
    layer: 2,
    title: "Product & presentation layer",
    description:
      "Models strength, dosage form, route, and pack/presentation context where approved and operationally relevant.",
    value:
      "Reduces ambiguity where similar names carry different operational meaning.",
  },
  {
    layer: 3,
    title: "Identifier mapping layer",
    description:
      "Maps approved identifiers — NDC, RxNorm/RxCUI, GTIN/GS1, DIN, dm+d, ATC, EAN/UPC, local and partner codes — where licensed and applicable.",
    value:
      "Connects local systems, pharmacy feeds, and enterprise datasets.",
  },
  {
    layer: 4,
    title: "Jurisdictional context layer",
    description:
      "Captures market, regulatory, prescription-status, controlled-category, and availability-context fields where supported and legally approved.",
    value: "Supports jurisdiction-aware data products and governance.",
  },
  {
    layer: 5,
    title: "Availability linkage layer",
    description:
      "Connects normalized identity to ZoikoAvail™ confidence signals, freshness metadata, pharmacy participation, and confirmation workflows.",
    value: "Improves availability search and API output consistency.",
  },
  {
    layer: 6,
    title: "Intelligence alignment layer",
    description:
      "Aligns medicine entities across aggregated ZoikoSignal™ outputs such as access pressure, shortage movement, and demand patterns.",
    value: "Makes enterprise intelligence comparable across regions and products.",
  },
] as const;

export default function MediBaseDataIdentityModelSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Eyebrow + heading ---------------- */}
        {mounted ? (
          <>
            <Reveal index={0}>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                01 · Medicine Identity Model
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                Normalize medicine identity before{" "}
                <span style={{ color: ACCENT }}>
                  availability becomes intelligence.
                </span>
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#8891A4]">
                A governed identity graph and classification layer —
                hierarchy, not a flat drug table.
              </p>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-52 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-[#E4E8F0]" />
            <div className="h-4 w-96 animate-pulse rounded bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Layers card ---------------- */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_16px_40px_-16px_rgba(15,31,78,0.10)]">
          {mounted
            ? LAYERS.map((layer, i) => (
                <Reveal key={layer.layer} index={3 + i}>
                  <LayerRow {...layer} isLast={i === LAYERS.length - 1} />
                </Reveal>
              ))
            : Array.from({ length: 6 }).map((_, i) => (
                <LayerRowSkeleton key={i} isLast={i === 5} />
              ))}
        </div>

        {/* ---------------- Critical distinction banner ---------------- */}
        <div className="mt-6">
          {mounted ? (
            <Reveal index={10}>
              <DistinctionBanner />
            </Reveal>
          ) : (
            <div className="h-16 w-full animate-pulse rounded-2xl bg-white" />
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
      className="animate-[zoikoSignalFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 70}ms` }}
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
/*  Layer row                                                          */
/* ----------------------------------------------------------------- */
function LayerRow({
  layer,
  title,
  description,
  value,
  isLast,
}: {
  layer: number;
  title: string;
  description: string;
  value: string;
  isLast: boolean;
}) {
  return (
    <div
      className={`group flex items-start gap-5 px-7 py-6 transition-colors duration-200 hover:bg-[#F7F9FC] ${
        isLast ? "" : "border-b border-[#EEF1F6]"
      }`}
    >
      <span
        className="mt-0.5 flex-shrink-0 rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide transition-transform duration-200 group-hover:scale-105"
        style={{ backgroundColor: "#DCF5EE", color: "#0C8A6E" }}
      >
        Layer {layer}
      </span>

      <div className="flex-1">
        <h4 className="text-[15px] font-bold text-[#0F1F4E]">{title}</h4>
        <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#5B6478]">
          {description}
        </p>
        <div
          className="mt-3 inline-flex items-start gap-1.5 rounded-md border-l-[3px] px-3 py-1.5"
          style={{
            borderColor: ACCENT,
            backgroundColor: "#F4FBF9",
          }}
        >
          <p className="text-[12.5px] leading-relaxed text-[#5B6478]">
            <span className="font-bold" style={{ color: ACCENT }}>
              Enterprise value:
            </span>{" "}
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function LayerRowSkeleton({ isLast }: { isLast: boolean }) {
  return (
    <div
      className={`flex items-start gap-5 px-7 py-6 ${
        isLast ? "" : "border-b border-[#EEF1F6]"
      }`}
    >
      <div className="h-6 w-16 flex-shrink-0 animate-pulse rounded-full bg-[#E4E8F0]" />
      <div className="flex-1">
        <div className="h-4 w-48 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="mt-2 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-[#E4E8F0]" />
        </div>
        <div className="mt-3 h-6 w-72 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Distinction banner                                                  */
/* ----------------------------------------------------------------- */
function DistinctionBanner() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#E7EAF1] bg-white px-6 py-5">
      <span
        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
        style={{ color: "#5B6478" }}
      >
        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M8 7v4M8 5h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </span>
      <p className="text-[13px] leading-relaxed text-[#5B6478]">
        <span className="font-bold text-[#0F1F4E]">
          Critical distinction:
        </span>{" "}
        MediBase™ may support medicine matching. It is not a clinical
        substitution engine, dosing tool, prescription validator,
        interaction checker, or treatment recommendation system.
      </p>
    </div>
  );
}