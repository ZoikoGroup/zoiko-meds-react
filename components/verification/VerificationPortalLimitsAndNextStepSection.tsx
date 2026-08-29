"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { appUrl, internalApi } from "@/lib/config";
import { scrollToFirstError, validateEmail } from "@/lib/validation";

const ACCENT = "#0FAA87";

const LIMITS = [
  {
    icon: "box",
    title: "Not a stock guarantee",
    description:
      "A verified pharmacy may still have no current availability signal for a specific medicine.",
  },
  {
    icon: "user",
    title: "Not a dispensing decision",
    description:
      "Prescription rules, pharmacist judgment, eligibility, pharmacy policies, and local laws always apply.",
  },
  {
    icon: "pin",
    title: "Not medical advice",
    description:
      "ZoikoMeds does not recommend medicines, doses, substitutions, treatments, or clinical decisions.",
  },
  {
    icon: "eyeOff",
    title: "Does not expose exact stock",
    description:
      "ZoikoMeds does not publicly display exact pharmacy stock quantities.",
  },
  {
    icon: "home",
    title: "Does not replace regulators",
    description:
      "ZoikoMeds is not a pharmacy board, licensing authority, regulator, or enforcement body.",
  },
  {
    icon: "refresh",
    title: "Can change over time",
    description:
      "Status may change based on review, new evidence, updates, platform controls, or governance decisions.",
  },
] as const;

const NEXT_STEPS = [
  {
    icon: "home",
    title: "Pharmacy representative",
    description: "Claim or verify your pharmacy profile.",
    cta: "Claim Your Pharmacy",
    variant: "solid",
    link:"/pharmacy"
  },
  {
    icon: "building",
    title: "Pharmacy group or chain",
    description: "Verify multiple branches, users, and role structures.",
    cta: "Request Chain Briefing",
    variant: "outline",
    link:"/request-a-briefing"
  },
  {
    icon: "search",
    title: "Patient or caregiver",
    description: "Understand verified pharmacy search results.",
    cta: "Search Medicines",
    variant: "outline",
    link:"/searchmed"
  },
] as const;

