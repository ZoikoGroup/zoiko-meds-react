/**
 * The one SMTP transport the whole site sends through.
 *
 * Server-only. Every value comes from the environment — nothing here may be
 * imported from a client component, and no credential is ever logged.
 *
 * The environment variable names are the ones already in production; the
 * alternates (`SMTP_PASSWORD` / `SMTP_USERNAME`) are kept because that is what
 * `.github/workflows/deploy.yml` writes to the server's `.env`.
 */
import nodemailer, { type Transporter } from "nodemailer";

/** Where staff notifications go. Server-controlled: never taken from a request. */
export const INTERNAL_RECIPIENT = "info@zoikomeds.com";

export interface SmtpSettings {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  /** Full `From` header, e.g. `"ZoikoMeds" <info@zoikomeds.com>`. */
  from: string;
  /** Bare address from that header, used as the default Reply-To. */
  fromAddress: string;
}

/**
 * Read the SMTP configuration, or null when it is incomplete.
 *
 * Null is a normal state — a developer machine usually has no credentials — and
 * callers degrade instead of failing.
 */
export function readSmtpSettings(): SmtpSettings | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = (process.env.SMTP_USER || process.env.SMTP_USERNAME)?.trim();
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  if (!host || !user || !pass) return null;

  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 465;
  if (!Number.isFinite(port) || port <= 0) return null;

  // Implicit TLS on 465; 587 uses STARTTLS, which nodemailer negotiates with
  // `secure: false`. The env flags let a host override either way.
  const secure =
    port === 465 || process.env.SMTP_USE_SSL === "true" || process.env.SMTP_USE_TLS === "true";

  const fromAddress = (process.env.SMTP_FROM_ADDRESS || user).trim();
  const fromName = (process.env.SMTP_FROM_NAME || "ZoikoMeds").trim();
  const from = process.env.SMTP_FROM?.trim() || `"${fromName}" <${fromAddress}>`;

  return { host, port, secure, user, pass, from, fromAddress };
}

let cached: Transporter | null = null;
let cachedKey = "";

/**
 * The shared transport, created once and reused.
 *
 * Pooled so a burst of submissions reuses one authenticated connection rather
 * than opening a session per email. Returns null when SMTP is not configured.
 */
export function getTransport(): Transporter | null {
  const settings = readSmtpSettings();
  if (!settings) return null;

  // Rebuild if the configuration changed under us (tests, config reload).
  // The password is deliberately absent from the key so it cannot be logged.
  const key = `${settings.host}:${settings.port}:${settings.secure}:${settings.user}`;
  if (cached && cachedKey === key) return cached;

  cached = nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.secure,
    auth: { user: settings.user, pass: settings.pass },
    // Certificate verification is off by default because that is how the
    // current production host is known to work; set SMTP_REQUIRE_VALID_CERT=true
    // to turn it on once the host's chain has been checked.
    tls: { rejectUnauthorized: process.env.SMTP_REQUIRE_VALID_CERT === "true" },
    pool: true,
    maxConnections: 3,
    maxMessages: 50,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
  cachedKey = key;
  return cached;
}

/** Drop the memoized transport. For tests and config reloads only. */
export function resetTransportForTesting(): void {
  cached = null;
  cachedKey = "";
}

/**
 * Strip credentials out of text before it is logged or returned.
 *
 * SMTP servers sometimes echo the submitted username, and an auth failure
 * message can carry the password with it. Nothing derived from an SMTP error
 * should reach a log until it has been through here.
 */
export function redactSecrets(text: string): string {
  if (!text) return "";
  let safe = String(text);

  const secrets = [
    process.env.SMTP_PASS,
    process.env.SMTP_PASSWORD,
    process.env.SMTP_USER,
    process.env.SMTP_USERNAME,
  ];

  for (const secret of secrets) {
    const value = secret?.trim();
    // Two characters could match half the message; require something real.
    if (!value || value.length < 4) continue;
    safe = safe.split(value).join("[redacted]");
  }

  return safe;
}

/**
 * Describe the SMTP setup for a log line — host, port and TLS only.
 *
 * Never includes the user or the password.
 */
export function describeSmtpTarget(): string {
  const settings = readSmtpSettings();
  if (!settings) return "not configured";
  return `${settings.host}:${settings.port} (secure=${settings.secure})`;
}
