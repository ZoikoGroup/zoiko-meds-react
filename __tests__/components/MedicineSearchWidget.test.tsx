import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("@/lib/api", () => ({
  matchMedibase: vi.fn(async () => []),
  searchMedicines: vi.fn(async () => ({
    query: "paracetamol",
    results: [
      {
        medicine: {
          id: "med-1",
          canonicalName: "Dolo 650",
          genericName: "Paracetamol",
          strength: "650 mg",
          dosageForm: "Tablet",
          prescriptionCategory: "OTC",
        },
        availability: [],
      },
    ],
    nearbyPharmacies: {
      pharmacies: [
        {
          placeId: "p-1",
          name: "Rana Medical Store",
          address: "Govindpuram, Ghaziabad",
          latitude: 28.69,
          longitude: 77.48,
          distanceKm: 2.5,
        },
      ],
    },
  })),
}));

import MedicineSearchWidget from "@/components/home/MedicineSearchWidget";

/** The widget resolves the typed location through /internal/medicine/geocode. */
function mockGeocodeFetch() {
  return vi.fn(async () => ({
    ok: true,
    json: async () => ({ success: true, data: { lat: 28.6761, lng: 77.5025 } }),
  })) as unknown as typeof fetch;
}

async function searchForMedicine() {
  const user = userEvent.setup();
  render(<MedicineSearchWidget />);

  await user.type(
    screen.getByPlaceholderText("Enter a medicine name, brand, or generic"),
    "paracetamol"
  );
  await user.type(
    screen.getByPlaceholderText("City, ZIP code, postcode, or current location"),
    "Ghaziabad"
  );
  await user.click(screen.getByRole("button", { name: /search availability/i }));

  return user;
}

describe("MedicineSearchWidget — clear results", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", mockGeocodeFetch());
  });

  it("shows results, then clears both sections when the close button is used", async () => {
    const user = await searchForMedicine();

    // Results arrived: a medicine match and a nearby pharmacy.
    await waitFor(() => expect(screen.getByText("Dolo 650")).toBeInTheDocument());
    expect(screen.getByText("Rana Medical Store")).toBeInTheDocument();

    const clear = screen.getByRole("button", { name: /clear search results/i });
    await user.click(clear);

    // Both sections are gone, not just the medicines.
    expect(screen.queryByText("Dolo 650")).not.toBeInTheDocument();
    expect(screen.queryByText("Rana Medical Store")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /clear search results/i })).not.toBeInTheDocument();
  });

  it("leaves the medicine and location inputs intact so the search can be repeated", async () => {
    const user = await searchForMedicine();
    await waitFor(() => expect(screen.getByText("Dolo 650")).toBeInTheDocument());

    await user.click(screen.getByRole("button", { name: /clear search results/i }));

    expect(screen.getByPlaceholderText("Enter a medicine name, brand, or generic")).toHaveValue(
      "paracetamol"
    );
    expect(
      screen.getByPlaceholderText("City, ZIP code, postcode, or current location")
    ).toHaveValue("Ghaziabad");
  });
});
