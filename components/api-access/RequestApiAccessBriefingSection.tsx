"use client";
import { useEffect, useRef, useState } from "react";
import { internalApi } from "@/lib/config";
import { validateEmail, validatePhone, sanitizePhoneInput, scrollToFirstError } from "@/lib/validation";
import { Shield, Check, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Foundation {
  icon: LucideIcon;
  title: string;
  description: string;
}

const foundations: Foundation[] = [
  {
    icon: Check,
    title: "Approved access only",
    description:
      "Qualification, security review, defined scopes, and approved pathways.",
  },
  {
    icon: Check,
    title: "Governed & scoped",
    description: "Role-based permissions, audit logs, and approval workflows.",
  },
  {
    icon: Check,
    title: "No exact inventory",
    description:
      "Confidence signals and approved reports, never unauthorized quantities.",
  },
  {
    icon: Check,
    title: "Sandbox first",
    description: "Test with synthetic data before any production go-live.",
  },
];

const integrationTypes = [
  "Availability signals",
  "Pharmacy network",
  "Reports",
  "Alerts / webhooks",
  "Shortage intelligence",
  "Analytics export",
  "Custom integration",
];

export default function RequestApiAccessBriefingSection() {
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const [form, setForm] = useState({
    fullName: "",
    workEmail: "",
    phone: "",
    organization: "",
    jobTitle: "",
    orgType: "",
    country: "",
    useCase: "",
    integrationType: "",
    volume: "",
    securityContact: "",
    message: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    let value = e.target.value;
    if (name === "phone") {
      value = sanitizePhoneInput(value);
    }
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required.";

    const emailCheck = validateEmail(form.workEmail);
    if (!emailCheck.isValid) newErrors.workEmail = emailCheck.error!;

    if (form.phone.trim()) {
      const phoneCheck = validatePhone(form.phone);
      if (!phoneCheck.isValid) newErrors.phone = phoneCheck.error!;
    }

    if (!form.organization.trim()) newErrors.organization = "Organization is required.";
    if (!form.jobTitle.trim()) newErrors.jobTitle = "Role / Title is required.";
    if (!form.orgType.trim()) newErrors.orgType = "Please select an organization type.";
    if (!form.country.trim()) newErrors.country = "Country / Region is required.";
    if (!form.integrationType.trim()) newErrors.integrationType = "Please select an integration area.";
    if (!form.useCase.trim()) newErrors.useCase = "Primary use case description is required.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || submitting) return;

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = newErrors.workEmail ? "workEmail" : Object.keys(newErrors)[0];
      scrollToFirstError(firstKey);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch(internalApi("briefing-request"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: `API Access Briefing (${form.integrationType || "API"})`,
          fullName: form.fullName.trim(),
          workEmail: form.workEmail.trim(),
          organization: form.organization.trim(),
          jobTitle: form.jobTitle.trim(),
          phone: form.phone.trim(),
          note: `Org Type: ${form.orgType}\nCountry: ${form.country}\nIntegration Type: ${form.integrationType}\nUse Case: ${form.useCase}\nExpected Volume: ${form.volume}\nSecurity Contact: ${form.securityContact}\nMessage: ${form.message}`,
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {
        // Fallback for non-JSON responses
      }

      if (!res.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        }
        throw new Error(data.message || `Submission failed (${res.status})`);
      }

      setStatus("success");
      setForm({
        fullName: "",
        workEmail: "",
        phone: "",
        organization: "",
        jobTitle: "",
        orgType: "",
        country: "",
        useCase: "",
        integrationType: "",
        volume: "",
        securityContact: "",
        message: "",
      });
      setAgreed(false);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = (hasErr?: boolean) =>
    `h-12 w-full rounded-xl border ${
      hasErr ? "border-[#DC2626]" : "border-[#D8E2EC]"
    } bg-white px-4 text-sm text-[#0F1F4E] placeholder:text-[#98A2B3] outline-none transition focus:border-[#00A99D]`;

  return (
    <section
      id="api-access-briefing"
      className="bg-slate-50 px-6 py-16 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          10 · Request an API Access Briefing
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Tell us what{" "}
          <span className="text-[#0FAA87]">you want to integrate.</span>
        </h2>
        <p className="mt-4 max-w-160 leading-relaxed text-[#566476]">
          Request an API Access Briefing so our enterprise and integration teams
          can review your use case, systems, geography, data needs, and security
          requirements.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-[#D8E2EC] bg-white p-6 shadow-sm lg:col-span-2">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={inputCls(!!errors.fullName)}
                />
                {errors.fullName && <span className="mt-1 block text-xs font-medium text-[#DC2626]">{errors.fullName}</span>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Work email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="workEmail"
                  value={form.workEmail}
                  onChange={handleChange}
                  placeholder="name@organization.org"
                  className={inputCls(!!errors.workEmail)}
                />
                {errors.workEmail && <span className="mt-1 block text-xs font-medium text-[#DC2626]">{errors.workEmail}</span>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Phone number{" "}
                  <span className="font-normal text-[#98A2B3]">(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputCls(!!errors.phone)}
                />
                {errors.phone && <span className="mt-1 block text-xs font-medium text-[#DC2626]">{errors.phone}</span>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  className={inputCls(!!errors.organization)}
                />
                {errors.organization && <span className="mt-1 block text-xs font-medium text-[#DC2626]">{errors.organization}</span>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Role / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  className={inputCls(!!errors.jobTitle)}
                />
                {errors.jobTitle && <span className="mt-1 block text-xs font-medium text-[#DC2626]">{errors.jobTitle}</span>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Organization type <span className="text-red-500">*</span>
                </label>
                <select
                  name="orgType"
                  value={form.orgType}
                  onChange={handleChange}
                  className={inputCls(!!errors.orgType)}
                >
                  <option value="" disabled className="text-[#98A2B3] bg-white">Select type</option>
                  <option value="Healthcare Provider" className="text-[#0F1F4E] bg-white">Healthcare Provider</option>
                  <option value="Pharmacy Network" className="text-[#0F1F4E] bg-white">Pharmacy Network</option>
                  <option value="Health System" className="text-[#0F1F4E] bg-white">Health System</option>
                  <option value="Technology Platform" className="text-[#0F1F4E] bg-white">Technology Platform</option>
                  <option value="Public Health" className="text-[#0F1F4E] bg-white">Public Health</option>
                  <option value="Other" className="text-[#0F1F4E] bg-white">Other</option>
                </select>
                {errors.orgType && <span className="mt-1 block text-xs font-medium text-[#DC2626]">{errors.orgType}</span>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className={inputCls(!!errors.country)}
                />
                {errors.country && <span className="mt-1 block text-xs font-medium text-[#DC2626]">{errors.country}</span>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Integration area <span className="text-red-500">*</span>
                </label>
                <select
                  name="integrationType"
                  value={form.integrationType}
                  onChange={handleChange}
                  className={inputCls(!!errors.integrationType)}
                >
                  <option value="" disabled className="text-[#98A2B3] bg-white">Select area</option>
                  {integrationTypes.map((t) => (
                    <option key={t} value={t} className="text-[#0F1F4E] bg-white">{t}</option>
                  ))}
                </select>
                {errors.integrationType && <span className="mt-1 block text-xs font-medium text-[#DC2626]">{errors.integrationType}</span>}
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Primary use case <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="useCase"
                  value={form.useCase}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Describe your intended system integration..."
                  className={inputCls(!!errors.useCase)}
                />
                {errors.useCase && <span className="mt-1 block text-xs font-medium text-[#DC2626]">{errors.useCase}</span>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Expected query volume
                </label>
                <select
                  name="volume"
                  value={form.volume}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] bg-white px-4 text-sm text-[#0F1F4E] outline-none transition focus:border-[#00A99D]"
                >
                  <option value="" className="text-[#98A2B3] bg-white">Select expected volume</option>
                  <option value="Low (< 1k/day)" className="text-[#0F1F4E] bg-white">Low (&lt; 1k/day)</option>
                  <option value="Moderate (1k-50k/day)" className="text-[#0F1F4E] bg-white">Moderate (1k-50k/day)</option>
                  <option value="High (50k+/day)" className="text-[#0F1F4E] bg-white">High (50k+/day)</option>
                  <option value="Enterprise scale" className="text-[#0F1F4E] bg-white">Enterprise scale</option>
                </select>
              </div>

              {/* Security contact */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Security contact{" "}
                  <span className="font-normal text-[#98A2B3]">(optional)</span>
                </label>
                <input
                  type="text"
                  name="securityContact"
                  value={form.securityContact}
                  onChange={handleChange}
                  placeholder="Name or team"
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] bg-white px-4 text-sm text-[#0F1F4E] placeholder:text-[#98A2B3] outline-none transition focus:border-[#00A99D]"
                />
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Additional context{" "}
                  <span className="font-normal text-[#98A2B3]">(optional)</span>
                </label>
                <input
                  type="text"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Open context"
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] bg-white px-4 text-sm text-[#0F1F4E] placeholder:text-[#98A2B3] outline-none transition focus:border-[#00A99D]"
                />
              </div>
            </div>

            {/* Consent */}
            <label className="mt-5 flex items-start gap-3 text-sm text-[#344054]">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#00A99D] focus:ring-[#00A99D]"
              />
              <span>
                I agree to be contacted about API access and enterprise
                integration, and acknowledge the{" "}
                <a href="/privacy-center" className="text-[#00A99D] hover:underline">
                  privacy notice.
                </a>{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <button
                type="submit"
                disabled={!agreed || submitting}
                className="inline-flex items-center justify-center gap-2 h-12 flex-1 rounded-xl bg-[#00A99D] font-semibold text-white transition hover:bg-[#009487] disabled:opacity-50 disabled:cursor-not-allowed"
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
                  "Request API Access Briefing"
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push("/integrations")}
                className="h-12 flex-1 rounded-xl border border-[#D8E2EC] bg-white font-semibold text-[#0D1526] transition hover:bg-gray-50"
              >
                Talk to Integration Team
              </button>
            </div>

            {status === "success" && (
              <div ref={successRef} className="mt-4 rounded-xl border border-[#9FE3D3] bg-[#EAFAF4] p-4 text-center text-[13.5px] text-[#00786F]">
                <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                  <svg className="h-6 w-6 text-[#00A99D]" viewBox="0 0 20 20" fill="currentColor">
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

            {/* Footer Note */}
            <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#667085]">
              <span className="mt-1 h-2 w-2 rounded-full border border-[#00A99D]" />
              <p>
                A ZoikoMeds representative will review your integration use case
                and security requirements. Not medical advice, dispensing, or a
                pharmacy service — don&apos;t include PHI, prescriptions,
                secrets, or exact stock.
              </p>
            </div>
          </form>

          <div className="rounded-xl md:max-h-105 bg-slate-900 p-6">
            <h3 className="flex items-center gap-4 text-sm font-semibold text-white">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
                <Shield size={14} strokeWidth={2} />
              </span>
              API foundations
            </h3>
            <ul className="mt-8 space-y-4">
              {foundations.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-teal-400">
                    <Icon size={14} strokeWidth={2} />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">{title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
