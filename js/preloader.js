/**
 * preloader.js
 * Hides the elegant preloader once the window has fully loaded, with a small
 * minimum-display floor so it never flashes on fast connections, and unlocks
 * body scroll once it's gone.
 */
export function initPreloader() {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;

  document.body.classList.add("no-scroll");

  const MIN_DISPLAY_MS = 500;
  const shownAt = performance.now();

  const hide = () => {
    const elapsed = performance.now() - shownAt;
    const wait = Math.max(0, MIN_DISPLAY_MS - elapsed);
    window.setTimeout(() => {
      preloader.classList.add("is-hidden");
      preloader.setAttribute("aria-hidden", "true");
      document.body.classList.remove("no-scroll");
      window.setTimeout(() => preloader.remove(), 900);
    }, wait);
  };

  if (document.readyState === "complete") {
    hide();
  } else {
    window.addEventListener("load", hide, { once: true });
    // Safety net: never block the page for more than 4s even if some
    // non-critical asset stalls.
    window.setTimeout(hide, 4000);
  }
}
