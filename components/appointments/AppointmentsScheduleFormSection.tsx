"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { appUrl, internalApi } from "@/lib/config";

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

interface SubmittedAppointmentData {
  refNumber: string;
  fullName: string;
  email: string;
  phone: string;
  appointmentType: string;
  preferredDate: string;
  preferredTime: string;
  visitMode: string;
  providerLocation: string;
  reasonForVisit: string;
  reminderChannels: string;
  submittedAt: string;
}

export default function AppointmentsScheduleFormSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [visitMode, setVisitMode] = useState<(typeof VISIT_MODES)[number] | "">("");
  const [providerLocation, setProviderLocation] = useState("");
  const [reasonForVisit, setReasonForVisit] = useState("");
  const [reminderChannels, setReminderChannels] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedData, setSubmittedData] = useState<SubmittedAppointmentData | null>(null);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed || submitting) return;

    setSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch(internalApi("appointments"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          appointmentType,
          preferredDate,
          preferredTime,
          visitMode,
          providerLocation,
          reasonForVisit,
          reminderChannels,
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setSubmittedData(json.data);
      } else {
        setErrorMessage(json.message || "Failed to schedule appointment. Please try again.");
      }
    } catch {
      setErrorMessage("Network error occurred while submitting your appointment request.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleReset() {
    setSubmittedData(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setAppointmentType("");
    setPreferredDate("");
    setPreferredTime("");
    setVisitMode("");
    setProviderLocation("");
    setReasonForVisit("");
    setReminderChannels([]);
    setAgreed(false);
    setErrorMessage("");
  }

  return (
    <section id="schedule-an-appointment" ref={ref} className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20 lg:py-24">
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

          {/* ── Form or Confirmation card ── */}
          <Reveal index={3} active={mounted}>
            {submittedData ? (
              <div
                className="rounded-2xl border bg-white p-6 sm:p-8"
                style={{
                  borderColor: "#E7EAF1",
                  boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                }}
              >
                {/* Success Header */}
                <div className="flex items-center justify-between border-b pb-5" style={{ borderColor: "#E7EAF1" }}>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#13A594]/10 text-[#13A594]">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#0F1F4E]">Appointment Requested</h3>
                      <p className="text-xs text-[#5B6478]">
                        Confirmation email sent to <span className="font-semibold text-[#0F1F4E]">info@zoikomeds.com</span>
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#13A594]/10 px-3.5 py-1 text-xs font-bold text-[#13A594]">
                    Ref: {submittedData.refNumber}
                  </span>
                </div>

                {/* Submitted Summary Details */}
                <div className="mt-6 rounded-xl bg-[#F8FAFC] p-5 border" style={{ borderColor: "#E7EAF1" }}>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#5B6478] mb-4">Request Summary</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-[13.5px]">
                    <div>
                      <span className="block text-xs text-[#8A93A8]">Full Name</span>
                      <span className="font-semibold text-[#0F1F4E]">{submittedData.fullName}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-[#8A93A8]">Email Address</span>
                      <span className="font-semibold text-[#0F1F4E]">{submittedData.email}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-[#8A93A8]">Phone Number</span>
                      <span className="font-semibold text-[#0F1F4E]">{submittedData.phone || "Not provided"}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-[#8A93A8]">Appointment Type</span>
                      <span className="font-semibold text-[#0F1F4E]">{submittedData.appointmentType}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-[#8A93A8]">Preferred Date & Time</span>
                      <span className="font-semibold text-[#0F1F4E]">
                        {submittedData.preferredDate} ({submittedData.preferredTime})
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs text-[#8A93A8]">Visit Mode</span>
                      <span className="font-semibold text-[#0F1F4E]">{submittedData.visitMode}</span>
                    </div>
                    {submittedData.providerLocation && (
                      <div>
                        <span className="block text-xs text-[#8A93A8]">Provider / Location</span>
                        <span className="font-semibold text-[#0F1F4E]">{submittedData.providerLocation}</span>
                      </div>
                    )}
                    {submittedData.reminderChannels && (
                      <div>
                        <span className="block text-xs text-[#8A93A8]">Reminder Preferences</span>
                        <span className="font-semibold text-[#0F1F4E]">{submittedData.reminderChannels}</span>
                      </div>
                    )}
                  </div>

                  {submittedData.reasonForVisit && (
                    <div className="mt-4 border-t pt-3" style={{ borderColor: "#E7EAF1" }}>
                      <span className="block text-xs text-[#8A93A8]">Reason for Visit</span>
                      <span className="text-[13px] text-[#0F1F4E]">{submittedData.reasonForVisit}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[13.5px] font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer"
                    style={{ backgroundColor: ACCENT }}
                  >
                    Schedule Another Appointment
                  </button>
                  <a
                    href={appUrl("/login")}
                    className="inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[13.5px] font-semibold text-[#0F1F4E] transition-colors hover:bg-[#F4F6FA]"
                    style={{ borderColor: "#D8DDE8" }}
                  >
                    Sign In to Portal
                  </a>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border bg-white p-6 sm:p-8"
                style={{
                  borderColor: "#E7EAF1",
                  boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)",
                }}
              >
                {errorMessage && (
                  <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Full name" required>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594]"
                      style={{ borderColor: "#D8DDE8" }}
                    />
                  </Field>

                  <Field label="Email address" required>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none placeholder:text-[#A6AEC0] focus:border-[#13A594]"
                      style={{ borderColor: "#D8DDE8" }}
                    />
                  </Field>

                  <Field label="Phone number" optional hint="For SMS reminders">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="For SMS reminders"
                      className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none placeholder:text-[#A6AEC0] focus:border-[#13A594]"
                      style={{ borderColor: "#D8DDE8" }}
                    />
                  </Field>

                  <Field label="Appointment type" required>
                    <select
                      required
                      value={appointmentType}
                      onChange={(e) => setAppointmentType(e.target.value)}
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
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full rounded-lg border px-3.5 py-2.5 text-[13.5px] text-[#0F1F4E] outline-none focus:border-[#13A594]"
                      style={{ borderColor: "#D8DDE8" }}
                    />
                  </Field>

                  <Field label="Preferred time window" required>
                    <select
                      required
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
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
                          required
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
                      value={providerLocation}
                      onChange={(e) => setProviderLocation(e.target.value)}
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
                      value={reasonForVisit}
                      onChange={(e) => setReasonForVisit(e.target.value)}
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
                    <Link href="/privacy-center" className="font-medium underline" style={{ color: ACCENT }}>
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
                    className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[13.5px] font-semibold text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                    style={{ backgroundColor: ACCENT }}
                    disabled={!agreed || submitting}
                  >
                    {submitting ? "Scheduling…" : "Schedule an Appointment"}
                  </button>
                  <a
                    href={appUrl("/login")}
                    className="inline-flex items-center justify-center rounded-full border px-6 py-2.5 text-[13.5px] font-semibold text-[#0F1F4E] transition-colors duration-200 hover:bg-[#F4F6FA]"
                    style={{ borderColor: "#D8DDE8" }}
                  >
                    Sign In
                  </a>
                </div>

                <p className="mt-4 flex items-start gap-1.5 text-[12px] leading-relaxed text-[#8A93A8]">
                  <span style={{ color: ACCENT }}>○</span>
                  ZoikoMeds coordinates appointment requests; confirmation depends on provider or
                  platform configuration. Not medical advice or emergency care.
                </p>
              </form>
            )}
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