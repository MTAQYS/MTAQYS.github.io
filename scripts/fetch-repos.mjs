import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { selectRepos } from "./lib/filter-repos.mjs";

const root = path.resolve(import.meta.dirname, "..");
const configPath = path.join(root, "src/data/opensource.config.json");
const fallbackPath = path.join(root, "src/data/repos.fallback.json");
const outputPath = path.join(root, "src/generated/repos.json");

async function writeCatalog(catalog) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  const json = `${JSON.stringify(catalog, null, 2)}\n`;
  await writeFile(outputPath, json);
  if (process.env.WRITE_FALLBACK === "1") await writeFile(fallbackPath, json);
}

async function useFallback(reason) {
  console.warn(`Open-source list: using the committed fallback (${reason}).`);
  const fallback = JSON.parse(await readFile(fallbackPath, "utf8"));
  fallback.source = "fallback";
  await writeCatalog(fallback);
}

async function fetchAll(org, token) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "dynamogic-site",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const repos = [];
  for (let page = 1; page <= 10; page += 1) {
    const url = `https://api.github.com/orgs/${encodeURIComponent(org)}/repos?per_page=100&page=${page}&type=public`;
    const response = await fetch(url, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API ${response.status} on page ${page}`);
    }
    const chunk = await response.json();
    if (!Array.isArray(chunk) || chunk.length === 0) break;
    repos.push(...chunk);
    if (chunk.length < 100) break;
  }
  return repos;
}

const config = JSON.parse(await readFile(configPath, "utf8"));

try {
  const raw = await fetchAll(config.org, process.env.GITHUB_TOKEN);
  const repos = selectRepos(raw, { exclude: config.exclude ?? [] });
  await writeCatalog({
    generatedAt: new Date().toISOString(),
    source: "github",
    org: config.org,
    repos,
  });
  console.log(`Open-source list: ${repos.length} public repositories from ${config.org}.`);
} catch (error) {
  await useFallback(error instanceof Error ? error.message : "unknown error");
}
