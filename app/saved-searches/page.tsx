import type { Metadata } from "next";

import {
  SavedControls,
  SavedCreate,
  SavedHero,
  SavedManage,
  SavedSearch,
  SavedWork,
} from "@/components/saved-searches";

export const metadata: Metadata = {
  title: "Saved Searches & Medicine Availability | ZoikoMeds",
  description:
    "Save your medicine searches and revisit them anytime. Manage saved searches, track availability, and stay organized with ZoikoMeds, all in one place.",
};

export default function SavedSearchesPage() {
  return (
    <main>
      <SavedHero />
      <SavedSearch />
      <SavedWork />
      <SavedManage />
      <SavedControls />
      <SavedCreate />
    </main>
  );
}
