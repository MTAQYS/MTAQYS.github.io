import type { Dictionary } from "./types";

const email = "contact@dynamogic.com";

export const en: Dictionary = {
  lang: "en",
  ogLocale: "en_US",
  ogAlt: "Dynamogic, a studio for AI, automation, and software engineering.",
  skip: "Skip to content",
  navAria: "Primary",
  langAria: "Language",
  menuOpen: "Menu",
  menuClose: "Close",
  themeLight: "Light",
  themeDark: "Dark",
  themeAriaToLight: "Dark theme. Switch to the light theme.",
  themeAriaToDark: "Light theme. Switch to the dark theme.",
  footerAria: "Footer",
  footerBlurb: "A studio for artificial intelligence, automation, and software engineering.",
  footerRights: "© 2026 Dynamogic",
  emailLabel: "Email",
  nav: [
    { page: "home", label: "Home" },
    { page: "services", label: "Expertise" },
    { page: "tools", label: "Tools" },
    { page: "contact", label: "Contact" },
  ],
  legalNav: [
    { page: "legal", label: "Legal notice" },
    { page: "privacy", label: "Privacy" },
  ],
  home: {
    metaTitle: "Dynamogic — A studio for AI, automation, and software engineering",
    metaDescription:
      "Dynamogic is a small studio. We design artificial-intelligence systems, automations, and software for teams that want a clear system they can own.",
    kicker: "Studio",
    title: "Three practices.\n*One* studio.",
    lede: "Artificial intelligence, automation, and software engineering. Dynamogic works with teams that want a clear system — built, handed over, and free of decoration.",
    primaryCta: "Write to us",
    secondaryCta: "See the work",
    markCaption: "Mark · eagle-owl",
    practices: [
      {
        index: "01",
        title: "Artificial intelligence",
        text: "A model, where it actually helps.",
      },
      {
        index: "02",
        title: "Automation",
        text: "Repeated handoffs, made visible.",
      },
      {
        index: "03",
        title: "Software engineering",
        text: "Code another person can own.",
      },
    ],
    whatTitle: "What we do",
    whatLede:
      "Three capabilities, held together. Not a catalogue, and not a promise to replace people.",
    what: [
      {
        index: "01",
        title: "Artificial intelligence",
        text: "Precise uses: reading and sorting documents, drafting something a person still approves, searching a team’s own material, assisting a task that is already defined. The model stays a component. Judgment stays with someone.",
      },
      {
        index: "02",
        title: "Automation",
        text: "The repeated handoffs between people and systems: intake, checks, transfer, notification, archive. A flow you can follow. When a step stops, someone knows, and the work can be finished by hand.",
      },
      {
        index: "03",
        title: "Software engineering",
        text: "Applications, interfaces, services, and internal tools. A readable structure, explicit boundaries, and a way to change the system after we leave. We write for the person who will own the code next.",
      },
    ],
    toolsLink: "Free utilities that run in the browser live on their own page.",
    howTitle: "How we work",
    howLede: "One counterpart. A short rhythm. Nothing we cannot explain.",
    how: [
      {
        index: "01",
        title: "Understand",
        text: "We start from the work as it is done. Who decides, where information gets lost, what must stay human, and what can become a system.",
      },
      {
        index: "02",
        title: "Build",
        text: "A first version small enough to judge. Then the hardening: access, recovery, edge cases, and what happens when it fails.",
      },
      {
        index: "03",
        title: "Hand over",
        text: "You leave with a readable system, written decisions, and the ability to change it without us. The line stays the same.",
      },
    ],
    nameTitle: "The name",
    nameLede: "Dynamogic joins three words. None of them is a slogan.",
    nameParts: [
      {
        word: "Dynamic",
        text: "What has to move with the work, rather than freeze it.",
      },
      {
        word: "Logic",
        text: "What has to stay checkable, by a person.",
      },
      {
        word: "Magic",
        text: "The moment the system steps back and the work moves. Not an effect. A result of precision.",
      },
    ],
    ctaTitle: "Put the work on the table.",
    ctaText:
      "Describe the context, the constraint, and what would count as a result. One channel.",
    ctaButton: email,
  },
  services: {
    metaTitle: "Expertise — Dynamogic",
    metaDescription:
      "Artificial intelligence, automation, and software engineering. What Dynamogic takes on, how a piece of work runs, and what we do not promise.",
    kicker: "Expertise",
    title: "The work,\n*not* the decoration.",
    lede: "We step in where a system has to hold over time. The scope is written before anything is built. What follows describes capabilities, not a list of tools.",
    indexLabel: "On this page",
    blocks: [
      {
        id: "ai",
        index: "01",
        title: "Artificial intelligence",
        paragraphs: [
          "A model helps when the task is bounded: a lot of text to sort, a first draft to review, search across material you already own, assistance inside a procedure that is already described.",
          "We start with the boundary. What the system may propose. What a person must decide. What is kept, and what is not. If a rule, a form, or a query is enough, we do not put a model on top of it.",
        ],
        points: [
          "Reading, sorting, and search across your own material",
          "Drafts and assistants, with a person still approving",
          "Fitting into a tool or a flow that already exists",
          "A written frame: inputs, outputs, and what stays manual",
        ],
      },
      {
        id: "automation",
        index: "02",
        title: "Automation",
        paragraphs: [
          "Useful automation is the kind you can narrate. A file arrives, a check runs, a person is told, a trace remains. The gain is not another dashboard. It is time taken back from retyping, without hiding the work.",
          "We also design the failure. When a step stops, the work does not vanish into a silent script: someone sees it, and can finish it by hand.",
        ],
        points: [
          "Intake, checks, transfer, notification, archive",
          "Flows you can read, rather than a chain of opaque scripts",
          "Recovery planned, not discovered in production",
          "Less copy-paste, without removing judgment",
        ],
      },
      {
        id: "software",
        index: "03",
        title: "Software engineering",
        paragraphs: [
          "Applications, interfaces, services, internal tools. The test is not how new the stack is. It is whether a person who was not there at the start can understand the system, run it, and change it without being afraid of it.",
          "We keep the scope narrow, the names plain, and the dependencies we can justify. Tests sit where a regression would be expensive, not where they would decorate the repository.",
        ],
        points: [
          "Interfaces and applications people actually use",
          "Services and the exchanges between systems",
          "Internal tools, once a spreadsheet has reached its limit",
          "Handover notes: how to run it, where to look, what not to break",
        ],
      },
    ],
    frameTitle: "How a piece of work is framed",
    frameLede: "The sequence stays simple. It scales to the subject, not to a method we need to display.",
    frame: [
      {
        index: "01",
        title: "Writing, before building",
        text: "The problem, the boundaries, what will not be done, and how we will know the first version is right.",
      },
      {
        index: "02",
        title: "A version you can judge",
        text: "Small enough to look at for real. Only then: access, recovery, edge cases.",
      },
      {
        index: "03",
        title: "A handover",
        text: "The system, the decisions, and how to keep it alive without us. One contact after that.",
      },
    ],
    limitsTitle: "What we do not do",
    limits: [
      "We do not publish client names, and we do not borrow any.",
      "We do not sell a fixed catalogue.",
      "We do not promise that a model replaces judgment.",
      "We do not put a number on a result we have not measured.",
    ],
    ctaTitle: "A specific subject is better than a list.",
    ctaText: "Write what is stuck, what is already in place, and the real deadline. We answer in the same place.",
    ctaButton: email,
  },
  tools: {
    metaTitle: "Tools — Dynamogic",
    metaDescription:
      "Three free tools that run in the browser. A file and data converter, a wheel of names, and a QR code generator. Nothing is uploaded.",
    kicker: "Tools",
    title: "Three tools.\n*Nothing* leaves the browser.",
    lede: "Free utilities, each on its own page. Files, lists, and codes stay on your machine. Dynamogic does not receive them.",
    note: "These pages are separate from the studio site. They are built so nothing is uploaded.",
    items: [
      {
        name: "Convert",
        href: "/Convert/",
        index: "01",
        summary: "File and data converter.",
        detail: "Common transformations run in the page. Nothing is sent.",
        action: "Open Convert",
      },
      {
        name: "Wheel",
        href: "/Wheel/",
        index: "02",
        summary: "A wheel of names.",
        detail: "Paste a list, run the draw, read the result. The draw stays on this device.",
        action: "Open Wheel",
      },
      {
        name: "QR",
        href: "/Qr/",
        index: "03",
        summary: "QR code generator.",
        detail: "Compose a code and download it. No account, no upload.",
        action: "Open QR",
      },
    ],
  },
  contact: {
    metaTitle: "Contact — Dynamogic",
    metaDescription:
      "Write to Dynamogic at contact@dynamogic.com. The form opens your mail app. No message is sent by the site.",
    kicker: "Contact",
    title: "*One* channel.",
    lede: "Describe the context, what is stuck, and what would count as a result. We read what arrives at this address, and nowhere else on this site.",
    direct: "Write directly",
    formTitle: "Draft a message",
    formNote:
      "The button opens your mail app with the text below. This site has no form server, and it stores nothing.",
    name: "Name",
    email: "Your email",
    subject: "Subject",
    message: "Message",
    optional: "optional",
    required: "required",
    submit: "Open in your mail app",
    points: [
      "No form is posted to a server.",
      "No mailing list sits behind the button.",
      "If your mail app does not open, write by hand to the address beside this form.",
    ],
  },
  legal: {
    metaTitle: "Legal notice — Dynamogic",
    metaDescription:
      "Legal notice for the Dynamogic site. A generic frame: the publisher is named Dynamogic, and legal identifiers are not invented.",
    kicker: "Legal notice",
    title: "Legal notice",
    lede: "This notice describes the site published under the name Dynamogic. It stays general until the publisher’s legal identity is written here.",
    updated: "Last updated: 25 October 2026.",
    sections: [
      {
        id: "publisher",
        heading: "Publisher",
        paragraphs: [
          "The site is published under the name Dynamogic.",
          "Contact: contact@dynamogic.com",
        ],
      },
      {
        id: "to-complete",
        heading: "To be completed",
        placeholder: true,
        paragraphs: [
          "Details that would identify a person or a registered entity are not on this page, and they are not invented.",
          "When they are settled, they will be added in this section: legal form, registered office, registration number, share capital, VAT number, and the publication director.",
        ],
      },
      {
        id: "hosting",
        heading: "Hosting",
        paragraphs: [
          "The site is a set of static pages.",
          "While it is served from GitHub Pages, hosting is provided by GitHub, Inc. If publication later moves to Cloudflare Pages, the host name will be updated here.",
          "The host’s street address and telephone number are not copied here. They will be added in this section if a complete notice requires them.",
        ],
      },
      {
        id: "contents",
        heading: "Site contents",
        paragraphs: [
          "The text and graphic elements on this site are published by Dynamogic.",
          "To ask about reuse, write to contact@dynamogic.com.",
        ],
      },
      {
        id: "liability",
        heading: "Liability",
        paragraphs: [
          "What is published here describes the studio’s work. It is not a promise of a result for work that has not been agreed.",
        ],
      },
    ],
  },
  privacy: {
    metaTitle: "Privacy — Dynamogic",
    metaDescription:
      "The Dynamogic site does not create accounts, does not set cookies, and does not post the contact form to a server. Writing is done at contact@dynamogic.com.",
    kicker: "Privacy",
    title: "Privacy",
    lede: "This page describes what the site does, and does not do, with information that passes through it. It names only Dynamogic.",
    updated: "Last updated: 25 October 2026.",
    sections: [
      {
        id: "publisher",
        heading: "Who publishes",
        paragraphs: [
          "The site is published under the name Dynamogic.",
          "For a question about this page, or about a message you sent us: contact@dynamogic.com",
        ],
      },
      {
        id: "to-complete-controller",
        heading: "To be completed — controller",
        placeholder: true,
        paragraphs: [
          "If the controller must be named with a legal form, a registered office, or a registration number, those details will be added in this section.",
          "They are not invented here.",
        ],
      },
      {
        id: "not-collected",
        heading: "What the site does not do",
        paragraphs: [
          "No account. No newsletter. No cookie set by this site. No analytics added by us.",
          "The contact button opens the writer’s mail app. The message is not sent to a server of this site.",
        ],
      },
      {
        id: "mail",
        heading: "When you write",
        paragraphs: [
          "If you send a message to contact@dynamogic.com, we use it to reply.",
          "Correspondence is kept for the life of the exchange, then deleted. We do not sell these messages. We do not use them to train a model.",
        ],
      },
      {
        id: "linked-pages",
        heading: "Linked pages",
        paragraphs: [
          "Some linked pages offer utilities that run in your browser. They are built not to upload your files, lists, or codes to Dynamogic.",
          "Each page describes its own behavior.",
        ],
      },
      {
        id: "logs",
        heading: "Host logs",
        paragraphs: [
          "The host of the static pages may keep ordinary connection logs, such as IP address, user agent, and the page requested, in order to run the network.",
          "Dynamogic does not add a tracker on top of that.",
        ],
      },
      {
        id: "to-complete-logs",
        heading: "To be completed — log retention",
        placeholder: true,
        paragraphs: [
          "How long those logs are kept depends on the host in use: GitHub Pages today, Cloudflare Pages if the site is later published there.",
          "The period will be written in this section from the production host’s documentation. It is not estimated here.",
        ],
      },
      {
        id: "cookies",
        heading: "Cookies",
        paragraphs: ["This site does not set a cookie."],
      },
      {
        id: "rights",
        heading: "Your rights",
        paragraphs: [
          "You can ask for access, correction, or deletion of correspondence by writing to contact@dynamogic.com.",
          "In France, you can also contact the CNIL: cnil.fr.",
        ],
      },
    ],
  },
};
