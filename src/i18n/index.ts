import type { Locale } from "../lib/locale";
import type { BriefLabels } from "../lib/brief/compose";
import { en } from "./en";
import { fr } from "./fr";
import type { Dictionary } from "./types";

export const dictionary: Record<Locale, Dictionary> = { fr, en };

export function useI18n(locale: Locale): Dictionary {
  return dictionary[locale];
}

export function briefLabels(locale: Locale): BriefLabels {
  const t = dictionary[locale].contact;
  return {
    localeName: dictionary[locale].meta.localeName,
    subject: t.mail.subject,
    empty: t.empty,
    yes: t.yes,
    no: t.no,
    page: t.mail.page,
    language: t.mail.language,
    sections: t.mail.sections,
    fields: t.fields,
    projectTypes: t.projectTypes,
    budgets: t.budgets,
    timelines: t.timelines,
    heard: t.heard,
    constraints: t.constraints,
  };
}

export type { Dictionary };
