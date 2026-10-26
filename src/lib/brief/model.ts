export const projectTypeIds = [
  "intelligence",
  "flux",
  "fondations",
  "surmesure",
  "multiple",
  "diagnostic",
  "unsure",
] as const;

export const budgetIds = [
  "unknown",
  "fondations",
  "flux",
  "intelligence",
  "surmesure",
  "large",
  "serenite",
] as const;

export const timelineIds = ["asap", "month", "quarter", "year", "none"] as const;

export const heardIds = ["referral", "search", "github", "tool", "other"] as const;

export const constraintIds = [
  "personal-data",
  "imposed-hosting",
  "regulated",
  "non-technical",
  "keep-existing",
  "none",
] as const;

export const stepIds = ["identity", "project", "situation", "frame", "details", "review"] as const;

export type ProjectTypeId = (typeof projectTypeIds)[number];
export type BudgetId = (typeof budgetIds)[number];
export type TimelineId = (typeof timelineIds)[number];
export type HeardId = (typeof heardIds)[number];
export type ConstraintId = (typeof constraintIds)[number];
export type StepId = (typeof stepIds)[number];
export type SpecAnswer = "yes" | "no" | "";

export interface BriefAnswers {
  name: string;
  email: string;
  role: string;
  company: string;
  website: string;
  projectType: ProjectTypeId | "";
  goal: string;
  success: string;
  situation: string;
  blockers: string;
  users: string;
  constraints: ConstraintId[];
  constraintNote: string;
  budget: BudgetId | "";
  timeline: TimelineId | "";
  dueDate: string;
  heard: HeardId | "";
  heardDetail: string;
  hasSpec: SpecAnswer;
  details: string;
  links: string;
  outOfScope: string;
  consent: boolean;
}

export const limits = {
  name: 120,
  email: 160,
  role: 120,
  company: 160,
  website: 200,
  goal: 500,
  success: 800,
  situation: 1500,
  blockers: 800,
  users: 200,
  constraintNote: 400,
  heardDetail: 200,
  details: 2500,
  links: 500,
  outOfScope: 500,
} as const;

export const emptyAnswers = (): BriefAnswers => ({
  name: "",
  email: "",
  role: "",
  company: "",
  website: "",
  projectType: "",
  goal: "",
  success: "",
  situation: "",
  blockers: "",
  users: "",
  constraints: [],
  constraintNote: "",
  budget: "",
  timeline: "",
  dueDate: "",
  heard: "",
  heardDetail: "",
  hasSpec: "",
  details: "",
  links: "",
  outOfScope: "",
  consent: false,
});

const projectTypeSet = new Set<string>(projectTypeIds);
const budgetSet = new Set<string>(budgetIds);
const timelineSet = new Set<string>(timelineIds);
const heardSet = new Set<string>(heardIds);
const constraintSet = new Set<string>(constraintIds);

function clip(value: unknown, max: number): string {
  return String(value ?? "").replace(/\r\n/g, "\n").trim().slice(0, max);
}

export function normalizeWebsite(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export function normalizeAnswers(input: Partial<BriefAnswers>): BriefAnswers {
  const constraints = Array.isArray(input.constraints)
    ? input.constraints.filter((id): id is ConstraintId => constraintSet.has(id))
    : [];
  const projectType = projectTypeSet.has(input.projectType ?? "")
    ? (input.projectType as ProjectTypeId)
    : "";
  const budget = budgetSet.has(input.budget ?? "") ? (input.budget as BudgetId) : "";
  const timeline = timelineSet.has(input.timeline ?? "") ? (input.timeline as TimelineId) : "";
  const heard = heardSet.has(input.heard ?? "") ? (input.heard as HeardId) : "";
  const hasSpec = input.hasSpec === "yes" || input.hasSpec === "no" ? input.hasSpec : "";
  return {
    name: clip(input.name, limits.name),
    email: clip(input.email, limits.email),
    role: clip(input.role, limits.role),
    company: clip(input.company, limits.company),
    website: clip(input.website, limits.website),
    projectType,
    goal: clip(input.goal, limits.goal),
    success: clip(input.success, limits.success),
    situation: clip(input.situation, limits.situation),
    blockers: clip(input.blockers, limits.blockers),
    users: clip(input.users, limits.users),
    constraints,
    constraintNote: clip(input.constraintNote, limits.constraintNote),
    budget,
    timeline,
    dueDate: /^\d{4}-\d{2}-\d{2}$/.test(input.dueDate ?? "") ? String(input.dueDate) : "",
    heard,
    heardDetail: clip(input.heardDetail, limits.heardDetail),
    hasSpec,
    details: clip(input.details, limits.details),
    links: clip(input.links, limits.links),
    outOfScope: clip(input.outOfScope, limits.outOfScope),
    consent: Boolean(input.consent),
  };
}
