import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dist = path.join(root, "dist");
const errors = [];

function fail(message) {
  errors.push(message);
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const toolNames = [/\bConvert\b/, /\bWheel\b/, /\bCompress\b/, /\bInvoice\b/, /\bPassword\b/, /\bQR\b/, /\bQr\b/];
const thirdParties = [
  /OpenAI/i,
  /ChatGPT/i,
  /Claude/i,
  /Anthropic/i,
  /Gemini/i,
  /Zapier/i,
  /\bn8n\b/i,
  /LangChain/i,
  /Mistral/i,
  /Midjourney/i,
  /Hugging\s?Face/i,
  /Make\.com/i,
];
const trackers = [/fonts\.googleapis/, /googletagmanager/, /google-analytics/, /gtag\(/, /plausible/, /api\.github\.com/];

function flattenMoney(html) {
  return html.replace(/[\s\u00a0\u202f,]|(&nbsp;)/g, "");
}

function linkTags(html) {
  return [...html.matchAll(/<link\b[^>]*>/gi)].map((match) => {
    const tag = match[0];
    return {
      rel: /rel="([^"]*)"/.exec(tag)?.[1] ?? "",
      href: /href="([^"]*)"/.exec(tag)?.[1] ?? "",
      hreflang: /hreflang="([^"]*)"/.exec(tag)?.[1] ?? "",
    };
  });
}

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const protectedPaths = [
  "index.html",
  "vision/index.html",
  "services/index.html",
  "contact/index.html",
  "mentions-legales/index.html",
  "confidentialite/index.html",
  "en/index.html",
  "en/vision/index.html",
  "en/services/index.html",
  "en/contact/index.html",
  "en/legal/index.html",
  "en/privacy/index.html",
  "404.html",
];

for (const file of files) {
  if (!/\.(html|js|css|txt|xml)$/.test(file)) continue;
  const text = await readFile(file, "utf8");
  for (const pattern of trackers) {
    if (pattern.test(text)) fail(`${path.relative(dist, file)} contains ${pattern}`);
  }
  if (/<script[^>]+src="https?:/i.test(text)) fail(`${path.relative(dist, file)} loads an external script`);
}

for (const relative of protectedPaths) {
  const full = path.join(dist, relative);
  const html = await readFile(full, "utf8").catch(() => null);
  if (!html) {
    fail(`missing ${relative}`);
    continue;
  }
  const visible = html.replace(/<script[\s\S]*?<\/script>/gi, "");
  for (const pattern of toolNames) {
    if (pattern.test(visible)) fail(`${relative} names a tool (${pattern})`);
  }
  for (const pattern of thirdParties) {
    if (pattern.test(visible)) fail(`${relative} names a third-party tool (${pattern})`);
  }
}

for (const file of htmlFiles) {
  const relative = path.relative(dist, file);
  const html = await readFile(file, "utf8");
  const isTool = relative.startsWith("outils/") || relative.startsWith("en/tools/") || relative.startsWith("en\\tools\\");
  const isOss = relative.startsWith("open-source/") || relative.startsWith("en/open-source/");
  if (isTool) {
    for (const pattern of thirdParties) {
      if (pattern.test(html)) fail(`${relative} names a third-party tool (${pattern})`);
    }
  }
  if (relative === "404.html") {
    if (!html.includes("noindex")) fail("404 is indexable");
    if (!html.includes('data-nf-lang="fr"') || !html.includes('data-nf-lang="en"')) fail("404 is not bilingual");
    continue;
  }
  if (!html.includes("<main")) fail(`${relative} has no main`);
  if (!html.includes('href="#content"')) fail(`${relative} has no skip link`);
  const links = linkTags(html);
  const canonical = links.find((link) => link.rel.includes("canonical"));
  const fr = links.find((link) => link.hreflang === "fr");
  const en = links.find((link) => link.hreflang === "en");
  const fallback = links.find((link) => link.hreflang === "x-default");
  if (!canonical?.href.startsWith("https://mtaqys.github.io")) fail(`${relative} canonical`);
  if (!fr?.href || !en?.href || !fallback?.href) fail(`${relative} hreflang set`);
  if (fallback && fr && fallback.href !== fr.href) fail(`${relative} x-default should be French`);
  if (!html.includes('property="og:image"')) fail(`${relative} og:image`);
  if (!html.includes('name="description"')) fail(`${relative} description`);
  if (isOss || isTool) continue;
}

for (const relative of ["services/index.html", "en/services/index.html"]) {
  const flat = flattenMoney(await readFile(path.join(dist, relative), "utf8"));
  for (const amount of ["900", "1200", "3500", "6000", "450", "150", "9900", "13200", "38500", "66000", "4950", "1650"]) {
    if (!flat.includes(amount)) fail(`${relative} missing amount ${amount}`);
  }
  if (!flat.includes("MAD")) fail(`${relative} missing MAD`);
}

const contact = await readFile(path.join(dist, "contact/index.html"), "utf8");
if (!contact.includes("contact@dynamogic.com")) fail("contact page missing email");
if (!contact.includes("mailto:contact@dynamogic.com")) fail("contact page missing mailto");

const catalog = await readFile(path.join(dist, "outils/index.html"), "utf8");
for (const name of ["Convert", "Wheel", "QR", "Compress", "Invoice", "Password"]) {
  if (!catalog.includes(name)) fail(`tools catalog missing ${name}`);
}

const convert = await readFile(path.join(dist, "outils/convert/index.html"), "utf8");
if (!convert.includes("https://mtaqys.github.io/Convert/")) fail("Convert detail missing live URL");
const compress = await readFile(path.join(dist, "outils/compress/index.html"), "utf8");
if (compress.includes("https://mtaqys.github.io/Compress/")) fail("Compress should not link a live URL yet");

const repos = JSON.parse(await readFile(path.join(root, "src/generated/repos.json"), "utf8"));
const oss = await readFile(path.join(dist, "open-source/index.html"), "utf8");
for (const repo of repos.repos) {
  if (!oss.includes(repo.name)) fail(`open-source page missing ${repo.name}`);
}
if (oss.includes("api.github.com")) fail("open-source page calls the API at runtime");

const sitemapFiles = files.filter((file) => file.endsWith(".xml") && path.basename(file).startsWith("sitemap"));
if (sitemapFiles.length === 0) fail("sitemap missing");
const sitemap = (await Promise.all(sitemapFiles.map((file) => readFile(file, "utf8")))).join("\n");
if (!sitemap.includes('hreflang="fr"') || !sitemap.includes('hreflang="en"') || !sitemap.includes('hreflang="x-default"')) {
  fail("sitemap missing hreflang alternates");
}

const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
if (!robots.includes("Sitemap:")) fail("robots.txt missing sitemap");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Site check passed (${htmlFiles.length} HTML files).`);
