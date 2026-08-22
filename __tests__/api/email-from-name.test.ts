import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("Support Ticket Sender Name Configuration", () => {
  it("defines Zoi | Zoiko AI Assistant as the sender display name in .env", () => {
    const envContent = fs.readFileSync(path.join(process.cwd(), ".env"), "utf-8");
    expect(envContent).toContain('SMTP_FROM_NAME=Zoi | Zoiko AI Assistant');
    expect(envContent).toContain('SMTP_FROM="Zoi | Zoiko AI Assistant" <info@zoikomeds.com>');
  });
});
