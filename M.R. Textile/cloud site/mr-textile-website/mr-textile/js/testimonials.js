/**
 * testimonials.js
 * Simple accessible carousel: autoplay with pause on hover/focus and when
 * the tab is hidden; dot + arrow navigation; reduced-motion disables
 * autoplay entirely (still fully operable via the controls).
 */
export function initTestimonials() {
  const root = document.querySelector("[data-testimonial-carousel]");
  if (!root) return;

  const slides = Array.from(root.querySelectorAll(".testimonial-slide"));
  const dotsWrap = root.querySelector(".testimonial-dots");
  const prevBtn = root.querySelector("[data-testimonial-prev]");
  const nextBtn = root.querySelector("[data-testimonial-next]");
  if (!slides.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const AUTOPLAY_MS = 6500;
  let current = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "testimonial-dot";
    dot.setAttribute("aria-label", `Show testimonial ${i + 1} of ${slides.length}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function goTo(i) {
    slides[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    current = (i + slides.length) % slides.length;
    slides[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  }

  function next() {
    goTo(current + 1);
  }
  function prev() {
    goTo(current - 1);
  }

  function start() {
    if (prefersReducedMotion) return;
    stop();
    timer = window.setInterval(next, AUTOPLAY_MS);
  }
  function stop() {
    if (timer) window.clearInterval(timer);
  }

  goTo(0);
  start();

  prevBtn?.addEventListener("click", () => {
    prev();
    start();
  });
  nextBtn?.addEventListener("click", () => {
    next();
    start();
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);
  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : start();
  });
}
