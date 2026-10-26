export function initNav(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-menu]");
  buttons.forEach((button) => {
    const panel = document.getElementById(button.getAttribute("aria-controls") ?? "");
    if (!panel) return;
    const openLabel = button.dataset.labelOpen ?? "Menu";
    const closeLabel = button.dataset.labelClose ?? "Close";

    const setOpen = (open: boolean) => {
      button.setAttribute("aria-expanded", open ? "true" : "false");
      button.textContent = open ? closeLabel : openLabel;
      panel.classList.toggle("is-open", open);
    };

    button.addEventListener("click", () => {
      setOpen(button.getAttribute("aria-expanded") !== "true");
    });

    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        button.focus();
      }
    });
  });
}
