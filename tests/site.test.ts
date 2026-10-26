import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { joinBase, matchAlternate, routeTable } from "../src/lib/alternates.mjs";
import { tools } from "../src/data/tools.ts";
import { projectTypeIds, budgetIds, constraintIds, stepIds, normalizeAnswers } from "../src/lib/brief/model.ts";
import { validateAnswers } from "../src/lib/brief/validate.ts";
import { composeBrief } from "../src/lib/brief/compose.ts";
import { deliverBrief, MAILTO_SAFE_LIMIT } from "../src/lib/brief/deliver.ts";
import { briefLabels, dictionary } from "../src/i18n/index.ts";
import { offers, dailyRateEur, supportMonthlyEur } from "../src/data/offers.ts";
import { EUR_TO_MAD, formatMoney } from "../src/lib/pricing.ts";
import { selectRepos } from "../scripts/lib/filter-repos.mjs";

test("every French route has an English twin", () => {
  for (const pair of Object.values(routeTable)) {
    assert.equal(matchAlternate(pair.fr)?.en, pair.en);
    assert.equal(matchAlternate(pair.en)?.fr, pair.fr);
  }
  for (const tool of tools) {
    const pair = matchAlternate(`/outils/${tool.slug}/`);
    assert.equal(pair?.en, `/en/tools/${tool.slug}/`);
    assert.equal(matchAlternate(`/en/tools/${tool.slug}/`)?.fr, `/outils/${tool.slug}/`);
  }
});

test("base paths join and strip", () => {
  assert.equal(joinBase("/", "/vision/"), "/vision/");
  assert.equal(joinBase("/repo/", "/en/"), "/repo/en/");
  assert.equal(matchAlternate("/repo/vision/", "/repo/")?.en, "/en/vision/");
});

