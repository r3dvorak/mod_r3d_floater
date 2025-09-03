/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @file        media/mod_r3d_floater/js/floater.js
 * @version     5.4.0
 * @description Controls opening, closing, animation and positioning of the floater
 */

document.addEventListener("DOMContentLoaded", () => {
  const floater = document.querySelector(".r3d-floater");
  if (!floater) return;

  // Read params from dataset (fallbacks keep previous behavior)
  const direction   = (floater.dataset.direction || "right").trim().toLowerCase();
  const speedIn     = parseInt(floater.dataset.speedIn  || "800", 10);
  const speedOut    = parseInt(floater.dataset.speedOut || "800", 10);
  const zIndex      = parseInt(floater.dataset.zindex   || "2147483647", 10);
  const width       = parseInt(floater.dataset.width    || "560", 10);
  const height      = parseInt(floater.dataset.height   || "400", 10);
  const autoOpen    = (floater.dataset.autoOpen === "true");
  const rotateStart = parseInt(floater.dataset.rotateStart || "-90", 10);
  const scaleStart  = Math.max(0.05, Math.min(5, (parseInt(floater.dataset.scaleStart || "30", 10) / 100)));

  // Apply z-index and dimensions
  floater.style.zIndex = String(zIndex);
  floater.style.width  = width + "px";
  floater.style.height = height + "px";

  // 1) Put floater in hidden start position with NO transition
  floater.style.transition = "none";
  floater.classList.add(`r3d-floater--from-${direction}`);

  // Start rotation & scale (CSS vars are used in hidden states)
  floater.style.setProperty("--r3d-rotate", rotateStart + "deg");
  floater.style.setProperty("--r3d-scale",  String(scaleStart));

  // Force layout so the browser applies the hidden transform immediately (no animation)
  void floater.offsetWidth;

  const openFloater = () => {
    // 2) Enable transition with user speed and slide to center, upright & full size
    floater.style.transition = `transform ${speedIn}ms ease-in-out, opacity ${Math.min(speedIn, 600)}ms ease-in-out`;
    // visible state sets translate(-50%,-50%) rotate(0) scale(1)
    floater.classList.add("r3d-floater--visible");
    floater.setAttribute("aria-hidden", "false");
  };

  const closeFloater = () => {
    // 3) Transition out using user speed, back to the same edge (direction class stays)
    floater.style.transition = `transform ${speedOut}ms ease-in-out, opacity ${Math.min(speedOut, 600)}ms ease-in-out`;
    floater.classList.remove("r3d-floater--visible");
    floater.classList.add("r3d-floater--closing");
    floater.setAttribute("aria-hidden", "true");

    // After the animation, drop the closing helper; keep the direction class for the next open
    setTimeout(() => {
      floater.classList.remove("r3d-floater--closing");
      floater.style.transition = `transform ${speedIn}ms ease-in-out, opacity ${speedIn}ms ease-in-out`;
    }, speedOut);
  };

  // Auto-open after we’ve safely set the hidden start state
  if (autoOpen) {
    // Two RAFs ensure the browser has painted the hidden state before animating
    requestAnimationFrame(() => requestAnimationFrame(openFloater));
  }

  // Close button
  const closeBtn = floater.querySelector(".r3d-floater__close");
  if (closeBtn) closeBtn.addEventListener("click", closeFloater);
});
