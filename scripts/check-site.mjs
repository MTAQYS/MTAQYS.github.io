import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
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

function rel(file) {
  return path.relative(dist, file).split(path.sep).join("/");
}

const TOOL_PAGES = new Set(["outils/index.html", "en/tools/index.html"]);
const TOOL_NAME = /\bConvert\b|\bWheel\b|\bQR\b|\/Convert\/|\/Wheel\/|\/Qr\//;
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
const BANNED_IDENTITY = /Mohamed|Taqy|Salmi|\bSIRET\b|\bSIREN\b|\bRCS\b|MTAQYS/;
const ALLOWED_EXTERNAL_PREFIXES = ["/Convert/", "/Wheel/", "/Qr/"];

function isToolPage(file) {
  return TOOL_PAGES.has(rel(file));
}

function expectedOg(name) {
  const own = {
    "index.html": "/og/fr-home.png",
    "en/index.html": "/og/en-home.png",
    "services/index.html": "/og/fr-services.png",
    "en/services/index.html": "/og/en-services.png",
    "outils/index.html": "/og/fr-tools.png",
    "en/tools/index.html": "/og/en-tools.png",
    "contact/index.html": "/og/fr-contact.png",
    "en/contact/index.html": "/og/en-contact.png",
  };
  if (own[name]) return own[name];
  if (/mentions-legales|confidentialite|en\/legal|en\/privacy/.test(name)) return "/og-default-dark.png";
  return null;
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
}

async function exists(file) {
  try {
    const info = await stat(file);
    return info.isFile();
  } catch {
    return false;
  }
}

function localPath(urlValue) {
  if (!urlValue) return null;
  if (urlValue.startsWith("mailto:") || urlValue.startsWith("tel:") || urlValue.startsWith("data:")) {
    return null;
  }
  let pathname = urlValue;
  try {
    if (/^https?:\/\//i.test(urlValue)) {
      const url = new URL(urlValue);
      if (!["mtaqys.github.io", "dynamogic.com", "www.dynamogic.com"].includes(url.hostname)) {
        return { external: url.href };
      }
      pathname = url.pathname;
    }
  } catch {
    fail(`Unparseable URL: ${urlValue}`);
    return null;
  }
  if (!pathname.startsWith("/")) return null;
  const hashIndex = pathname.indexOf("#");
  const hash = hashIndex >= 0 ? pathname.slice(hashIndex + 1) : "";
  const clean = pathname.split("#")[0].split("?")[0];
  if (ALLOWED_EXTERNAL_PREFIXES.some((prefix) => clean === prefix || clean === prefix.slice(0, -1))) {
    return { sibling: clean };
  }
  let file;
  if (clean === "/") file = "index.html";
  else if (clean.endsWith("/")) file = `${clean.slice(1)}index.html`;
  else file = clean.slice(1);
  return { file, hash, raw: clean };
}

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith(".html"));

if (htmlFiles.length < 13) {
  fail(`Expected at least 13 HTML files, found ${htmlFiles.length}`);
}

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const name = rel(file);
  const text = stripTags(html);
  const is404 = name === "404.html";

  if (!html.includes("<html")) fail(`${name}: missing html`);
  if (is404) {
    if (!html.includes('lang="fr"')) fail("404.html must default to French");
    if (!html.includes('content="noindex"')) fail("404.html must be noindex");
  } else {
    const lang = name.startsWith("en/") ? "en" : "fr";
    if (!html.includes(`<html lang="${lang}">`)) fail(`${name}: expected lang ${lang}`);
    for (const token of ['hreflang="fr"', 'hreflang="en"', 'hreflang="x-default"', 'rel="canonical"', "og:image"]) {
      if (!html.includes(token)) fail(`${name}: missing ${token}`);
    }
    const og = expectedOg(name);
    if (!og) fail(`${name}: no expected Open Graph image`);
    if (!html.includes(og)) fail(`${name}: missing ${og}`);
    if ((html.match(/<h1[\s>]/g) || []).length !== 1) fail(`${name}: expected exactly one h1`);
    if (!html.includes('href="#contenu"')) fail(`${name}: missing skip link`);
  }

  if (!isToolPage(file) && TOOL_NAME.test(text)) {
    fail(`${name}: names a specific tool outside the tools pages`);
  }

  const emails = text.match(EMAIL) || [];
  for (const email of emails) {
    if (email.toLowerCase() !== "contact@dynamogic.com") {
      fail(`${name}: unexpected email ${email}`);
    }
  }
  const mailtos = html.match(/mailto:[^"'?\s]*/g) || [];
  for (const mailto of mailtos) {
    if (!mailto.startsWith("mailto:contact@dynamogic.com")) {
      fail(`${name}: unexpected mailto ${mailto}`);
    }
  }

  if (BANNED_IDENTITY.test(html)) {
    fail(`${name}: contains a personal name, registration token, or org credit that must stay off the site`);
  }

  if (/<style[\s>]/i.test(html)) fail(`${name}: inline style would break the CSP`);
  if (!html.includes('src="/theme.js"')) fail(`${name}: missing theme.js`);
  if (!html.includes("/brand/lockup-horizontal-dark.svg") || !html.includes("/brand/lockup-horizontal-light.svg")) {
    fail(`${name}: header must use the fixed dark and light lockups`);
  }
  if (!html.includes('href="/favicon.svg"') || !html.includes('href="/favicon.ico"') || !html.includes('href="/apple-touch-icon-180.png"')) {
    fail(`${name}: missing the final favicon set`);
  }
  const scripts = html.match(/<script\b[^>]*>/gi) || [];
  for (const script of scripts) {
    const jsonLd = /type="application\/ld\+json"/i.test(script);
    const theme = /\ssrc="\/theme\.js"/i.test(script);
    if (!jsonLd && !theme) {
      fail(`${name}: unexpected script tag ${script}`);
    }
  }

  const actions = html.match(/<form\b[^>]*>/gi) || [];
  for (const action of actions) {
    if (!/action="mailto:contact@dynamogic.com\?subject=Dynamogic"/.test(action)) {
      fail(`${name}: form is not a static mailto`);
    }
  }

  const hrefs = [...html.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1]);
  for (const value of hrefs) {
    if (!value.startsWith("#")) continue;
    const id = value.slice(1);
    if (id && !html.includes(`id="${id}"`)) fail(`${name}: missing anchor #${id}`);
  }

  const assets = [...html.matchAll(/\s(?:src|content)="([^"]+)"/g)].map((match) => match[1]);
  for (const value of [...hrefs, ...assets]) {
    if (value.startsWith("#") || value.startsWith("og:") || value === "website" || value === "summary_large_image") continue;
    if (!value.includes("/") && !value.startsWith("mailto:")) continue;
    const resolved = localPath(value);
    if (!resolved || resolved.external || resolved.sibling) continue;
    const fileName = resolved.file;
    const checkable =
      fileName.endsWith(".png") ||
      fileName.endsWith(".svg") ||
      fileName.endsWith(".ico") ||
      fileName.endsWith(".css") ||
      fileName.endsWith(".js") ||
      fileName.endsWith(".woff2") ||
      fileName.endsWith(".webmanifest") ||
      fileName.endsWith(".xml") ||
      fileName.endsWith(".txt") ||
      fileName.endsWith(".html") ||
      fileName.endsWith("/index.html") ||
      fileName === "index.html";
    if (checkable && !(await exists(path.join(dist, fileName)))) {
      fail(`${name}: broken link ${value} -> ${fileName}`);
    }
  }

  if (isToolPage(file)) {
    for (const prefix of ALLOWED_EXTERNAL_PREFIXES) {
      if (!html.includes(`href="${prefix}"`)) fail(`${name}: missing tool link ${prefix}`);
    }
  }
}

