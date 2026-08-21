/**
 * How the scan widget presents what the scanner read.
 *
 * The guarantee under test: a medicine the scanner was unsure about is never
 * searched until the user has looked at it and tapped it.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MedicineSearchWidget from "@/components/home/MedicineSearchWidget";

vi.mock("@/lib/api", () => ({
  searchMedicines: vi.fn(async () => ({ medicines: [], pharmacies: [] })),
  matchMedibase: vi.fn(async () => []),
}));

/** What the scan endpoint returns for the upload under test. */
let scanPayload: unknown;

beforeEach(() => {
  scanPayload = { success: true, data: { medicines: [], items: [], warnings: [] } };
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify(scanPayload), { status: 200 })),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

/** Upload a file and run the scan, returning the user-event instance. */
async function runScan() {
  const user = userEvent.setup();
  render(<MedicineSearchWidget />);

  // Move to the prescription tab.
  await user.click(screen.getByRole("button", { name: /scan prescription/i }));

  const input = document.querySelector('input[type="file"]') as HTMLInputElement;
  const file = new File([new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 1, 2, 3, 4])], "rx.jpg", {
    type: "image/jpeg",
  });
  await user.upload(input, file);

  // The tab and the action button carry the same label; the action is the later
  // of the two in the document.
  const candidates = screen
    .getAllByRole("button")
    .filter((b) => /^scan prescription$/i.test(b.textContent?.trim() ?? ""));
  await user.click(candidates[candidates.length - 1]);

  return user;
}

/** The chip for a medicine, by its label. */
function chip(label: string): HTMLElement {
  return screen
    .getAllByRole("button")
    .find((b) => b.textContent?.includes(label))!;
}

describe("scan results", () => {
  it("auto-selects a medicine the scanner is confident about", async () => {
    scanPayload = {
      success: true,
      data: {
        medicines: ["Metformin 500 mg"],
        items: [
          {
            name: "Metformin",
            strength: "500 mg",
            dosageForm: "Tablet",
            confidence: 0.95,
            requiresConfirmation: false,
          },
        ],
        warnings: [],
      },
    };

    await runScan();

    await waitFor(() => expect(screen.getByText(/1 medicine detected/i)).toBeTruthy());
    expect(chip("Metformin 500 mg").getAttribute("aria-pressed")).toBe("true");
    // Ready to search immediately.
    expect(screen.getByRole("button", { name: /Search selected medicines \(1\)/i })).toBeTruthy();
  });

  it("does not select a medicine that needs confirmation", async () => {
    scanPayload = {
      success: true,
      data: {
        medicines: ["Azithromycin 500 mg"],
        items: [
          {
            name: "Azithromycin",
            strength: "500 mg",
            confidence: 0.41,
            requiresConfirmation: true,
            note: "read from a low-quality scan",
          },
        ],
        warnings: [],
      },
    };

    await runScan();

    await waitFor(() => expect(chip("Azithromycin 500 mg")).toBeTruthy());
    expect(chip("Azithromycin 500 mg").getAttribute("aria-pressed")).toBe("false");
    expect(screen.getByText(/hard to read/i)).toBeTruthy();
    // Nothing is queued for search until the user confirms.
    expect(
      screen.getByRole("button", { name: /Search selected medicines/i }).getAttribute("disabled"),
    ).not.toBeNull();
  });

  it("includes an uncertain medicine once the user taps it", async () => {
    scanPayload = {
      success: true,
      data: {
        medicines: ["Azithromycin 500 mg"],
        items: [{ name: "Azithromycin", strength: "500 mg", confidence: 0.4, requiresConfirmation: true }],
        warnings: [],
      },
    };

    const user = await runScan();
    await waitFor(() => expect(chip("Azithromycin 500 mg")).toBeTruthy());

    await user.click(chip("Azithromycin 500 mg"));

    expect(chip("Azithromycin 500 mg").getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: /Search selected medicines \(1\)/i })).toBeTruthy();
  });

  it("selects the confident medicines and leaves the uncertain one out", async () => {
    scanPayload = {
      success: true,
      data: {
        medicines: ["Metformin 500 mg", "Amlodipine 5 mg", "Rosuvastatin 10 mg"],
        items: [
          { name: "Metformin", strength: "500 mg", confidence: 0.95, requiresConfirmation: false },
          { name: "Amlodipine", strength: "5 mg", confidence: 0.91, requiresConfirmation: false },
          { name: "Rosuvastatin", strength: "10 mg", confidence: 0.38, requiresConfirmation: true },
        ],
        warnings: [],
      },
    };

    await runScan();

    await waitFor(() => expect(screen.getByText(/3 medicines detected/i)).toBeTruthy());
    expect(chip("Metformin 500 mg").getAttribute("aria-pressed")).toBe("true");
    expect(chip("Amlodipine 5 mg").getAttribute("aria-pressed")).toBe("true");
    expect(chip("Rosuvastatin 10 mg").getAttribute("aria-pressed")).toBe("false");
    expect(screen.getByRole("button", { name: /Search selected medicines \(2\)/i })).toBeTruthy();
  });

  it("shows the dosage form and quantity the prescription stated", async () => {
    scanPayload = {
      success: true,
      data: {
        medicines: ["Amoxicillin 500 mg"],
        items: [
          {
            name: "Amoxicillin",
            genericName: "Amoxicillin trihydrate",
            strength: "500 mg",
            dosageForm: "Capsule",
            quantity: "21",
            confidence: 0.93,
            requiresConfirmation: false,
          },
        ],
        warnings: [],
      },
    };

    await runScan();

    await waitFor(() => expect(chip("Amoxicillin 500 mg")).toBeTruthy());
    const text = chip("Amoxicillin 500 mg").textContent ?? "";
    expect(text).toContain("Capsule");
    expect(text).toContain("×21");
    expect(text).toContain("Amoxicillin trihydrate");
  });

  it("shows the scanner's warnings to the user", async () => {
    scanPayload = {
      success: true,
      data: {
        medicines: ["Metformin 500 mg"],
        items: [{ name: "Metformin", strength: "500 mg", confidence: 0.95, requiresConfirmation: false }],
        warnings: ["Only the first 20 of 25 pages were read. Please upload the remaining pages separately."],
      },
    };

    await runScan();

    await waitFor(() => expect(screen.getByText(/Only the first 20 of 25 pages/i)).toBeTruthy());
  });

  it("still works when the response carries no item detail", async () => {
    // An older or partial response: the labels alone must remain usable.
    scanPayload = { success: true, data: { medicines: ["Metformin 500 mg"] } };

    await runScan();

    await waitFor(() => expect(chip("Metformin 500 mg")).toBeTruthy());
    expect(chip("Metformin 500 mg").getAttribute("aria-pressed")).toBe("true");
  });

  it("tells the user plainly when nothing was detected", async () => {
    scanPayload = { success: true, data: { medicines: [], items: [], warnings: [] } };

    await runScan();

    await waitFor(() => expect(screen.getByText(/No medicines could be detected/i)).toBeTruthy());
  });
});
