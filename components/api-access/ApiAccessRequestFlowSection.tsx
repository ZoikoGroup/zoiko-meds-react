"use client"

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "1",
    title: "Interest",
    description:
      "Request an API Access briefing to open the qualified enterprise form.",
  },
  {
    number: "2",
    title: "Qualification",
    description:
      "Provide organization, use case, systems, geography, data needs, and security review.",
  },
  {
    number: "3",
    title: "Discovery",
    description:
      "ZoikoMeds reviews business fit, technical fit, compliance boundaries, and risk.",
  },
  {
    number: "4",
    title: "Sandbox",
    description:
      "Approved prospects receive sandbox credentials, sample payloads, and test workflows.",
  },
  {
    number: "5",
    title: "Pilot",
    description:
      "Pilot scoped by endpoints, limits, reporting needs, and success metrics with monitoring.",
  },
  {
    number: "6",
    title: "Production",
    description:
      "Security, legal, compliance, and technical gates completed; access approved with limits.",
  },
  {
    number: "7",
    title: "Optimize",
    description:
      "Usage, performance, outcomes, and expansion outcomes reviewed in a quarterly integration review.",
  },
];

export default function ApiAccessRequestFlowSection() {
  return (
    <section className="bg-[#eef2f7] px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          08 · API access request flow
        </p>
        <h2 className="max-w-2xl text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          From interest to production, with{" "}
          <span className="text-[#0FAA87]">governance gates.</span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7">
          {steps.map(({ number, title, description }) => (
            <div
              key={title}
              className="rounded-xl md:min-w-35 md:max-h-47 border border-gray-200 bg-white p-5 shadow-sm"
            >
              <span className=" mb-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#13A594] text-xs font-semibold text-white">
                {number}
              </span>
              <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
              <p className="mt-1 md:max-w-40 text-[10.9px] leading-relaxed text-gray-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
