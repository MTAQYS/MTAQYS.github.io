import { site } from "../site";
import { normalizeWebsite, type BriefAnswers, type ConstraintId } from "./model";

export interface BriefLabels {
  localeName: string;
  subject: string;
  empty: string;
  yes: string;
  no: string;
  page: string;
  language: string;
  sections: {
    who: string;
    project: string;
    situation: string;
    frame: string;
    details: string;
  };
  fields: {
    name: string;
    email: string;
    role: string;
    company: string;
    website: string;
    projectType: string;
    goal: string;
    success: string;
    situation: string;
    blockers: string;
    users: string;
    constraints: string;
    constraintNote: string;
    budget: string;
    timeline: string;
    dueDate: string;
    heard: string;
    heardDetail: string;
    hasSpec: string;
    details: string;
    links: string;
    outOfScope: string;
  };
  projectTypes: Record<string, string>;
  budgets: Record<string, string>;
  timelines: Record<string, string>;
  heard: Record<string, string>;
  constraints: Record<ConstraintId, string>;
}

export interface BriefPacket {
  to: string;
  subject: string;
  body: string;
  plain: string;
}

function cleanHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}

function shown(value: string, empty: string): string {
  const trimmed = value.trim();
  return trimmed || empty;
}

export function formatDueDate(value: string, locale: "fr" | "en"): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function composeBrief(
  answers: BriefAnswers,
  labels: BriefLabels,
  locale: "fr" | "en",
  pageUrl: string,
): BriefPacket {
  const sep = locale === "fr" ? "\u202F: " : ": ";
  const line = (label: string, value: string) => `${label}${sep}${shown(value, labels.empty)}`;
  const typeLabel = answers.projectType ? (labels.projectTypes[answers.projectType] ?? answers.projectType) : "";
  const who = answers.company ? `${answers.name} (${answers.company})` : answers.name;
  const subject = cleanHeader(labels.subject.replace("{type}", typeLabel || labels.empty).replace("{who}", who));

  const constraintText = answers.constraints.length
    ? answers.constraints.map((id) => labels.constraints[id] ?? id).join(locale === "fr" ? " · " : ", ")
    : "";

  const website = answers.website.trim() ? normalizeWebsite(answers.website) : "";
  const spec =
    answers.hasSpec === "yes" ? labels.yes : answers.hasSpec === "no" ? labels.no : labels.empty;

  const blocks = [
    `Dynamogic — ${labels.localeName}`,
    line(labels.language, labels.localeName),
    line(labels.page, pageUrl),
    "",
    `— ${labels.sections.who}`,
    line(labels.fields.name, answers.name),
    line(labels.fields.email, answers.email),
    line(labels.fields.role, answers.role),
    line(labels.fields.company, answers.company),
    line(labels.fields.website, website),
    "",
    `— ${labels.sections.project}`,
    line(labels.fields.projectType, typeLabel),
    line(labels.fields.goal, answers.goal),
    line(labels.fields.success, answers.success),
    "",
    `— ${labels.sections.situation}`,
    line(labels.fields.situation, answers.situation),
    line(labels.fields.blockers, answers.blockers),
    line(labels.fields.users, answers.users),
    line(labels.fields.constraints, constraintText),
    line(labels.fields.constraintNote, answers.constraintNote),
    "",
    `— ${labels.sections.frame}`,
    line(labels.fields.budget, answers.budget ? (labels.budgets[answers.budget] ?? answers.budget) : ""),
    line(labels.fields.timeline, answers.timeline ? (labels.timelines[answers.timeline] ?? answers.timeline) : ""),
    line(labels.fields.dueDate, answers.dueDate ? formatDueDate(answers.dueDate, locale) : ""),
    line(labels.fields.heard, answers.heard ? (labels.heard[answers.heard] ?? answers.heard) : ""),
    line(labels.fields.heardDetail, answers.heardDetail),
    line(labels.fields.hasSpec, spec),
    "",
    `— ${labels.sections.details}`,
    line(labels.fields.details, answers.details),
    line(labels.fields.links, answers.links),
    line(labels.fields.outOfScope, answers.outOfScope),
  ];

  const body = blocks.join("\n");
  const plain = [`To: ${site.email}`, `Subject: ${subject}`, "", body].join("\n");
  return { to: site.email, subject, body, plain };
}
