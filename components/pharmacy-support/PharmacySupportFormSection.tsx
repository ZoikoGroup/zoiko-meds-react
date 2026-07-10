"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const ACCENT = "#0FAA87";

const SUPPORT_CATEGORIES = [
  "Verification & claim support",
  "Pharmacy Portal access",
  "Pharmacy profile updates",
  "Availability signal settings",
  "Confirmation request support",
  "Inventory upload & integration",
  "Branch or user access",
  "Security concern",
  "Other",
] as const;

type FormState = {
  email: string;
  fullName: string;
  pharmacyName: string;
  category: string;
  location: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PharmacySupportFormSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    email: "",
    fullName: "",
    pharmacyName: "",
    category: "",
    location: "",
    description: "",
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
    if (!form.pharmacyName.trim()) {
      nextErrors.pharmacyName = "Enter a pharmacy or organization name.";
    }
    if (!form.category) {
      nextErrors.category = "Select a support category.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      // TODO: replace with the real support-ticket endpoint, e.g.
      // const res = await fetch("/api/pharmacy-support/ticket", {
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
        pharmacyName: "",
        category: "",
        location: "",
        description: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="support" ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                  Need secure <span style={{ color: ACCENT }}>pharmacy support?</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-2xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Get help with verification, portal access, profile
                  updates, availability signals, confirmation requests,
                  inventory workflows, branch controls, integrations, and
                  security — through the right ZoikoMeds support path.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Form card (centered) ---------------- */}
        <div className="mx-auto mt-10 flex max-w-2xl justify-center">
          {mounted ? (
            <SupportForm
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
      className="animate-[pharmacySupportFormFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes pharmacySupportFormFadeUp {
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
function SupportForm({
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
      className="w-full rounded-2xl border border-[#E7EAF1] bg-white p-8 shadow-[0_20px_45px_-30px_rgba(15,31,78,0.25)] animate-[pharmacySupportFormFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "250ms" }}
    >
      <h3 className="text-[18px] font-bold text-[#0F1F4E]">
        Get pharmacy support
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#5B6478]">
        Keep it short — we route your request to the right team.
        Sensitive details are gathered after authentication or through
        secure follow-up.
      </p>

      <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate>
        {/* Work email */}
        <Field
          id="support-email"
          label="Work email"
          error={errors.email}
        >
          <input
            id="support-email"
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="you@yourpharmacy.com"
            aria-invalid={Boolean(errors.email)}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        {/* Full name */}
        <Field id="support-name" label="Full name" error={errors.fullName}>
          <input
            id="support-name"
            type="text"
            value={form.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.fullName)}
            className={inputClass(Boolean(errors.fullName))}
          />
        </Field>

        {/* Pharmacy / org name */}
        <Field
          id="support-pharmacy"
          label="Pharmacy or organization name"
          error={errors.pharmacyName}
        >
          <input
            id="support-pharmacy"
            type="text"
            value={form.pharmacyName}
            onChange={(e) => onChange("pharmacyName", e.target.value)}
            placeholder="e.g. Riverside Community Pharmacy"
            aria-invalid={Boolean(errors.pharmacyName)}
            className={inputClass(Boolean(errors.pharmacyName))}
          />
        </Field>

        {/* Support category */}
        <Field
          id="support-category"
          label="Support category"
          error={errors.category}
        >
          <div className="relative">
            <select
              id="support-category"
              value={form.category}
              onChange={(e) => onChange("category", e.target.value)}
              aria-invalid={Boolean(errors.category)}
              className={`${inputClass(Boolean(errors.category))} appearance-none pr-10 ${
                form.category ? "" : "text-[#9AA1B5]"
              }`}
            >
              <option value="" disabled>
                Select a support category
              </option>
              {SUPPORT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="text-[#0F1F4E]">
                  {cat}
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
        </Field>

        {/* Location (optional) */}
        <Field
          id="support-location"
          label="Pharmacy location or branch"
          optional
        >
          <input
            id="support-location"
            type="text"
            value={form.location}
            onChange={(e) => onChange("location", e.target.value)}
            placeholder="City, ZIP code, or branch name"
            className={inputClass(false)}
          />
        </Field>

        {/* Description (optional) */}
        <Field
          id="support-description"
          label="Brief description of the issue"
          optional
        >
          <div className="mb-3 flex items-start gap-2 rounded-xl bg-[#FCEFD9] p-3">
            <svg
              className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#B6791D]"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 2l6.5 11.2H1.5L8 2z"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
              <path d="M8 6.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              <circle cx="8" cy="11.5" r="0.6" fill="currentColor" />
            </svg>
            <p className="text-[12px] leading-relaxed text-[#B6791D]">
              Do not include exact stock, patient information,
              prescription images, passwords, API secrets, license
              documents, controlled medicine details, or confidential
              pricing.
            </p>
          </div>
          <textarea
            id="support-description"
            value={form.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="What do you need help with?"
            rows={4}
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
          {status === "submitting" ? "Submitting..." : "Get Pharmacy Support"}
        </button>

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
            Your request has been submitted. We&apos;ll route it to the
            right team and follow up by email.
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
      <div className="h-4 w-full max-w-xl animate-pulse rounded bg-white" />
      <div className="h-4 w-2/3 max-w-md animate-pulse rounded bg-white" />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-[#E7EAF1] bg-white p-8">
      <div className="h-5 w-44 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-6 space-y-5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
        ))}
        <div className="h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
      </div>
    </div>
  );
}