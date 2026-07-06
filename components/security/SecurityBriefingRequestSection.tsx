"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SecurityBriefingRequestSection
 * "Bring your security and implementation teams into the conversation."
 *
 * Layout: light section, left-aligned eyebrow
 *         (11 · REQUEST A SECURITY BRIEFING)
 *         + 2-line headline (black + teal) + subtext
 *         + 2-column grid: white form card (left, wider, with full
 *           client-side validation) and dark navy "Security
 *           foundations" card (right).
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const BG = "#F3F4F8";
const NAVY = "#0F1F4E";
const PANEL = "#0B1226";
const ERROR = "#DC2626";

const SECURITY_INTERESTS = [
  "Access Control",
  "Privacy",
  "Data Protection",
  "Responsible AI",
  "Auditability",
  "Integrations",
  "Enterprise Review",
  "Other",
] as const;

const FOUNDATIONS = [
  {
    title: "Role-based access",
    body: "Least-privilege defaults across organization, pharmacy, reporting, and compliance users.",
  },
  {
    title: "No exact inventory",
    body: "Confidence tiers and authorized access, never public exact quantities.",
  },
  {
    title: "Responsible AI",
    body: "Bounded, explainable, human-reviewed, non-clinical operational intelligence.",
  },
  {
    title: "Audit-ready",
    body: "Activity, exports, reviews, and incidents captured for governance.",
  },
] as const;

type FormState = {
  fullName: string;
  workEmail: string;
  organization: string;
  jobTitle: string;
  orgType: string;
  country: string;
  message: string;
  consent: boolean;
};

const INITIAL_STATE: FormState = {
  fullName: "",
  workEmail: "",
  organization: "",
  jobTitle: "",
  orgType: "",
  country: "",
  message: "",
  consent: false,
};

type Errors = Partial<Record<keyof FormState | "interests", string>>;

