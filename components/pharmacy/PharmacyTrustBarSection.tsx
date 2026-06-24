"use client";

import { useEffect, useRef, useState } from "react";

/**
 * PharmacyTrustBarSection
 * Thin trust strip directly below the hero — four reassurance points
 * with inline icons, separated by vertical dividers on desktop and
 * stacked on mobile.
 */

const ITEMS = [
  {
    label: "Exact quantities never publicly exposed",
    icon: "lock",
  },
  {
    label: "Pharmacist-controlled visibility at all times",
    icon: "shield",
  },
  {
    label: "Controlled medicines suppressed by jurisdiction",
    icon: "ban",
  },
  {
    label: "Every action audited and logged",
    icon: "pulse",
  },
] as const;

export default function PharmacyTrustBarSection() {
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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full border-t border-white/5 bg-[#0F1F3D] py-6"
    >
      <div className="mx-auto max-w-8xl px-6 lg:px-8">
        {mounted ? (
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-0">
            {ITEMS.map((item, i) => (
              <div
                key={item.label}
                className="flex w-full items-center sm:w-auto"
              >
                <TrustItem {...item} index={i} />
                {i < ITEMS.length - 1 && (
                  <span
                    aria-hidden
                    className="mx-6 hidden h-10 w-px bg-white/10 sm:block lg:mx-8"
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <Skeleton />
        )}
      </div>
    </section>
  );
}

function TrustItem({
  label,
  icon,
  index,
}: {
  label: string;
  icon: "lock" | "shield" | "ban" | "pulse";
  index: number;
}) {
  return (
    <div
      className="group flex items-center gap-2 animate-[pharmacyTrustFadeUp_0.55s_ease-out_forwards]"
      style={{ opacity: 0, animationDelay: `${index * 90}ms` }}
    >
      <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center text-[#00A99D] transition-transform duration-300 group-hover:scale-110">
        <TrustIcon name={icon} />
      </span>
      <span className="whitespace-nowrap text-[13px] text-white/55 transition-colors duration-300 group-hover:text-white/85">
        {label}
      </span>

      <style jsx>{`
        @keyframes pharmacyTrustFadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
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

function TrustIcon({ name }: { name: "lock" | "shield" | "ban" | "pulse" }) {
  const common = {
    viewBox: "0 0 20 20",
    fill: "none" as const,
    className: "h-full w-full",
  };

  switch (name) {
    case "lock":
      return (
        <svg {...common}>
          <rect
            x="4.5"
            y="9"
            width="11"
            height="8"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M6.5 9V6.5a3.5 3.5 0 0 1 7 0V9"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path
            d="M10 2.5l6 2.2v4.6c0 4-2.6 6.7-6 8.2-3.4-1.5-6-4.2-6-8.2V4.7l6-2.2z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="M7.3 10l1.9 1.9 3.5-3.9"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "ban":
      return (
        <svg {...common}>
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M5.5 5.5l9 9"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "pulse":
      return (
        <svg {...common}>
          <path
            d="M2.5 10.5h3l1.8-4.5 2.6 8 2.2-5.5h2.2l1.2 2h2.6"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

function Skeleton() {
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-10">
      {ITEMS.map((_, i) => (
        <div
          key={i}
          className="h-4 w-48 animate-pulse rounded bg-white/[0.06] sm:w-44"
        />
      ))}
    </div>
  );
}