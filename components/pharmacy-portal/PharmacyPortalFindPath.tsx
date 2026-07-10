"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

/**
 * PharmacyPortalFindPathSection
 * "Find the right pharmacy path" section — header, a 2x3 grid of path
 * cards (icon, title, copy, CTA — first card solid, rest outline), and
 * a functional "Claim or verify your pharmacy" search form.
 *
 * Brand accent for this page: #0FAA87
 */

const ACCENT = "#0FAA87";

const PATHS = [
  {
    icon: "lock",
    title: "Existing verified pharmacy",
    description: "Approved pharmacy users who need portal access.",
    cta: "Sign In to Pharmacy Portal",
    variant: "solid",
    link:"#"
  },
  {
    icon: "home",
    title: "New or unclaimed pharmacy",
    description:
      "Pharmacies that need to verify, claim, or activate participation.",
    cta: "Claim Your Pharmacy",
    variant: "outline",
    link:"#claim-your-pharmacy"
  },
  {
    icon: "shield",
    title: "Join the verified network",
    description: "Pharmacies not yet participating in ZoikoMeds.",
    cta: "Join the Verified Network",
    variant: "outline",
    link:"/join-the-network#verified-network"
  },
  {
    icon: "code",
    title: "Group or integration team",
    description:
      "Multi-branch operators, PMS/POS, API, or structured-feed discussions.",
    cta: "Discuss Integration",
    variant: "outline",
    link:"#"
  },
  {
    icon: "help",
    title: "Portal support",
    description:
      "Access, confirmation, verification, data-control, or technical issues.",
    cta: "Get Pharmacy Support",
    variant: "outline",
    link:"#"
  },
] as const;

