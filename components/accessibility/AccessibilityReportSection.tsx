"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const REPORT_CARDS = [
  {
    title: "Accessibility issue report",
    description: "For users who find a page, form, control, search result, or account flow difficult to use.",
    cta: "Report Accessibility Issue",
    filled: true,
    href: "#report-issue",
    icon: (
      <path d="M8 2l6.5 11.5H1.5L8 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Accessible support request",
    description: "For users who need help completing a ZoikoMeds action because of an accessibility barrier.",
    cta: "Request Accessible Support",
    filled: false,
    href: "/request-accessible-support",
    icon: (
      <path d="M3 2.5h2l1 3-1.5 1a8 8 0 004 4l1-1.5 3 1v2c0 .8-.7 1.5-1.5 1.5C6 13.5 2.5 10 2.5 5c0-.8.7-1.5 1.5-1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Product feedback",
    description: "For users reporting recurring usability friction not tied to a single bug.",
    cta: "Send Accessibility Feedback",
    filled: false,
    href: "/accessibility-feedback",
    icon: (
      <path d="M2 3h12v7H6.5L4 12.5V10H2V3z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: "Enterprise accessibility review",
    description: "For procurement, compliance, legal, security, and enterprise accessibility teams.",
    cta: "Request Accessibility Review",
    filled: false,
    href: "/request-accessibility-review",
    icon: (
      <path d="M8 1.5l6 4v3c0 4-2.6 6.5-6 7.5-3.4-1-6-3.5-6-7.5v-3l6-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
] as const;

const ISSUE_CATEGORIES = ["Screen reader", "Keyboard navigation", "Color & contrast", "Focus or error state", "Mobile & touch", "Plain language", "Other"];

interface FormState {
  email: string;
  issueCategory: string;
  pageOrFeature: string;
  description: string;
  assistiveTech: string;
  screenshot: string;
}

const INITIAL_FORM: FormState = {
  email: "",
  issueCategory: "",
  pageOrFeature: "",
  description: "",
  assistiveTech: "",
  screenshot: "",
};

export default function AccessibilityReportSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) nextErrors.email = "Email address is required.";
    else if (!emailPattern.test(form.email.trim())) nextErrors.email = "Enter a valid email address.";

    if (!form.issueCategory) nextErrors.issueCategory = "Select an issue category.";
    if (!form.pageOrFeature.trim()) nextErrors.pageOrFeature = "Page or feature affected is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      // Replace with your real endpoint.
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Report paths block ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">04</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Reporting, Support &amp; Remediation
          </p>
        </Reveal>

        <Reveal index={1} active={mounted}>
          <h2 className="text-[1.9rem] font-extrabold leading-tight sm:text-[2.1rem]">
            <span className="text-[#0F1F4E]">Tell us what is </span>
            <span style={{ color: ACCENT }}>not working.</span>
          </h2>
        </Reveal>

        <Reveal index={2} active={mounted}>
          <p className="mt-3 text-[13.5px] leading-relaxed text-[#5B6478]">
            Reporting is short, safe, and supportive — and never asks for medical information.
          </p>
        </Reveal>

        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {REPORT_CARDS.map((card, i) => (
            <Reveal key={card.title} index={3 + i} active={mounted}>
              <div className="flex h-full flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)]">
                <div className="mb-3 flex items-start gap-3">
                  <div
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "rgba(15,170,135,0.12)", color: ACCENT }}
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                      {card.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-[#0F1F4E]">{card.title}</h3>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-[#5B6478]">
                      {card.description}
                    </p>
                  </div>
                </div>

                <a
                  href={card.href}
                  className={
                    card.filled
                      ? "mt-4 inline-flex w-fit items-center justify-center rounded-lg px-4 py-2.5 text-[12.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90"
                      : "mt-4 inline-flex w-fit items-center justify-center rounded-lg border border-[#E7EAF1] px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-colors duration-150 hover:border-[#0F1F4E]"
                  }
                  style={card.filled ? { backgroundColor: ACCENT } : undefined}
                >
                  {card.cta}
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Report an accessibility issue form ── */}
        <Reveal index={7} active={mounted}>
          <h2 className="mt-16 text-[1.9rem] font-extrabold leading-tight sm:text-[2.1rem]">
            <span className="text-[#0F1F4E]">Report an </span>
            <span style={{ color: ACCENT }}>accessibility issue</span>
          </h2>
        </Reveal>

        <Reveal index={8} active={mounted}>
          <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-[#5B6478]">
            Just enough to reproduce and fix the barrier — nothing sensitive.
          </p>
        </Reveal>

        <Reveal index={9} active={mounted}>
          <div id="report-issue" className="mt-7 rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.06)] sm:p-8">

            {status === "success" ? (
              <div className="flex items-start gap-3 rounded-xl border border-[#0FAA87]/25 bg-[#0FAA87]/5 p-4">
                <svg className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                  <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="text-[13.5px] font-semibold text-[#0F1F4E]">Report received.</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#5B6478]">
                    Thank you for letting us know. Our accessibility team will follow up at the
                    email you provided.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Email address" required error={errors.email}>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@email.com"
                      className={inputClass(!!errors.email)}
                    />
                  </Field>

                  <Field label="Issue category" required error={errors.issueCategory}>
                    <select
                      value={form.issueCategory}
                      onChange={(e) => updateField("issueCategory", e.target.value)}
                      className={inputClass(!!errors.issueCategory)}
                    >
                      <option value="">Select category</option>
                      {ISSUE_CATEGORIES.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Page or feature affected" required error={errors.pageOrFeature}>
                  <input
                    type="text"
                    value={form.pageOrFeature}
                    onChange={(e) => updateField("pageOrFeature", e.target.value)}
                    placeholder="e.g. Search Medicines, account settings, cookie settings"
                    className={inputClass(!!errors.pageOrFeature)}
                  />
                </Field>

                <Field label="Brief description of the barrier" optional>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="What happened, and what you expected (no medical, prescription, or personal health details)."
                    rows={4}
                    className={inputClass(false) + " resize-none"}
                  />
                </Field>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Assistive technology or device" optional>
                    <input
                      type="text"
                      value={form.assistiveTech}
                      onChange={(e) => updateField("assistiveTech", e.target.value)}
                      placeholder="e.g. VoiceOver on iPhone, NVDA on Windows"
                      className={inputClass(false)}
                    />
                  </Field>

                  <Field label="Screenshot or file" optional>
                    <input
                      type="text"
                      value={form.screenshot}
                      onChange={(e) => updateField("screenshot", e.target.value)}
                      placeholder="Optional — not required to report"
                      className={inputClass(false)}
                    />
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-[13.5px] font-semibold text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-70"
                  style={{ backgroundColor: ACCENT }}
                >
                  {status === "submitting" && (
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.6" strokeOpacity="0.3" />
                      <path d="M14.5 8a6.5 6.5 0 00-6.5-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  )}
                  {status === "submitting" ? "Submitting…" : "Report Accessibility Issue"}
                </button>

                {status === "error" && (
                  <p className="text-[12.5px] font-medium text-[#E5484D]">
                    Something went wrong. Please try again.
                  </p>
                )}

                <p className="flex items-start gap-2 text-[11.5px] leading-relaxed text-[#9AA1B4]">
                  <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: ACCENT }} viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M8 7.25v4M8 5.1v.05" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  Please don&apos;t include medicine names, diagnosis, symptoms, prescription
                  images, insurance IDs, exact location, PHI, passwords, or account secrets.
                  Attachments are optional.
                </p>
              </form>
            )}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Field                                                                */
/* ------------------------------------------------------------------ */
function Field({
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
    <div>
      <label className="mb-1.5 block text-[12.5px] font-semibold text-[#0F1F4E]">
        {label}
        {required && <span className="ml-0.5 text-[#E5484D]">*</span>}
        {optional && <span className="ml-1 font-normal text-[#9AA1B4]">(optional)</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-[12px] font-medium text-[#E5484D]">{error}</p>}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-lg border bg-[#F8FAFC] px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder:text-[#9AA1B4]",
    "transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0",
    hasError
      ? "border-[#E5484D] focus:ring-[#E5484D]/30"
      : "border-[#E7EAF1] focus:border-[#0FAA87] focus:ring-[#0FAA87]/20",
  ].join(" ");
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                               */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `accessibilityReportFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes accessibilityReportFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}