"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const ENTERPRISE_FOUNDATIONS = [
  {
    id: "operational-intelligence",
    title: "Operational intelligence",
    description: "Access visibility and reporting — not clinical advice or dispensing.",
  },
  {
    id: "confidence-based",
    title: "Confidence-based",
    description: "Signals and tiers, never exact inventory to unauthorized users.",
  },
  {
    id: "multi-site-ready",
    title: "Multi-site ready",
    description: "Role-based access, facility/region views, SSO, APIs, and audit trails.",
  },
  {
    id: "responsible-ai",
    title: "Responsible AI",
    description: "Bounded, explainable, reviewable, non-clinical outputs.",
  },
] as const;

const ORGANIZATION_TYPES = [
  "Hospital / health system",
  "Health plan / payer",
  "Government / public health",
  "Pharmacy network",
  "Other healthcare organization",
];

const FACILITY_COUNTS = ["1", "2–5", "6–20", "21–50", "50+"];

const INTEREST_AREAS = [
  "Medicine Availability",
  "Shortage Signals",
  "Pharmacy Network",
  "Reports",
  "Integrations",
  "Compliance",
  "API Access",
] as const;

export default function HospitalSystemsEnterpriseBriefingFormSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [interestAreas, setInterestAreas] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function toggleInterestArea(area: string) {
    setInterestAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    // TODO: wire up to enterprise briefing request endpoint
  }

  return (
    <section id="enterprise-briefing" ref={ref} className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">11</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Request an Enterprise Briefing
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">See ZoikoMeds matched to </span>
            <span style={{ color: ACCENT }}>your health system.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-[#5B6478]">
            Request an enterprise briefing to review use cases, deployment scope, security
            requirements, integration needs, and reporting objectives.
          </p>
        </Reveal>

        {/* ── Form + Sidebar ── */}
        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:mt-10 lg:grid-cols-[1fr_320px]">

          {/* ── Form card ── */}
          <Reveal index={3} active={mounted}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border bg-white p-6 sm:p-8"
              style={{
                borderColor: "#E7EAF1",
                boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
              }}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  />
                </Field>

                <Field label="Work email" required>
                  <input
                    type="email"
                    required
                    placeholder="name@healthsystem.org"
                    className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none placeholder:text-[#A6AEC0] focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  />
                </Field>

                <Field label="Phone number" optional>
                  <input
                    type="tel"
                    className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  />
                </Field>

                <Field label="Organization / health system" required>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  />
                </Field>

                <Field label="Job title" required>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  />
                </Field>

                <Field label="Organization type" required>
                  <select
                    required
                    defaultValue=""
                    className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    {ORGANIZATION_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Number of facilities" required>
                  <select
                    required
                    defaultValue=""
                    className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {FACILITY_COUNTS.map((count) => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Region / market" required>
                  <input
                    type="text"
                    required
                    placeholder="e.g. US Northeast, national"
                    className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none placeholder:text-[#A6AEC0] focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  />
                </Field>
              </div>

              {/* Primary area of interest */}
              <div className="mt-5">
                <Label required>Primary area of interest</Label>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {INTEREST_AREAS.map((area) => (
                    <label
                      key={area}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border px-3.5 py-2.5 text-[13px] font-medium text-[#0F1F4E]"
                      style={{
                        borderColor: interestAreas.includes(area) ? ACCENT : "#D8DDE8",
                        backgroundColor: interestAreas.includes(area)
                          ? "rgba(19,165,148,0.06)"
                          : "white",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={interestAreas.includes(area)}
                        onChange={() => toggleInterestArea(area)}
                        className="h-3.5 w-3.5 rounded accent-[#13A594]"
                      />
                      {area}
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mt-5">
                <Field label="Message" optional>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your deployment scope and objectives (no PHI, prescriptions, or exact stock)."
                    className="w-full resize-none rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none placeholder:text-[#A6AEC0] focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  />
                </Field>
              </div>

              {/* Agreement */}
              <div className="mt-6 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 rounded accent-[#13A594]"
                />
                <p className="text-[12.5px] leading-relaxed text-[#5B6478]">
                  I consent to be contacted about ZoikoMeds enterprise solutions and acknowledge
                  the{" "}
                  <Link href="/privacy" className="font-medium underline" style={{ color: ACCENT }}>
                    privacy notice
                  </Link>
                  . <span style={{ color: "#D0455A" }}>*</span>
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[13.5px] font-semibold text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ backgroundColor: ACCENT }}
                  disabled={!agreed}
                >
                  Request Enterprise Briefing
                </button>
                <Link
                  href="/hospital-systems/talk-to-sales"
                  className="inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[13.5px] font-semibold text-[#0F1F4E] transition-colors duration-200 hover:bg-[#F4F6FA]"
                  style={{ borderColor: "#D8DDE8" }}
                >
                  Talk to Solutions Team
                </Link>
              </div>

              <p className="mt-4 flex items-start gap-1.5 text-[12px] leading-relaxed text-[#8A93A8]">
                <span style={{ color: ACCENT }}>○</span>
                A ZoikoMeds representative will review your use cases, deployment scope, and
                security needs. Not medical advice, dispensing, or a pharmacy service — don&apos;t
                include PHI, prescriptions, or exact stock.
              </p>
            </form>
          </Reveal>

          {/* ── Enterprise foundations sidebar ── */}
          <Reveal index={4} active={mounted}>
            <div
              className="rounded-2xl border p-6"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                backgroundColor: "#0F1F4E",
              }}
            >
              <div className="mb-5 flex items-center gap-2">
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" style={{ color: "#2FD4B0" }}>
                  <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                </svg>
                <h3 className="text-[13.5px] font-bold text-white">Enterprise foundations</h3>
              </div>

              <div className="flex flex-col gap-4">
                {ENTERPRISE_FOUNDATIONS.map((item) => (
                  <div key={item.id} className="flex gap-2.5">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                      style={{ color: "#2FD4B0" }}
                    >
                      <path
                        d="M3.2 8.4l3 3 6.6-6.8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <p className="text-[13px] font-semibold text-white">{item.title}</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed" style={{ color: "#9AA3C0" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Field / Label helpers                                              */
/* ------------------------------------------------------------------ */
function Label({
  children,
  required,
  optional,
}: {
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label className="text-[12.5px] font-semibold text-[#0F1F4E]">
      {children}
      {required && <span style={{ color: "#D0455A" }}> *</span>}
      {optional && <span className="ml-1 font-normal text-[#A6AEC0]">(optional)</span>}
    </label>
  );
}

function Field({
  label,
  required,
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label required={required} optional={optional}>
        {label}
      </Label>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
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
        animation: active ? `hospitalSystemsEnterpriseBriefingFormFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes hospitalSystemsEnterpriseBriefingFormFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}