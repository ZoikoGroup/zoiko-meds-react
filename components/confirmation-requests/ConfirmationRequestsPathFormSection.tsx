"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";

const PATHS = [
  {
    icon: "lock",
    title: "Verified pharmacy",
    description: "Existing verified pharmacy users.",
    cta: "Sign In to Pharmacy Portal",
  },
  {
    icon: "shield",
    title: "New pharmacy",
    description: "Pharmacies not yet verified.",
    cta: "Join the Verified Network",
  },
  {
    icon: "branch",
    title: "Pharmacy group or chain",
    description: "Multi-location operators.",
    cta: "Request Chain Briefing",
  },
  {
    icon: "code",
    title: "Integration team",
    description: "API, PMS/POS, or queue-routing discussions.",
    cta: "Discuss Integration",
  },
] as const;

const PHARMACY_TYPES = [
  "Independent pharmacy",
  "Pharmacy chain / group",
  "Hospital pharmacy",
  "Online / mail-order pharmacy",
  "Other",
];

const WORKFLOW_INTERESTS = [
  "Confirmation queue routing",
  "Approved response templates",
  "Volume / pause controls",
  "Audit & reporting",
  "Not sure yet",
];

type FormState = {
  email: string;
  fullName: string;
  orgName: string;
  pharmacyType: string;
  workflowInterest: string;
  note: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ConfirmationRequestsPathFormSection() {
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
    <section ref={ref} className="relative w-full bg-[#F4F6FA] ">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        {mounted ? (
          <Reveal index={0}>
            <h2 className="font-[var(--font-plus-jakarta-sans)] text-2xl font-bold text-[#0F1F4E]">
              Find the right pharmacy path.
            </h2>
          </Reveal>
        ) : (
          <div className="h-7 w-72 animate-pulse rounded-lg bg-white" />
        )}

        {/* ---------------- Path cards ---------------- */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mounted
            ? PATHS.map((p, i) => <PathCard key={p.title} {...p} index={i} />)
            : PATHS.map((_, i) => <PathCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Form ---------------- */}
        <div className="mt-10">
          {mounted ? <SetupForm /> : <FormSkeleton />}
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
      className="animate-[confirmPathFormFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes confirmPathFormFadeUp {
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
  index,
}: {
  icon: "lock" | "shield" | "branch" | "code";
  title: string;
  description: string;
  cta: string;
  index: number;
}) {
  return (
    <div
      className="group rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 ease-out animate-[confirmPathFormFadeUp_0.55s_ease-out_forwards] hover:-translate-y-1"
      style={{ opacity: 0, animationDelay: `${150 + index * 90}ms` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#9FE3D3";
        e.currentTarget.style.boxShadow =
          "0 12px 28px -16px rgba(15,170,135,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E7EAF1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0F1F4E] text-white transition-transform duration-300 group-hover:scale-110"
      >
        <PathIcon name={icon} />
      </div>

      <h3 className="mt-3.5 text-[14px] font-bold text-[#0F1F4E]">{title}</h3>

      <p className="mt-1.5 min-h-[34px] text-[12px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      <a
        href="#"
        className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-4 py-2 text-[12px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
      >
        {cta}
      </a>
    </div>
  );
}

function PathIcon({ name }: { name: "lock" | "shield" | "branch" | "code" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-4.5 w-4.5" };

  switch (name) {
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M12 3l7 2.6v5.4c0 4.7-3 7.8-7 9.3-4-1.5-7-4.6-7-9.3V5.6L12 3z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "branch":
      return (
        <svg {...common}>
          <rect x="4" y="14" width="4" height="6" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10" y="9" width="4" height="11" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16" y="4" width="4" height="16" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path
            d="M9 8l-4 4 4 4M15 8l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Setup form                                                          */
/* ----------------------------------------------------------------- */
function SetupForm() {
  const [values, setValues] = useState<FormState>({
    email: "",
    fullName: "",
    orgName: "",
    pharmacyType: "",
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
    if (!v.orgName.trim())
      e.orgName = "Pharmacy or organization name is required.";
    if (!v.pharmacyType) e.pharmacyType = "Select a pharmacy type.";
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
      console.log("Set up confirmation requests submission:", values);
    }
  }

  return (
    <div id="confirmation-request"
      className="mx-auto max-w-2xl rounded-2xl border border-[#E7EAF1] bg-white p-7 shadow-[0_16px_40px_-20px_rgba(15,31,78,0.15)] animate-[confirmPathFormFadeUp_0.6s_ease-out_forwards] sm:p-8"
      style={{ opacity: 0, animationDelay: "550ms" }}
    >
      {submitted ? (
        <SuccessState onReset={() => setSubmitted(false)} />
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <h3 className="text-[16px] font-bold text-[#0F1F4E]">
            Set up confirmation requests
          </h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
            Tell us about your pharmacy and workflow needs. No patient
            data, request content, or exact stock — setup happens later
            in the secure portal.
          </p>

          <div className="mt-5 space-y-4">
            <Field label="Work email" error={errors.email}>
              <input
                type="email"
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="you@yourpharmacy.com"
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

            <Field label="Pharmacy or organization name" error={errors.orgName}>
              <input
                type="text"
                value={values.orgName}
                onChange={(e) => handleChange("orgName", e.target.value)}
                placeholder="e.g. Riverside Community Pharmacy"
                className={inputClasses(!!errors.orgName)}
              />
            </Field>

            <Field label="Pharmacy type" error={errors.pharmacyType}>
              <Select
                value={values.pharmacyType}
                onChange={(v) => handleChange("pharmacyType", v)}
                placeholder="Select pharmacy type"
                options={PHARMACY_TYPES}
                hasError={!!errors.pharmacyType}
              />
            </Field>

            <Field label="Workflow interest" optional>
              <Select
                value={values.workflowInterest}
                onChange={(v) => handleChange("workflowInterest", v)}
                placeholder="Select workflow interest"
                options={WORKFLOW_INTERESTS}
                hasError={false}
              />
            </Field>

            <Field label="Brief note" optional>
              <textarea
                value={values.note}
                onChange={(e) => handleChange("note", e.target.value)}
                placeholder="Anything about your confirmation workflow need"
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
            <span className="relative">Set Up Confirmation Requests</span>
          </button>

          <p className="mt-3 text-center text-[11.5px] leading-relaxed text-[#9AA3B5]">
            No patient data, request content, exact stock, or credentials
            are collected here. Setup happens later in the secure portal.
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
        Request received
      </h3>
      <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-[#5B6478]">
        We&apos;ll follow up by email with next steps to set up your
        confirmation workflow.
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
function PathCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-5">
      <div className="h-9 w-9 animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-3.5 h-3.5 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-2 h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 h-8 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-[#E7EAF1] bg-white p-8">
      <div className="h-5 w-56 animate-pulse rounded bg-[#E4E8F0]" />
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