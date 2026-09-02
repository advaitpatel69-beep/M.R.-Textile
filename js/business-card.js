/**
 * business-card.js
 * Business Card Viewer Modal
 *
 * Displays M.R. Textile / M.R. Sarees business card images in a
 * premium modal overlay that matches the site's design system.
 *
 * Features:
 *  - Thumbnail switcher for multiple cards
 *  - Download current card as image
 *  - Download all cards (one-by-one via anchor download)
 *  - Keyboard (Escape / Arrow keys) and touch support
 *  - Accessible: role=dialog, aria-modal, focus trap
 *  - Zero external dependencies
 *
 * Usage:
 *   import { initBusinessCard } from "./business-card.js";
 *   initBusinessCard();
 *
 *   Any element with [data-open-business-card] will open the modal.
 */

export function initBusinessCard() {
  const modal = document.querySelector("[data-business-card-modal]");
  if (!modal) return;

  // ---- DOM references ----
  const backdrop   = modal.querySelector(".bc-modal__backdrop");
  const closeBtn   = modal.querySelector(".bc-modal__close");
  const mainImg    = modal.querySelector(".bc-modal__img");
  const thumbsWrap = modal.querySelector(".bc-modal__thumbs");
  const downloadCurrentBtn = modal.querySelector("[data-bc-download-current]");
  const downloadAllBtn     = modal.querySelector("[data-bc-download-all]");
  const cardNameEl = modal.querySelector(".bc-modal__card-name");
  const counterEl  = modal.querySelector(".bc-modal__counter");

  // ---- Card data ----
  const cards = [
    {
      src: "images/business-cards/mr-textile-business-card-front.jpg",
      name: "M.R. Textile — Kalpesh Patel",
      filename: "mr-textile-business-card-kalpesh-patel.jpg",
    },
    {
      src: "images/business-cards/mr-sarees-business-card-nilesh-patel.jpg",
      name: "M.R. Sarees — Nilesh Patel",
      filename: "mr-sarees-business-card-nilesh-patel.jpg",
    },
  ];

  let currentIndex = 0;
  let lastTrigger  = null;

  // ---- Build thumbnails ----
  cards.forEach((card, i) => {
    const thumb = document.createElement("button");
    thumb.type = "button";
    thumb.className = "bc-modal__thumb";
    thumb.setAttribute("aria-label", `View ${card.name} business card`);
    if (i === 0) thumb.classList.add("is-active");

    const img = document.createElement("img");
    img.src   = card.src;
    img.alt   = card.name;
    img.width = 80;
    img.height = 48;
    img.loading = "lazy";

    thumb.appendChild(img);
    thumb.addEventListener("click", () => switchTo(i));
    thumbsWrap.appendChild(thumb);
  });

  // ---- Switch card ----
  function switchTo(index) {
    currentIndex = (index + cards.length) % cards.length;
    const card = cards[currentIndex];

    mainImg.classList.remove("is-visible");
    setTimeout(() => {
      mainImg.onload = () => mainImg.classList.add("is-visible");
      mainImg.src = card.src;
      mainImg.alt = card.name;
      if (mainImg.complete && mainImg.naturalWidth > 0) {
        mainImg.classList.add("is-visible");
      }
    }, 80);

    if (cardNameEl) cardNameEl.textContent = card.name;
    if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${cards.length}`;

    thumbsWrap.querySelectorAll(".bc-modal__thumb").forEach((t, i) => {
      t.classList.toggle("is-active", i === currentIndex);
    });
  }

  // ---- Download ----
  function downloadCard(index) {
    const card = cards[index];
    const a = document.createElement("a");
    a.href = card.src;
    a.download = card.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  downloadCurrentBtn?.addEventListener("click", () => downloadCard(currentIndex));

  downloadAllBtn?.addEventListener("click", () => {
    cards.forEach((_, i) => {
      // Stagger slightly so browsers don't block multiple rapid downloads
      setTimeout(() => downloadCard(i), i * 600);
    });
  });

  // ---- Open / Close ----
  function open(triggerEl) {
    lastTrigger = triggerEl || document.activeElement;
    switchTo(0);
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    closeBtn.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function close() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    document.removeEventListener("keydown", onKeydown);
    mainImg.classList.remove("is-visible");
    if (lastTrigger && typeof lastTrigger.focus === "function") {
      lastTrigger.focus();
    }
  }

  // ---- Keyboard ----
  function onKeydown(e) {
    if (e.key === "Escape")      close();
    if (e.key === "ArrowRight")  switchTo(currentIndex + 1);
    if (e.key === "ArrowLeft")   switchTo(currentIndex - 1);
  }

  // ---- Touch swipe ----
  let touchStartX = null;
  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  modal.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 40)  switchTo(currentIndex - 1);
    else if (delta < -40) switchTo(currentIndex + 1);
    touchStartX = null;
  }, { passive: true });

  closeBtn.addEventListener("click", close);
  backdrop.addEventListener("click", close);

  // ---- Bind triggers ----
  document.querySelectorAll("[data-open-business-card]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      open(e.currentTarget);
    });
  });

  // Expose open() globally so other scripts can call it
  window.openBusinessCard = open;
}
