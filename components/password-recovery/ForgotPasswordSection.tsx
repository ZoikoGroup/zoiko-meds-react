"use client";

import { useState } from "react";
import { ApiError, requestPasswordReset } from "@/lib/api";
import {
  ACCENT,
  BODY,
  BORDER,
  DANGER,
  FormAlert,
  HEADING,
  InfoIcon,
  MUTED,
  MailCheckIcon,
  PrimaryButton,
  RecoveryShell,
  SIGN_IN_HREF,
  SpinnerIcon,
} from "./RecoveryShell";

/**
 * Step 1 of password recovery: ask for the account email and have the backend
 * send a reset link. The response is deliberately identical for known and
 * unknown addresses, so the confirmation screen never reveals whether an
 * account exists.
 */
export default function ForgotPasswordSection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function submit() {
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Email is required");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await requestPasswordReset(trimmed);
      setSent(true);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "We could not send the reset link. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <RecoveryShell
      eyebrow="Secure ZoikoMeds Access"
      title="Reset your ZoikoMeds password"
      description="Enter the email address on your account and we'll send a secure link to set a new password. The link works once and expires in 60 minutes."
      assurances={[
        "One-time secure reset link",
        "Expires in 60 minutes",
        "No password is ever shown or emailed to you",
      ]}
    >
      {sent ? (
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: "#E0F7F3" }}
            >
              <MailCheckIcon />
            </div>
            <div>
              <h2 className="text-[18px] font-bold" style={{ color: HEADING }}>
                Check your email
              </h2>
              <p className="mt-1 text-[13px]" style={{ color: BODY }}>
                We&apos;ve sent a secure password reset link to:
              </p>
            </div>
          </div>

          <div
            className="rounded-xl border px-3.5 py-3 text-center"
            style={{ borderColor: BORDER, backgroundColor: "#F9FAFB" }}
          >
            <span className="break-all text-[13px] font-bold" style={{ color: HEADING }}>
              {email.trim()}
            </span>
          </div>

          <div className="space-y-2.5 border-t pt-5" style={{ borderColor: BORDER }}>
            <p className="text-[12px] font-bold" style={{ color: HEADING }}>
              Didn&apos;t receive it?
            </p>
            <ul className="space-y-2 text-[12px]" style={{ color: BODY }}>
              <li>
                <button
                  type="button"
                  disabled={loading}
                  onClick={submit}
                  className="inline-flex items-center gap-2 font-semibold hover:underline disabled:opacity-60"
                  style={{ color: ACCENT }}
                >
                  Resend the email
                  {loading && <SpinnerIcon />}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setError("");
                  }}
                  className="font-semibold hover:underline"
                  style={{ color: ACCENT }}
                >
                  Use a different email address
                </button>
              </li>
              <li>Check your spam or junk folder</li>
            </ul>
          </div>

          {error && <FormAlert message={error} />}

          <div className="border-t pt-5 text-center" style={{ borderColor: BORDER }}>
            <p className="text-[12px]" style={{ color: BODY }}>
              Need assistance?{" "}
              <a
                href="mailto:support@zoikomeds.com"
                className="font-semibold hover:underline"
                style={{ color: ACCENT }}
              >
                Contact support
              </a>
            </p>
            <a
              href={SIGN_IN_HREF}
              className="mt-3 inline-block text-[12px] font-semibold hover:underline"
              style={{ color: ACCENT }}
            >
              Back to sign in
            </a>
          </div>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void submit();
          }}
          className="space-y-5"
        >
          <div>
            <h2 className="text-[18px] font-bold" style={{ color: HEADING }}>
              Forgot your password?
            </h2>
            <p className="mt-1 text-[13px]" style={{ color: BODY }}>
              We&apos;ll email you a link to choose a new one.
            </p>
          </div>

          {error && <FormAlert message={error} />}

          <div>
            <label htmlFor="email" className="mb-1.5 block text-[12px] font-bold" style={{ color: HEADING }}>
              Email address <span style={{ color: DANGER }}>*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@organization.org"
              className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] transition-colors placeholder-[#8A93A6]"
              style={{ borderColor: error ? DANGER : BORDER, color: HEADING }}
            />
          </div>

          <PrimaryButton disabled={loading}>
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <SpinnerIcon />
                Sending link…
              </span>
            ) : (
              "Send reset link"
            )}
          </PrimaryButton>

          <p className="flex items-start gap-2 text-[11px] leading-relaxed" style={{ color: MUTED }}>
            <InfoIcon />
            <span>
              For your security we send the same confirmation whether or not an account exists for
              that address.
            </span>
          </p>

          <div className="border-t pt-5 text-center" style={{ borderColor: BORDER }}>
            <a
              href={SIGN_IN_HREF}
              className="text-[12px] font-semibold hover:underline"
              style={{ color: ACCENT }}
            >
              Back to sign in
            </a>
          </div>
        </form>
      )}
    </RecoveryShell>
  );
}
