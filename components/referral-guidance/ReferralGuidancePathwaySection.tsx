"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const ACCENT = "#0FAA87";

const PATHS = [
  {
    icon: "arrow",
    title: "Provider referral workflow",
    description: "Care teams that want approved patient handoff language.",
    cta: "Request Referral Workflow Briefing",
    variant: "solid",
    link:"#request"
  },
  {
    icon: "building",
    title: "Provider organization review",
    description:
      "Clinics, hospitals, telehealth teams, and health systems evaluating access workflows.",
    cta: "Request Provider Briefing",
    variant: "outline",
    link:"#"
  },
  {
    icon: "search",
    title: "Patient or caregiver self-service",
    description:
      "People checking availability for themselves or someone they support.",
    cta: "Search Medicines",
    variant: "outline",
    link:"/searchmed"
  },
] as const;

const ORG_TYPES = [
  "Hospital or health system",
  "Clinic or medical group",
  "Telehealth provider",
  "Care coordination organization",
  "Home health or hospice",
  "Other",
] as const;

const WORKFLOW_INTERESTS = [
  "Patient handoff language",
  "Discharge referral workflow",
  "Caregiver self-service guidance",
  "Organization-wide referral training",
  "Not sure yet",
] as const;

type FormState = {
  email: string;
  fullName: string;
  organizationName: string;
  organizationType: string;
  workflowInterest: string;
  note: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ReferralGuidancePathwaySection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    email: "",
    fullName: "",
    organizationName: "",
    organizationType: "",
    workflowInterest: "",
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
      // TODO: replace with the real briefing-request endpoint, e.g.
      // const res = await fetch("/api/referral-guidance/briefing", {
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
        workflowInterest: "",
        note: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="request" ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                  Choose the <span style={{ color: ACCENT }}>right referral path.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Provider teams, organizations, and patients — each
                  routed to the right next step.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Two-column layout (equal height) ---------------- */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          {/* Left: stacked path cards, each flex-1 to share the column's full height */}
          <div className="flex flex-col gap-5">
            {mounted
              ? PATHS.map((p, i) => (
                  <PathCard key={p.title} {...p} index={i} />
                ))
              : PATHS.map((_, i) => <PathCardSkeleton key={i} />)}
          </div>

          {/* Right: referral workflow briefing form */}
          <div className="flex">
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
      className="animate-[referralPathwayFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes referralPathwayFadeUp {
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
/*  Path card                                                           */
/* ----------------------------------------------------------------- */
function PathCard({
  icon,
  title,
  description,
  cta,
  variant,
  index,
  link
}: {
  icon: "arrow" | "building" | "search";
  title: string;
  description: string;
  cta: string;
  variant: "solid" | "outline";
  index: number;
  link:string;
}) {
  return (
    <div
      className="group flex flex-1 flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[referralPathwayFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{
        opacity: 0,
        animationDelay: `${250 + index * 100}ms`,
      }}
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
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#0F1F4E", color: "#FFFFFF" }}
      >
        <PathIcon name={icon} />
      </div>

      <h3 className="mt-4 text-[14.5px] font-bold text-[#0F1F4E]">{title}</h3>

      <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      {variant === "solid" ? (
        <a
          href={link}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          style={{ backgroundColor: ACCENT }}
        >
          {cta}
        </a>
      ) : (
        <a
          href={link}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
        >
          {cta}
        </a>
      )}
    </div>
  );
}

function PathIcon({ name }: { name: "arrow" | "building" | "search" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
          <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15 15l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
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
      className="flex w-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-8 shadow-[0_20px_45px_-30px_rgba(15,31,78,0.25)] animate-[referralPathwayFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "550ms" }}
    >
      <h3 className="text-[18px] font-bold text-[#0F1F4E]">
        Request a referral workflow briefing
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#5B6478]">
        Tell us about your organization and referral workflow. No
        diagnosis, prescriptions, insurance, or patient identifiers —
        this is a zero-PHI request.
      </p>

      <form className="mt-6 flex flex-1 flex-col space-y-5" onSubmit={onSubmit} noValidate>
        <Field id="referral-email" label="Work email" error={errors.email}>
          <input
            id="referral-email"
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="you@yourorganization.org"
            aria-invalid={Boolean(errors.email)}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        <Field id="referral-name" label="Full name" error={errors.fullName}>
          <input
            id="referral-name"
            type="text"
            value={form.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.fullName)}
            className={inputClass(Boolean(errors.fullName))}
          />
        </Field>

        <Field
          id="referral-org"
          label="Organization name"
          error={errors.organizationName}
        >
          <input
            id="referral-org"
            type="text"
            value={form.organizationName}
            onChange={(e) => onChange("organizationName", e.target.value)}
            placeholder="e.g. Riverside Health"
            aria-invalid={Boolean(errors.organizationName)}
            className={inputClass(Boolean(errors.organizationName))}
          />
        </Field>

        <Field
          id="referral-org-type"
          label="Organization type"
          error={errors.organizationType}
        >
          <SelectField
            id="referral-org-type"
            value={form.organizationType}
            onChange={(value) => onChange("organizationType", value)}
            placeholder="Select organization type"
            options={ORG_TYPES}
            hasError={Boolean(errors.organizationType)}
          />
        </Field>

        <Field
          id="referral-workflow-interest"
          label="Referral workflow interest"
          optional
        >
          <SelectField
            id="referral-workflow-interest"
            value={form.workflowInterest}
            onChange={(value) => onChange("workflowInterest", value)}
            placeholder="Select workflow interest"
            options={WORKFLOW_INTERESTS}
            hasError={false}
          />
        </Field>

        <Field id="referral-note" label="Brief note" optional>
          <textarea
            id="referral-note"
            value={form.note}
            onChange={(e) => onChange("note", e.target.value)}
            placeholder="Your referral workflow, discharge handoff, care-team process, or integration interest"
            rows={3}
            className={`${inputClass(false)} resize-none`}
          />
        </Field>

        <div className="flex-1" />

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
          {status === "submitting"
            ? "Submitting..."
            : "Request Referral Workflow Briefing"}
        </button>

        <p className="text-center text-[11.5px] leading-relaxed text-[#A6ADBD]">
          No diagnosis, symptoms, prescriptions, insurance, or patient
          identifiers are collected here. This is a zero-PHI request.
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
            Your briefing request has been submitted. We&apos;ll follow up
            by email.
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
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
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
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-full max-w-sm animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white" />
    </div>
  );
}

function PathCardSkeleton() {
  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 flex-1 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-5 h-9 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="flex w-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-8">
      <div className="h-5 w-64 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-6 flex-1 space-y-5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
        ))}
      </div>
      <div className="mt-5 h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}