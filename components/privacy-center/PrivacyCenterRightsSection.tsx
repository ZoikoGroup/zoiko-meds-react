"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const RIGHTS = [
  {
    title: "Access my data",
    description: "Request a copy or view of eligible account data.",
    note: "Identity verified before release.",
    icon: <path d="M8 13V3M4.5 6.5L8 3l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    title: "Correct my data",
    description: "Ask ZoikoMeds to correct inaccurate eligible account or profile information.",
    note: "Routed to the right queue.",
    icon: <path d="M11 2.5l2.5 2.5-8 8-3 .5.5-3 8-8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />,
  },
  {
    title: "Delete my account",
    description: "Delete account data subject to legal, security, contractual, and operational retention limits.",
    note: "Consequences + confirmation shown.",
    icon: (
      <path d="M3.5 4.5h9M6.5 4.5V3a1 1 0 011-1h1a1 1 0 011 1v1.5M5 4.5l.5 9a1 1 0 001 1h3a1 1 0 001-1l.5-9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Download my data",
    description: "Export eligible saved searches, alerts, preferences, and account data.",
    note: "Secure authenticated export.",
    icon: <path d="M8 3v7M4.5 7.5L8 11l3.5-3.5M3.5 13h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />,
  },
  {
    title: "Manage consent",
    description: "Update cookie, marketing, analytics, notification, and optional research choices.",
    note: "Granular toggles, saved instantly.",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <circle cx="6" cy="6.5" r="0.9" fill="currentColor" />
        <circle cx="10" cy="9.5" r="0.7" fill="currentColor" />
      </>
    ),
  },
  {
    title: "Restrict / object / opt out",
    description: "Submit jurisdiction-specific privacy choices where applicable.",
    note: "Routed by region + type.",
    icon: <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />,
  },
  {
    title: "Appeal or follow up",
    description: "Check status or ask for review of a privacy request outcome.",
    note: "Request ID + next step.",
    icon: (
      <>
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M8 4.75V8l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
] as const;

const REQUEST_TYPES = ["Access my data", "Correct my data", "Delete my account", "Download my data", "Manage consent", "Restrict / object / opt out", "Appeal or follow up"];
const RELATIONSHIP_TYPES = ["Account holder", "Caregiver", "Legal representative", "Other"];

interface FormState {
  email: string;
  fullName: string;
  requestType: string;
  country: string;
  relationship: string;
  note: string;
}

const INITIAL_FORM: FormState = {
  email: "",
  fullName: "",
  requestType: "",
  country: "",
  relationship: "",
  note: "",
};

export default function PrivacyCenterRightsSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) nextErrors.email = "Email is required.";
    else if (!emailPattern.test(form.email.trim())) nextErrors.email = "Enter a valid email address.";

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.requestType) nextErrors.requestType = "Select a request type.";
    if (!form.country.trim()) nextErrors.country = "Country or region is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      // Replace with your real endpoint.
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Rights list block ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">04</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Rights, Requests &amp; Account Controls
          </p>
        </Reveal>

        <Reveal index={1} active={mounted}>
          <h2 className="text-[1.9rem] font-extrabold leading-tight sm:text-[2.1rem]">
            <span className="text-[#0F1F4E]">Your rights, as clear </span>
            <span style={{ color: ACCENT }}>product actions.</span>
          </h2>
        </Reveal>

        <Reveal index={2} active={mounted}>
          <p className="mt-3 text-[13.5px] leading-relaxed text-[#5B6478]">
            Available choices vary by account state, jurisdiction, and applicable law.
          </p>
        </Reveal>

        <Reveal index={3} active={mounted}>
          <div className="mt-7 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)]">
            <div className="divide-y divide-[#F0F2F7]">
              {RIGHTS.map((right) => (
                <div
                  key={right.title}
                  className="grid grid-cols-[auto_1fr_auto] items-start gap-4 px-6 py-4 transition-colors duration-150 hover:bg-[#F8FAFC] sm:px-7"
                >
                  <div
                    className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "rgba(15,170,135,0.1)", color: ACCENT }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                      {right.icon}
                    </svg>
                  </div>

                  <div>
                    <h3 className="text-[13.5px] font-bold text-[#0F1F4E]">{right.title}</h3>
                    <p className="mt-0.5 text-[12.5px] leading-relaxed text-[#5B6478]">
                      {right.description}
                    </p>
                  </div>

                  <span className="mt-1 whitespace-nowrap text-right text-[11.5px] text-[#B3B9C9]">
                    {right.note}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ── Submit a privacy request block ── */}
        <Reveal index={4} active={mounted}>
          <h2 className="mt-16 text-[1.9rem] font-extrabold leading-tight sm:text-[2.1rem]">
            <span className="text-[#0F1F4E]">Submit a </span>
            <span style={{ color: ACCENT }}>privacy request</span>
          </h2>
        </Reveal>

        <Reveal index={5} active={mounted}>
          <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-[#5B6478]">
            We route your request by type and region, and verify identity before any account
            data is released, changed, exported, or deleted.
          </p>
        </Reveal>

        <Reveal index={6} active={mounted}>
          <div className="mt-7 rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)] sm:p-8">

            {status === "success" ? (
              <div className="flex items-start gap-3 rounded-xl border border-[#0FAA87]/25 bg-[#0FAA87]/5 p-4">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-[13.5px] font-semibold text-[#0F1F4E]">Request received.</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#5B6478]">
                    We&apos;ll verify your identity through a secure flow and follow up at the
                    email you provided.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Email" required error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@email.com"
                      className={inputClass(!!errors.email)}
                    />
                  </Field>

                  <Field label="Full name" required error={errors.fullName}>
                    <input
                      type="text"
                      value={form.fullName}
                      onChange={(e) => updateField("fullName", e.target.value)}
                      placeholder="Full name"
                      className={inputClass(!!errors.fullName)}
                    />
                  </Field>

                  <Field label="Request type" required error={errors.requestType}>
                    <select
                      value={form.requestType}
                      onChange={(e) => updateField("requestType", e.target.value)}
                      className={inputClass(!!errors.requestType)}
                    >
                      <option value="">Select type</option>
                      {REQUEST_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Country or region" required error={errors.country}>
                    <input
                      type="text"
                      value={form.country}
                      onChange={(e) => updateField("country", e.target.value)}
                      placeholder="e.g. US, UK, EU"
                      className={inputClass(!!errors.country)}
                    />
                  </Field>
                </div>

                <Field label="Relationship to account" optional>
                  <select
                    value={form.relationship}
                    onChange={(e) => updateField("relationship", e.target.value)}
                    className={inputClass(false)}
                  >
                    <option value="">Select one</option>
                    {RELATIONSHIP_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Brief note" optional>
                  <textarea
                    value={form.note}
                    onChange={(e) => updateField("note", e.target.value)}
                    placeholder="A short summary of your request (no medical, prescription, or sensitive details)."
                    rows={4}
                    className={inputClass(false) + " resize-none"}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-[13.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-70"
                  style={{ backgroundColor: ACCENT }}
                >
                  {status === "submitting" && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.3" />
                      <path d="M14.5 8a6.5 6.5 0 00-6.5-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  )}
                  {status === "submitting" ? "Submitting…" : "Submit Privacy Request"}
                </button>

                {status === "error" && (
                  <p className="text-[12.5px] font-medium text-[#E5484D]">
                    Something went wrong. Please try again.
                  </p>
                )}

                <p className="flex items-start gap-2 text-[11.5px] leading-relaxed text-[#9AA1B4]">
                  <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M8 7.25v4M8 5.1v.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Don&apos;t include passwords, prescription images, diagnosis, symptoms,
                  insurance numbers, API secrets, or exact pharmacy stock here. We verify
                  identity through a secure flow.
                </p>
              </form>
            )}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Field                                                                */
/* ------------------------------------------------------------------ */
function Field({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12.5px] font-semibold text-[#0F1F4E]">
        {label}
        {required && <span className="ml-0.5 text-[#E5484D]">*</span>}
        {optional && <span className="ml-1 font-normal text-[#9AA1B4]">(optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[12px] font-medium text-[#E5484D]">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-lg border bg-[#F8FAFC] px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder:text-[#9AA1B4]",
    "transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0",
    hasError
      ? "border-[#E5484D] focus:ring-[#E5484D]/30"
      : "border-[#E7EAF1] focus:border-[#0FAA87] focus:ring-[#0FAA87]/20",
  ].join(" ");
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `privacyRightsFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes privacyRightsFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}