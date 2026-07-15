/**
 * scroll-reveal.js
 * Reveals any [data-reveal] element as it enters the viewport.
 * Supports:
 *   data-reveal            = "fade" | "rise" | "scale" | "left" | "right"
 *   data-reveal-delay      = milliseconds, applied directly
 *   data-reveal-group      = name; children of the same group stagger in
 *                            sequence 80ms apart, in DOM order
 */
export function initScrollReveal() {
  const elements = document.querySelectorAll("[data-reveal]");
  if (!elements.length) return;

  if (!("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-revealed"));
    return;
  }

  const STAGGER_STEP_MS = 80;
  const groupCounters = new Map();

  const delayFor = (el) => {
    const explicit = el.getAttribute("data-reveal-delay");
    if (explicit) return Number(explicit);

    const group = el.getAttribute("data-reveal-group");
    if (!group) return 0;

    const count = groupCounters.get(group) || 0;
    groupCounters.set(group, count + 1);
    return count * STAGGER_STEP_MS;
  };

  elements.forEach((el) => {
    el.style.setProperty("--reveal-delay", `${delayFor(el)}ms`);
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}
