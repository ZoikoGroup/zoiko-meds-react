"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PatientSupportPathFormSection
 * "Choose the right provider workflow path" section — header, three
 * stacked path cards on the left, and a "Request a workflow briefing"
 * form on the right with client-side validation.
 *
 * Brand accent for this page: #0FAA87
 */

const ACCENT = "#0FAA87";

const PATHS = [
  {
    icon: "team",
    title: "Care-team workflow review",
    description:
      "Nurses, care coordinators, patient navigators, and clinic operations teams.",
    cta: "Request Workflow Briefing",
    ctaStyle: "filled",
    link:"#request"
  },
  {
    icon: "building",
    title: "Health system or clinic evaluation",
    description:
      "Hospitals, clinics, telehealth providers, and multi-site care organizations.",
    cta: "Request Provider Briefing",
    ctaStyle: "outline",
    link:"/provider-support"
  },
  {
    icon: "search",
    title: "Patient or caregiver self-service",
    description:
      "People checking availability for themselves or someone they support.",
    cta: "Search Medicines",
    ctaStyle: "outline",
    link:"/searchmed"
  },
] as const;

const ORG_TYPES = [
  "Hospital or health system",
  "Clinic or medical group",
  "Telehealth provider",
  "Care coordination organization",
  "Other",
];

const WORKFLOW_INTERESTS = [
  "Availability search integration",
  "Confirmation request routing",
  "Care-team dashboards",
  "API / EHR integration",
  "Not sure yet",
];

const ROLES = [
  "Care Navigator / Nurse",
  "Clinic Manager / Admin",
  "Physician / Clinician",
  "Executive / Director",
  "Other",
];

const ACCESS_INTERESTS = [
  "Medicine availability search",
  "Shortage navigation & alternative sourcing",
  "Pharmacy confirmation requests",
  "Care coordination workflows",
];

const WORKFLOW_CONTEXTS = [
  "High shortage impact in region",
  "Manual pharmacy phone-call burden",
  "Patient access delays",
  "Exploring digital availability tools",
];

