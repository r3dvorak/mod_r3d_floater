/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @file        media/mod_r3d_floater/js/floater.js
 * @version     5.4.1
 * @description Controls opening, closing, animation and positioning of the floater
 */

document.addEventListener("DOMContentLoaded", () => {
  const floater = document.querySelector(".r3d-floater");
  if (!floater) return;

  // === Params from dataset ===
  let direction   = (floater.dataset.direction || "right").trim().toLowerCase();
  const speedIn   = parseInt(floater.dataset.speedIn  || "800", 10);
  const speedOut  = parseInt(floater.dataset.speedOut || "800", 10);
  const zIndex    = parseInt(floater.dataset.zindex   || "2147483647", 10);
  const width     = parseInt(floater.dataset.width    || "560", 10);
  const height    = parseInt(floater.dataset.height   || "400", 10);
  const startDelay = parseInt(floater.dataset.startDelay || "0", 10);
  const rotateStart = parseInt(floater.dataset.rotateStart || "-90", 10);
  const scaleStart  = Math.max(0.05, Math.min(5, (parseInt(floater.dataset.scaleStart || "30", 10) / 100)));

  // === Apply z-index and dimensions ===
  floater.style.zIndex = String(zIndex);
  floater.style.width  = width + "px";
  floater.style.height = height + "px";

  // === Put floater in hidden start position with NO transition ===
  floater.style.transition = "none";
  floater.classList.add(`r3d-floater--from-${direction}`);

  // Rotation & scale start (CSS vars used in hidden state)
  floater.style.setProperty("--r3d-rotate", rotateStart + "deg");
  floater.style.setProperty("--r3d-scale",  String(scaleStart));

  // Force layout so the browser applies the hidden transform immediately
  void floater.offsetWidth;

  // === Open Floater ===
  const openFloater = () => {
    floater.style.transition = `transform ${speedIn}ms ease-in-out, opacity ${Math.min(speedIn, 600)}ms ease-in-out`;
    floater.classList.add("r3d-floater--visible");
    floater.setAttribute("aria-hidden", "false");
  };

  // === Close Floater ===
  const closeFloater = () => {
    floater.style.transition = `transform ${speedOut}ms ease-in-out, opacity ${Math.min(speedOut, 600)}ms ease-in-out`;
    floater.classList.remove("r3d-floater--visible");
    floater.classList.add("r3d-floater--closing");
    floater.setAttribute("aria-hidden", "true");

    setTimeout(() => {
      floater.classList.remove("r3d-floater--closing");
    }, speedOut);
  };

  // === Auto-open with configurable delay ===
  if (startDelay > 0) {
    setTimeout(() => requestAnimationFrame(openFloater), startDelay);
  } else {
    // default: open immediately after paint
    requestAnimationFrame(() => requestAnimationFrame(openFloater));
  }

  // === Close button ===
  const closeBtn = floater.querySelector(".r3d-floater__close");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeFloater);
  }
});
