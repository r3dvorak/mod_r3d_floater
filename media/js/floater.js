/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @file        media/mod_r3d_floater/js/floater.js
 * @version     5.2.0
 * @description Controls opening, closing, animation and positioning of the floater
 */

document.addEventListener("DOMContentLoaded", () => {
  const floater = document.querySelector(".r3d-floater");
  if (!floater) return;

  // === Params from dataset ===
  const direction = floater.dataset.direction || "right";
  const speedIn = parseInt(floater.dataset.speedIn || "800", 10);
  const speedOut = parseInt(floater.dataset.speedOut || "800", 10);
  const zIndex = parseInt(floater.dataset.zindex || "2147483647", 10);
  const width = parseInt(floater.dataset.width || "560", 10);
  const height = parseInt(floater.dataset.height || "400", 10);

  // Apply z-index directly
  floater.style.zIndex = zIndex;

  // Apply dimensions if not already inline
  floater.style.width = width + "px";
  floater.style.height = height + "px";

  // Add initial direction class
  floater.classList.add(`r3d-floater--from-${direction}`);

  // === Open Floater ===
  const openFloater = () => {
    floater.classList.add("r3d-floater--visible");
    floater.setAttribute("aria-hidden", "false");
  };

  // === Close Floater ===
  const closeFloater = () => {
    floater.classList.remove("r3d-floater--visible");
    floater.classList.add("r3d-floater--closing");
    floater.setAttribute("aria-hidden", "true");

    // Reset after animation
    setTimeout(() => {
      floater.classList.remove("r3d-floater--closing");
    }, speedOut);
  };

  // === Auto-open ===
  if (floater.dataset.autoOpen === "true") {
    setTimeout(openFloater, 200);
  }

  // === Close button ===
  const closeBtn = floater.querySelector(".r3d-floater__close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeFloater);
  }
});
