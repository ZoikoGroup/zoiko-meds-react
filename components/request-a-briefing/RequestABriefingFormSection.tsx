"use client";

import { useEffect, useRef, useState } from "react";
import { internalApi } from "@/lib/config";
import { validateEmail, validatePhone, sanitizePhoneInput, scrollToFirstError } from "@/lib/validation";

const ACCENT = "#0FAA87";

const WHAT_TO_KNOW = [
  {
    id: "purpose",
    title: "Purpose",
    description:
      "Briefings are for qualified organizational, healthcare, pharmacy, wholesale, public-health, and enterprise stakeholders.",
  },
  {
    id: "boundary",
    title: "Boundary",
    description:
      "ZoikoMeds does not sell, prescribe, dispense, or provide medical advice.",
  },
  {
    id: "privacy",
    title: "Privacy",
    description:
      "Information submitted here is used to review and respond to the briefing request.",
  },
  {
    id: "governance",
    title: "Governance",
    description:
      "Enterprise intelligence discussions are handled through role-appropriate, compliance-conscious workflows.",
  },
  {
    id: "whats-next",
    title: "What's next",
    description:
      "A representative will review the request and respond with the appropriate briefing path.",
  },
] as const;

const ORGANIZATION_TYPES = [
  "Healthcare Provider",
  "Pharmacy",
  "Wholesale / Distributor",
  "Public Health / Government",
  "Enterprise / Technology Partner",
  "Other",
];

const PREFERRED_FORMATS = ["Call", "Video Briefing", "Written Summary", "Either / No preference"];

const TIME_ZONES = ["IST (India)", "GMT/UTC", "EST (US)", "PST (US)", "CET (Europe)"];

