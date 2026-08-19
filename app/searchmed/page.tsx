import type { Metadata } from "next";

import {
  SearchBuilt,
  SearchByName,
  SearchFollowup,
  SearchHero,
  SearchPreview,
} from "@/components/searchmed";

export const metadata: Metadata = {
  title: "Search Medicine Availability Online | ZoikoMeds",
  description:
    "Search medicine availability near you with ZoikoMeds. Check availability signals from participating verified pharmacies without creating an account.",
};

export default function SearchMedicinePage() {
  return (
    <main>
      <SearchHero />
      <SearchByName />
      <SearchPreview />
      <SearchFollowup />
      <SearchBuilt />
    </main>
  );
}
