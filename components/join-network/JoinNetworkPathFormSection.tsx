"use client";

import { useEffect, useRef, useState } from "react";

/**
 * JoinNetworkPathFormSection
 * "Start with the right pharmacy path" section — header, three path
 * cards, and a tabbed form (Join the Verified Network / Claim Your
 * Pharmacy) with client-side validation. The form card is centered
 * (per request, rather than left-aligned as in the reference design).
 */

const PATHS = [
  {
    icon: "home",
    title: "Independent pharmacy",
    description:
      "Single-location pharmacies, pharmacist-owned stores, and local operators ready to request verified participation.",
    cta: "Join the Verified Network",
    ctaStyle: "filled",
  },
  {
    icon: "branch",
    title: "Pharmacy group or chain",
    description:
      "Multi-branch operators, regional groups, and national chains needing branch controls and governance.",
    cta: "Request Chain Briefing",
    ctaStyle: "outline",
  },
  {
    icon: "code",
    title: "Technical integration",
    description:
      "PMS, POS, inventory, API, structured-feed, SSO, or operational integration discussions.",
    cta: "Discuss Integration",
    ctaStyle: "outline",
  },
] as const;

const PHARMACY_TYPES = [
  "Independent pharmacy",
  "Pharmacy chain / group",
  "Hospital pharmacy",
  "Online / mail-order pharmacy",
  "Other",
];

type JoinFormState = {
  email: string;
  fullName: string;
  orgName: string;
  pharmacyType: string;
  note: string;
};

type ClaimFormState = {
  search: string;
  email: string;
  fullName: string;
};

type JoinErrors = Partial<Record<keyof JoinFormState, string>>;
type ClaimErrors = Partial<Record<keyof ClaimFormState, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function JoinNetworkPathFormSection() {
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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                  Start with the{" "}
                  <span className="text-[#00A99D]">right pharmacy path.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-lg text-[14.5px] leading-relaxed text-[#5B6478]">
                  Each path maps to a different operational intent — choose
                  the one that fits your pharmacy.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Path cards ---------------- */}
        <div id="verified-network" className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {mounted
            ? PATHS.map((p, i) => <PathCard key={p.title} {...p} index={i} />)
            : PATHS.map((_, i) => <PathCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Form (centered) ---------------- */}
        <div id="claim-your-pharmacy" className="mt-12 flex justify-center">
          {mounted ? <PathForm /> : <FormSkeleton />}
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
      className="animate-[joinNetworkPathFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes joinNetworkPathFadeUp {
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
  ctaStyle,
  index,
}: {
  icon: "home" | "branch" | "code";
  title: string;
  description: string;
  cta: string;
  ctaStyle: "filled" | "outline";
  index: number;
}) {
  return (
    <div
      className="group rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[joinNetworkPathFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1 hover:border-[#9FE3D3] hover:shadow-[0_14px_32px_-16px_rgba(0,169,157,0.25)]"
      style={{ opacity: 0, animationDelay: `${250 + index * 110}ms` }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F1F4E] text-white transition-transform duration-300 group-hover:scale-110">
        <PathIcon name={icon} />
      </div>

      <h3 className="mt-4 text-[15px] font-bold text-[#0F1F4E]">{title}</h3>

      <p className="mt-2 min-h-[60px] text-[12.5px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      <button
        type="button"
        className={
          ctaStyle === "filled"
            ? "group relative mt-2 w-full overflow-hidden rounded-xl bg-[#00A99D] px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,169,157,0.45)] active:translate-y-0 active:scale-[0.98]"
            : "mt-2 w-full rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
        }
      >
        {ctaStyle === "filled" && (
          <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
        )}
        <span className="relative">{cta}</span>
      </button>
    </div>
  );
}

