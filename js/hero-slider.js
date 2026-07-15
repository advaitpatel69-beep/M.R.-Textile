/**
 * hero-slider.js
 * Crossfades through the hero background slides on a timer. Respects
 * prefers-reduced-motion (holds on the first slide, no auto-advance).
 */
export function initHeroSlider() {
  const slides = document.querySelectorAll(".hero__slide");
  if (slides.length < 2) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const INTERVAL_MS = 6000;
  let current = 0;
  let timer = null;

  const goTo = (index) => {
    slides[current].classList.remove("is-active");
    current = index % slides.length;
    slides[current].classList.add("is-active");
  };

  const start = () => {
    timer = window.setInterval(() => goTo(current + 1), INTERVAL_MS);
  };
  const stop = () => {
    if (timer) window.clearInterval(timer);
  };

  start();

  // Pause the slideshow while the tab is hidden to save resources.
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : start();
  });
}
