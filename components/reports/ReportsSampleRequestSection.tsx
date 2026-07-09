"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ReportsSampleRequestSection
 * "Tell us which report and region matters to your team."
 *
 * Layout: light section, left-aligned eyebrow
 *         (07 · REQUEST SAMPLE REPORTS)
 *         + 2-line headline (black + teal) + subtext
 *         + 2-column grid: white form card (left, wider)
 *           and dark navy "Reporting assurances" card (right).
 *
 * Brand accent: #0FAA87 | Navy: #0F1F4E
 */

const ACCENT = "#0FAA87";
const BG = "#F3F4F8";
const NAVY = "#0A0E17";
const PANEL = "#0F1730";

const REPORT_INTERESTS = [
  "Medicine Availability",
  "Shortage Intelligence",
  "Pharmacy Network",
  "Regional Access",
  "Compliance Evidence",
  "Executive Briefing",
] as const;

const ASSURANCES = [
  {
    title: "Synthetic samples",
    body: "Public previews use safe sample data; detailed reports are gated.",
  },
  {
    title: "Confidence-based",
    body: "Confidence tiers and signals, never exact inventory to unauthorized users.",
  },
  {
    title: "Role-based access",
    body: "Reports are access-controlled by user type, organization, and permission.",
  },
  {
    title: "Auditable",
    body: "Generated date, source logic, scope, exclusions, and owner on every report.",
  },
] as const;

export default function ReportsSampleRequestSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  function toggleInterest(label: string) {
    setInterests((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    setSubmitting(true);
    // Wire this up to your form handler / API route.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <section id="sample-reports" ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60 text-[#0F1F4E]">07</span>
            <span className="opacity-40 text-[#0F1F4E]">·</span>
            Request Sample Reports
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.3rem]">
            Tell us which report and region matters
            <br />
            <span style={{ color: ACCENT }}>to your team.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[#0F1F4E]/60">
            We route by report interest, organization type, region, and timeline.
          </p>
        </Reveal>

        {/* ── Grid: form + assurances ── */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[2.1fr_1fr]">

          {/* Form card */}
          <Reveal index={3} active={mounted}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)] sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    type="text"
                    required
                    className="input"
                  />
                </Field>

                <Field label="Work email" required>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.org"
                    className="input"
                  />
                </Field>

                <Field label="Organization" required>
                  <input type="text" required className="input" />
                </Field>

                <Field label="Role" required>
                  <select required defaultValue="" className="input appearance-none">
                    <option value="" disabled>
                      Select role
                    </option>
                    <option>Procurement</option>
                    <option>Pharmacy Operations</option>
                    <option>Compliance</option>
                    <option>Executive</option>
                    <option>Other</option>
                  </select>
                </Field>

                <Field label="Organization type" required>
                  <select required defaultValue="" className="input appearance-none">
                    <option value="" disabled>
                      Select type
                    </option>
                    <option>Hospital / Health system</option>
                    <option>Retail pharmacy</option>
                    <option>Distributor</option>
                    <option>Government / NGO</option>
                    <option>Other</option>
                  </select>
                </Field>

                <Field label="Region of interest" required>
                  <input
                    type="text"
                    required
                    placeholder="e.g. US, UK, EU, regional"
                    className="input"
                  />
                </Field>

                <div className="sm:col-span-2">
                  <span className="mb-2 block text-[12.5px] font-semibold text-[#0F1F4E]">
                    Report interest
                  </span>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                    {REPORT_INTERESTS.map((label) => (
                      <label
                        key={label}
                        className="flex cursor-pointer items-center gap-2.5 text-[13px] text-[#0F1F4E]/80"
                      >
                        <input
                          type="checkbox"
                          checked={interests.includes(label)}
                          onChange={() => toggleInterest(label)}
                          className="h-4 w-4 rounded border-black/20 text-[#0FAA87] focus:ring-[#0FAA87]"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <Field label="Briefing timeline" hint="optional">
                  <select defaultValue="" className="input appearance-none">
                    <option value="" disabled>
                      Select timeline
                    </option>
                    <option>This week</option>
                    <option>This month</option>
                    <option>This quarter</option>
                    <option>Just exploring</option>
                  </select>
                </Field>

                <Field label="Message" hint="optional">
                  <input type="text" placeholder="Brief context" className="input" />
                </Field>
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-relaxed text-[#0F1F4E]/70">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-[#0FAA87] focus:ring-[#0FAA87]"
                />
                <span>
                  I consent to ZoikoMeds contacting me about reporting and briefing options, per the{" "}
                  <a href="/privacy" className="font-medium text-[#0FAA87] hover:underline">
                    privacy notice
                  </a>
                  . <span className="text-red-500">*</span>
                </span>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="mt-6 w-full rounded-xl py-3.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: ACCENT }}
              >
                {submitted ? "Request sent" : submitting ? "Sending…" : "Request Sample Reports"}
              </button>

              <p className="mt-4 flex items-start gap-1.5 text-[11.5px] leading-relaxed text-[#0F1F4E]/45">
                <PinIcon />
                Operational intelligence only — not medical advice, dispensing, or a pharmacy
                service. Don&apos;t include PHI, prescriptions, patient identifiers, or exact
                stock.
              </p>

              <style jsx>{`
                .input {
                  width: 100%;
                  border-radius: 0.65rem;
                  border: 1px solid rgba(15, 31, 78, 0.12);
                  background: #fff;
                  padding: 0.6rem 0.85rem;
                  font-size: 13.5px;
                  color: #0f1f4e;
                }
                .input:focus {
                  outline: none;
                  border-color: ${ACCENT};
                  box-shadow: 0 0 0 3px rgba(15, 170, 135, 0.12);
                }
                .input::placeholder {
                  color: rgba(15, 31, 78, 0.35);
                }
              `}</style>
            </form>
          </Reveal>

          {/* Assurances card */}
          <Reveal index={4} active={mounted}>
            <div
              className="rounded-2xl p-6 sm:p-7"
              style={{ backgroundColor: PANEL }}
            >
              <p className="mb-5 flex items-center gap-2 text-[13.5px] font-semibold text-white">
                <PinIcon light />
                Reporting assurances
              </p>

              <div className="flex flex-col">
                {ASSURANCES.map((a, i) => (
                  <div
                    key={a.title}
                    className="flex gap-2.5 py-4"
                    style={{
                      borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <CheckIcon />
                    <div>
                      <p className="text-[13px] font-semibold text-white">{a.title}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-white/45">{a.body}</p>
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
/*  Field                                                              */
/* ------------------------------------------------------------------ */
function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-[12.5px] font-semibold text-[#0F1F4E]">
        {label}
        {required && <span className="text-red-500">*</span>}
        {hint && <span className="font-normal text-[#0F1F4E]/40">({hint})</span>}
      </span>
      {children}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
      <circle cx="10" cy="10" r="10" fill={ACCENT} fillOpacity="0.16" />
      <path
        d="M6 10.2L8.6 12.8L14 7"
        stroke={ACCENT}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PinIcon({ light }: { light?: boolean }) {
  const color = light ? "#fff" : "currentColor";
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
      <path
        d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.4" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `reportsSampleRequestFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes reportsSampleRequestFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}