function PathIcon({ name }: { name: "home" | "branch" | "code" }) {
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
/*  Tabbed form                                                        */
/* ----------------------------------------------------------------- */
function PathForm() {
  const [tab, setTab] = useState<"join" | "claim">("join");

  return (
    <div
      className="w-full max-w-xl rounded-2xl border border-[#E7EAF1] bg-white p-7 shadow-[0_16px_40px_-20px_rgba(15,31,78,0.15)] animate-[joinNetworkPathFadeUp_0.6s_ease-out_forwards] sm:p-8"
      style={{ opacity: 0, animationDelay: "600ms" }}
    >
      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#EEF1F6]">
        <TabButton active={tab === "join"} onClick={() => setTab("join")}>
          Join the Verified Network
        </TabButton>
        <TabButton active={tab === "claim"} onClick={() => setTab("claim")}>
          Claim Your Pharmacy
        </TabButton>
      </div>

      <div className="mt-6">
        {tab === "join" ? <JoinForm /> : <ClaimForm />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative -mb-px pb-3 text-[13.5px] font-semibold transition-colors duration-200 ${
        active ? "text-[#00A99D]" : "text-[#8891A4] hover:text-[#5B6478]"
      }`}
    >
      {children}
      <span
        className={`absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-[#00A99D] transition-opacity duration-200 ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}

/* ----------------------------------------------------------------- */
/*  "Join the Verified Network" form                                  */
/* ----------------------------------------------------------------- */
function JoinForm() {
  const [values, setValues] = useState<JoinFormState>({
    email: "",
    fullName: "",
    orgName: "",
    pharmacyType: "",
    note: "",
  });
  const [errors, setErrors] = useState<JoinErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(v: JoinFormState): JoinErrors {
    const e: JoinErrors = {};
    if (!v.email.trim()) e.email = "Work email is required.";
    else if (!EMAIL_REGEX.test(v.email.trim()))
      e.email = "Enter a valid email address.";
    if (!v.fullName.trim()) e.fullName = "Full name is required.";
    if (!v.orgName.trim())
      e.orgName = "Pharmacy or organization name is required.";
    if (!v.pharmacyType) e.pharmacyType = "Select a pharmacy type.";
    return e;
  }

  function handleChange<K extends keyof JoinFormState>(key: K, val: string) {
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
      console.log("Join the Verified Network submission:", values);
    }
  }

  if (submitted) {
    return <SuccessState onReset={() => setSubmitted(false)} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 className="text-[16px] font-bold text-[#0F1F4E]">
        Join the Verified Network
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
        For new participation requests. Tell us a little about your
        pharmacy — no documents needed yet.
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
          <div className="relative">
            <select
              value={values.pharmacyType}
              onChange={(e) => handleChange("pharmacyType", e.target.value)}
              className={`${inputClasses(!!errors.pharmacyType)} appearance-none pr-9 ${
                values.pharmacyType ? "text-[#0F1F4E]" : "text-[#9AA3B5]"
              }`}
            >
              <option value="" disabled>
                Select pharmacy type
              </option>
              {PHARMACY_TYPES.map((t) => (
                <option key={t} value={t} className="text-[#0F1F4E]">
                  {t}
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
        </Field>

        <Field label="Brief note" optional>
          <textarea
            value={values.note}
            onChange={(e) => handleChange("note", e.target.value)}
            placeholder="Anything about your pharmacy, group, or integration need"
            rows={3}
            className={`${inputClasses(false)} resize-none`}
          />
        </Field>
      </div>

      <button
        type="submit"
        className="group relative mt-6 w-full overflow-hidden rounded-xl bg-[#00A99D] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,169,157,0.45)] active:translate-y-0 active:scale-[0.98]"
      >
        <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
        <span className="relative">Join the Verified Network</span>
      </button>

      <p className="mt-3 text-center text-[11.5px] leading-relaxed text-[#9AA3B5]">
        No exact stock, license documents, or sensitive data are
        collected in this form. Verification happens later in a secure
        workflow.
      </p>
    </form>
  );
}

/* ----------------------------------------------------------------- */
/*  "Claim Your Pharmacy" form                                        */
/* ----------------------------------------------------------------- */
function ClaimForm() {
  const [values, setValues] = useState<ClaimFormState>({
    search: "",
    email: "",
    fullName: "",
  });
  const [errors, setErrors] = useState<ClaimErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(v: ClaimFormState): ClaimErrors {
    const e: ClaimErrors = {};
    if (!v.search.trim())
      e.search = "Enter your pharmacy name, ZIP, city, or license number.";
    if (!v.fullName.trim()) e.fullName = "Full name is required.";
    if (!v.email.trim()) e.email = "Work email is required.";
    else if (!EMAIL_REGEX.test(v.email.trim()))
      e.email = "Enter a valid email address.";
    return e;
  }

  function handleChange<K extends keyof ClaimFormState>(
    key: K,
    val: string
  ) {
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
      console.log("Claim Your Pharmacy submission:", values);
    }
  }

  if (submitted) {
    return <SuccessState onReset={() => setSubmitted(false)} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h3 className="text-[16px] font-bold text-[#0F1F4E]">
        Claim Your Pharmacy
      </h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
        Already in our directory? Search and claim your existing record
        to start managing it.
      </p>

      <div className="mt-5 space-y-4">
        <Field label="Pharmacy name, ZIP, city, or license number" error={errors.search}>
          <input
            type="text"
            value={values.search}
            onChange={(e) => handleChange("search", e.target.value)}
            placeholder="e.g. Riverside Community Pharmacy"
            className={inputClasses(!!errors.search)}
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

        <Field label="Work email" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="you@yourpharmacy.com"
            className={inputClasses(!!errors.email)}
          />
        </Field>
      </div>

      <button
        type="submit"
        className="group relative mt-6 w-full overflow-hidden rounded-xl bg-[#00A99D] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-4px_rgba(0,169,157,0.45)] active:translate-y-0 active:scale-[0.98]"
      >
        <span className="absolute inset-0 -translate-x-full bg-white/25 transition-transform duration-500 ease-out group-hover:translate-x-full" />
        <span className="relative">Claim &amp; Verify Pharmacy</span>
      </button>

      <p className="mt-3 text-center text-[11.5px] leading-relaxed text-[#9AA3B5]">
        Claiming a record starts ownership verification — it does not
        publish exact stock or sensitive data.
      </p>
    </form>
  );
}

/* ----------------------------------------------------------------- */
/*  Shared field wrapper + input styling                              */
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

function inputClasses(hasError: boolean) {
  return `w-full rounded-lg border bg-[#FAFBFD] px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder:text-[#9AA3B5] transition-colors duration-200 focus:outline-none focus:bg-white ${
    hasError
      ? "border-[#F0B8B8] focus:border-[#D14343]"
      : "border-[#E0E4EC] focus:border-[#00A99D]"
  }`;
}

/* ----------------------------------------------------------------- */
/*  Success state                                                      */
/* ----------------------------------------------------------------- */
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DCF5EE] text-[#00A99D]">
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
        We&apos;ll follow up by email with the next verification steps.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 text-[13px] font-semibold text-[#00A99D] transition-colors duration-200 hover:text-[#03877D]"
      >
        Submit another request
      </button>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                          */
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
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-4 h-9 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="w-full max-w-xl rounded-2xl border border-[#E7EAF1] bg-white p-8">
      <div className="flex gap-6 border-b border-[#EEF1F6] pb-3">
        <div className="h-4 w-44 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-4 w-36 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-6 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
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