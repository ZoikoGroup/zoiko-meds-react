import fs from "fs/promises";
import path from "path";

export interface VerifiedNetworkRegistration {
  id: string;
  workEmail: string;
  fullName: string;
  orgName: string;
  pharmacyType: string;
  note?: string;
  submittedAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "verified_network_registrations.json");

/**
 * Ensures that the data directory and JSON DB file exist.
 */
async function ensureDbFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(DB_FILE);
    } catch {
      await fs.writeFile(DB_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Failed to initialize verified network registration database:", error);
  }
}

/**
 * Saves a new verified network registration record to the persistent database.
 */
export async function saveVerifiedNetworkRegistration(data: {
  workEmail: string;
  fullName: string;
  orgName: string;
  pharmacyType: string;
  note?: string;
}): Promise<VerifiedNetworkRegistration> {
  await ensureDbFile();

  const id = `vnet_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const submittedAt = new Date().toISOString();

  const record: VerifiedNetworkRegistration = {
    id,
    workEmail: data.workEmail.trim(),
    fullName: data.fullName.trim(),
    orgName: data.orgName.trim(),
    pharmacyType: data.pharmacyType.trim(),
    note: data.note ? data.note.trim() : "",
    submittedAt,
    status: "PENDING",
  };

  try {
    const fileContent = await fs.readFile(DB_FILE, "utf-8");
    const existingRecords: VerifiedNetworkRegistration[] = JSON.parse(fileContent || "[]");
    existingRecords.push(record);
    await fs.writeFile(DB_FILE, JSON.stringify(existingRecords, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to verified network DB file:", err);
    throw new Error("Failed to save registration record to database.");
  }

  return record;
}

/**
 * Retrieves all registration records (useful for admin review).
 */
export async function getVerifiedNetworkRegistrations(): Promise<VerifiedNetworkRegistration[]> {
  await ensureDbFile();
  try {
    const fileContent = await fs.readFile(DB_FILE, "utf-8");
    return JSON.parse(fileContent || "[]");
  } catch {
    return [];
  }
}
