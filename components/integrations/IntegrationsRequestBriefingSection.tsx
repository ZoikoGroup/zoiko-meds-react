"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";
const NAVY = "#0F1F4E";
const BG = "#F3F4F8";

const ORGANIZATION_TYPES = [
  "Healthcare Provider",
  "Pharmacy",
  "Wholesale / Distributor",
  "Analytics / BI",
  "Identity / Access Management",
  "CRM / Sales Ops",
  "Compliance / Audit",
  "Technology Partner",
  "Other",
];

const INTEGRATION_OBJECTIVES = [
  "Connect pharmacy availability signals",
  "Access regional shortage intelligence",
  "Enable analytics and reporting",
  "Integrate identity and access management",
  "Support CRM and operations workflows",
  "Custom integration requirement",
];

const SYSTEMS_TO_INTEGRATE = [
  { id: "pharmacy-system", label: "Pharmacy System" },
  { id: "crm-operations", label: "CRM / Operations" },
  { id: "identity-sso", label: "Identity / SSO" },
  { id: "reporting", label: "Reporting" },
  { id: "wholesale-distribution", label: "Wholesale / Distribution" },
  { id: "analytics-bi", label: "Analytics / BI" },
  { id: "compliance-audit", label: "Compliance / Audit" },
  { id: "api-custom", label: "API / Custom Integration" },
];

const TIMELINES = [
  "Immediately",
  "Within 1 month",
  "Within 3 months",
  "Within 6 months",
  "Planning phase",
];

const INTEGRATION_FOUNDATIONS = [
  {
    label: "Governed pathways",
    description: "Role-based, scoped permissions, and data minimization.",
  },
  {
    label: "No exact inventory",
    description: "Confidence-based access, not unauthorized, exact public inventory.",
  },
  {
    label: "Sandboxes first",
    description: "Test workflows before production go-live.",
  },
  {
    label: "Auditable",
    description: "Logs, timestamps, and report history across exchanges.",
  },
];

