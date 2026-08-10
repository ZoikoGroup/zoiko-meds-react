"use client";

import { useEffect, useRef, useState } from "react";
import { internalApi } from "@/lib/config";
import Link from "next/link";
import { validateEmail, scrollToFirstError } from "@/lib/validation";

const ACCENT = "#0FAA87";

const INQUIRY_TYPES = [
  "General press inquiry",
  "Interview request",
  "Data / fact verification",
  "Embargoed story",
  "Partnership announcement",
  "Crisis / urgent inquiry",
  "Other",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PressContactSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    email: "", name: "", outlet: "", inquiryType: "", deadline: "", message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; name?: string; outlet?: string; inquiryType?: string; deadline?: string }>({});
  const successRef = useRef<HTMLDivElement>(null);

  const validate = () => {
    const newErrors: { email?: string; name?: string; outlet?: string; inquiryType?: string; deadline?: string } = {};
    const emailCheck = validateEmail(form.email);
    if (!emailCheck.isValid) {
      newErrors.email = emailCheck.error!;
    }
    if (!form.name.trim()) {
      newErrors.name = "Full name is required.";
    }
    if (!form.outlet.trim()) {
      newErrors.outlet = "Outlet or organization is required.";
    }
    if (!form.inquiryType.trim()) {
      newErrors.inquiryType = "Inquiry type is required.";
    }
    if (!form.deadline.trim()) {
      newErrors.deadline = "Deadline is required.";
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
      const res = await fetch(internalApi("briefing-request"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: `Media Inquiry (${form.inquiryType})`,
          fullName: form.name.trim(),
          workEmail: form.email.trim(),
          organization: form.outlet.trim(),
          note: [
            `Deadline: ${form.deadline.trim()}`,
            form.message ? `Message: ${form.message.trim()}` : "",
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
          outlet: "",
          inquiryType: "",
          deadline: "",
          message: "",
        });
        setTimeout(() => {
          if (successRef.current) {
            successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit media inquiry. Please try again.");
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
    } bg-white px-4 py-2.5 text-[13.5px] font-medium text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15`;

  return (
    <section id="contact" ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">04</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Media Inquiry &amp; Spokesperson Routing
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Contact the </span>
            <span style={{ color: ACCENT }}>media team.</span>
          </h2>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
            We route by topic and deadline to the right communications,
            legal, product, enterprise, or leadership team.
          </p>
        </Reveal>

        {/* ── Form card ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-8 rounded-2xl border border-[#E7EAF1] bg-white p-7 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)] sm:p-8">

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

              {/* Row 1: Work/media email + Full name */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Work / media email" required error={errors.email}>
                  <input
                    type="email"
                    placeholder="name@outlet.com"
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

              {/* Row 2: Outlet or organization + Inquiry type */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Outlet or organization" required error={errors.outlet}>
                  <input
                    type="text"
                    placeholder="Publication or organization"
                    value={form.outlet}
                    onChange={(e) => {
                      setForm({ ...form, outlet: e.target.value });
                      if (errors.outlet) setErrors({ ...errors, outlet: undefined });
                    }}
                    className={inputCls(!!errors.outlet)}
                  />
                </FormField>
                <FormField label="Inquiry type" required error={errors.inquiryType}>
                  <div className="relative">
                    <select
                      value={form.inquiryType}
                      onChange={(e) => {
                        setForm({ ...form, inquiryType: e.target.value });
                        if (errors.inquiryType) setErrors({ ...errors, inquiryType: undefined });
                      }}
                      className={inputCls(!!errors.inquiryType) + " appearance-none cursor-pointer"}
                      style={{ color: form.inquiryType ? "#0F1F4E" : "#B0B8CC", backgroundColor: "#ffffff" }}
                    >
                      <option value="" disabled style={{ color: "#B0B8CC", backgroundColor: "#ffffff" }}>Select type</option>
                      {INQUIRY_TYPES.map((t) => (
                        <option key={t} value={t} style={{ color: "#0F1F4E", backgroundColor: "#ffffff" }}>{t}</option>
                      ))}
                    </select>
                    <ChevronDown />
                  </div>
                </FormField>
              </div>

              {/* Row 3: Deadline + Brief message (optional) */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Deadline" required error={errors.deadline}>
                  <input
                    type="text"
                    placeholder="e.g. Today 5pm ET, or a date"
                    value={form.deadline}
                    onChange={(e) => {
                      setForm({ ...form, deadline: e.target.value });
                      if (errors.deadline) setErrors({ ...errors, deadline: undefined });
                    }}
                    className={inputCls(!!errors.deadline)}
                  />
                </FormField>
                <FormField label="Brief message or topic" optional>
                  <input
                    type="text"
                    placeholder="What you're working on"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={inputCls()}
                  />
                </FormField>
              </div>

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
                  "Contact Media Team"
                )}
              </button>

              {/* Footnote */}
              <p className="flex items-start gap-2 text-[11.5px] leading-relaxed text-[#9AA3B5]">
                <InfoIcon />
                <span>
                  Don&apos;t include patient identifiers, prescription info,
                  pharmacy stock, confidential partner data, credentials, PHI,
                  or sensitive security details in this form.
                </span>
              </p>

            </form>

            {/* Success Confirmation Message */}
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
                    Media Inquiry Submitted
                  </h4>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#056059]">
                    Thank you! Your media inquiry has been submitted. Our communications team will contact you soon.
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
    <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `pressContactFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes pressContactFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}