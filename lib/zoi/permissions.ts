/**
 * ZoikoMeds Zoi™ Data Plane Isolation & Tool Permission Manifest
 * 
 * - Default Execution Plane: Plane A (Public availability search & guidance)
 * - Elevated Planes: Plane B (User session/account), Plane D (External partner/admin)
 * - Mandatory Rule: Expose NO tools that diagnose, prescribe, determine dosage, select treatment,
 *   or tell a user to start/stop/modify prescription therapy.
 */

export type DataPlane = "Plane A" | "Plane B" | "Plane D";

export interface ToolDefinition {
  name: string;
  category: "availability" | "navigation" | "support" | "clinical";
  allowedPlanes: DataPlane[];
  isClinical: boolean;
  description: string;
}

// Formal Tool Permission Manifest for Zoi™
export const TOOL_PERMISSION_MANIFEST: Record<string, ToolDefinition> = {
  check_availability: {
    name: "check_availability",
    category: "availability",
    allowedPlanes: ["Plane A", "Plane B"],
    isClinical: false,
    description: "Look up verified pharmacy stock for non-prescriptive availability queries.",
  },
  view_pharmacies: {
    name: "view_pharmacies",
    category: "availability",
    allowedPlanes: ["Plane A", "Plane B"],
    isClinical: false,
    description: "Display nearby licensed stocking pharmacy locations.",
  },
  set_alert: {
    name: "set_alert",
    category: "support",
    allowedPlanes: ["Plane A", "Plane B"],
    isClinical: false,
    description: "Subscribe to stock status notifications when inventory updates.",
  },
  escalate: {
    name: "escalate",
    category: "support",
    allowedPlanes: ["Plane A", "Plane B"],
    isClinical: false,
    description: "Connect user with human support or compliance desk.",
  },
  request_api_docs: {
    name: "request_api_docs",
    category: "navigation",
    allowedPlanes: ["Plane A", "Plane B"],
    isClinical: false,
    description: "Provide enterprise API documentation links.",
  },
  wholesale_portal: {
    name: "wholesale_portal",
    category: "navigation",
    allowedPlanes: ["Plane A", "Plane B"],
    isClinical: false,
    description: "Direct wholesale network partners to institutional access.",
  },
  // Prohibited Clinical Tools (Included for explicit blocking & CT-024 verification)
  diagnose: {
    name: "diagnose",
    category: "clinical",
    allowedPlanes: [],
    isClinical: true,
    description: "PROHIBITED: Clinical diagnosis tool.",
  },
  prescribe: {
    name: "prescribe",
    category: "clinical",
    allowedPlanes: [],
    isClinical: true,
    description: "PROHIBITED: Prescription issuance tool.",
  },
  determine_dosage: {
    name: "determine_dosage",
    category: "clinical",
    allowedPlanes: [],
    isClinical: true,
    description: "PROHIBITED: Dosage calculation tool.",
  },
  select_treatment: {
    name: "select_treatment",
    category: "clinical",
    allowedPlanes: [],
    isClinical: true,
    description: "PROHIBITED: Clinical treatment selection tool.",
  },
  modify_therapy: {
    name: "modify_therapy",
    category: "clinical",
    allowedPlanes: [],
    isClinical: true,
    description: "PROHIBITED: Start/stop/modify prescription therapy directive.",
  },
};

export interface PermissionCheckResult {
  allowed: boolean;
  reason?: string;
  plane: DataPlane;
}

export function validateToolPermission(
  toolName: string,
  requestedPlane: DataPlane = "Plane A"
): PermissionCheckResult {
  const tool = TOOL_PERMISSION_MANIFEST[toolName];

  if (!tool) {
    return {
      allowed: false,
      reason: `Tool '${toolName}' is not defined in the Zoi Tool Permission Manifest.`,
      plane: requestedPlane,
    };
  }

  if (tool.isClinical) {
    return {
      allowed: false,
      reason: `REJECTED (CT-024 Violation): Tool '${toolName}' is a clinical-treatment tool. Zoi™ is strictly prohibited from exposing clinical tools.`,
      plane: requestedPlane,
    };
  }

  if (!tool.allowedPlanes.includes(requestedPlane)) {
    return {
      allowed: false,
      reason: `Access Denied: Tool '${toolName}' is not authorized for execution in ${requestedPlane}. Default execution plane is Plane A.`,
      plane: requestedPlane,
    };
  }

  return {
    allowed: true,
    plane: requestedPlane,
  };
}

export function getActiveToolsForPlane(plane: DataPlane = "Plane A"): string[] {
  return Object.values(TOOL_PERMISSION_MANIFEST)
    .filter((t) => !t.isClinical && t.allowedPlanes.includes(plane))
    .map((t) => t.name);
}
