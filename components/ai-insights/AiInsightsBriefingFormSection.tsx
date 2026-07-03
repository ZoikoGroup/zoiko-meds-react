"use client";

import { useEffect, useRef, useState } from "react";
import { Circle, Check } from "lucide-react";

type FormState = {
  fullName: string;
  workEmail: string;
  organization: string;
  role: string;
  organizationType: string;
  region: string;
  useCases: string[];
  concern: string;
  consent: boolean;
};

const INITIAL_STATE: FormState = {
  fullName: "",
  workEmail: "",
  organization: "",
  role: "",
  organizationType: "",
  region: "",
  useCases: [],
  concern: "",
  consent: false,
};

const ROLE_OPTIONS = [
  "Executive / Leadership",
  "Operations",
  "Pharmacy network",
  "Wholesaler / Distributor",
  "Compliance / Risk",
  "Public health",
  "Other",
];

const ORG_TYPE_OPTIONS = [
  "Health system",
  "Pharmacy network",
  "Wholesaler / Distributor",
  "Government / Public health",
  "Payer",
  "Other",
];

const USE_CASE_OPTIONS = [
  "Predictive shortage signals",
  "Access risk scoring",
  "Confidence movement",
  "Network intelligence",
  "Compliance reporting",
  "Partnership",
];

type Errors = Partial<Record<keyof FormState, string>>;

const GOVERNANCE_POINTS = [
  {
    title: "Explainable",
    description:
      "Reason codes, confidence tiers, source categories, and limitations on every insight.",
  },
  {
    title: "Human review",
    description:
      "Sensitive signals route to authorized review before escalation.",
  },
  {
    title: "Not clinical AI",
    description:
      "No diagnosis, treatment, prescribing, or substitution guidance.",
  },
  {
    title: "Auditable",
    description:
      "Evidence trail with timestamp, model version, reviewer, and export history.",
  },
];

export default function AiInsightsBriefingFormSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Errors>({});
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

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleUseCase = (option: string) => {
    setForm((prev) => {
      const exists = prev.useCases.includes(option);
      const useCases = exists
        ? prev.useCases.filter((item) => item !== option)
        : [...prev.useCases, option];
      return { ...prev, useCases };
    });
    setErrors((prev) => ({ ...prev, useCases: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};

    if (!form.fullName.trim()) next.fullName = "Full name is required.";

    if (!form.workEmail.trim()) {
      next.workEmail = "Work email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) {
      next.workEmail = "Enter a valid email address.";
    }

    if (!form.organization.trim())
      next.organization = "Organization is required.";

    if (!form.role) next.role = "Please select a role.";

    if (!form.organizationType)
      next.organizationType = "Please select an organization type.";

    if (!form.region.trim())
      next.region = "Region of interest is required.";

    if (form.useCases.length === 0)
      next.useCases = "Select at least one AI use case.";

    if (!form.consent)
      next.consent = "Consent is required to submit this request.";

    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Wire this up to your backend / CRM endpoint.
      console.log("AI Intelligence Briefing request submitted:", form);
      setSubmitted(true);
    }
  };

  const inputBase =
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#0F1F4E] placeholder:text-[#8A93A6] focus:outline-none focus:ring-2 focus:ring-[#0FAA87]/30";

  return (
    <section ref={sectionRef} className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <FormFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            10 &nbsp;&middot;&nbsp; REQUEST AN AI INTELLIGENCE BRIEFING
          </span>
        </FormFadeUp>

        <FormFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 max-w-xl text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Bring governed AI intelligence into{" "}
            <span className="text-[#0FAA87]">
              medicine availability planning.
            </span>
          </h2>
        </FormFadeUp>

        <FormFadeUp show={isVisible} delay={140}>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#4B5567]">
            See how predictive shortage signals, access risk scoring,
            confidence movement, and responsible AI governance can support
            your organization.
          </p>
        </FormFadeUp>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Form card */}
          <FormFadeUp show={isVisible} delay={200}>
            <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm sm:p-8 lg:col-span-2">
              {submitted ? (
                <div className="flex flex-col items-start gap-2 py-10">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0FAA87]/10">
                    <Check className="h-5 w-5 text-[#0FAA87]" strokeWidth={2.5} />
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-[#0F1F4E]">
                    Request received.
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4B5567]">
                    Thanks — a member of the ZoikoMeds team will follow up
                    about your AI Intelligence Briefing shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-[#0F1F4E]">
                        Full name <span className="text-[#E05252]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        className={`${inputBase} ${
                          errors.fullName ? "border-[#E05252]" : "border-[#E7EAF1]"
                        }`}
                        placeholder=""
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-[#E05252]">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-[#0F1F4E]">
                        Work email <span className="text-[#E05252]">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.workEmail}
                        onChange={(e) => updateField("workEmail", e.target.value)}
                        className={`${inputBase} ${
                          errors.workEmail ? "border-[#E05252]" : "border-[#E7EAF1]"
                        }`}
                        placeholder="name@organization.org"
                      />
                      {errors.workEmail && (
                        <p className="mt-1 text-xs text-[#E05252]">{errors.workEmail}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-[#0F1F4E]">
                        Organization <span className="text-[#E05252]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.organization}
                        onChange={(e) => updateField("organization", e.target.value)}
                        className={`${inputBase} ${
                          errors.organization ? "border-[#E05252]" : "border-[#E7EAF1]"
                        }`}
                        placeholder=""
                      />
                      {errors.organization && (
                        <p className="mt-1 text-xs text-[#E05252]">
                          {errors.organization}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-[#0F1F4E]">
                        Role <span className="text-[#E05252]">*</span>
                      </label>
                      <select
                        value={form.role}
                        onChange={(e) => updateField("role", e.target.value)}
                        className={`${inputBase} appearance-none ${
                          errors.role ? "border-[#E05252]" : "border-[#E7EAF1]"
                        } ${form.role ? "text-[#0F1F4E]" : "text-[#8A93A6]"}`}
                      >
                        <option value="" disabled>
                          Select role
                        </option>
                        {ROLE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.role && (
                        <p className="mt-1 text-xs text-[#E05252]">{errors.role}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-[#0F1F4E]">
                        Organization type <span className="text-[#E05252]">*</span>
                      </label>
                      <select
                        value={form.organizationType}
                        onChange={(e) =>
                          updateField("organizationType", e.target.value)
                        }
                        className={`${inputBase} appearance-none ${
                          errors.organizationType
                            ? "border-[#E05252]"
                            : "border-[#E7EAF1]"
                        } ${
                          form.organizationType ? "text-[#0F1F4E]" : "text-[#8A93A6]"
                        }`}
                      >
                        <option value="" disabled>
                          Select type
                        </option>
                        {ORG_TYPE_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.organizationType && (
                        <p className="mt-1 text-xs text-[#E05252]">
                          {errors.organizationType}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-semibold text-[#0F1F4E]">
                        Region of interest <span className="text-[#E05252]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.region}
                        onChange={(e) => updateField("region", e.target.value)}
                        className={`${inputBase} ${
                          errors.region ? "border-[#E05252]" : "border-[#E7EAF1]"
                        }`}
                        placeholder="e.g. US, UK, EU, regional"
                      />
                      {errors.region && (
                        <p className="mt-1 text-xs text-[#E05252]">{errors.region}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className="mb-2 block text-sm font-semibold text-[#0F1F4E]">
                      AI use case <span className="text-[#E05252]">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {USE_CASE_OPTIONS.map((option) => {
                        const checked = form.useCases.includes(option);
                        return (
                          <label
                            key={option}
                            className="flex cursor-pointer items-center gap-2.5 text-sm text-[#0F1F4E]"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleUseCase(option)}
                              className="h-4 w-4 rounded border-[#E7EAF1] text-[#0FAA87] focus:ring-[#0FAA87]/30"
                            />
                            {option}
                          </label>
                        );
                      })}
                    </div>
                    {errors.useCases && (
                      <p className="mt-1.5 text-xs text-[#E05252]">
                        {errors.useCases}
                      </p>
                    )}
                  </div>

                  <div className="mt-5">
                    <label className="mb-1.5 block text-sm font-semibold text-[#0F1F4E]">
                      Data / compliance concern{" "}
                      <span className="text-[#8A93A6]">(optional)</span>
                    </label>
                    <textarea
                      value={form.concern}
                      onChange={(e) => updateField("concern", e.target.value)}
                      rows={3}
                      className={`${inputBase} resize-none`}
                      placeholder="Governance, data maturity, or compliance context (no PHI, prescriptions, or exact stock)."
                    />
                  </div>

                  <div className="mt-6">
                    <label className="flex items-start gap-2.5 text-sm text-[#4B5567]">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => updateField("consent", e.target.checked)}
                        className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-[#E7EAF1] text-[#0FAA87] focus:ring-[#0FAA87]/30"
                      />
                      <span>
                        I consent to be contacted about this request and
                        acknowledge the{" "}
                        <a
                          href="#"
                          className="font-semibold text-[#0FAA87] hover:underline"
                        >
                          privacy notice
                        </a>
                        . <span className="text-[#E05252]">*</span>
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1.5 text-xs text-[#E05252]">
                        {errors.consent}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full rounded-xl bg-[#0FAA87] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0FAA87]/90 focus:outline-none"
                  >
                    Request an AI Intelligence Briefing
                  </button>

                  <div className="mt-4 flex items-start gap-2">
                    <Circle
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#0FAA87]"
                      strokeWidth={2}
                    />
                    <p className="text-xs leading-relaxed text-[#8A93A6]">
                      Operational intelligence only — not medical advice,
                      diagnosis, or clinical decision support. Don&apos;t
                      include PHI, prescriptions, patient identifiers, or
                      exact stock.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </FormFadeUp>

          {/* AI governance card */}
          <FormFadeUp show={isVisible} delay={260}>
            <div className="rounded-2xl border border-white/10 bg-[#0B142E] p-6">
              <div className="flex items-center gap-2">
                <Circle className="h-4 w-4 text-[#1BC49B]" strokeWidth={2} />
                <h3 className="text-sm font-bold text-white">AI governance</h3>
              </div>

              <div className="mt-4 divide-y divide-white/10">
                {GOVERNANCE_POINTS.map((point) => (
                  <div key={point.title} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#1BC49B]"
                        strokeWidth={2.5}
                      />
                      <div>
                        <p className="text-sm font-bold text-white">
                          {point.title}
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#8A93A6]">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FormFadeUp>
        </div>
      </div>
    </section>
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