const headers = await readFile(path.join(dist, "_headers"), "utf8");
for (const token of ["Content-Security-Policy", "form-action 'self' mailto:", "X-Content-Type-Options", "frame-ancestors 'none'"]) {
  if (!headers.includes(token)) fail(`_headers missing ${token}`);
}

const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
if (!/Allow:\s*\//.test(robots) || !robots.includes("Sitemap:")) {
  fail("robots.txt must allow indexing and advertise the sitemap");
}

const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
for (const loc of [
  "/</loc>",
  "/en/</loc>",
  "/services/</loc>",
  "/en/services/</loc>",
  "/outils/</loc>",
  "/en/tools/</loc>",
  "/contact/</loc>",
  "/en/contact/</loc>",
  "/mentions-legales/</loc>",
  "/en/legal/</loc>",
  "/confidentialite/</loc>",
  "/en/privacy/</loc>",
  'hreflang="x-default"',
]) {
  if (!sitemap.includes(loc)) fail(`sitemap missing ${loc}`);
}
if (sitemap.includes("404")) fail("sitemap must not list the 404 page");

const legalPages = htmlFiles.filter((file) =>
  /mentions-legales|confidentialite|en\/legal|en\/privacy/.test(rel(file)),
);
for (const file of legalPages) {
  const html = await readFile(file, "utf8");
  if (!html.includes("LEGAL-PLACEHOLDER")) {
    fail(`${rel(file)}: missing LEGAL-PLACEHOLDER marker`);
  }
}

const manifest = await readFile(path.join(dist, "site.webmanifest"), "utf8");
for (const token of ["/app-icon.svg", "/app-icon-192.png", "/app-icon-512.png", "#0E0F11"]) {
  if (!manifest.includes(token)) fail(`site.webmanifest missing ${token}`);
}
if (manifest.includes('"/icon-192.png"') || manifest.includes("#FAFAF8")) {
  fail("site.webmanifest still points at the interim icons");
}

for (const asset of [
  "favicon.svg",
  "favicon.ico",
  "apple-touch-icon-180.png",
  "app-icon.svg",
  "app-icon-192.png",
  "app-icon-512.png",
  "og-default-dark.png",
  "theme.js",
  "brand/lockup-horizontal.svg",
  "brand/lockup-horizontal-dark.svg",
  "brand/lockup-horizontal-light.svg",
  "brand/mark.svg",
  "brand/mark-dark.svg",
  "brand/mark-light.svg",
  "og/fr-home.png",
  "og/en-home.png",
  "og/fr-services.png",
  "og/en-services.png",
  "og/fr-tools.png",
  "og/en-tools.png",
  "og/fr-contact.png",
  "og/en-contact.png",
]) {
  if (!(await exists(path.join(dist, asset)))) fail(`missing public asset ${asset}`);
}

try {
  await stat(path.join(dist, "CNAME"));
  fail("dist/CNAME must not exist yet");
} catch {
  // expected
}
try {
  await stat(path.join(root, "CNAME"));
  fail("A CNAME file must not be committed yet");
} catch {
  // expected
}

if (errors.length) {
  console.error(`Site check failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Site check passed (${htmlFiles.length} HTML files).`);
