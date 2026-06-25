"use client";

import { useEffect, useRef, useState } from "react";

/**
 * InventoryUploadDataStructureSection
 * "Clean inputs create safer availability signals."
 *
 * Layout: centred header + two-column body
 *   Left:  white card with 5 data-category rows (title, description, teal/lock note)
 *   Right: validation checklist + standards-aware integration sub-card
 *
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";

const DATA_CATEGORIES = [
  {
    title: "Pharmacy / branch identifier",
    description: "Maps the input to the correct verified workspace and branch.",
    note: "Internal IDs never exposed publicly",
    noteIcon: "lock",
  },
  {
    title: "Medicine identifier or mapped name",
    description: "Matched to MediBase-approved medicine identity rules.",
    note: "Only user-safe medicine labels shown",
    noteIcon: "check",
  },
  {
    title: "Availability input",
    description: "Contributes to confidence scoring and signal state.",
    note: "Exact quantities never shown publicly",
    noteIcon: "lock",
  },
  {
    title: "Timestamp / freshness",
    description: "Supports signal freshness and stale-data degradation.",
    note: "Only user-safe freshness language",
    noteIcon: "check",
  },
  {
    title: "Source method",
    description: "Identifies portal, file, PMS/POS, or API source.",
    note: "Not shown to consumers unless approved",
    noteIcon: "lock",
  },
  {
    title: "Visibility & restriction flags",
    description: "Supports pause, suppression, controlled category, and branch rules.",
    note: "Sensitive rules not exposed",
    noteIcon: "lock",
  },
] as const;

const VALIDATION_RULES = [
  "File format, encoding, and required-field validation.",
  "Pharmacy, organization, and branch mapping validation.",
  "Medicine identity matching against approved MediBase rules.",
  "Duplicate-record detection and stale-record handling.",
  "Unsupported-value detection for quantities, status, or categories.",
  "Controlled, restricted, and jurisdiction-sensitive handling.",
  "Upload-source authorization and role-permission checks.",
  "Error reports that avoid exposing sensitive system internals.",
] as const;

const STANDARDS_TAGS = ["NDC", "GTIN", "GS1", "NCPDP-aligned", "REST API", "SFTP", "Webhooks"] as const;

export default function InventoryUploadDataStructureSection() {
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

        {/* ── Header ── */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal index={0} active={mounted}>
            <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.2rem]">
              Clean inputs create safer availability signals.
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="mx-auto mt-4 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
              What pharmacy operations and IT teams should expect before setup —
              structure, mapping, and validation, without exposing templates or
              credentials.
            </p>
          </Reveal>
        </div>

        {/* ── Two-column body ── */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">

          {/* Left: data categories card */}
          <Reveal index={2} active={mounted}>
            <div className="flex flex-col gap-0 rounded-2xl border border-[#E7EAF1] bg-white overflow-hidden">
              {/* Column header */}
              <div className="px-6 pt-6 pb-4">
                <p className="text-[13px] font-semibold text-[#0F1F4E]">
                  Data categories for structured inputs
                </p>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#F0F2F7]">
                {DATA_CATEGORIES.map((cat) => (
                  <div key={cat.title} className="px-6 py-4">
                    <p className="text-[13.5px] font-bold text-[#0F1F4E]">
                      {cat.title}
                    </p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-[#5B6478]">
                      {cat.description}
                    </p>
                    <p
                      className="mt-2 flex items-center gap-1.5 text-[12px] font-medium"
                      style={{ color: ACCENT }}
                    >
                      {cat.noteIcon === "lock" ? <LockIconTiny /> : <CheckIconTiny />}
                      {cat.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: validation rules + standards card */}
          <div className="flex flex-col gap-6">
            <Reveal index={3} active={mounted}>
              <div>
                <p className="mb-4 text-[13px] font-semibold text-[#0F1F4E]">
                  Validation rules
                </p>
                <ul className="flex flex-col gap-3">
                  {VALIDATION_RULES.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center"
                        style={{ color: ACCENT }}
                      >
                        <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                          <path
                            d="M3 8.5l3.5 3.5 6.5-7"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span className="text-[13px] leading-relaxed text-[#5B6478]">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Standards sub-card */}
            <Reveal index={4} active={mounted}>
              <div className="rounded-2xl border border-[#E7EAF1] bg-white p-5">
                <p className="mb-3 text-[13px] font-bold text-[#0F1F4E]">
                  Standards-aware integration
                </p>
                <div className="flex flex-wrap gap-2">
                  {STANDARDS_TAGS.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[#E0E4EF] bg-[#F4F6FA] px-2.5 py-1 text-[12px] font-medium text-[#3B4872]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-[11.5px] leading-relaxed text-[#9AA3B5]">
                  Documentation may reference these standards and identifiers
                  where applicable. ZoikoMeds does not publish a compliance
                  claim unless verified by legal, compliance, and engineering.
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function LockIconTiny() {
  return (
    <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="7" width="10" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function CheckIconTiny() {
  return (
    <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8.5l3.5 3.5 6.5-7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
          ? `invDataFadeUp 0.6s ease-out ${index * 90}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes invDataFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}