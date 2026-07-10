/**
 * about-slider.js
 * Controls the auto-rotating crossfade slideshow in the About section.
 */
export function initAboutSlider() {
  const slides = document.querySelectorAll(".about-slide");
  if (slides.length < 2) return;

  const INTERVAL_MS = 5000;
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

  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : start();
  });
}
