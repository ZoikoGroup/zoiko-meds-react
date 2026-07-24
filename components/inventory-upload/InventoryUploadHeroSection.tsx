"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * InventoryUploadHeroSection
 * Hero / first section of the Inventory Upload page.
 *
 * Layout: two-column (left: copy + CTAs, right: mock signal-controls card)
 * Background: light grey-white (#F4F6FA)
 * Brand accent: #0FAA87
 *
 * NOTE: Hero sections are always visible on load, so we mount immediately
 * after hydration rather than using an IntersectionObserver.
 */

const ACCENT = "#0FAA87";

const SIGNAL_ROWS: { label: string; value: string; variant: PillVariant }[] = [
  { label: "Location",            value: "Austin, TX",          variant: "teal-soft"  },
  { label: "Upload method",       value: "PMS/POS",             variant: "teal-soft"  },
  { label: "Last signal update",  value: "2 hours ago",         variant: "teal-soft"  },
  { label: "Exact public stock",  value: "Hidden",              variant: "grey-icon"  },
  { label: "Controlled category", value: "Restricted handling", variant: "blue-soft"  },
  { label: "Audit",               value: "On",                  variant: "green-bold" },
];

type PillVariant = "teal-soft" | "grey-icon" | "blue-soft" | "green-bold";

export default function InventoryUploadHeroSection() {
  // Hero is always in the viewport — mount right after hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Left column: copy ── */}
          <div className="flex flex-col">
            {/* Eyebrow */}
            <Reveal index={0} active={mounted}>
              <p
                className="mb-4 text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: ACCENT }}
              >
                Inventory Signal Upload
              </p>
            </Reveal>

            {/* Headline */}
            <Reveal index={1} active={mounted}>
              <h1 className="text-[2.4rem] font-extrabold leading-[1.12] tracking-tight text-[#0F1F4E] sm:text-[2.75rem]">
                Share availability signals{" "}
                <span style={{ color: ACCENT }}>
                  without exposing exact public stock.
                </span>
              </h1>
            </Reveal>

            {/* Body */}
            <Reveal index={2} active={mounted}>
              <p className="mt-6 text-[14.5px] leading-relaxed text-[#5B6478]">
                Verified pharmacies can connect approved inventory inputs to
                ZoikoMeds through portal updates, secure file workflows,
                PMS/POS integrations, or APIs — producing confidence-based
                availability signals while protecting pharmacy control, exact
                stock quantities, and dispensing decisions.
              </p>
            </Reveal>

            {/* CTA buttons */}
            <Reveal index={3} active={mounted}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#signal-setup"
                  className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Discuss Inventory Signal Setup
                </Link>

                <Link
                  href="/pharmacy-portal"
                  className="inline-flex items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-6 py-3 text-[13.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
                >
                  Sign In to Pharmacy Portal
                </Link>
              </div>
            </Reveal>

            {/* Text link */}
            <Reveal index={4} active={mounted}>
              <Link
                href="#"
                className="mt-4 inline-block text-[13px] font-medium transition-opacity hover:opacity-80"
                style={{ color: ACCENT }}
              >
                View Pharmacy Data Controls
              </Link>
            </Reveal>

            {/* Disclaimer */}
            <Reveal index={5} active={mounted}>
              <p className="mt-6 flex items-start gap-2 text-[12.5px] leading-relaxed text-[#5B6478]">
                <LockIcon />
                <span>
                  ZoikoMeds uses inventory inputs to support availability
                  confidence. Public results do not display exact pharmacy
                  stock counts.
                </span>
              </p>
            </Reveal>
          </div>

          {/* ── Right column: mock card ── */}
          <Reveal index={2} active={mounted}>
            <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_8px_40px_-16px_rgba(15,31,78,0.12)]">
              {/* Card header */}
              <div className="mb-5 flex items-center justify-between">
                <span className="text-[14.5px] font-bold text-[#0F1F4E]">
                  Inventory signal controls
                </span>
                <StatusPill value="Fresh" variant="green-bold" />
              </div>

              {/* Divider */}
              <div className="mb-1 h-px bg-[#F0F2F7]" />

              {/* Rows */}
              <div className="divide-y divide-[#F0F2F7]">
                {SIGNAL_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between py-3"
                  >
                    <span className="text-[13px] text-[#5B6478]">
                      {row.label}
                    </span>
                    <StatusPill value={row.value} variant={row.variant} />
                  </div>
                ))}
              </div>

              {/* Card footnote */}
              <p className="mt-4 text-[11px] leading-relaxed text-[#9AA3B5]">
                Illustrative interface. Inventory inputs, signal visibility,
                and upload methods are governed by verification, permissions,
                platform rules, and applicable law.
              </p>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  StatusPill                                                           */
/* ------------------------------------------------------------------ */
function StatusPill({
  value,
  variant,
}: {
  value: string;
  variant: PillVariant | "green-bold";
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-medium whitespace-nowrap";

  switch (variant) {
    case "teal-soft":
      return (
        <span className={base} style={{ backgroundColor: "#DCF5EE", color: "#0B7A62" }}>
          {value}
        </span>
      );
    case "grey-icon":
      return (
        <span className={base} style={{ backgroundColor: "#F0F2F7", color: "#5B6478" }}>
          <LockIconTiny />
          {value}
        </span>
      );
    case "blue-soft":
      return (
        <span className={base} style={{ backgroundColor: "#EBF0FF", color: "#3B5BDB" }}>
          {value}
        </span>
      );
    case "green-bold":
      return (
        <span className={base} style={{ backgroundColor: "#DCFAE6", color: "#1A7A40" }}>
          {value}
        </span>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function LockIcon() {
  return (
    <svg
      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#9AA3B5]"
      viewBox="0 0 16 16"
      fill="none"
    >
      <rect x="3" y="7" width="10" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function LockIconTiny() {
  return (
    <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="7" width="10" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal — only animates once active=true                             */
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
          ? `invUploadFadeUp 0.6s ease-out ${index * 90}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes invUploadFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
}