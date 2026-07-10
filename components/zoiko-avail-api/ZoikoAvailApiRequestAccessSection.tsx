"use client";

import { useEffect, useState } from "react";

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

export default function ZoikoAvailApiRequestAccessSection() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    workEmail: "",
    fullName: "",
    organizationName: "",
    organizationType: "",
    primaryInterest: "",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitted={submitted}
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
type FormState = {
  workEmail: string;
  fullName: string;
  organizationName: string;
  organizationType: string;
  primaryInterest: string;
  note: string;
};

function FormCard({
  formData,
  onChange,
  onSubmit,
  submitted,
}: {
  formData: FormState;
  onChange: (field: keyof FormState, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitted: boolean;
}) {
  return (
    <div className="w-full rounded-3xl border border-[#E7EAF1] bg-white p-8 shadow-[0_20px_48px_-20px_rgba(15,31,78,0.16)] sm:p-10">
      {submitted ? (
        <SuccessState />
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Work email" required>
              <input
                type="email"
                required
                placeholder="name@organization.org"
                value={formData.workEmail}
                onChange={(e) => onChange("workEmail", e.target.value)}
                className="w-full rounded-xl border border-[#D7DCE6] bg-white px-4 py-3 text-[13.5px] text-[#0F1F4E] outline-none transition-colors duration-200 placeholder:text-[#AEB5C4] focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
              />
            </Field>

            <Field label="Full name" required>
              <input
                type="text"
                required
                placeholder="Full name"
                value={formData.fullName}
                onChange={(e) => onChange("fullName", e.target.value)}
                className="w-full rounded-xl border border-[#D7DCE6] bg-white px-4 py-3 text-[13.5px] text-[#0F1F4E] outline-none transition-colors duration-200 placeholder:text-[#AEB5C4] focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Organization name" required>
              <input
                type="text"
                required
                placeholder="Organization"
                value={formData.organizationName}
                onChange={(e) =>
                  onChange("organizationName", e.target.value)
                }
                className="w-full rounded-xl border border-[#D7DCE6] bg-white px-4 py-3 text-[13.5px] text-[#0F1F4E] outline-none transition-colors duration-200 placeholder:text-[#AEB5C4] focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
              />
            </Field>

            <Field label="Organization type" required>
              <SelectInput
                value={formData.organizationType}
                onChange={(v) => onChange("organizationType", v)}
                placeholder="Select type"
                options={ORGANIZATION_TYPES}
              />
            </Field>
          </div>

          <Field label="Primary interest" optional>
            <SelectInput
              value={formData.primaryInterest}
              onChange={(v) => onChange("primaryInterest", v)}
              placeholder="Select interest"
              options={PRIMARY_INTERESTS}
            />
          </Field>

          <Field label="Brief note" optional>
            <textarea
              rows={4}
              placeholder="Your API use case, integration workflow, or availability data need."
              value={formData.note}
              onChange={(e) => onChange("note", e.target.value)}
              className="w-full resize-none rounded-xl border border-[#D7DCE6] bg-white px-4 py-3 text-[13.5px] text-[#0F1F4E] outline-none transition-colors duration-200 placeholder:text-[#AEB5C4] focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
            />
          </Field>

          <button
            type="submit"
            className="group relative mt-2 w-full overflow-hidden rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            style={{ backgroundColor: ACCENT }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 8px 24px -4px rgba(15,170,135,0.45)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
          >
            <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
            <span className="relative">Request API Access</span>
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
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
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
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Select input                                                       */
/* ----------------------------------------------------------------- */
function SelectInput({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: readonly string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-[#D7DCE6] bg-white px-4 py-3 pr-10 text-[13.5px] outline-none transition-colors duration-200 focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
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

/* ----------------------------------------------------------------- */
/*  Success state                                                       */
/* ----------------------------------------------------------------- */
function SuccessState() {
  return (
    <div className="flex flex-col items-center py-10 text-center">
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
    </div>
  );
}