"use client";

import { useEffect, useState } from "react";

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

export default function CareersNextStepSection() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    roleFamily: "",
    location: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            : Array.from({ length: 3 }).map((_, i) => <PathwayCardSkeleton key={i} />)}
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
                  A short first step. We&apos;ll let you know when a
                  matching role opens — no resume needed yet.
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
                onChange={handleChange}
                onSubmit={handleSubmit}
                submitted={submitted}
              />
            </Reveal>
          ) : (
            <div className="h-[280px] w-full animate-pulse rounded-3xl bg-white" />
          )}
        </div>

        {/* ---------------- Closing CTA banner ---------------- */}
        <div className="mt-8">
          {mounted ? (
            <Reveal index={8}>
              <ClosingCtaBanner />
            </Reveal>
          ) : (
            <div className="h-56 w-full animate-pulse rounded-3xl bg-[#E4E8F0]" />
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

      <button
        type="button"
        className="mt-5 w-full rounded-xl border border-[#D7DCE6] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
      >
        {cta}
      </button>
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
type FormState = {
  email: string;
  fullName: string;
  roleFamily: string;
  location: string;
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
            <Field label="Email" required>
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={formData.email}
                onChange={(e) => onChange("email", e.target.value)}
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
            <Field label="Role family interest" required>
              <SelectInput
                value={formData.roleFamily}
                onChange={(v) => onChange("roleFamily", v)}
                placeholder="Select role family"
                options={ROLE_FAMILIES}
              />
            </Field>

            <Field label="Location / work-authorization region" optional>
              <input
                type="text"
                placeholder="e.g. US, UK, EU"
                value={formData.location}
                onChange={(e) => onChange("location", e.target.value)}
                className="w-full rounded-xl border border-[#D7DCE6] bg-white px-4 py-3 text-[13.5px] text-[#0F1F4E] outline-none transition-colors duration-200 placeholder:text-[#AEB5C4] focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
              />
            </Field>
          </div>

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
            <span className="relative">Join Talent Community</span>
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
            Don&apos;t include resumes, IDs, salary expectations,
            demographic, health, or banking details here — those come
            later through our secure recruiting system.
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
        required
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
        You&apos;re on the list.
      </h4>
      <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-[#8891A4]">
        We&apos;ll reach out when a role matching your interests opens
        up.
      </p>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Closing CTA banner                                                  */
/* ----------------------------------------------------------------- */
function ClosingCtaBanner() {
  return (
    <div className="rounded-3xl bg-[#0B1530] px-8 py-14 text-center sm:px-16">
      <h3 className="font-[var(--font-plus-jakarta-sans)] text-2xl font-bold leading-snug text-white sm:text-3xl">
        Build trusted medicine availability{" "}
        <span style={{ color: ACCENT }}>infrastructure with us.</span>
      </h3>

      <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-relaxed text-[#9AA3B5]">
        Help patients, pharmacies, providers, and institutions
        understand medicine availability safely and responsibly.
      </p>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          className="group relative overflow-hidden rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          style={{ backgroundColor: ACCENT }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow =
              "0 8px 24px -4px rgba(15,170,135,0.45)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
        >
          <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
          <span className="relative">View Open Roles</span>
        </button>

        <button
          type="button"
          className="rounded-xl border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/5 active:translate-y-0 active:scale-[0.98]"
        >
          Join Talent Community
        </button>
      </div>

      <a
        href="#"
        className="mt-6 inline-block text-[12.5px] font-semibold text-[#9AA3B5] underline-offset-2 transition-colors duration-200 hover:text-white hover:underline"
      >
        Candidate Privacy Notice →
      </a>
    </div>
  );
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