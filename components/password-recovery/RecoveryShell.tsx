/**
 * Shared chrome for the password-recovery pages (/forgot-password,
 * /reset-password). Mirrors the two-column layout and design tokens of the
 * sign-in page so the flow reads as one continuous experience.
 */

import { appUrl } from "@/lib/config";

/**
 * Where "sign in" goes from the recovery flow: the authenticated app, which is
 * the only place a session can actually be created. This site's /sign-in page
 * is presentational.
 */
export const SIGN_IN_HREF = appUrl("/login");

export const ACCENT = "#13A594";
export const HEADING = "#0F1F4E";
export const BODY = "#5B6478";
export const BORDER = "#E7EAF1";
export const MUTED = "#8A93A6";
export const DANGER = "#DC2626";

export function RecoveryShell({
  eyebrow,
  title,
  description,
  assurances = [],
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  assurances?: string[];
  children: React.ReactNode;
}) {
  return (
    <main className="relative w-full min-h-screen bg-[#F4F6FA]">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* ── Left: Content ── */}
          <div>
            <p
              className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: ACCENT }}
            >
              <LockIcon />
              {eyebrow}
            </p>

            <h1
              className="text-[2.2rem] font-extrabold leading-tight sm:text-[2.5rem]"
              style={{ color: HEADING }}
            >
              {title}
            </h1>
            <p className="mt-4 text-[14px] leading-relaxed" style={{ color: BODY }}>
              {description}
            </p>

            {assurances.length > 0 && (
              <div className="mt-8 space-y-3">
                {assurances.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-[13px]" style={{ color: BODY }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Form Card ── */}
          <div
            className="rounded-3xl border bg-white p-8 sm:p-10"
            style={{ borderColor: BORDER, boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)" }}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}

/** Teal primary action, matching the sign-in page's "Continue securely" button. */
export function PrimaryButton({
  children,
  disabled,
  type = "submit",
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  type?: "submit" | "button";
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="w-full rounded-lg px-4 py-3 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(19,165,148,0.45)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
      style={{ backgroundColor: ACCENT }}
    >
      {children}
    </button>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 text-[11px]" style={{ color: DANGER }}>
      {message}
    </p>
  );
}

/** Inline banner for API/validation failures that are not tied to one field. */
export function FormAlert({ message }: { message: string }) {
  return (
    <div
      className="rounded-lg px-3.5 py-3 text-[12px] font-medium leading-snug"
      style={{ backgroundColor: "#FEF2F2", color: DANGER }}
      role="alert"
    >
      {message}
    </div>
  );
}

/* Icons — inline SVGs, consistent with the rest of the marketing site. */

export function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" style={{ color: ACCENT }}>
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5 shrink-0 flex-none" style={{ color: ACCENT }}>
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MailCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" style={{ color: ACCENT }}>
      <path d="M3 7.5A1.5 1.5 0 014.5 6h15A1.5 1.5 0 0121 7.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 16.5v-9z" stroke="currentColor" strokeWidth="1.6" fill="none" />
      <path d="M3.5 8l8.5 5.5L20.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function EyeIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
      <path d="M1 8s2.5-4 7-4 7 4 7 4-2.5 4-7 4-7-4-7-4z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

export function EyeOffIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
      <path d="M2 2l12 12M9.5 9.5c.8.8 2 .8 2.8 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M1 8s2.5-4 7-4 7 4 7 4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0 flex-none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7.2v4M8 5v.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function SpinnerIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 animate-spin">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <path d="M14 8a6 6 0 00-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
