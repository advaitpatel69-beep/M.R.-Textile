/**
 * navigation.js
 * - Toggles the sticky header's "scrolled" appearance
 * - Opens/closes the mobile menu with focus handling
 * - Smooth-scrolls to in-page anchors, offset for the fixed header
 * - Highlights the current section's nav link via IntersectionObserver
 */
export function initNavigation() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const allNavLinks = document.querySelectorAll(".nav-link, .mobile-menu__list a");
  const sections = document.querySelectorAll("main [id]");

  if (!header) return;

  /* ---- Sticky header background ---- */
  const SCROLL_THRESHOLD = 24;
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > SCROLL_THRESHOLD);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile menu ---- */
  if (toggle && mobileMenu) {
    const closeMenu = () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("is-open");
      document.body.classList.remove("no-scroll");
    };
    const openMenu = () => {
      toggle.setAttribute("aria-expanded", "true");
      mobileMenu.classList.add("is-open");
      document.body.classList.add("no-scroll");
      const firstLink = mobileMenu.querySelector("a");
      if (firstLink) firstLink.focus({ preventScroll: true });
    };

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileMenu.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ---- Smooth scroll with fixed-header offset ---- */
  const getHeaderOffset = () => header.getBoundingClientRect().height + 14;

  allNavLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href") || "";
      if (!href.startsWith("#") || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", href);
    });
  });

  /* ---- Active section highlighting ---- */
  if ("IntersectionObserver" in window && sections.length) {
    const linkFor = (id) =>
      document.querySelectorAll(`.nav-link[href="#${id}"], .mobile-menu__list a[href="#${id}"]`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          allNavLinks.forEach((l) => l.classList.remove("is-active"));
          linkFor(entry.target.id).forEach((l) => l.classList.add("is-active"));
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((section) => observer.observe(section));
  }
}
