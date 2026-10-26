import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const templatePath = path.join(root, "brand/final-C/og-template-dark.html");
const outDir = path.join(root, "public/og");
const chrome = process.env.CHROME_PATH || "/usr/bin/google-chrome";

/** Share cards for the pages that carry their own message. Legal pages use og-default-dark.png. */
const cards = [
  {
    file: "fr-home.png",
    kicker: "Studio",
    title: "Trois métiers. Un seul studio.",
    subtitle: "Intelligence artificielle, automatisation et ingénierie logicielle.",
  },
  {
    file: "en-home.png",
    kicker: "Studio",
    title: "Three practices. One studio.",
    subtitle: "Artificial intelligence, automation, and software engineering.",
  },
  {
    file: "fr-services.png",
    kicker: "Expertise",
    title: "Le métier, pas le décor.",
    subtitle: "Nous intervenons là où un système doit tenir dans le temps.",
  },
  {
    file: "en-services.png",
    kicker: "Expertise",
    title: "The work, not the decoration.",
    subtitle: "We step in where a system has to hold over time.",
  },
  {
    file: "fr-tools.png",
    kicker: "Outils",
    title: "Trois outils. Rien ne quitte le navigateur.",
    subtitle: "Des utilitaires gratuits. Rien n’est envoyé.",
  },
  {
    file: "en-tools.png",
    kicker: "Tools",
    title: "Three tools. Nothing leaves the browser.",
    subtitle: "Free utilities. Nothing is uploaded.",
  },
  {
    file: "fr-contact.png",
    kicker: "Contact",
    title: "Un seul canal.",
    subtitle: "Écrivez à contact@dynamogic.com.",
  },
  {
    file: "en-contact.png",
    kicker: "Contact",
    title: "One channel.",
    subtitle: "Write to contact@dynamogic.com.",
  },
];

const html = await readFile(templatePath);

const server = createServer((req, res) => {
  const requestUrl = new URL(req.url || "/", "http://127.0.0.1");
  if (requestUrl.pathname !== "/og-template-dark.html") {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
  res.end(html);
});

await new Promise((resolve) => {
  server.listen(0, "127.0.0.1", resolve);
});

const address = server.address();
if (!address || typeof address === "string") {
  throw new Error("OG preview server did not bind a port.");
}

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--font-render-hinting=none"],
});

await mkdir(outDir, { recursive: true });

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });

  for (const card of cards) {
    const url = new URL(`http://127.0.0.1:${address.port}/og-template-dark.html`);
    url.searchParams.set("title", card.title);
    url.searchParams.set("subtitle", card.subtitle);
    url.searchParams.set("kicker", card.kicker);

    await page.goto(url.href, { waitUntil: "load" });
    await page.waitForFunction(() => document.documentElement.classList.contains("ready"), { timeout: 15000 });

    const rendered = await page.$eval("#title", (node) => node.textContent);
    if (rendered !== card.title) {
      throw new Error(`Template did not apply the title for ${card.file}: ${rendered}`);
    }

    const element = await page.$("#og");
    if (!element) throw new Error(`#og missing for ${card.file}`);
    const shot = await element.screenshot({ type: "png" });
    const png = await sharp(shot).resize(1200, 630, { fit: "fill" }).png().toBuffer();
    const meta = await sharp(png).metadata();
    if (meta.width !== 1200 || meta.height !== 630) {
      throw new Error(`${card.file} is ${meta.width}x${meta.height}`);
    }
    const dest = path.join(outDir, card.file);
    await writeFile(dest, png);
    console.log(`${card.file} ${meta.width}x${meta.height} ${png.length} bytes`);
  }
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
