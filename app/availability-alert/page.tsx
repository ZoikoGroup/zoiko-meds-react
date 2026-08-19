import type { Metadata } from "next";

import {
  AvailabilityControl,
  AvailabilityCta,
  AvailabilityHero,
  AvailabilityMonitoring,
  AvailabilityStrategic,
  AvailabilityTrust,
} from "@/components/availability-alert";

export const metadata: Metadata = {
  title: "Medicine Availability Alerts and Monitoring | ZoikoMeds",
  description:
    "Get notified when medicine availability changes near you. Save searches, set alert preferences, and monitor availability signals with ZoikoMeds.",
};

export default function AvailabilityAlert() {
  return (
    <main>
      <AvailabilityHero />
      <AvailabilityMonitoring />
      <AvailabilityControl />
      <AvailabilityStrategic />
      <AvailabilityTrust />
      <AvailabilityCta />
    </main>
  );
}
