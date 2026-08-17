"use client";

import { useEffect, useRef, useState } from "react";
import { internalApi } from "@/lib/config";
import {
  validateEmail,
  validatePhone,
  sanitizePhoneInput,
  scrollToFirstError,
} from "@/lib/validation";

/**
 * OverviewBookDemoSection
 * "See how ZoikoMeds can support your medicine availability strategy."
 *
 * Layout: light section, left-aligned eyebrow
 *         (12 · BOOK A DEMO)
 *         + 2-line headline (black + teal) + subtext
 *         + 2-column grid: white form card (left, wider) and dark
 *           navy "Why teams choose ZoikoMeds" card (right).
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const BG = "#F3F4F8";
const NAVY = "#0F1F4E";
const PANEL = "#0B1226";

const AREAS_OF_INTEREST = [
  "Platform Overview",
  "Availability Intelligence",
  "Pharmacy Network",
  "Wholesale Portal",
  "AI Insights",
  "Reports",
  "Integrations",
  "Partnership",
  "Enterprise Deployment",
] as const;

const REASONS = [
  {
    title: "Category-defining",
    body: "A medicine availability intelligence platform — not a directory, pharmacy, or marketplace.",
  },
  {
    title: "Confidence-based",
    body: "Signals and tiers, never exact inventory to unauthorized users.",
  },
  {
    title: "Enterprise-ready",
    body: "SSO, role-based access, APIs, and compliance-ready reporting.",
  },
  {
    title: "Responsible AI",
    body: "Bounded, explainable, non-clinical operational intelligence.",
  },
] as const;

export default function OverviewBookDemoSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    fullName: "",
    workEmail: "",
    phone: "",
    organization: "",
    jobTitle: "",
    orgType: "",
    country: "",
    timeline: "",
    message: "",
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    setInterests((prev) => {
      const next = prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label];
      if (next.length > 0 && errors.interests) {
        setErrors((p) => ({ ...p, interests: "" }));
      }
      return next;
    });
  }

  function validateSingleField(name: string, value: string): string {
    if (name === "fullName") {
      return !value.trim() ? "Full name is required." : "";
    }
    if (name === "workEmail") {
      const res = validateEmail(value);
      return res.isValid ? "" : res.error || "Please enter a valid email address.";
    }
    if (name === "phone") {
      const res = validatePhone(value, false);
      return res.isValid ? "" : res.error || "Please enter a valid phone number.";
    }
    if (name === "organization") {
      return !value.trim() ? "Organization is required." : "";
    }
    if (name === "jobTitle") {
      return !value.trim() ? "Job title is required." : "";
    }
    if (name === "orgType") {
      return !value.trim() ? "Please select an organization type." : "";
    }
    if (name === "country") {
      return !value.trim() ? "Country / region is required." : "";
    }
    return "";
  }

  function validateForm(): Record<string, string> {
    const errs: Record<string, string> = {};
    const fnErr = validateSingleField("fullName", form.fullName);
    if (fnErr) errs.fullName = fnErr;

    const emailErr = validateSingleField("workEmail", form.workEmail);
    if (emailErr) errs.workEmail = emailErr;

    const phoneErr = validateSingleField("phone", form.phone);
    if (phoneErr) errs.phone = phoneErr;

    const orgErr = validateSingleField("organization", form.organization);
    if (orgErr) errs.organization = orgErr;

    const jtErr = validateSingleField("jobTitle", form.jobTitle);
    if (jtErr) errs.jobTitle = jtErr;

    const otErr = validateSingleField("orgType", form.orgType);
    if (otErr) errs.orgType = otErr;

    const cErr = validateSingleField("country", form.country);
    if (cErr) errs.country = cErr;

    if (interests.length === 0) {
      errs.interests = "Please select at least one area of interest.";
    }

    if (!consent) {
      errs.consent = "Consent is required to proceed.";
    }

    return errs;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "phone") {
      newValue = sanitizePhoneInput(value);
    }
    setForm((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name]) {
      const err = validateSingleField(name, newValue);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const err = validateSingleField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const sanitized = sanitizePhoneInput(pasted);
    setForm((prev) => ({ ...prev, phone: sanitized }));
    if (errors.phone) {
      const err = validateSingleField("phone", sanitized);
      setErrors((prev) => ({ ...prev, phone: err }));
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      scrollToFirstError();
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch(internalApi("briefing-request"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: `Book a Demo (${form.orgType || "Overview"})`,
          fullName: form.fullName,
          workEmail: form.workEmail,
          organization: form.organization,
          jobTitle: form.jobTitle,
          phone: form.phone,
          orgType: form.orgType,
          country: form.country,
          note: `Country: ${form.country}\nInterests: ${interests.join(", ")}\nTimeline: ${form.timeline}\nMessage: ${form.message}`,
        }),
      });

      let data: { success?: boolean; errors?: Record<string, string>; message?: string } = {};
      try {
        data = await res.json();
      } catch {}

      if (res.ok && (data.success || res.status === 200)) {
        setStatus("success");
        setForm({
          fullName: "",
          workEmail: "",
          phone: "",
          organization: "",
          jobTitle: "",
          orgType: "",
          country: "",
          timeline: "",
          message: "",
        });
        setInterests([]);
        setConsent(false);
        setErrors({});
      } else {
        if (data.errors && Object.keys(data.errors).length > 0) {
          setErrors(data.errors);
          scrollToFirstError();
        } else {
          setStatus("error");
          setErrorMessage(data.message || "Failed to submit demo request.");
        }
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="book-a-demo" ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>12</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Book a Demo
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            See how ZoikoMeds can support your
            <br />
            <span style={{ color: ACCENT }}>medicine availability strategy.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed" style={{ color: `${NAVY}99` }}>
            Request a platform briefing to explore how ZoikoMeds can help your organization
            improve medicine access visibility, understand pharmacy network signals, monitor
            shortage risks, and generate compliance-conscious reports.
          </p>
        </Reveal>

        {/* ── Grid: form + reasons ── */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[2.1fr_1fr]">

          {/* Form card */}
          <Reveal index={3} active={mounted}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)] sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" required error={errors.fullName}>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    className={`input ${errors.fullName ? "!border-red-500 focus:!ring-red-500/20" : ""}`}
                  />
                </Field>

                <Field label="Work email" required error={errors.workEmail}>
                  <input
                    type="email"
                    name="workEmail"
                    value={form.workEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="name@organization.org"
                    aria-invalid={!!errors.workEmail}
                    aria-describedby={errors.workEmail ? "workEmail-error" : undefined}
                    className={`input ${errors.workEmail ? "!border-red-500 focus:!ring-red-500/20" : ""}`}
                  />
                </Field>

                <Field label="Phone number" hint="optional" error={errors.phone}>
                  <input
                    type="tel"
                    inputMode="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onPaste={handlePhonePaste}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={`input ${errors.phone ? "!border-red-500 focus:!ring-red-500/20" : ""}`}
                  />
                </Field>

                <Field label="Organization" required error={errors.organization}>
                  <input
                    type="text"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.organization}
                    aria-describedby={errors.organization ? "organization-error" : undefined}
                    className={`input ${errors.organization ? "!border-red-500 focus:!ring-red-500/20" : ""}`}
                  />
                </Field>

                <Field label="Job title" required error={errors.jobTitle}>
                  <input
                    type="text"
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.jobTitle}
                    aria-describedby={errors.jobTitle ? "jobTitle-error" : undefined}
                    className={`input ${errors.jobTitle ? "!border-red-500 focus:!ring-red-500/20" : ""}`}
                  />
                </Field>

                <Field label="Organization type" required error={errors.orgType}>
                  <select
                    name="orgType"
                    value={form.orgType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.orgType}
                    aria-describedby={errors.orgType ? "orgType-error" : undefined}
                    className={`input appearance-none ${errors.orgType ? "!border-red-500 focus:!ring-red-500/20" : ""}`}
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    <option>Hospital / Health system</option>
                    <option>Retail pharmacy</option>
                    <option>Distributor / Wholesaler</option>
                    <option>Manufacturer</option>
                    <option>Government / NGO</option>
                    <option>Other</option>
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Country / region" required error={errors.country}>
                    <input
                      type="text"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. US, UK, EU, national, regional"
                      aria-invalid={!!errors.country}
                      aria-describedby={errors.country ? "country-error" : undefined}
                      className={`input ${errors.country ? "!border-red-500 focus:!ring-red-500/20" : ""}`}
                    />
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <span className="mb-2 block text-[12.5px] font-semibold" style={{ color: NAVY }}>
                    Areas of interest <span className="text-red-500">*</span>
                  </span>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                    {AREAS_OF_INTEREST.map((label) => (
                      <label
                        key={label}
                        className="flex cursor-pointer items-center gap-2.5 text-[13px]"
                        style={{ color: `${NAVY}CC` }}
                      >
                        <input
                          type="checkbox"
                          checked={interests.includes(label)}
                          onChange={() => toggleInterest(label)}
                          className="h-4 w-4 rounded border-black/20 text-[#13A594] focus:ring-[#13A594]"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                  {errors.interests && (
                    <p className="mt-1.5 text-[12px] font-medium text-red-500" role="alert">
                      {errors.interests}
                    </p>
                  )}
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

              <div>
                <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}B3` }}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (e.target.checked && errors.consent) {
                        setErrors((prev) => ({ ...prev, consent: "" }));
                      }
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-[#13A594] focus:ring-[#13A594]"
                  />
                  <span>
                    I consent to ZoikoMeds contacting me about demo and briefing requests, per the{" "}
                    <a href="/privacy-center" className="font-medium text-[#13A594] hover:underline">
                      privacy notice
                    </a>
                    . <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-[12px] font-medium text-red-500" role="alert">
                    {errors.consent}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
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
                    "Book a Demo"
                  )}
                </button>
                <a
                  href="/talk-to-sales"
                  className="flex-1 rounded-xl border py-3.5 text-center text-[14px] font-semibold transition-colors hover:bg-black/[0.03]"
                  style={{ borderColor: `${NAVY}26`, color: NAVY }}
                >
                  Talk to Sales
                </a>
              </div>

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

              {status === "error" && Object.keys(errors).length === 0 && (
                <div className="mt-4 rounded-xl border border-[#F87171]/40 bg-[#FEF2F2] p-4 text-center text-[13px] text-[#C5453F]">
                  <p className="font-medium">{errorMessage || "Something went wrong. Please try again."}</p>
                </div>
              )}

              <p className="mt-4 flex items-start gap-1.5 text-[11.5px] leading-relaxed" style={{ color: `${NAVY}73` }}>
                <PinIcon />
                A ZoikoMeds representative will review your request and route you to the most
                relevant briefing path. Not medical advice, dispensing, or a pharmacy service —
                don&apos;t include PHI, prescriptions, or exact stock.
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
                  box-shadow: 0 0 0 3px rgba(19, 165, 148, 0.12);
                }
                .input::placeholder {
                  color: rgba(15, 31, 78, 0.35);
                }
              `}</style>
            </form>
          </Reveal>

          {/* Reasons card */}
          <Reveal index={4} active={mounted}>
            <div className="rounded-2xl p-6 sm:p-7" style={{ backgroundColor: PANEL }}>
              <p className="mb-5 flex items-center gap-2 text-[13.5px] font-semibold text-white">
                <PinIcon light />
                Why teams choose ZoikoMeds
              </p>

              <div className="flex flex-col">
                {REASONS.map((r, i) => (
                  <div
                    key={r.title}
                    className="flex gap-2.5 py-4"
                    style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <CheckIcon />
                    <div>
                      <p className="text-[13px] font-semibold text-white">{r.title}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-white/45">{r.body}</p>
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
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <span className="mb-1.5 flex items-center gap-1 text-[12.5px] font-semibold" style={{ color: NAVY }}>
        {label}
        {required && <span className="text-red-500">*</span>}
        {hint && <span className="font-normal" style={{ color: `${NAVY}66` }}>({hint})</span>}
      </span>
      {children}
      {error && (
        <p className="mt-1.5 text-[12px] font-medium text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
      <circle cx="10" cy="10" r="10" fill={ACCENT} fillOpacity="0.16" />
      <path d="M6 10.2L8.6 12.8L14 7" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon({ light }: { light?: boolean }) {
  const color = light ? "#fff" : "currentColor";
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
      <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.4" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `overviewBookDemoFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes overviewBookDemoFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}