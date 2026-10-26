import type { Lang, PageId } from "../lib/routes";

export interface NavItem {
  page: PageId;
  label: string;
}

export interface IndexedText {
  index: string;
  title: string;
  text: string;
}

export interface NamePart {
  word: string;
  text: string;
}

export interface ServiceBlock {
  id: string;
  index: string;
  title: string;
  paragraphs: string[];
  points: string[];
}

export interface ToolCard {
  name: string;
  href: string;
  index: string;
  summary: string;
  detail: string;
  action: string;
}

export interface ProseSection {
  id: string;
  heading: string;
  paragraphs: string[];
  /** Visible gap where a real legal fact must be added later. Nothing in here is invented. */
  placeholder?: boolean;
}

export interface Dictionary {
  lang: Lang;
  ogLocale: string;
  ogAlt: string;
  skip: string;
  navAria: string;
  langAria: string;
  menuOpen: string;
  menuClose: string;
  themeLight: string;
  themeDark: string;
  themeAriaToLight: string;
  themeAriaToDark: string;
  footerAria: string;
  footerBlurb: string;
  footerRights: string;
  emailLabel: string;
  nav: NavItem[];
  legalNav: NavItem[];
  home: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    markCaption: string;
    practices: IndexedText[];
    whatTitle: string;
    whatLede: string;
    what: IndexedText[];
    toolsLink: string;
    howTitle: string;
    howLede: string;
    how: IndexedText[];
    nameTitle: string;
    nameLede: string;
    nameParts: NamePart[];
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  services: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lede: string;
    indexLabel: string;
    blocks: ServiceBlock[];
    frameTitle: string;
    frameLede: string;
    frame: IndexedText[];
    limitsTitle: string;
    limits: string[];
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  tools: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lede: string;
    note: string;
    items: ToolCard[];
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lede: string;
    direct: string;
    formTitle: string;
    formNote: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    optional: string;
    required: string;
    submit: string;
    points: string[];
  };
  legal: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lede: string;
    updated: string;
    sections: ProseSection[];
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lede: string;
    updated: string;
    sections: ProseSection[];
  };
}
