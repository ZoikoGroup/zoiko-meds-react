import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ZoiProvider, useZoi } from "@/components/zoi/ZoiProvider";
import type { ReactNode } from "react";

function TestConsumer({ onReady }: { onReady: (ctx: ReturnType<typeof useZoi>) => void }) {
  const ctx = useZoi();
  return (
    <div>
      <button onClick={() => ctx.openPanel()}>Open Panel</button>
      <button onClick={() => ctx.closePanel()}>Close Panel</button>
      <button onClick={() => ctx.setPersona("patient")}>Set Patient</button>
      <button onClick={() => ctx.handleChipAction("escalate")}>Escalate</button>
      <button onClick={() => ctx.submitEscalation("test@example.com")}>Submit Escalation</button>
      <button onClick={() => ctx.setError("offline")}>Set Offline</button>
      <button onClick={() => ctx.clearError()}>Clear Error</button>
      <div data-testid="panel-view">{ctx.state.panelView}</div>
      <div data-testid="persona">{ctx.state.persona ?? "none"}</div>
      <div data-testid="message-count">{ctx.state.messages.length}</div>
      <div data-testid="error">{String(ctx.state.error)}</div>
      <div data-testid="escalation-ref">{ctx.state.escalationReference ?? "none"}</div>
    </div>
  );
}

function renderProvider() {
  let api: ReturnType<typeof useZoi> | null = null;
  render(
    <ZoiProvider>
      <TestConsumer
        onReady={(ctx) => {
          api = ctx;
        }}
      />
    </ZoiProvider>
  );
  return api;
}

describe("ZoiProvider", () => {
  beforeEach(() => {
    renderProvider();
  });

  it("starts with panel closed and no persona", () => {
    expect(screen.getByTestId("panel-view").textContent).toBe("closed");
    expect(screen.getByTestId("persona").textContent).toBe("none");
  });

  it("opens panel and adds greeting message", async () => {
    await userEvent.click(screen.getByText("Open Panel"));
    expect(screen.getByTestId("panel-view").textContent).toBe("open");
    expect(Number(screen.getByTestId("message-count").textContent)).toBeGreaterThanOrEqual(1);
  });

  it("closes panel", async () => {
    await userEvent.click(screen.getByText("Open Panel"));
    await userEvent.click(screen.getByText("Close Panel"));
    expect(screen.getByTestId("panel-view").textContent).toBe("closed");
  });

  it("sets persona", async () => {
    await userEvent.click(screen.getByText("Set Patient"));
    expect(screen.getByTestId("persona").textContent).toBe("patient");
  });

  it("sets and clears error", async () => {
    await userEvent.click(screen.getByText("Set Offline"));
    expect(screen.getByTestId("error").textContent).toBe("offline");
    await userEvent.click(screen.getByText("Clear Error"));
    expect(screen.getByTestId("error").textContent).toBe("null");
  });

  it("handleChipAction escalate adds escalation message", async () => {
    const initialCount = Number(screen.getByTestId("message-count").textContent);
    await userEvent.click(screen.getByText("Escalate"));
    expect(Number(screen.getByTestId("message-count").textContent)).toBe(initialCount + 1);
  });
});