export default function SecurityBriefingRequestSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [interests, setInterests] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleInterest(label: string) {
    setInterests((prev) => {
      const next = prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label];
      return next;
    });
    if (errors.interests) setErrors((prev) => ({ ...prev, interests: undefined }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";

    if (!form.workEmail.trim()) {
      next.workEmail = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail.trim())) {
      next.workEmail = "Enter a valid email address.";
    }

    if (!form.organization.trim()) next.organization = "Organization is required.";
    if (!form.jobTitle.trim()) next.jobTitle = "Job title is required.";
    if (!form.orgType) next.orgType = "Please select an organization type.";
    if (!form.country.trim()) next.country = "Country / region is required.";
    if (interests.length === 0) next.interests = "Select at least one area of security interest.";
    if (!form.consent) next.consent = "Consent is required to submit this request.";

    return next;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    // Wire this up to your form handler / API route.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>11</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Request a Security Briefing
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Bring your security and implementation
            <br />
            <span style={{ color: ACCENT }}>teams into the conversation.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed" style={{ color: `${NAVY}99` }}>
            Request a security briefing to review access models, data governance, responsible
            AI controls, auditability, and integration requirements before deployment.
          </p>
        </Reveal>

        {/* ── Grid: form + foundations ── */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[2.1fr_1fr]">

          {/* Form card */}
          <Reveal index={3} active={mounted}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)] sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" required error={errors.fullName}>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => setField("fullName", e.target.value)}
                    className="input"
                    style={inputStyle(!!errors.fullName)}
                  />
                </Field>

                <Field label="Work email" required error={errors.workEmail}>
                  <input
                    type="email"
                    value={form.workEmail}
                    onChange={(e) => setField("workEmail", e.target.value)}
                    placeholder="name@organization.org"
                    className="input"
                    style={inputStyle(!!errors.workEmail)}
                  />
                </Field>

                <Field label="Organization" required error={errors.organization}>
                  <input
                    type="text"
                    value={form.organization}
                    onChange={(e) => setField("organization", e.target.value)}
                    className="input"
                    style={inputStyle(!!errors.organization)}
                  />
                </Field>

                <Field label="Job title" required error={errors.jobTitle}>
                  <input
                    type="text"
                    value={form.jobTitle}
                    onChange={(e) => setField("jobTitle", e.target.value)}
                    className="input"
                    style={inputStyle(!!errors.jobTitle)}
                  />
                </Field>

                <Field label="Organization type" required error={errors.orgType}>
                  <select
                    value={form.orgType}
                    onChange={(e) => setField("orgType", e.target.value)}
                    className="input appearance-none"
                    style={inputStyle(!!errors.orgType)}
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    <option>Hospital / Health system</option>
                    <option>Retail pharmacy</option>
                    <option>Distributor / Wholesaler</option>
                    <option>Manufacturer</option>
                    <option>Government / NGO</option>
                    <option>Enterprise partner</option>
                    <option>Other</option>
                  </select>
                </Field>

                <Field label="Country / region" required error={errors.country}>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => setField("country", e.target.value)}
                    placeholder="e.g. US, UK, EU, national"
                    className="input"
                    style={inputStyle(!!errors.country)}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <span className="mb-2 block text-[12.5px] font-semibold" style={{ color: NAVY }}>
                    Security interest <span className="text-red-500">*</span>
                  </span>
                  <div
                    className="grid grid-cols-1 gap-x-6 gap-y-2 rounded-xl p-3 sm:grid-cols-2"
                    style={{
                      backgroundColor: "#F7F8FB",
                      border: errors.interests ? `1px solid ${ERROR}` : "1px solid transparent",
                    }}
                  >
                    {SECURITY_INTERESTS.map((label) => (
                      <label
                        key={label}
                        className="flex cursor-pointer items-center gap-2.5 text-[13px]"
                        style={{ color: `${NAVY}CC` }}
                      >
                        <input
                          type="checkbox"
                          checked={interests.includes(label)}
                          onChange={() => toggleInterest(label)}
                          className="h-4 w-4 rounded border-black/20 text-[#13A594] focus:ring-[#13A594]"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                  {errors.interests && <p className="mt-1.5 text-[12px]" style={{ color: ERROR }}>{errors.interests}</p>}
                </div>

                <div className="sm:col-span-2">
                  <Field label="Message" hint="optional">
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      placeholder="Tell us what your security or implementation team needs to review (no PHI, prescriptions, or exact stock)."
                      className="input resize-none"
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-5">
                <label className="flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}B3` }}>
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setField("consent", e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-[#13A594] focus:ring-[#13A594]"
                  />
                  <span>
                    I consent to be contacted about ZoikoMeds and acknowledge the{" "}
                    <a href="/privacy" className="font-medium hover:underline" style={{ color: ACCENT }}>
                      privacy notice
                    </a>
                    . <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.consent && <p className="mt-1.5 text-[12px]" style={{ color: ERROR }}>{errors.consent}</p>}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl py-3.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: ACCENT }}
                >
                  {submitted ? "Request sent" : submitting ? "Sending…" : "Request a Security Briefing"}
                </button>
                <a
                  href="#talk-to-sales"
                  className="flex-1 rounded-xl border py-3.5 text-center text-[14px] font-semibold transition-colors hover:bg-black/[0.03]"
                  style={{ borderColor: `${NAVY}26`, color: NAVY }}
                >
                  Talk to Sales
                </a>
              </div>

              <p className="mt-4 flex items-start gap-1.5 text-[11.5px] leading-relaxed" style={{ color: `${NAVY}73` }}>
                <PinIcon />
                A ZoikoMeds representative will review your request and route it to the right
                security, sales, or implementation team. Not medical advice, dispensing, or a
                pharmacy service — don&apos;t include PHI, prescriptions, or exact stock.
              </p>

              <style jsx>{`
                .input {
                  width: 100%;
                  border-radius: 0.65rem;
                  border: 1px solid rgba(15, 31, 78, 0.12);
                  background: #fff;
                  padding: 0.6rem 0.85rem;
                  font-size: 13.5px;
                  color: #0f1f4e;
                }
                .input:focus {
                  outline: none;
                  border-color: ${ACCENT};
                  box-shadow: 0 0 0 3px rgba(19, 165, 148, 0.12);
                }
                .input::placeholder {
                  color: rgba(15, 31, 78, 0.35);
                }
              `}</style>
            </form>
          </Reveal>

          {/* Foundations card */}
          <Reveal index={4} active={mounted}>
            <div className="rounded-2xl p-6 sm:p-7" style={{ backgroundColor: PANEL }}>
              <p className="mb-5 flex items-center gap-2 text-[13.5px] font-semibold text-white">
                <PinIcon light />
                Security foundations
              </p>

              <div className="flex flex-col">
                {FOUNDATIONS.map((f, i) => (
                  <div
                    key={f.title}
                    className="flex gap-2.5 py-4"
                    style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <CheckIcon />
                    <div>
                      <p className="text-[13px] font-semibold text-white">{f.title}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-white/45">{f.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
function inputStyle(hasError: boolean): React.CSSProperties {
  return hasError ? { borderColor: ERROR } : {};
}

/* ------------------------------------------------------------------ */
/*  Field                                                              */
/* ------------------------------------------------------------------ */
function Field({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-[12.5px] font-semibold" style={{ color: NAVY }}>
        {label}
        {required && <span className="text-red-500">*</span>}
        {hint && <span className="font-normal" style={{ color: `${NAVY}66` }}>({hint})</span>}
      </span>
      {children}
      {error && <p className="mt-1.5 text-[12px]" style={{ color: ERROR }}>{error}</p>}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
      <circle cx="10" cy="10" r="10" fill={ACCENT} fillOpacity="0.16" />
      <path d="M6 10.2L8.6 12.8L14 7" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon({ light }: { light?: boolean }) {
  const color = light ? "#fff" : "currentColor";
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
      <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.4" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `securityBriefingFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes securityBriefingFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}