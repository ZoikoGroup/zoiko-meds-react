"use client";

import { useEffect, useState } from "react";

const ACCENT = "#0FAA87";

const ACCEPTANCE_ROWS = [
  {
    label: "First-time website visitor",
    content: (
      <span className="text-[13.5px] leading-relaxed text-[#5B6478]">
        The Terms are accessible from the footer. No forced agreement
        unless using interactive account, portal, or API features.
      </span>
    ),
  },
  {
    label: "Account creation",
    content: (
      <span className="text-[13.5px] leading-relaxed text-[#5B6478]">
        A short acknowledgement is shown with links to the Terms,
        Privacy Center, Medical Disclaimer, and Cookie Settings.
      </span>
    ),
  },
  {
    label: "Login after a material update",
    content: (
      <span className="text-[13.5px] leading-relaxed text-[#5B6478]">
        A version-update notice is shown, and acknowledgement is
        required where legally necessary.
      </span>
    ),
  },
  {
    label: "Pharmacy portal access",
    content: (
      <span className="text-[13.5px] leading-relaxed text-[#5B6478]">
        Acceptance is tied to the authorized pharmacy role and
        organization permissions.
      </span>
    ),
  },
  {
    label: "Enterprise / API access",
    content: (
      <span className="text-[13.5px] leading-relaxed text-[#5B6478]">
        Contract or clickwrap acceptance is required based on product
        tier; API key use is blocked until accepted.
      </span>
    ),
  },
  {
    label: "Cookie consent",
    content: (
      <span className="text-[13.5px] leading-relaxed text-[#5B6478]">
        Cookie preferences are managed in{" "}
        <a
          href="/cookie-settings"
          className="font-semibold underline underline-offset-2 transition-colors duration-200 hover:opacity-80"
          style={{ color: ACCENT }}
        >
          Cookie Settings
        </a>
        , not through the Terms.
      </span>
    ),
  },
  {
    label: "Disputes & contact",
    content: (
      <span className="text-[13.5px] leading-relaxed text-[#5B6478]">
        General legal questions route to{" "}
        <a
          href="/contact"
          className="font-semibold underline underline-offset-2 transition-colors duration-200 hover:opacity-80"
          style={{ color: ACCENT }}
        >
          Contact
        </a>
        ; privacy to{" "}
        <a
          href="/privacy-center"
          className="font-semibold underline underline-offset-2 transition-colors duration-200 hover:opacity-80"
          style={{ color: ACCENT }}
        >
          Privacy Center
        </a>
        ; accessibility to Accessibility; pharmacy issues to Pharmacy
        Support; emergency or clinical issues away from ZoikoMeds to
        the appropriate professional or emergency service.
      </span>
    ),
  },
] as const;

export default function TermsOfUseAcceptanceSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 250);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#F4F6FA] py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* ---------------- Eyebrow + heading ---------------- */}
        {mounted ? (
          <>
            <Reveal index={0}>
              <span
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: ACCENT }}
              >
                04 · Acceptance, Updates &amp; Disputes
              </span>
            </Reveal>

            <Reveal index={1}>
              <h2 className="mt-3 max-w-2xl font-[var(--font-plus-jakarta-sans)] text-3xl font-bold leading-[1.2] text-[#0F1F4E] sm:text-[2.35rem]">
                How you accept, get updates, and{" "}
                <span style={{ color: ACCENT }}>raise concerns.</span>
              </h2>
            </Reveal>
          </>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="h-3 w-64 animate-pulse rounded bg-[#E4E8F0]" />
            <div className="h-9 w-full max-w-xl animate-pulse rounded-lg bg-[#E4E8F0]" />
          </div>
        )}

        {/* ---------------- Acceptance rows card ---------------- */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[#E7EAF1] bg-white shadow-[0_16px_40px_-16px_rgba(15,31,78,0.10)]">
          {mounted
            ? ACCEPTANCE_ROWS.map((row, i) => (
                <Reveal key={row.label} index={2 + i}>
                  <AcceptanceRow
                    label={row.label}
                    isLast={i === ACCEPTANCE_ROWS.length - 1}
                  >
                    {row.content}
                  </AcceptanceRow>
                </Reveal>
              ))
            : Array.from({ length: 7 }).map((_, i) => (
                <AcceptanceRowSkeleton key={i} isLast={i === 6} />
              ))}
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
      className="animate-[zoikoSignalFadeUp_0.6s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 60}ms` }}
    >
      {children}
      <style jsx>{`
        @keyframes zoikoSignalFadeUp {
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
/*  Acceptance row                                                      */
/* ----------------------------------------------------------------- */
function AcceptanceRow({
  label,
  isLast,
  children,
}: {
  label: string;
  isLast: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`group flex flex-col gap-2 px-7 py-5 transition-colors duration-200 hover:bg-[#F7F9FC] sm:flex-row sm:items-start sm:gap-8 ${
        isLast ? "" : "border-b border-[#EEF1F6]"
      }`}
    >
      <span className="w-full flex-shrink-0 text-[13.5px] font-bold text-[#0F1F4E] sm:w-52">
        {label}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function AcceptanceRowSkeleton({ isLast }: { isLast: boolean }) {
  return (
    <div
      className={`flex items-start gap-8 px-7 py-5 ${
        isLast ? "" : "border-b border-[#EEF1F6]"
      }`}
    >
      <div className="w-52 flex-shrink-0">
        <div className="h-4 w-40 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
      <div className="flex-1 space-y-2">
        <div className="h-3 w-full animate-pulse rounded bg-[#E4E8F0]" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-[#E4E8F0]" />
      </div>
    </div>
  );
}