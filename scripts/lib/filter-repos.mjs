/**
 * Keep public, non-archived repositories, minus an explicit exclude list.
 * Names are compared case-insensitively.
 * @param {unknown[]} rawRepos
 * @param {{ exclude?: string[] }} [options]
 */
export function selectRepos(rawRepos, { exclude = [] } = {}) {
  if (!Array.isArray(rawRepos)) {
    throw new Error("GitHub response was not a list of repositories.");
  }
  const excluded = new Set(exclude.map((name) => String(name).toLowerCase()));
  return rawRepos
    .filter((repo) => {
      if (!repo || typeof repo !== "object") return false;
      if (repo.private === true) return false;
      if (repo.archived === true) return false;
      if (repo.visibility && repo.visibility !== "public") return false;
      if (excluded.has(String(repo.name).toLowerCase())) return false;
      return true;
    })
    .map((repo) => ({
      name: repo.name,
      description: repo.description ?? null,
      url: repo.html_url,
      homepage: repo.homepage || null,
      language: repo.language ?? null,
      stars: repo.stargazers_count ?? 0,
      pushedAt: repo.pushed_at,
      fork: Boolean(repo.fork),
      topics: Array.isArray(repo.topics) ? repo.topics : [],
    }))
    .sort((a, b) => {
      if (a.pushedAt === b.pushedAt) return a.name.localeCompare(b.name);
      return a.pushedAt < b.pushedAt ? 1 : -1;
    });
}
