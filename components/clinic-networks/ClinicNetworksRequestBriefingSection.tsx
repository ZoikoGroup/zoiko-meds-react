"use client";

import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const SIDEBAR_ITEMS = [
  {
    id: "access-intelligence",
    title: "Access intelligence",
    description: "Availability, visibility, and reporting — not clinical advice or dispensing.",
  },
  {
    id: "confidence-based",
    title: "Confidence-based",
    description:
      "Signals and filters; never exact inventory to unauthorized users.",
  },
  {
    id: "multi-location-ready",
    title: "Multi-location ready",
    description:
      "Location views, regional dashboards, role-based access, and recurring reports.",
  },
  {
    id: "responsible-ai",
    title: "Responsible AI",
    description: "Designed, explainable, reviewable, non-clinical outputs.",
  },
];

const INTEREST_OPTIONS = [
  { id: "access-visibility", label: "Access visibility" },
  { id: "shortage-signals", label: "Shortage signals" },
  { id: "pharmacy-network", label: "Pharmacy network intelligence" },
  { id: "reports", label: "Reports" },
  { id: "integrations", label: "Integrations" },
  { id: "security-review", label: "Security review" },
  { id: "partnership", label: "Partnership" },
];

export default function ClinicNetworksRequestBriefingSection() {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    phoneNumber: "",
    organizationName: "",
    jobTitle: "",
    clinicNetworkSize: "",
    regionCountry: "",
    primaryInterest: [] as string[],
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.workEmail.trim()) newErrors.workEmail = "Work email is required";
    if (!formData.organizationName.trim())
      newErrors.organizationName = "Organization name is required";
    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!formData.clinicNetworkSize)
      newErrors.clinicNetworkSize = "Clinic network size is required";
    if (!formData.regionCountry.trim())
      newErrors.regionCountry = "Region / country is required";
    if (formData.primaryInterest.length === 0)
      newErrors.primaryInterest = "Select at least one area of interest";
    if (!formData.consent) newErrors.consent = "You must accept the privacy notice";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "consent") {
        setFormData((prev) => ({ ...prev, consent: checked }));
      } else {
        setFormData((prev) => ({
          ...prev,
          primaryInterest: checked
            ? [...prev.primaryInterest, name]
            : prev.primaryInterest.filter((item) => item !== name),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Handle form submission
    }
  };

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">10</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Request a Briefing
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Book a clinic network </span>
            <span style={{ color: ACCENT }}>briefing.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-[#5B6478]">
            See how ZoikoMeds supports access visibility, pharmacy network signals, shortage
            awareness, escalation, and compliance-conscious reporting across your locations.
          </p>
        </Reveal>

        {/* ── Content grid ── */}
        <div className="mt-10 grid grid-cols-1 items-start gap-10 lg:mt-12 lg:grid-cols-[2fr_1.1fr] lg:gap-8">

          {/* ── Form ── */}
          <Reveal index={3} active={mounted}>
            <div
              className="rounded-2xl border bg-white p-6 sm:p-7"
              style={{
                borderColor: "#E7EAF1",
                boxShadow: "0 4px 23px -10px rgba(15,31,78,0.06)",
              }}
            >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Full name + Work email */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                    Full name <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="clinic-networks-input w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors duration-200"
                    style={{ borderColor: errors.fullName ? "#DC2626" : "#E7EAF1" }}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-[11px] text-[#DC2626]">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                    Work email <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleChange}
                    placeholder="name@clinicnetwork.org"
                    className="clinic-networks-input w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors duration-200"
                    style={{ borderColor: errors.workEmail ? "#DC2626" : "#E7EAF1" }}
                  />
                  {errors.workEmail && (
                    <p className="mt-1 text-[11px] text-[#DC2626]">{errors.workEmail}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone + Organization name */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                    Phone number <span className="text-[#8A93A6]">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="clinic-networks-input w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors duration-200"
                    style={{ borderColor: "#E7EAF1" }}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                    Organization name <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className="clinic-networks-input w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors duration-200"
                    style={{ borderColor: errors.organizationName ? "#DC2626" : "#E7EAF1" }}
                  />
                  {errors.organizationName && (
                    <p className="mt-1 text-[11px] text-[#DC2626]">{errors.organizationName}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Job title + Clinic network size */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                    Job title <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="clinic-networks-input w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors duration-200"
                    style={{ borderColor: errors.jobTitle ? "#DC2626" : "#E7EAF1" }}
                  />
                  {errors.jobTitle && (
                    <p className="mt-1 text-[11px] text-[#DC2626]">{errors.jobTitle}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                    Clinic network size <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <select
                    name="clinicNetworkSize"
                    value={formData.clinicNetworkSize}
                    onChange={handleChange}
                    className="clinic-networks-input w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] transition-colors duration-200"
                    style={{ borderColor: errors.clinicNetworkSize ? "#DC2626" : "#E7EAF1" }}
                  >
                    <option value="">Select</option>
                    <option value="1-5">1-5 locations</option>
                    <option value="6-20">6-20 locations</option>
                    <option value="21-50">21-50 locations</option>
                    <option value="50+">50+ locations</option>
                  </select>
                  {errors.clinicNetworkSize && (
                    <p className="mt-1 text-[11px] text-[#DC2626]">{errors.clinicNetworkSize}</p>
                  )}
                </div>
              </div>

              {/* Region / country */}
              <div>
                <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                  Region / country <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <input
                  type="text"
                  name="regionCountry"
                  value={formData.regionCountry}
                  onChange={handleChange}
                  placeholder="e.g. US Southeast, national"
                  className="clinic-networks-input w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors duration-200"
                  style={{ borderColor: errors.regionCountry ? "#DC2626" : "#E7EAF1" }}
                />
                {errors.regionCountry && (
                  <p className="mt-1 text-[11px] text-[#DC2626]">{errors.regionCountry}</p>
                )}
              </div>

              {/* Primary interest */}
              <div>
                <label className="block text-[12px] font-bold text-[#0F1F4E] mb-3">
                  Primary interest <span style={{ color: "#DC2626" }}>*</span>
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {INTEREST_OPTIONS.map((option) => (
                    <div key={option.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={option.id}
                        name={option.id}
                        checked={formData.primaryInterest.includes(option.id)}
                        onChange={handleChange}
                        className="h-4 w-4 rounded cursor-pointer"
                        style={{ accentColor: ACCENT }}
                      />
                      <label
                        htmlFor={option.id}
                        className="ml-2.5 text-[13px] text-[#0F1F4E] cursor-pointer"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.primaryInterest && (
                  <p className="mt-1 text-[11px] text-[#DC2626]">{errors.primaryInterest}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                  Message <span className="text-[#8A93A6]">(optional)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your clinic network and goals (no PHI, prescriptions, or exact stock)."
                  rows={4}
                  className="clinic-networks-input w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors duration-200 resize-none"
                  style={{ borderColor: "#E7EAF1" }}
                />
              </div>

              {/* Consent */}
              <div className="flex items-start gap-2.5">
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded cursor-pointer shrink-0"
                  style={{ accentColor: ACCENT }}
                />
                <label htmlFor="consent" className="text-[12px] leading-relaxed text-[#5B6478]">
                  I consent to be contacted about ZoikoMeds enterprise solutions and acknowledge the{" "}
                  <a href="#" className="font-semibold" style={{ color: ACCENT }}>
                    privacy notice
                  </a>
                  . <span style={{ color: "#DC2626" }}>*</span>
                </label>
              </div>
              {errors.consent && (
                <p className="text-[11px] text-[#DC2626]">{errors.consent}</p>
              )}

              {/* Buttons */}
              <div className="flex flex-col gap-3 sm:flex-row pt-2">
                <button
                  type="submit"
                  className="rounded-lg px-5 py-3 text-[13px] font-bold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(19,165,148,0.45)]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Request a Clinic Network Briefing
                </button>
                <button
                  type="button"
                  className="rounded-lg border px-5 py-3 text-[13px] font-bold text-[#0F1F4E] transition-all duration-250 ease-out hover:-translate-y-0.5 hover:border-[#13A594] hover:text-[#13A594]"
                  style={{ borderColor: "#E7EAF1" }}
                >
                  Talk to Enterprise Sales
                </button>
              </div>

              {/* Disclaimer */}
              <p className="flex items-start gap-1.5 text-[11px] leading-relaxed text-[#8A93A6]">
                <InfoIcon />
                <span>
                  A ZoikoMeds representative will review your clinic network needs and follow up. Not medical
                  advice, dispensing, or a pharmacy service — not PHI, prescriptions, or exact stock.
                </span>
              </p>
            </form>
            </div>
          </Reveal>

          {/* ── Sidebar ── */}
          <Reveal index={4} active={mounted}>
            <div
              className="flex h-full flex-col rounded-2xl border p-6 sm:p-7"
              style={{
                backgroundColor: "#0B1530",
                borderColor: "rgba(19,165,148,0.3)",
              }}
            >
              <h3 className="text-[15px] font-bold text-white mb-5">
                Enterprise foundations
              </h3>
              <div className="space-y-4">
                {SIDEBAR_ITEMS.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 h-5 w-5 shrink-0 flex-none"
                      style={{ color: ACCENT }}
                    >
                      <path
                        d="M3 8.5l3 3 7-7"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex-1">
                      <p className="text-[13px] font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-[#AEB6C9]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>

      </div>

      <style>{`
        .clinic-networks-input:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(19, 165, 148, 0.12);
          border-color: ${ACCENT};
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0 text-[#8A93A6]">
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
        animation: active ? `clinicNetworksRequestBriefingFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes clinicNetworksRequestBriefingFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}