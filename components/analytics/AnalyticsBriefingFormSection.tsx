"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Info } from "lucide-react";

type FormState = {
  fullName: string;
  workEmail: string;
  organization: string;
  role: string;
  orgType: string;
  region: string;
  needs: string[];
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const ANALYTICS_NEEDS = [
  "Availability trends",
  "Shortage analytics",
  "Pharmacy coverage",
  "Regional access",
  "Reports",
  "Enterprise dashboard",
  "API",
];

const ASSURANCES = [
  {
    title: "Confidence-based",
    description:
      "Signals and tiers, never exact inventory quantities to unauthorized users.",
  },
  {
    title: "Role-based access",
    description: "Analytics depth follows organization, role, and authorization.",
  },
  {
    title: "No clinical advice",
    description: "No diagnosis, treatment, prescribing, or substitution guidance.",
  },
  {
    title: "Auditable exports",
    description: "Governance-labeled with filters, timestamps, and permitted-use context.",
  },
];

const INITIAL_FORM: FormState = {
  fullName: "",
  workEmail: "",
  organization: "",
  role: "",
  orgType: "",
  region: "",
  needs: [],
  message: "",
  consent: false,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AnalyticsBriefingFormSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function validate(current: FormState): FormErrors {
    const next: FormErrors = {};

    if (!current.fullName.trim()) {
      next.fullName = "Enter your full name.";
    }

    if (!current.workEmail.trim()) {
      next.workEmail = "Enter your work email.";
    } else if (!EMAIL_PATTERN.test(current.workEmail.trim())) {
      next.workEmail = "Enter a valid email address.";
    }

    if (!current.organization.trim()) {
      next.organization = "Enter your organization.";
    }

    if (!current.role) {
      next.role = "Select a role.";
    }

    if (!current.orgType) {
      next.orgType = "Select an organization type.";
    }

    if (!current.region.trim()) {
      next.region = "Enter a region of interest.";
    }

    if (current.needs.length === 0) {
      next.needs = "Select at least one analytics need.";
    }

    if (!current.consent) {
      next.consent = "Consent is required to submit this request.";
    }

    return next;
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleNeed(need: string) {
    setForm((prev) => {
      const exists = prev.needs.includes(need);
      const nextNeeds = exists
        ? prev.needs.filter((n) => n !== need)
        : [...prev.needs, need];
      return { ...prev, needs: nextNeeds };
    });
    setErrors((prev) => ({ ...prev, needs: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      try {
        const res = await fetch("/api/briefing-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            briefingType: `Analytics & Demand Briefing (${form.orgType || "Analytics"})`,
            fullName: form.fullName,
            workEmail: form.workEmail,
            organization: form.organization,
            jobTitle: form.role,
            note: `Region: ${form.region}\nNeeds: ${form.needs.join(", ")}\nMessage: ${form.message}`,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setSubmitted(true);
        } else {
          setErrors({ message: data.message || "Failed to submit briefing request." });
        }
      } catch {
        setErrors({ message: "Network error occurred while submitting." });
      }
    } else {
      const firstErrorKey = Object.keys(nextErrors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  const inputBase =
    "w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-[#0F1F4E] placeholder:text-[#9AA2B1] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0FAA87]/40";

  function inputClass(hasError?: string) {
    return `${inputBase} ${hasError ? "border-[#D9534F] focus:border-[#D9534F]" : "border-[#D8DEE8] focus:border-[#0FAA87]"}`;
  }

  return (
    <section ref={sectionRef} className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <FormFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            08 &nbsp;&middot;&nbsp; REQUEST A BRIEFING
          </span>
        </FormFadeUp>

        <FormFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            See ZoikoMeds Analytics matched to{" "}
            <span className="text-[#0FAA87]">your organization.</span>
          </h2>
        </FormFadeUp>

        <FormFadeUp show={isVisible} delay={140}>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#6B7385]">
            We route your request by organization type, geography, role, and analytics need.
          </p>
        </FormFadeUp>

        <FormFadeUp show={isVisible} delay={200}>
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
            {/* FORM CARD */}
            <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-start gap-3 py-8">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E1F5EE]">
                    <Check className="h-5 w-5 text-[#0FAA87]" strokeWidth={2.5} />
                  </span>
                  <h3 className="text-lg font-bold text-[#0F1F4E]">Request received</h3>
                  <p className="text-sm leading-relaxed text-[#4B5567]">
                    Thanks — a member of our team will route your briefing request and follow
                    up at the email address you provided.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(INITIAL_FORM);
                      setSubmitted(false);
                    }}
                    className="mt-2 text-sm font-semibold text-[#0FAA87] hover:underline"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Field
                      id="fullName"
                      label="Full name"
                      required
                      error={errors.fullName}
                    >
                      <input
                        id="field-fullName"
                        type="text"
                        value={form.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        className={inputClass(errors.fullName)}
                        aria-invalid={Boolean(errors.fullName)}
                      />
                    </Field>

                    <Field
                      id="workEmail"
                      label="Work email"
                      required
                      error={errors.workEmail}
                    >
                      <input
                        id="field-workEmail"
                        type="email"
                        placeholder="name@organization.org"
                        value={form.workEmail}
                        onChange={(e) => updateField("workEmail", e.target.value)}
                        className={inputClass(errors.workEmail)}
                        aria-invalid={Boolean(errors.workEmail)}
                      />
                    </Field>

                    <Field
                      id="organization"
                      label="Organization"
                      required
                      error={errors.organization}
                    >
                      <input
                        id="field-organization"
                        type="text"
                        value={form.organization}
                        onChange={(e) => updateField("organization", e.target.value)}
                        className={inputClass(errors.organization)}
                        aria-invalid={Boolean(errors.organization)}
                      />
                    </Field>

                    <Field id="role" label="Role" required error={errors.role}>
                      <select
                        id="field-role"
                        value={form.role}
                        onChange={(e) => updateField("role", e.target.value)}
                        className={`${inputClass(errors.role)} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234B5567%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-9`}
                        aria-invalid={Boolean(errors.role)}
                      >
                        <option value="">Select role</option>
                        <option value="pharmacy">Pharmacy network</option>
                        <option value="healthcare">Healthcare organization</option>
                        <option value="distributor">Wholesaler / distributor</option>
                        <option value="public-health">Public-health stakeholder</option>
                        <option value="enterprise">Enterprise partner</option>
                        <option value="other">Other</option>
                      </select>
                    </Field>

                    <Field
                      id="orgType"
                      label="Organization type"
                      required
                      error={errors.orgType}
                    >
                      <select
                        id="field-orgType"
                        value={form.orgType}
                        onChange={(e) => updateField("orgType", e.target.value)}
                        className={`${inputClass(errors.orgType)} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234B5567%22 stroke-width=%222%22><path d=%22M6 9l6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-9`}
                        aria-invalid={Boolean(errors.orgType)}
                      >
                        <option value="">Select type</option>
                        <option value="independent">Independent pharmacy</option>
                        <option value="chain">Pharmacy chain</option>
                        <option value="hospital">Hospital / health system</option>
                        <option value="distributor">Distributor / wholesaler</option>
                        <option value="government">Government / public health</option>
                        <option value="other">Other</option>
                      </select>
                    </Field>

                    <Field
                      id="region"
                      label="Region of interest"
                      required
                      error={errors.region}
                    >
                      <input
                        id="field-region"
                        type="text"
                        placeholder="e.g. US, UK, EU, regional"
                        value={form.region}
                        onChange={(e) => updateField("region", e.target.value)}
                        className={inputClass(errors.region)}
                        aria-invalid={Boolean(errors.region)}
                      />
                    </Field>
                  </div>

                  {/* Analytics need checkboxes */}
                  <fieldset className="mt-5">
                    <legend className="mb-2 text-sm font-semibold text-[#0F1F4E]">
                      Analytics need <span className="text-[#D9534F]">*</span>
                    </legend>
                    <div
                      id="field-needs"
                      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                    >
                      {ANALYTICS_NEEDS.map((need) => (
                        <label
                          key={need}
                          className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-[#D8DEE8] bg-[#FAFBFD] px-4 py-2.5 text-sm text-[#3A4254] transition-colors duration-200 hover:border-[#0FAA87]/50"
                        >
                          <input
                            type="checkbox"
                            checked={form.needs.includes(need)}
                            onChange={() => toggleNeed(need)}
                            className="h-4 w-4 rounded border-[#D8DEE8] text-[#0FAA87] focus:ring-[#0FAA87]/40"
                          />
                          {need}
                        </label>
                      ))}
                    </div>
                    {errors.needs && (
                      <p className="mt-2 text-xs font-medium text-[#D9534F]">{errors.needs}</p>
                    )}
                  </fieldset>

                  {/* Message */}
                  <div className="mt-5">
                    <label htmlFor="field-message" className="mb-2 block text-sm font-semibold text-[#0F1F4E]">
                      Brief message <span className="font-normal text-[#9AA2B1]">(optional)</span>
                    </label>
                    <textarea
                      id="field-message"
                      rows={3}
                      placeholder="Context on your analytics goals (no PHI, prescriptions, or exact stock)."
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className={`${inputClass()} resize-none`}
                    />
                  </div>

                  {/* Consent */}
                  <div className="mt-5">
                    <label className="flex cursor-pointer items-start gap-2.5 text-sm text-[#3A4254]">
                      <input
                        id="field-consent"
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => updateField("consent", e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded border-[#D8DEE8] text-[#0FAA87] focus:ring-[#0FAA87]/40"
                        aria-invalid={Boolean(errors.consent)}
                      />
                      <span>
                        I consent to be contacted about this request and acknowledge the{" "}
                        <a href="#" className="font-semibold text-[#0FAA87] hover:underline">
                          privacy notice
                        </a>
                        . <span className="text-[#D9534F]">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-2 text-xs font-medium text-[#D9534F]">{errors.consent}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="mt-6 w-full rounded-lg bg-[#0FAA87] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#00A99D] hover:shadow-lg hover:shadow-[#0FAA87]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FAA87] focus-visible:ring-offset-2"
                  >
                    Submit Briefing Request
                  </button>

                  <p className="mt-4 flex items-start gap-1.5 text-xs leading-relaxed text-[#9AA2B1]">
                    <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#0FAA87]" strokeWidth={2} />
                    Operational intelligence only — not medical advice, dispensing, or a
                    pharmacy service. Don&apos;t include PHI, prescriptions, patient identifiers,
                    or exact stock.
                  </p>
                </form>
              )}
            </div>

            {/* SIDEBAR CARD */}
            <div className="h-fit rounded-2xl bg-[#0F1F4E] p-6">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-[#7FD9C0]" strokeWidth={2} />
                <h3 className="text-sm font-bold text-white">Analytics assurances</h3>
              </div>

              <ul className="mt-5 space-y-4">
                {ASSURANCES.map((item, i) => (
                  <li
                    key={item.title}
                    className={`pt-4 first:pt-0 ${
                      i !== 0 ? "border-t border-white/10" : ""
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#0FAA87]" strokeWidth={2.5} />
                      <div>
                        <p className="text-sm font-bold text-white">{item.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-white/60">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FormFadeUp>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Field wrapper with label + error    */
/* ---------------------------------- */
function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={`field-${id}`} className="mb-2 block text-sm font-semibold text-[#0F1F4E]">
        {label} {required && <span className="text-[#D9534F]">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-[#D9534F]">{error}</p>}
    </div>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function FormFadeUp({
  show,
  delay = 0,
  children,
}: {
  show: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}