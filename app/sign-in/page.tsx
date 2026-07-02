"use client"
import { useState } from "react";
import { KeyRound, CreditCard } from "lucide-react";

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full bg-white flex justify-center flex-col items-center py-4 px-4 gap-4">
            {/* Logo */}
            <img src="logo.png" alt="image" width={278} height={37} />

            {/* Card */}
            <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-sm px-8 py-4">
                <h2 className="text-2xl font-bold text-slate-900 text-center">Sign in</h2>
                <p className="text-sm text-slate-500 text-center mt-1">
                    Access your ZoikoMeds account
                </p>

                <form className="mt-2 space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-800 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="w-full rounded-lg border border-teal-500 bg-slate-50 px-3.5 py-2 text-sm outline-none ring-2 ring-teal-100 placeholder:text-slate-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-800 mb-1.1">
                            Password
                        </label>
                        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 px-3.5">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-slate-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                className="text-sm font-medium text-slate-700 shrink-0"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg cursor-pointer bg-teal-600 hover:bg-teal-700 transition-colors text-white font-semibold py-2 text-sm"
                    >
                        Sign in
                    </button>
                </form>

                <div className="flex items-center gap-3 my-2">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs text-slate-400">or</span>
                    <div className="h-px flex-1 bg-slate-200" />
                </div>

                <div className="space-y-3">
                    <button className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                        <KeyRound size={16} />
                        Continue with passkey
                    </button>
                    <button className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50">
                        <CreditCard size={16} />
                        Continue with SSO
                    </button>
                </div>

                <div className="flex items-center justify-center gap-2 mt-3 text-sm">
                    <a href="#" className="text-teal-600 font-medium hover:underline">
                        Forgot password?
                    </a>
                    <span className="text-slate-300">·</span>
                    <a href="#" className="text-teal-600 font-medium hover:underline">
                        Create account
                    </a>
                </div>

                <p className="text-center text-sm text-slate-500 mt-1">Need help?</p>
            </div>

            {/* Footer links (part of the page, no separate header/footer component) */}
            <div className="flex items-center gap-2 text-xs text-[#7C8A9B]">
                <img src="lock.png" alt="lock" />
                <span>Privacy</span>
                <span>·</span>
                <span>Terms</span>
                <span>·</span>
                <span>Status</span>
            </div>
        </div>
    );
}
