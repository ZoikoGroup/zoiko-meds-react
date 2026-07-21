"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const ACCENT = "#0FAA87";

const LIMITS = [
  {
    icon: "box",
    title: "Not a stock guarantee",
    description:
      "A verified pharmacy may still have no current availability signal for a specific medicine.",
  },
  {
    icon: "user",
    title: "Not a dispensing decision",
    description:
      "Prescription rules, pharmacist judgment, eligibility, pharmacy policies, and local laws always apply.",
  },
  {
    icon: "pin",
    title: "Not medical advice",
    description:
      "ZoikoMeds does not recommend medicines, doses, substitutions, treatments, or clinical decisions.",
  },
  {
    icon: "eyeOff",
    title: "Does not expose exact stock",
    description:
      "ZoikoMeds does not publicly display exact pharmacy stock quantities.",
  },
  {
    icon: "home",
    title: "Does not replace regulators",
    description:
      "ZoikoMeds is not a pharmacy board, licensing authority, regulator, or enforcement body.",
  },
  {
    icon: "refresh",
    title: "Can change over time",
    description:
      "Status may change based on review, new evidence, updates, platform controls, or governance decisions.",
  },
] as const;

const NEXT_STEPS = [
  {
    icon: "home",
    title: "Pharmacy representative",
    description: "Claim or verify your pharmacy profile.",
    cta: "Claim Your Pharmacy",
    variant: "solid",
    link:"#claim-your-pharmacy"
  },
  {
    icon: "building",
    title: "Pharmacy group or chain",
    description: "Verify multiple branches, users, and role structures.",
    cta: "Request Chain Briefing",
    variant: "outline",
    link:"#"
  },
  {
    icon: "search",
    title: "Patient or caregiver",
    description: "Understand verified pharmacy search results.",
    cta: "Search Medicines",
    variant: "outline",
    link:"/searchmed"
  },
] as const;

