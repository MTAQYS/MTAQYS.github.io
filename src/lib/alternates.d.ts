export type Locale = "fr" | "en";

export type RouteKey =
  | "home"
  | "vision"
  | "services"
  | "tools"
  | "oss"
  | "contact"
  | "legal"
  | "privacy";

export const routeTable: Record<RouteKey, Record<Locale, string>>;

export function normalizePath(path: string): string;
export function stripBase(pathname: string, base?: string): string;
export function joinBase(base: string, path: string): string;
export function toolPath(locale: Locale, slug: string): string;
export function matchAlternate(
  pathname: string,
  base?: string,
): { fr: string; en: string } | null;
