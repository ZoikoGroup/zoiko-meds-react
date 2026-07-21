"use client";

import { useEffect, useRef, useState } from "react";


const ACCENT = "#0FAA87";

const ORG_TYPES = [
  "Hospital / health system",
  "Academic medical center",
  "Integrated delivery network",
  "Outpatient / specialty clinic network",
  "Pharmacy operator within health system",
  "Population health organization",
  "Digital health / patient access platform",
  "Other",
];

const PRIMARY_INTERESTS = [
  "Discharge medication access",
  "Care navigation & patient access",
  "API & integration evaluation",
  "Security & procurement review",
  "Shortage / access-risk intelligence",
  "MediBase™ data normalization",
  "Other",
];

export default function HealthSystemsContactSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    email: "", name: "", org: "", orgType: "", interest: "", note: "",
  });

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

  const inputCls =
    "w-full rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15";

  return (
    <section id="request" ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
            <span className="opacity-50 text-[#0F1F4E]">07</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Request Health System Briefing
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Start a </span>
            <span style={{ color: ACCENT }}>health-system conversation.</span>
          </h2>
        </Reveal>

        {/* ── Subtitle ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-[#5B6478]">
            Tell us where you fit and what you need. We route your request to
            the right health-system, workflow, enterprise, integration,
            security, or governance team.
          </p>
        </Reveal>

        {/* ── Form card ── */}
        <Reveal index={3} active={mounted}>
          <div className="mt-8 rounded-2xl border border-[#E7EAF1] bg-white p-7 shadow-[0_4px_24px_-10px_rgba(15,31,78,0.08)] sm:p-8">

            <div className="flex flex-col gap-5">

              {/* Row 1: Work email + Full name */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Work email" required>
                  <input
                    type="email"
                    placeholder="name@healthsystem.org"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={inputCls}
                  />
                </FormField>
                <FormField label="Full name" required>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={inputCls}
                  />
                </FormField>
              </div>

              {/* Row 2: Organization name + Organization type */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Organization name" required>
                  <input
                    type="text"
                    placeholder="Hospital or health system"
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                    className={inputCls}
                  />
                </FormField>
                <FormField label="Organization type" required>
                  <div className="relative">
                    <select
                      value={form.orgType}
                      onChange={(e) => setForm({ ...form, orgType: e.target.value })}
                      className={inputCls + " appearance-none"}
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

              {/* Row 3: Primary interest (half width, no label suffix shown as optional in screenshot) */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Primary interest">
                  <div className="relative">
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className={inputCls + " appearance-none"}
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
                <div className="hidden sm:block" />
              </div>

              {/* Row 4: Brief note (optional) — full width */}
              <FormField label="Brief note" optional>
                <textarea
                  placeholder="Your health-system workflow, access-risk need, integration interest, or procurement pathway."
                  rows={4}
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className={inputCls + " resize-none"}
                />
              </FormField>

              {/* Submit */}
              <button
                type="button"
                className="w-full rounded-xl py-3.5 text-[14px] font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                style={{ backgroundColor: ACCENT }}
              >
                Request Health System Briefing
              </button>

              {/* Footnote */}
              <p className="flex items-start gap-2 text-[11.5px] leading-relaxed text-[#9AA3B5]">
                <InfoIcon />
                <span>
                  Don't include PHI, diagnosis, prescription records, patient
                  identifiers, exact pharmacy stock, or API credentials in this
                  form.
                </span>
              </p>

            </div>
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
  label, required, optional, children,
}: {
  label: string; required?: boolean; optional?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-medium text-[#0F1F4E]">
        {label}
        {required && <span className="ml-0.5 text-[#E05252]">*</span>}
        {optional && <span className="ml-1 font-normal text-[#9AA3B5]">(optional)</span>}
      </label>
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `hsContactFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes hsContactFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}