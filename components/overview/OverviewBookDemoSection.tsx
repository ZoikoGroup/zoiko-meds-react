"use client";

import { useEffect, useRef, useState } from "react";

/**
 * OverviewBookDemoSection
 * "See how ZoikoMeds can support your medicine availability strategy."
 *
 * Layout: light section, left-aligned eyebrow
 *         (12 · BOOK A DEMO)
 *         + 2-line headline (black + teal) + subtext
 *         + 2-column grid: white form card (left, wider) and dark
 *           navy "Why teams choose ZoikoMeds" card (right).
 *
 * Brand accent: #13A594 | Navy: #0F1F4E
 */

const ACCENT = "#13A594";
const BG = "#F3F4F8";
const NAVY = "#0F1F4E";
const PANEL = "#0B1226";

const AREAS_OF_INTEREST = [
  "Platform Overview",
  "Availability Intelligence",
  "Pharmacy Network",
  "Wholesale Portal",
  "AI Insights",
  "Reports",
  "Integrations",
  "Partnership",
  "Enterprise Deployment",
] as const;

const REASONS = [
  {
    title: "Category-defining",
    body: "A medicine availability intelligence platform — not a directory, pharmacy, or marketplace.",
  },
  {
    title: "Confidence-based",
    body: "Signals and tiers, never exact inventory to unauthorized users.",
  },
  {
    title: "Enterprise-ready",
    body: "SSO, role-based access, APIs, and compliance-ready reporting.",
  },
  {
    title: "Responsible AI",
    body: "Bounded, explainable, non-clinical operational intelligence.",
  },
] as const;