export default function RequestABriefingFormSection() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsent] = useState(false);
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
    role: "",
    orgType: "",
    country: "",
    objective: "",
    format: "",
    timeZone: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    if (!form.role.trim()) newErrors.role = "Role is required.";
    if (!form.orgType) newErrors.orgType = "Please select an organization type.";
    if (!form.country.trim()) newErrors.country = "Country is required.";
    if (!form.objective) newErrors.objective = "Please select a briefing objective.";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || submitting) return;

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
          briefingType: `Executive Briefing (${form.orgType || "General"})`,
          fullName: form.fullName.trim(),
          workEmail: form.workEmail.trim(),
          organization: form.organization.trim(),
          jobTitle: form.role.trim(),
          phone: form.phone.trim(),
          note: `Country: ${form.country}\nObjective: ${form.objective}\nFormat: ${form.format}\nTimeZone: ${form.timeZone}`,
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {}

      if (res.ok && (data.success || res.status === 200)) {
        setStatus("success");
        setForm({
          fullName: "",
          workEmail: "",
          phone: "",
          organization: "",
          role: "",
          orgType: "",
          country: "",
          objective: "",
          format: "",
          timeZone: "",
        });
        setConsent(false);
      } else {
        if (data.errors) {
          setErrors(data.errors);
        }
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit request.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="start-briefing" ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">02</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Your Briefing Request
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Tell us how to route </span>
            <span style={{ color: ACCENT }}>your briefing.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[#5B6478]">
            We collect only what&apos;s needed to review and respond. No account, prescription, or
            medical information required.
          </p>
        </Reveal>

        {/* ── Content grid ── */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* ── Form card ── */}
          <Reveal index={3} active={mounted}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border bg-white p-6 sm:p-8"
              style={{ borderColor: "#E7EAF1", boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)" }}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" required error={errors.fullName}>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className={`briefing-input ${errors.fullName ? "!border-[#DC2626]" : ""}`}
                  />
                </Field>

                <Field label="Work email" required error={errors.workEmail}>
                  <input
                    type="email"
                    name="workEmail"
                    value={form.workEmail}
                    onChange={handleChange}
                    placeholder="name@organization.org"
                    className={`briefing-input ${errors.workEmail ? "!border-[#DC2626]" : ""}`}
                  />
                </Field>

                <Field label="Phone" optional error={errors.phone}>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`briefing-input ${errors.phone ? "!border-[#DC2626]" : ""}`}
                  />
                </Field>

                <Field label="Organization" required error={errors.organization}>
                  <input
                    type="text"
                    name="organization"
                    value={form.organization}
                    onChange={handleChange}
                    className={`briefing-input ${errors.organization ? "!border-[#DC2626]" : ""}`}
                  />
                </Field>

                <Field label="Role / title" required error={errors.role}>
                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className={`briefing-input ${errors.role ? "!border-[#DC2626]" : ""}`}
                  />
                </Field>

                <Field label="Organization type" required error={errors.orgType}>
                  <div className="relative">
                    <select
                      name="orgType"
                      value={form.orgType}
                      onChange={handleChange}
                      className={`briefing-input appearance-none pr-9 ${errors.orgType ? "!border-[#DC2626]" : ""}`}
                    >
                      <option value="" disabled>
                        Select type
                      </option>
                      {ORGANIZATION_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <ChevronIcon />
                  </div>
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Country / region of interest" required error={errors.country}>
                  <input
                    type="text"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    placeholder="e.g. US, UK, EU, national, regional"
                    className={`briefing-input ${errors.country ? "!border-[#DC2626]" : ""}`}
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Primary objective" required error={errors.objective}>
                  <textarea
                    name="objective"
                    value={form.objective}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Briefly state your core objective or question."
                    className={`briefing-input resize-none py-3 ${errors.objective ? "!border-[#DC2626]" : ""}`}
                  />
                </Field>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Preferred format" optional>
                  <div className="relative">
                    <select name="format" value={form.format} onChange={handleChange} className="briefing-input appearance-none pr-9">
                      <option value="" disabled>
                        Select format
                      </option>
                      {PREFERRED_FORMATS.map((format) => (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      ))}
                    </select>
                    <ChevronIcon />
                  </div>
                </Field>

                <Field label="Preferred time zone" optional>
                  <div className="relative">
                    <select name="timeZone" value={form.timeZone} onChange={handleChange} className="briefing-input appearance-none pr-9">
                      <option value="" disabled>
                        Select time zone
                      </option>
                      {TIME_ZONES.map((tz) => (
                        <option key={tz} value={tz}>
                          {tz}
                        </option>
                      ))}
                    </select>
                    <ChevronIcon />
                  </div>
                </Field>
              </div>

              {/* Consent */}
              <label className="mt-6 flex cursor-pointer items-start gap-2.5 text-[13px] leading-relaxed text-[#5B6478]">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#D7DCE6] accent-[#0FAA87]"
                />
                <span>
                  I consent to be contacted about this briefing request and agree to the{" "}
                  <a href="/privacy" className="font-semibold" style={{ color: ACCENT }}>
                    privacy notice.
                  </a>{" "}
                  <span style={{ color: "#E0555B" }}>*</span>
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={!consent || submitting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[14.5px] font-bold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(15,170,135,0.45)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                style={{ backgroundColor: ACCENT }}
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
                  "Submit Briefing Request"
                )}
              </button>

              {/* Disclaimer */}
              <p className="mt-4 flex items-start gap-1.5 text-[12px] leading-relaxed text-[#8A93A6]">
                <InfoIcon />
                <span>
                  This is not medical advice, emergency support, prescription support, or a
                  pharmacy service. Don&apos;t include PHI, prescriptions, patient identifiers, or
                  exact stock. Some medicine categories may be restricted; a representative will
                  review the request.
                </span>
              </p>

              {/* Success message in green color centered at bottom of submission box */}
              {status === "success" && (
                <div ref={successRef} className="mt-4 rounded-xl border border-[#9FE3D3] bg-[#EAFAF4] p-4 text-center text-[13.5px] text-[#00786F]">
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
                <div className="mt-4 rounded-xl border border-[#F87171]/40 bg-[#FEF2F2] p-4 text-center text-[13px] text-[#C5453F]">
                  <p className="font-medium">{errorMessage || "Something went wrong. Please try again."}</p>
                </div>
              )}
            </form>
          </Reveal>

          {/* ── What to know card ── */}
          <Reveal index={4} active={mounted}>
            <div
              className="rounded-2xl p-6"
              style={{ backgroundColor: "#0B1530" }}
            >
              <h3 className="mb-5 flex items-center gap-2 text-[14.5px] font-bold text-white">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(15,170,135,0.18)", color: ACCENT }}
                >
                  <InfoIcon light />
                </span>
                What to know
              </h3>

              <ul className="space-y-4">
                {WHAT_TO_KNOW.map((item) => (
                  <li key={item.id} className="flex gap-2.5">
                    <span className="mt-0.5 shrink-0" style={{ color: ACCENT }}>
                      <CheckIcon />
                    </span>
                    <div>
                      <p className="text-[13px] font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-[#AEB6C9]">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .briefing-input {
          width: 100%;
          border-radius: 0.65rem;
          border: 1px solid #E7EAF1;
          background-color: #FBFCFE;
          padding: 0.7rem 0.85rem;
          font-size: 13.5px;
          color: #0F1F4E;
          outline: none;
          transition: border-color 180ms ease-out, box-shadow 180ms ease-out, background-color 180ms ease-out;
        }
        .briefing-input::placeholder {
          color: #A6ADBD;
        }
        .briefing-input:hover {
          border-color: #D7DCE6;
        }
        .briefing-input:focus {
          border-color: ${ACCENT};
          background-color: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(15,170,135,0.12);
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Field                                                              */
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
    <label className="block">
      <span className="mb-1.5 flex items-center justify-between text-[12.5px] font-semibold text-[#0F1F4E]">
        <span>
          {label}
          {required && <span style={{ color: "#E0555B" }}>*</span>}
          {optional && <span className="font-normal text-[#A6ADBD]"> (optional)</span>}
        </span>
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-xs font-medium text-[#DC2626]">{error}</span>
      )}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8A93A6]"
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
      <path
        d="M3 8.5l3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon({ light }: { light?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={light ? "h-3 w-3" : "mt-0.5 h-3.5 w-3.5 shrink-0 text-[#8A93A6]"}
    >
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
        animation: active ? `requestBriefingFormFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes requestBriefingFormFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}