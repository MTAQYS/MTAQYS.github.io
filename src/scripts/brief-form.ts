import { briefLabels, dictionary } from "../i18n";
import { composeBrief, type BriefPacket } from "../lib/brief/compose";
import { deliverBrief } from "../lib/brief/deliver";
import {
  constraintIds,
  normalizeAnswers,
  stepIds,
  type BriefAnswers,
  type ConstraintId,
  type StepId,
} from "../lib/brief/model";
import { validateAnswers, type ErrorCode, type FieldKey } from "../lib/brief/validate";
import { site } from "../lib/site";
import { fill } from "../lib/text";

const fieldStep: Record<FieldKey, StepId> = {
  name: "identity",
  email: "identity",
  website: "identity",
  projectType: "project",
  goal: "project",
  situation: "situation",
  budget: "frame",
  timeline: "frame",
  heard: "frame",
  details: "details",
  consent: "review",
};

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function readForm(form: HTMLFormElement): BriefAnswers {
  const data = new FormData(form);
  const selected = new Set(data.getAll("constraints").map(String));
  const constraints = constraintIds.filter((id) => selected.has(id));
  const hasSpec = data.get("hasSpec");
  return normalizeAnswers({
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    role: String(data.get("role") ?? ""),
    company: String(data.get("company") ?? ""),
    website: String(data.get("website") ?? ""),
    projectType: String(data.get("projectType") ?? "") as BriefAnswers["projectType"],
    goal: String(data.get("goal") ?? ""),
    success: String(data.get("success") ?? ""),
    situation: String(data.get("situation") ?? ""),
    blockers: String(data.get("blockers") ?? ""),
    users: String(data.get("users") ?? ""),
    constraints,
    constraintNote: String(data.get("constraintNote") ?? ""),
    budget: String(data.get("budget") ?? "") as BriefAnswers["budget"],
    timeline: String(data.get("timeline") ?? "") as BriefAnswers["timeline"],
    dueDate: String(data.get("dueDate") ?? ""),
    heard: String(data.get("heard") ?? "") as BriefAnswers["heard"],
    heardDetail: String(data.get("heardDetail") ?? ""),
    hasSpec: hasSpec === "yes" || hasSpec === "no" ? hasSpec : "",
    details: String(data.get("details") ?? ""),
    links: String(data.get("links") ?? ""),
    outOfScope: String(data.get("outOfScope") ?? ""),
    consent: data.get("consent") === "on",
  });
}

function applyAnswers(form: HTMLFormElement, answers: BriefAnswers): void {
  const set = (name: string, value: string) => {
    const field = form.elements.namedItem(name);
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) {
      field.value = value;
    }
  };
  set("name", answers.name);
  set("email", answers.email);
  set("role", answers.role);
  set("company", answers.company);
  set("website", answers.website);
  set("goal", answers.goal);
  set("success", answers.success);
  set("situation", answers.situation);
  set("blockers", answers.blockers);
  set("users", answers.users);
  set("constraintNote", answers.constraintNote);
  set("budget", answers.budget);
  set("timeline", answers.timeline);
  set("dueDate", answers.dueDate);
  set("heard", answers.heard);
  set("heardDetail", answers.heardDetail);
  set("details", answers.details);
  set("links", answers.links);
  set("outOfScope", answers.outOfScope);
  form.querySelectorAll<HTMLInputElement>('input[name="projectType"]').forEach((input) => {
    input.checked = input.value === answers.projectType;
  });
  form.querySelectorAll<HTMLInputElement>('input[name="hasSpec"]').forEach((input) => {
    input.checked = input.value === answers.hasSpec;
  });
  form.querySelectorAll<HTMLInputElement>('input[name="constraints"]').forEach((input) => {
    input.checked = answers.constraints.includes(input.value as ConstraintId);
  });
  const consent = form.elements.namedItem("consent");
  if (consent instanceof HTMLInputElement) consent.checked = false;
}

