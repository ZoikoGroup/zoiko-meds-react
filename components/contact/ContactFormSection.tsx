"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";


const ACCENT = "#0FAA87";

const CONTACT_REASONS = [
  "Enterprise & public-sector inquiry",
  "Pharmacy verification or portal support",
  "Provider or care-team support",
  "Press & communications",
  "Careers & talent",
  "Privacy, legal, or security",
  "General question",
] as const;

const ORG_TYPES = [
  "Hospital or health system",
  "Pharmacy chain or group",
  "Government or public-sector agency",
  "Press or media organization",
  "Technology or data partner",
  "Individual / not applicable",
] as const;

type FormState = {
  email: string;
  fullName: string;
  contactReason: string;
  organizationName: string;
  organizationType: string;
  country: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;
type FormStatus = "idle" | "submitting" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactFormSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({
    email: "",
    fullName: "",
    contactReason: "",
    organizationName: "",
    organizationType: "",
    country: "",
    message: "",
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
      nextErrors.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.fullName.trim()) {
      nextErrors.fullName = "Enter your full name.";
    }
    if (!form.contactReason) {
      nextErrors.contactReason = "Select a contact reason.";
    }
    if (!form.message.trim()) {
      nextErrors.message = "Enter a short message summary.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      // TODO: replace with the real contact-routing endpoint, e.g.
      // const res = await fetch("/api/contact/route", {
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
        contactReason: "",
        organizationName: "",
        organizationType: "",
        country: "",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        {/* ---------------- Header (left-aligned) ---------------- */}
        <div>
          {mounted ? (
            <>
              <Reveal index={0}>
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: ACCENT }}
                >
                  04 · Contact form
                </p>
              </Reveal>

              <Reveal index={1}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] mt-2 text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
                  Send the right message to the right{" "}
                  <span style={{ color: ACCENT }}>ZoikoMeds team.</span>
                </h2>
              </Reveal>

              <Reveal index={2}>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  We collect only the minimum needed to route you — deeper
                  details come later through the correct workflow.
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
            <ContactForm
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

        {/* ---------------- Closing CTA banner ---------------- */}
        <div className="mt-6">
          {mounted ? <ClosingCta /> : <ClosingCtaSkeleton />}
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
      className="animate-[contactFormFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes contactFormFadeUp {
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
/*  Contact form                                                        */
/* ----------------------------------------------------------------- */
function ContactForm({
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
      className="rounded-2xl border border-[#E7EAF1] bg-white p-8 shadow-[0_20px_45px_-30px_rgba(15,31,78,0.25)] animate-[contactFormFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "280ms" }}
    >
      <form className="space-y-6" onSubmit={onSubmit} noValidate>
        {/* Row 1: email + name */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="contact-email" label="Email address" required error={errors.email}>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="you@email.com"
              aria-invalid={Boolean(errors.email)}
              className={inputClass(Boolean(errors.email))}
            />
          </Field>

          <Field id="contact-name" label="Full name" required error={errors.fullName}>
            <input
              id="contact-name"
              type="text"
              value={form.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              placeholder="Full name"
              aria-invalid={Boolean(errors.fullName)}
              className={inputClass(Boolean(errors.fullName))}
            />
          </Field>
        </div>

        {/* Row 2: contact reason + org name */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field
            id="contact-reason"
            label="Contact reason"
            required
            error={errors.contactReason}
          >
            <SelectField
              id="contact-reason"
              value={form.contactReason}
              onChange={(value) => onChange("contactReason", value)}
              placeholder="Select a reason"
              options={CONTACT_REASONS}
              hasError={Boolean(errors.contactReason)}
            />
          </Field>

          <Field id="contact-org" label="Organization name" optional>
            <input
              id="contact-org"
              type="text"
              value={form.organizationName}
              onChange={(e) => onChange("organizationName", e.target.value)}
              placeholder="Organization"
              className={inputClass(false)}
            />
          </Field>
        </div>

        {/* Row 3: org type + country */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field id="contact-org-type" label="Organization type" optional>
            <SelectField
              id="contact-org-type"
              value={form.organizationType}
              onChange={(value) => onChange("organizationType", value)}
              placeholder="Select type"
              options={ORG_TYPES}
              hasError={false}
            />
          </Field>

          <Field id="contact-country" label="Country or region" optional>
            <input
              id="contact-country"
              type="text"
              value={form.country}
              onChange={(e) => onChange("country", e.target.value)}
              placeholder="e.g. US, UK, EU"
              className={inputClass(false)}
            />
          </Field>
        </div>

        {/* Message summary */}
        <Field
          id="contact-message"
          label="Message summary"
          required
          error={errors.message}
        >
          <textarea
            id="contact-message"
            value={form.message}
            onChange={(e) => onChange("message", e.target.value)}
            placeholder="A short summary of what you need (no medical, prescription, stock, or confidential details)."
            rows={3}
            aria-invalid={Boolean(errors.message)}
            className={`${inputClass(Boolean(errors.message))} resize-none`}
          />
        </Field>

        {/* Buttons row */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a
            href="/search-medicines"
            className="inline-flex w-full items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-3.5 text-[14px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
          >
            Search Medicines
          </a>

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
            {status === "submitting" ? "Sending..." : "Send to Correct Team"}
          </button>
        </div>

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
          Don&apos;t include PHI, prescriptions, exact stock, passwords,
          API secrets, or legal/commercial documents here — we&apos;ll
          request anything sensitive through a secure workflow.
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
            Your message has been sent. We&apos;ll route it to the right
            team and follow up by email.
          </p>
        )}

        {status === "error" && (
          <p className="text-[13px] font-medium text-[#C5453F]">
            Something went wrong while sending. Please try again.
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
/*  Closing CTA banner                                                  */
/* ----------------------------------------------------------------- */
function ClosingCta() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-[#1F2E55] px-6 py-14 text-center sm:px-12 sm:py-16 animate-[contactFormFadeUp_0.6s_ease-out_forwards]"
      style={{
        opacity: 0,
        animationDelay: "550ms",
        background:
          "radial-gradient(120% 140% at 50% -10%, #16234A 0%, #0B1226 60%, #0A0F1F 100%)",
      }}
    >
      <h3 className="font-[var(--font-plus-jakarta-sans)] text-2xl font-bold leading-tight text-white sm:text-[1.85rem]">
        Need the right ZoikoMeds team?{" "}
        <span style={{ color: ACCENT }}>Start here.</span>
      </h3>

      <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-[#A9B2C8]">
        Use one contact gateway to reach support, enterprise, pharmacy,
        provider, press, careers, privacy, security, legal, and
        corporate teams.
      </p>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href="#contact"
          className="inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] sm:w-auto"
          style={{ backgroundColor: ACCENT }}
        >
          Choose Your Contact Path
        </a>
        <a
          href="/searchmed"
          className="inline-flex w-full items-center justify-center rounded-xl border border-[#3A4668] bg-transparent px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-white/5 active:translate-y-0 active:scale-[0.98] sm:w-auto"
        >
          Search Medicines
        </a>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                           */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-3 w-32 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="h-8 w-full max-w-md animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="h-8 w-2/3 max-w-sm animate-pulse rounded-lg bg-[#E4E8F0]" />
      <div className="mt-1 h-3.5 w-full max-w-xl animate-pulse rounded bg-[#E4E8F0]" />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
        ))}
      </div>
      <div className="mt-5 h-20 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
      </div>
    </div>
  );
}

function ClosingCtaSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-[#1F2E55] bg-[#0B1226] px-6 py-14 sm:px-12 sm:py-16">
      <div className="h-7 w-full max-w-md animate-pulse rounded-lg bg-white/10" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white/10" />
      <div className="h-4 w-2/3 max-w-md animate-pulse rounded bg-white/10" />
      <div className="mt-3 flex gap-3">
        <div className="h-11 w-52 animate-pulse rounded-xl bg-white/10" />
        <div className="h-11 w-44 animate-pulse rounded-xl bg-white/10" />
      </div>
    </div>
  );
}