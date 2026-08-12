"use client";

import { useEffect, useRef, useState } from "react";
import { internalApi } from "@/lib/config";
import Link from "next/link";
import { validateEmail, scrollToFirstError } from "@/lib/validation";


const ACCENT = "#0FAA87";

const PATHS = [
  {
    icon: "person",
    title: "Individual provider or care team",
    description:
      "Clinicians, nurses, care coordinators, and support staff exploring availability support.",
    cta: "Explore Provider Workflows",
    ctaFilled: false,
    href: "/provider-support",
  },
  {
    icon: "building",
    title: "Clinic or health system",
    description:
      "Provider organizations evaluating care-team access, discharge support, or integration needs.",
    cta: "Request Provider Briefing",
    ctaFilled: true,
    href: "#request",
  },
  {
    icon: "code",
    title: "Digital health or integration team",
    description:
      "Telehealth, care navigation, patient-support, or workflow platforms evaluating integration.",
    cta: "Discuss Workflow Integration",
    ctaFilled: false,
    href: "/integrations",
  },
  {
    icon: "search",
    title: "Patient or caregiver",
    description:
      "People checking availability for themselves or someone they support.",
    cta: "Search Medicines",
    ctaFilled: false,
    href: "/searchmed",
  },
] as const;

const ORG_TYPES = [
  "Individual clinician / care team",
  "Primary care clinic",
  "Hospital or health system",
  "Outpatient / specialist clinic",
  "Telehealth platform",
  "Digital health / integration team",
  "Patient support organization",
  "Other",
];

const PRIMARY_INTERESTS = [
  "Discharge planning workflows",
  "Chronic medication support",
  "Shortage-aware guidance",
  "Care coordination tools",
  "EHR / workflow integration",
  "Patient-facing availability",
  "Other",
];

export default function ProviderOverviewGetStartedSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    email: "",
    name: "",
    org: "",
    orgType: "",
    interest: "",
    note: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; name?: string; org?: string }>({});
  const successRef = useRef<HTMLDivElement>(null);

  const validate = () => {
    const newErrors: { email?: string; name?: string; org?: string } = {};
    const emailCheck = validateEmail(form.email);
    if (!emailCheck.isValid) {
      newErrors.email = emailCheck.error!;
    }
    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }
    if (!form.org.trim()) {
      newErrors.org = "Organization name is required.";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstKey = newErrors.email ? "email" : Object.keys(newErrors)[0];
      scrollToFirstError(firstKey);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch(internalApi("provider-overview"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: "Provider Briefing",
          fullName: form.name.trim(),
          workEmail: form.email.trim(),
          organization: form.org.trim(),
          note: [
            form.orgType ? `Organization Type: ${form.orgType}` : "",
            form.interest ? `Primary Interest: ${form.interest}` : "",
            form.note ? `Note: ${form.note.trim()}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {}

      if (res.ok && (data.success || res.status === 200)) {
        setStatus("success");
        setForm({
          email: "",
          name: "",
          org: "",
          orgType: "",
          interest: "",
          note: "",
        });
        setTimeout(() => {
          if (successRef.current) {
            successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit briefing request. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mx-auto max-w-xl text-center">
          <Reveal index={0} active={mounted}>
            <h2 className="text-[1.9rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
              Find the{" "}
              <span style={{ color: ACCENT }}>right provider path.</span>
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-[#5B6478]">
              Individual clinicians, provider organizations, digital health
              teams, and patients — each routed to the right next step.
            </p>
          </Reveal>
        </div>

        {/* ── 4-column path cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PATHS.map((p, i) => (
            <Reveal key={p.title} index={i + 2} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9FE3D3] hover:shadow-[0_10px_28px_-14px_rgba(15,170,135,0.18)]">
                {/* Icon */}
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "#1A2E5A", color: "#6EE7D0" }}
                >
                  <PathIcon name={p.icon} />
                </div>

                <h3 className="mt-4 text-[13.5px] font-bold text-[#0F1F4E]">
                  {p.title}
                </h3>
                <p className="mt-1.5 flex-1 text-[12px] leading-relaxed text-[#5B6478]">
                  {p.description}
                </p>

                <div className="mt-4">
                  {p.ctaFilled ? (
                    <Link
                      href={p.href}
                      className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-[12px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {p.cta}
                    </Link>
                  ) : (
                    <Link
                      href={p.href}
                      className="inline-flex w-full items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-4 py-2.5 text-[12px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
                    >
                      {p.cta}
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Centred form card ── */}
        <Reveal index={7} active={mounted}>
          <div id="request" className="mx-auto mt-8 max-w-lg rounded-2xl border border-[#E7EAF1] bg-white p-7 sm:p-8">
            <h3 className="text-[15px] font-bold text-[#0F1F4E]">
              Request a provider briefing
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-[#5B6478]">
              Tell us about your organization. No patient data, diagnosis,
              prescriptions, or clinical records — this is a provider
              orientation request.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-4">
              {/* Work email */}
              <FormField label="Work email" error={errors.email}>
                <input
                  type="email"
                  placeholder="you@yourorganization.org"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  className={`w-full rounded-xl border ${
                    errors.email ? "border-[#DC2626]" : "border-[#D8DCE8]"
                  } bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15`}
                />
              </FormField>

              {/* Full name */}
              <FormField label="Full name" error={errors.name}>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  className={`w-full rounded-xl border ${
                    errors.name ? "border-[#DC2626]" : "border-[#D8DCE8]"
                  } bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15`}
                />
              </FormField>

              {/* Organization name */}
              <FormField label="Organization name" error={errors.org}>
                <input
                  type="text"
                  placeholder="e.g. Riverside Health Clinic"
                  value={form.org}
                  onChange={(e) => {
                    setForm({ ...form, org: e.target.value });
                    if (errors.org) setErrors({ ...errors, org: undefined });
                  }}
                  className={`w-full rounded-xl border ${
                    errors.org ? "border-[#DC2626]" : "border-[#D8DCE8]"
                  } bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15`}
                />
              </FormField>

              {/* Organization type */}
              <FormField label="Organization type">
                <div className="relative">
                  <select
                    value={form.orgType}
                    onChange={(e) => setForm({ ...form, orgType: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                  >
                    <option value="" disabled style={{ color: "#0F1F4E", backgroundColor: "#FFFFFF" }}>Select organization type</option>
                    {ORG_TYPES.map((t) => (
                      <option key={t} value={t} style={{ color: "#0F1F4E", backgroundColor: "#FFFFFF" }}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
              </FormField>

              {/* Primary interest (optional) */}
              <FormField label="Primary interest" optional>
                <div className="relative">
                  <select
                    value={form.interest}
                    onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                  >
                    <option value="" disabled style={{ color: "#0F1F4E", backgroundColor: "#FFFFFF" }}>Select primary interest</option>
                    {PRIMARY_INTERESTS.map((s) => (
                      <option key={s} value={s} style={{ color: "#0F1F4E", backgroundColor: "#FFFFFF" }}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
              </FormField>

              {/* Brief note (optional) */}
              <FormField label="Brief note" optional>
                <textarea
                  placeholder="Provider workflow, patient-support need, discharge workflow, or integration interest"
                  rows={3}
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="w-full resize-none rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                />
              </FormField>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: ACCENT }}
              >
                {submitting ? (
                  <>
                    <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Request Provider Briefing"
                )}
              </button>

              {/* Form footnote */}
              <p className="text-center text-[11.5px] leading-relaxed text-[#9AA3B5]">
                No diagnosis, symptoms, prescriptions, insurance, or patient
                identifiers are collected here. ZoikoMeds is not a clinical,
                prescribing, or dispensing system.
              </p>
            </form>

            {/* Success Confirmation Message below the form */}
            {status === "success" && (
              <div
                ref={successRef}
                className="mt-5 rounded-xl border border-[#9FE3D3] bg-[#EAFAF4] p-5 text-center transition-all duration-300"
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#13A594]/15 text-[#13A594]">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h4 className="mt-2 text-[15px] font-bold text-[#00786F]">
                    Provider Briefing Request Submitted
                  </h4>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#056059]">
                    Your request has been submitted. A ZoikoMeds representative will contact you soon
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {status === "error" && (
              <div className="mt-5 rounded-xl border border-[#F87171]/40 bg-[#FEF2F2] p-4 text-center text-[13px] text-[#C5453F]">
                <p className="font-medium">{errorMessage || "Something went wrong. Please try again."}</p>
              </div>
            )}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FormField                                                            */
/* ------------------------------------------------------------------ */
function FormField({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[12.5px] font-medium text-[#0F1F4E]">
          {label}
          {optional && (
            <span className="ml-1 font-normal text-[#9AA3B5]">(optional)</span>
          )}
        </label>
        {error && (
          <span className="text-[11.5px] font-medium text-[#DC2626]">{error}</span>
        )}
      </div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ChevronDown                                                          */
/* ------------------------------------------------------------------ */
function ChevronDown() {
  return (
    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9AA3B5]">
      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Path icons — dark navy badge style                                   */
/* ------------------------------------------------------------------ */
function PathIcon({ name }: { name: "person" | "building" | "code" | "search" }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 20, height: 20 } };
  switch (name) {
    case "person":
      return (
        <svg {...c}>
          <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4.5 20c0-4.14 3.36-7.5 7.5-7.5s7.5 3.36 7.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "building":
      return (
        <svg {...c}>
          <rect x="3" y="7" width="18" height="14" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M3 11l9-8 9 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="10" y="15" width="4" height="6" rx="0.6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "code":
      return (
        <svg {...c}>
          <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "search":
      return (
        <svg {...c}>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16.5 16.5l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div
      style={{
        opacity: active ? undefined : 0,
        animation: active
          ? `providerGetFadeUp 0.6s ease-out ${index * 80}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes providerGetFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}