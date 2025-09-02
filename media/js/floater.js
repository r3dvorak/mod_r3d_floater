/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @file        media/mod_r3d_floater/js/floater.js
 * @version     5.3.2
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
  const rotateStart = parseInt(floater.dataset.rotateStart || "-90", 10);
  const scaleStart = parseInt(floater.dataset.scaleStart || "30", 10) / 100;

  // Apply z-index and dimensions
  floater.style.zIndex = zIndex;
  floater.style.width = width + "px";
  floater.style.height = height + "px";

  // Apply custom animation values
  floater.style.setProperty("--r3d-rotate", rotateStart + "deg");
  floater.style.setProperty("--r3d-scale", scaleStart);
  floater.style.setProperty("--r3d-rotate-target", "0deg");
  floater.style.setProperty("--r3d-scale-target", "1");

  // Apply transition speed dynamically (for opening)
  floater.style.setProperty("--r3d-speed", speedIn + "ms");

  // Start hidden at directional position
  floater.classList.add(`r3d-floater--from-${direction}`);

  // === Open Floater ===
  const openFloater = () => {
    // Remove "from-direction" so transition can animate
    floater.classList.remove(`r3d-floater--from-${direction}`);
    floater.classList.add("r3d-floater--visible");
    floater.setAttribute("aria-hidden", "false");
  };

  // === Close Floater ===
  const closeFloater = () => {
    // Switch transition speed for close
    floater.style.setProperty("--r3d-speed", speedOut + "ms");

    // Remove visible, reapply directional transform
    floater.classList.remove("r3d-floater--visible");
    floater.classList.add("r3d-floater--closing", `r3d-floater--from-${direction}`);
    floater.setAttribute("aria-hidden", "true");

    setTimeout(() => {
      floater.classList.remove("r3d-floater--closing");
      // Reset transition speed back to open
      floater.style.setProperty("--r3d-speed", speedIn + "ms");
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
