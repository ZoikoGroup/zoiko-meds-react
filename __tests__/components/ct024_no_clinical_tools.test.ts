import { describe, it, expect } from "vitest";
import {
  validateToolPermission,
  TOOL_PERMISSION_MANIFEST,
  getActiveToolsForPlane,
} from "@/lib/zoi/permissions";

describe("CT-024: Non-Clinical Tool Permission Scope", () => {
  it("verifies allowed Plane A non-clinical tools", () => {
    const allowedTools = ["check_availability", "view_pharmacies", "set_alert", "escalate"];

    for (const toolName of allowedTools) {
      const check = validateToolPermission(toolName, "Plane A");
      expect(check.allowed).toBe(true);
      expect(check.plane).toBe("Plane A");
    }
  });

  it("STRICTLY REJECTS all clinical-treatment tools (CT-024)", () => {
    const clinicalTools = [
      "diagnose",
      "prescribe",
      "determine_dosage",
      "select_treatment",
      "modify_therapy",
    ];

    for (const toolName of clinicalTools) {
      const check = validateToolPermission(toolName, "Plane A");
      expect(check.allowed).toBe(false);
      expect(check.reason).toContain("CT-024 Violation");
      expect(check.reason).toContain("clinical-treatment tool");
    }
  });

  it("verifies that active tools for Plane A contain zero clinical tools", () => {
    const activePlaneATools = getActiveToolsForPlane("Plane A");

    expect(activePlaneATools).toContain("check_availability");
    expect(activePlaneATools).toContain("view_pharmacies");

    expect(activePlaneATools).not.toContain("diagnose");
    expect(activePlaneATools).not.toContain("prescribe");
    expect(activePlaneATools).not.toContain("determine_dosage");
    expect(activePlaneATools).not.toContain("select_treatment");
    expect(activePlaneATools).not.toContain("modify_therapy");
  });

  it("rejects unknown or unlisted tools by default", () => {
    const check = validateToolPermission("unauthorized_custom_tool", "Plane A");
    expect(check.allowed).toBe(false);
    expect(check.reason).toContain("not defined in the Zoi Tool Permission Manifest");
  });

  it("ensures manifest explicitly marks all clinical tools as isClinical: true", () => {
    const clinicalTools = ["diagnose", "prescribe", "determine_dosage", "select_treatment", "modify_therapy"];

    for (const name of clinicalTools) {
      const def = TOOL_PERMISSION_MANIFEST[name];
      expect(def).toBeDefined();
      expect(def.isClinical).toBe(true);
      expect(def.allowedPlanes).toHaveLength(0);
    }
  });
});
