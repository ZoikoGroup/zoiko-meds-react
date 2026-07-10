"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const SUPPORT_CATEGORIES = [
  "Availability signals",
  "Patient support workflows",
  "Care-team access",
  "Referral guidance",
  "Organization review",
  "Privacy / security escalation",
  "Other",
];

const ORG_TYPES = [
  "Hospital or health system",
  "Clinic or medical group",
  "Telehealth provider",
  "Care coordination organization",
  "Other",
];

type FormState = {
  email: string;
  fullName: string;
  orgName: string;
  supportCategory: string;
  orgType: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ProviderSupportFormSection() {
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
    <section id="support" ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-2xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
                  Get the right{" "}
                  <span style={{ color: ACCENT }}>provider support path.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Get help with availability signals, patient support
                  workflows, care-team access, referral guidance,
                  organization review, privacy/security escalation, and
                  safe routing — through the right ZoikoMeds support path.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Form ---------------- */}
        <div className="mt-10">
          {mounted ? <SupportForm /> : <FormSkeleton />}
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
      className="animate-[providerFormFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes providerFormFadeUp {
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
/*  Support form                                                        */
/* ----------------------------------------------------------------- */
function SupportForm() {
  const [values, setValues] = useState<FormState>({
    email: "",
    fullName: "",
    orgName: "",
    supportCategory: "",
    orgType: "",
    description: "",
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
    if (!v.supportCategory) e.supportCategory = "Select a support category.";
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
      console.log("Get provider support submission:", values);
    }
  }

  return (
    <div
      className="rounded-2xl border border-[#E7EAF1] bg-white p-7 shadow-[0_16px_40px_-20px_rgba(15,31,78,0.15)] animate-[providerFormFadeUp_0.6s_ease-out_forwards] sm:p-8"
      style={{ opacity: 0, animationDelay: "500ms" }}
    >
      {submitted ? (
        <SuccessState onReset={() => setSubmitted(false)} />
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <h3 className="text-[16px] font-bold text-[#0F1F4E]">
            Get provider support
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
            Keep it short — we route your request to the right team.
            Sensitive details are gathered after authentication or
            through secure follow-up.
          </p>

          <div className="mt-5 space-y-4">
            <Field label="Work email" error={errors.email}>
              <input
                type="email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@yourorganization.org"
                className={inputClasses(!!errors.email)}
              />
            </Field>

            <Field label="Full name" error={errors.fullName}>
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
                placeholder="e.g. Riverside Health"
                className={inputClasses(!!errors.orgName)}
              />
            </Field>

            <Field label="Support category" error={errors.supportCategory}>
              <Select
                value={values.supportCategory}
                onChange={(v) => handleChange("supportCategory", v)}
                placeholder="Select a support category"
                options={SUPPORT_CATEGORIES}
                hasError={!!errors.supportCategory}
              />
            </Field>

            <Field label="Organization type" optional>
              <Select
                value={values.orgType}
                onChange={(v) => handleChange("orgType", v)}
                placeholder="Select organization type"
                options={ORG_TYPES}
                hasError={false}
              />
            </Field>

            <Field label="Brief description of the issue" optional>
              <div className="mb-3 flex items-start gap-2 rounded-lg border border-[#F3D9A8] bg-[#FDF4E3] px-3.5 py-2.5">
                <svg
                  className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#C8821E]"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8 2.5l6 10.5H2L8 2.5z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinejoin="round"
                  />
                  <path d="M8 6.5v3M8 11.5v.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <p className="text-[11.5px] leading-relaxed text-[#9A5B0F]">
                  Do not include patient identifiers, diagnosis, clinical
                  notes, prescription images, insurance IDs, medical
                  records, passwords, security details, or other PHI.
                </p>
              </div>
              <textarea
                value={values.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="What do you need help with?"
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
            <span className="relative">Get Provider Support</span>
          </button>
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
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
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
        Support request received
      </h3>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-[#5B6478]">
        We&apos;ll route your request to the right team and follow up by
        email.
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
/*  Skeletons                                                            */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-full max-w-sm animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white" />
      <div className="h-4 w-2/3 max-w-md animate-pulse rounded bg-white" />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-8">
      <div className="h-5 w-48 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 h-4 w-full animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-6 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
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