export default function VerificationLimitsAndNextStepSection() {
  const [mounted, setMounted] = useState(false);
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
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="status" className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                  Verified participation has{" "}
                  <span style={{ color: ACCENT }}>clear limits.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Stated once, plainly — what verification is, and what it
                  is not.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Limits cards ---------------- */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {mounted
            ? LIMITS.map((l, i) => <LimitCard key={l.title} {...l} index={i} />)
            : LIMITS.map((_, i) => <LimitCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Next step subheader ---------------- */}
        <div className="mt-12">
          {mounted ? (
            <Reveal index={9}>
              <h3 className="text-[15px] font-bold text-[#0F1F4E]">
                Find the right next step.
              </h3>
            </Reveal>
          ) : (
            <div className="h-5 w-52 animate-pulse rounded bg-[#E4E8F0]" />
          )}
        </div>

        {/* ---------------- Next step path cards ---------------- */}
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mounted
            ? NEXT_STEPS.map((s, i) => (
                <NextStepCard key={s.title} {...s} index={i} />
              ))
            : NEXT_STEPS.map((_, i) => <NextStepCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Claim / verify form (centered) ---------------- */}
        <div id="claim-your-pharmacy" className="mx-auto mt-8 flex max-w-5xl justify-center">
          {mounted ? <ClaimForm /> : <FormSkeleton />}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- */
/*  Reveal: bottom -> top staggered fade-up wrapper                   */
/* ----------------------------------------------------------------- */
function Reveal({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  return (
    <div
      className="animate-[portalLimitsNextStepFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes portalLimitsNextStepFadeUp {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Limit card                                                          */
/* ----------------------------------------------------------------- */
function LimitCard({
  icon,
  title,
  description,
  index,
}: {
  icon: "box" | "user" | "pin" | "eyeOff" | "home" | "refresh";
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="group flex items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[portalLimitsNextStepFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{
        opacity: 0,
        animationDelay: `${250 + index * 100}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#9FE3D3";
        e.currentTarget.style.boxShadow =
          "0 14px 32px -16px rgba(15,170,135,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E7EAF1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#DCF5EE", color: ACCENT }}
      >
        <LimitIcon name={icon} />
      </div>

      <div>
        <h3 className="text-[14.5px] font-bold text-[#0F1F4E]">{title}</h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6478]">
          {description}
        </p>
      </div>
    </div>
  );
}

function LimitIcon({
  name,
}: {
  name: "box" | "user" | "pin" | "eyeOff" | "home" | "refresh";
}) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-4.5 w-4.5" };

  switch (name) {
    case "box":
      return (
        <svg {...common}>
          <path
            d="M4 8l8-4 8 4-8 4-8-4z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M4 8v8l8 4 8-4V8M12 12v8" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8.2" r="3.2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M5 19.5c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path
            d="M12 21s7-6.4 7-11.5A7 7 0 0 0 5 9.5C5 14.6 12 21 12 21z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="9.5" r="2.3" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case "eyeOff":
      return (
        <svg {...common}>
          <path
            d="M3.5 12s3.5-6.5 8.5-6.5 8.5 6.5 8.5 6.5-3.5 6.5-8.5 6.5S3.5 12 3.5 12z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    case "home":
      return (
        <svg {...common}>
          <path
            d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "refresh":
      return (
        <svg {...common}>
          <path
            d="M19 9a7 7 0 0 0-12.6-3.2M5 15a7 7 0 0 0 12.6 3.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path d="M19 4.5V9h-4.5M5 19.5V15h4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Next step card                                                       */
/* ----------------------------------------------------------------- */
function NextStepCard({
  icon,
  title,
  description,
  cta,
  variant,
  index,
  link
}: {
  icon: "home" | "building" | "search";
  title: string;
  description: string;
  cta: string;
  variant: "solid" | "outline";
  index: number;
  link:string;
}) {
  return (
    <div
      className="group flex flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[portalLimitsNextStepFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
      style={{
        opacity: 0,
        animationDelay: `${1000 + index * 100}ms`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#9FE3D3";
        e.currentTarget.style.boxShadow =
          "0 14px 32px -16px rgba(15,170,135,0.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#E7EAF1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#0F1F4E", color: "#FFFFFF" }}
      >
        <NextStepIcon name={icon} />
      </div>

      <h3 className="mt-4 text-[14.5px] font-bold text-[#0F1F4E]">{title}</h3>

      <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-[#5B6478]">
        {description}
      </p>

      {variant === "solid" ? (
        <a
          href={link}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
          style={{ backgroundColor: ACCENT }}
        >
          {cta}
        </a>
      ) : (
        <a
          href={link}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-[#D7DCE6] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F] active:translate-y-0 active:scale-[0.98]"
        >
          {cta}
        </a>
      )}
    </div>
  );
}

function NextStepIcon({ name }: { name: "home" | "building" | "search" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path
            d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <rect x="4" y="14" width="4" height="6" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="10" y="9" width="4" height="11" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
          <rect x="16" y="4" width="4" height="16" rx="0.8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M15 15l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Claim / verify form                                                 */
/* ----------------------------------------------------------------- */

/** A real pharmacy record returned by /internal/pharmacy-claim/search. */
type PharmacyMatch = {
  id: string;
  name: string;
  address: string;
  city: string | null;
  region: string | null;
  source: "verified-directory" | "google-places";
  verified: boolean;
  distanceKm?: number;
};

type ClaimStep = "search" | "select" | "verify" | "sent";

const NO_MATCH_MESSAGE =
  "We couldn't find a matching pharmacy. Please check the pharmacy name and location and try again.";

/**
 * Cheap client-side sanity check so obvious nonsense never reaches the lookup.
 * The server re-validates and geocodes — it is the authority on what is real.
 */
function looksLikeLocation(value: string): boolean {
  const cleaned = value.trim();
  if (cleaned.length < 2) return false;
  if (/[a-zA-Z]/.test(cleaned)) return true;
  // Digits only: accept postal-code lengths, reject "1" / "12" / "123".
  return /^\d{4,10}$/.test(cleaned.replace(/[\s-]/g, ""));
}

/**
 * Search → select → verify → sent.
 *
 * Finding a pharmacy is not the end of the flow: a match only reveals the
 * records found, and "check your inbox" is shown solely once a confirmation
 * email has actually been sent to an address the visitor supplied.
 */
function ClaimForm() {
  const [step, setStep] = useState<ClaimStep>("search");
  const [form, setForm] = useState({ name: "", location: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  /** Form-level message: a no-match result, or a failed request. */
  const [notice, setNotice] = useState<string | null>(null);

  const [searching, setSearching] = useState(false);
  const [matches, setMatches] = useState<PharmacyMatch[]>([]);
  const [searched, setSearched] = useState({ name: "", location: "" });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [contact, setContact] = useState({ fullName: "", workEmail: "" });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ emailSent: boolean; email: string } | null>(null);

  /** Guards against a double submit landing two requests. */
  const inFlight = useRef(false);

  const selected = matches.find((m) => m.id === selectedId) ?? null;

  function updateField(field: "name" | "location", value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: "" } : prev));
    setNotice(null);
  }

  function restart() {
    setStep("search");
    setMatches([]);
    setSelectedId(null);
    setErrors({});
    setNotice(null);
    setResult(null);
  }

  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (inFlight.current) return;

    const name = form.name.trim();
    const location = form.location.trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Enter a pharmacy name.";
    else if (name.length < 3) nextErrors.name = "Enter at least 3 characters of the pharmacy name.";
    else if (!/[a-zA-Z]/.test(name)) nextErrors.name = "Enter the pharmacy's name, not a number.";

    if (!location) nextErrors.location = "Enter a city, ZIP code, or postcode.";
    else if (!looksLikeLocation(location))
      nextErrors.location = "Enter a valid city, ZIP code, or postcode.";

    setErrors(nextErrors);
    setNotice(null);
    if (Object.keys(nextErrors).length > 0) return;

    inFlight.current = true;
    setSearching(true);
    setMatches([]);

    try {
      const res = await fetch(internalApi("pharmacy-claim/search"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data?.errors) setErrors(data.errors);
        else setNotice(data?.message || "Something went wrong while searching. Please try again.");
        return;
      }

      if (!data.matched || !Array.isArray(data.matches) || data.matches.length === 0) {
        setNotice(data?.message || NO_MATCH_MESSAGE);
        return;
      }

      const found = data.matches as PharmacyMatch[];
      setMatches(found);
      setSearched({ name, location });
      setSelectedId(found.length === 1 ? found[0].id : null);
      setStep("select");
    } catch {
      setNotice("Something went wrong while searching. Please try again.");
    } finally {
      setSearching(false);
      inFlight.current = false;
    }
  }

  function handleContinue() {
    if (!selected) {
      setErrors({ select: "Select the pharmacy you want to claim." });
      return;
    }
    setErrors({});
    setNotice(null);
    setStep("verify");
  }

  async function handleClaim(e: FormEvent) {
    e.preventDefault();
    if (inFlight.current || !selected) return;

    const workEmail = contact.workEmail.trim();
    /*
     * Format only. The domain is not a gate: an independent pharmacist often
     * has no company address, and plenty of existing ZoikoMeds users are on
     * Gmail or Outlook. The server decides what corroboration the claim needs.
     */
    const emailCheck = validateEmail(workEmail);
    if (!emailCheck.isValid) {
      setErrors({ workEmail: emailCheck.error ?? "Enter a valid email address." });
      scrollToFirstError("workEmail");
      return;
    }

    setErrors({});
    setNotice(null);
    inFlight.current = true;
    setSubmitting(true);

    try {
      const res = await fetch(internalApi("pharmacy-claim"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pharmacy: selected,
          workEmail,
          fullName: contact.fullName.trim(),
          searchedName: searched.name,
          searchedLocation: searched.location,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data?.success) {
        if (data?.errors) {
          setErrors(data.errors);
          // A refused claim is almost always about the address: focus it back.
          if (data.errors.workEmail) scrollToFirstError("workEmail");
        } else {
          setNotice(data?.message || "Something went wrong. Please try again.");
        }
        return;
      }

      setResult({ emailSent: Boolean(data.emailSent), email: workEmail });
      setStep("sent");
    } catch {
      setNotice("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
      inFlight.current = false;
    }
  }

  return (
    <div
      className="w-full rounded-2xl border border-[#E7EAF1] bg-white p-8 shadow-[0_20px_45px_-30px_rgba(15,31,78,0.25)] animate-[portalLimitsNextStepFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "1350ms" }}
    >
      <h3 className="text-[18px] font-bold text-[#0F1F4E]">
        Claim or verify your pharmacy
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#5B6478]">
        Find your pharmacy profile and request authorized control.
        Sensitive license evidence is collected later, in a secure
        workflow.
      </p>

      {/* ---------------- Step 1: search the real directory ---------------- */}
      {step === "search" && (
        <form className="mt-6 space-y-5" onSubmit={handleSearch} noValidate>
          <Field
            id="claim-pharmacy-name"
            label="Pharmacy name"
            value={form.name}
            error={errors.name}
            placeholder="e.g. Riverside Community Pharmacy"
            onChange={(v) => updateField("name", v)}
          />

          <Field
            id="claim-pharmacy-location"
            label="Location"
            value={form.location}
            error={errors.location}
            placeholder="City, ZIP code, or postcode"
            onChange={(v) => updateField("location", v)}
          />

          <SubmitButton loading={searching} loadingLabel="Searching...">
            Find my pharmacy
          </SubmitButton>

          {notice && <FormNotice>{notice}</FormNotice>}
        </form>
      )}

      {/* ---------------- Step 2: pick the matched pharmacy ---------------- */}
      {step === "select" && (
        <div className="mt-6">
          <p className="text-[13px] font-medium text-[#0E8F70]">
            {matches.length === 1
              ? "We found 1 matching pharmacy"
              : `We found ${matches.length} matching pharmacies`}{" "}
            for &quot;{searched.name}&quot; near {searched.location}.
          </p>
          <p className="mt-1 text-[12.5px] text-[#5B6478]">
            Select the pharmacy you want to claim.
          </p>

          <div className="mt-4 space-y-3" role="radiogroup" aria-label="Matching pharmacies">
            {matches.map((match) => (
              <MatchOption
                key={match.id}
                match={match}
                checked={selectedId === match.id}
                onSelect={() => {
                  setSelectedId(match.id);
                  setErrors({});
                }}
              />
            ))}
          </div>

          {errors.select && (
            <p className="mt-2 text-[12px] text-[#C5453F]" role="alert">
              {errors.select}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleContinue}
              className="flex flex-1 items-center justify-center rounded-xl px-5 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
              style={{ backgroundColor: ACCENT }}
            >
              Continue
            </button>
            <button
              type="button"
              onClick={restart}
              className="rounded-xl border border-[#D7DCE6] bg-white px-5 py-3.5 text-[14px] font-semibold text-[#0F1F4E] transition-all duration-300 ease-out hover:border-[#9FE3D3] hover:bg-[#EAFAF4] hover:text-[#00786F]"
            >
              Search again
            </button>
          </div>
        </div>
      )}

      {/* ---------------- Step 3: collect a work email ---------------- */}
      {step === "verify" && selected && (
        <form className="mt-6 space-y-5" onSubmit={handleClaim} noValidate>
          <div className="rounded-xl border border-[#D8EFE7] bg-[#F3FBF8] p-4">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#0E8F70]">
              Claiming
            </p>
            <p className="mt-1 text-[14px] font-bold text-[#0F1F4E]">{selected.name}</p>
            {selected.address && (
              <p className="text-[12.5px] text-[#5B6478]">{selected.address}</p>
            )}
            <button
              type="button"
              onClick={() => setStep("select")}
              className="mt-2 text-[12.5px] font-semibold text-[#00786F] underline underline-offset-2"
            >
              Choose a different pharmacy
            </button>
          </div>

          <Field
            id="claim-full-name"
            label="Your full name"
            value={contact.fullName}
            placeholder="e.g. Alex Morgan"
            optional
            onChange={(v) => setContact((prev) => ({ ...prev, fullName: v }))}
          />

          <Field
            id="claim-work-email"
            name="workEmail"
            label="Work email"
            type="email"
            value={contact.workEmail}
            error={errors.workEmail}
            placeholder="you@yourpharmacy.com"
            hint="We'll send verification steps here. Use the address you already use with ZoikoMeds if you have one."
            onChange={(v) => {
              setContact((prev) => ({ ...prev, workEmail: v }));
              setErrors((prev) => (prev.workEmail ? { ...prev, workEmail: "" } : prev));
            }}
          />

          <SubmitButton loading={submitting} loadingLabel="Sending...">
            Submit claim &amp; request verification
          </SubmitButton>

          {notice && <FormNotice>{notice}</FormNotice>}

          {selected.verified && (
            <p className="text-[12.5px] text-[#5B6478]">
              Already have portal access for this pharmacy?{" "}
              <a
                href={appUrl("/login")}
                className="font-semibold text-[#00786F] underline underline-offset-2"
              >
                Sign in instead
              </a>
              .
            </p>
          )}
        </form>
      )}

      {/* ---------------- Step 4: outcome ---------------- */}
      {step === "sent" && result && (
        <div className="mt-6">
          {result.emailSent ? (
            <p className="flex items-start gap-2 text-[13px] font-medium text-[#0E8F70]">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.5 8.5l3 3 6-6.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>
                We&apos;ve emailed {result.email} about your claim on{" "}
                {selected?.name ?? "your pharmacy"}. Check your inbox for next steps.
              </span>
            </p>
          ) : (
            <p className="text-[13px] font-medium text-[#0F1F4E]">
              Your claim request for {selected?.name ?? "your pharmacy"} has been recorded. Our
              verification team will contact you at {result.email}.
            </p>
          )}

          <button
            type="button"
            onClick={restart}
            className="mt-4 text-[12.5px] font-semibold text-[#00786F] underline underline-offset-2"
          >
            Claim another pharmacy
          </button>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- */
/*  Form primitives                                                     */
/* ----------------------------------------------------------------- */
function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  hint,
  type = "text",
  optional,
  name,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  type?: string;
  optional?: boolean;
  /** Lets scrollToFirstError() focus this input by name. */
  name?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[12.5px] font-semibold text-[#0F1F4E]"
      >
        {label}
        {optional && <span className="ml-1 font-normal text-[#9AA1B5]">(optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-[#0F1F4E] placeholder:text-[#9AA1B5] outline-none transition-colors duration-200 ${
          error
            ? "border-[#E0635C] focus:border-[#E0635C]"
            : "border-[#D7DCE6] focus:border-[#0FAA87]"
        }`}
      />
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[12px] text-[#C5453F]" role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-[12px] text-[#5B6478]">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

function SubmitButton({
  loading,
  loadingLabel,
  children,
}: {
  loading: boolean;
  loadingLabel: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      aria-busy={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      style={{ backgroundColor: ACCENT }}
    >
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path
            d="M21 12a9 9 0 0 0-9-9"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      )}
      {loading ? loadingLabel : children}
    </button>
  );
}

function FormNotice({ children }: { children: React.ReactNode }) {
  return (
    <p role="alert" className="text-[13px] font-medium text-[#C5453F]">
      {children}
    </p>
  );
}

function MatchOption({
  match,
  checked,
  onSelect,
}: {
  match: PharmacyMatch;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors duration-200 ${
        checked
          ? "border-[#0FAA87] bg-[#F3FBF8]"
          : "border-[#D7DCE6] bg-white hover:border-[#9FE3D3]"
      }`}
    >
      <input
        type="radio"
        name="verification-pharmacy-match"
        value={match.id}
        checked={checked}
        onChange={onSelect}
        className="mt-1 h-4 w-4 accent-[#0FAA87]"
      />
      <span className="flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-[14px] font-bold text-[#0F1F4E]">{match.name}</span>
          {match.verified ? (
            <span className="rounded-full bg-[#E6F7F1] px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-[#00786F]">
              Verified
            </span>
          ) : (
            <span className="rounded-full bg-[#F1F3F8] px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-[#5B6478]">
              Unclaimed
            </span>
          )}
        </span>
        {match.address && (
          <span className="mt-0.5 block text-[12.5px] text-[#5B6478]">{match.address}</span>
        )}
        {match.distanceKm != null && (
          <span className="mt-0.5 block text-[12px] text-[#9AA1B5]">
            {match.distanceKm} km away
          </span>
        )}
      </span>
    </label>
  );
}

/* ----------------------------------------------------------------- */
/*  Skeletons                                                           */
/* ----------------------------------------------------------------- */
function HeaderSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-8 w-full max-w-sm animate-pulse rounded-lg bg-white" />
      <div className="h-4 w-full max-w-lg animate-pulse rounded bg-white" />
    </div>
  );
}

function LimitCardSkeleton() {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-9 w-9 flex-shrink-0 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}

function NextStepCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-5 h-9 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-[#E7EAF1] bg-white p-8">
      <div className="h-5 w-56 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3.5 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3.5 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-6 space-y-5">
        <div className="h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
        <div className="h-12 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
      </div>
    </div>
  );
}