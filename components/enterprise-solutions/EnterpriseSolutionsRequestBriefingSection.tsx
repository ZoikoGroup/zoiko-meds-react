"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";



const ACCENT = "#0FAA87";

const ORG_TYPES = [
  "Hospital or health system",
  "Pharmacy chain or group",
  "Payer or health plan",
  "Public-sector or government agency",
  "Digital health platform",
  "PMS/POS or technology vendor",
  "Other",
] as const;

const INTERESTS = [
  "Enterprise platform access",
  "API or data integration",
  "Intelligence and analytics",
  "Public-sector deployment",
  "Commercial partnership",
  "Governance and compliance review",
  "Not sure yet",
] as const;

type FormState = {
  email: string;
  fullName: string;
  organizationName: string;
  organizationType: string;
  primaryInterest: string;
  note: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EnterpriseSolutionsRequestBriefingSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    email: "",
    fullName: "",
    organizationName: "",
    organizationType: "",
    primaryInterest: "",
    note: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

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
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const nextErrors: FormErrors = {};
    if (!form.email.trim()) {
      nextErrors.email = "Enter your work email.";
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.fullName.trim()) {
      nextErrors.fullName = "Enter your full name.";
    }
    if (!form.organizationName.trim()) {
      nextErrors.organizationName = "Enter an organization name.";
    }
    if (!form.organizationType) {
      nextErrors.organizationType = "Select an organization type.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      // TODO: replace with the real enterprise-briefing endpoint, e.g.
      // const res = await fetch("/api/enterprise-solutions/briefing", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Submission failed");
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
      setForm({
        email: "",
        fullName: "",
        organizationName: "",
        organizationType: "",
        primaryInterest: "",
        note: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="request" ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Header (left-aligned) ---------------- */}
        <div>
          {mounted ? (
            <>
              <Reveal index={0}>
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: ACCENT }}
                >
                  07 · Request enterprise briefing
                </p>
              </Reveal>

              <Reveal index={1}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] mt-2 text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
                  Start an enterprise conversation.
                </h2>
              </Reveal>

              <Reveal index={2}>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Tell us where you fit and what you need. We route your
                  request to the right enterprise, intelligence, API,
                  data, public-sector, commercial, or governance team.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Form card ---------------- */}
        <div className="mt-8">
          {mounted ? (
            <BriefingForm
              form={form}
              errors={errors}
              status={status}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          ) : (
            <FormSkeleton />
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
      className="animate-[enterpriseBriefingFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes enterpriseBriefingFadeUp {
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
/*  Briefing form                                                       */
/* ----------------------------------------------------------------- */
function BriefingForm({
  form,
  errors,
  status,
  onChange,
  onSubmit,
}: {
  form: FormState;
  errors: FormErrors;
  status: FormStatus;
  onChange: (field: keyof FormState, value: string) => void;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <div
      className="rounded-2xl border border-[#E7EAF1] bg-white p-8 shadow-[0_20px_45px_-30px_rgba(15,31,78,0.25)] animate-[enterpriseBriefingFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "280ms" }}
    >
      <form className="space-y-6" onSubmit={onSubmit} noValidate>
        {/* Row 1: email + name */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            id="enterprise-email"
            label="Work email"
            required
            error={errors.email}
          >
            <input
              id="enterprise-email"
              type="email"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="name@organization.org"
              aria-invalid={Boolean(errors.email)}
              className={inputClass(Boolean(errors.email))}
            />
          </Field>

          <Field
            id="enterprise-name"
            label="Full name"
            required
            error={errors.fullName}
          >
            <input
              id="enterprise-name"
              type="text"
              value={form.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              placeholder="Full name"
              aria-invalid={Boolean(errors.fullName)}
              className={inputClass(Boolean(errors.fullName))}
            />
          </Field>
        </div>

        {/* Row 2: org name + org type */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            id="enterprise-org"
            label="Organization name"
            required
            error={errors.organizationName}
          >
            <input
              id="enterprise-org"
              type="text"
              value={form.organizationName}
              onChange={(e) => onChange("organizationName", e.target.value)}
              placeholder="Organization"
              aria-invalid={Boolean(errors.organizationName)}
              className={inputClass(Boolean(errors.organizationName))}
            />
          </Field>

          <Field
            id="enterprise-org-type"
            label="Organization type"
            required
            error={errors.organizationType}
          >
            <SelectField
              id="enterprise-org-type"
              value={form.organizationType}
              onChange={(value) => onChange("organizationType", value)}
              placeholder="Select type"
              options={ORG_TYPES}
              hasError={Boolean(errors.organizationType)}
            />
          </Field>
        </div>

        {/* Row 3: primary interest (optional, single column) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="enterprise-interest" label="Primary interest">
            <SelectField
              id="enterprise-interest"
              value={form.primaryInterest}
              onChange={(value) => onChange("primaryInterest", value)}
              placeholder="Select interest"
              options={INTERESTS}
              hasError={false}
            />
          </Field>
        </div>

        {/* Brief note */}
        <Field id="enterprise-note" label="Brief note" optional>
          <textarea
            id="enterprise-note"
            value={form.note}
            onChange={(e) => onChange("note", e.target.value)}
            placeholder="Your enterprise need, API use case, intelligence interest, or procurement pathway."
            rows={3}
            className={`${inputClass(false)} resize-none`}
          />
        </Field>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          style={{ backgroundColor: ACCENT }}
        >
          {status === "submitting" && (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                d="M21 12a9 9 0 0 0-9-9"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          )}
          {status === "submitting" ? "Submitting..." : "Request Enterprise Briefing"}
        </button>

        <p className="flex items-start gap-1.5 text-[11.5px] leading-relaxed text-[#A6ADBD]">
          <svg
            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
            viewBox="0 0 16 16"
            fill="none"
            style={{ color: ACCENT }}
          >
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
            <path d="M8 7v4M8 5.2v.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Don&apos;t include PHI, patient identifiers, prescription
          records, exact pharmacy stock, or API secrets in this form.
        </p>

        {status === "success" && (
          <p className="flex items-center gap-2 text-[13px] font-medium text-[#0E8F70]">
            <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 8.5l3 3 6-6.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Your enterprise briefing request has been submitted. We&apos;ll
            follow up by email.
          </p>
        )}

        {status === "error" && (
          <p className="text-[13px] font-medium text-[#C5453F]">
            Something went wrong while submitting. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

function SelectField({
  id,
  value,
  onChange,
  placeholder,
  options,
  hasError,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: readonly string[];
  hasError: boolean;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={hasError}
        className={`${inputClass(hasError)} appearance-none pr-10 ${
          value ? "" : "text-[#9AA1B5]"
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
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7C8499]"
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

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-[#0F1F4E] placeholder:text-[#9AA1B5] outline-none transition-colors duration-200 ${
    hasError
      ? "border-[#E0635C] focus:border-[#E0635C]"
      : "border-[#D7DCE6] focus:border-[#0FAA87]"
  }`;
}

function Field({
  id,
  label,
  required,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[12.5px] font-semibold text-[#0F1F4E]"
      >
        {label}
        {required && <span className="ml-0.5 text-[#C5453F]">*</span>}
        {optional && (
          <span className="ml-1 font-normal text-[#9AA1B5]">(optional)</span>
        )}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[12px] text-[#C5453F]">{error}</p>}
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                           */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-3 w-56 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-8 w-full max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-1 space-y-2">
        <div className="h-3.5 w-full max-w-xl animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-2/3 max-w-md animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
        ))}
      </div>
      <div className="mt-5 h-12 w-full max-w-[calc(50%-10px)] animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-5 h-20 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-5 h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}