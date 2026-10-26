# Dynamogic

Company site for Dynamogic, a small studio working in artificial intelligence, automation, and software engineering. French is the default language. English lives under `/en/`.

The site is static. It is published today at [https://mtaqys.github.io/](https://mtaqys.github.io/) from this repository (`MTAQYS.github.io`). The same build is what will later be served at `https://dynamogic.com`, and it can move to Cloudflare Pages without a code change.

There is no `CNAME` file in this repository on purpose. `dynamogic.com` still points at a Hostinger parking page. Adding the custom domain now would send the working `github.io` site there.

## Develop

Node.js 22 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:4321/](http://localhost:4321/). English is at [http://localhost:4321/en/](http://localhost:4321/en/).

| Command | What it does |
| --- | --- |
| `npm run dev` | Local site |
| `npm run lint` | `astro check` and ESLint |
| `npm run build` | Static site in `dist/` |
| `npm run preview` | Serve `dist/` |
| `npm run check:site` | After a build: internal links, language tags, the contact address, tool-name placement, favicons, Open Graph images, and the legal placeholders |
| `npm run render:og` | Re-render the per-page Open Graph cards from `brand/final-C/og-template-dark.html`. Not required for a normal build |

`SITE_URL` controls canonical URLs, `hreflang`, the sitemap, and Open Graph image URLs. It defaults to `https://mtaqys.github.io`. Override it at build time when the public host changes:

```bash
SITE_URL=https://dynamogic.com npm run build
```

## Pages

| French | English |
| --- | --- |
| `/` | `/en/` |
| `/services/` | `/en/services/` |
| `/outils/` | `/en/tools/` |
| `/contact/` | `/en/contact/` |
| `/mentions-legales/` | `/en/legal/` |
| `/confidentialite/` | `/en/privacy/` |

The only address on the site is `contact@dynamogic.com`. The contact form is `mailto:` only. Nothing is posted to a server.

Only the tools pages name Convert, Wheel, and QR. They link to `/Convert/`, `/Wheel/`, and `/Qr/`, which are separate sites on this same host. Those utilities run in the browser.

Legal pages name only Dynamogic. Sections titled “À compléter” / “To be completed” are the slots for a real legal form, registered office, registration number, share capital, VAT number, publication director, and host log-retention period. The HTML comment `LEGAL-PLACEHOLDER` marks the same slots. Those facts are not invented here.

## GitHub Pages

The publishing source for this repository must be **GitHub Actions**, not “Deploy from a branch”.

Settings → Pages → Build and deployment → Source: **GitHub Actions**.

Workflow: [`.github/workflows/ci.yml`](.github/workflows/ci.yml). On every push and pull request it installs, lints, builds, and checks links. A push to `main` also uploads `dist/` and deploys it with the official Pages actions.

This repository is the user site, so it occupies `https://mtaqys.github.io/`. Project sites such as `/bepro/`, `/docs/`, `/Convert/`, `/Wheel/`, and `/Qr/` come from their own repositories and are not replaced by this deploy.

## Custom domain, later

Do this only when `dynamogic.com` should leave the Hostinger parking page. Order matters.

GitHub’s own note: if the Pages source is a GitHub Actions workflow, saving a custom domain in the Pages settings does **not** create a `CNAME` file, and a `CNAME` file already in the repository is ignored and not required. The setting that attaches the domain — and that makes `mtaqys.github.io` redirect to it — is **Settings → Pages → Custom domain**. Do not save that, and do not add a `CNAME` file, while DNS still points at Hostinger. Visitors would be sent from the working `github.io` site to the parking page.

When you are ready to switch, do these close together:

1. Confirm Source is **GitHub Actions**.
2. In Settings → Pages → Custom domain, enter `dynamogic.com` and save. Optionally verify the domain first (Settings → Pages → the domain verification steps) so another repository cannot claim it.
3. Add `public/CNAME` containing exactly:

   ```
   dynamogic.com
   ```

   With Actions as the source, GitHub does not require this file. Add it in the same change anyway so the repository shows the intended host, then rebuild. It does not replace step 2.
4. At Hostinger, remove the parking records and any other `A`, `AAAA`, or `CNAME` on `@` and `www`. Then create:

   Apex `@` `A` records, all four:

   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

   Apex `@` `AAAA` records, all four:

   - `2606:50c0:8000::153`
   - `2606:50c0:8001::153`
   - `2606:50c0:8002::153`
   - `2606:50c0:8003::153`

   `www` `CNAME` record pointing at `mtaqys.github.io`.

   Do not use a wildcard such as `*.dynamogic.com`.
5. Check DNS:

   ```bash
   dig dynamogic.com +noall +answer -t A
   dig dynamogic.com +noall +answer -t AAAA
   dig www.dynamogic.com +nostats +nocomments +nocmd
   ```

   The `www` answer should be a `CNAME` to `mtaqys.github.io`.
6. When the certificate exists, in Settings → Pages enable **Enforce HTTPS**. This can take up to 24 hours after DNS is correct. Until it is available, leave the box alone rather than pointing `www` at the apex yourself.
7. Rebuild with `SITE_URL=https://dynamogic.com` so canonical URLs, `hreflang`, the sitemap, and Open Graph URLs use the new host. Set that variable in the workflow env when you make the switch.

GitHub will redirect between the apex and `www` once both are configured. Set the Pages custom domain to `dynamogic.com` if the apex should be canonical.

## Cloudflare Pages, later

The same repository deploys there without a code change.

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `SITE_URL` set to the public origin (`https://mtaqys.github.io` until the domain moves, then `https://dynamogic.com`)
- Node 22

`public/_headers` is copied to the site root. Cloudflare Pages applies that security policy (CSP, `X-Content-Type-Options`, frame denial, referrer policy, and a locked-down permissions policy). GitHub Pages ignores `_headers`; the policy becomes active on Cloudflare.

Point DNS at Cloudflare only after you mean to leave both the Hostinger parking page and, if it is still the live host, GitHub Pages. Do not add the GitHub `CNAME` at the same time as a Cloudflare custom domain.

## Brand

The locked mark is Grand-duc, variant C (Massif): an eagle-owl head. Copper is used once, on the beak. Display type is Instrument Serif, text is Geist, labels are Geist Mono. All three are self-hosted from `node_modules`. There is no font CDN, so the content-security policy can keep `style-src 'self'` and `font-src 'self'`.

Dark is the default (`#0E0F11`). Light is `#F5F3EE`. Copper is `#D4925F` on dark and `#9C5428` on light. `src/styles/tokens.css` is the source of those values. `public/theme.js` sets `data-theme` before paint from `localStorage` key `dg-theme`, or from `prefers-color-scheme` when nothing is stored. `prefers-reduced-motion` removes the short entrance.

The kit lives in `brand/final-C/`. The site copies what it serves:

| Kit file | Served as |
| --- | --- |
| `favicon.svg` | `/favicon.svg` — auto theme |
| `favicon-16.svg` | `/favicon-16.svg` — kept for a 16 px context; the `.ico` already carries the 16 px frame |
| `favicon.ico` | `/favicon.ico` |
| `apple-touch-icon-180.png` | `/apple-touch-icon-180.png` |
| `app-icon.svg`, `app-icon-192.png`, `app-icon-512.png` | Same paths, listed in `site.webmanifest` |
| `lockup-horizontal.svg` plus `-dark` and `-light` | `/brand/…` |
| `mark.svg` | `/brand/mark.svg`, plus `mark-dark.svg` and `mark-light.svg` with the same geometry and fixed fills |
| `og-default-dark.png` | `/og-default-dark.png` — legal notice, privacy, and any page without its own card |
| `og-template-dark.html` | Source for `npm run render:og`. Not published |

The header and footer use the fixed dark and light lockups. An `<img>` that points at the auto lockup follows the operating system, not the theme toggle, so that file stays in `/brand/` for swapping and is not the one in the header.

Recommended head, from the kit:

```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png">
<meta property="og:image" content="https://dynamogic.com/og-default-dark.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

Home, expertise, tools, and contact use their own cards: `/og/fr-home.png`, `/og/en-home.png`, and the same pattern for `services`, `tools`, and `contact`. `npm run render:og` serves `og-template-dark.html?title=&subtitle=&kicker=`, waits for `<html class="ready">`, captures `#og`, and writes 1200×630 PNGs. Chrome is required (`CHROME_PATH` overrides `/usr/bin/google-chrome`).

To replace the kit later, drop the new files into `brand/final-C/`, copy the same names into `public/` and `public/brand/`, then run `npm run render:og`. Do not recolour the mark beyond ink, paper, and copper.
