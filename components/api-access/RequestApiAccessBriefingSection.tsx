"use client";
import { useState } from "react";
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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || submitting) return;

    setSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/briefing-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: `API Access Briefing (${form.integrationType || "API"})`,
          fullName: form.fullName,
          workEmail: form.workEmail,
          organization: form.organization,
          jobTitle: form.jobTitle,
          phone: form.phone,
          note: `Org Type: ${form.orgType}\nCountry: ${form.country}\nIntegration Type: ${form.integrationType}\nUse Case: ${form.useCase}\nExpected Volume: ${form.volume}\nSecurity Contact: ${form.securityContact}\nMessage: ${form.message}`,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit API Access briefing request.");
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
          <form onSubmit={handleSubmit} className="rounded-2xl border border-[#D8E2EC] bg-white p-6 shadow-sm lg:col-span-2">
            {status === "success" && (
              <div className="mb-6 rounded-xl border border-[#b2dfc8] bg-[#f7fdf9] p-4 text-sm text-[#0f7a53]">
                <strong className="font-bold">Briefing Request Submitted!</strong> Thank you for your inquiry. Our integration team will review your requirements and reach out via email.
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 rounded-xl border border-[#fecaca] bg-[#fef2f2] p-4 text-sm text-[#b42318]">
                <strong className="font-bold">Submission Error:</strong> {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition focus:border-[#00A99D]"
                />
              </div>

              {/* Work Email */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Work email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="workEmail"
                  value={form.workEmail}
                  onChange={handleChange}
                  required
                  placeholder="name@organization.org"
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
                />
              </div>

              {/* Phone */}
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
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition focus:border-[#00A99D]"
                />
              </div>

              {/* Organization */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Organization <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="organization"
                  value={form.organization}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition focus:border-[#00A99D]"
                />
              </div>

              {/* Role */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Role / Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={form.jobTitle}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition focus:border-[#00A99D]"
                />
              </div>

              {/* Org Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Organization type <span className="text-red-500">*</span>
                </label>
                <select
                  name="orgType"
                  value={form.orgType}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition focus:border-[#00A99D]"
                >
                  <option value="" disabled>Select type</option>
                  <option value="Healthcare Provider">Healthcare Provider</option>
                  <option value="Pharmacy Network">Pharmacy Network</option>
                  <option value="Health System">Health System</option>
                  <option value="Technology Platform">Technology Platform</option>
                  <option value="Public Health">Public Health</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Country / Region <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition focus:border-[#00A99D]"
                />
              </div>

              {/* Integration Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Integration area <span className="text-red-500">*</span>
                </label>
                <select
                  name="integrationType"
                  value={form.integrationType}
                  onChange={handleChange}
                  required
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition focus:border-[#00A99D]"
                >
                  <option value="" disabled>Select area</option>
                  {integrationTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Primary Use Case */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Primary use case <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="useCase"
                  value={form.useCase}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Describe your intended system integration..."
                  className="w-full rounded-xl border border-[#D8E2EC] p-4 text-sm outline-none transition focus:border-[#00A99D]"
                />
              </div>

              {/* Volume */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Expected query volume
                </label>
                <select
                  name="volume"
                  value={form.volume}
                  onChange={handleChange}
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition focus:border-[#00A99D]"
                >
                  <option value="">Select expected volume</option>
                  <option value="Low (< 1k/day)">Low (&lt; 1k/day)</option>
                  <option value="Moderate (1k-50k/day)">Moderate (1k-50k/day)</option>
                  <option value="High (50k+/day)">High (50k+/day)</option>
                  <option value="Enterprise scale">Enterprise scale</option>
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
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
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
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
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
                <a href="/privacy" className="text-[#00A99D] hover:underline">
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
                className="h-12 flex-1 rounded-xl bg-[#00A99D] font-semibold text-white transition hover:bg-[#009487] disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Request API Access Briefing"}
              </button>

              <button
                type="button"
                onClick={() => router.push("/integrations")}
                className="h-12 flex-1 rounded-xl border border-[#D8E2EC] bg-white font-semibold text-[#0D1526] transition hover:bg-gray-50"
              >
                Talk to Integration Team
              </button>
            </div>

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
