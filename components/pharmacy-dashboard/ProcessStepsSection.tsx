interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Request access",
    description:
      "Submit onboarding interest with organization and location details.",
  },
  {
    number: 2,
    title: "Eligibility review",
    description:
      "ZoikoMeds reviews pharmacy credentials, role, and fit.",
  },
  {
    number: 3,
    title: "Profile setup",
    description:
      "Configure location, service area, staff, and visibility settings.",
  },
  {
    number: 4,
    title: "Workflow training",
    description:
      "Learn verification queues, signal states, reports, and guardrails.",
  },
  {
    number: 5,
    title: "Go-live",
    description:
      "The dashboard becomes active for approved workflows.",
  },
  {
    number: 6,
    title: "Success review",
    description:
      "Review early usage, signal freshness, and reporting needs.",
  },
];

export default function ProcessStepsSection() {
  return (
    <section className="bg-[f6f9fc] px-6 py-14 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          10 · Implementation & onboarding
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          From request to go-live, with a{" "}
          <span className="text-[#0FAA87]">success
            review.</span>
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {steps.map(({ number, title, description }) => (
            <div
              key={number}
              className="rounded-xl border flex flex-col border-gray-200 bg-white p-4 text-center shadow-sm"
            >
              <div className="mx-auto mb-2 text-sm flex h-10 w-10 items-center justify-center rounded-full bg-[#0D1B2A] font-semibold text-white">
                {number}
              </div>

              <h3 className="mb-1 text-xs font-semibold text-[#0D1526]">
                {title}
              </h3>

              <p className="text-xs text-[#5A6E87]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
