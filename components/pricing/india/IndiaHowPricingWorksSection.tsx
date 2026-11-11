"use client";

import React from "react";
import { BadgeCheck, RefreshCw, Scale, Store } from "lucide-react";
import type { MarketPricingView } from "@/lib/commercial/present";
import InfoCardsSection, { type InfoCard } from "./InfoCardsSection";

export default function IndiaHowPricingWorksSection({ view }: { view: MarketPricingView }) {
  const { networkCore, chemistPro, multiSitePro } = view.plans;
  const trial = chemistPro.trial;

  const cards: InfoCard[] = [
    {
      icon: Store,
      title: "Priced per store",
      description: `${chemistPro.name} and ${multiSitePro.name} are priced per store — not per staff user, search or confirmation request.`,
    },
    ...(trial
      ? [
          {
            icon: BadgeCheck,
            title: "Verified before paid",
            description: `Each verified ${networkCore.name} pharmacy gets one ${trial.days}-day ${chemistPro.name} trial${trial.cardRequired ? "" : " with no card required"}. The trial starts after verification.`,
          },
          {
            icon: RefreshCw,
            title: "Downgrade, not disappearance",
            description: `When a trial ends, the store returns to ${trial.downgradesTo}. A failed payment never removes its public listing or availability sync.`,
          },
        ]
      : []),
    {
      icon: Scale,
      title: "No ranking benefit",
      description:
        "No paid plan, enterprise contract or pharmaceutical relationship improves a pharmacy's position in public search.",
    },
  ];

  return (
    <InfoCardsSection
      eyebrow="03 · HOW PRICING WORKS"
      title="Free network participation. Paid intelligence, per store."
      cards={cards}
      className="bg-[#EEF2F7]"
    />
  );
}
