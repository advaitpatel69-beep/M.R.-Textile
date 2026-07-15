/**
 * counters.js
 * Animates [data-counter] numbers counting up from 0 to data-target when
 * they scroll into view. data-suffix (e.g. "+", "%") is appended once done.
 */
export function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  if (!counters.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DURATION_MS = 1600;

  const animate = (el) => {
    const target = Number(el.getAttribute("data-target") || "0");
    const suffix = el.getAttribute("data-suffix") || "";

    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString("en-IN") + suffix;
      return;
    }

    const start = performance.now();
    const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);

    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      const value = Math.round(target * easeOutQuint(progress));
      el.textContent = value.toLocaleString("en-IN") + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(animate);
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => observer.observe(el));
}