export function initBriefForm(root: HTMLElement): void {
  const locale = document.documentElement.lang === "en" ? "en" : "fr";
  const copy = dictionary[locale].contact;
  const labels = briefLabels(locale);
  const form = root.querySelector<HTMLFormElement>("form");
  const fallback = root.querySelector<HTMLElement>("[data-form-fallback]");
  if (!form) return;

  form.hidden = false;
  if (fallback) fallback.hidden = true;

  try {
    const saved = sessionStorage.getItem(site.briefStorageKey);
    if (saved) applyAnswers(form, normalizeAnswers(JSON.parse(saved) as Partial<BriefAnswers>));
  } catch {
    /* A blocked or broken draft should not stop the form. */
  }

  const panels = [...form.querySelectorAll<HTMLElement>("[data-step]")];
  const kicker = form.querySelector<HTMLElement>("[data-step-kicker]");
  const progress = form.querySelector<HTMLElement>("[data-progress]");
  const bar = form.querySelector<HTMLElement>("[data-progress-fill]");
  const status = form.querySelector<HTMLElement>("[data-status]");
  const review = form.querySelector<HTMLElement>("[data-review]");
  const plain = form.querySelector<HTMLTextAreaElement>("[data-plain]");
  let index = 0;
  let maxReached = 0;

  const persist = () => {
    try {
      const answers = readForm(form);
      answers.consent = false;
      sessionStorage.setItem(site.briefStorageKey, JSON.stringify(answers));
    } catch {
      /* Ignore quota and private-mode failures. */
    }
  };

  const clearErrors = () => {
    form.querySelectorAll<HTMLElement>("[data-error-for]").forEach((node) => {
      node.hidden = true;
      node.textContent = "";
    });
    form.querySelectorAll<HTMLElement>("[aria-invalid]").forEach((node) => node.removeAttribute("aria-invalid"));
    form.querySelectorAll<HTMLElement>("[data-step-error]").forEach((node) => {
      node.hidden = true;
      node.textContent = "";
    });
  };

  const showErrors = (errors: Partial<Record<FieldKey, ErrorCode>>) => {
    clearErrors();
    const keys = Object.keys(errors) as FieldKey[];
    const panel = panels[index];
    const alert = panel?.querySelector<HTMLElement>("[data-step-error]");
    if (alert) {
      alert.hidden = false;
      alert.textContent = copy.messages.summary;
    }
    let first: HTMLElement | null = null;
    for (const key of keys) {
      const code = errors[key];
      if (!code) continue;
      const message = form.querySelector<HTMLElement>(`[data-error-for="${key}"]`);
      if (message) {
        message.hidden = false;
        message.textContent = copy.errors[code];
      }
      const control =
        form.querySelector<HTMLElement>(`[data-field="${key}"]`) ??
        form.querySelector<HTMLElement>(`[name="${key}"]`);
      const target =
        control instanceof HTMLFieldSetElement
          ? control
          : control?.closest("fieldset") ?? control;
      if (target) target.setAttribute("aria-invalid", "true");
      if (!first) {
        first =
          control instanceof HTMLInputElement ||
          control instanceof HTMLSelectElement ||
          control instanceof HTMLTextAreaElement
            ? control
            : control?.querySelector("input, select, textarea") ?? null;
      }
    }
    (first ?? alert)?.focus();
  };

  const renderReview = (answers: BriefAnswers) => {
    if (!review) return;
    review.replaceChildren();
    const sections: { title: string; step: StepId; rows: [string, string][] }[] = [
      {
        title: labels.sections.who,
        step: "identity",
        rows: [
          [copy.fields.name, answers.name],
          [copy.fields.email, answers.email],
          [copy.fields.role, answers.role],
          [copy.fields.company, answers.company],
          [copy.fields.website, answers.website],
        ],
      },
      {
        title: labels.sections.project,
        step: "project",
        rows: [
          [copy.fields.projectType, answers.projectType ? copy.projectTypes[answers.projectType] : ""],
          [copy.fields.goal, answers.goal],
          [copy.fields.success, answers.success],
        ],
      },
      {
        title: labels.sections.situation,
        step: "situation",
        rows: [
          [copy.fields.situation, answers.situation],
          [copy.fields.blockers, answers.blockers],
          [copy.fields.users, answers.users],
          [
            copy.fields.constraints,
            answers.constraints.map((id) => copy.constraints[id]).join(locale === "fr" ? " · " : ", "),
          ],
          [copy.fields.constraintNote, answers.constraintNote],
        ],
      },
      {
        title: labels.sections.frame,
        step: "frame",
        rows: [
          [copy.fields.budget, answers.budget ? copy.budgets[answers.budget] : ""],
          [copy.fields.timeline, answers.timeline ? copy.timelines[answers.timeline] : ""],
          [copy.fields.dueDate, answers.dueDate],
          [copy.fields.heard, answers.heard ? copy.heard[answers.heard] : ""],
          [copy.fields.heardDetail, answers.heardDetail],
          [copy.fields.hasSpec, answers.hasSpec === "yes" ? copy.yes : answers.hasSpec === "no" ? copy.no : ""],
        ],
      },
      {
        title: labels.sections.details,
        step: "details",
        rows: [
          [copy.fields.details, answers.details],
          [copy.fields.links, answers.links],
          [copy.fields.outOfScope, answers.outOfScope],
        ],
      },
    ];

    for (const section of sections) {
      const block = document.createElement("section");
      block.className = "review-block";
      const heading = document.createElement("h3");
      heading.textContent = section.title;
      const edit = document.createElement("button");
      edit.type = "button";
      edit.className = "linkish";
      edit.textContent = copy.actions.edit;
      edit.addEventListener("click", () => show(stepIds.indexOf(section.step), true));
      heading.append(" ");
      heading.append(edit);
      const list = document.createElement("dl");
      list.className = "review-dl";
      for (const [label, value] of section.rows) {
        const term = document.createElement("dt");
        term.textContent = label;
        const detail = document.createElement("dd");
        detail.textContent = value.trim() || copy.empty;
        list.append(term, detail);
      }
      block.append(heading, list);
      review.append(block);
    }
  };

  const show = (next: number, focusHeading: boolean) => {
    index = Math.max(0, Math.min(stepIds.length - 1, next));
    maxReached = Math.max(maxReached, index);
    clearErrors();
    panels.forEach((panel, panelIndex) => {
      panel.hidden = panelIndex !== index;
    });
    const step = copy.steps[index];
    if (kicker && step) kicker.textContent = `${String(index + 1).padStart(2, "0")} — ${step.title}`;
    const valueNow = String(index + 1);
    progress?.setAttribute("aria-valuenow", valueNow);
    progress?.setAttribute("aria-valuetext", fill(copy.progress, { current: index + 1, total: stepIds.length }));
    if (bar) bar.style.width = `${((index + 1) / stepIds.length) * 100}%`;
    form.querySelectorAll<HTMLButtonElement>("[data-goto]").forEach((button) => {
      const target = stepIds.indexOf(button.dataset.goto as StepId);
      if (target === index) button.setAttribute("aria-current", "step");
      else button.removeAttribute("aria-current");
      button.disabled = target > maxReached;
    });
    if (stepIds[index] === "review") renderReview(readForm(form));
    if (status) status.textContent = "";
    if (plain) plain.hidden = true;
    if (focusHeading) panels[index]?.querySelector<HTMLElement>("h2")?.focus();
    persist();
  };

  form.querySelectorAll<HTMLButtonElement>("[data-goto]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = stepIds.indexOf(button.dataset.goto as StepId);
      if (target < 0 || target === index) return;
      if (target > index) {
        const result = validateAnswers(readForm(form), stepIds[index]);
        if (!result.ok) {
          showErrors(result.fieldErrors);
          return;
        }
      }
      show(target, true);
    });
  });

  form.querySelectorAll<HTMLButtonElement>("[data-next]").forEach((button) => {
    button.addEventListener("click", () => {
      const result = validateAnswers(readForm(form), stepIds[index]);
      if (!result.ok) {
        showErrors(result.fieldErrors);
        return;
      }
      show(index + 1, true);
    });
  });

  form.querySelectorAll<HTMLButtonElement>("[data-back]").forEach((button) => {
    button.addEventListener("click", () => show(index - 1, true));
  });

  form.querySelector<HTMLButtonElement>("[data-clear]")?.addEventListener("click", () => {
    form.reset();
    try {
      sessionStorage.removeItem(site.briefStorageKey);
    } catch {
      /* Ignore. */
    }
    maxReached = 0;
    show(0, true);
  });

  form.addEventListener("input", () => {
    persist();
  });

  form.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.target instanceof HTMLTextAreaElement) return;
    if (event.target instanceof HTMLInputElement && stepIds[index] !== "review") {
      event.preventDefault();
      form.querySelector<HTMLButtonElement>("[data-step]:not([hidden]) [data-next]")?.click();
    }
  });

  const revealPlain = (packet: BriefPacket) => {
    if (!plain) return;
    plain.hidden = false;
    plain.value = packet.plain;
    plain.focus();
    plain.select();
  };

  form.querySelector<HTMLButtonElement>("[data-copy]")?.addEventListener("click", async () => {
    const answers = readForm(form);
    const result = validateAnswers(answers, "all");
    if (!result.ok) {
      const first = (Object.keys(result.fieldErrors) as FieldKey[]).find((key) => key !== "consent");
      if (first) show(stepIds.indexOf(fieldStep[first]), false);
      showErrors(result.fieldErrors);
      return;
    }
    const packet = composeBrief(answers, labels, locale, window.location.href);
    const ok = await copyText(packet.plain);
    if (status) status.textContent = ok ? copy.messages.copyOk : copy.messages.copyFail;
    if (!ok) revealPlain(packet);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const answers = readForm(form);
    const result = validateAnswers(answers, "review");
    if (!result.ok) {
      const first = (Object.keys(result.fieldErrors) as FieldKey[])[0];
      if (first && fieldStep[first] !== stepIds[index]) show(stepIds.indexOf(fieldStep[first]), false);
      showErrors(result.fieldErrors);
      return;
    }
    const packet = composeBrief(answers, labels, locale, window.location.href);
    const delivery = deliverBrief(packet);
    if (!delivery.ok) {
      const copied = await copyText(packet.plain);
      if (status) status.textContent = copied ? `${copy.messages.tooLong} ${copy.messages.copyOk}` : copy.messages.tooLong;
      if (!copied) revealPlain(packet);
      return;
    }
    if (status) status.textContent = copy.messages.opened;
    window.location.href = delivery.href;
  });

  show(0, false);
}
