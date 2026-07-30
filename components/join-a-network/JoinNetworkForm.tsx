"use client";

import { useState } from "react";
import { internalApi } from "@/lib/config";
import ProgressBar from "./ProgressBar";
import StepTransition from "./StepTransition";
import Step1FindPharmacy, { validateStep1, StepErrors } from "./Step1FindPharmacy";
import Step2VerifyAuthority, { validateStep2 } from "./Step2VerifyAuthority";
import Step3InventorySync, { validateStep3 } from "./Step3InventorySync";
import Step4VisibilityRules from "./Step4VisibilityRules";
import Step5ReviewActivate from "./Step5ReviewActivate";
import SuccessScreen from "./SuccessScreen";
import { JoinNetworkFormData, initialFormData } from "./types";

export default function JoinNetworkForm() {
  const [step, setStep] = useState(1); // 1-5, 6 = success
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [data, setData] = useState<JoinNetworkFormData>(initialFormData);
  const [errors, setErrors] = useState<StepErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function update(patch: Partial<JoinNetworkFormData>) {
    setData((prev) => ({ ...prev, ...patch }));
  }

  function validateCurrentStep(): boolean {
    let stepErrors: StepErrors = {};
    if (step === 1) stepErrors = validateStep1(data);
    if (step === 2) stepErrors = validateStep2(data);
    if (step === 3) stepErrors = validateStep3(data);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  }

  function goNext() {
    if (!validateCurrentStep()) return;
    setErrors({});
    setDirection("forward");
    setStep((s) => Math.min(s + 1, 5));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setErrors({});
    setDirection("backward");
    setStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function skipInventory() {
    update({ invSkipped: true });
    setErrors({});
    setDirection("forward");
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function activate() {
    if (!data.finalConfirmed) {
      setErrors({ finalConfirmed: "You must confirm before activating." });
      return;
    }
    setErrors({});
    setSubmitting(true);
    setSubmitError("");

    try {
      const res = await fetch(internalApi("pharmacy-registration"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serializeForApi(data)),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Something went wrong.");
      setDirection("forward");
      setStep(6);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f5f8] font-sans">
      {step <= 5 && <ProgressBar currentStep={step} />}

      <StepTransition stepKey={step} direction={direction}>
        {step === 1 && <Step1FindPharmacy data={data} update={update} errors={errors} />}
        {step === 2 && <Step2VerifyAuthority data={data} update={update} errors={errors} />}
        {step === 3 && <Step3InventorySync data={data} update={update} errors={errors} />}
        {step === 4 && <Step4VisibilityRules data={data} update={update} />}
        {step === 5 && (
          <Step5ReviewActivate data={data} update={update} error={errors.finalConfirmed} />
        )}
        {step === 6 && <SuccessScreen pharmacyName={data.pharmacyName || data.searchValue} />}
      </StepTransition>

      {step <= 5 && (
        <div className="mx-auto flex max-w-[740px] items-center justify-between px-4 pb-6 pt-2 sm:px-8">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className="rounded-[10px] border-[1.5px] border-gray-200 px-6 py-3 text-[15px] font-bold text-gray-900 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-teal-500 hover:text-teal-500 hover:shadow-md active:translate-y-0 disabled:invisible"
          >
            ← Back
          </button>
          <div className="flex items-center gap-4">
            {step === 3 && (
              <button
                type="button"
                onClick={skipInventory}
                className="text-[13px] text-gray-400 transition-colors duration-200 hover:text-gray-600"
              >
                Set up inventory later
              </button>
            )}
            <span className="text-[13px] text-gray-400">Step {step} of 5</span>
            {step < 5 ? (
              <button
                type="button"
                onClick={goNext}
                className="rounded-[10px] bg-teal-500 px-6 py-3 text-[15px] font-bold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/30 active:translate-y-0"
              >
                {step === 1 && "Continue — Verify Authority →"}
                {step === 2 && "Run Verification →"}
                {step === 3 && "Continue — Visibility Rules →"}
                {step === 4 && "Continue — Review & Activate →"}
              </button>
            ) : (
              <button
                type="button"
                onClick={activate}
                disabled={submitting}
                className="relative overflow-hidden rounded-[10px] bg-teal-500 px-6 py-3 text-[15px] font-bold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/30 active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-gray-300 disabled:shadow-none"
              >
                <span className="inline-flex items-center gap-2">
                  {submitting && (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  )}
                  {submitting ? "Activating…" : "Activate My Pharmacy Node ✓"}
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {submitError && (
        <p className="mx-auto max-w-[740px] animate-[stepForward_0.25s_ease] px-4 pb-6 text-sm text-red-500 sm:px-8">
          {submitError}
        </p>
      )}
    </div>
  );
}

// Strip File objects (not JSON-serializable) before sending to the API.
// In a real integration, upload files separately (e.g. to S3) and send back a URL/key here.
function serializeForApi(data: JoinNetworkFormData) {
  const { licenseFile, invFile, ...rest } = data;
  return {
    ...rest,
    licenseFileName: licenseFile?.name || null,
    invFileName: invFile?.name || null,
  };
}