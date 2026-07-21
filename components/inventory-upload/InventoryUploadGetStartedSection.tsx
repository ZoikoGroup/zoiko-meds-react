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
    href: "#",
  },
  {
    icon: "branch",
    title: "Pharmacy group setup",
    description:
      "Multi-location operators needing branch controls, secure files, PMS/POS integration, or governance review.",
    cta: "Request Chain Integration",
    href: "#",
  },
  {
    icon: "code",
    title: "Technical integration review",
    description:
      "IT teams, PMS/POS vendors, API teams, and structured-feed implementation teams.",
    cta: "Discuss API Integration",
    href: "#",
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

export default function InventoryUploadGetStartedSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    email: "",
    name: "",
    org: "",
    pharmacyType: "",
    setupInterest: "",
    note: "",
  });

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

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
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

            <div id="signal-setup" className="mt-5 flex flex-col gap-4">
              {/* Work email */}
              <FormField label="Work email">
                <input
                  type="email"
                  placeholder="you@yourpharmacy.com"
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

              {/* Pharmacy / org name */}
              <FormField label="Pharmacy or organization name">
                <input
                  type="text"
                  placeholder="e.g. Riverside Community Pharmacy"
                  value={form.org}
                  onChange={(e) => setForm({ ...form, org: e.target.value })}
                  className="w-full rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] placeholder-[#B0B8CC] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
                />
              </FormField>

              {/* Pharmacy type */}
              <FormField label="Pharmacy type">
                <div className="relative">
                  <select
                    value={form.pharmacyType}
                    onChange={(e) => setForm({ ...form, pharmacyType: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
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
                    onChange={(e) => setForm({ ...form, setupInterest: e.target.value })}
                    className="w-full appearance-none rounded-xl border border-[#D8DCE8] bg-white px-4 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none transition-colors focus:border-[#0FAA87] focus:ring-2 focus:ring-[#0FAA87]/15"
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
                Discuss Inventory Signal Setup
              </button>

              {/* Form footnote */}
              <p className="text-center text-[11.5px] leading-relaxed text-[#9AA3B5]">
                No inventory files, exact stock, license documents, or
                credentials are collected here. Setup happens later in the
                secure portal.
              </p>
            </div>
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