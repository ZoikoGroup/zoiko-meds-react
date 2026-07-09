"use client";

import { useState } from "react";

const ACCENT = "#13A594";

export default function SignInCreateAccountPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    trustDevice: false,
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [signInErrors, setSignInErrors] = useState<Record<string, string>>({});
  const [signUpErrors, setSignUpErrors] = useState<Record<string, string>>({});

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateSignIn = () => {
    const errors: Record<string, string> = {};
    if (!signInData.email.trim()) errors.email = "Email is required";
    if (!signInData.password.trim()) errors.password = "Password is required";
    setSignInErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateSignUp = () => {
    const errors: Record<string, string> = {};
    if (!signUpData.fullName.trim()) errors.fullName = "Full name is required";
    if (!signUpData.email.trim()) errors.email = "Email is required";
    if (!signUpData.password.trim()) errors.password = "Password is required";
    if (signUpData.password !== signUpData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!signUpData.terms) errors.terms = "You must accept the terms";
    setSignUpErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignIn()) {
      console.log("Sign In:", signInData);
    }
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateSignUp()) {
      console.log("Sign Up:", signUpData);
    }
  };

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
              Secure ZoikoMeds Access
            </p>

            {activeTab === "signin" ? (
              <>
                <h1 className="text-[2.2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.5rem]">
                  Sign in to your ZoikoMeds portal
                </h1>
                <p className="mt-4 text-[14px] leading-relaxed text-[#5B6478]">
                  Access secure medicine availability tools, pharmacy partner workflows, wholesale access, enterprise
                  intelligence, reports, and administrative workflows through one role-aware gateway.
                </p>
                <div className="mt-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-[13px] text-[#5B6478]">Role-based access</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-[13px] text-[#5B6478]">MFA & SSO ready</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-[13px] text-[#5B6478]">Privacy-aware workflows</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XIcon />
                    <span className="text-[13px] text-[#5B6478]">No dispensing or advice</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-[2.2rem] font-extrabold leading-tight text-[#0F1F4E] sm:text-[2.5rem]">
                  Create your free ZoikoMeds account
                </h1>
                <p className="mt-4 text-[14px] leading-relaxed text-[#5B6478]">
                  Save medicine searches, manage availability alerts, and review your access activity — all in one secure,
                  privacy-aware account.
                </p>
                <div className="mt-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <SaveIcon />
                    <div>
                      <p className="text-[13px] font-bold text-[#0F1F4E]">Save searches</p>
                      <p className="text-[12px] text-[#5B6478]">Keep the medicines and locations you follow close at hand.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <BellIcon />
                    <div>
                      <p className="text-[13px] font-bold text-[#0F1F4E]">Availability alerts</p>
                      <p className="text-[12px] text-[#5B6478]">Get notified when confidence signals change.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <LockIcon />
                    <div>
                      <p className="text-[13px] font-bold text-[#0F1F4E]">Privately by design</p>
                      <p className="text-[12px] text-[#5B6478]">You control your data and can leave any time.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#E0F7F3] px-3 py-1.5 text-[11px] font-semibold" style={{ color: ACCENT }}>
                    Privacy-aware
                  </span>
                  <span className="rounded-full bg-[#F5F5F5] px-3 py-1.5 text-[11px] font-semibold text-[#5B6478]">
                    No dispensing or advice
                  </span>
                  <span className="rounded-full bg-[#F5F5F5] px-3 py-1.5 text-[11px] font-semibold text-[#5B6478]">
                    Free to use
                  </span>
                </div>
              </>
            )}
          </div>

          {/* ── Right: Form Card ── */}
          <div className="rounded-3xl border bg-white p-8 sm:p-10" style={{ borderColor: "#E7EAF1", boxShadow: "0 4px 24px -10px rgba(15,31,78,0.06)" }}>
            {/* ── Tab Bar ── */}
            <div
              className="mb-8 flex gap-1 rounded-xl p-1.5"
              style={{ backgroundColor: "#EEF1F6" }}
            >
              <button
                onClick={() => setActiveTab("signin")}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-bold transition-all duration-200"
                style={{
                  color: activeTab === "signin" ? ACCENT : "#5B6478",
                  backgroundColor: activeTab === "signin" ? "#FFFFFF" : "transparent",
                  boxShadow: activeTab === "signin" ? "0 1px 3px rgba(15,31,78,0.08)" : "none",
                }}
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <path d="M6 3l5 5-5 5M4 8h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
                Sign In
              </button>
              <button
                onClick={() => setActiveTab("signup")}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-bold transition-all duration-200"
                style={{
                  color: activeTab === "signup" ? ACCENT : "#5B6478",
                  backgroundColor: activeTab === "signup" ? "#FFFFFF" : "transparent",
                  boxShadow: activeTab === "signup" ? "0 1px 3px rgba(15,31,78,0.08)" : "none",
                }}
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <circle cx="6" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
                  <path d="M1.5 14c0-2.8 2-4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                  <path d="M11.5 5.5v4M9.5 7.5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
                </svg>
                Create Account
              </button>
            </div>

            {/* ── Sign In Form ── */}
            {activeTab === "signin" && (
              <form onSubmit={handleSignInSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                    Email address <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={signInData.email}
                    onChange={handleSignInChange}
                    placeholder="you@organization.org"
                    className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors"
                    style={{ borderColor: signInErrors.email ? "#DC2626" : "#E7EAF1" }}
                  />
                  {signInErrors.email && (
                    <p className="mt-1 text-[11px] text-[#DC2626]">{signInErrors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                    Password <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={signInData.password}
                      onChange={handleSignInChange}
                      placeholder="Enter your password"
                      className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors"
                      style={{ borderColor: signInErrors.password ? "#DC2626" : "#E7EAF1" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A93A6] hover:text-[#0F1F4E]"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {signInErrors.password && (
                    <p className="mt-1 text-[11px] text-[#DC2626]">{signInErrors.password}</p>
                  )}
                </div>

                {/* Trust Device + Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="trustDevice"
                      name="trustDevice"
                      checked={signInData.trustDevice}
                      onChange={handleSignInChange}
                      className="h-4 w-4 rounded cursor-pointer"
                      style={{ accentColor: ACCENT }}
                    />
                    <label htmlFor="trustDevice" className="text-[12px] text-[#5B6478] cursor-pointer">
                      Trust this device
                    </label>
                  </div>
                  <a href="#" className="text-[12px] font-semibold" style={{ color: ACCENT }}>
                    Forgot password?
                  </a>
                </div>

                {/* Continue Button */}
                <button
                  type="submit"
                  className="w-full rounded-lg px-4 py-3 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(19,165,148,0.45)]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Continue securely
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" style={{ borderColor: "#E7EAF1" }} />
                  </div>
                  <div className="relative flex justify-center text-[11px] uppercase tracking-wide text-[#8A93A6]">
                    <span className="bg-white px-2">or continue with</span>
                  </div>
                </div>

                {/* Alt Auth Methods */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    className="flex-1 rounded-lg border px-4 py-3 text-[12px] font-bold text-[#0F1F4E] transition-colors hover:bg-[#F9FAFB]"
                    style={{ borderColor: "#E7EAF1" }}
                  >
                    <PasskeyIcon />
                    Use passkey
                  </button>
                  <button
                    type="button"
                    className="flex-1 rounded-lg border px-4 py-3 text-[12px] font-bold text-[#0F1F4E] transition-colors hover:bg-[#F9FAFB]"
                    style={{ borderColor: "#E7EAF1" }}
                  >
                    <SSOIcon />
                    Continue with SSO
                  </button>
                </div>

                {/* Info */}
                <p className="flex items-start gap-2 text-[11px] leading-relaxed text-[#8A93A6]">
                  <InfoIcon />
                  <span>
                    Access is required by organization, role policy, and approved use case. Enterprise users may be
                    redirected to their organization sign-in provider.
                  </span>
                </p>
              </form>
            )}

            {/* ── Sign Up Form ── */}
            {activeTab === "signup" && (
              <form onSubmit={handleSignUpSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                    Full name <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={signUpData.fullName}
                    onChange={handleSignUpChange}
                    placeholder="Your legal or professional name"
                    className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors"
                    style={{ borderColor: signUpErrors.fullName ? "#DC2626" : "#E7EAF1" }}
                  />
                  {signUpErrors.fullName && (
                    <p className="mt-1 text-[11px] text-[#DC2626]">{signUpErrors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                    Email <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={signUpData.email}
                    onChange={handleSignUpChange}
                    placeholder="you@email.com"
                    className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors"
                    style={{ borderColor: signUpErrors.email ? "#DC2626" : "#E7EAF1" }}
                  />
                  {signUpErrors.email && (
                    <p className="mt-1 text-[11px] text-[#DC2626]">{signUpErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                    Phone number <span className="text-[#8A93A6]">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={signUpData.phone}
                    onChange={handleSignUpChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors"
                    style={{ borderColor: "#E7EAF1" }}
                  />
                  <p className="mt-1.5 text-[11px] text-[#8A93A6]">Used only for optional SMS availability alerts. You can add it later.</p>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                    Password <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={signUpData.password}
                      onChange={handleSignUpChange}
                      placeholder="Create a password"
                      className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors"
                      style={{ borderColor: signUpErrors.password ? "#DC2626" : "#E7EAF1" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A93A6] hover:text-[#0F1F4E]"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  <p className="mt-1.5 text-[11px] text-[#8A93A6]">At least 8 characters with a mix of letters, numbers, and a symbol.</p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-[12px] font-bold text-[#0F1F4E] mb-1.5">
                    Confirm password <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={signUpData.confirmPassword}
                      onChange={handleSignUpChange}
                      placeholder="Re-enter your password"
                      className="w-full rounded-lg border bg-white px-3.5 py-2.5 text-[13px] text-[#0F1F4E] placeholder-[#8A93A6] transition-colors"
                      style={{ borderColor: signUpErrors.confirmPassword ? "#DC2626" : "#E7EAF1" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A93A6] hover:text-[#0F1F4E]"
                    >
                      {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {signUpErrors.confirmPassword && (
                    <p className="mt-1 text-[11px] text-[#DC2626]">{signUpErrors.confirmPassword}</p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={signUpData.terms}
                    onChange={handleSignUpChange}
                    className="mt-1 h-4 w-4 rounded cursor-pointer shrink-0"
                    style={{ accentColor: ACCENT }}
                  />
                  <label htmlFor="terms" className="text-[12px] leading-relaxed text-[#5B6478] cursor-pointer">
                    I agree to the Terms & Conditions and Privacy Policy and understand ZoikoMeds provides medicine
                    availability information — not medical advice or dispensing.
                  </label>
                </div>
                {signUpErrors.terms && (
                  <p className="text-[11px] text-[#DC2626]">{signUpErrors.terms}</p>
                )}

                {/* Create Account Button */}
                <button
                  type="submit"
                  className="w-full rounded-lg px-4 py-3 text-[14px] font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-10px_rgba(19,165,148,0.45)]"
                  style={{ backgroundColor: ACCENT }}
                >
                  Create account
                </button>

                {/* Info */}
                <p className="flex items-start gap-2 text-[11px] leading-relaxed text-[#8A93A6]">
                  <InfoIcon />
                  <span>
                    We use this information to verify your account and protect approved healthcare workflows. We&apos;ll
                    send a verification email before your account is active.
                  </span>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* Icons */
function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" style={{ color: "#13A594" }}>
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5 shrink-0 flex-none" style={{ color: "#13A594" }}>
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5 shrink-0 flex-none text-[#8A93A6]">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5 shrink-0 flex-none" style={{ color: "#13A594" }}>
      <path d="M4.5 2.5h7v11h-7v-11z" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M6 5h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-5 w-5 shrink-0 flex-none" style={{ color: "#13A594" }}>
      <path d="M3 6.5c0-.8.1-1.5.3-2.2L8 2l4.7 2.3c.2.7.3 1.4.3 2.2v1.5c0 1.8-.7 3.4-1.9 4.6L8 13.5l-3.1-2.2c-1.2-1.2-1.9-2.8-1.9-4.6V6.5z" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
      <path d="M1 8s2.5-4 7-4 7 4 7 4-2.5 4-7 4-7-4-7-4z" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
      <path d="M2 2l12 12M9.5 9.5c.8.8 2 .8 2.8 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M1 8s2.5-4 7-4 7 4 7 4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function PasskeyIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4" fill="none" />
    </svg>
  );
}

function SSOIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M8 5.5v5M5.5 8h5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0 flex-none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7.2v4M8 5v.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}