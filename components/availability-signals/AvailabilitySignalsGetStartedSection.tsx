"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";


const ACCENT = "#0FAA87";

const PATHS = [
  {
    icon: "pulse",
    title: "Provider signal education",
    description:
      "Clinicians, nurses, care coordinators, patient navigators, and clinic teams.",
    cta: "Request Signal Workflow Briefing",
    ctaFilled: true,
    href: "#request",
  },
  {
    icon: "people",
    title: "Care-team workflow access",
    description:
      "Provider teams exploring role-based availability-support workflows.",
    cta: "Explore Care Team Access",
    ctaFilled: false,
    href: "/care-team-access",
  },
  {
    icon: "search",
    title: "Patient or caregiver self-service",
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

const WORKFLOW_INTERESTS = [
  "Provider signal education",
  "Care-team workflow integration",
  "Patient-support workflows",
  "Discharge planning signals",
  "Shortage-aware guidance",
  "Caregiver access",
  "Enterprise / institutional briefing",
  "Other",
];

type IconName = "pulse" | "people" | "search";

export default function AvailabilitySignalsGetStartedSection() {
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

  return (
    <section id="request" ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mx-auto max-w-xl text-center">
          <Reveal index={0} active={mounted}>
            <h2 className="text-[1.9rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.1rem]">
              Choose the right signal{" "}
              <span style={{ color: ACCENT }}>workflow path.</span>
            </h2>
          </Reveal>
          <Reveal index={1} active={mounted}>
            <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-[#5B6478]">
              Providers, care teams, enterprise buyers, and patients — each
              routed to the right next step.
            </p>
          </Reveal>
        </div>

        {/* ── Two-column equal-height layout ── */}
        <Reveal index={2} active={mounted}>
          <div className="mt-10 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">

            {/* Left: stacked path cards — stretch to fill */}
            <div className="flex flex-col gap-4">
              {PATHS.map((p, i) => (
                <PathCard key={p.title} {...p} index={i} active={mounted} />
              ))}
            </div>

            {/* Right: form card — equal height via self-stretch */}
            <div className="flex flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 sm:p-7">
              <h3 className="text-[15px] font-bold text-[#0F1F4E]">
                Request a signal workflow briefing
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
                Tell us about your organization and signal education need. No
                diagnosis, prescriptions, insurance, or patient identifiers —
                this is a zero-PHI request.
              </p>

              <div className="mt-5 flex flex-1 flex-col gap-4">
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
                    placeholder="e.g. Riverside Family Clinic"
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
                      {ORG_TYPES.map((t) => <option key={t} value={t} style={{ color: "#0F1F4E" }}>{t}</option>)}
                    </select>
                    <ChevronDown />
                  </div>
                </FormField>

                {/* Primary signal workflow interest (optional) */}
                <FormField label="Primary signal workflow interest" optional>
                  <div className="relative">
                    <select
                      value={form.interest}
                      onChange={(e) => setForm({ ...form, interest: e.target.value })}
                      className="w-full appearance-none rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                      style={{ color: form.interest ? "#0F1F4E" : "#B0B8CC" }}
                    >
                      <option value="" disabled>Select workflow interest</option>
                      {WORKFLOW_INTERESTS.map((s) => <option key={s} value={s} style={{ color: "#0F1F4E" }}>{s}</option>)}
                    </select>
                    <ChevronDown />
                  </div>
                </FormField>

                {/* Brief note (optional) */}
                <FormField label="Brief note" optional>
                  <textarea
                    placeholder="Your signal education, patient-support workflow, or provider access need"
                    rows={3}
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    className="w-full resize-none rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                  />
                </FormField>

                {/* Submit — pushed to bottom */}
                <div className="mt-auto pt-2">
                  <button
                    type="button"
                    className="w-full rounded-xl py-3 text-[14px] font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Request Signal Workflow Briefing
                  </button>
                  <p className="mt-3 text-center text-[11.5px] leading-relaxed text-[#9AA3B5]">
                    No diagnosis, symptoms, prescriptions, insurance, or patient
                    identifiers are collected here. This is a zero-PHI request.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </Reveal>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PathCard                                                             */
/* ------------------------------------------------------------------ */
function PathCard({
  icon,
  title,
  description,
  cta,
  ctaFilled,
  href,
  index,
  active,
}: {
  icon: IconName;
  title: string;
  description: string;
  cta: string;
  ctaFilled: boolean;
  href: string;
  index: number;
  active: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-[#E7EAF1] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:shadow-[0_8px_24px_-14px_rgba(15,170,135,0.15)]">
      {/* Icon — dark navy badge matching previous path cards */}
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: "#1A2E5A", color: "#6EE7D0" }}
      >
        <PathIcon name={icon} />
      </div>

      <h3 className="mt-3.5 text-[14px] font-bold text-[#0F1F4E]">{title}</h3>
      <p className="mt-1.5 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">{description}</p>

      <div className="mt-4">
        {ctaFilled ? (
          <Link
            href={href}
            className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
            style={{ backgroundColor: ACCENT }}
          >
            {cta}
          </Link>
        ) : (
          <Link
            href={href}
            className="inline-flex w-full items-center justify-center rounded-xl border border-[#D0D5E2] bg-white px-4 py-2.5 text-[12.5px] font-semibold text-[#0F1F4E] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:scale-[0.97]"
          >
            {cta}
          </Link>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FormField                                                            */
/* ------------------------------------------------------------------ */
function FormField({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-medium text-[#0F1F4E]">
        {label}
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
/*  Path icons                                                           */
/* ------------------------------------------------------------------ */
function PathIcon({ name }: { name: IconName }) {
  const c = { viewBox: "0 0 24 24", fill: "none" as const, style: { width: 20, height: 20 } };
  switch (name) {
    case "pulse":
      return (
        <svg {...c}>
          <polyline points="2,12 6,12 8,5 10,19 13,9 15,14 17,12 22,12"
            stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "people":
      return (
        <svg {...c}>
          <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
          <path d="M2 20c0-3.31 3.13-6 7-6s7 2.69 7 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="17" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M22 20c0-2.76-2.24-5-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
    <div style={{ opacity: active ? undefined : 0, animation: active ? `avSigGetFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes avSigGetFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}