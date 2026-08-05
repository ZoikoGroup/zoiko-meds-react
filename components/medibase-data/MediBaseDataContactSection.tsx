"use client";

import { useEffect, useRef, useState } from "react";
import { internalApi } from "@/lib/config";


const ACCENT = "#0FAA87";

const ORG_TYPES = [
  "Health system / hospital",
  "Digital health platform",
  "Pharmacy operator",
  "Pharmaceutical / manufacturer",
  "Payer / insurance",
  "Government / public health",
  "Research / academic",
  "Technology / integration partner",
  "Other",
];

const PRIMARY_INTERESTS = [
  "Medicine identity & normalization",
  "API / ZoikoAvail™ integration",
  "Enterprise data licensing",
  "Shortage intelligence",
  "Jurisdictional classification",
  "Medicine matching & search",
  "Other",
];

export default function MediBaseDataContactSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    email: "", name: "", org: "", orgType: "", interest: "", note: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; name?: string; org?: string; orgType?: string }>({});
  const successRef = useRef<HTMLDivElement>(null);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors: { email?: string; name?: string; org?: string; orgType?: string } = {};
    if (!form.email.trim()) {
      newErrors.email = "Work email is required.";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }
    if (!form.org.trim()) {
      newErrors.org = "Organization name is required.";
    }
    if (!form.orgType.trim()) {
      newErrors.orgType = "Organization type is required.";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch(internalApi("medibase-data"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: "MediBase™ Data Briefing",
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

  const inputCls = (hasErr?: boolean) =>
    `w-full rounded-xl border ${
      hasErr ? "border-[#DC2626]" : "border-[#D8DCE8]"
    } bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15`;

  return (
    <section id="request" ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">07</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Request MediBase™ Data Briefing
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.3rem]">
            Start a{" "}
            <span style={{ color: ACCENT }}>data conversation.</span>
          </h2>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
            Tell us where you fit and what you need. We route your request to
            the right data, API, governance, or commercial team.
          </p>
        </Reveal>

        {/* ── Form card ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-8 rounded-2xl border border-[#E7EAF1] bg-white p-7 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)] sm:p-8">

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

              {/* Row 1: Work email + Full name */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Work email" required error={errors.email}>
                  <input
                    type="email"
                    placeholder="name@organization.org"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={inputCls(!!errors.email)}
                  />
                </FormField>
                <FormField label="Full name" required error={errors.name}>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    className={inputCls(!!errors.name)}
                  />
                </FormField>
              </div>

              {/* Row 2: Organization name + Organization type */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Organization name" required error={errors.org}>
                  <input
                    type="text"
                    placeholder="Organization"
                    value={form.org}
                    onChange={(e) => {
                      setForm({ ...form, org: e.target.value });
                      if (errors.org) setErrors({ ...errors, org: undefined });
                    }}
                    className={inputCls(!!errors.org)}
                  />
                </FormField>
                <FormField label="Organization type" required error={errors.orgType}>
                  <div className="relative">
                    <select
                      value={form.orgType}
                      onChange={(e) => {
                        setForm({ ...form, orgType: e.target.value });
                        if (errors.orgType) setErrors({ ...errors, orgType: undefined });
                      }}
                      className={inputCls(!!errors.orgType) + " appearance-none"}
                      style={{ color: form.orgType ? "#0F1F4E" : "#B0B8CC" }}
                    >
                      <option value="" disabled>Select type</option>
                      {ORG_TYPES.map((t) => (
                        <option key={t} value={t} style={{ color: "#0F1F4E" }}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </div>
                </FormField>
              </div>

              {/* Row 3: Primary interest (optional) — half width */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Primary interest" optional>
                  <div className="relative">
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className={inputCls() + " appearance-none"}
                      style={{ color: form.interest ? "#0F1F4E" : "#B0B8CC" }}
                    >
                      <option value="" disabled>Select interest</option>
                      {PRIMARY_INTERESTS.map((s) => (
                        <option key={s} value={s} style={{ color: "#0F1F4E" }}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </div>
                </FormField>
                {/* Empty second column spacer */}
                <div className="hidden sm:block" />
              </div>

              {/* Row 4: Brief note (optional) — full width */}
              <FormField label="Brief note" optional>
                <textarea
                  placeholder="Your data, matching, integration, or licensing need."
                  rows={4}
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className={inputCls() + " resize-none"}
                />
              </FormField>

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[14px] font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
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
                  "Request MediBase™ Data Briefing"
                )}
              </button>

              {/* Footnote */}
              <p className="flex items-start gap-2 text-[11.5px] leading-relaxed text-[#9AA3B5]">
                <InfoIcon />
                <span>
                  Don&apos;t include patient data, PHI, prescription images, exact
                  pharmacy stock, API secrets, or unlicensed third-party
                  datasets in this form.
                </span>
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
                    MediBase™ Data Briefing Request Submitted
                  </h4>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#056059]">
                    Thank you! Your MediBase™ data briefing request has been received. Our team will contact you soon.
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
  label, required, optional, error, children,
}: {
  label: string; required?: boolean; optional?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[12.5px] font-medium text-[#0F1F4E]">
          {label}
          {required && <span className="ml-0.5 text-[#E05252]">*</span>}
          {optional && <span className="ml-1 font-normal text-[#9AA3B5]">(optional)</span>}
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
/*  Info icon                                                            */
/* ------------------------------------------------------------------ */
function InfoIcon() {
  return (
    <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#9AA3B5]" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 7v4M8 5.2v.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `mediContactFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}    
      <style>{`
        @keyframes mediContactFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}