type FormState = {
  email: string;
  fullName: string;
  orgName: string;
  orgType: string;
  jobTitle: string;
  phone: string;
  role: string;
  country: string;
  patientAccessInterest: string;
  shortageWorkflow: string;
  workflowInterest: string;
  note: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  email: "",
  fullName: "",
  orgName: "",
  orgType: "",
  jobTitle: "",
  phone: "",
  role: "",
  country: "",
  patientAccessInterest: "",
  shortageWorkflow: "",
  workflowInterest: "",
  note: "",
  message: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PatientSupportPathFormSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="request" ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
                  Choose the right{" "}
                  <span style={{ color: ACCENT }}>provider workflow path.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-lg text-[14.5px] leading-relaxed text-[#5B6478]">
                  Care teams, provider organizations, and patients — each
                  routed to the right next step.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Paths (left) + Form (right) ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <div className="flex flex-col gap-5">
            {mounted
              ? PATHS.map((p, i) => <PathCard key={p.title} {...p} index={i} />)
              : PATHS.map((_, i) => <PathCardSkeleton key={i} />)}
          </div>

          <div>{mounted ? <BriefingForm /> : <FormSkeleton />}</div>
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
      className="animate-[patientPathFormFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes patientPathFormFadeUp {
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
/*  Path card                                                          */
/* ----------------------------------------------------------------- */
function PathCard({
  icon,
  title,
  description,
  cta,
  ctaStyle,
  index,
  link
}: {
  icon: "team" | "building" | "search";
  title: string;
  description: string;
  cta: string;
  ctaStyle: "filled" | "outline";
  index: number;
  link:string;
}) {
  return (
    <div
      className="group rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[patientPathFormFadeUp_0.55s_ease-out_forwards] hover:-translate-y-1"
      style={{ opacity: 0, animationDelay: `${250 + index * 110}ms` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#9FE3D3";
        e.currentTarget.style.boxShadow =
          "0 14px 32px -16px rgba(15,170,135,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E7EAF1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F1F4E] text-white transition-transform duration-300 group-hover:scale-110">
        <PathIcon name={icon} />
      </div>

      <h3 className="mt-4 text-[15px] font-bold text-[#0F1F4E]">{title}</h3>

      <p className="mt-2 text-[12.5px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      <a
        href={link}
        className={
          ctaStyle === "filled"
            ? "group relative mt-4 inline-flex w-full overflow-hidden rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            : "mt-4 inline-flex w-full items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
        }
        style={
          ctaStyle === "filled"
            ? { backgroundColor: ACCENT, justifyContent: "center" }
            : undefined
        }
        onMouseEnter={(e) => {
          if (ctaStyle === "filled")
            e.currentTarget.style.boxShadow =
              "0 8px 24px -4px rgba(15,170,135,0.45)";
        }}
        onMouseLeave={(e) => {
          if (ctaStyle === "filled") e.currentTarget.style.boxShadow = "none";
        }}
      >
        {ctaStyle === "filled" && (
          <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
        )}
        <span className="relative">{cta}</span>
      </a>
    </div>
  );
}

function PathIcon({ name }: { name: "team" | "building" | "search" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
    case "team":
      return (
        <svg {...common}>
          <circle cx="9" cy="8.5" r="2.6" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16.5" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 19c.5-2.7 2.4-4.3 5-4.3s4.5 1.6 5 4.3M14.5 19c.4-2 1.7-3.3 3.5-3.3s3.1 1.3 3.5 3.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <path
            d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M19 19l-4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Briefing form                                                       */
/* ----------------------------------------------------------------- */
function BriefingForm() {
  const [values, setValues] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(v: FormState): FormErrors {
    const e: FormErrors = {};
    if (!v.email.trim()) e.email = "Work email is required.";
    else if (!EMAIL_REGEX.test(v.email.trim()))
      e.email = "Enter a valid email address.";
    if (!v.fullName.trim()) e.fullName = "Full name is required.";
    if (!v.orgName.trim()) e.orgName = "Organization name is required.";
    if (!v.orgType) e.orgType = "Select an organization type.";
    return e;
  }

  
  function handleChange<K extends keyof FormState>(key: K, val: string) {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  }  
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitting(true);
      setStatus("idle");

      try {
        const res = await fetch("/api/briefing-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            briefingType: `Patient Support Workflow Briefing (${values.orgType || "Patient Support"})`,
            fullName: values.fullName,
            workEmail: values.email,
            organization: values.orgName,
            jobTitle: values.jobTitle,
            phone: values.phone,
            note: `Role: ${values.role}\nCountry: ${values.country}\nPatient Access Interest: ${values.patientAccessInterest}\nShortage Workflow: ${values.shortageWorkflow}\nMessage: ${values.message}`,
          }),
        });

        let data: any = {};
        try {
          data = await res.json();
        } catch {}

        if (res.ok && (data.success || res.status === 200)) {
          setStatus("success");
          setValues(INITIAL_FORM);
          setErrors({});
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
  }

  return (
    <div
      className="rounded-2xl border border-[#E7EAF1] bg-white p-7 shadow-[0_16px_40px_-20px_rgba(15,31,78,0.15)] animate-[patientPathFormFadeUp_0.6s_ease-out_forwards] sm:p-8"
      style={{ opacity: 0, animationDelay: "600ms" }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <h3 className="text-[16px] font-bold text-[#0F1F4E]">
          Request a workflow briefing
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
          Tell us about your organization and patient-support workflow.
          No diagnosis, prescriptions, insurance, or patient identifiers
          — this is a zero-PHI request.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Work email" error={errors.email} full>
            <input
              type="email"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="you@yourorganization.org"
              className={inputClasses(!!errors.email)}
            />
          </Field>

          <Field label="Full name" error={errors.fullName} full>
            <input
              type="text"
              value={values.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Your full name"
              className={inputClasses(!!errors.fullName)}
            />
          </Field>

          <Field label="Organization name" error={errors.orgName}>
            <input
              type="text"
              value={values.orgName}
              onChange={(e) => handleChange("orgName", e.target.value)}
              placeholder="Organization name"
              className={inputClasses(!!errors.orgName)}
            />
          </Field>

          <Field label="Job title" error={errors.jobTitle}>
            <input
              type="text"
              value={values.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              placeholder="Job title"
              className={inputClasses(!!errors.jobTitle)}
            />
          </Field>

          <Field label="Role" error={errors.role}>
            <Select
              value={values.role}
              onChange={(v) => handleChange("role", v)}
              placeholder="Select your role"
              options={ROLES}
              hasError={!!errors.role}
            />
          </Field>

          <Field label="Organization type" error={errors.orgType}>
            <Select
              value={values.orgType}
              onChange={(v) => handleChange("orgType", v)}
              placeholder="Select organization type"
              options={ORG_TYPES}
              hasError={!!errors.orgType}
            />
          </Field>

          <Field label="Country / region" error={errors.country} full>
            <input
              type="text"
              value={values.country}
              onChange={(e) => handleChange("country", e.target.value)}
              placeholder="e.g. United States, United Kingdom"
              className={inputClasses(!!errors.country)}
            />
          </Field>

          <Field
            label="Patient access interest"
            error={errors.patientAccessInterest}
            full
          >
            <Select
              value={values.patientAccessInterest}
              onChange={(v) => handleChange("patientAccessInterest", v)}
              placeholder="Select primary interest"
              options={ACCESS_INTERESTS}
              hasError={!!errors.patientAccessInterest}
            />
          </Field>

          <Field
            label="Shortage / availability workflow"
            error={errors.shortageWorkflow}
            full
          >
            <Select
              value={values.shortageWorkflow}
              onChange={(v) => handleChange("shortageWorkflow", v)}
              placeholder="Select workflow context"
              options={WORKFLOW_CONTEXTS}
              hasError={!!errors.shortageWorkflow}
            />
          </Field>

          <Field label="Message" optional full>
            <textarea
              rows={3}
              value={values.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Brief context on your organization's patient access priorities."
              className={`${inputClasses(false)} resize-none`}
            />
          </Field>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
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
            <span>Request Workflow Briefing</span>
          )}
        </button>

        <p className="mt-3 text-center text-[11.5px] leading-relaxed text-[#9AA3B5]">
          No diagnosis, symptoms, prescriptions, insurance, or patient
          identifiers are collected here. This is a zero-PHI request.
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
      </form>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Shared field/input/select helpers                                  */
/* ----------------------------------------------------------------- */
function Field({
  label,
  error,
  optional,
  full,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label className="mb-1.5 block text-[12.5px] font-semibold text-[#0F1F4E]">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-[#9AA3B5]">(optional)</span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-[12px] text-[#D14343]">
          <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" />
            <path d="M8 5.5v3.2M8 11v.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  value,
  onChange,
  placeholder,
  options,
  hasError,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
  hasError: boolean;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClasses(hasError)} appearance-none pr-9 ${
          value ? "text-[#0F1F4E]" : "text-[#9AA3B5]"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="text-[#0F1F4E]">
            {opt}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8891A4]"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function inputClasses(hasError: boolean) {
  return `w-full rounded-lg border bg-[#FAFBFD] px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder:text-[#9AA3B5] transition-colors duration-200 focus:outline-none focus:bg-white ${
    hasError
      ? "border-[#F0B8B8] focus:border-[#D14343]"
      : "border-[#E0E4EC] focus:border-[#0FAA87]"
  }`;
}

/* ----------------------------------------------------------------- */
/*  Success state                                                       */
/* ----------------------------------------------------------------- */
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <span
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
      >
        <svg className="h-6 w-6" viewBox="0 0 20 20" fill="none">
          <path
            d="M4 10.5l3.5 3.5L16 5.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h3 className="mt-4 text-[16px] font-bold text-[#0F1F4E]">
        Briefing request received
      </h3>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-[#5B6478]">
        We&apos;ll follow up by email to schedule your workflow briefing.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 text-[13px] font-semibold transition-colors duration-200"
        style={{ color: ACCENT }}
      >
        Submit another request
      </button>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                           */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-full max-w-md animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white" />
    </div>
  );
}

function PathCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-4 h-9 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-8">
      <div className="h-5 w-56 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 h-4 w-full animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="h-3 w-28 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-[#E4E8F0]" />
          </div>
        ))}
      </div>
      <div className="mt-6 h-11 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}