test("tool catalog is unique and complete", () => {
  const slugs = tools.map((tool) => tool.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.deepEqual(
    tools.filter((tool) => tool.status === "available").map((tool) => tool.slug),
    ["convert", "wheel", "qr"],
  );
  for (const tool of tools) {
    assert.ok(tool.fr.summary.length > 40);
    assert.ok(tool.en.summary.length > 40);
    assert.equal(Boolean(tool.url), tool.status === "available");
  }
});

test("prices match the brief", () => {
  assert.equal(EUR_TO_MAD, 11);
  assert.equal(dailyRateEur, 450);
  assert.equal(supportMonthlyEur, 150);
  assert.deepEqual(
    offers.map((offer) => [offer.id, offer.fromEur]),
    [
      ["intelligence", 3500],
      ["flux", 1200],
      ["fondations", 900],
      ["surmesure", 6000],
    ],
  );
  assert.match(formatMoney("fr", 3500, "EUR").replace(/[\s\u00a0\u202f]/g, ""), /3500/);
  assert.match(formatMoney("fr", 3500 * EUR_TO_MAD, "MAD").replace(/[\s\u00a0\u202f]/g, ""), /38500/);
});

test("locales share shape and do not name tools", () => {
  assert.deepEqual(dictionary.fr.contact.steps.map((step) => step.id), [...stepIds]);
  assert.deepEqual(dictionary.en.contact.steps.map((step) => step.id), [...stepIds]);
  for (const id of projectTypeIds) {
    assert.ok(dictionary.fr.contact.projectTypes[id]);
    assert.ok(dictionary.en.contact.projectTypes[id]);
  }
  for (const id of budgetIds) {
    assert.ok(dictionary.fr.contact.budgets[id]);
    assert.ok(dictionary.en.contact.budgets[id]);
  }
  for (const id of constraintIds) {
    assert.ok(dictionary.fr.contact.constraints[id]);
    assert.ok(dictionary.en.contact.constraints[id]);
  }
  const blob = JSON.stringify(dictionary);
  for (const name of ["Convert", "Wheel", "Compress", "Invoice", "Password", "OpenAI", "ChatGPT", "Zapier", "n8n"]) {
    assert.equal(blob.includes(name), false, name);
  }
});

test("French copy keeps a space before colons", async () => {
  const source = await readFile(new URL("../src/i18n/fr.ts", import.meta.url), "utf8");
  assert.equal(source.includes(" : "), false);
});

function sampleBrief() {
  return normalizeAnswers({
    name: "Amina Benali",
    email: "amina@example.com",
    role: "Opérations",
    company: "Atelier Nord",
    website: "atelier.example",
    projectType: "flux",
    goal: "Retirer la ressaisie des commandes entre deux équipes.",
    success: "Les commandes passent sans tableau parallèle.",
    situation: "Aujourd’hui deux personnes recopient les commandes chaque matin.",
    blockers: "Les erreurs se voient trop tard.",
    users: "L’équipe opérationnelle",
    constraints: ["personal-data"],
    constraintNote: "",
    budget: "flux",
    timeline: "quarter",
    dueDate: "2026-12-01",
    heard: "referral",
    heardDetail: "",
    hasSpec: "no",
    details: "Le volume est d’environ quarante commandes par jour, avec des exceptions le vendredi.",
    links: "",
    outOfScope: "Pas de refonte du site public.",
    consent: true,
  });
}

test("a normal brief fits in a mailto link and keeps every answer", () => {
  const answers = sampleBrief();
  const packet = composeBrief(answers, briefLabels("fr"), "fr", "https://mtaqys.github.io/contact/");
  const delivery = deliverBrief(packet);
  assert.equal(delivery.ok, true);
  if (delivery.ok) assert.ok(delivery.href.length < MAILTO_SAFE_LIMIT);
  assert.match(packet.subject, /Amina Benali/);
  assert.match(packet.body, /Atelier Nord/);
  assert.match(packet.body, /https:\/\/atelier\.example/);
  assert.match(packet.body, /quarante commandes/);
  assert.match(packet.plain, /contact@dynamogic\.com/);
});

test("an oversized brief does not emit a mailto link", () => {
  const answers = sampleBrief();
  answers.details = "détail ".repeat(400);
  const packet = composeBrief(answers, briefLabels("fr"), "fr", "https://mtaqys.github.io/contact/");
  const delivery = deliverBrief(packet);
  assert.equal(delivery.ok, false);
});

test("validation catches the required gaps", () => {
  const answers = sampleBrief();
  assert.equal(validateAnswers(answers, "all").ok, true);
  answers.email = "not-an-email";
  assert.equal(validateAnswers(answers, "identity").fieldErrors.email, "email");
  answers.email = "amina@example.com";
  answers.goal = "court";
  assert.equal(validateAnswers(answers, "project").fieldErrors.goal, "short");
  answers.website = "javascript:alert(1)";
  assert.equal(validateAnswers(normalizeAnswers(answers), "identity").fieldErrors.website, "url");
  answers.consent = false;
  assert.equal(validateAnswers(answers, "review").fieldErrors.consent, "consent");
});

test("repository filter drops private, archived, and excluded repos", () => {
  const selected = selectRepos(
    [
      { name: "Keep", private: false, archived: false, visibility: "public", html_url: "https://github.com/MTAQYS/Keep", homepage: "", language: "TypeScript", stargazers_count: 2, pushed_at: "2026-01-02T00:00:00Z", fork: false, topics: [], description: "Visible" },
      { name: "Old", private: false, archived: true, visibility: "public", html_url: "https://github.com/MTAQYS/Old", homepage: null, language: null, stargazers_count: 0, pushed_at: "2026-02-02T00:00:00Z", fork: false, topics: [], description: null },
      { name: "Secret", private: true, archived: false, visibility: "private", html_url: "https://github.com/MTAQYS/Secret", homepage: null, language: null, stargazers_count: 0, pushed_at: "2026-03-02T00:00:00Z", fork: false, topics: [], description: null },
      { name: "SkipMe", private: false, archived: false, visibility: "public", html_url: "https://github.com/MTAQYS/SkipMe", homepage: null, language: null, stargazers_count: 1, pushed_at: "2026-04-02T00:00:00Z", fork: false, topics: [], description: null },
    ],
    { exclude: ["skipme"] },
  );
  assert.deepEqual(selected.map((repo) => repo.name), ["Keep"]);
});

test("text colors clear WCAG AA", async () => {
  const css = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");
  const pairs: [string, string, string][] = [
    ["#1c1915", "#f3f0e8", "ink on paper"],
    ["#3f3a33", "#f3f0e8", "soft on paper"],
    ["#5c564c", "#f3f0e8", "muted on paper"],
    ["#8d3d27", "#f3f0e8", "accent on paper"],
    ["#8e1e1e", "#f3f0e8", "danger on paper"],
    ["#f3f0e8", "#141311", "ink on dark"],
    ["#ddd6c8", "#141311", "soft on dark"],
    ["#c2baad", "#141311", "muted on dark"],
    ["#e7b49a", "#141311", "accent on dark"],
    ["#ffb4ab", "#141311", "danger on dark"],
  ];
  const lin = (channel: number) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  const lum = (hex: string) => {
    const n = Number.parseInt(hex.slice(1), 16);
    return 0.2126 * lin(n >> 16) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  };
  const contrast = (a: string, b: string) => {
    const [hi, lo] = [lum(a), lum(b)].sort((left, right) => right - left);
    return (hi + 0.05) / (lo + 0.05);
  };
  for (const [fg, bg, label] of pairs) {
    assert.ok(css.includes(fg), fg);
    assert.ok(css.includes(bg), bg);
    assert.ok(contrast(fg, bg) >= 4.5, `${label} ${contrast(fg, bg)}`);
  }
});
