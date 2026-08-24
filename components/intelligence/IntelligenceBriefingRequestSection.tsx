"use client";

import { useEffect, useRef, useState } from "react";
import { validateEmail } from "@/lib/validation";

const ACCENT = "#0FAA87";

const ORG_TYPES = ["Pharmacy Network", "Healthcare Organization", "Wholesaler / Distributor", "Public Health Agency", "Enterprise Partner", "Other"];
const TIMELINES = ["Immediately", "Within 30 days", "Within 90 days", "Just exploring"];
const INTELLIGENCE_NEEDS = ["Analytics", "AI Insights", "Reports", "Pharmacy Network", "Wholesale / Distribution", "Public Health", "Partnership", "Other"];

interface FormState {
  fullName: string;
  workEmail: string;
  organization: string;
  roleTitle: string;
  organizationType: string;
  region: string;
  intelligenceNeeds: string[];
  timeline: string;
  message: string;
  consent: boolean;
}

const INITIAL_FORM: FormState = {
  fullName: "",
  workEmail: "",
  organization: "",
  roleTitle: "",
  organizationType: "",
  region: "",
  intelligenceNeeds: [],
  timeline: "",
  message: "",
  consent: false,
};

type ErrorState = Partial<Record<keyof FormState, string>>;

export default function IntelligenceBriefingRequestSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<ErrorState>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");

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
    if (serverError) setServerError("");
    if (errors[key]) {
      if (key === "workEmail") {
        const check = validateEmail(String(value));
        setErrors((prev) => ({
          ...prev,
          workEmail: check.isValid ? undefined : check.error || "Please enter a valid email address.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    }
  }

  function toggleNeed(need: string) {
    setForm((prev) => {
      const has = prev.intelligenceNeeds.includes(need);
      return {
        ...prev,
        intelligenceNeeds: has
          ? prev.intelligenceNeeds.filter((n) => n !== need)
          : [...prev.intelligenceNeeds, need],
      };
    });
    if (errors.intelligenceNeeds) setErrors((prev) => ({ ...prev, intelligenceNeeds: undefined }));
  }

  function validate(): boolean {
    const nextErrors: ErrorState = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";

    const emailCheck = validateEmail(form.workEmail);
    if (!emailCheck.isValid) {
      nextErrors.workEmail = emailCheck.error || "Please enter a valid email address.";
    }

    if (!form.organization.trim()) nextErrors.organization = "Organization is required.";
    if (!form.roleTitle.trim()) nextErrors.roleTitle = "Role / title is required.";
    if (!form.organizationType) nextErrors.organizationType = "Select an organization type.";
    if (!form.region.trim()) nextErrors.region = "Region of interest is required.";
    if (form.intelligenceNeeds.length === 0) nextErrors.intelligenceNeeds = "Select at least one intelligence need.";
    if (!form.consent) nextErrors.consent = "Please confirm permission to be contacted.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    if (!validate()) return;

    setStatus("submitting");
    const startTime = Date.now();
    try {
      const res = await fetch("/internal/briefing-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: "Intelligence Briefing",
          fullName: form.fullName.trim(),
          workEmail: form.workEmail.trim(),
          organization: form.organization.trim(),
          roleTitle: form.roleTitle.trim(),
          organizationType: form.organizationType,
          region: form.region.trim(),
          intelligenceNeeds: form.intelligenceNeeds,
          timeline: form.timeline,
          message: form.message.trim(),
          consent: form.consent,
        }),
      });

      const data = await res.json();
      const elapsedMs = Date.now() - startTime;
      console.log(`[Intelligence Briefing Submission] Completed in ${elapsedMs}ms.`);

      if (res.ok && data.success) {
        setStatus("success");
        setForm(INITIAL_FORM);
        setErrors({});
      } else {
        setStatus("error");
        if (data.errors && typeof data.errors === "object") {
          const mapped: ErrorState = {};
          if (data.errors.workEmail || data.errors.email) mapped.workEmail = data.errors.workEmail || data.errors.email;
          if (data.errors.fullName || data.errors.name) mapped.fullName = data.errors.fullName || data.errors.name;
          if (data.errors.organization) mapped.organization = data.errors.organization;
          setErrors((prev) => ({ ...prev, ...mapped }));
        }
        setServerError(data.message || "We couldn't submit your briefing request. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerError("We couldn't submit your briefing request. Please try again.");
    }
  }

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">08</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Request A Briefing
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[1.9rem] font-extrabold leading-tight sm:text-[2.1rem]">
            <span className="text-[#0F1F4E]">Tell us about your organization and </span>
            <span style={{ color: ACCENT }}>use case.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 text-[13.5px] leading-relaxed text-[#5B6478]">
            A ZoikoMeds representative will review your request and respond with the most
            relevant briefing path.
          </p>
        </Reveal>

        {/* ── Form card ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-7 rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)] sm:p-8">

            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0FAA87]/10">
                  <svg className="h-7 w-7" style={{ color: ACCENT }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#0F1F4E]">Request Submitted Successfully</h3>
                <p className="mt-2 max-w-sm text-sm text-[#5B6478]">
                  Thank you! Our team will review your request and contact you soon.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-sm font-semibold hover:opacity-80"
                  style={{ color: ACCENT }}
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Full name" required error={errors.fullName}>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      placeholder="Full name"
                      className={inputClass(!!errors.fullName)}
                    />
                  </Field>

                  <Field label="Work email" required error={errors.workEmail}>
                    <input
                      type="email"
                      value={form.workEmail}
                      onChange={(e) => updateField("workEmail", e.target.value)}
                      placeholder="name@organization.org"
                      className={inputClass(!!errors.workEmail)}
                    />
                  </Field>

                  <Field label="Organization" required error={errors.organization}>
                    <input
                      type="text"
                      value={form.organization}
                      onChange={(e) => updateField("organization", e.target.value)}
                      placeholder="Organization"
                      className={inputClass(!!errors.organization)}
                    />
                  </Field>

                  <Field label="Role / title" required error={errors.roleTitle}>
                    <input
                      type="text"
                      value={form.roleTitle}
                      onChange={(e) => updateField("roleTitle", e.target.value)}
                      placeholder="Your role"
                      className={inputClass(!!errors.roleTitle)}
                    />
                  </Field>

                  <Field label="Organization type" required error={errors.organizationType}>
                    <select
                      value={form.organizationType}
                      onChange={(e) => updateField("organizationType", e.target.value)}
                      className={inputClass(!!errors.organizationType)}
                    >
                      <option value="">Select type</option>
                      {ORG_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Region of interest" required error={errors.region}>
                    <input
                      type="text"
                      value={form.region}
                      onChange={(e) => updateField("region", e.target.value)}
                      placeholder="e.g. US, UK, EU, national, regional"
                      className={inputClass(!!errors.region)}
                    />
                  </Field>
                </div>

                <Field label="Intelligence need" required error={errors.intelligenceNeeds}>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {INTELLIGENCE_NEEDS.map((need) => {
                      const checked = form.intelligenceNeeds.includes(need);
                      return (
                        <label
                          key={need}
                          className="flex cursor-pointer items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-[13px] font-medium text-[#0F1F4E] transition-colors duration-150"
                          style={{
                            backgroundColor: checked ? "rgba(15,170,135,0.06)" : "#F8FAFC",
                            borderColor: checked ? ACCENT : "#E7EAF1",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleNeed(need)}
                            className="h-3.5 w-3.5 flex-shrink-0 rounded border-[#C7CCDA] accent-[#0FAA87]"
                          />
                          {need}
                        </label>
                      );
                    })}
                  </div>
                </Field>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Timeline" optional>
                    <select
                      value={form.timeline}
                      onChange={(e) => updateField("timeline", e.target.value)}
                      className={inputClass(false)}
                    >
                      <option value="">Select timeline</option>
                      {TIMELINES.map((timeline) => (
                        <option key={timeline} value={timeline}>{timeline}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Message" optional>
                    <input
                      type="text"
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="Brief context"
                      className={inputClass(false)}
                    />
                  </Field>
                </div>

                <div>
                  <label className="flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-relaxed text-[#5B6478]">
                    <input
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => updateField("consent", e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 rounded border-[#C7CCDA] accent-[#0FAA87]"
                    />
                    <span>
                      I confirm permission to be contacted about this request and agree to the{" "}
                      <a href="/privacy-center" className="font-semibold underline-offset-2 hover:underline" style={{ color: ACCENT }}>
                        privacy notice
                      </a>
                      . <span className="text-[#E5484D]">*</span>
                    </span>
                  </label>
                  {errors.consent && <p className="mt-1.5 text-[12px] font-medium text-[#E5484D]">{errors.consent}</p>}
                </div>

                {serverError && (
                  <div className="rounded-lg border border-[#E5484D]/20 bg-[#E5484D]/5 p-3 text-center text-[12.5px] font-medium text-[#E5484D]">
                    {serverError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-[13.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-70"
                  style={{ backgroundColor: ACCENT }}
                >
                  {status === "submitting" && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.3" />
                      <path d="M14.5 8a6.5 6.5 0 00-6.5-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  )}
                  {status === "submitting" ? "Submitting..." : "Submit Briefing Request"}
                </button>

                <p className="flex items-start gap-2 text-[11.5px] leading-relaxed text-[#9AA1B4]">
                  <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M8 7.25v4M8 5.1v.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  This submission is not medical advice, emergency support, prescription
                  support, or a pharmacy service. Don&apos;t include PHI, prescriptions, patient
                  identifiers, or exact stock.
                </p>
              </form>
            )}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Field                                                                */
/* ------------------------------------------------------------------ */
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
    <div>
      <label className="mb-1.5 block text-[12.5px] font-semibold text-[#0F1F4E]">
        {label}
        {required && <span className="ml-0.5 text-[#E5484D]">*</span>}
        {optional && <span className="ml-1 font-normal text-[#9AA1B4]">(optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[12px] font-medium text-[#E5484D]">{error}</p>}
    </div>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `intelligenceBriefingFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes intelligenceBriefingFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}