export default function IntegrationsRequestBriefingSection() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    phoneNumber: "",
    organization: "",
    jobTitle: "",
    organizationType: "",
    country: "",
    integrationObjective: "",
    systemsToIntegrate: [] as string[],
    estimatedTimeline: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
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
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSystemToggle = (systemId: string) => {
    setFormData((prev) => ({
      ...prev,
      systemsToIntegrate: prev.systemsToIntegrate.includes(systemId)
        ? prev.systemsToIntegrate.filter((id) => id !== systemId)
        : [...prev.systemsToIntegrate, systemId],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.workEmail.trim()) newErrors.workEmail = "Work email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
      newErrors.workEmail = "Valid email required";
    }
    if (!formData.organization.trim()) newErrors.organization = "Organization is required";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!formData.organizationType) newErrors.organizationType = "Organization type is required";
    if (!formData.country.trim()) newErrors.country = "Country/region is required";
    if (!formData.integrationObjective) newErrors.integrationObjective = "Integration objective is required";
    if (formData.systemsToIntegrate.length === 0) {
      newErrors.systemsToIntegrate = "Select at least one system";
    }
    if (!formData.consent) newErrors.consent = "Consent is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitting(true);
    // Wire up actual submission handler here
    setTimeout(() => setSubmitting(false), 1200);
  };

  return (
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>11</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Request an Integration Briefing
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            Tell us which systems{" "}
            <span style={{ color: ACCENT }}>you want to connect.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed" style={{ color: `${NAVY}99` }}>
            We route your request by organization type, system type, region, and integration objective so the right team can review systems, goals, security requirements, and data boundaries.
          </p>
        </Reveal>

        {/* ── Form + sidebar ── */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-[1fr_320px] lg:gap-10">

          {/* ── Form ── */}
          <Reveal index={3} active={mounted}>
            <form onSubmit={handleSubmit} className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8">

              {/* Row 1: Full name + Work email */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                  label="Full name"
                  required
                  error={errors.fullName}
                >
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="integration-input"
                  />
                </Field>

                <Field
                  label="Work email"
                  required
                  error={errors.workEmail}
                >
                  <input
                    type="email"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    placeholder="name@organization.org"
                    required
                    className="integration-input"
                  />
                </Field>
              </div>

              {/* Row 2: Phone + Organization */}
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Phone number" optional>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="integration-input"
                  />
                </Field>

                <Field label="Organization" required error={errors.organization}>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    required
                    className="integration-input"
                  />
                </Field>
              </div>

              {/* Row 3: Job title + Organization type */}
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Job title" required error={errors.jobTitle}>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    required
                    className="integration-input"
                  />
                </Field>

                <Field
                  label="Organization type"
                  required
                  error={errors.organizationType}
                >
                  <div className="relative">
                    <select
                      name="organizationType"
                      value={formData.organizationType}
                      onChange={handleInputChange}
                      required
                      defaultValue=""
                      className="integration-input appearance-none pr-9"
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      {ORGANIZATION_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronIcon />
                  </div>
                </Field>
              </div>

              {/* Row 4: Country + Integration objective */}
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                  label="Country / region"
                  required
                  error={errors.country}
                >
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="e.g. US, UK, EU, national"
                    required
                    className="integration-input"
                  />
                </Field>

                <Field
                  label="Integration objective"
                  required
                  error={errors.integrationObjective}
                >
                  <div className="relative">
                    <select
                      name="integrationObjective"
                      value={formData.integrationObjective}
                      onChange={handleInputChange}
                      required
                      defaultValue=""
                      className="integration-input appearance-none pr-9"
                    >
                      <option value="" disabled>
                        Select objective
                      </option>
                      {INTEGRATION_OBJECTIVES.map((obj) => (
                        <option key={obj} value={obj}>
                          {obj}
                        </option>
                      ))}
                    </select>
                    <ChevronIcon />
                  </div>
                </Field>
              </div>

              {/* Systems to integrate */}
              <div className="mt-5">
                <p className="mb-3 text-[12.5px] font-semibold" style={{ color: NAVY }}>
                  Systems to integrate <span style={{ color: "#E0555B" }}>*</span>
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {SYSTEMS_TO_INTEGRATE.map((system) => (
                    <label key={system.id} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.systemsToIntegrate.includes(system.id)}
                        onChange={() => handleSystemToggle(system.id)}
                        className="h-4 w-4 rounded border-[#D7DCE6] accent-[#13A594]"
                      />
                      <span className="text-[13px]" style={{ color: NAVY }}>
                        {system.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.systemsToIntegrate && (
                  <p className="mt-1 text-[12px]" style={{ color: "#E0555B" }}>
                    {errors.systemsToIntegrate}
                  </p>
                )}
              </div>

              {/* Row 5: Timeline + Message */}
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Estimated timeline" optional>
                  <div className="relative">
                    <select
                      name="estimatedTimeline"
                      value={formData.estimatedTimeline}
                      onChange={handleInputChange}
                      defaultValue=""
                      className="integration-input appearance-none pr-9"
                    >
                      <option value="">Select timeline</option>
                      {TIMELINES.map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                    <ChevronIcon />
                  </div>
                </Field>

                <Field label="Message" optional>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Brief context"
                    rows={3}
                    className="integration-input resize-none"
                  />
                </Field>
              </div>

              {/* Consent */}
              <label className="mt-6 flex cursor-pointer items-start gap-2.5 text-[13px] leading-relaxed" style={{ color: `${NAVY}80` }}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#D7DCE6] accent-[#13A594]"
                />
                <span>
                  I consent to be contacted about ZoikoMeds integrations and acknowledge the{" "}
                  <a href="/privacy" className="font-semibold hover:underline" style={{ color: ACCENT }}>
                    privacy notice.
                  </a>{" "}
                  <span style={{ color: "#E0555B" }}>*</span>
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-[12px]" style={{ color: "#E0555B" }}>
                  {errors.consent}
                </p>
              )}

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg px-6 py-3 text-[14px] font-bold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(19,165,148,0.3)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  style={{ backgroundColor: ACCENT }}
                >
                  {submitting ? "Submitting…" : "Request an Integration Briefing"}
                </button>
                <button
                  type="button"
                  className="rounded-lg border px-6 py-3 text-[14px] font-bold transition-all duration-250 ease-out hover:-translate-y-0.5 hover:border-[#13A594] hover:text-[#13A594]"
                  style={{ borderColor: "#E7EAF1", color: NAVY }}
                >
                  Talk to Sales
                </button>
              </div>

              {/* Footnote */}
              <p className="mt-4 flex items-start gap-1.5 text-[12px] leading-relaxed" style={{ color: "#8A93A6" }}>
                <InfoIcon />
                <span>
                  A ZoikoMeds representative will review your systems, goals, and security requirements. Not
                  medical advice, financing, or a pharmacy service — don&apos;t include PHI, prescriptions, secrets, or
                  exact stock.
                </span>
              </p>
            </form>
          </Reveal>

          {/* ── Right sidebar: Integration foundations ── */}
          <Reveal index={4} active={mounted}>
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#0B1530" }}
            >
              <h3 className="mb-4 flex items-center gap-2 text-[14px] font-bold text-white">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(19,165,148,0.18)", color: ACCENT }}
                >
                  <CheckIcon />
                </span>
                Integration foundations
              </h3>

              <ul className="space-y-3.5">
                {INTEGRATION_FOUNDATIONS.map((item) => (
                  <li key={item.label} className="flex gap-2.5">
                    <span className="mt-0.5 shrink-0" style={{ color: ACCENT }}>
                      <CheckIcon small />
                    </span>
                    <div>
                      <p className="text-[12.5px] font-bold text-white">{item.label}</p>
                      <p className="mt-0.5 text-[11.5px] leading-relaxed text-[#AEB6C9]">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

        </div>

      </div>

      <style>{`
        .integration-input {
          width: 100%;
          border-radius: 0.65rem;
          border: 1px solid #E7EAF1;
          background-color: #FBFCFE;
          padding: 0.7rem 0.85rem;
          font-size: 13.5px;
          color: ${NAVY};
          outline: none;
          transition: border-color 180ms ease-out, box-shadow 180ms ease-out, background-color 180ms ease-out;
        }
        .integration-input::placeholder {
          color: #A6ADBD;
        }
        .integration-input:hover {
          border-color: #D7DCE6;
        }
        .integration-input:focus {
          border-color: ${ACCENT};
          background-color: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(19, 165, 148, 0.12);
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Field                                                              */
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
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-[12.5px] font-semibold" style={{ color: "#0F1F4E" }}>
        {label}
        {required && <span style={{ color: "#E0555B" }}>*</span>}
        {optional && <span className="font-normal text-[#A6ADBD]">(optional)</span>}
      </span>
      {children}
      {error && (
        <p className="mt-1 text-[12px]" style={{ color: "#E0555B" }}>
          {error}
        </p>
      )}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8A93A6]"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ small }: { small?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={small ? "h-3 w-3" : "h-4 w-4"}
    >
      <path
        d="M3 8.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8A93A6]"
    >
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7.2v4M8 5v.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({
  children,
  index,
  active,
}: {
  children: React.ReactNode;
  index: number;
  active: boolean;
}) {
  return (
    <div
      style={{
        opacity: active ? undefined : 0,
        animation: active ? `integrationsRequestBriefingFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes integrationsRequestBriefingFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}