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
    link:"#"
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

type FormState = {
  email: string;
  fullName: string;
  orgName: string;
  orgType: string;
  workflowInterest: string;
  note: string;
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
  const [values, setValues] = useState<FormState>({
    email: "",
    fullName: "",
    orgName: "",
    orgType: "",
    workflowInterest: "",
    note: "",
  });
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
      // Wire this up to your real submit handler / API call.
      console.log("Request a workflow briefing submission:", values);
    }
  }

  return (
    <div
      className="rounded-2xl border border-[#E7EAF1] bg-white p-7 shadow-[0_16px_40px_-20px_rgba(15,31,78,0.15)] animate-[patientPathFormFadeUp_0.6s_ease-out_forwards] sm:p-8"
      style={{ opacity: 0, animationDelay: "600ms" }}
    >
      {submitted ? (
        <SuccessState onReset={() => setSubmitted(false)} />
      ) : (
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

            <Field label="Organization name" error={errors.orgName} full>
              <input
                type="text"
                value={values.orgName}
                onChange={(e) => handleChange("orgName", e.target.value)}
                placeholder="e.g. Riverside Family Clinic"
                className={inputClasses(!!errors.orgName)}
              />
            </Field>

            <Field label="Organization type" error={errors.orgType} full>
              <Select
                value={values.orgType}
                onChange={(v) => handleChange("orgType", v)}
                placeholder="Select organization type"
                options={ORG_TYPES}
                hasError={!!errors.orgType}
              />
            </Field>

            <Field label="Primary workflow interest" optional full>
              <Select
                value={values.workflowInterest}
                onChange={(v) => handleChange("workflowInterest", v)}
                placeholder="Select workflow interest"
                options={WORKFLOW_INTERESTS}
                hasError={false}
              />
            </Field>

            <Field label="Brief note" optional full>
              <textarea
                value={values.note}
                onChange={(e) => handleChange("note", e.target.value)}
                placeholder="Your patient-support workflow, care-team process, or integration interest"
                rows={3}
                className={`${inputClasses(false)} resize-none`}
              />
            </Field>
          </div>

          <button
            type="submit"
            className="group relative mt-6 w-full overflow-hidden rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            style={{ backgroundColor: ACCENT }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 8px 24px -4px rgba(15,170,135,0.45)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
            <span className="relative">Request Workflow Briefing</span>
          </button>

          <p className="mt-3 text-center text-[11.5px] leading-relaxed text-[#9AA3B5]">
            No diagnosis, symptoms, prescriptions, insurance, or patient
            identifiers are collected here. This is a zero-PHI request.
          </p>
        </form>
      )}
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