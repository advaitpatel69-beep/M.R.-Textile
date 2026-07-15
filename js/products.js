/**
 * products.js
 * Handles product card interactions:
 * - Clicking the image container opens a detailed lightbox catalog showing
 *   the main photo and alternative color placeholder images.
 */
export function initProducts(lightbox) {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card) => {
    const trigger = card.querySelector(".product-card__img-container");
    if (!trigger) return;

    trigger.addEventListener("click", (e) => {
      e.preventDefault();

      const title = card.getAttribute("data-product-title") || "";
      const desc = card.getAttribute("data-product-desc") || "";
      const images = (card.getAttribute("data-product-images") || "").split(",");
      const colors = (card.getAttribute("data-product-colors") || "").split(",");
      const fabric = card.getAttribute("data-product-fabric") || "";
      const occasions = card.getAttribute("data-product-occasions") || "";

      const items = images.map((src, idx) => {
        const colorName = colors[idx] ? colors[idx].trim() : "Featured Shade";
        return {
          src: src.trim(),
          alt: `${title} - ${colorName}`,
          caption: `<strong>${title}</strong><br>${desc}<br><span>Fabric: ${fabric} | Occasion: ${occasions}</span><br><strong>Color Option: ${colorName}</strong>`
        };
      });

      lightbox.open(items, 0, trigger);
    });
  });
}
