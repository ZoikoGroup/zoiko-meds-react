"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#0FAA87";
const NAVY = "#0F1F4E";

const AUDIENCE_CARDS = [
  {
    title: "Trust Pack",
    description: "Enterprise buyers, public-sector stakeholders, legal teams, procurement teams, and strategic partners.",
    cta: "Request Trust Pack",
    filled: true,
    icon: (
      <>
        <path d="M4 1.5h6l2.5 2.5V14a.5.5 0 01-.5.5H4a.5.5 0 01-.5-.5v-12a.5.5 0 01.5-.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
        <path d="M5.5 7h5M5.5 9.5h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Security Pack",
    description: "CISOs, security reviewers, IT teams, API buyers, and health-system security teams.",
    cta: "Request Security Pack",
    filled: false,
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Privacy & data governance review",
    description: "Privacy teams, legal teams, health systems, governments, and data buyers.",
    cta: "Request Data Governance Review",
    filled: false,
    icon: (
      <>
        <circle cx="7" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
        <path d="M2.5 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </>
    ),
  },
  {
    title: "Public-sector trust review",
    description: "Government, public health, emergency preparedness, and jurisdiction-level stakeholders.",
    cta: "Request Public Health Briefing",
    filled: false,
    icon: (
      <path d="M8 1.5l5 2v4c0 3.5-2.2 6-5 7-2.8-1-5-3.5-5-7v-4l5-2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
] as const;

const ORG_TYPES = ["Enterprise / Institution", "Pharmacy or Pharmacy Chain", "Healthcare Provider", "Government / Public Health", "Legal, Security, or Procurement", "Other"];
const REQUEST_TYPES = ["Trust Pack", "Security Pack", "Data Governance Review", "Public Health Briefing", "Enterprise Trust Review", "Other"];

interface FormState {
  workEmail: string;
  fullName: string;
  organizationName: string;
  organizationType: string;
  trustRequestType: string;
  note: string;
}

const INITIAL_FORM: FormState = {
  workEmail: "",
  fullName: "",
  organizationName: "",
  organizationType: "",
  trustRequestType: "",
  note: "",
};

export default function TrustCenterAccessSection() {
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

    if (!form.workEmail.trim()) nextErrors.workEmail = "Work email is required.";
    else if (!emailPattern.test(form.workEmail.trim())) nextErrors.workEmail = "Enter a valid email address.";

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!form.organizationName.trim()) nextErrors.organizationName = "Organization name is required.";
    if (!form.organizationType) nextErrors.organizationType = "Select an organization type.";
    if (!form.trustRequestType) nextErrors.trustRequestType = "Select a trust request type.";

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
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: NAVY }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-60 text-white">06</span>
            <span className="opacity-40 text-white">·</span>
            Enterprise Trust Access
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-white sm:text-[2.3rem]">
            Review the governance — through the <span style={{ color: ACCENT }}>right workflow.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-white/50">
            Gated trust materials are provided after verification, role review, or contract scope.
          </p>
        </Reveal>

        {/* ── Audience card grid ── */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {AUDIENCE_CARDS.map((card, i) => (
            <Reveal key={card.title} index={3 + i} active={mounted}>
              <div
                className="flex h-full flex-col rounded-2xl border border-white/10 p-6"
                style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              >
                <div
                  className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(15,170,135,0.15)", color: ACCENT }}
                >
                  <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                    {card.icon}
                  </svg>
                </div>

                <h3 className="text-[14px] font-bold text-white">{card.title}</h3>
                <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-white/50">
                  {card.description}
                </p>

                <a
                  href="#request-trust-pack"
                  className={
                    card.filled
                      ? "mt-4 inline-flex w-fit items-center justify-center rounded-lg px-4 py-2.5 text-[12.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                      : "mt-4 inline-flex w-fit items-center justify-center rounded-lg border border-white/20 px-4 py-2.5 text-[12.5px] font-semibold text-white transition-colors duration-150 hover:border-white/40"
                  }
                  style={card.filled ? { backgroundColor: ACCENT } : undefined}
                >
                  {card.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Request Trust Pack form ── */}
        <Reveal index={7} active={mounted}>
          <div id="trust" className="mt-10 rounded-2xl bg-white p-6 shadow-[0_4px_24px_-10px_rgba(0,0,0,0.35)] sm:p-8">
            <h3 className="text-[16px] font-bold text-[#0F1F4E]">Request Trust Pack</h3>
            <p className="mt-1.5 max-w-xl text-[13px] leading-relaxed text-[#5B6478]">
              We route your request to the right trust, security, privacy, legal, enterprise, or
              public-sector review team.
            </p>

            {status === "success" ? (
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#0FAA87]/25 bg-[#0FAA87]/5 p-4">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-[13.5px] font-semibold text-[#0F1F4E]">Request received.</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#5B6478]">
                    Our trust review team will route this to the right workflow and follow up at
                    the work email you provided.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field
                    label="Work email"
                    required
                    error={errors.workEmail}
                  >
                    <input
                      type="email"
                      value={form.workEmail}
                      onChange={(e) => updateField("workEmail", e.target.value)}
                      placeholder="name@organization.org"
                      className={inputClass(!!errors.workEmail)}
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

                  <Field label="Organization name" required error={errors.organizationName}>
                    <input
                      type="text"
                      value={form.organizationName}
                      onChange={(e) => updateField("organizationName", e.target.value)}
                      placeholder="Organization"
                      className={inputClass(!!errors.organizationName)}
                    />
                  </Field>

                  <Field label="Organization type" required error={errors.organizationType}>
                    <select
                      value={form.organizationType}
                      onChange={(e) => updateField("organizationType", e.target.value)}
                      className={inputClass(!!errors.organizationType)}
                    >
                      <option value="">Select type</option>
                      {ORG_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Trust request type" required error={errors.trustRequestType}>
                  <select
                    value={form.trustRequestType}
                    onChange={(e) => updateField("trustRequestType", e.target.value)}
                    className={inputClass(!!errors.trustRequestType)}
                  >
                    <option value="">Select request</option>
                    {REQUEST_TYPES.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Brief note" optional>
                  <textarea
                    value={form.note}
                    onChange={(e) => updateField("note", e.target.value)}
                    placeholder="Your review, procurement, security, privacy, or public-sector need."
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
                  {status === "submitting" ? "Submitting…" : "Request Trust Pack"}
                </button>

                {status === "error" && (
                  <p className="text-[12.5px] font-medium text-[#E5484D]">
                    Something went wrong. Please try again.
                  </p>
                )}

                <p className="text-[11.5px] leading-relaxed text-[#9AA1B4]">
                  Don&apos;t include PHI, patient identifiers, exact stock, API secrets,
                  passwords, license documents, commercial terms, or audit records in this form.
                </p>
              </form>
            )}
          </div>
        </Reveal>

        {/* ── Bottom CTA panel ── */}
        <Reveal index={8} active={mounted}>
          <div
            className="mt-10 rounded-2xl border border-white/10 px-6 py-14 text-center sm:px-12"
            style={{ backgroundColor: "rgba(255,255,255,0.03)" }}
          >
            <h3 className="mx-auto max-w-xl text-[1.4rem] font-extrabold leading-snug text-white sm:text-[1.6rem]">
              Trust built for medicine <span style={{ color: ACCENT }}>availability infrastructure.</span>
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-[13.5px] leading-relaxed text-white/50">
              Review ZoikoMeds privacy, security, verification, availability confidence,
              controlled medicine, accessibility, and enterprise governance materials.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#request-trust-pack"
                className="inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-[13.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                style={{ backgroundColor: ACCENT }}
              >
                Request Trust Pack
              </a>
              <a
                href="/privacy-center"
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors duration-150 hover:border-white/40"
              >
                View Privacy Center
              </a>
            </div>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `trustAccessFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes trustAccessFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}