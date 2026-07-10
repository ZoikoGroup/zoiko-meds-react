"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

type CapabilityOption =
  | "Availability Intelligence"
  | "Pharmacy Network"
  | "Shortage Signals"
  | "Analytics"
  | "Reports"
  | "Integrations"
  | "Enterprise Deployment"
  | "Partnership";

const CAPABILITY_OPTIONS: CapabilityOption[] = [
  "Availability Intelligence",
  "Pharmacy Network",
  "Shortage Signals",
  "Analytics",
  "Reports",
  "Integrations",
  "Enterprise Deployment",
  "Partnership",
];

const ORG_TYPES = [
  "Pharmacy",
  "Hospital / Health System",
  "Government / Public Health",
  "Payer / Insurer",
  "Distributor",
  "Technology Partner",
  "Other",
];

type WhyItem = {
  title: string;
  description: string;
};

const WHY_ITEMS: WhyItem[] = [
  {
    title: "Capability depth",
    description:
      "Availability, pharmacy, shortage, analytics, reports, and integrations in one platform.",
  },
  {
    title: "Confidence-based",
    description: "Signals and tiers, never exact inventory or unauthorized users.",
  },
  {
    title: "Enterprise-ready",
    description: "SSO, role-based access, APIs, audit trails, and compliance-ready reporting.",
  },
  {
    title: "Responsible AI",
    description: "Bounded, explainable, non-clinical operational intelligence.",
  },
];

