import type { Metadata } from "next";
import { ResetPasswordSection } from "@/components/password-recovery";

export const metadata: Metadata = {
  title: "Set a new password — ZoikoMeds",
  description: "Landing page for the ZoikoMeds password reset and account invite links.",
  robots: { index: false, follow: false },
};

/**
 * Landing page for the `?token=` link sent by the backend's password-reset and
 * invite emails (see APP_BASE_URL in the platform backend).
 */
export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const { token } = await searchParams;
  const value = Array.isArray(token) ? token[0] : token;

  return <ResetPasswordSection token={value ?? ""} />;
}
