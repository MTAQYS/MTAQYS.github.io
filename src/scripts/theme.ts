import { site } from "../lib/site";

type Theme = "light" | "dark";

function preferred(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function stored(): Theme | null {
  try {
    const value = localStorage.getItem(site.themeStorageKey);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

function apply(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  const meta = document.getElementById("theme-color");
  if (meta) meta.setAttribute("content", theme === "dark" ? "#141311" : "#f3f0e8");
  const pressed = theme === "dark" ? "true" : "false";
  document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", pressed);
  });
}

export function initTheme(): void {
  apply(stored() ?? preferred());
  document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(site.themeStorageKey, next);
      } catch {
        /* Storage can be blocked. The theme still changes for this view. */
      }
      apply(next);
    });
  });

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", () => {
    if (!stored()) apply(preferred());
  });
}
