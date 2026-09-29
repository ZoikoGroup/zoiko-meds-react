"use client";

import React from "react";
import { Building, FileClock, IndianRupee, Receipt } from "lucide-react";
import type { MarketPricingView } from "@/lib/commercial/present";
import InfoCardsSection, { type InfoCard } from "./InfoCardsSection";

export default function IndiaBillingSection({ view }: { view: MarketPricingView }) {
  const cards: InfoCard[] = [
    {
      icon: IndianRupee,
      title: `Prices in ${view.currency}`,
      description: `Every ${view.marketName} price is set and billed in ${view.currency} (${view.currencySymbol}).`,
    },
    {
      icon: Receipt,
      title: view.taxNote,
      description: "Published prices exclude GST. Applicable GST is shown on your tax invoice.",
    },
    {
      icon: Building,
      title: `Billed in ${view.marketName}`,
      description: `Contracts and invoices are issued by ${view.seller}.`,
    },
    {
      icon: FileClock,
      title: "Versioned price book",
      description: `Prices shown are price book ${view.priceBookVersion}. New pricing gets a new version; existing contracts keep the version they signed under unless migrated explicitly.`,
    },
  ];

  return (
    <InfoCardsSection
      eyebrow="04 · BILLING & GST"
      title="Clear INR invoices from an Indian entity."
      cards={cards}
      note="ZoikoMeds is not the medicine seller: it does not sell, dispense, deliver or take payment for medicines, so invoices cover only ZoikoMeds services."
      className="bg-white"
    />
  );
}
