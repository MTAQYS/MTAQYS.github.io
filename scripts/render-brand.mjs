import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";

const root = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(root, "public");
const fontDir = path.join(root, "scripts/.fonts");

const fonts = [
  {
    file: "SourceSerif4.ttf",
    url: "https://github.com/google/fonts/raw/main/ofl/sourceserif4/SourceSerif4%5Bopsz%2Cwght%5D.ttf",
  },
  {
    file: "SourceSans3.ttf",
    url: "https://github.com/google/fonts/raw/main/ofl/sourcesans3/SourceSans3%5Bwght%5D.ttf",
  },
];

async function ensureFonts() {
  await mkdir(fontDir, { recursive: true });
  const files = [];
  for (const font of fonts) {
    const destination = path.join(fontDir, font.file);
    const response = await fetch(font.url);
    if (!response.ok) throw new Error(`Font download failed: ${font.url}`);
    await writeFile(destination, Buffer.from(await response.arrayBuffer()));
    files.push(destination);
  }
  return files;
}

function render(svg, file, width) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: {
      fontFiles: fontFiles,
      loadSystemFonts: false,
      defaultFontFamily: "Source Serif 4",
    },
  });
  return writeFile(path.join(publicDir, file), resvg.render().asPng());
}

const fontFiles = await ensureFonts();

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#1c1915"/>
  <path fill="#f3f0e8" d="M8 7.2h7.2v1.7H9.7V23h5.5v1.7H8V7.2z"/>
  <path fill="#f3f0e8" d="M15.1 8.8h1.6c4.7 0 7.7 2.7 7.7 7.2s-3 7.2-7.7 7.2h-1.6v-1.8h1.3c3.5 0 5.8-2 5.8-5.4s-2.3-5.4-5.8-5.4h-1.3V8.8z"/>
  <rect x="8" y="26.6" width="10" height="1.5" fill="#8d3d27"/>
</svg>`;

await render(icon, "favicon-32.png", 32);
await render(icon, "apple-touch-icon.png", 180);

function card(lines, footer) {
  const tspans = lines
    .map((line, index) => `<tspan x="88" dy="${index === 0 ? 0 : 86}">${line}</tspan>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#f3f0e8"/>
    <text x="88" y="118" fill="#1c1915" font-family="Source Serif 4" font-size="36" font-weight="560">Dynamogic</text>
    <rect x="88" y="148" width="72" height="3" fill="#8d3d27"/>
    <text x="88" y="270" fill="#1c1915" font-family="Source Serif 4" font-size="64" font-weight="500">${tspans}</text>
    <text x="88" y="560" fill="#5c564c" font-family="Source Sans 3" font-size="24">${footer}</text>
  </svg>`;
}

await render(
  card(["Des systèmes intelligents", "qui travaillent en silence."], "Studio · IA, automatisation, logiciel"),
  "og-fr.png",
  1200,
);
await render(
  card(["Intelligent systems that", "work quietly."], "Studio · AI, automation, software"),
  "og-en.png",
  1200,
);

console.log("Brand images written to public/.");
