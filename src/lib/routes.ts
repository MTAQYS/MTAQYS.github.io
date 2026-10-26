export const pages = {
  home: { fr: "/", en: "/en/" },
  services: { fr: "/services/", en: "/en/services/" },
  tools: { fr: "/outils/", en: "/en/tools/" },
  contact: { fr: "/contact/", en: "/en/contact/" },
  legal: { fr: "/mentions-legales/", en: "/en/legal/" },
  privacy: { fr: "/confidentialite/", en: "/en/privacy/" },
} as const;

export type PageId = keyof typeof pages;
export type Lang = "fr" | "en";

export const pageIds = Object.keys(pages) as PageId[];

export function pathFor(page: PageId, lang: Lang): string {
  return pages[page][lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === "fr" ? "en" : "fr";
}
