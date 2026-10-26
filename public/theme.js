(function () {
  var key = "dg-theme";

  function systemTheme() {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function storedTheme() {
    try {
      var value = localStorage.getItem(key);
      return value === "light" || value === "dark" ? value : null;
    } catch (error) {
      return null;
    }
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#F5F3EE" : "#0E0F11");
  }

  function syncButton() {
    var button = document.querySelector("[data-theme-toggle]");
    if (!button) return;
    var theme = document.documentElement.getAttribute("data-theme") || "dark";
    var label = button.querySelector("[data-theme-label]");
    if (label) {
      label.textContent = theme === "dark" ? button.getAttribute("data-label-light") : button.getAttribute("data-label-dark");
    }
    button.setAttribute(
      "aria-label",
      theme === "dark" ? button.getAttribute("data-aria-when-dark") || "" : button.getAttribute("data-aria-when-light") || "",
    );
    button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }

  apply(storedTheme() || systemTheme());

  document.addEventListener("DOMContentLoaded", function () {
    syncButton();
    var button = document.querySelector("[data-theme-toggle]");
    if (button) {
      button.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        try {
          localStorage.setItem(key, next);
        } catch (error) {
          /* private mode */
        }
        apply(next);
        syncButton();
      });
    }
    window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function () {
      if (storedTheme()) return;
      apply(systemTheme());
      syncButton();
    });
  });
})();
