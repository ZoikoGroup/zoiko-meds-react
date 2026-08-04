"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * InventoryUploadGetStartedSection
 * "Start with the right inventory signal path."
 *
 * Layout: centred header + 3-column path cards + contact form card below
 *
 * Brand accent: #0FAA87
 */

const ACCENT = "#0FAA87";

const PATHS = [
  {
    icon: "home",
    title: "Independent pharmacy setup",
    description:
      "Single-location pharmacies using portal updates or simple signal controls.",
    cta: "Start Portal Setup",
    href: "/pharmacy-portal",
  },
  {
    icon: "branch",
    title: "Pharmacy group setup",
    description:
      "Multi-location operators needing branch controls, secure files, PMS/POS integration, or governance review.",
    cta: "Request Chain Integration",
    href: "/request-a-briefing",
  },
  {
    icon: "code",
    title: "Technical integration review",
    description:
      "IT teams, PMS/POS vendors, API teams, and structured-feed implementation teams.",
    cta: "Discuss API Integration",
    href: "/api-access",
  },
] as const;

const PHARMACY_TYPES = [
  "Independent pharmacy",
  "Pharmacy chain / group",
  "Hospital outpatient pharmacy",
  "Clinic-based pharmacy",
  "Specialty pharmacy",
  "PMS/POS vendor",
  "Technology partner",
  "Other",
];

