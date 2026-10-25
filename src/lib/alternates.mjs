/** Route pairs without the deploy base path. French is unprefixed. */

export const routeTable = {
  home: { fr: "/", en: "/en/" },
  vision: { fr: "/vision/", en: "/en/vision/" },
  services: { fr: "/services/", en: "/en/services/" },
  tools: { fr: "/outils/", en: "/en/tools/" },
  oss: { fr: "/open-source/", en: "/en/open-source/" },
  contact: { fr: "/contact/", en: "/en/contact/" },
  legal: { fr: "/mentions-legales/", en: "/en/legal/" },
  privacy: { fr: "/confidentialite/", en: "/en/privacy/" },
};

export function normalizePath(path) {
  if (!path) return "/";
  let value = path.startsWith("/") ? path : `/${path}`;
  if (value !== "/" && !value.endsWith("/")) value += "/";
  return value;
}

export function stripBase(pathname, base = "/") {
  const prefix = !base || base === "/" ? "" : String(base).replace(/\/$/, "");
  let path = pathname || "/";
  if (prefix && (path === prefix || path.startsWith(`${prefix}/`))) {
    path = path.slice(prefix.length) || "/";
  }
  return normalizePath(path);
}

export function joinBase(base, path) {
  const normalizedBase = !base || base === "/" ? "/" : base.endsWith("/") ? base : `${base}/`;
  const rest = String(path).replace(/^\//, "");
  if (!rest) return normalizedBase === "/" ? "/" : normalizedBase;
  return `${normalizedBase === "/" ? "/" : normalizedBase}${rest}`;
}

export function toolPath(locale, slug) {
  return locale === "fr" ? `/outils/${slug}/` : `/en/tools/${slug}/`;
}

export function matchAlternate(pathname, base = "/") {
  const path = stripBase(pathname, base);
  for (const key of Object.keys(routeTable)) {
    const pair = routeTable[key];
    if (path === pair.fr || path === pair.en) {
      return { fr: pair.fr, en: pair.en };
    }
  }
  let match = path.match(/^\/outils\/([^/]+)\/$/);
  if (match) {
    return { fr: `/outils/${match[1]}/`, en: `/en/tools/${match[1]}/` };
  }
  match = path.match(/^\/en\/tools\/([^/]+)\/$/);
  if (match) {
    return { fr: `/outils/${match[1]}/`, en: `/en/tools/${match[1]}/` };
  }
  return null;
}
