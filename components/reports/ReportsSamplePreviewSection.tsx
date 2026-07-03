"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ReportsSamplePreviewSection
 * "See the structure — safely."
 *
 * Layout: left-aligned eyebrow (04 · SAMPLE REPORT PREVIEW) + 1-line headline (black + teal)
 *         + subtext + white panel with:
 *           - a horizontal tab bar (6 tabs, first active by default)
 *           - 3 stat cards that swap content based on the active tab
 *           - a footer row: disclaimer text (left) + "Request Full Sample Report" button (right)
 *
 * Interaction: clicking a tab swaps the 3 stat cards with a fade transition. Clicking
 * "Request Full Sample Report" expands an inline validated request form (email + name)
 * with submit → spinner → success states, instead of navigating away.
 *
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";
const WARNING = "#D97706";

type StatTone = "positive" | "warning" | "neutral";

const STAT_STYLES: Record<StatTone, { icon: React.ReactNode; color: string }> = {
  positive: {
    color: ACCENT,
    icon: <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
  },
  warning: {
    color: WARNING,
    icon: (
      <>
        <path d="M8 2l6.5 11.5H1.5L8 2z" strokeWidth="1.4" strokeLinejoin="round" stroke="currentColor" fill="none" />
        <path d="M8 6.5v3M8 11.5v.05" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  neutral: {
    color: "#0F1F4E",
    icon: <circle cx="8" cy="8" r="2" fill="currentColor" />,
  },
};

const TABS = [
  {
    label: "Executive Summary",
    stats: [
      { label: "Availability Confidence", value: "Strengthening", tone: "positive" as StatTone },
      { label: "Shortage Signal Watch", value: "Review needed", tone: "warning" as StatTone },
      { label: "Regional Access Review", value: "3 clusters flagged", tone: "neutral" as StatTone },
    ],
  },
  {
    label: "Availability Confidence",
    stats: [
      { label: "Confidence Tier", value: "Tier A", tone: "positive" as StatTone },
      { label: "Signal Strength", value: "High", tone: "positive" as StatTone },
      { label: "Confirmation Coverage", value: "82% verified", tone: "neutral" as StatTone },
    ],
  },
  {
    label: "Shortage Signals",
    stats: [
      { label: "Signal Severity", value: "Elevated", tone: "warning" as StatTone },
      { label: "Demand Movement", value: "Rising", tone: "warning" as StatTone },
      { label: "Regions Affected", value: "2 regions", tone: "neutral" as StatTone },
    ],
  },
  {
    label: "Pharmacy Network",
    stats: [
      { label: "Coverage Ratio", value: "Verified", tone: "positive" as StatTone },
      { label: "Confirmation Cadence", value: "Fresh", tone: "positive" as StatTone },
      { label: "Participating Pharmacies", value: "146 active", tone: "neutral" as StatTone },
    ],
  },
  {
    label: "Regional Access",
    stats: [
      { label: "Access Clusters", value: "3 flagged", tone: "warning" as StatTone },
      { label: "Heat Zones", value: "Aggregated", tone: "neutral" as StatTone },
      { label: "Priority Areas", value: "5 identified", tone: "neutral" as StatTone },
    ],
  },
  {
    label: "Compliance Notes",
    stats: [
      { label: "Audit Trail", value: "Logged", tone: "positive" as StatTone },
      { label: "Source Logic", value: "Noted", tone: "neutral" as StatTone },
      { label: "Disclaimer Status", value: "Current", tone: "positive" as StatTone },
    ],
  },
] as const;

interface FormState {
  fullName: string;
  workEmail: string;
}

const INITIAL_FORM: FormState = { fullName: "", workEmail: "" };

export default function ReportsSamplePreviewSection() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
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

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.workEmail.trim()) nextErrors.workEmail = "Work email is required.";
    else if (!emailPattern.test(form.workEmail.trim())) nextErrors.workEmail = "Enter a valid email address.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      // Replace with your real endpoint.
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  }

  const activeStats = TABS[activeTab].stats;

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">04</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Sample Report Preview
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">See the structure — </span>
            <span style={{ color: ACCENT }}>safely.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[#5B6478]">
            Synthetic sample data only. Detailed reports are gated to protect sensitive data and
            route stakeholders correctly.
          </p>
        </Reveal>

        {/* ── Preview panel ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)]">

            {/* Tab bar */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-[#F0F2F7] bg-[#F8FAFC] p-3">
              {TABS.map((tab, i) => {
                const isActive = i === activeTab;
                return (
                  <button
                    key={tab.label}
                    type="button"
                    onClick={() => setActiveTab(i)}
                    className="rounded-lg px-4 py-2 text-[13px] font-semibold transition-all duration-200"
                    style={
                      isActive
                        ? { backgroundColor: ACCENT, color: "#FFFFFF" }
                        : { backgroundColor: "transparent", color: "#5B6478" }
                    }
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Stat cards */}
            <div key={activeTab} className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3" style={{ animation: "reportsPreviewFade 0.35s ease-out both" }}>
              {activeStats.map((stat) => {
                const style = STAT_STYLES[stat.tone];
                return (
                  <div key={stat.label} className="rounded-xl border border-[#F0F2F7] bg-[#F8FAFC] p-4">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#9AA1B4]">
                      {stat.label}
                    </p>
                    <p className="flex items-center gap-2 text-[14.5px] font-bold" style={{ color: style.color }}>
                      <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                        {style.icon}
                      </svg>
                      {stat.value}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Footer: disclaimer + CTA / inline form */}
            <div className="border-t border-[#F0F2F7] p-6">
              {!formOpen ? (
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <p className="flex items-start gap-2 text-[12px] leading-relaxed text-[#9AA1B4]">
                    <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M8 7.25v4M8 5.1v.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    Synthetic sample data · confidence-based · no exact inventory · not medical
                    advice
                  </p>

                  <button
                    type="button"
                    onClick={() => setFormOpen(true)}
                    className="inline-flex flex-shrink-0 items-center justify-center rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Request Full Sample Report
                  </button>
                </div>
              ) : status === "success" ? (
                <div className="flex items-start gap-3 rounded-xl border border-[#0FAA87]/25 bg-[#0FAA87]/5 p-4">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                    <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div>
                    <p className="text-[13.5px] font-semibold text-[#0F1F4E]">Request received.</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#5B6478]">
                      We&apos;ll send the full sample report to the work email you provided.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" style={{ animation: "reportsPreviewFade 0.3s ease-out both" }}>
                  <p className="text-[13px] font-semibold text-[#0F1F4E]">
                    Get the full sample report by email
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="Full name"
                        className={inputClass(!!errors.fullName)}
                      />
                      {errors.fullName && <p className="mt-1.5 text-[12px] font-medium text-[#E5484D]">{errors.fullName}</p>}
                    </div>
                    <div>
                      <input
                        type="email"
                        value={form.workEmail}
                        onChange={(e) => updateField("workEmail", e.target.value)}
                        placeholder="name@organization.org"
                        className={inputClass(!!errors.workEmail)}
                      />
                      {errors.workEmail && <p className="mt-1.5 text-[12px] font-medium text-[#E5484D]">{errors.workEmail}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-70"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {status === "submitting" && (
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.3" />
                          <path d="M14.5 8a6.5 6.5 0 00-6.5-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      )}
                      {status === "submitting" ? "Sending…" : "Send Sample Report"}
                    </button>
                    <button
                      type="button"
                      onClick={() => { setFormOpen(false); setErrors({}); setStatus("idle"); }}
                      className="text-[13px] font-semibold text-[#5B6478] transition-colors duration-150 hover:text-[#0F1F4E]"
                    >
                      Cancel
                    </button>
                  </div>

                  {status === "error" && (
                    <p className="text-[12.5px] font-medium text-[#E5484D]">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>

          </div>
        </Reveal>

      </div>

      <style>{`
        @keyframes reportsPreviewFade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-lg border bg-[#F8FAFC] px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder:text-[#9AA1B4]",
    "transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0",
    hasError
      ? "border-[#E5484D] focus:ring-[#E5484D]/30"
      : "border-[#E7EAF1] focus:border-[#0FAA87] focus:ring-[#0FAA87]/20",
  ].join(" ");
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `reportsPreviewFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes reportsPreviewFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}