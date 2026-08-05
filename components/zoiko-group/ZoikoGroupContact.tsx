"use client"
import React, { useRef, useState } from "react";
import { internalApi } from "@/lib/config";

const fadeUp = (delay: number): React.CSSProperties => ({
  animation: `fadeUp 0.6s ease-out ${delay}s both`,
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INQUIRY_OPTIONS = [
  { value: "Institutional Briefing", label: "Institutional Briefing" },
  { value: "Press Inquiry", label: "Press Inquiry" },
  { value: "Partnership", label: "Partnership" },
  { value: "Careers", label: "Careers" },
  { value: "Other", label: "Other" },
];

export default function ZoikoGroupContact() {
  const [form, setForm] = useState({
    workEmail: "",
    fullName: "",
    orgName: "",
    inquiryType: "",
    note: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState<{ workEmail?: string; fullName?: string; orgName?: string; inquiryType?: string }>({});
  const successRef = useRef<HTMLDivElement>(null);

  const handleChange = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (errors[key as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: { workEmail?: string; fullName?: string; orgName?: string; inquiryType?: string } = {};
    if (!form.workEmail.trim()) {
      newErrors.workEmail = "Work email is required.";
    } else if (!EMAIL_REGEX.test(form.workEmail.trim())) {
      newErrors.workEmail = "Please enter a valid email address.";
    }
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!form.orgName.trim()) {
      newErrors.orgName = "Organization name is required.";
    }
    if (!form.inquiryType.trim()) {
      newErrors.inquiryType = "Inquiry type is required.";
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
      const res = await fetch(internalApi("briefing-request"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          briefingType: `Corporate Inquiry (${form.inquiryType})`,
          fullName: form.fullName.trim(),
          workEmail: form.workEmail.trim(),
          organization: form.orgName.trim(),
          note: form.note.trim(),
        }),
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch {}

      if (res.ok && (data.success || res.status === 200)) {
        setStatus("success");
        setForm({
          workEmail: "",
          fullName: "",
          orgName: "",
          inquiryType: "",
          note: "",
        });
        setTimeout(() => {
          if (successRef.current) {
            successRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit corporate inquiry. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error occurred. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = (hasErr?: boolean) =>
    `mt-2 w-full rounded-lg border ${
      hasErr ? "border-[#DC2626]" : "border-[#CDD7E3]"
    } bg-white px-4 py-2.5 text-sm font-medium text-[#0F1F4E] placeholder-[#8A97AA] outline-none transition-colors focus:border-[#13A594] focus:ring-2 focus:ring-[#13A594]/15`;

  return (
    <section className="bg-[#EEF2F7] px-6 py-16 md:px-16">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div id="contact" className="mx-auto max-w-5xl">
        <p style={fadeUp(0)} className="text-xs font-semibold tracking-[2px] text-[#13A594]">
          06 · CONTACT ZOIKO GROUP
        </p>
        <h2 style={fadeUp(0.05)} className="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">
          Start a <span className="text-[#0FAA87]">corporate conversation.</span>
        </h2>
        <p style={fadeUp(0.1)} className="mt-4 max-w-140 text-sm text-[#566476]">
          Tell us the nature of your inquiry. We route it to the right Zoiko Group, Zoiko Healthcare,
          ZoikoMeds, enterprise, press, careers, or partnership team.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          style={fadeUp(0.2)}
          className="mt-3 rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-sm md:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Work email */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#0F1F4E]">
                  Work email <span className="text-[#B42318]">*</span>
                </label>
                {errors.workEmail && (
                  <span className="text-xs font-medium text-[#DC2626]">{errors.workEmail}</span>
                )}
              </div>
              <input
                type="email"
                placeholder="name@organization.org"
                value={form.workEmail}
                onChange={handleChange("workEmail")}
                className={inputCls(!!errors.workEmail)}
              />
            </div>

            {/* Full name */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#0F1F4E]">
                  Full name <span className="text-[#B42318]">*</span>
                </label>
                {errors.fullName && (
                  <span className="text-xs font-medium text-[#DC2626]">{errors.fullName}</span>
                )}
              </div>
              <input
                type="text"
                placeholder="Full name"
                value={form.fullName}
                onChange={handleChange("fullName")}
                className={inputCls(!!errors.fullName)}
              />
            </div>

            {/* Organization name */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#0F1F4E]">
                  Organization name <span className="text-[#B42318]">*</span>
                </label>
                {errors.orgName && (
                  <span className="text-xs font-medium text-[#DC2626]">{errors.orgName}</span>
                )}
              </div>
              <input
                type="text"
                placeholder="Organization"
                value={form.orgName}
                onChange={handleChange("orgName")}
                className={inputCls(!!errors.orgName)}
              />
            </div>

            {/* Inquiry Type */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-[#0F1F4E]">
                  Inquiry type <span className="text-[#B42318]">*</span>
                </label>
                {errors.inquiryType && (
                  <span className="text-xs font-medium text-[#DC2626]">{errors.inquiryType}</span>
                )}
              </div>
              <div className="relative">
                <select
                  value={form.inquiryType}
                  onChange={handleChange("inquiryType")}
                  className={inputCls(!!errors.inquiryType) + " appearance-none cursor-pointer"}
                  style={{ color: form.inquiryType ? "#0F1F4E" : "#8A97AA", backgroundColor: "#ffffff" }}
                >
                  <option value="" disabled style={{ color: "#8A97AA", backgroundColor: "#ffffff" }}>Select type</option>
                  {INQUIRY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} style={{ color: "#0F1F4E", backgroundColor: "#ffffff" }}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8A97AA]">
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Textarea */}
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-[#0F1F4E]">
                Brief note about your inquiry <span className="text-[#7C8A9B]">(optional)</span>
              </label>
              <textarea
                rows={4}
                placeholder="A short summary of what you need."
                value={form.note}
                onChange={handleChange("note")}
                className="mt-2 w-full resize-none rounded-lg border border-[#CDD7E3] bg-white px-4 py-3 text-sm font-medium text-[#0F1F4E] placeholder-[#8A97AA] outline-none focus:border-[#13A594] focus:ring-2 focus:ring-[#13A594]/15"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg cursor-pointer bg-[#13A594] py-3 text-sm font-semibold text-white transition hover:bg-teal-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
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
              "Send Inquiry"
            )}
          </button>

          <div className="mt-4 flex items-center gap-2">
            <img src="/zoiko-group/governed.png" alt="image" />
            <p className="text-xs w-[550px] text-[#566476]">
              Don&apos;t include patient or medical details, prescription data, insert work, identified pharmacy,
              or sequence claim documents, or sensitive info in this form.
            </p>
          </div>

          {/* Success Confirmation Message */}
          {status === "success" && (
            <div
              ref={successRef}
              className="mt-6 rounded-xl border border-[#9FE3D3] bg-[#EAFAF4] p-5 text-center transition-all duration-300"
            >
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#13A594]/15 text-[#13A594]">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="mt-2 text-[15px] font-bold text-[#00786F]">
                  Corporate Inquiry Submitted
                </h4>
                <p className="mt-1 text-[13px] leading-relaxed text-[#056059]">
                  Thank you! Your corporate inquiry has been submitted. A Zoiko Group representative will contact you soon.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {status === "error" && (
            <div className="mt-6 rounded-xl border border-[#F87171]/40 bg-[#FEF2F2] p-4 text-center text-[13px] text-[#C5453F]">
              <p className="font-medium">{errorMessage || "Something went wrong. Please try again."}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
