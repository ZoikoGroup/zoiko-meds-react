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
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);
      setStatus("idle");

      try {
        const res = await fetch("/api/briefing-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            briefingType: `AI Intelligence Briefing (${form.organizationType || "AI Insights"})`,
            fullName: form.fullName,
            workEmail: form.workEmail,
            organization: form.organization,
            jobTitle: form.role,
            phone: "",
            note: `Role: ${form.role}\nRegion: ${form.region}\nUse Cases: ${form.useCases.join(", ")}\nConcern: ${form.concern}`,
          }),
        });

        let data: any = {};
        try {
          data = await res.json();
        } catch {}

        if (res.ok && (data.success || res.status === 200)) {
          setStatus("success");
          setSubmitted(true);
          setForm(INITIAL_STATE);
          setErrors({});
        } else {
          setStatus("error");
          setErrorMessage(data.message || "Failed to submit request.");
        }
      } catch {
        setStatus("error");
        setErrorMessage("Network error occurred.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const inputBase =
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-[#0F1F4E] placeholder:text-[#8A93A6] focus:outline-none focus:ring-2 focus:ring-[#0FAA87]/30";

  return (
    <section id="ai-intelligence-briefing" ref={sectionRef} className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <FormFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            10 &nbsp;&middot;&nbsp; REQUEST AN AI INTELLIGENCE BRIEFING
          </span>
        </FormFadeUp>

        <FormFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 max-w-xl text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            Explore ZoikoSignal&trade; AI
          </h2>
        </FormFadeUp>

        <FormFadeUp show={isVisible} delay={140}>
          <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-[#6B7385]">
            Schedule a briefing with our team to discuss how AI models can help monitor supply chain risks and medicine availability.
          </p>
        </FormFadeUp>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Form card */}
          <FormFadeUp show={isVisible} delay={200}>
            <div className="min-w-0 rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm sm:p-8">
              <form onSubmit={handleSubmit} noValidate className="min-w-0">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="min-w-0">
                      <label className="mb-1.5 block text-sm font-semibold text-[#0F1F4E]">
                        Full name <span className="text-[#E05252]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        className={`${inputBase} min-w-0 ${
                          errors.fullName ? "border-[#E05252]" : "border-[#E7EAF1]"
                        }`}
                        placeholder=""
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-[#E05252]">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="min-w-0">
                      <label className="mb-1.5 block text-sm font-semibold text-[#0F1F4E]">
                        Work email <span className="text-[#E05252]">*</span>
                      </label>
                      <input
                        type="email"
                        value={form.workEmail}
                        onChange={(e) => updateField("workEmail", e.target.value)}
                        className={`${inputBase} min-w-0 ${
                          errors.workEmail ? "border-[#E05252]" : "border-[#E7EAF1]"
                        }`}
                        placeholder="name@organization.org"
                      />
                      {errors.workEmail && (
                        <p className="mt-1 text-xs text-[#E05252]">{errors.workEmail}</p>
                      )}
                    </div>

                    <div className="min-w-0">
                      <label className="mb-1.5 block text-sm font-semibold text-[#0F1F4E]">
                        Organization <span className="text-[#E05252]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.organization}
                        onChange={(e) => updateField("organization", e.target.value)}
                        className={`${inputBase} min-w-0 ${
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

                    <div className="min-w-0">
                      <label className="mb-1.5 block text-sm font-semibold text-[#0F1F4E]">
                        Role <span className="text-[#E05252]">*</span>
                      </label>
                      <select
                        value={form.role}
                        onChange={(e) => updateField("role", e.target.value)}
                        className={`${inputBase} min-w-0 appearance-none ${
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

                    <div className="min-w-0">
                      <label className="mb-1.5 block text-sm font-semibold text-[#0F1F4E]">
                        Organization type <span className="text-[#E05252]">*</span>
                      </label>
                      <select
                        value={form.organizationType}
                        onChange={(e) =>
                          updateField("organizationType", e.target.value)
                        }
                        className={`${inputBase} min-w-0 appearance-none ${
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

                    <div className="min-w-0">
                      <label className="mb-1.5 block text-sm font-semibold text-[#0F1F4E]">
                        Region of interest <span className="text-[#E05252]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.region}
                        onChange={(e) => updateField("region", e.target.value)}
                        className={`${inputBase} min-w-0 ${
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
                    disabled={submitting}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0FAA87] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0FAA87]/90 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
                          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        <span>Submitting...</span>
                      </>
                    ) : (
                      "Request an AI Intelligence Briefing"
                    )}
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

                  {status === "success" && (
                    <div ref={successRef} className="mt-4 rounded-xl border border-[#9FE3D3] bg-[#EAFAF4] p-4 text-center text-[13.5px] text-[#00786F]">
                      <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                        <svg className="h-6 w-6 text-[#13A594]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <p className="font-bold text-[#00786F]">Request Submitted Successfully</p>
                          <p className="mt-0.5 text-[12.5px] leading-relaxed text-[#056059]">
                            Thank you! Our team will review your request and contact you soon.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="mt-4 rounded-xl border border-[#F87171]/40 bg-[#FEF2F2] p-4 text-center text-[13px] text-[#C5453F]">
                      <p className="font-medium">{errorMessage || "Something went wrong. Please try again."}</p>
                    </div>
                  )}
                </form>
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