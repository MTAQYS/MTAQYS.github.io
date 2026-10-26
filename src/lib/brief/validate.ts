import { normalizeWebsite, type BriefAnswers, type StepId } from "./model";

export type FieldKey =
  | "name"
  | "email"
  | "website"
  | "projectType"
  | "goal"
  | "situation"
  | "budget"
  | "timeline"
  | "heard"
  | "details"
  | "consent";

export type ErrorCode = "required" | "email" | "short" | "url" | "consent";

export interface ValidationResult {
  ok: boolean;
  fieldErrors: Partial<Record<FieldKey, ErrorCode>>;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(normalizeWebsite(value));
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateAnswers(answers: BriefAnswers, step: StepId | "all"): ValidationResult {
  const fieldErrors: ValidationResult["fieldErrors"] = {};
  const need = (id: StepId) => step === "all" || step === "review" || step === id;

  if (need("identity")) {
    if (answers.name.trim().length < 2) fieldErrors.name = "required";
    if (!answers.email.trim()) fieldErrors.email = "required";
    else if (!emailPattern.test(answers.email.trim())) fieldErrors.email = "email";
    if (answers.website.trim() && !isHttpUrl(answers.website)) fieldErrors.website = "url";
  }

  if (need("project")) {
    if (!answers.projectType) fieldErrors.projectType = "required";
    if (answers.goal.trim().length < 8) fieldErrors.goal = answers.goal.trim() ? "short" : "required";
  }

  if (need("situation")) {
    if (answers.situation.trim().length < 8) {
      fieldErrors.situation = answers.situation.trim() ? "short" : "required";
    }
  }

  if (need("frame")) {
    if (!answers.budget) fieldErrors.budget = "required";
    if (!answers.timeline) fieldErrors.timeline = "required";
    if (!answers.heard) fieldErrors.heard = "required";
  }

  if (need("details")) {
    if (answers.details.trim().length < 20) {
      fieldErrors.details = answers.details.trim() ? "short" : "required";
    }
  }

  if (step === "review" || step === "all") {
    if (!answers.consent) fieldErrors.consent = "consent";
  }

  return { ok: Object.keys(fieldErrors).length === 0, fieldErrors };
}
