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
    AppointmentsFinalCTASection
} from "@/components/appointments";

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