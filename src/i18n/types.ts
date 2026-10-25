import type { OfferId } from "../data/offers";
import type { ConstraintId, StepId } from "../lib/brief/model";

export interface TextSection {
  id: string;
  heading: string;
  paragraphs: string[];
  showEmail?: boolean;
}

export interface IndexedCopy {
  title: string;
  text: string;
}

export interface StepCopy {
  id: StepId;
  label: string;
  title: string;
  lede: string;
}

export interface Dictionary {
  meta: {
    ogAlt: string;
    localeName: string;
  };
  nav: {
    vision: string;
    services: string;
    tools: string;
    oss: string;
    contact: string;
    menu: string;
    close: string;
    pages: string;
    language: string;
    skip: string;
    theme: string;
    themeToDark: string;
    themeToLight: string;
    themeToDarkLabel: string;
    themeToLightLabel: string;
  };
  footer: {
    blurb: string;
    pages: string;
    legal: string;
    licenseLead: string;
    licenseName: string;
    colophon: string;
  };
  home: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lede: string;
    cta: string;
    nameTitle: string;
    nameLede: string;
    parts: IndexedCopy[];
    valueTitle: string;
    values: IndexedCopy[];
    moreOffers: string;
    moreTools: string;
    moreCode: string;
    closeTitle: string;
    closeText: string;
  };
  vision: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lede: string;
    beliefs: IndexedCopy[];
    quote: string;
    principlesTitle: string;
    principlesLede: string;
    principles: IndexedCopy[];
    close: string;
    closeCta: string;
  };
  services: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lede: string;
    from: string;
    excl: string;
    offers: Record<OfferId, { name: string; title: string; text: string }>;
    extrasTitle: string;
    diagnosticTitle: string;
    diagnosticText: string;
    dailyTitle: string;
    dailyText: string;
    supportTitle: string;
    supportText: string;
    perMonth: string;
    rateNote: string;
    processTitle: string;
    processLede: string;
    steps: IndexedCopy[];
    commitmentsTitle: string;
    commitmentsLede: string;
    commitments: IndexedCopy[];
    closeTitle: string;
    closeText: string;
    closeCta: string;
  };
  tools: {
    metaTitle: string;
    metaDescription: string;
    detailTitle: string;
    kicker: string;
    title: string;
    lede: string;
    status: { available: string; beta: string; soon: string };
    open: string;
    soonNote: string;
    pointsTitle: string;
    breadcrumb: string;
    back: string;
    end: string;
    endCta: string;
  };
  oss: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lede: string;
    updated: string;
    noDescription: string;
    noLanguage: string;
    fork: string;
    site: string;
    starsOne: string;
    starsMany: string;
    onGitHub: string;
    empty: string;
    end: string;
  };
  contact: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    lede: string;
    emailNote: string;
    jsNeeded: string;
    progress: string;
    requiredNote: string;
    optional: string;
    reviewIntro: string;
    consent: string;
    clear: string;
    actions: {
      next: string;
      back: string;
      submit: string;
      copy: string;
      copied: string;
      edit: string;
    };
    messages: {
      opened: string;
      tooLong: string;
      copyOk: string;
      copyFail: string;
      summary: string;
    };
    errors: {
      required: string;
      email: string;
      short: string;
      url: string;
      consent: string;
    };
    steps: StepCopy[];
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
    hints: {
      goal: string;
      situation: string;
      details: string;
      budget: string;
      website: string;
    };
    projectTypes: Record<string, string>;
    budgets: Record<string, string>;
    timelines: Record<string, string>;
    heard: Record<string, string>;
    constraints: Record<ConstraintId, string>;
    yes: string;
    no: string;
    empty: string;
    choose: string;
    mail: {
      subject: string;
      page: string;
      language: string;
      sections: {
        who: string;
        project: string;
        situation: string;
        frame: string;
        details: string;
      };
    };
  };
  legal: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    updated: string;
    sections: TextSection[];
  };
  privacy: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    updated: string;
    sections: TextSection[];
  };
  notFound: {
    metaTitle: string;
    kicker: string;
    title: string;
    text: string;
    home: string;
    services: string;
    contact: string;
  };
}
