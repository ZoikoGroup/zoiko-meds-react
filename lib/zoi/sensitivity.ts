/**
 * ZoikoMeds Zoi™ Medicine Sensitivity Classifier & Handling
 * 
 * Classifies medicines into sensitivity tiers (e.g. controlled substances,
 * high-risk medications, restricted distribution items) to apply additional
 * privacy handling, safety disclaimers, and badge rendering in Zoi UI.
 */

export interface SensitivityInfo {
  isSensitive: boolean;
  tier?: "CONTROLLED_SUBSTANCE" | "RESTRICTED_MEDICATION" | "SPECIALTY";
  badgeLabel?: string;
  warningText?: string;
  restrictAlerts: boolean;
}

const CONTROLLED_SUBSTANCES = [
  "morphine", "oxycodone", "fentanyl", "hydrocodone", "methadone",
  "tramadol", "codeine", "buprenorphine", "diazepam", "alprazolam",
  "lorazepam", "clonazepam", "midazolam", "zolpidem", "methylphenidate",
  "amphetamine", "dextroamphetamine", "ketamine", "pregabalin", "gabapentin"
];

const RESTRICTED_MEDICATIONS = [
  "mifepristone", "misoprostol", "isotretinoin", "clozapine", "thalidomide", "lenalidomide"
];

export function getMedicineSensitivity(medicine: string): SensitivityInfo {
  if (!medicine || typeof medicine !== "string") {
    return { isSensitive: false, restrictAlerts: false };
  }

  const lower = medicine.trim().toLowerCase();

  if (CONTROLLED_SUBSTANCES.some((term) => lower.includes(term))) {
    return {
      isSensitive: true,
      tier: "CONTROLLED_SUBSTANCE",
      badgeLabel: "Controlled Substance",
      warningText: "Controlled medication. Requires valid prescription and verified identity confirmation at dispensing pharmacy.",
      restrictAlerts: false,
    };
  }

  if (RESTRICTED_MEDICATIONS.some((term) => lower.includes(term))) {
    return {
      isSensitive: true,
      tier: "RESTRICTED_MEDICATION",
      badgeLabel: "Restricted Medicine",
      warningText: "Specialty / restricted distribution medicine. Subject to regulatory protocol and pharmacy verification.",
      restrictAlerts: true,
    };
  }

  return { isSensitive: false, restrictAlerts: false };
}
