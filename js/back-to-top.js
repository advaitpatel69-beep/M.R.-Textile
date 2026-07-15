/**
 * back-to-top.js
 * Shows the back-to-top button after the reader has scrolled past the
 * hero, and smooth-scrolls to the top on click.
 */
export function initBackToTop() {
  const btn = document.querySelector("[data-back-to-top]");
  if (!btn) return;

  const SHOW_AFTER_PX = window.innerHeight * 0.8;

  const onScroll = () => {
    btn.classList.toggle("is-visible", window.scrollY > SHOW_AFTER_PX);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
