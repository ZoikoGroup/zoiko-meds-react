"use client";

import { useState } from "react";
import { validateEmail } from "@/lib/validation";

type FormState = {
  email: string;
  name: string;
  organization: string;
  orgType: string;
  interest: string;
  description: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL_STATE: FormState = {
  email: "",
  name: "",
  organization: "",
  orgType: "Health System",
  interest: "API Integration",
  description: "",
};

export default function EnterpriseContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [submitError, setSubmitError] = useState<string>("");

  function validateField(name: keyof FormState, value: string): string {
    switch (name) {
      case "email": {
        const check = validateEmail(value);
        if (!check.isValid) return check.error || "Please enter a valid email address.";
        return "";
      }
      case "name":
        if (!value.trim()) return "Name is required.";
        return "";
      case "organization":
        if (!value.trim()) return "Organization is required.";
        return "";
      case "description":
        if (!value.trim()) return "Please briefly describe your requirements.";
        if (value.trim().length < 10) return "Please provide a bit more detail.";
        return "";
      default:
        return "";
    }
  }

  function validateAll(values: FormState): FormErrors {
    const next: FormErrors = {};
    (["email", "name", "organization", "description"] as const).forEach((key) => {
      const msg = validateField(key, values[key]);
      if (msg) next[key] = msg;
    });
    return next;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError("");
    if (touched[name as keyof FormState] || errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormState, value) }));
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name as keyof FormState, value) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    const nextErrors = validateAll(form);
    setErrors(nextErrors);
    setTouched({
      email: true,
      name: true,
      organization: true,
      orgType: true,
      interest: true,
      description: true,
    });

    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/internal/briefing-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: "Enterprise Solutions Briefing",
          fullName: form.name.trim(),
          workEmail: form.email.trim(),
          organization: form.organization.trim(),
          orgType: form.orgType.trim(),
          primaryInterest: form.interest.trim(),
          note: form.description.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setForm(INITIAL_STATE);
        setTouched({});
        setErrors({});
      } else {
        setStatus("idle");
        if (data.errors && typeof data.errors === "object") {
          const mappedErrors: FormErrors = {};
          if (data.errors.workEmail || data.errors.email) {
            mappedErrors.email = data.errors.workEmail || data.errors.email;
          }
          if (data.errors.fullName || data.errors.name) {
            mappedErrors.name = data.errors.fullName || data.errors.name;
          }
          if (data.errors.organization) {
            mappedErrors.organization = data.errors.organization;
          }
          if (data.errors.description || data.errors.note) {
            mappedErrors.description = data.errors.description || data.errors.note;
          }
          setErrors((prev) => ({ ...prev, ...mappedErrors }));
        }
        setSubmitError("We couldn't submit your inquiry. Please try again.");
      }
    } catch {
      setStatus("idle");
      setSubmitError("We couldn't submit your inquiry. Please try again.");
    }
  }

  const inputBase =
    "w-full rounded-xl px-4 py-3 text-sm text-[#0d2636] placeholder:text-[#94a3b8] outline-none transition-all duration-200";

  function inputClass(field: keyof FormState) {
    const hasError = touched[field] && errors[field];
    return `${inputBase} ec-input ${hasError ? "ec-input-error" : ""}`;
  }

  return (
    <section className="ec-section w-full px-6 py-20 lg:px-12">
      <style>{`
        .ec-section {
          background-color: #F0F3FF;
        }
        .ec-input {
          background-color: #e8edf7;
          border: 1px solid #d6dcec;
        }
        .ec-input:focus {
          border-color: #0A9B74;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(10, 155, 116, 0.15);
        }
        .ec-input-error {
          border-color: #dc2626;
          background-color: #fef2f2;
        }
        .ec-submit {
          background-color: #0d1b2a;
        }
        .ec-submit:hover:not(:disabled) {
          background-color: #16293d;
          box-shadow: 0 8px 24px rgba(13, 27, 42, 0.35);
        }
        .ec-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        @keyframes ecSpin {
          to { transform: rotate(360deg); }
        }
        .ec-spinner {
          animation: ecSpin 0.7s linear infinite;
        }
        @keyframes ecFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ec-fade { animation: ecFadeUp 0.5s ease-out both; }
      `}</style>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT */}
        <div className="flex flex-col">
          <h2 className="text-3xl font-extrabold leading-[1.15] text-[#0d2636] sm:text-4xl lg:text-[2.6rem]">
            Build institutional medicine intelligence on governed infrastructure.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#4a6070]">
            Speak with our institutional solutions team to explore deployment
            models and jurisdiction-specific access.
          </p>

          <div className="mt-10 flex items-center gap-10">
            <div>
              <p className="text-2xl font-extrabold text-[#0d2636]">15min</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                Average Response
              </p>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#0d2636]">Direct</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[#64748b]">
                Expert Consultation
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — FORM CARD */}
        <div className="rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:p-10">
          {status === "success" ? (
            <div className="ec-fade flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#e7f7f1]">
                <svg viewBox="0 0 24 24" fill="none" stroke="#0A9B74" strokeWidth={2} className="h-7 w-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#0d2636]">Inquiry submitted</h3>
              <p className="mt-2 max-w-xs text-sm text-[#64748b]">
                Thank you. Your inquiry has been submitted successfully. A confirmation email has been sent to your email address.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-semibold text-[#0A9B74] hover:opacity-70"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-[#0d2636]">
                    Work Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@organization.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("email")}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-[#0d2636]">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("name")}
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="organization" className="mb-1.5 block text-sm font-semibold text-[#0d2636]">
                  Organization
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  placeholder="Company Name"
                  value={form.organization}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass("organization")}
                />
                {touched.organization && errors.organization && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">{errors.organization}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="orgType" className="mb-1.5 block text-sm font-semibold text-[#0d2636]">
                    Organization Type
                  </label>
                  <select
                    id="orgType"
                    name="orgType"
                    value={form.orgType}
                    onChange={handleChange}
                    className={`${inputBase} ec-input appearance-none`}
                  >
                    <option>Health System</option>
                    <option>Government Agency</option>
                    <option>Pharmaceutical Manufacturer</option>
                    <option>Payer / Digital Health</option>
                    <option>Pharmacy Network</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="interest" className="mb-1.5 block text-sm font-semibold text-[#0d2636]">
                    Primary Interest
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className={`${inputBase} ec-input appearance-none`}
                  >
                    <option>API Integration</option>
                    <option>Data Licensing</option>
                    <option>Strategic Briefing</option>
                    <option>Procurement Review</option>
                    <option>Public-Sector Engagement</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-[#0d2636]">
                  Project Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Briefly describe your institutional requirements..."
                  value={form.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClass("description")} resize-none`}
                />
                {touched.description && errors.description && (
                  <p className="mt-1.5 text-xs font-medium text-red-600">{errors.description}</p>
                )}
              </div>

              {submitError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-center text-xs font-medium text-red-600">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="ec-submit flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300"
              >
                {status === "submitting" ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" className="ec-spinner h-4 w-4">
                      <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2.5" strokeOpacity="0.25" />
                      <path d="M21 12a9 9 0 0 0-9-9" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </button>

              <p className="text-center text-xs leading-relaxed text-[#94a3b8]">
                By submitting, you agree to our processing of your business
                data according to our Institutional Privacy Standards.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}