export default function OverviewBookDemoSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  function toggleInterest(label: string) {
    setInterests((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;
    setSubmitting(true);
    // Wire this up to your form handler / API route.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <section ref={ref} className="relative w-full py-20 sm:py-24" style={{ backgroundColor: BG }}>
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-60" style={{ color: NAVY }}>12</span>
            <span className="opacity-40" style={{ color: NAVY }}>·</span>
            Book a Demo
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]" style={{ color: NAVY }}>
            See how ZoikoMeds can support your
            <br />
            <span style={{ color: ACCENT }}>medicine availability strategy.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-3 max-w-2xl text-[14px] leading-relaxed" style={{ color: `${NAVY}99` }}>
            Request a platform briefing to explore how ZoikoMeds can help your organization
            improve medicine access visibility, understand pharmacy network signals, monitor
            shortage risks, and generate compliance-conscious reports.
          </p>
        </Reveal>

        {/* ── Grid: form + reasons ── */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[2.1fr_1fr]">

          {/* Form card */}
          <Reveal index={3} active={mounted}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-black/5 bg-white p-6 shadow-[0_1px_2px_rgba(15,31,78,0.04)] sm:p-8"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input type="text" required className="input" />
                </Field>

                <Field label="Work email" required>
                  <input type="email" required placeholder="name@organization.org" className="input" />
                </Field>

                <Field label="Phone number" hint="optional">
                  <input type="tel" className="input" />
                </Field>

                <Field label="Organization" required>
                  <input type="text" required className="input" />
                </Field>

                <Field label="Job title" required>
                  <input type="text" required className="input" />
                </Field>

                <Field label="Organization type" required>
                  <select required defaultValue="" className="input appearance-none">
                    <option value="" disabled>
                      Select type
                    </option>
                    <option>Hospital / Health system</option>
                    <option>Retail pharmacy</option>
                    <option>Distributor / Wholesaler</option>
                    <option>Manufacturer</option>
                    <option>Government / NGO</option>
                    <option>Other</option>
                  </select>
                </Field>

                <div className="sm:col-span-2">
                  <Field label="Country / region" required>
                    <input
                      type="text"
                      required
                      placeholder="e.g. US, UK, EU, national, regional"
                      className="input"
                    />
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <span className="mb-2 block text-[12.5px] font-semibold" style={{ color: NAVY }}>
                    Area of interest <span className="text-red-500">*</span>
                  </span>
                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    {AREAS_OF_INTEREST.map((label) => {
                      const checked = interests.includes(label);
                      return (
                        <label
                          key={label}
                          className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-[12.5px] transition-colors"
                          style={{
                            borderColor: checked ? ACCENT : "rgba(15,31,78,0.14)",
                            backgroundColor: checked ? `${ACCENT}0D` : "#fff",
                            color: NAVY,
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleInterest(label)}
                            className="h-3.5 w-3.5 rounded border-black/20 text-[#13A594] focus:ring-[#13A594]"
                          />
                          {label}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <Field label="Message" hint="optional">
                    <textarea
                      rows={3}
                      placeholder="Tell us about your use case (no PHI, prescriptions, or exact stock)."
                      className="input resize-none"
                    />
                  </Field>
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-relaxed" style={{ color: `${NAVY}B3` }}>
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-black/20 text-[#13A594] focus:ring-[#13A594]"
                />
                <span>
                  I consent for ZoikoMeds to contact me about this request and acknowledge the{" "}
                  <a href="/privacy" className="font-medium hover:underline" style={{ color: ACCENT }}>
                    privacy notice
                  </a>
                  . <span className="text-red-500">*</span>
                </span>
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-xl py-3.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  style={{ backgroundColor: ACCENT }}
                >
                  {submitted ? "Request sent" : submitting ? "Sending…" : "Book a Demo"}
                </button>
                <a
                  href="#talk-to-sales"
                  className="flex-1 rounded-xl border py-3.5 text-center text-[14px] font-semibold transition-colors hover:bg-black/[0.03]"
                  style={{ borderColor: `${NAVY}26`, color: NAVY }}
                >
                  Talk to Sales
                </a>
              </div>

              <p className="mt-4 flex items-start gap-1.5 text-[11.5px] leading-relaxed" style={{ color: `${NAVY}73` }}>
                <PinIcon />
                A ZoikoMeds representative will review your request and route you to the most
                relevant briefing path. Not medical advice, dispensing, or a pharmacy service —
                don&apos;t include PHI, prescriptions, or exact stock.
              </p>

              <style jsx>{`
                .input {
                  width: 100%;
                  border-radius: 0.65rem;
                  border: 1px solid rgba(15, 31, 78, 0.12);
                  background: #fff;
                  padding: 0.6rem 0.85rem;
                  font-size: 13.5px;
                  color: #0f1f4e;
                }
                .input:focus {
                  outline: none;
                  border-color: ${ACCENT};
                  box-shadow: 0 0 0 3px rgba(19, 165, 148, 0.12);
                }
                .input::placeholder {
                  color: rgba(15, 31, 78, 0.35);
                }
              `}</style>
            </form>
          </Reveal>

          {/* Reasons card */}
          <Reveal index={4} active={mounted}>
            <div className="rounded-2xl p-6 sm:p-7" style={{ backgroundColor: PANEL }}>
              <p className="mb-5 flex items-center gap-2 text-[13.5px] font-semibold text-white">
                <PinIcon light />
                Why teams choose ZoikoMeds
              </p>

              <div className="flex flex-col">
                {REASONS.map((r, i) => (
                  <div
                    key={r.title}
                    className="flex gap-2.5 py-4"
                    style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <CheckIcon />
                    <div>
                      <p className="text-[13px] font-semibold text-white">{r.title}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-white/45">{r.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Field                                                              */
/* ------------------------------------------------------------------ */
function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-[12.5px] font-semibold" style={{ color: NAVY }}>
        {label}
        {required && <span className="text-red-500">*</span>}
        {hint && <span className="font-normal" style={{ color: `${NAVY}66` }}>({hint})</span>}
      </span>
      {children}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0">
      <circle cx="10" cy="10" r="10" fill={ACCENT} fillOpacity="0.16" />
      <path d="M6 10.2L8.6 12.8L14 7" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PinIcon({ light }: { light?: boolean }) {
  const color = light ? "#fff" : "currentColor";
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0">
      <path d="M12 22s7-7.58 7-12.5A7 7 0 0 0 5 9.5C5 14.42 12 22 12 22Z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.4" stroke={color} strokeWidth="1.6" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal                                                             */
/* ------------------------------------------------------------------ */
function Reveal({ children, index, active }: { children: React.ReactNode; index: number; active: boolean }) {
  return (
    <div style={{ opacity: active ? undefined : 0, animation: active ? `overviewBookDemoFadeUp 0.6s ease-out ${index * 90}ms both` : "none" }}>
      {children}
      <style>{`
        @keyframes overviewBookDemoFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}