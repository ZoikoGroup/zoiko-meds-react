import type { Metadata } from "next";

import {
  AppointmentsHeroSection,
  AppointmentsTrustSafetySection,
  AppointmentsOverviewSection,
  AppointmentsCoreCapabilitiesSection,
  AppointmentsHowItWorksSection,
  AppointmentsDashboardSection,
  AppointmentsPreparationFollowUpSection,
  AppointmentsCaregiverFamilyCoordinationSection,
  AppointmentsSecurityPrivacyAccessSection,
  AppointmentsOngoingValueSection,
  AppointmentsFAQSection,
  AppointmentsScheduleFormSection,
  AppointmentsFinalCTASection,
} from "@/components/appointments";

export const metadata: Metadata = {
  title: "Healthcare Appointment Scheduling | ZoikoMeds",
  description:
    "Schedule, track, and prepare for healthcare appointments with ZoikoMeds. Manage reminders, provider details, preparation tasks, and follow-up actions.",
};

export default function AppointmentsPage() {
  return (
    <main>
      <AppointmentsHeroSection />
      <AppointmentsTrustSafetySection />
      <AppointmentsOverviewSection />
      <AppointmentsCoreCapabilitiesSection />
      <AppointmentsHowItWorksSection />
      <AppointmentsDashboardSection />
      <AppointmentsPreparationFollowUpSection />
      <AppointmentsCaregiverFamilyCoordinationSection />
      <AppointmentsSecurityPrivacyAccessSection />
      <AppointmentsOngoingValueSection />
      <AppointmentsFAQSection />
      <AppointmentsScheduleFormSection />
      <AppointmentsFinalCTASection />
    </main>
  );
}
