import type { Metadata } from "next";

import {
  PlatformEngage,
  PlatformFeatures,
  PlatformHero,
  PlatformManifesto,
  PlatformProtocol,
  PlatformStats,
} from "@/components/platform";

export const metadata: Metadata = {
  title: "Medicine Availability Intelligence Platform | ZoikoMeds",
  description:
    "ZoikoMeds Platform connects medicine availability, pharmacy networks, healthcare data, and intelligent APIs to help businesses improve access to medicines.",
};

export default function PlatformPage() {
  return (
    <main>
      <PlatformHero />
      <PlatformFeatures />
      <PlatformProtocol />
      <PlatformManifesto />
      <PlatformEngage />
      <PlatformStats />
    </main>
  );
}
