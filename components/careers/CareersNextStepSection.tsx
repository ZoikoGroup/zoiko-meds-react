"use client";

import { useEffect, useRef, useState } from "react";
import { validateEmail, scrollToFirstError } from "@/lib/validation";

const ACCENT = "#0FAA87";

const PATHWAY_CARDS = [
  {
    title: "Open roles",
    description:
      "For candidates ready to apply to an approved live requisition.",
    cta: "View Open Roles",
    icon: "doc",
  },
  {
    title: "Talent community",
    description:
      "For strong candidates whose ideal role is not currently open.",
    cta: "Join Talent Community",
    icon: "person",
  },
  {
    title: "Recruiting contact",
    description:
      "For candidates or partners with process, accessibility, or role-family questions.",
    cta: "Contact Recruiting",
    icon: "message",
  },
] as const;

const ROLE_FAMILIES = [
  "Engineering",
  "Data, AI & Intelligence",
  "Product & Design",
  "Pharmacy Operations",
  "Trust, Legal, Privacy & Security",
  "Enterprise & Public Sector",
  "Support & Customer Success",
  "Business Operations",
] as const;

type FormState = {
  email: string;
  fullName: string;
  roleFamily: string;
  location: string;
};

const INITIAL_FORM: FormState = {
  email: "",
  fullName: "",
  roleFamily: "",
  location: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

export default function CareersNextStepSection() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  const validate = (v: FormState): FormErrors => {
    const e: FormErrors = {};
    const emailCheck = validateEmail(v.email);
    if (!emailCheck.isValid) {
      e.email = emailCheck.error || "Please enter a valid email address.";
    }
    if (!v.fullName.trim()) {
      e.fullName = "Full name is required.";
    }
    if (!v.roleFamily) {
      e.roleFamily = "Select a role family interest.";
    }
    return e;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMessage) setErrorMessage("");
    if (errors[field]) {
      if (field === "email") {
        const check = validateEmail(value);
        setErrors((prev) => ({
          ...prev,
          email: check.isValid ? undefined : check.error || "Please enter a valid email address.",
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
      const firstKey = nextErrors.email ? "email" : (Object.keys(nextErrors)[0] as keyof FormState);
      scrollToFirstError(firstKey);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/internal/briefing-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: `Careers - Talent Community (${formData.roleFamily || "General"})`,
          fullName: formData.fullName.trim(),
          workEmail: formData.email.trim(),
          organization: formData.location.trim() ? `Location/Region: ${formData.location.trim()}` : "Not specified",
          primaryInterest: formData.roleFamily.trim(),
          note: formData.location.trim() ? `Location / Work Authorization Region: ${formData.location.trim()}` : "",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMessage(true);
        setFormData(INITIAL_FORM);
        setErrors({});
        setTimeout(() => {
          if (successRef.current) {
            successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 50);
      } else {
        if (data.errors && typeof data.errors === "object") {
          const mapped: FormErrors = {};
          if (data.errors.workEmail || data.errors.email) mapped.email = data.errors.workEmail || data.errors.email;
          if (data.errors.fullName || data.errors.name) mapped.fullName = data.errors.fullName || data.errors.name;
          if (data.errors.roleFamily) mapped.roleFamily = data.errors.roleFamily;
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

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Eyebrow + heading ---------------- */}
        {mounted ? (
          <>
            <Reveal index={0}>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                05 · Open Roles, Talent Community &amp; Contact
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                Choose <span style={{ color: ACCENT }}>your next step.</span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-64 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Pathway cards ---------------- */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {mounted
            ? PATHWAY_CARDS.map((card, i) => (
                <Reveal key={card.title} index={2 + i}>
                  <PathwayCard {...card} />
                </Reveal>
              ))
            : Array.from({ length: 3 }).map((_, i) => (
                <PathwayCardSkeleton key={i} />
              ))}
        </div>

        {/* ---------------- Talent community heading ---------------- */}
        <div className="mt-16">
          {mounted ? (
            <>
              <Reveal index={5}>
                <h3 className="font-[var(--font-plus-jakarta-sans)] text-[24px] font-bold leading-snug text-[#0F1F4E]">
                  Join the talent{" "}
                  <span style={{ color: ACCENT }}>community</span>
                </h3>
              </Reveal>
              <Reveal index={6}>
                <p className="mt-2 text-[13.5px] leading-relaxed text-[#8891A4]">
                  A short first step. We&apos;ll let you know when a matching
                  role opens — no resume needed yet.
                </p>
              </Reveal>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="h-6 w-56 animate-pulse rounded bg-[#E4E8F0]" />
              <div className="h-4 w-96 animate-pulse rounded bg-[#E4E8F0]" />
            </div>
          )}
        </div>

        {/* ---------------- Form card ---------------- */}
        <div id="talent" className="mt-6">
          {mounted ? (
            <Reveal index={7}>
              <FormCard
                formData={formData}
                errors={errors}
                submitting={submitting}
                successMessage={successMessage}
                errorMessage={errorMessage}
                onChange={handleChange}
                onSubmit={handleSubmit}
                successRef={successRef}
              />
            </Reveal>
          ) : (
            <div className="h-[280px] w-full animate-pulse rounded-3xl bg-white" />
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
      style={{ opacity: 0, animationDelay: `${index * 80}ms` }}
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
/*  Pathway card                                                        */
/* ----------------------------------------------------------------- */
function PathwayCard({
  title,
  description,
  cta,
  icon,
}: {
  title: string;
  description: string;
  cta: string;
  icon: string;
}) {
  return (
    <div className="group flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_8px_24px_-12px_rgba(15,31,78,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#D7DCE6] hover:shadow-[0_16px_36px_-12px_rgba(15,31,78,0.14)]">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#0F1F4E", color: ACCENT }}
      >
        <PathwayIcon name={icon} />
      </div>

      <h4 className="mt-4 text-[15px] font-bold text-[#0F1F4E]">{title}</h4>

      <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#8891A4]">
        {description}
      </p>
    </div>
  );
}

function PathwayCardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-28 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 flex-1 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-5 h-10 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
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
  successMessage,
  errorMessage,
  onChange,
  onSubmit,
  successRef,
}: {
  formData: FormState;
  errors: FormErrors;
  submitting: boolean;
  successMessage: boolean;
  errorMessage: string;
  onChange: (field: keyof FormState, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  successRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="w-full rounded-3xl border border-[#E7EAF1] bg-white p-8 shadow-[0_20px_48px_-20px_rgba(15,31,78,0.16)] sm:p-10">
      {successMessage && (
        <div
          ref={successRef}
          className="mb-6 rounded-2xl border border-[#9FE3D3] bg-[#EAFAF4] p-5 text-center transition-all duration-300"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: "#DCF5EE", color: "#0C8A6E" }}
            >
              <svg className="h-5 w-5" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3.5 8.5l3 3 6-6.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h4 className="mt-2 text-[15px] font-bold text-[#00786F]">
              You&apos;re on the list!
            </h4>
            <p className="mt-1 text-[13px] leading-relaxed text-[#056059]">
              Thank you for joining our talent community. We&apos;ll reach out when a role matching your interests opens up.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Email" error={errors.email} required>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@email.com"
              value={formData.email}
              onChange={(e) => onChange("email", e.target.value)}
              aria-invalid={!!errors.email}
              className={inputClasses(!!errors.email)}
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
          <Field label="Role family interest" error={errors.roleFamily} required>
            <SelectInput
              id="roleFamily"
              name="roleFamily"
              value={formData.roleFamily}
              onChange={(v) => onChange("roleFamily", v)}
              placeholder="Select role family"
              options={ROLE_FAMILIES}
              hasError={!!errors.roleFamily}
            />
          </Field>

          <Field label="Location / work-authorization region" optional>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. US, UK, EU"
              value={formData.location}
              onChange={(e) => onChange("location", e.target.value)}
              className={inputClasses(false)}
            />
          </Field>
        </div>

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
            {submitting ? "Submitting..." : "Join Talent Community"}
          </span>
        </button>

        <p className="flex items-start gap-2 text-[12px] leading-relaxed text-[#9AA3B5]">
          <svg
            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
            viewBox="0 0 16 16"
            fill="none"
            style={{ color: ACCENT }}
          >
            <circle
              cx="8"
              cy="8"
              r="6.5"
              stroke="currentColor"
              strokeWidth="1.3"
            />
          </svg>
          Don&apos;t include resumes, IDs, salary expectations, demographic,
          health, or banking details here — those come later through our
          secure recruiting system.
        </p>

        {errorMessage && (
          <div className="mt-2 rounded-xl border border-[#F87171]/40 bg-[#FEF2F2] p-4 text-center text-[13px] text-[#C5453F]">
            <p className="font-medium">{errorMessage}</p>
          </div>
        )}
      </form>
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
          <span className="ml-1 font-normal text-[#9AA3B5]">(optional)</span>
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
/*  Icons                                                              */
/* ----------------------------------------------------------------- */
function PathwayIcon({ name }: { name: string }) {
  const common = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "doc":
      return (
        <svg {...common}>
          <path d="M7 3h7l3 3v15a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" />
          <path d="M14 3v3h3M9 12h6M9 15h6" />
        </svg>
      );
    case "person":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5" />
        </svg>
      );
    case "message":
      return (
        <svg {...common}>
          <path d="M4 5h16v11H8l-4 4V5z" />
        </svg>
      );
    default:
      return null;
  }
}
