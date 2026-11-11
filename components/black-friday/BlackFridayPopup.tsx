"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles, Check, ArrowRight } from "lucide-react";

/**
 * Site-wide Black Friday / Cyber Monday popup. Opens once per browser session
 * shortly after the first page load, never on the Black Friday page itself or
 * on account pages, and stops appearing once the promotion has ended.
 */

const PROMO_START = new Date("2026-11-27T00:00:00+05:30");
const PROMO_END = new Date("2026-12-01T00:00:00+05:30"); // end of Cyber Monday, 30 Nov (IST)
const SEEN_KEY = "zm_bf2026_popup_seen";
const OPEN_DELAY_MS = 1500;

const EXCLUDED_PREFIXES = [
  "/black-friday",
  "/sign-in",
  "/create-account",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/auth",
  "/internal",
];

function isExcluded(pathname: string | null): boolean {
  if (!pathname) return true;
  const path = pathname.replace(/^\/in(?=\/|$)/, "") || "/";
  return EXCLUDED_PREFIXES.some((p) => path.startsWith(p));
}

function getRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function countdownState() {
  const live = Date.now() >= PROMO_START.getTime();
  return { live, time: getRemaining(live ? PROMO_END : PROMO_START) };
}

function Countdown() {
  const [{ live, time }, setState] = useState(countdownState);

  useEffect(() => {
    const id = window.setInterval(() => setState(countdownState()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const units: [string, number][] = [
    ["Days", time.days],
    ["Hrs", time.hours],
    ["Min", time.minutes],
    ["Sec", time.seconds],
  ];

  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#01A89E] mb-2">
        {live ? "Offer ends in" : "Deals go live in"}
      </p>
      <div className="flex gap-2" aria-live="off">
        {units.map(([label, value]) => (
          <div
            key={label}
            className="w-[50px] sm:w-[60px] rounded-lg bg-white/[0.07] border border-white/10 py-1 sm:py-1.5 text-center"
          >
            <span className="block text-base sm:text-xl font-black tabular-nums leading-none text-white">
              {String(value).padStart(2, "0")}
            </span>
            <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400 mt-1">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlackFridayPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  // Decide once, on mount, whether this visit should see the popup.
  useEffect(() => {
    if (Date.now() >= PROMO_END.getTime()) return;
    if (isExcluded(pathname)) return;
    try {
      if (window.sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      /* storage blocked — still show it once for this page view */
    }
    const id = window.setTimeout(() => {
      returnFocus.current = document.activeElement as HTMLElement | null;
      setOpen(true);
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }, OPEN_DELAY_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus?.();
  }, []);

  // Escape to close, simple focus trap, and lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#060b22]/75 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bf-popup-title"
            aria-describedby="bf-popup-desc"
            className="relative w-full max-w-[1000px] overflow-hidden rounded-[24px] sm:rounded-[28px] bg-[#172459] text-white shadow-[0_30px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            {/* Glow orbs */}
            <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-[#01A89E]/30 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-28 right-10 h-72 w-72 rounded-full bg-[#3b4fb8]/40 blur-3xl" aria-hidden="true" />

            {/* Outline watermark */}
            <div
              className="pointer-events-none absolute -bottom-6 left-4 select-none text-[120px] sm:text-[170px] font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.06)]"
              aria-hidden="true"
            >
              25%
            </div>

            {/* Close */}
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close Black Friday offer"
              className="absolute top-3 right-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white/80 ring-1 ring-white/15 backdrop-blur transition hover:bg-white hover:text-[#172459] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#01A89E]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12">
              {/* Image column */}
              <div className="relative md:col-span-5 h-28 sm:h-40 md:h-auto overflow-hidden">
                <Image
                  src="/Black-Friday-landing-page/bfl1.png"
                  alt="Pharmacist checking medicine information on a tablet"
                  fill
                  sizes="(max-width: 768px) 100vw, 360px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#172459] via-[#172459]/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#172459]/10 md:to-[#172459]" />

                {/* Spinning discount sticker */}
                <motion.div
                  className="absolute left-3 bottom-2 md:left-6 md:bottom-6 flex h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 items-center justify-center rounded-full bg-[#01A89E] text-[#002f35] shadow-[0_10px_30px_rgba(1,168,158,0.45)]"
                  initial={{ rotate: -25, scale: 0 }}
                  animate={{ rotate: -12, scale: 1 }}
                  transition={{ delay: 0.35, type: "spring", stiffness: 220, damping: 12 }}
                >
                  <motion.svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 h-full w-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                    aria-hidden="true"
                  >
                    <defs>
                      <path id="bf-circle" d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0" />
                    </defs>
                    <text fontSize="9" fontWeight="800" letterSpacing="2.4" fill="#002f35">
                      <textPath href="#bf-circle">BLACK FRIDAY • CYBER MONDAY •</textPath>
                    </text>
                  </motion.svg>
                  <div className="text-center leading-none">
                    <span className="block text-xl sm:text-2xl md:text-3xl font-black">25%</span>
                    <span className="block text-[10px] font-black uppercase tracking-wider">off</span>
                  </div>
                </motion.div>
              </div>

              {/* Content column */}
              <div className="md:col-span-7 px-5 py-4 sm:px-8 sm:py-6 md:pl-4 md:pr-12 md:py-8">
                <div className="inline-flex items-center rounded bg-[#273673]/80 border border-white/15 p-1 shadow-sm">
                  <span className="bg-white text-[#172459] font-black text-[10px] sm:text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-[2px]">
                    Black Friday
                  </span>
                  <span className="text-white text-[11px] sm:text-xs font-medium px-2.5">
                    27 Nov – Cyber Monday 30 Nov 2026
                  </span>
                </div>

                <h2
                  id="bf-popup-title"
                  className="mt-3 sm:mt-4 text-[22px] sm:text-[32px] font-black leading-[1.08] tracking-tight"
                >
                  <span className="text-[#01A89E]">25% off</span> the first
                  <br className="hidden sm:block" /> three months.
                </h2>

                <p id="bf-popup-desc" className="mt-2 text-[13px] sm:text-[15px] leading-snug sm:leading-relaxed text-slate-300">
                  On Chemist Pro and Multi-site Pro subscriptions for eligible new pharmacy
                  partners — independent pharmacies, pharmacy groups, chains and hospitals in India.
                </p>

                <ul className="mt-3 sm:mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px] sm:text-[13px] text-slate-200">
                  {[
                    "Network Core free, permanently",
                    "30-day Chemist Pro free trial",
                    "No card required to start",
                    "Demand bands & shortage alerts",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#01A89E]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-3 sm:mt-5">
                  <Countdown />
                </div>

                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <Link
                    href="/black-friday"
                    onClick={() => setOpen(false)}
                    className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#01A89E] px-6 py-3 text-sm sm:text-[15px] font-bold text-[#002f35] shadow-[0_8px_24px_rgba(1,168,158,0.35)] transition hover:bg-[#00baae] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {/* shimmer */}
                    <span
                      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/40 blur-sm animate-[bf-shimmer_2.6s_ease-in-out_infinite]"
                      aria-hidden="true"
                    />
                    <Sparkles className="h-4 w-4" />
                    Claim Black Friday deal
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <button
                    type="button"
                    onClick={close}
                    className="text-sm font-medium text-slate-400 underline-offset-4 hover:text-white hover:underline"
                  >
                    Maybe later
                  </button>
                </div>

                <p className="mt-3 sm:mt-4 text-[10px] sm:text-[11px] leading-snug text-slate-500">
                  Standard price applies from month four. Platform subscriptions only — never applies to medicines.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
