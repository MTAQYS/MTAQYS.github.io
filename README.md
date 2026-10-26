# Dynamogic

Studio d’IA, d’automatisation et d’ingénierie logicielle. Le site présente la vision et le travail du studio. Les outils nommés n’apparaissent que sur la page Outils.

A studio for AI, automation, and software engineering. The site is about the work, not a product grid. A specific tool is named only on the Tools page and its detail pages.

Français par défaut (`/`), anglais sous `/en/`.

## Développement local

Node.js 22.

```bash
npm install
npm run dev
```

Le site est servi sur `http://localhost:4321`.

Variables, voir `.env.example` :

| Variable | Rôle |
| --- | --- |
| `BASE_PATH` | Préfixe des URLs. `/` pour GitHub Pages (dépôt `MTAQYS.github.io`) et pour Cloudflare. `/nom-du-depot/` si le site est un project site. |
| `SITE_URL` | Origine canonique, sans slash final. |
| `GITHUB_TOKEN` | Facultatif. Augmente le quota de l’API GitHub au moment du build. |

```bash
BASE_PATH=/ SITE_URL=https://mtaqys.github.io npm run build
npm run preview
```

`npm run verify` enchaîne lint, tests, vérification de types et build.

## Déploiement

Le workflow `.github/workflows/pages.yml` lint, teste et construit sur chaque pull request. Un push sur `main` publie `dist/` avec `actions/deploy-pages`.

Dans le dépôt : Settings → Pages → Build and deployment → Source : **GitHub Actions**.

Le domaine `dynamogic.com` appartient au studio et n’est pas encore branché. Ne pas ajouter de fichier `CNAME` tant que le DNS ne pointe pas ici.

## Ajouter un outil

Un seul fichier : `src/data/tools.ts`. Ajouter un objet au tableau `tools`.

- `slug` : segment d’URL (`/outils/slug/` et `/en/tools/slug/`).
- `name` : nom affiché. Il n’est repris nulle part ailleurs sur le site.
- `status` : `available`, `beta` ou `soon`.
- `url` : adresse publique, seulement si l’outil est en ligne.
- `fr` et `en` : `summary`, `paragraphs`, `points`.

Aucun autre fichier n’est à toucher. La page catalogue et les deux pages de détail sont générées depuis ce tableau.

## Liste open source

Au build, `scripts/fetch-repos.mjs` lit les dépôts publics de l’organisation définie dans `src/data/opensource.config.json`. Les dépôts archivés ou privés sont exclus. Le champ `exclude` retire des noms (comparaison sans casse).

Si l’API ne répond pas, le build utilise `src/data/repos.fallback.json` et n’échoue pas. La page livrée n’appelle pas le réseau.

Pour régénérer le fichier de secours après un changement voulu :

```bash
WRITE_FALLBACK=1 npm run repos
```

## Licence

Code sous [MIT](LICENSE). Les textes du site ne sont pas couverts par cette licence : voir les mentions légales.

## English

Local development needs Node.js 22. `npm install`, then `npm run dev`. `BASE_PATH` defaults to `/`, which is correct for this repository on GitHub Pages and for a later Cloudflare deploy. Set `SITE_URL` when the canonical origin changes.

`npm run verify` runs lint, tests, the type check, and the production build. Pushing to `main` deploys `dist/` through GitHub Actions (`actions/deploy-pages`). Pages has to use the **GitHub Actions** source. `dynamogic.com` is owned and not wired yet, so this repo has no `CNAME`.

Add a tool by appending one object to `src/data/tools.ts` (`slug`, `name`, `status`, optional `url`, French and English copy). The catalog and both detail routes are generated from that file. Do not name that tool on any other page.

The open-source page is built from the public, non-archived repositories of the org in `src/data/opensource.config.json`. `exclude` drops names, case-insensitively. If the GitHub API fails, the committed `src/data/repos.fallback.json` is used and the build still passes. The shipped page makes no network call. Refresh the fallback with `WRITE_FALLBACK=1 npm run repos`.

Site code is MIT. The prose is not; see the legal notice.
