"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { internalApi } from "@/lib/config";
import { validateEmail, validatePhone, sanitizePhoneInput, scrollToFirstError } from "@/lib/validation";

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
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    fullName: "",
    workEmail: "",
    phone: "",
    organization: "",
    jobTitle: "",
    organizationType: "",
    systemSize: "",
    region: "",
    timeline: "",
    note: "",
  });

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
    if (errors.interestAreas) {
      setErrors((prev) => ({ ...prev, interestAreas: "" }));
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    let value = e.target.value;
    if (name === "phone") {
      value = sanitizePhoneInput(value);
    }
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";

    const emailCheck = validateEmail(form.workEmail);
    if (!emailCheck.isValid) newErrors.workEmail = emailCheck.error!;

    if (form.phone.trim()) {
      const phoneCheck = validatePhone(form.phone);
      if (!phoneCheck.isValid) newErrors.phone = phoneCheck.error!;
    }

    if (!form.organization.trim()) newErrors.organization = "Organization / health system is required.";
    if (!form.jobTitle.trim()) newErrors.jobTitle = "Job title is required.";
    if (!form.organizationType) newErrors.organizationType = "Please select an organization type.";
    if (!form.systemSize) newErrors.systemSize = "Please select number of facilities.";
    if (!form.region.trim()) newErrors.region = "Region / market is required.";
    if (interestAreas.length === 0) newErrors.interestAreas = "Please select at least one primary area of interest.";

    return newErrors;
  };

  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed || submitting) return;

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = newErrors.workEmail ? "workEmail" : Object.keys(newErrors)[0];
      scrollToFirstError(firstKey);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch(internalApi("briefing-request"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: `Hospital Systems Briefing (${form.organizationType || form.systemSize || "Health System"})`,
          fullName: form.fullName.trim(),
          workEmail: form.workEmail.trim(),
          organization: form.organization.trim(),
          jobTitle: form.jobTitle.trim(),
          phone: form.phone.trim(),
          note: `Organization Type: ${form.organizationType}\nFacilities: ${form.systemSize}\nRegion: ${form.region}\nInterests: ${interestAreas.join(", ")}\nNote: ${form.note}`,
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // Fallback for non-JSON responses
      }

      if (!res.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        }
        throw new Error(data.message || `Submission failed (${res.status})`);
      }

      setStatus("success");
      setForm({
        fullName: "",
        workEmail: "",
        phone: "",
        organization: "",
        jobTitle: "",
        organizationType: "",
        systemSize: "",
        region: "",
        timeline: "",
        note: "",
      });
      setInterestAreas([]);
      setAgreed(false);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
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
              noValidate
              className="rounded-2xl border bg-white p-6 sm:p-8"
              style={{
                borderColor: "#E7EAF1",
                boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
              }}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" required error={errors.fullName}>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594] ${errors.fullName ? "!border-[#DC2626]" : ""}`}
                    style={{ borderColor: errors.fullName ? "#DC2626" : "#D8DDE8" }}
                  />
                </Field>

                <Field label="Work email" required error={errors.workEmail}>
                  <input
                    type="email"
                    name="workEmail"
                    value={form.workEmail}
                    onChange={handleChange}
                    placeholder="name@healthsystem.org"
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none placeholder:text-[#A6AEC0] focus:border-[#13A594] ${errors.workEmail ? "!border-[#DC2626]" : ""}`}
                    style={{ borderColor: errors.workEmail ? "#DC2626" : "#D8DDE8" }}
                  />
                </Field>

                <Field label="Phone number" optional error={errors.phone}>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="e.g. +1 555-123-4567"
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594] ${errors.phone ? "!border-[#DC2626]" : ""}`}
                    style={{ borderColor: errors.phone ? "#DC2626" : "#D8DDE8" }}
                  />
                </Field>

                <Field label="Organization / health system" required error={errors.organization}>
                  <input
                    type="text"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594] ${errors.organization ? "!border-[#DC2626]" : ""}`}
                    style={{ borderColor: errors.organization ? "#DC2626" : "#D8DDE8" }}
                  />
                </Field>

                <Field label="Job title" required error={errors.jobTitle}>
                  <input
                    type="text"
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={handleChange}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594] ${errors.jobTitle ? "!border-[#DC2626]" : ""}`}
                    style={{ borderColor: errors.jobTitle ? "#DC2626" : "#D8DDE8" }}
                  />
                </Field>

                <Field label="Organization type" required error={errors.organizationType}>
                  <select
                    name="organizationType"
                    value={form.organizationType}
                    onChange={handleChange}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594] ${errors.organizationType ? "!border-[#DC2626]" : ""}`}
                    style={{ borderColor: errors.organizationType ? "#DC2626" : "#D8DDE8" }}
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

                <Field label="Number of facilities" required error={errors.systemSize}>
                  <select
                    name="systemSize"
                    value={form.systemSize}
                    onChange={handleChange}
                    className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594] ${errors.systemSize ? "!border-[#DC2626]" : ""}`}
                    style={{ borderColor: errors.systemSize ? "#DC2626" : "#D8DDE8" }}
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

                <Field label="Region / market" required error={errors.region}>
                  <input
                    type="text"
                    name="region"
                    value={form.region}
                    onChange={handleChange}
                    placeholder="e.g. US Northeast, national"
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none placeholder:text-[#A6AEC0] focus:border-[#13A594] ${errors.region ? "!border-[#DC2626]" : ""}`}
                    style={{ borderColor: errors.region ? "#DC2626" : "#D8DDE8" }}
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
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3.5 py-2.5 text-[13px] font-medium text-[#0F1F4E] ${
                        errors.interestAreas ? "!border-[#DC2626]" : ""
                      }`}
                      style={{
                        borderColor: errors.interestAreas
                          ? "#DC2626"
                          : interestAreas.includes(area)
                          ? ACCENT
                          : "#D8DDE8",
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
                {errors.interestAreas && (
                  <span className="mt-1.5 block text-xs font-medium text-[#DC2626]">
                    {errors.interestAreas}
                  </span>
                )}
              </div>

              {/* Message */}
              <div className="mt-5">
                <Field label="Message" optional>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
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
                  <Link href="/privacy-center" className="font-medium underline" style={{ color: ACCENT }}>
                    privacy notice
                  </Link>
                  . <span style={{ color: "#D0455A" }}>*</span>
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[13.5px] font-semibold text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ backgroundColor: ACCENT }}
                  disabled={!agreed || submitting}
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
                    "Request Enterprise Briefing"
                  )}
                </button>
                <Link
                  href="/enterprise-solutions"
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

              {/* Success message in green color centered at bottom of submission box */}
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

              {/* Error message */}
              {status === "error" && (
                <div className="mt-4 rounded-xl border border-[#F87171]/40 bg-[#FEF2F2] p-4 text-center text-[13px] text-[#C5453F]">
                  <p className="font-medium">{errorMessage || "Something went wrong. Please try again."}</p>
                </div>
              )}
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
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label required={required} optional={optional}>
        {label}
      </Label>
      {children}
      {error && (
        <span className="text-xs font-medium text-[#DC2626]">{error}</span>
      )}
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