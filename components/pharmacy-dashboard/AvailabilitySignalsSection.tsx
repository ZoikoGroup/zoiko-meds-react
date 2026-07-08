interface Step {
  step: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    step: 1,
    title: "Signal appears",
    description:
      "From a permitted source, search pattern, partner workflow, or pharmacy action.",
  },
  {
    step: 2,
    title: "System classifies",
    description:
      "Pending review, active, stale, uncertain, restricted, or verified by configured rules.",
  },
  {
    step: 3,
    title: "Staff reviews",
    description:
      "Authorized staff selects an allowed action: confirm, mark unavailable, restrict, request review, or escalate.",
  },
  {
    step: 4,
    title: "Confidence updates",
    description:
      "ZoikoMeds updates the confidence layer without exposing unauthorized exact quantities publicly.",
  },
  {
    step: 5,
    title: "Audit & report",
    description:
      "The action is recorded in the audit trail and updates reporting, network health, and insights.",
  },
];

export default function AvailabilitySignalsSection() {
  return (
    <section className="bg-[#EEF2F7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          04 · Verification workflow
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          How availability signals are {" "}
          <span className="text-[#0FAA87]">reviewed and
            strengthened.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map(({ step, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#13A594] text-teal-600">
                <span className="text-xs text-white font-medium">{step}</span>
              </div>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-xs max-w-40 leading-relaxed text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
