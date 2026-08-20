"use client";

import { useEffect, useRef, useState } from "react";
import { internalApi } from "@/lib/config";
import { CheckCircle2 } from "lucide-react";
import {
  validateEmail,
  validatePhone,
  sanitizePhoneInput,
  scrollToFirstError,
} from "@/lib/validation";
import { useRouter } from "next/navigation";

type CapabilityOption =
  | "Availability Intelligence"
  | "Pharmacy Network"
  | "Shortage Signals"
  | "Analytics"
  | "Reports"
  | "Integrations"
  | "Enterprise Deployment"
  | "Partnership";

const CAPABILITY_OPTIONS: CapabilityOption[] = [
  "Availability Intelligence",
  "Pharmacy Network",
  "Shortage Signals",
  "Analytics",
  "Reports",
  "Integrations",
  "Enterprise Deployment",
  "Partnership",
];

const ORG_TYPES = [
  "Pharmacy",
  "Hospital / Health System",
  "Government / Public Health",
  "Payer / Insurer",
  "Distributor",
  "Technology Partner",
  "Other",
];

type WhyItem = {
  title: string;
  description: string;
};

const WHY_ITEMS: WhyItem[] = [
  {
    title: "Capability depth",
    description:
      "Availability, pharmacy, shortage, analytics, reports, and integrations in one platform.",
  },
  {
    title: "Confidence-based",
    description:
      "Signals and tiers, never exact inventory or unauthorized users.",
  },
  {
    title: "Enterprise-ready",
    description:
      "SSO, role-based access, APIs, audit trails, and compliance-ready reporting.",
  },
  {
    title: "Responsible AI",
    description: "Bounded, explainable, non-clinical operational intelligence.",
  },
];