type FormState = {
  name: string;
  location: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function PharmacyPortalFindPathSection() {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>({ name: "", location: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

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

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (status === "success" || status === "error") {
      setStatus("idle");
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const nextErrors: Partial<FormState> = {};
    if (!form.name.trim()) {
      nextErrors.name = "Enter a pharmacy name.";
    }
    if (!form.location.trim()) {
      nextErrors.location = "Enter a city, ZIP code, or postcode.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      // TODO: replace with the real lookup endpoint, e.g.
      // const res = await fetch("/api/pharmacy/search", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error("Lookup failed");
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section ref={ref} className="relative w-full bg-[#F4F6FA] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* ---------------- Header ---------------- */}
        <div className="mx-auto max-w-2xl text-center">
          {mounted ? (
            <>
              <Reveal index={0}>
                <h2 className="font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-tight text-[#0F1F4E] sm:text-[2.25rem]">
                  Find the <span style={{ color: ACCENT }}>right pharmacy path.</span>
                </h2>
              </Reveal>

              <Reveal index={1}>
                <p className="mx-auto mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#5B6478]">
                  Whether you&apos;re signing in, claiming, joining,
                  integrating, or seeking support — start here.
                </p>
              </Reveal>
            </>
          ) : (
            <HeaderSkeleton />
          )}
        </div>

        {/* ---------------- Path cards ---------------- */}
        <div id="claim-your-pharmacy" className="mx-auto mt-12 grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mounted
            ? PATHS.map((p, i) => <PathCard key={p.title} {...p} index={i} />)
            : PATHS.map((_, i) => <PathCardSkeleton key={i} />)}
        </div>

        {/* ---------------- Claim / verify form ---------------- */}
        <div className="mx-auto mt-8 max-w-5xl">
          {mounted ? (
            <ClaimForm
              form={form}
              errors={errors}
              status={status}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          ) : (
            <FormSkeleton />
          )}
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
      className="animate-[portalFindPathFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 100}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes portalFindPathFadeUp {
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
/*  Path card                                                           */
/* ----------------------------------------------------------------- */
function PathCard({
  icon,
  title,
  description,
  cta,
  variant,
  index,
  link
}: {
  icon: "lock" | "home" | "shield" | "code" | "help";
  title: string;
  description: string;
  cta: string;
  variant: "solid" | "outline";
  index: number;
  link:string;
}) {
  return (
    <div
      className="group flex flex-col rounded-2xl border border-[#E7EAF1] bg-white p-6 transition-all duration-300 ease-out animate-[portalFindPathFadeUp_0.6s_ease-out_forwards] hover:-translate-y-1"
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
        className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundColor: "#0F1F4E", color: "#FFFFFF" }}
      >
        <PathIcon name={icon} />
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

function PathIcon({ name }: { name: "lock" | "home" | "shield" | "code" | "help" }) {
  const common = { viewBox: "0 0 24 24", fill: "none" as const, className: "h-5 w-5" };

  switch (name) {
    case "lock":
      return (
        <svg {...common}>
          <rect x="5" y="11" width="14" height="9" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
          <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" stroke="currentColor" strokeWidth="1.6" />
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
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M12 3.5l7 2.5v5.4c0 4.6-3 7.7-7 9.1-4-1.4-7-4.5-7-9.1V6l7-2.5z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path
            d="M9 8l-4 4 4 4M15 8l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "help":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M9.8 9.5a2.2 2.2 0 1 1 3.3 2c-.8.5-1.1.9-1.1 1.8"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx="12" cy="16.5" r="0.6" fill="currentColor" />
        </svg>
      );
  }
}

/* ----------------------------------------------------------------- */
/*  Claim / verify form                                                 */
/* ----------------------------------------------------------------- */
function ClaimForm({
  form,
  errors,
  status,
  onChange,
  onSubmit,
}: {
  form: FormState;
  errors: Partial<FormState>;
  status: FormStatus;
  onChange: (field: keyof FormState, value: string) => void;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <div
      className="rounded-2xl border border-[#E7EAF1] bg-white p-8 shadow-[0_20px_45px_-30px_rgba(15,31,78,0.25)] animate-[portalFindPathFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: "750ms" }}
    >
      <h3 className="text-[18px] font-bold text-[#0F1F4E]">
        Claim or verify your pharmacy
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#5B6478]">
        Already appear in ZoikoMeds search or registry data? Find your
        pharmacy profile and request authorized control.
      </p>

      <form className="mt-6 space-y-5" onSubmit={onSubmit} noValidate>
        <div>
          <label
            htmlFor="pharmacy-name"
            className="mb-1.5 block text-[12.5px] font-semibold text-[#0F1F4E]"
          >
            Pharmacy name
          </label>
          <input
            id="pharmacy-name"
            type="text"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="e.g. Riverside Community Pharmacy"
            aria-invalid={Boolean(errors.name)}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-[#0F1F4E] placeholder:text-[#9AA1B5] outline-none transition-colors duration-200 ${
              errors.name
                ? "border-[#E0635C] focus:border-[#E0635C]"
                : "border-[#D7DCE6] focus:border-[#0FAA87]"
            }`}
          />
          {errors.name && (
            <p className="mt-1.5 text-[12px] text-[#C5453F]">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="pharmacy-location"
            className="mb-1.5 block text-[12.5px] font-semibold text-[#0F1F4E]"
          >
            Location
          </label>
          <input
            id="pharmacy-location"
            type="text"
            value={form.location}
            onChange={(e) => onChange("location", e.target.value)}
            placeholder="City, ZIP code, or postcode"
            aria-invalid={Boolean(errors.location)}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-[#0F1F4E] placeholder:text-[#9AA1B5] outline-none transition-colors duration-200 ${
              errors.location
                ? "border-[#E0635C] focus:border-[#E0635C]"
                : "border-[#D7DCE6] focus:border-[#0FAA87]"
            }`}
          />
          {errors.location && (
            <p className="mt-1.5 text-[12px] text-[#C5453F]">
              {errors.location}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          style={{ backgroundColor: ACCENT }}
        >
          {status === "submitting" && (
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
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
          {status === "submitting" ? "Searching..." : "Find my pharmacy"}
        </button>

        {status === "success" && (
          <p className="flex items-center gap-2 text-[13px] font-medium text-[#0E8F70]">
            <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.5 8.5l3 3 6-6.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            We found matching results for &quot;{form.name}&quot; near{" "}
            {form.location}. Check your inbox for next steps.
          </p>
        )}

        {status === "error" && (
          <p className="text-[13px] font-medium text-[#C5453F]">
            Something went wrong while searching. Please try again.
          </p>
        )}
      </form>
    </div>
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

function PathCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-6">
      <div className="h-10 w-10 animate-pulse rounded-xl bg-[#E4E8F0]" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-[#E4E8F0]" />
      <div className="mt-3 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-5/6 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="mt-5 h-9 w-full animate-pulse rounded-xl bg-[#E4E8F0]" />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="rounded-2xl border border-[#E7EAF1] bg-white p-8">
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