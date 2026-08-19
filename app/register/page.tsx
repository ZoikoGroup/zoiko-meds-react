import { redirect } from "next/navigation";
import { appUrl } from "@/lib/config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Free Medicine Account Today | ZoikoMeds",
  description:
    "Create your free ZoikoMeds account to save medicine searches, manage availability alerts, and review account activity in one secure, privacy-aware place.",
};

export default function RegisterPage() {
  redirect(appUrl("/register"));
}
