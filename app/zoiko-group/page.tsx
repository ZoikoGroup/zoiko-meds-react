import type { Metadata } from "next";

import {
  ZoikoGroupArchitecture,
  ZoikoGroupContact,
  ZoikoGroupHero,
  ZoikoGroupPlatform,
  ZoikoGroupStakeholders,
  ZoikoGroupStandards,
  ZoikoGroupThesis,
} from "@/components/zoiko-group";

export const metadata: Metadata = {
  title: "Zoiko Group | Healthcare Governance & Medicine Access",
  description:
    "Discover Zoiko Group healthcare governance and medicine access approach, supported by technology, privacy, security, and reliable healthcare infrastructure.",
};

export default function ZoikoGroupPage() {
  return (
    <main>
      <ZoikoGroupHero />
      <ZoikoGroupArchitecture />
      <ZoikoGroupThesis />
      <ZoikoGroupStandards />
      <ZoikoGroupStakeholders />
      <ZoikoGroupPlatform />
      <ZoikoGroupContact />
    </main>
  );
}
