// app/not-found.tsx
// Place this file at: app/not-found.tsx
// Next.js will automatically use this as the 404 page.
//
// If you need the logo image:
//   – Copy your logo.webp into: public/logo.webp
//   – The <Image> tag below references /logo.webp

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0D1B3E] px-6 py-16">

      {/* ── Dot-grid atmosphere ── */}
      <DotGrid />

      {/* ── Radial glow behind 404 ── */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #0FAA87 0%, transparent 70%)" }}
      />

      {/* ── Content card ── */}
      <div className="relative z-10 flex flex-col items-center text-center">

     

        {/* 404 hero numerals */}
        <div
          className="flex items-center gap-2 animate-[zoikoFadeUp_0.6s_ease-out_0.1s_both]"
          aria-label="404"
        >
          {/* First 4 — navy */}
          <span
            className="select-none font-black leading-none tracking-tighter"
            style={{
              fontSize: "clamp(7rem, 18vw, 11rem)",
              color: "#FFFFFF",
              textShadow: "0 0 60px rgba(15,170,135,0.25)",
              fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            4
          </span>

          {/* 0 — cross-emblem circle */}
          <CrossZero />

          {/* Second 4 — teal */}
          <span
            className="select-none font-black leading-none tracking-tighter"
            style={{
              fontSize: "clamp(7rem, 18vw, 11rem)",
              color: "#0FAA87",
              textShadow: "0 0 60px rgba(15,170,135,0.4)",
              fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
            }}
          >
            4
          </span>
        </div>

        {/* Eyebrow tag */}
        <div
          className="mt-6 animate-[zoikoFadeUp_0.6s_ease-out_0.2s_both]"
        >
          <span
            className="inline-block rounded-full border px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]"
            style={{ borderColor: "#0FAA87", color: "#0FAA87", background: "rgba(15,170,135,0.08)" }}
          >
            Page not found
          </span>
        </div>

        {/* Headline */}
        <h1
          className="mt-5 max-w-md text-[1.45rem] font-bold leading-snug text-white animate-[zoikoFadeUp_0.6s_ease-out_0.25s_both] sm:text-[1.7rem]"
        >
          This pharmacy path doesn&apos;t exist.
        </h1>

        {/* Subtext */}
        <p
          className="mt-3 max-w-sm text-[14px] leading-relaxed animate-[zoikoFadeUp_0.6s_ease-out_0.3s_both]"
          style={{ color: "#8FA3C8" }}
        >
          The page you&apos;re looking for may have moved, been removed, or the
          URL may be incorrect. Let&apos;s get you back on track.
        </p>

        {/* CTAs */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-[zoikoFadeUp_0.6s_ease-out_0.35s_both]"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.97]"
            style={{ background: "#0FAA87" }}
          >
            <HomeIcon />
            Back to home
          </Link>

          <Link
            href="/verification"
            className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-[13.5px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/5 active:scale-[0.97]"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
          >
            Pharmacy verification
          </Link>
        </div>

        {/* Quick nav links */}
        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 animate-[zoikoFadeUp_0.6s_ease-out_0.4s_both]"
        >
          {[
            { label: "Inventory upload", href: "/inventory-upload" },
            { label: "Pharmacy portal", href: "#" },
            { label: "Support", href: "#" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[12.5px] transition-colors hover:underline"
              style={{ color: "#5B7AA8" }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Footer note */}
        <p
          className="mt-12 text-[11px] animate-[zoikoFadeUp_0.6s_ease-out_0.45s_both]"
          style={{ color: "#3B4F72" }}
        >
          © {new Date().getFullYear()} ZoikoMeds. All rights reserved.
        </p>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes zoikoFadeDown {
          from { opacity: 0; transform: translateY(-14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoikoFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  The "0" with a medical cross inside — the logo's signature motif   */
/* ------------------------------------------------------------------ */
function CrossZero() {
  const size = "clamp(7rem, 18vw, 11rem)";
  return (
    <span
      className="relative inline-flex select-none items-center justify-center font-black leading-none"
      style={{ fontSize: size, width: "0.65em", height: "1em" }}
      aria-hidden
    >
      {/* Circle outline O */}
      <svg
        viewBox="0 0 100 130"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        {/* Outer circle stroke */}
        <ellipse
          cx="50" cy="65" rx="44" ry="58"
          stroke="white"
          strokeWidth="9"
        />
        {/* Medical cross inside */}
        <rect x="38" y="34" width="24" height="62" rx="5" fill="#0FAA87" />
        <rect x="19" y="53" width="62" height="24" rx="5" fill="#0FAA87" />
        {/* Small circle center — logo cross detail */}
        <circle cx="50" cy="65" r="10" fill="#0D1B3E" />
        <circle cx="50" cy="65" r="5" fill="#0FAA87" />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Dot-grid background                                                  */
/* ------------------------------------------------------------------ */
function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(143,163,200,0.12) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Home icon                                                            */
/* ------------------------------------------------------------------ */
function HomeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 11.5L12 4l8 7.5M6.5 10v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}