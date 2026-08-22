"use client";
import React, { useState } from "react";
import { LucideIcon, Shield, Check } from "lucide-react";
import { internalApi } from "@/lib/config";
import { sanitizePhoneInput } from "@/lib/validation";

interface Criterion {
  icon: LucideIcon;
  title: string;
  description: string;
}

const criteria: Criterion[] = [
  {
    icon: Check,
    title: "Responsible visibility",
    description:
      "Confidence-based signals, never public exact inventory quantities.",
  },
  {
    icon: Check,
    title: "Pharmacy-controlled",
    description:
      "You manage participation status, review queues, and confirmations.",
  },
  {
    icon: Check,
    title: "No clinical overreach",
    description:
      "No diagnosis, prescribing, dispensing, or substitution advice.",
  },
  {
    icon: Check,
    title: "Enterprise-ready",
    description:
      "Role-based access, audit trails, SSO path, and governance reporting.",
  },
];

export default function JoinNetworkFormSection() {
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orgName, setOrgName] = useState("");
  const [role, setRole] = useState("");
  const [pharmacyType, setPharmacyType] = useState("");
  const [locations, setLocations] = useState("");
  const [country, setCountry] = useState("");
  const [interest, setInterest] = useState("Join Pharmacy Network");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!fullName.trim()) {
      setErrorMessage("Full name is required.");
      return;
    }

    if (!workEmail.trim() || !workEmail.includes("@")) {
      setErrorMessage("Please enter a valid work email address.");
      return;
    }

    if (!orgName.trim()) {
      setErrorMessage("Pharmacy or organization name is required.");
      return;
    }

    if (!pharmacyType || pharmacyType === "Select type") {
      setErrorMessage("Please select a pharmacy type.");
      return;
    }

    if (!agreed) {
      setErrorMessage("Please consent to be contacted to proceed.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(internalApi("verified-network/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          workEmail,
          phone,
          orgName,
          role,
          pharmacyType,
          locations,
          country,
          interest,
          note: message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(data.message || "Failed to submit pharmacy registration. Please try again.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="join-the-network" className="bg-slate-50 px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          11 · Join the network
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Join a responsible medicine availability{" "}
          <span className="text-[#0FAA87]">network built for pharmacies.</span>
        </h2>
        <p className="mt-4 max-w-160 leading-relaxed text-[#566476]">
          Review signal queues, manage structured confirmations, monitor access demand,
          coordinate locations, and generate reports — without turning pharmacy operations
          into a public inventory marketplace.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {isSubmitted ? (
            <div className="rounded-2xl border border-[#0FAA87]/30 bg-[#EDF8F6] p-8 shadow-sm lg:col-span-2 text-center flex flex-col items-center justify-center space-y-4 min-h-[400px]">
              <div className="w-14 h-14 bg-[#0FAA87] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-[#0D1526]">
                Application Submitted Successfully
              </h3>
              <p className="max-w-md text-sm text-[#344054] leading-relaxed">
                Thank you! Your pharmacy network registration has been dispatched to{" "}
                <span className="font-semibold text-[#0D1526]">info@zoikomeds.com</span>. Our onboarding team will review your application and contact you via email shortly.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-6 py-3 rounded-xl bg-[#00A99D] font-semibold text-white transition hover:bg-[#009487] text-sm"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-2xl border border-[#D8E2EC] bg-white p-6 shadow-sm lg:col-span-2">
              {errorMessage && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl text-xs font-medium text-red-700 flex items-center justify-between">
                  <span>{errorMessage}</span>
                  <button type="button" onClick={() => setErrorMessage(null)} className="text-red-500 font-bold ml-2">✕</button>
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
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm text-[#0D1526] outline-none transition focus:border-[#00A99D]"
                  />
                </div>

                {/* Work Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                    Work email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="name@pharmacy.org"
                    className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm text-[#0D1526] outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                    Phone number <span className="font-normal text-[#98A2B3]">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))}
                    className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm text-[#0D1526] outline-none transition focus:border-[#00A99D]"
                  />
                </div>

                {/* Pharmacy */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                    Pharmacy / organization name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm text-[#0D1526] outline-none transition focus:border-[#00A99D]"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#D8E2EC] bg-white px-4 text-sm text-[#344054] outline-none focus:border-[#00A99D]"
                  >
                    <option value="">Select role</option>
                    <option value="Owner">Owner</option>
                    <option value="Pharmacist">Pharmacist</option>
                    <option value="Operations Manager">Operations Manager</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Support">Support</option>
                  </select>
                </div>

                {/* Pharmacy Type */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                    Pharmacy type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={pharmacyType}
                    onChange={(e) => setPharmacyType(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#D8E2EC] bg-white px-4 text-sm text-[#344054] outline-none focus:border-[#00A99D]"
                  >
                    <option value="">Select type</option>
                    <option value="Independent">Independent</option>
                    <option value="Multi-location">Multi-location</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Retail Chain">Retail Chain</option>
                  </select>
                </div>

                {/* Locations */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                    Number of locations <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={locations}
                    onChange={(e) => setLocations(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#D8E2EC] bg-white px-4 text-sm text-[#344054] outline-none focus:border-[#00A99D]"
                  >
                    <option value="">Select</option>
                    <option value="1">1</option>
                    <option value="2–5">2–5</option>
                    <option value="6–20">6–20</option>
                    <option value="20+">20+</option>
                  </select>
                </div>

                {/* Country */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                    Country / region <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. US, UK, EU"
                    className="h-12 w-full rounded-xl border border-[#D8E2EC] px-4 text-sm text-[#0D1526] outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
                  />
                </div>

                {/* Interest */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                    Primary interest <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="h-12 w-full rounded-xl border border-[#D8E2EC] bg-white px-4 text-sm text-[#344054] outline-none focus:border-[#00A99D]"
                  >
                    <option value="Join Pharmacy Network">Join Pharmacy Network</option>
                    <option value="Request Demo">Request Demo</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-[#0D1526]">
                    Message <span className="font-normal text-[#98A2B3]">(optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your pharmacy and goals (no PHI, prescriptions, or exact stock)."
                    className="w-full rounded-xl border border-[#D8E2EC] px-4 py-3 text-sm text-[#0D1526] outline-none transition placeholder:text-[#98A2B3] focus:border-[#00A99D]"
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
                  I consent to be contacted about ZoikoMeds pharmacy participation and
                  acknowledge the{" "}
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
                  disabled={submitting}
                  className="h-12 flex-1 rounded-xl bg-[#00A99D] font-semibold text-white transition hover:bg-[#009487] disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? "Submitting..." : "Join Pharmacy Network"}
                </button>
              </div>

              {/* Footer Note */}
              <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#667085]">
                <span className="mt-1 h-2 w-2 rounded-full border border-[#00A99D]" />
                <p>
                  A ZoikoMeds representative will review eligibility and onboarding fit.
                  Not medical advice, dispensing, or a pharmacy management system — don&apos;t
                  include PHI, prescriptions, or exact stock.
                </p>
              </div>
            </form>
          )}

          <div className="rounded-xl max-h-110 bg-slate-900 p-6">
            <h3 className="text-sm font-semibold text-white flex gap-4 items-center">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
                <Shield size={14} strokeWidth={2} />
              </span>
              Participation foundations
            </h3>
            <ul className="mt-8 space-y-4">
              {criteria.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-400/10 text-teal-400">
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
