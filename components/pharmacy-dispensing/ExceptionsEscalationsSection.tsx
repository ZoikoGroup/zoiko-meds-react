interface ExceptionCard {
  tag: string;
  tagClass: string;
  title: string;
  description: string;
  highlighted?: boolean;
}

const cards: ExceptionCard[] = [
  {
    tag: "Availability review required",
    tagClass: "bg-[#FDF4E7] text-[#B45309]",
    title: "Availability uncertain",
    description:
      "Check internal inventory signals or authorized confirmation.",
  },
  {
    tag: "Delayed",
    tagClass: "bg-[#EAF3FB] text-[#1F6FB2]",
    title: "Delayed preparation",
    description:
      "Notify patient and assign a staff owner.",
  },
  {
    tag: "Waiting on patient",
    tagClass: "bg-[#EAF3FB] text-[#1F6FB2]",
    title: "Patient response required",
    description:
      "Send a secure clarification request or call log task.",
  },
  {
    tag: "Provider follow-up",
    tagClass: "bg-[#EAF3FB] text-[#1F6FB2]",
    title: "Provider clarification required",
    description:
      "Route to the authorized pharmacy team workflow.",
  },
  {
    tag: "Restricted action",
    tagClass: "bg-[#FEF3F2] text-[#B42318]",
    title: "Permission blocked",
    description:
      "Show the request-access workflow or manage escalation.",
  },
  {
    tag: "Policy required",
    tagClass: "bg-[#FEF3F2] text-[#B42318]",
    title: "Policy-controlled item",
    description:
      "Route to controlled medicine policy workflow, do not expose details publicly.",
  },
  {
    tag: "Sync issue",
    tagClass: "bg-[#FDF4E7] text-[#B45309]",
    title: "System error",
    description:
      "Retry, log the error, and offer a support path.",
  },
  {
    tag: "Resolved",
    tagClass: "bg-[#E8F6F1] text-[#0F7A5A]",
    title: "Back to queue",
    description:
      "Cleared exceptions return to the standard workflow with full history.",
    highlighted: true,
  },
];


export default function ExceptionsEscalationsSection() {
  return (
    <section className="bg-slate-50 px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm uppercase font-semibold tracking-[2px] text-[#13A594]">
          07 · Exceptions & escalations
        </p>
        <h2 className="max-w-150 text-3xl md:text-[32px] font-semibold leading-snug text-gray-900">
          Every friction state has a reason code
          and{" "}
          <span className="text-[#0FAA87]">a next step. </span>
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`rounded-xl border p-5 shadow-sm ${card.highlighted
                ? "border-[#13A59440] bg-[#13A5941A]"
                : "border-gray-200 bg-white"
                }`}
            >
              <span
                className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${card.tagClass}`}
              >
                {card.tag}
              </span>
              <h3 className="mt-3 text-sm font-semibold text-gray-900">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
