"use client";

import { useEffect, useRef, useState } from "react";
import { internalApi } from "@/lib/config";

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

  const [form, setForm] = useState({
    fullName: "",
    workEmail: "",
    organization: "",
    role: "",
    organizationType: "",
    region: "",
    timeline: "",
    message: "",
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent || submitting) return;
    setSubmitting(true);
    setStatus("idle");

    try {
      const res = await fetch(internalApi("briefing-request"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: `Sample Reports Request (${form.organizationType || "Reports"})`,
          fullName: form.fullName,
          workEmail: form.workEmail,
          organization: form.organization,
          jobTitle: form.role,
          note: `Region: ${form.region}\nInterests: ${interests.join(", ")}\nTimeline: ${form.timeline}\nMessage: ${form.message}`,
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {}

      if (res.ok && (data.success || res.status === 200)) {
        setStatus("success");
        setForm({
          fullName: "",
          workEmail: "",
          organization: "",
          role: "",
          organizationType: "",
          region: "",
          timeline: "",
          message: "",
        });
        setInterests([]);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit request.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred.");
    } finally {
      setSubmitting(false);
    }
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
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </Field>

                <Field label="Work email" required>
                  <input
                    type="email"
                    name="workEmail"
                    value={form.workEmail}
                    onChange={handleChange}
                    required
                    placeholder="name@organization.org"
                    className="input"
                  />
                </Field>

                <Field label="Organization" required>
                  <input
                    type="text"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    required
                    className="input"
                  />
                </Field>

                <Field label="Role" required>
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    required
                    className="input appearance-none"
                  >
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
                  <select
                    name="organizationType"
                    value={form.organizationType}
                    onChange={handleChange}
                    required
                    className="input appearance-none"
                  >
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
                    name="region"
                    value={form.region}
                    onChange={handleChange}
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
                  <select
                    name="timeline"
                    value={form.timeline}
                    onChange={handleChange}
                    className="input appearance-none"
                  >
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
                  <input
                    type="text"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Brief context"
                    className="input"
                  />
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
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: ACCENT }}
              >
                {submitting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
                      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Request Sample Reports"
                )}
              </button>

              <p className="mt-4 flex items-start gap-1.5 text-[11.5px] leading-relaxed text-[#0F1F4E]/45">
                <PinIcon />
                Operational intelligence only — not medical advice, dispensing, or a pharmacy
                service. Don&apos;t include PHI, prescriptions, patient identifiers, or exact
                stock.
              </p>

              {status === "success" && (
                <div ref={successRef} className="mt-4 rounded-xl border border-[#9FE3D3] bg-[#EAFAF4] p-4 text-center text-[13.5px] text-[#00786F]">
                  <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                    <svg className="h-6 w-6 text-[#13A594]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-bold text-[#00786F]">Request Submitted Successfully</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-[#056059]">
                        Thank you! Our team will review your request and contact you soon.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="mt-4 rounded-xl border border-[#F87171]/40 bg-[#FEF2F2] p-4 text-center text-[13px] text-[#C5453F]">
                  <p className="font-medium">{errorMessage || "Something went wrong. Please try again."}</p>
                </div>
              )}

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