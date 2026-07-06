"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ACCENT = "#13A594";

const WHAT_TO_EXPECT = [
  {
    id: "coordination-visibility",
    title: "Coordination & visibility",
    description: "Scheduling, reminders, and visit tracking — not medical advice.",
  },
  {
    id: "not-emergency-care",
    title: "Not emergency care",
    description: "Urgent situations should go to emergency services.",
  },
  {
    id: "reminders-your-way",
    title: "Reminders your way",
    description: "Email, SMS, push, or calendar — you choose.",
  },
  {
    id: "secure-private",
    title: "Secure & private",
    description: "Protected access with consent-based sharing.",
  },
] as const;

const APPOINTMENT_TYPES = [
  "New patient visit",
  "Follow-up visit",
  "Telehealth consultation",
  "Prescription review",
  "Not sure",
];

const TIME_WINDOWS = ["Morning", "Afternoon", "Evening", "Any time"];

const VISIT_MODES = ["In-person", "Telehealth", "Not sure"] as const;

const REMINDER_CHANNELS = ["Email", "SMS", "Push", "Calendar"] as const;

export default function AppointmentsScheduleFormSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [visitMode, setVisitMode] = useState<(typeof VISIT_MODES)[number] | "">("");
  const [reminderChannels, setReminderChannels] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

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

  function toggleReminderChannel(channel: string) {
    setReminderChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed) return;
    // TODO: wire up to appointment request endpoint
  }

  return (
    <section ref={ref} className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Eyebrow ── */}
        <Reveal index={0} active={mounted}>
          <p
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: ACCENT }}
          >
            <span className="opacity-50 text-[#0F1F4E]">11</span>
            <span className="opacity-30 text-[#0F1F4E]">·</span>
            Schedule an Appointment
          </p>
        </Reveal>

        {/* ── Headline ── */}
        <Reveal index={1} active={mounted}>
          <h2 className="text-[2rem] font-extrabold leading-tight sm:text-[2.3rem]">
            <span className="text-[#0F1F4E]">Get started with </span>
            <span style={{ color: ACCENT }}>appointments.</span>
          </h2>
        </Reveal>

        {/* ── Subtext ── */}
        <Reveal index={2} active={mounted}>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-[#5B6478]">
            Request an appointment, sign in to view your visits, or create a free account to
            manage everything in one place.
          </p>
        </Reveal>

        {/* ── Form + Sidebar ── */}
        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:mt-10 lg:grid-cols-[1fr_320px]">

          {/* ── Form card ── */}
          <Reveal index={3} active={mounted}>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border bg-white p-6 sm:p-8"
              style={{
                borderColor: "#E7EAF1",
                boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
              }}
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Full name" required>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  />
                </Field>

                <Field label="Email address" required>
                  <input
                    type="email"
                    required
                    placeholder="you@email.com"
                    className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none placeholder:text-[#A6AEC0] focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  />
                </Field>

                <Field label="Phone number" optional hint="For SMS reminders">
                  <input
                    type="tel"
                    placeholder="For SMS reminders"
                    className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none placeholder:text-[#A6AEC0] focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  />
                </Field>

                <Field label="Appointment type" required>
                  <select
                    required
                    defaultValue=""
                    className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    {APPOINTMENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Preferred date" required>
                  <input
                    type="date"
                    required
                    className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  />
                </Field>

                <Field label="Preferred time window" required>
                  <select
                    required
                    defaultValue=""
                    className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {TIME_WINDOWS.map((window) => (
                      <option key={window} value={window}>
                        {window}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Visit mode */}
              <div className="mt-5">
                <Label required>Visit mode</Label>
                <div className="mt-2 flex flex-wrap gap-3">
                  {VISIT_MODES.map((mode) => (
                    <label
                      key={mode}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border px-3.5 py-2.5 text-[13px] font-medium text-[#0F1F4E]"
                      style={{
                        borderColor: visitMode === mode ? ACCENT : "#D8DDE8",
                        backgroundColor: visitMode === mode ? "rgba(19,165,148,0.06)" : "white",
                      }}
                    >
                      <input
                        type="radio"
                        name="visit-mode"
                        value={mode}
                        checked={visitMode === mode}
                        onChange={() => setVisitMode(mode)}
                        className="h-3.5 w-3.5 accent-[#13A594]"
                      />
                      {mode}
                    </label>
                  ))}
                </div>
              </div>

              {/* Provider / location */}
              <div className="mt-5">
                <Field label="Provider / location" optional>
                  <input
                    type="text"
                    placeholder="Search or enter a provider or location"
                    className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none placeholder:text-[#A6AEC0] focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  />
                </Field>
              </div>

              {/* Reason for visit */}
              <div className="mt-5">
                <Field label="Reason for visit" optional>
                  <textarea
                    rows={3}
                    placeholder="Brief context. Do not use for emergencies or urgent medical situations."
                    className="w-full resize-none rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none placeholder:text-[#A6AEC0] focus:border-[#13A594]"
                    style={{ borderColor: "#D8DDE8" }}
                  />
                </Field>
              </div>

              {/* Reminder preference */}
              <div className="mt-5">
                <Label optional>Reminder preference</Label>
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {REMINDER_CHANNELS.map((channel) => (
                    <label
                      key={channel}
                      className="flex cursor-pointer items-center gap-2 rounded-lg border px-3.5 py-2.5 text-[13px] font-medium text-[#0F1F4E]"
                      style={{
                        borderColor: reminderChannels.includes(channel) ? ACCENT : "#D8DDE8",
                        backgroundColor: reminderChannels.includes(channel)
                          ? "rgba(19,165,148,0.06)"
                          : "white",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={reminderChannels.includes(channel)}
                        onChange={() => toggleReminderChannel(channel)}
                        className="h-3.5 w-3.5 rounded accent-[#13A594]"
                      />
                      {channel}
                    </label>
                  ))}
                </div>
              </div>

              {/* Agreement */}
              <div className="mt-6 flex items-start gap-2.5">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 rounded accent-[#13A594]"
                />
                <p className="text-[12.5px] leading-relaxed text-[#5B6478]">
                  I agree to appointment communications and acknowledge the{" "}
                  <Link href="/privacy" className="font-medium underline" style={{ color: ACCENT }}>
                    privacy notice
                  </Link>
                  . I understand ZoikoMeds is not an emergency service and does not provide
                  medical advice. <span style={{ color: "#D0455A" }}>*</span>
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[13.5px] font-semibold text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  style={{ backgroundColor: ACCENT }}
                  disabled={!agreed}
                >
                  Schedule an Appointment
                </button>
                <Link
                  href="/patient-portal/sign-in"
                  className="inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[13.5px] font-semibold text-[#0F1F4E] transition-colors duration-200 hover:bg-[#F4F6FA]"
                  style={{ borderColor: "#D8DDE8" }}
                >
                  Sign In
                </Link>
              </div>

              <p className="mt-4 flex items-start gap-1.5 text-[12px] leading-relaxed text-[#8A93A8]">
                <span style={{ color: ACCENT }}>○</span>
                ZoikoMeds coordinates appointment requests; confirmation depends on provider or
                platform configuration. Not medical advice or emergency care.
              </p>
            </form>
          </Reveal>

          {/* ── What to expect sidebar ── */}
          <Reveal index={4} active={mounted}>
            <div
              className="rounded-2xl border p-6"
              style={{
                borderColor: "rgba(255,255,255,0.08)",
                backgroundColor: "#0F1F4E",
              }}
            >
              <div className="mb-5 flex items-center gap-2">
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" style={{ color: "#2FD4B0" }}>
                  <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                </svg>
                <h3 className="text-[13.5px] font-bold text-white">What to expect</h3>
              </div>

              <div className="flex flex-col gap-4">
                {WHAT_TO_EXPECT.map((item) => (
                  <div key={item.id} className="flex gap-2.5">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                      style={{ color: "#2FD4B0" }}
                    >
                      <path
                        d="M3.2 8.4l3 3 6.6-6.8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <p className="text-[13px] font-semibold text-white">{item.title}</p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed" style={{ color: "#9AA3C0" }}>
                        {item.description}
                      </p>
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
/*  Field / Label helpers                                              */
/* ------------------------------------------------------------------ */
function Label({
  children,
  required,
  optional,
}: {
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <label className="text-[12.5px] font-semibold text-[#0F1F4E]">
      {children}
      {required && <span style={{ color: "#D0455A" }}> *</span>}
      {optional && <span className="ml-1 font-normal text-[#A6AEC0]">(optional)</span>}
    </label>
  );
}

function Field({
  label,
  required,
  optional,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label required={required} optional={optional}>
        {label}
      </Label>
      {children}
      {hint && <span className="sr-only">{hint}</span>}
    </div>
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
        animation: active ? `appointmentsScheduleFormFadeUp 0.6s ease-out ${index * 90}ms both` : "none",
      }}
    >
      {children}
      <style>{`
        @keyframes appointmentsScheduleFormFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}