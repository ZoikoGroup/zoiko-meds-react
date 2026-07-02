"use client";

import { useEffect, useRef, useState } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setSubmitting(true);
    // Wire up actual submission handler here.
    setTimeout(() => setSubmitting(false), 1200);
  };

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
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
                <Field label="Full name" required>
                  <input
                    type="text"
                    required
                    className="briefing-input"
                  />
                </Field>

                <Field label="Work email" required>
                  <input
                    type="email"
                    required
                    placeholder="name@organization.org"
                    className="briefing-input"
                  />
                </Field>

                <Field label="Phone" optional>
                  <input type="tel" className="briefing-input" />
                </Field>

                <Field label="Organization" required>
                  <input type="text" required className="briefing-input" />
                </Field>

                <Field label="Role / title" required>
                  <input type="text" required className="briefing-input" />
                </Field>

                <Field label="Organization type" required>
                  <div className="relative">
                    <select required defaultValue="" className="briefing-input appearance-none pr-9">
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
                <Field label="Country / region of interest" required>
                  <input
                    type="text"
                    required
                    placeholder="e.g. US, UK, EU, national, regional"
                    className="briefing-input"
                  />
                </Field>
              </div>

              <div className="mt-5">
                <Field label="Primary objective" required>
                  <textarea
                    required
                    rows={4}
                    placeholder="e.g. Evaluate regional availability signals for planning; explore pharmacy network participation; review shortage reporting for public health."
                    className="briefing-input resize-none"
                  />
                </Field>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Preferred format" optional>
                  <div className="relative">
                    <select defaultValue="" className="briefing-input appearance-none pr-9">
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
                    <select defaultValue="" className="briefing-input appearance-none pr-9">
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
                className="mt-6 w-full rounded-xl px-6 py-3.5 text-[14.5px] font-bold text-white transition-all duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(15,170,135,0.45)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                style={{ backgroundColor: ACCENT }}
              >
                {submitting ? "Submitting…" : "Submit Briefing Request"}
              </button>

              {/* Footnote */}
              <p className="mt-4 flex items-start gap-1.5 text-[12px] leading-relaxed text-[#8A93A6]">
                <InfoIcon />
                <span>
                  This is not medical advice, emergency support, prescription support, or a
                  pharmacy service. Don&apos;t include PHI, prescriptions, patient identifiers, or
                  exact stock. Some medicine categories may be restricted; a representative will
                  review the request.
                </span>
              </p>
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
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1 text-[12.5px] font-semibold text-[#0F1F4E]">
        {label}
        {required && <span style={{ color: "#E0555B" }}>*</span>}
        {optional && <span className="font-normal text-[#A6ADBD]">(optional)</span>}
      </span>
      {children}
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