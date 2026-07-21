"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const PATHS = [
  {
    icon: "person",
    title: "Individual provider or care team",
    description:
      "Clinicians, nurses, care coordinators, and support staff exploring availability support.",
    cta: "Explore Provider Workflows",
    ctaFilled: false,
    href: "#",
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
    href: "#",
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

            <div className="mt-5 flex flex-col gap-4">
              {/* Work email */}
              <FormField label="Work email">
                <input
                  type="email"
                  placeholder="you@yourorganization.org"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                />
              </FormField>

              {/* Full name */}
              <FormField label="Full name">
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                />
              </FormField>

              {/* Organization name */}
              <FormField label="Organization name">
                <input
                  type="text"
                  placeholder="e.g. Riverside Health Clinic"
                  value={form.org}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                  className="w-full rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                />
              </FormField>

              {/* Organization type */}
              <FormField label="Organization type">
                <div className="relative">
                  <select
                    value={form.orgType}
                    onChange={(e) => setForm({ ...form, orgType: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                    style={{ color: form.orgType ? "#0F1F4E" : "#B0B8CC" }}
                  >
                    <option value="" disabled>Select organization type</option>
                    {ORG_TYPES.map((t) => (
                      <option key={t} value={t} style={{ color: "#0F1F4E" }}>{t}</option>
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
                    className="w-full appearance-none rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                    style={{ color: form.interest ? "#0F1F4E" : "#B0B8CC" }}
                  >
                    <option value="" disabled>Select primary interest</option>
                    {PRIMARY_INTERESTS.map((s) => (
                      <option key={s} value={s} style={{ color: "#0F1F4E" }}>{s}</option>
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
                type="button"
                className="mt-1 w-full rounded-xl py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                style={{ backgroundColor: ACCENT }}
              >
                Request Provider Briefing
              </button>

              {/* Form footnote */}
              <p className="text-center text-[11.5px] leading-relaxed text-[#9AA3B5]">
                No diagnosis, symptoms, prescriptions, insurance, or patient
                identifiers are collected here. ZoikoMeds is not a clinical,
                prescribing, or dispensing system.
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
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-medium text-[#0F1F4E]">
        {label}
        {optional && (
          <span className="ml-1 font-normal text-[#9AA3B5]">(optional)</span>
        )}
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