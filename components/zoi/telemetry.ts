export interface TelemetryEvent {
  name: string;
  properties?: Record<string, string | number | boolean>;
}

export interface Telemetry {
  track(event: TelemetryEvent): void;
  pageView(page: string): void;
}

function createNoopTelemetry(): Telemetry {
  return { track: () => {}, pageView: () => {} };
}

function createConsoleTelemetry(): Telemetry {
  return {
    track: (event) => console.log(`[Telemetry] ${event.name}`, event.properties ?? ""),
    pageView: (page) => console.log(`[Telemetry] Page view: ${page}`),
  };
}

let telemetry: Telemetry = createNoopTelemetry();

export function configureTelemetry(impl: Telemetry): void {
  telemetry = impl;
}

export function trackEvent(name: string, properties?: Record<string, string | number | boolean>): void {
  telemetry.track({ name, properties });
}

export function trackPageView(page: string): void {
  telemetry.pageView(page);
}

let initialized = false;

export function initTelemetry(): void {
  if (initialized) return;
  initialized = true;
  if (process.env.NODE_ENV === "development") {
    telemetry = createConsoleTelemetry();
  }
}