type FormState = {
  name: string;
  location: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function VerificationLimitsAndNextStepSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({ name: "", location: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
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

    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) {
      nextErrors.name = "Enter a pharmacy name.";
    }
    if (!form.location.trim()) {
      nextErrors.location = "Enter a city, ZIP code, or postcode.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      // TODO: replace with the real lookup endpoint, e.g.
      // const res = await fetch("/api/pharmacy/search", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Lookup failed");
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                  Verified participation has{" "}
                  <span style={{ color: ACCENT }}>clear limits.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Stated once, plainly — what verification is, and what it
                  is not.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Limits cards ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {mounted
            ? LIMITS.map((l, i) => <LimitCard key={l.title} {...l} index={i} />)
            : LIMITS.map((_, i) => <LimitCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Next step subheader ---------------- */}
        <div className="mt-12">
          {mounted ? (
            <Reveal index={9}>
              <h3 className="text-[15px] font-bold text-[#0F1F4E]">
                Find the right next step.
              </h3>
            </Reveal>
          ) : (
            <div className="h-5 w-52 animate-pulse rounded bg-[#E4E8F0]" />
          )}
        </div>

        {/* ---------------- Next step path cards ---------------- */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? NEXT_STEPS.map((s, i) => (
                <NextStepCard key={s.title} {...s} index={i} />
              ))
            : NEXT_STEPS.map((_, i) => <NextStepCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Claim / verify form (centered) ---------------- */}
        <div id="claim-your-pharmacy" className="mx-auto mt-8 flex max-w-5xl justify-center">
          {mounted ? (
            <ClaimForm
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
      className="animate-[portalLimitsNextStepFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes portalLimitsNextStepFadeUp {
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
/*  Limit card                                                          */
/* ----------------------------------------------------------------- */
function LimitCard({
  icon,
  title,
  description,
  index,
}: {
  icon: "box" | "user" | "pin" | "eyeOff" | "home" | "refresh";
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="group flex items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[portalLimitsNextStepFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
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
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
      >
        <LimitIcon name={icon} />
      </div>

      <div>
        <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
          {description}
        </p>
      </div>
    </div>
  );
}

function LimitIcon({
  name,
}: {
  name: "box" | "user" | "pin" | "eyeOff" | "home" | "refresh";
}) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-4.5 w-4.5" };

  switch (name) {
    case "box":
      return (
        <svg {...common}>
          <path
            d="M4 8l8-4 8 4-8 4-8-4z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M4 8v8l8 4 8-4V8M12 12v8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8.2" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M5 19.5c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path
            d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "eyeOff":
      return (
        <svg {...common}>
          <path
            d="M3.5 12s3.5-6.5 8.5-6.5 8.5 6.5 8.5 6.5-3.5 6.5-8.5 6.5S3.5 12 3.5 12z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "home":
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
    case "refresh":
      return (
        <svg {...common}>
          <path
            d="M19 9a7 7 0 0 0-12.6-3.2M5 15a7 7 0 0 0 12.6 3.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M19 4.5V9h-4.5M5 19.5V15h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Next step card                                                       */
/* ----------------------------------------------------------------- */
function NextStepCard({
  icon,
  title,
  description,
  cta,
  variant,
  index,
  link
}: {
  icon: "home" | "building" | "search";
  title: string;
  description: string;
  cta: string;
  variant: "solid" | "outline";
  index: number;
  link:string;
}) {
  return (
    <div
      className="group flex flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[portalLimitsNextStepFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{
        opacity: 0,
        animationDelay: `${1000 + index * 100}ms`,
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
        <NextStepIcon name={icon} />
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

function NextStepIcon({ name }: { name: "home" | "building" | "search" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
    case "home":
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
    case "building":
      return (
        <svg {...common}>
          <rect x="4" y="14" width="4" height="6" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10" y="9" width="4" height="11" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16" y="4" width="4" height="16" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
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
/*  Claim / verify form                                                 */
/* ----------------------------------------------------------------- */
function ClaimForm({
  form,
  errors,
  status,
  onChange,
  onSubmit,
}: {
  form: FormState;
  errors: Partial<FormState>;
  status: FormStatus;
  onChange: (field: keyof FormState, value: string) => void;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <div
      className="w-full rounded-2xl border border-[#E7EAF1] bg-white p-8 shadow-[0_20px_45px_-30px_rgba(15,31,78,0.25)] animate-[portalLimitsNextStepFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "1350ms" }}
    >
      <h3 className="text-[18px] font-bold text-[#0F1F4E]">
        Claim or verify your pharmacy
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#5B6478]">
        Find your pharmacy profile and request authorized control.
        Sensitive license evidence is collected later, in a secure
        workflow.
      </p>

      <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate>
        <div>
          <label
            htmlFor="claim-pharmacy-name"
            className="mb-1.5 block text-[12.5px] font-semibold text-[#0F1F4E]"
          >
            Pharmacy name
          </label>
          <input
            id="claim-pharmacy-name"
            type="text"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="e.g. Riverside Community Pharmacy"
            aria-invalid={Boolean(errors.name)}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-[#0F1F4E] placeholder:text-[#9AA1B5] outline-none transition-colors duration-200 ${
              errors.name
                ? "border-[#E0635C] focus:border-[#E0635C]"
                : "border-[#D7DCE6] focus:border-[#0FAA87]"
            }`}
          />
          {errors.name && (
            <p className="mt-1.5 text-[12px] text-[#C5453F]">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="claim-pharmacy-location"
            className="mb-1.5 block text-[12.5px] font-semibold text-[#0F1F4E]"
          >
            Location
          </label>
          <input
            id="claim-pharmacy-location"
            type="text"
            value={form.location}
            onChange={(e) => onChange("location", e.target.value)}
            placeholder="City, ZIP code, or postcode"
            aria-invalid={Boolean(errors.location)}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-[#0F1F4E] placeholder:text-[#9AA1B5] outline-none transition-colors duration-200 ${
              errors.location
                ? "border-[#E0635C] focus:border-[#E0635C]"
                : "border-[#D7DCE6] focus:border-[#0FAA87]"
            }`}
          />
          {errors.location && (
            <p className="mt-1.5 text-[12px] text-[#C5453F]">
              {errors.location}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          style={{ backgroundColor: ACCENT }}
        >
          {status === "submitting" && (
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
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
          {status === "submitting" ? "Searching..." : "Find my pharmacy"}
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
            We found matching results for &quot;{form.name}&quot; near{" "}
            {form.location}. Check your inbox for next steps.
          </p>
        )}

        {status === "error" && (
          <p className="text-[13px] font-medium text-[#C5453F]">
            Something went wrong while searching. Please try again.
          </p>
        )}
      </form>
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

function LimitCardSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-9 w-9 flex-shrink-0 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}

function NextStepCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-5 h-9 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-[#E7EAF1] bg-white p-8">
      <div className="h-5 w-56 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-6 space-y-5">
        <div className="h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
      </div>
    </div>
  );
}