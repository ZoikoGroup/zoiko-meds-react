import { redirect } from "next/navigation";
import { appUrl } from "@/lib/config";

export default function CreateAccountPage() {
  redirect(appUrl("/register"));
}