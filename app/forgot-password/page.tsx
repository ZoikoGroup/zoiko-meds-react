import type { Metadata } from "next";
import { ForgotPasswordSection } from "@/components/password-recovery";

export const metadata: Metadata = {
  title: "Reset your password — ZoikoMeds",
  description:
    "Request a secure, single-use link to set a new password for your ZoikoMeds account.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordSection />;
}
