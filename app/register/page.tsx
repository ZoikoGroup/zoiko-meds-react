import { redirect } from "next/navigation";
import { appUrl } from "@/lib/config";

export default function RegisterPage() {
  redirect(appUrl("/register"));
}