export default function FeaturesBookDemoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [orgType, setOrgType] = useState("");
  const [country, setCountry] = useState("");
  const [capabilities, setCapabilities] = useState<Set<CapabilityOption>>(
    new Set(),
  );
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

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
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function toggleCapability(option: CapabilityOption) {
    setCapabilities((prev) => {
      const next = new Set(prev);
      if (next.has(option)) {
        next.delete(option);
      } else {
        next.add(option);
      }
      if (next.size > 0 && errors.capabilities) {
        setErrors((p) => ({ ...p, capabilities: "" }));
      }
      return next;
    });
  }

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [status]);

  function validateSingleField(name: string, value: string): string {
    if (name === "fullName")
      return !value.trim() ? "Full name is required." : "";
    if (name === "workEmail") {
      const res = validateEmail(value);
      return res.isValid
        ? ""
        : res.error || "Please enter a valid email address.";
    }
    if (name === "phone") {
      const res = validatePhone(value, false);
      return res.isValid
        ? ""
        : res.error || "Please enter a valid phone number.";
    }
    if (name === "organization")
      return !value.trim() ? "Organization is required." : "";
    if (name === "jobTitle")
      return !value.trim() ? "Job title is required." : "";
    if (name === "orgType")
      return !value.trim() ? "Please select an organization type." : "";
    if (name === "country")
      return !value.trim() ? "Country / region is required." : "";
    return "";
  }

  function validateAllFields(): Record<string, string> {
    const errs: Record<string, string> = {};
    const fnErr = validateSingleField("fullName", fullName);
    if (fnErr) errs.fullName = fnErr;

    const emailErr = validateSingleField("workEmail", workEmail);
    if (emailErr) errs.workEmail = emailErr;

    const phoneErr = validateSingleField("phone", phone);
    if (phoneErr) errs.phone = phoneErr;

    const orgErr = validateSingleField("organization", organization);
    if (orgErr) errs.organization = orgErr;

    const jtErr = validateSingleField("jobTitle", jobTitle);
    if (jtErr) errs.jobTitle = jtErr;

    const otErr = validateSingleField("orgType", orgType);
    if (otErr) errs.orgType = otErr;

    const cErr = validateSingleField("country", country);
    if (cErr) errs.country = cErr;

    if (capabilities.size === 0) {
      errs.capabilities = "Please select at least one capability of interest.";
    }

    if (!consent) {
      errs.consent = "Consent is required to proceed.";
    }

    return errs;
  }

  const handleBlur = (name: string, value: string) => {
    const err = validateSingleField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handlePhoneChange = (val: string) => {
    const sanitized = sanitizePhoneInput(val);
    setPhone(sanitized);
    if (errors.phone) {
      const err = validateSingleField("phone", sanitized);
      setErrors((prev) => ({ ...prev, phone: err }));
    }
  };

  const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const sanitized = sanitizePhoneInput(pasted);
    setPhone(sanitized);
    if (errors.phone) {
      const err = validateSingleField("phone", sanitized);
      setErrors((prev) => ({ ...prev, phone: err }));
    }
  };

  async function handleSubmit(e: React.FormEvent, intent: "demo" | "sales") {
    e.preventDefault();
    if (submitting) return;

    const errs = validateAllFields();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      scrollToFirstError();
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch(internalApi("briefing-request"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: `Features ${intent === "sales" ? "Talk to Sales" : "Book a Demo"} (${orgType || "Features"})`,
          fullName,
          workEmail,
          organization,
          jobTitle,
          phone,
          orgType,
          country,
          note: `Country: ${country}\nCapabilities: ${Array.from(capabilities).join(", ")}\nMessage: ${message}`,
        }),
      });

      let data: {
        success?: boolean;
        errors?: Record<string, string>;
        message?: string;
      } = {};
      try {
        data = await res.json();
      } catch {}

      if (res.ok && (data.success || res.status === 200)) {
        setStatus("success");
        setFullName("");
        setWorkEmail("");
        setPhone("");
        setOrganization("");
        setJobTitle("");
        setOrgType("");
        setCountry("");
        setCapabilities(new Set());
        setMessage("");
        setConsent(false);
        setErrors({});
      } else {
        if (data.errors && Object.keys(data.errors).length > 0) {
          setErrors(data.errors);
          scrollToFirstError();
        } else {
          setStatus("error");
          setErrorMessage(data.message || "Failed to submit request.");
        }
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="book-a-demo"
      ref={sectionRef}
      className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <BookDemoFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            10 &nbsp;&middot;&nbsp; BOOK A DEMO
          </span>
        </BookDemoFadeUp>

        <BookDemoFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 max-w-2xl text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            See ZoikoMeds capabilities{" "}
            <span className="text-[#0FAA87]">matched to</span>{" "}
            <span className="text-[#0FAA87]">your organization.</span>
          </h2>
        </BookDemoFadeUp>

        <BookDemoFadeUp show={isVisible} delay={140}>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-[#6B7385]">
            Book a demo or talk to sales to explore availability intelligence,
            pharmacy network workflows, shortage awareness, analytics,
            reporting, and secure integrations.
          </p>
        </BookDemoFadeUp>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Form card */}
          <BookDemoFadeUp show={isVisible} delay={200}>
            <form
              onSubmit={(e) => handleSubmit(e, "demo")}
              noValidate
              className="rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" required error={errors.fullName}>
                  <input
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName)
                        handleBlur("fullName", e.target.value);
                    }}
                    onBlur={(e) => handleBlur("fullName", e.target.value)}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={
                      errors.fullName ? "fullName-error" : undefined
                    }
                    className={`input ${errors.fullName ? "!border-[#E14B4B] focus:!border-[#E14B4B]" : ""}`}
                  />
                </Field>

                <Field label="Work email" required error={errors.workEmail}>
                  <input
                    type="email"
                    name="workEmail"
                    placeholder="name@organization.org"
                    value={workEmail}
                    onChange={(e) => {
                      setWorkEmail(e.target.value);
                      if (errors.workEmail)
                        handleBlur("workEmail", e.target.value);
                    }}
                    onBlur={(e) => handleBlur("workEmail", e.target.value)}
                    aria-invalid={!!errors.workEmail}
                    aria-describedby={
                      errors.workEmail ? "workEmail-error" : undefined
                    }
                    className={`input placeholder:text-[#A6ACBB] ${errors.workEmail ? "!border-[#E14B4B] focus:!border-[#E14B4B]" : ""}`}
                  />
                </Field>

                <Field label="Phone number" optional error={errors.phone}>
                  <input
                    type="tel"
                    inputMode="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={(e) => handleBlur("phone", e.target.value)}
                    onPaste={handlePhonePaste}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={`input ${errors.phone ? "!border-[#E14B4B] focus:!border-[#E14B4B]" : ""}`}
                  />
                </Field>

                <Field
                  label="Organization"
                  required
                  error={errors.organization}
                >
                  <input
                    type="text"
                    name="organization"
                    value={organization}
                    onChange={(e) => {
                      setOrganization(e.target.value);
                      if (errors.organization)
                        handleBlur("organization", e.target.value);
                    }}
                    onBlur={(e) => handleBlur("organization", e.target.value)}
                    aria-invalid={!!errors.organization}
                    aria-describedby={
                      errors.organization ? "organization-error" : undefined
                    }
                    className={`input ${errors.organization ? "!border-[#E14B4B] focus:!border-[#E14B4B]" : ""}`}
                  />
                </Field>

                <Field label="Job title" required error={errors.jobTitle}>
                  <input
                    type="text"
                    name="jobTitle"
                    value={jobTitle}
                    onChange={(e) => {
                      setJobTitle(e.target.value);
                      if (errors.jobTitle)
                        handleBlur("jobTitle", e.target.value);
                    }}
                    onBlur={(e) => handleBlur("jobTitle", e.target.value)}
                    aria-invalid={!!errors.jobTitle}
                    aria-describedby={
                      errors.jobTitle ? "jobTitle-error" : undefined
                    }
                    className={`input ${errors.jobTitle ? "!border-[#E14B4B] focus:!border-[#E14B4B]" : ""}`}
                  />
                </Field>

                <Field
                  label="Organization type"
                  required
                  error={errors.orgType}
                >
                  <div className="relative">
                    <select
                      name="orgType"
                      value={orgType}
                      onChange={(e) => {
                        setOrgType(e.target.value);
                        if (errors.orgType)
                          handleBlur("orgType", e.target.value);
                      }}
                      onBlur={(e) => handleBlur("orgType", e.target.value)}
                      aria-invalid={!!errors.orgType}
                      aria-describedby={
                        errors.orgType ? "orgType-error" : undefined
                      }
                      className={`input appearance-none pr-9 text-[#0F1F4E] ${errors.orgType ? "!border-[#E14B4B] focus:!border-[#E14B4B]" : ""}`}
                    >
                      <option value="" disabled className="text-[#A6ACBB]">
                        Select type
                      </option>
                      {ORG_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B7385]"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2.5 4.5L6 8L9.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    label="Country / region"
                    required
                    error={errors.country}
                  >
                    <input
                      type="text"
                      name="country"
                      placeholder="e.g. US, UK, EU, national, regional"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        if (errors.country)
                          handleBlur("country", e.target.value);
                      }}
                      onBlur={(e) => handleBlur("country", e.target.value)}
                      aria-invalid={!!errors.country}
                      aria-describedby={
                        errors.country ? "country-error" : undefined
                      }
                      className={`input placeholder:text-[#A6ACBB] ${errors.country ? "!border-[#E14B4B] focus:!border-[#E14B4B]" : ""}`}
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-5">
                <span className="text-[0.8rem] font-semibold text-[#0F1F4E]">
                  Capability interest <span className="text-[#E14B4B]">*</span>
                </span>
                <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {CAPABILITY_OPTIONS.map((option) => {
                    const checked = capabilities.has(option);
                    return (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2.5 text-[0.85rem] text-[#3A4152]"
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                            checked
                              ? "border-[#0FAA87] bg-[#0FAA87]"
                              : "border-[#CBD1DE] bg-white"
                          }`}
                        >
                          {checked && (
                            <svg
                              viewBox="0 0 12 12"
                              className="h-2.5 w-2.5 text-white"
                              fill="none"
                            >
                              <path
                                d="M2 6L4.8 8.8L10 3"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleCapability(option)}
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
                {errors.capabilities && (
                  <p
                    className="mt-1.5 text-[12px] font-medium text-[#E14B4B]"
                    role="alert"
                  >
                    {errors.capabilities}
                  </p>
                )}
              </div>

              <div className="mt-5">
                <Field label="Message" optional>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your use case (no PHI, prescriptions, or exact stock)."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input resize-none placeholder:text-[#A6ACBB]"
                  />
                </Field>
              </div>

              <div>
                <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-[0.8rem] leading-relaxed text-[#6B7385]">
                  <span
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      consent
                        ? "border-[#0FAA87] bg-[#0FAA87]"
                        : "border-[#CBD1DE] bg-white"
                    }`}
                  >
                    {consent && (
                      <svg
                        viewBox="0 0 12 12"
                        className="h-2.5 w-2.5 text-white"
                        fill="none"
                      >
                        <path
                          d="M2 6L4.8 8.8L10 3"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      if (e.target.checked && errors.consent) {
                        setErrors((prev) => ({ ...prev, consent: "" }));
                      }
                    }}
                  />
                  I consent for ZoikoMeds to contact me about this request and
                  acknowledge the{" "}
                  <a
                    href="/privacy-center"
                    className="font-semibold text-[#0FAA87] hover:underline"
                  >
                    privacy notice
                  </a>
                  . <span className="text-[#E14B4B]">*</span>
                </label>
                {errors.consent && (
                  <p
                    className="mt-1 text-[12px] font-medium text-[#E14B4B]"
                    role="alert"
                  >
                    {errors.consent}
                  </p>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0FAA87] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#0C9575] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
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
                      <span>Submitting...</span>
                    </>
                  ) : (
                    "Book a Demo"
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/talk-to-sales")}
                  className="inline-flex items-center justify-center rounded-lg border border-[#DADFE8] bg-white px-5 py-3 text-sm font-semibold text-[#0F1F4E] transition-colors duration-300 hover:border-[#0FAA87] hover:text-[#0FAA87] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Talk to Sales
                </button>
              </div>

              <p className="mt-4 text-[0.75rem] leading-relaxed text-[#8A90A0]">
                A ZoikoMeds representative will review your request and route
                you to the most relevant path. Not medical advice, dispensing,
                or a pharmacy service — don&apos;t include PHI, prescriptions,
                or exact stock.
              </p>

              {status === "success" && (
                <div
                  ref={successRef}
                  className="mt-4 rounded-xl border border-[#9FE3D3] bg-[#EAFAF4] p-4 text-center text-[13.5px] text-[#00786F]"
                >
                  <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                    <svg
                      className="h-6 w-6 text-[#13A594]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="font-bold text-[#00786F]">
                        Request Submitted Successfully
                      </p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-[#056059]">
                        Thank you! Our team will review your request and contact
                        you soon.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {status === "error" && Object.keys(errors).length === 0 && (
                <div className="mt-4 rounded-xl border border-[#F87171]/40 bg-[#FEF2F2] p-4 text-center text-[13px] text-[#C5453F]">
                  <p className="font-medium">
                    {errorMessage || "Something went wrong. Please try again."}
                  </p>
                </div>
              )}
            </form>
          </BookDemoFadeUp>

          {/* Why teams choose card */}
          <BookDemoFadeUp show={isVisible} delay={260}>
            <div className="h-full rounded-2xl bg-[#0F1F4E] p-6">
              <h3 className="text-[0.95rem] font-bold text-white">
                Why teams choose ZoikoMeds
              </h3>
              <ul className="mt-5 space-y-5">
                {WHY_ITEMS.map((item) => (
                  <li key={item.title} className="flex gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#0FAA87]"
                      strokeWidth={2}
                    />
                    <div>
                      <p className="text-[0.83rem] font-bold text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[0.8rem] leading-relaxed text-[#AEB6CC]">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </BookDemoFadeUp>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #dadfe8;
          background: white;
          padding: 0.6rem 0.75rem;
          font-size: 0.85rem;
          color: #0f1f4e;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .input:focus {
          border-color: #0faa87;
        }
      `}</style>
    </section>
  );
}

/* ---------------------------------- */
/* Field wrapper                       */
/* ---------------------------------- */
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
    <div className="block">
      <span className="text-[0.8rem] font-semibold text-[#0F1F4E]">
        {label}
        {required && <span className="text-[#E14B4B]"> *</span>}
        {optional && (
          <span className="ml-1 font-normal text-[#A6ACBB]">(optional)</span>
        )}
      </span>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p
          className="mt-1.5 text-[12px] font-medium text-[#E14B4B]"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function BookDemoFadeUp({
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