export default function FeaturesBookDemoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [orgType, setOrgType] = useState("");
  const [country, setCountry] = useState("");
  const [capabilities, setCapabilities] = useState<Set<CapabilityOption>>(new Set());
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function toggleCapability(option: CapabilityOption) {
    setCapabilities((prev) => {
      const next = new Set(prev);
      if (next.has(option)) {
        next.delete(option);
      } else {
        next.add(option);
      }
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent, intent: "demo" | "sales") {
    e.preventDefault();
    // Wire this up to your form handler / API route.
    console.log(intent, {
      fullName,
      workEmail,
      phone,
      organization,
      jobTitle,
      orgType,
      country,
      capabilities: Array.from(capabilities),
      message,
      consent,
    });
  }

  return (
    <section id="book-a-demo" ref={sectionRef} className="bg-[#F4F6FA] px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <BookDemoFadeUp show={isVisible} delay={0}>
          <span className="text-xs font-bold tracking-[0.18em] text-[#0FAA87]">
            10 &nbsp;&middot;&nbsp; BOOK A DEMO
          </span>
        </BookDemoFadeUp>

        <BookDemoFadeUp show={isVisible} delay={80}>
          <h2 className="mt-4 max-w-2xl text-[1.9rem] font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.3rem] lg:text-[2.5rem]">
            See ZoikoMeds capabilities <span className="text-[#0FAA87]">matched to</span>{" "}
            <span className="text-[#0FAA87]">your organization.</span>
          </h2>
        </BookDemoFadeUp>

        <BookDemoFadeUp show={isVisible} delay={140}>
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-[#6B7385]">
            Book a demo or talk to sales to explore availability intelligence, pharmacy network
            workflows, shortage awareness, analytics, reporting, and secure integrations.
          </p>
        </BookDemoFadeUp>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Form card */}
          <BookDemoFadeUp show={isVisible} delay={200}>
            <form
              onSubmit={(e) => handleSubmit(e, "demo")}
              className="rounded-2xl border border-[#E7EAF1] bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input"
                  />
                </Field>

                <Field label="Work email" required>
                  <input
                    type="email"
                    placeholder="name@organization.org"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    className="input placeholder:text-[#A6ACBB]"
                  />
                </Field>

                <Field label="Phone number" optional>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input"
                  />
                </Field>

                <Field label="Organization" required>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="input"
                  />
                </Field>

                <Field label="Job title" required>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="input"
                  />
                </Field>

                <Field label="Organization type" required>
                  <div className="relative">
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className="input appearance-none pr-9 text-[#0F1F4E]"
                    >
                      <option value="" disabled className="text-[#A6ACBB]">
                        Select type
                      </option>
                      {ORG_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <svg
                      className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B7385]"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2.5 4.5L6 8L9.5 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Country / region" required>
                    <input
                      type="text"
                      placeholder="e.g. US, UK, EU, national, regional"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="input placeholder:text-[#A6ACBB]"
                    />
                  </Field>
                </div>
              </div>

              <div className="mt-5">
                <span className="text-[0.8rem] font-semibold text-[#0F1F4E]">
                  Capability interest <span className="text-[#E14B4B]">*</span>
                </span>
                <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {CAPABILITY_OPTIONS.map((option) => {
                    const checked = capabilities.has(option);
                    return (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2.5 text-[0.85rem] text-[#3A4152]"
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                            checked
                              ? "border-[#0FAA87] bg-[#0FAA87]"
                              : "border-[#CBD1DE] bg-white"
                          }`}
                        >
                          {checked && (
                            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" fill="none">
                              <path
                                d="M2 6L4.8 8.8L10 3"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleCapability(option)}
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5">
                <Field label="Message" optional>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your use case (no PHI, prescriptions, or exact stock)."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="input resize-none placeholder:text-[#A6ACBB]"
                  />
                </Field>
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-[0.8rem] leading-relaxed text-[#6B7385]">
                <span
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                    consent ? "border-[#0FAA87] bg-[#0FAA87]" : "border-[#CBD1DE] bg-white"
                  }`}
                >
                  {consent && (
                    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" fill="none">
                      <path
                        d="M2 6L4.8 8.8L10 3"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                I consent for ZoikoMeds to contact me about this request and acknowledge the{" "}
                <a href="#" className="font-semibold text-[#0FAA87] hover:underline">
                  privacy notice
                </a>
                . <span className="text-[#E14B4B]">*</span>
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-[#0FAA87] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#0C9575]"
                >
                  Book a Demo
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, "sales")}
                  className="inline-flex items-center justify-center rounded-lg border border-[#DADFE8] bg-white px-5 py-3 text-sm font-semibold text-[#0F1F4E] transition-colors duration-300 hover:border-[#0FAA87] hover:text-[#0FAA87]"
                >
                  Talk to Sales
                </button>
              </div>

              <p className="mt-4 text-[0.75rem] leading-relaxed text-[#8A90A0]">
                A ZoikoMeds representative will review your request and route you to the most
                relevant path. Not medical advice, dispensing, or a pharmacy service — don&apos;t
                include PHI, prescriptions, or exact stock.
              </p>
            </form>
          </BookDemoFadeUp>

          {/* Why teams choose card */}
          <BookDemoFadeUp show={isVisible} delay={260}>
            <div className="h-full rounded-2xl bg-[#0F1F4E] p-6">
              <h3 className="text-[0.95rem] font-bold text-white">
                Why teams choose ZoikoMeds
              </h3>
              <ul className="mt-5 space-y-5">
                {WHY_ITEMS.map((item) => (
                  <li key={item.title} className="flex gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#0FAA87]"
                      strokeWidth={2}
                    />
                    <div>
                      <p className="text-[0.83rem] font-bold text-white">{item.title}</p>
                      <p className="mt-1 text-[0.8rem] leading-relaxed text-[#AEB6CC]">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </BookDemoFadeUp>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #dadfe8;
          background: white;
          padding: 0.6rem 0.75rem;
          font-size: 0.85rem;
          color: #0f1f4e;
          outline: none;
          transition: border-color 0.2s ease;
        }
        .input:focus {
          border-color: #0faa87;
        }
      `}</style>
    </section>
  );
}

/* ---------------------------------- */
/* Field wrapper                       */
/* ---------------------------------- */
function Field({
  label,
  required,
  optional,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[0.8rem] font-semibold text-[#0F1F4E]">
        {label}
        {required && <span className="text-[#E14B4B]"> *</span>}
        {optional && <span className="ml-1 font-normal text-[#A6ACBB]">(optional)</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function BookDemoFadeUp({
  show,
  delay = 0,
  children,
}: {
  show: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}