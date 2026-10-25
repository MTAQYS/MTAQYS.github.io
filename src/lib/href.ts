import { joinBase, routeTable, toolPath } from "./alternates.mjs";
import type { Locale, RouteKey } from "./locale";

export type { Locale, RouteKey };

const routes = routeTable as Record<RouteKey, Record<Locale, string>>;

export function href(locale: Locale, key: RouteKey, slug?: string): string {
  const path = key === "tools" && slug ? toolPath(locale, slug) : routes[key][locale];
  return joinBase(import.meta.env.BASE_URL || "/", path);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "fr" ? "en" : "fr";
}

export function absoluteUrl(path: string, origin?: string | URL): string {
  const base = origin ? (typeof origin === "string" ? origin : origin.origin) : "https://mtaqys.github.io";
  return new URL(path, base.endsWith("/") ? base : `${base}/`).href;
}
