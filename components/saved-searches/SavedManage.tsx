"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const tabs = ["With saved searches", "Stale", "Empty", "Deleted"];

// Initial mock searches with unique IDs and categories
const initialSearches = [
  {
    id: "1",
    title: "Ibuprofen 200 mg",
    location: "Austin, TX · within 10 miles · last checked Today",
    note: "Recently updated. Confirm before traveling. · Alert on",
    badge: "Strong signal",
    badgeColor: "border-[#BFE5D8] bg-[#E8F6F1] text-[#0F7A5A]",
    src: "/saved-searches/tick.png",
    alt: "Image",
    category: "With saved searches",
  },
  {
    id: "2",
    title: "Albuterol inhaler",
    location: "Round Rock, TX · within 25 miles · last checked 2 days ago",
    note: "Contact the pharmacy directly. · No alert",
    badge: "Confirmation needed",
    badgeColor: "border-[#EAF3FB] bg-[#EAF3FB] text-[#1F6FB2]",
    src: "/saved-searches/call.png",
    alt: "Image",
    category: "Stale",
  },
];

const includeList = [
  "Medicine name you entered (brand or generic)",
  "Strength or form, if you provided it",
  "Location or service area, and search radius",
  "Preferred pharmacy and alert preference, where enabled",
  "A caregiver label and last-run date",
];

const notIncludeList = [
  "A prescription, refill, or pharmacy order",
  "Reserved medicine or confirmed stock",
  "A clinical recommendation or diagnosis",
  "Eligibility to receive medicine, or adherence tracking",
  "A guarantee of future availability",
];

export default function SavedManage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("With saved searches");
  const [searches, setSearches] = useState(initialSearches);

  // Handle action button clicks (Delete or Run search again)
  const handleAction = (action: string, id: string, title: string) => {
    if (action === "Delete") {
      setSearches((prevSearches) =>
        prevSearches.map((item) =>
          item.id === id ? { ...item, category: "Deleted" } : item,
        ),
      );
    } else if (action === "Run search again") {
      // Navigates to searchmed page with optional search query parameter
      router.push(`/searchmed`);
    }
  };

  // Filter searches based on active tab
  const filteredSearches = searches.filter(
    (item) => item.category === activeTab,
  );

  return (
    <section className="bg-[#EEF2F7] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-[32px] font-semibold text-[#0D1B2E]">
            Manage saved{" "}
            <span className="text-[#0FAA87]">searches in your account.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[595px] text-center text-[16px] leading-6 text-[#566476]">
            After you sign in, your saved searches live in a private workspace.
            Here&apos;s what it looks like.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-12 md:mt-24 grid grid-cols-2 md:flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full border px-3.5 py-2.5 text-sm font-medium transition cursor-pointer ${
                  isActive
                    ? "border-[#13A594] bg-[#13A594]/10 text-[#0F8B7D]"
                    : "border-[#CDD7E3] bg-white text-[#0D1B2E] hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Search Cards */}
        <div className="mt-6 space-y-3 min-h-[150px]">
          {filteredSearches.length > 0 ? (
            filteredSearches.map((item) => (
              <div
                key={item.id}
                className="rounded-[13px] border border-[#E2E8F0] bg-white p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h3 className="text-[16px] font-semibold text-[#0D1B2E]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[13px] text-[#566476] leading-5">
                      {item.location}
                    </p>

                    <p className="mt-2 text-[12.8px] text-[#7C8A9B]">
                      {item.note}
                    </p>
                  </div>

                  <div
                    className={`w-fit flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${item.badgeColor}`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={12}
                      height={12}
                    />
                    <span>{item.badge}</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      handleAction("Run search again", item.id, item.title)
                    }
                    className="rounded-xl px-3.5 py-2.5 text-sm cursor-pointer font-semibold transition bg-[#13A594] border border-[#13A594] text-white hover:bg-[#109889]"
                  >
                    Run search again
                  </button>
                  {activeTab !== "Deleted" && (
                    <button
                      onClick={() =>
                        handleAction("Delete", item.id, item.title)
                      }
                      className="rounded-xl px-3.5 py-2.5 text-sm cursor-pointer font-semibold transition border border-[#CDD7E3] bg-white text-[#0D1B2E] hover:bg-gray-50"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-[13px] border border-[#E2E8F0] bg-white p-12 text-center text-[#566476]">
              No saved searches found in this tab.
            </div>
          )}
        </div>

        {/* Bottom Cards */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <h3 className="flex items-center gap-2 text-[15px] font-semibold text-[#0F7A5A]">
              <Image
                src="/saved-searches/tick.png"
                alt="Image"
                width={18}
                height={18}
              />
              <span>What a saved search can include</span>
            </h3>

            <ul className="mt-5 space-y-3">
              {includeList.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[13.4px] text-[#506277]"
                >
                  <Image
                    src="/saved-searches/right.png"
                    alt="Image"
                    width={13}
                    height={13}
                  />
                  <span className="text-[#506277]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
            <h3 className="flex items-center gap-2 text-[15.2px] leading-6 font-semibold text-[#2B3A4F]">
              <Image
                src="/saved-searches/wrong.png"
                alt="Image"
                width={12}
                height={12}
              />
              <span>What it never means</span>
            </h3>

            <ul className="mt-5 space-y-3">
              {notIncludeList.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm text-[#566476]"
                >
                  <Image
                    src="/saved-searches/wrong.png"
                    alt="Image"
                    width={8}
                    height={8}
                  />
                  <span className="text-[#506277]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
