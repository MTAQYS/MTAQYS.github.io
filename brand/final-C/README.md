# Dynamogic — Grand-duc C (Massif) · asset kit

Source mark: `../../dynamogic-logo-grandduc-C.svg` (48-unit grid, mirror-symmetric). The geometry is unchanged in every file except `favicon-16.svg`.
Colours: ink `#16171A` / paper `#ECEAE5`, copper `#9C5428` (light) / `#D4925F` (dark), dark background `#0E0F11`.
Copper is used once, on the beak only.

| File | Use |
|---|---|
| `mark.svg` | The mark on its own. It switches automatically: ink on light, paper on dark (`prefers-color-scheme`). |
| `favicon.svg` | Main favicon for modern browsers. Same geometry as the mark, theme-aware. `<link rel="icon" href="/favicon.svg" type="image/svg+xml">` |
| `favicon-16.svg` | Version tuned for 16 px: sides snapped to the pixel grid, no pupils, larger eyes, a heavier gap around the beak. Use only where the icon is shown at exactly 16 px. Theme-aware. |
| `favicon.ico` | Fallback for older browsers, with 16, 32 and 48 frames. Each frame is a dark tile with the mark; the 16 frame uses the 16 px version. `<link rel="icon" href="/favicon.ico" sizes="48x48">` |
| `apple-touch-icon-180.png` | iOS home screen, full-bleed dark square; iOS rounds the corners. `<link rel="apple-touch-icon" href="/apple-touch-icon-180.png">` |
| `app-icon-512.png`, `app-icon-192.png` | Web manifest / PWA icons: rounded dark tile, transparent corners. |
| `app-icon.svg` | Vector source of the rounded-square app tile (corner radius 22 %). |
| `lockup-horizontal.svg` | Mark + "Dynamogic" (Instrument Serif converted to outlines). It switches automatically: ink on light, paper on dark. Use it in site headers that follow the system theme. |
| `lockup-horizontal-dark.svg` | Fixed colours for **dark backgrounds** (paper + copper beak). |
| `lockup-horizontal-light.svg` | Fixed colours for **light backgrounds** (ink + copper beak). |
| `og-template-dark.html` | Generator for 1200×630 Open Graph images. It is self-contained, with fonts embedded. Pass `?title=…&subtitle=…`, optionally `&kicker=…`, URL-encoded. Wait for `<html class="ready">`, then capture the `#og` element at 1200×630 (render at 2× and downscale for the crispest result). Long titles shrink automatically (maximum 3 lines) and the subtitle is cut off after 2 lines. Without `title`, it renders the default brand card (`&tagline=…` overrides the tagline). |
| `og-template-dark.png` | Example output: placeholder title "Titre de la page" plus a subtitle. |
| `og-default-dark.png` | Default share image for pages without their own: lockup plus the tagline "L’intelligence qui travaille en silence." |

## Rules
- Clear space: ¼ of the mark height on every side.
- Minimum size: full mark ≥ 20 px; horizontal lockup ≥ 20 px tall.
- Never recolour the mark beyond ink, paper and copper, and never add effects or outlines.

## Recommended `<head>`
```html
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png">
<meta property="og:image" content="https://dynamogic.com/og-default-dark.png">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
```
