"use client"
import { useState } from "react";
import { Shield, Check, LucideIcon } from "lucide-react";

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
    description:
      "Role-based permissions, audit logs, and approval workflows.",
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
    description:
      "Test with synthetic data before any production go-live.",
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

  return (
    <section id="api-access-briefing" className="bg-slate-50 px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          10 · Request an API Access Briefing
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Tell us what{" "}
          <span className="text-[#0FAA87]">you want to integrate.</span>
        </h2>
        <p className="mt-4 max-w-160 leading-relaxed text-[#566476]">
          Request an API Access Briefing so our enterprise and integration teams can
          review your use case, systems, geography, data needs, and security
          requirements.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <form className="rounded-2xl border border-[#D8E2EC] bg-white p-6 shadow-sm lg:col-span-2">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
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
                  placeholder="name@organization.org"
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Phone number <span className="font-normal text-[#98A2B3]">(optional)</span>
                </label>
                <input
                  type="tel"
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
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition focus:border-[#00A99D]"
                />
              </div>

              {/* Job title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Job title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition focus:border-[#00A99D]"
                />
              </div>

              {/* Organization type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Organization type <span className="text-red-500">*</span>
                </label>
                <select className="h-12 w-full rounded-xl border border-[#D8E2EC] bg-white px-4 text-sm text-[#344054] outline-none focus:border-[#00A99D]">
                  <option>Select type</option>
                  <option>Hospital system</option>
                  <option>Clinic network</option>
                  <option>Pharmacy network</option>
                  <option>Distributor / wholesaler</option>
                  <option>Manufacturer</option>
                  <option>Public health / government</option>
                </select>
              </div>

              {/* Integration type */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Integration type <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {integrationTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2.5 text-sm text-[#344054]"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-[#00A99D] focus:ring-[#00A99D]"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              {/* Systems to integrate */}
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Systems to integrate <span className="font-normal text-[#98A2B3]">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="EHR, pharmacy system, BI tool, CRM, data warehouse, internal platform, other."
                  className="w-full rounded-xl border border-[#D8E2EC] px-4 py-3 text-sm outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
                />
              </div>

              {/* Countries / regions */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Countries / regions <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Operating geography"
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
                />
              </div>

              {/* Expected volume */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Expected volume <span className="font-normal text-[#98A2B3]">(optional)</span>
                </label>
                <select className="h-12 w-full rounded-xl border border-[#D8E2EC] bg-white px-4 text-sm text-[#344054] outline-none focus:border-[#00A99D]">
                  <option>Select</option>
                  <option>Low (pilot / evaluation)</option>
                  <option>Moderate</option>
                  <option>High</option>
                  <option>Enterprise scale</option>
                </select>
              </div>

              {/* Security contact */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Security contact <span className="font-normal text-[#98A2B3]">(optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Name or team"
                  className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
                />
              </div>

              {/* Message */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                  Message <span className="font-normal text-[#98A2B3]">(optional)</span>
                </label>
                <input
                  type="text"
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
                I agree to be contacted about API access and enterprise integration,
                and acknowledge the{" "}
                <a href="#" className="text-[#00A99D] hover:underline">
                  privacy notice.
                </a>{" "}
                <span className="text-red-500">*</span>
              </span>
            </label>

            {/* Buttons */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <button
                type="submit"
                className="h-12 flex-1 rounded-xl bg-[#00A99D] font-semibold text-white transition hover:bg-[#009487]"
              >
                Request API Access Briefing
              </button>

              <button
                type="button"
                className="h-12 flex-1 rounded-xl border border-[#D8E2EC] bg-white font-semibold text-[#0D1526] transition hover:bg-gray-50"
              >
                Talk to Integration Team
              </button>
            </div>

            {/* Footer Note */}
            <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#667085]">
              <span className="mt-1 h-2 w-2 rounded-full border border-[#00A99D]" />
              <p>
                A ZoikoMeds representative will review your integration use case and
                security requirements. Not medical advice, dispensing, or a pharmacy
                service — don&apos;t include PHI, prescriptions, secrets, or exact
                stock.
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
