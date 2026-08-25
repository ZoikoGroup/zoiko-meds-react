"use client";

import { useEffect, useRef, useState } from "react";
import { validateEmail, scrollToFirstError } from "@/lib/validation";

const ACCENT = "#0FAA87";

const ORGANIZATION_TYPES = [
  "Telehealth platform",
  "Payer / PBM",
  "Health system / provider",
  "Digital health / patient app",
  "Pharmacy operator",
  "Government / public health",
  "Other",
] as const;

const PRIMARY_INTERESTS = [
  "API evaluation",
  "Technical briefing",
  "Security & procurement",
  "Medicine data review",
] as const;

type FormState = {
  workEmail: string;
  fullName: string;
  organizationName: string;
  organizationType: string;
  primaryInterest: string;
  note: string;
};

const INITIAL_FORM: FormState = {
  workEmail: "",
  fullName: "",
  organizationName: "",
  organizationType: "",
  primaryInterest: "",
  note: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function ZoikoAvailApiRequestAccessSection() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  const validate = (v: FormState): FormErrors => {
    const e: FormErrors = {};
    const emailCheck = validateEmail(v.workEmail);
    if (!emailCheck.isValid) {
      e.workEmail = emailCheck.error || "Please enter a valid email address.";
    }
    if (!v.fullName.trim()) {
      e.fullName = "Full name is required.";
    }
    if (!v.organizationName.trim()) {
      e.organizationName = "Organization name is required.";
    }
    if (!v.organizationType) {
      e.organizationType = "Select an organization type.";
    }
    return e;
  };

  const handleChange = (
    field: keyof FormState,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage("");
    if (errors[field]) {
      if (field === "workEmail") {
        const check = validateEmail(value);
        setErrors((prev) => ({
          ...prev,
          workEmail: check.isValid ? undefined : check.error || "Please enter a valid email address.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMessage("");

    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = nextErrors.workEmail ? "workEmail" : (Object.keys(nextErrors)[0] as keyof FormState);
      scrollToFirstError(firstKey);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/internal/briefing-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: `Zoiko Avail API Access Request (${formData.organizationType || "API Access"})`,
          fullName: formData.fullName.trim(),
          workEmail: formData.workEmail.trim(),
          organization: formData.organizationName.trim(),
          orgType: formData.organizationType.trim(),
          primaryInterest: formData.primaryInterest.trim(),
          note: formData.note.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setErrors({});
        setTimeout(() => {
          if (successRef.current) {
            successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 50);
      } else {
        if (data.errors && typeof data.errors === "object") {
          const mapped: FormErrors = {};
          if (data.errors.workEmail || data.errors.email) mapped.workEmail = data.errors.workEmail || data.errors.email;
          if (data.errors.fullName || data.errors.name) mapped.fullName = data.errors.fullName || data.errors.name;
          if (data.errors.organization || data.errors.orgName) mapped.organizationName = data.errors.organization || data.errors.orgName;
          if (data.errors.orgType) mapped.organizationType = data.errors.orgType;
          setErrors((prev) => ({ ...prev, ...mapped }));
        }
        setErrorMessage(data.message || "We couldn't submit your request. Please try again.");
      }
    } catch {
      setErrorMessage("We couldn't submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData(INITIAL_FORM);
    setErrors({});
    setErrorMessage("");
  };

  return (
    <section id="request" className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20">
      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-6 lg:px-8">
        {/* ---------------- Eyebrow + heading ---------------- */}
        {mounted ? (
          <div className="w-full text-center sm:text-left">
            <Reveal index={0}>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                07 · Request API Access
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                Start an{" "}
                <span style={{ color: ACCENT }}>API evaluation.</span>
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p className="mt-3 text-[14px] leading-relaxed text-[#5B6478]">
                Tell us where you fit and what you need. We route your
                request to the right API, technical, security,
                commercial, or governance team.
              </p>
            </Reveal>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-3">
            <div className="h-3 w-44 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-72 animate-pulse rounded-lg bg-[#E4E8F0]" />
            <div className="h-4 w-full animate-pulse rounded bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Form card ---------------- */}
        <div className="mt-8 w-full">
          {mounted ? (
            <Reveal index={3}>
              <FormCard
                formData={formData}
                errors={errors}
                submitting={submitting}
                errorMessage={errorMessage}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onReset={handleReset}
                submitted={submitted}
                successRef={successRef}
              />
            </Reveal>
          ) : (
            <div className="h-[560px] w-full animate-pulse rounded-3xl bg-white" />
          )}
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
      className="animate-[zoikoSignalFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes zoikoSignalFadeUp {
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
/*  Form card                                                          */
/* ----------------------------------------------------------------- */
function FormCard({
  formData,
  errors,
  submitting,
  errorMessage,
  onChange,
  onSubmit,
  onReset,
  submitted,
  successRef,
}: {
  formData: FormState;
  errors: FormErrors;
  submitting: boolean;
  errorMessage: string;
  onChange: (field: keyof FormState, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
  submitted: boolean;
  successRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="w-full rounded-3xl border border-[#E7EAF1] bg-white p-8 shadow-[0_20px_48px_-20px_rgba(15,31,78,0.16)] sm:p-10">
      {submitted ? (
        <SuccessState successRef={successRef} onReset={onReset} />
      ) : (
        <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Work email" error={errors.workEmail} required>
              <input
                id="workEmail"
                name="workEmail"
                type="email"
                placeholder="name@organization.org"
                value={formData.workEmail}
                onChange={(e) => onChange("workEmail", e.target.value)}
                aria-invalid={!!errors.workEmail}
                className={inputClasses(!!errors.workEmail)}
              />
            </Field>

            <Field label="Full name" error={errors.fullName} required>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Full name"
                value={formData.fullName}
                onChange={(e) => onChange("fullName", e.target.value)}
                aria-invalid={!!errors.fullName}
                className={inputClasses(!!errors.fullName)}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Organization name" error={errors.organizationName} required>
              <input
                id="organizationName"
                name="organizationName"
                type="text"
                placeholder="Organization"
                value={formData.organizationName}
                onChange={(e) =>
                  onChange("organizationName", e.target.value)
                }
                aria-invalid={!!errors.organizationName}
                className={inputClasses(!!errors.organizationName)}
              />
            </Field>

            <Field label="Organization type" error={errors.organizationType} required>
              <SelectInput
                id="organizationType"
                name="organizationType"
                value={formData.organizationType}
                onChange={(v) => onChange("organizationType", v)}
                placeholder="Select type"
                options={ORGANIZATION_TYPES}
                hasError={!!errors.organizationType}
              />
            </Field>
          </div>

          <Field label="Primary interest" optional>
            <SelectInput
              id="primaryInterest"
              name="primaryInterest"
              value={formData.primaryInterest}
              onChange={(v) => onChange("primaryInterest", v)}
              placeholder="Select interest"
              options={PRIMARY_INTERESTS}
              hasError={false}
            />
          </Field>

          <Field label="Brief note" optional>
            <textarea
              id="note"
              name="note"
              rows={4}
              placeholder="Your API use case, integration workflow, or availability data need."
              value={formData.note}
              onChange={(e) => onChange("note", e.target.value)}
              className={`${inputClasses(false)} resize-none`}
            />
          </Field>

          <button
            type="submit"
            disabled={submitting}
            className="group relative mt-2 w-full overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            style={{ backgroundColor: ACCENT }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 8px 24px -4px rgba(15,170,135,0.45)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
            <span className="relative font-semibold">
              {submitting ? "Submitting..." : "Request API Access"}
            </span>
          </button>

          <p className="flex items-start gap-2 text-[12px] leading-relaxed text-[#9AA3B5]">
            <svg
              className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
              viewBox="0 0 16 16"
              fill="none"
              style={{ color: ACCENT }}
            >
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            Don&apos;t include patient data, PHI, prescription records,
            exact pharmacy stock, API secrets, or access tokens in this
            form.
          </p>

          {errorMessage && (
            <div className="mt-2 rounded-xl border border-[#F87171]/40 bg-[#FEF2F2] p-4 text-center text-[13px] text-[#C5453F]">
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Field wrapper                                                      */
/* ----------------------------------------------------------------- */
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
    <div className="flex flex-col gap-2">
      <label className="text-[13px] font-semibold text-[#0F1F4E]">
        {label}
        {required && <span className="ml-0.5 text-[#D64545]">*</span>}
        {optional && (
          <span className="ml-1 font-normal text-[#9AA3B5]">
            (optional)
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="mt-0.5 flex items-center gap-1 text-[12px] text-[#DC2626]">
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

/* ----------------------------------------------------------------- */
/*  Select input                                                       */
/* ----------------------------------------------------------------- */
function SelectInput({
  id,
  name,
  value,
  onChange,
  placeholder,
  options,
  hasError,
}: {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: readonly string[];
  hasError?: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={hasError}
        className={`${inputClasses(Boolean(hasError))} appearance-none pr-10`}
        style={{ color: value ? "#0F1F4E" : "#AEB5C4" }}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} style={{ color: "#0F1F4E" }}>
            {opt}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8891A4]"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M4 6l4 4 4-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function inputClasses(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-[13.5px] text-[#0F1F4E] outline-none transition-colors duration-200 placeholder:text-[#AEB5C4] ${
    hasError
      ? "border-[#DC2626] focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/15"
      : "border-[#D7DCE6] focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
  }`;
}

/* ----------------------------------------------------------------- */
/*  Success state                                                       */
/* ----------------------------------------------------------------- */
function SuccessState({
  successRef,
  onReset,
}: {
  successRef: React.RefObject<HTMLDivElement | null>;
  onReset: () => void;
}) {
  return (
    <div ref={successRef} className="flex flex-col items-center py-10 text-center">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: "#DCF5EE", color: "#0C8A6E" }}
      >
        <svg className="h-6 w-6" viewBox="0 0 16 16" fill="none">
          <path
            d="M3.5 8.5l3 3 6-6.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h4 className="mt-4 text-[16px] font-bold text-[#0F1F4E]">
        Request received.
      </h4>
      <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-[#8891A4]">
        We&apos;ll route your request to the right team and follow up at
        the email address you provided.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 inline-flex items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.98]"
      >
        Submit another request
      </button>
    </div>
  );
}