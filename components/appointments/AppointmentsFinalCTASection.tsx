"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AppointmentsFinalCTASection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F4F6FA] px-6 py-16 md:px-12 lg:px-20">
      <CTAFadeUp show={isVisible} delay={0}>
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#0B1733] px-6 py-14 text-center shadow-xl sm:px-12 lg:px-20">
          <h2 className="text-2xl font-bold leading-tight text-white sm:text-[1.75rem]">
            Get started with <span className="text-[#3FE3B8]">appointments.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-[0.95rem]">
            Schedule a visit, sign in to track upcoming appointments, or create a free account to
            manage reminders, preparation, and follow-ups in one place.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
            onClick={()=>router.push('#schedule-an-appointment')}
              type="button"
              className="rounded-lg bg-[#0FAA87] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#00A99D] hover:shadow-lg hover:shadow-[#0FAA87]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FAA87] focus-visible:ring-offset-2"
            >
              Schedule an Appointment
            </button>
            <button
            onClick={()=>router.push('/create-account')}
              type="button"
              className="rounded-lg border border-white/25 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-white/50 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B1733]"
            >
              Create Free Account
            </button>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-xs leading-relaxed text-white/35">
            ZoikoMeds supports appointment coordination and patient visibility. It is not an
            emergency service and does not provide medical advice, diagnosis, treatment,
            prescribing, or dispensing.
          </p>
        </div>
      </CTAFadeUp>
    </section>
  );
}

/* ---------------------------------- */
/* Fade-up wrapper (bottom -> top)     */
/* ---------------------------------- */
function CTAFadeUp({
  show,
  delay = 0,
  children,
}: {
  show: boolean;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}