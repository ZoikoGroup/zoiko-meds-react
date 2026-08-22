import fs from "fs/promises";
import path from "path";

export interface WebsiteSubmissionRecord {
  id: string;
  type: "CONTACT" | "BRIEFING" | "VERIFIED_NETWORK" | "SUPPORT" | "ENTERPRISE" | "SALES" | "OTHER";
  title: string;
  fullName: string;
  email: string;
  organization?: string;
  payload: Record<string, unknown>;
  submittedAt: string;
  status: "RECEIVED" | "PROCESSED";
}

const DATA_DIR = path.join(process.cwd(), "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");

async function ensureSubmissionsFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(SUBMISSIONS_FILE);
    } catch {
      await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (error) {
    console.error("[submissionDb] Failed to initialize submissions database:", error);
  }
}

/**
 * Saves a generic website submission to the persistent submissions database.
 */
export async function saveSubmission(data: {
  type: WebsiteSubmissionRecord["type"];
  title: string;
  fullName: string;
  email: string;
  organization?: string;
  payload: Record<string, unknown>;
}): Promise<WebsiteSubmissionRecord> {
  await ensureSubmissionsFile();

  const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const submittedAt = new Date().toISOString();

  const record: WebsiteSubmissionRecord = {
    id,
    type: data.type,
    title: data.title,
    fullName: data.fullName.trim(),
    email: data.email.trim(),
    organization: data.organization ? data.organization.trim() : undefined,
    payload: data.payload,
    submittedAt,
    status: "RECEIVED",
  };

  try {
    const fileContent = await fs.readFile(SUBMISSIONS_FILE, "utf-8");
    const existingRecords: WebsiteSubmissionRecord[] = JSON.parse(fileContent || "[]");
    existingRecords.push(record);
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(existingRecords, null, 2), "utf-8");
  } catch (err) {
    console.error("[submissionDb] Error saving submission to disk:", err);
    throw new Error("Failed to save submission record.");
  }

  return record;
}

/**
 * Retrieves all submission records.
 */
export async function getSubmissions(): Promise<WebsiteSubmissionRecord[]> {
  await ensureSubmissionsFile();
  try {
    const fileContent = await fs.readFile(SUBMISSIONS_FILE, "utf-8");
    return JSON.parse(fileContent || "[]");
  } catch {
    return [];
  }
}
