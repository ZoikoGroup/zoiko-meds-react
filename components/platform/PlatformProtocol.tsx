const steps = [
  {
    number: "01",
    title: "Search",
    desc: "Aggregating real-time telemetry from edge pharmacy nodes.",
  },
  {
    number: "02",
    title: "Normalize",
    desc: "Translating disparate legacy formats into standardized FHIR objects.",
  },
  {
    number: "03",
    title: "Signal",
    desc: "Applying predictive logic to identify stock volatility before it occurs.",
  },
  {
    number: "04",
    title: "Act",
    desc: "Automated fulfillment and reallocation across the network.",
  },
  {
    number: "05",
    title: "Learn",
    desc: "Feeding execution outcomes back into the intelligence substrate.",
  },
];

export default function PlatformProtocol() {
  return (
    <section className="relative bg-[#F9F9FF] py-20 overflow-hidden font-sans">

      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-14 flex flex-col items-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-[#081A13] mb-4">
            <span className="relative inline-block">
              Pro
              <div className="absolute left-0 bottom-[-6px] w-full h-[3px] bg-[#006A65] rounded-full" />
            </span>
            tocol Execution Cycle
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col gap-3">

              {/* Step number */}
              <span className="text-[15px] font-bold text-[#006A65] tracking-wide">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="text-[15px] font-extrabold text-[#081A13]">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[12.5px]  text-[#44474D]">
                {step.desc}
              </p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
