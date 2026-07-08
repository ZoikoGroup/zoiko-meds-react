interface Step {
  title: string;
  description: string;
  control: string;
}

const steps: Step[] = [
  {
    title: "Needs review",
    description: "Task appears in the pharmacist review queue with reason codes.",
    control: "Only authorized pharmacist roles can complete restricted review actions.",
  },
  {
    title: "Approve next step",
    description: "Action button moves the item to preparation or readiness workflow.",
    control: "Requires confirmation and an audit event.",
  },
  {
    title: "Request clarification",
    description: "Routes to patient, provider, or internal follow-up queue.",
    control: "Cannot generate template or send medical advice beyond approved boundaries.",
  },
  {
    title: "Escalate exception",
    description: "Moves the item to manager or compliance review where appropriate.",
    control: "Reason code required.",
  },
  {
    title: "Close or complete",
    description: "Completes the workflow stage after authorized action.",
    control: "Event log stores user, time, status, and notes.",
  },
];

export default function PharmacistReviewSection() {
  return (
    <section className="bg-slate-50 px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          05 · Pharmacist review & controlled handoffs
        </p>
        <h2 className="text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Licensed decision-makers {" "}
          <span className="text-[#0FAA87]">route it
            stay in control. </span>
        </h2>

        <div className="mt-10 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:gap-6"
            >
              <div className="flex items-center gap-3 sm:w-48 sm:shrink-0">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-600 text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-gray-900">{step.title}</span>
              </div>
              <p className="text-sm text-gray-500 sm:flex-1">{step.description}</p>
              <p className="text-sm text-[#0D1B2E] sm:w-72 sm:shrink-0">
                <span className="font-medium text-[#0F8B7D]">Control:</span> {step.control}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
