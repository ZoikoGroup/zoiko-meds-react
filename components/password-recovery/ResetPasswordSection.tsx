"use client";

import Link from "next/link";
import { useState } from "react";
import { ApiError, resetPassword } from "@/lib/api";
import {
  ACCENT,
  BODY,
  BORDER,
  CheckIcon,
  DANGER,
  EyeIcon,
  EyeOffIcon,
  FieldError,
  FormAlert,
  HEADING,
  InfoIcon,
  MUTED,
  PrimaryButton,
  RecoveryShell,
  SIGN_IN_HREF,
  SpinnerIcon,
} from "./RecoveryShell";

const MIN_LENGTH = 8;

/**
 * Step 2 of password recovery: the landing page for the emailed link. The
 * `token` from the query string is the only credential involved — no session is
 * needed here, which is why this page can live on the marketing site.
 */
export default function ResetPasswordSection({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setConfirmError("");

    if (password.length < MIN_LENGTH) {
      setError(`Password must be at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (password !== confirm) {
      setConfirmError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setDone(true);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "We could not update your password. Please request a new link and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <RecoveryShell
      eyebrow="Secure ZoikoMeds Access"
      title="Set a new password"
      description="Choose a strong password for your ZoikoMeds account. This link can only be used once."
      assurances={[
        "Encrypted in transit and at rest",
        "Any other outstanding reset links are invalidated",
        "You'll sign in with the new password straight away",
      ]}
    >
      {!token ? (
        <div className="space-y-5 text-center">
          <h2 className="text-[18px] font-bold" style={{ color: HEADING }}>
            This link is incomplete
          </h2>
          <p className="text-[13px]" style={{ color: BODY }}>
            The reset link is missing its token, which usually means it was cut short by an email
            client. Request a fresh link and open it directly from the email.
          </p>
          <Link href="/forgot-password" className="block">
            <PrimaryButton type="button">Request a new link</PrimaryButton>
          </Link>
        </div>
      ) : done ? (
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{ backgroundColor: "#E0F7F3" }}
            >
              <CheckIcon />
            </div>
            <div>
              <h2 className="text-[18px] font-bold" style={{ color: HEADING }}>
                Password updated
              </h2>
              <p className="mt-1 text-[13px]" style={{ color: BODY }}>
                Your new password is active. Sign in to continue to your portal.
              </p>
            </div>
          </div>
          <a href={SIGN_IN_HREF} className="block">
            <PrimaryButton type="button">Sign in to ZoikoMeds</PrimaryButton>
          </a>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-5">
          <div>
            <h2 className="text-[18px] font-bold" style={{ color: HEADING }}>
              Choose a new password
            </h2>
            <p className="mt-1 text-[13px]" style={{ color: BODY }}>
              Enter it twice so we can check for typos.
            </p>
          </div>

          {error && <FormAlert message={error} />}

          <div>
            <label htmlFor="password" className="mb-1.5 block text-[12px] font-bold" style={{ color: HEADING }}>
              New password <span style={{ color: DANGER }}>*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={`At least ${MIN_LENGTH} characters`}
                className="w-full rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-[13px] transition-colors placeholder-[#8A93A6]"
                style={{ borderColor: error ? DANGER : BORDER, color: HEADING }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-[#0F1F4E]"
                style={{ color: MUTED }}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            <p className="mt-1.5 text-[11px]" style={{ color: MUTED }}>
              Use a mix of letters, numbers, and a symbol.
            </p>
          </div>

          <div>
            <label htmlFor="confirm" className="mb-1.5 block text-[12px] font-bold" style={{ color: HEADING }}>
              Confirm password <span style={{ color: DANGER }}>*</span>
            </label>
            <input
              id="confirm"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Re-enter your new password"
              className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] transition-colors placeholder-[#8A93A6]"
              style={{ borderColor: confirmError ? DANGER : BORDER, color: HEADING }}
            />
            <FieldError message={confirmError} />
          </div>

          <PrimaryButton disabled={loading}>
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <SpinnerIcon />
                Updating…
              </span>
            ) : (
              "Set password"
            )}
          </PrimaryButton>

          <p className="flex items-start gap-2 text-[11px] leading-relaxed" style={{ color: MUTED }}>
            <InfoIcon />
            <span>
              Reset links expire 60 minutes after they are requested and can only be used once.
            </span>
          </p>

          <div className="border-t pt-5 text-center" style={{ borderColor: BORDER }}>
            <Link
              href="/forgot-password"
              className="text-[12px] font-semibold hover:underline"
              style={{ color: ACCENT }}
            >
              Request a new link
            </Link>
          </div>
        </form>
      )}
    </RecoveryShell>
  );
}