const SETUP_INTERESTS = [
  "Portal updates",
  "Secure file exchange",
  "PMS/POS integration",
  "API integration",
  "Not sure yet",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormErrors = {
  email?: string;
  name?: string;
  org?: string;
  pharmacyType?: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function InventoryUploadGetStartedSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    email: "",
    name: "",
    org: "",
    pharmacyType: "",
    setupInterest: "",
    note: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    if (status === "success" && successRef.current) {
      successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setMounted(true); observer.disconnect(); }
      },
      { threshold: 0.06 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: FormErrors = {};
    if (!form.email.trim()) {
      nextErrors.email = "Work email address is required.";
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid work email address.";
    }

    if (!form.name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!form.org.trim()) {
      nextErrors.org = "Pharmacy or organization name is required.";
    }

    if (!form.pharmacyType) {
      nextErrors.pharmacyType = "Please select a pharmacy type.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    setServerError("");

    try {
      // Send form payload to backend REST API route for email dispatch via GoDaddy SMTP & DB storage
      const res = await fetch("/api/inventory-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit request.");
      }

      setStatus("success");
      setForm({
        email: "",
        name: "",
        org: "",
        pharmacyType: "",
        setupInterest: "",
        note: "",
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed.";
      setServerError(msg);
      setStatus("error");
    }
  }

  return (
    <section ref={ref} id="signal-setup" className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mx-auto max-w-xl text-center">
          <Reveal index={0} active={mounted}>
            <h2 className="text-[1.9rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
              Start with the{" "}
              <span style={{ color: ACCENT }}>right inventory signal path.</span>
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-[#5B6478]">
              Each path maps to a different level of pharmacy readiness — choose
              the one that fits.
            </p>
          </Reveal>
        </div>

        {/* ── 3-column path cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
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
                <h3 className="mt-4 text-[14px] font-bold text-[#0F1F4E]">{p.title}</h3>
                <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
                  {p.description}
                </p>
                <Link
                  href={p.href}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
                >
                  {p.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Contact form card ── */}
        <Reveal index={6} active={mounted}>
          <div className="mt-6 rounded-2xl border border-[#E7EAF1] bg-white p-6 sm:p-8">
            <h3 className="text-[15px] font-bold text-[#0F1F4E]">
              Discuss inventory signal setup
            </h3>
            <p className="mt-1 text-[13px] leading-relaxed text-[#5B6478]">
              Tell us about your pharmacy and connection needs. No inventory
              files, exact stock, or credentials — setup happens later in the
              secure portal.
            </p>

            <form onSubmit={handleSubmit} noValidate id="signal-setup" className="mt-5 flex flex-col gap-4">
              {/* Work email */}
              <FormField label="Work email" required error={errors.email}>
                <input
                  type="email"
                  placeholder="you@yourpharmacy.com"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: undefined });
                    if (status !== "idle") setStatus("idle");
                  }}
                  className={`w-full rounded-xl border bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors ${
                    errors.email ? "border-[#E0635C]" : "border-[#D8DCE8] focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                  }`}
                />
              </FormField>

              {/* Full name */}
              <FormField label="Full name" required error={errors.name}>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: undefined });
                    if (status !== "idle") setStatus("idle");
                  }}
                  className={`w-full rounded-xl border bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors ${
                    errors.name ? "border-[#E0635C]" : "border-[#D8DCE8] focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                  }`}
                />
              </FormField>

              {/* Pharmacy / org name */}
              <FormField label="Pharmacy or organization name" required error={errors.org}>
                <input
                  type="text"
                  placeholder="e.g. Riverside Community Pharmacy"
                  value={form.org}
                  onChange={(e) => {
                    setForm({ ...form, org: e.target.value });
                    if (errors.org) setErrors({ ...errors, org: undefined });
                    if (status !== "idle") setStatus("idle");
                  }}
                  className={`w-full rounded-xl border bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors ${
                    errors.org ? "border-[#E0635C]" : "border-[#D8DCE8] focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                  }`}
                />
              </FormField>

              {/* Pharmacy type */}
              <FormField label="Pharmacy type" required error={errors.pharmacyType}>
                <div className="relative">
                  <select
                    value={form.pharmacyType}
                    onChange={(e) => {
                      setForm({ ...form, pharmacyType: e.target.value });
                      if (errors.pharmacyType) setErrors({ ...errors, pharmacyType: undefined });
                      if (status !== "idle") setStatus("idle");
                    }}
                    className={`w-full appearance-none rounded-xl border bg-white px-4 py-2.5 text-[13.5px] outline-none transition-colors ${
                      errors.pharmacyType ? "border-[#E0635C]" : "border-[#D8DCE8] focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                    }`}
                    style={{ color: form.pharmacyType ? "#0F1F4E" : "#B0B8CC" }}
                  >
                    <option value="" disabled>Select pharmacy type</option>
                    {PHARMACY_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
              </FormField>

              {/* Setup interest (optional) */}
              <FormField label="Setup interest" optional>
                <div className="relative">
                  <select
                    value={form.setupInterest}
                    onChange={(e) => {
                      setForm({ ...form, setupInterest: e.target.value });
                      if (status !== "idle") setStatus("idle");
                    }}
                    className="w-full appearance-none rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                    style={{ color: form.setupInterest ? "#0F1F4E" : "#B0B8CC" }}
                  >
                    <option value="" disabled>Select setup interest</option>
                    {SETUP_INTERESTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown />
                </div>
              </FormField>

              {/* Brief note (optional) */}
              <FormField label="Brief note" optional>
                <textarea
                  placeholder="Anything about your inventory signal or integration need"
                  rows={3}
                  value={form.note}
                  onChange={(e) => {
                    setForm({ ...form, note: e.target.value });
                    if (status !== "idle") setStatus("idle");
                  }}
                  className="w-full resize-none rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                />
              </FormField>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                style={{ backgroundColor: ACCENT }}
              >
                {status === "submitting" ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
                      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Discuss Inventory Signal Setup"
                )}
              </button>

              {/* Form footnote */}
              <p className="text-center text-[11.5px] leading-relaxed text-[#9AA3B5]">
                No inventory files, exact stock, license documents, or
                credentials are collected here. Setup happens later in the
                secure portal.
              </p>

              {/* Success message in green color at down of submission box */}
              {status === "success" && (
                <div ref={successRef} className="mt-2 rounded-xl border border-[#9FE3D3] bg-[#EAFAF4] p-4 text-center text-[13.5px] text-[#00786F]">
                  <div className="flex flex-col items-center justify-center gap-1.5 text-center">
                    <svg className="h-6 w-6 text-[#0FAA87]" viewBox="0 0 20 20" fill="currentColor">
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

              {/* Error message */}
              {status === "error" && (
                <div className="mt-2 rounded-xl border border-[#F87171]/40 bg-[#FEF2F2] p-4 text-[13px] text-[#C5453F]">
                  <p className="flex items-center gap-2 font-medium">
                    <svg className="h-4 w-4 flex-shrink-0 text-[#EF4444]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{serverError || "Something went wrong. Please try again."}</span>
                  </p>
                </div>
              )}
            </form>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FormField wrapper                                                    */
/* ------------------------------------------------------------------ */
function FormField({
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
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-medium text-[#0F1F4E]">
        {label}
        {required && <span className="ml-0.5 text-[#C5453F]">*</span>}
        {optional && (
          <span className="ml-1 font-normal text-[#9AA3B5]">(optional)</span>
        )}
      </label>
      {children}
      {error && <p className="text-[12px] font-medium text-[#C5453F]">{error}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ChevronDown for selects                                              */
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
/*  Icons                                                               */
/* ------------------------------------------------------------------ */
function PathIcon({ name }: { name: "home" | "branch" | "code" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 20, height: 20 } };
  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "branch":
      return (
        <svg {...common}>
          <rect x="4"  y="14" width="4" height="6" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10" y="9"  width="4" height="11" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16" y="4"  width="4" height="16" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M9 8l-4 4 4 4M15 8l4 4-4 4"
            stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
          ? `invGetStartedFadeUp 0.6s ease-out ${index * 80}ms both`
          : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes invGetStartedFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}