// "use client";

// import { useEffect, useState } from "react";
// import MedicineSearchWidget from "./MedicineSearchWidget";

// export default function HeroSection() {
//   const [loaded, setLoaded] = useState(false);
//   useEffect(() => {
//     const t = setTimeout(() => setLoaded(true), 80);
//     return () => clearTimeout(t);
//   }, []);

//   return (
//     <section className="relative w-full bg-white px-4 pt-6 sm:px-8 sm:pt-8 lg:px-12">
//       <style>{`
//         @keyframes heroFade {
//           from { opacity: 0; transform: translateY(22px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes widgetRise {
//           from { opacity: 0; transform: translateY(40px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes dotPulse {
//           0%,100% { opacity:1; } 50% { opacity:0.3; }
//         }
//         .hero-text  { animation: heroFade  0.8s cubic-bezier(.22,.68,0,1.1) 0.1s both; }
//         .hero-badge { animation: heroFade  0.6s cubic-bezier(.22,.68,0,1.1) 0s   both; }
//         .hero-body  { animation: heroFade  0.7s cubic-bezier(.22,.68,0,1.1) 0.25s both; }
//         .widget-rise{ animation: widgetRise 0.9s cubic-bezier(.22,.68,0,1.1) 0.4s both; }
//         .live-dot   { animation: dotPulse 1.8s ease-in-out infinite; }
//       `}</style>

//       <div className="relative mx-auto max-w-7xl">
//         {/* ── ROUNDED IMAGE CARD ── */}
//         <div className="relative h-[360px] w-full overflow-hidden rounded-3xl sm:h-[420px] lg:h-[480px]">
//           <img
//             src="/home/ZoikoMeds-bg.webp"
//             alt="Pharmacists checking medicine availability"
//             className="absolute inset-0 h-full w-full object-cover object-center"
//             onError={(e) => {
//               const el = e.currentTarget as HTMLImageElement;
//               el.style.display = "none";
//             }}
//           />
//           <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#24356D] via-[#0a3352] to-[#0d4a6b]" />
//           <div className="absolute inset-0 bg-gradient-to-r from-[#24356D]/85 via-[#061828]/55 to-transparent" />

//           <div className="relative z-10 flex h-full max-w-xl flex-col justify-center px-7 sm:px-10 lg:px-12">
//             <div
//               className={`hero-badge mb-6 inline-flex items-center gap-2 self-start rounded-full border border-white/25 bg-[#FFFFFF26] px-4 py-1.5 backdrop-blur-sm ${
//                 loaded ? "" : "opacity-0"
//               }`}
//             >
//               <span className="live-dot h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2DC9A0]" />
//               <span className="text-[11px] font-semibold uppercase tracking-widest text-white/80">
//                 Global Medicine Availability Infrastructure
//               </span>
//             </div>

//             <h1
//               className={`hero-text mb-5 text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-[2.75rem] ${
//                 loaded ? "" : "opacity-0"
//               }`}
//             >
//               The global search
//               <br />
//               layer for <span className="text-[#2DC9A0]">medicine</span>
//               <br />
//               <span className="text-[#2DC9A0]">availability.</span>
//             </h1>

//             <p
//               className={`hero-body max-w-lg text-[15px] leading-relaxed text-white/90 sm:text-base ${
//                 loaded ? "" : "opacity-0"
//               }`}
//             >
//               Search verified pharmacies, check availability confidence, save
//               medicines, and monitor updates — without ZoikoMeds prescribing,
//               dispensing, or guaranteeing medicine availability.
//             </p>
//           </div>
//         </div>

// {/* ── WIDGET CARD — overlaps bottom of image ── */}
// <div
//   className={`widget-rise relative z-20 mx-auto -mt-20 max-w-4xl px-2 pb-10 sm:px-0 ${
//     loaded ? "" : "opacity-0"
//   }`}
// >
//   <MedicineSearchWidget />
// </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import MedicineSearchWidget from "./MedicineSearchWidget";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative w-full bg-white px-3 pt-2 pb-16 sm:px-6 sm:pt-4 sm:pb-24 lg:px-8">
      <style>{`
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes widgetRise {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%,100% { opacity: 1; } 
          50% { opacity: 0.3; }
        }
        .hero-text   { animation: heroFade  0.8s cubic-bezier(.22,.68,0,1.1) 0.1s both; }
        .hero-badge  { animation: heroFade  0.6s cubic-bezier(.22,.68,0,1.1) 0s   both; }
        .hero-body   { animation: heroFade  0.7s cubic-bezier(.22,.68,0,1.1) 0.25s both; }
        .widget-rise { animation: widgetRise 0.9s cubic-bezier(.22,.68,0,1.1) 0.4s both; }
        .live-dot    { animation: dotPulse 1.8s ease-in-out infinite; }
      `}</style>

      <div className="relative mx-auto max-w-7xl">
        {/* Main Blue Banner Box */}
        <div className="relative w-full rounded-[24px] pt-10 pb-28 sm:pt-14 sm:pb-36 lg:pt-8 lg:pb-24">
          {/* Background Image Wrapper */}
          <div className="absolute inset-0 overflow-hidden rounded-[12px]">
            <img
              src="/home/ZoikoMeds-bg.webp"
              alt="Pharmacists checking medicine availability"
              className="absolute inset-0 h-full w-full object-cover object-center"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.display = "none";
              }}
            />
           <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#24356D] to-[#66666600]" />
          </div>

          {/* Banner Text Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-14">
            <div className="max-w-xl space-y-4">
              {/* Badge */}
              <div
                className={`hero-badge inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 backdrop-blur-md ${
                  loaded ? "" : "opacity-0"
                }`}
              >
                <span className="live-dot h-2 w-2 flex-shrink-0 rounded-full bg-[#34D399]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                  Global Medicine Availability Infrastructure
                </span>
              </div>

              {/* Title */}
              <h1
                className={`hero-text text-3xl font-bold tracking-tight text-white leading-[1.1] sm:text-5xl lg:text-[45px] ${
                  loaded ? "" : "opacity-0"
                }`}
              >
                The global search <br />
                layer for{" "}
                <span className="text-[#3DE8BB] font-extrabold">medicine</span>{" "}
                <br />
                <span className="text-[#3DE8BB] font-extrabold">
                  availability.
                </span>
              </h1>

              {/* Subtitle */}
              <p
                className={`hero-body text-xs sm:text-sm text-white/80 leading-relaxed max-w-lg ${
                  loaded ? "" : "opacity-0"
                }`}
              >
                Search verified pharmacies, check availability confidence, save
                medicines, and monitor updates — without ZoikoMeds prescribing,
                dispensing, or guaranteeing medicine availability.
              </p>
            </div>
          </div>
        </div>

        {/* Overlapping Floating Search Widget */}
        <div
          className={`widget-rise relative z-30 -mt-20 sm:-mt-24 lg:-mt-16 px-4 max-w-5xl mx-auto w-full ${
            loaded ? "" : "opacity-0"
          }`}
        >
          <MedicineSearchWidget />
        </div>
      </div>
    </section>
  );
}