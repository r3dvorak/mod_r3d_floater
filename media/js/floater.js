/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @file        media/mod_r3d_floater/js/floater.js
 * @version     5.2.6
 * @description Slide-in/out with direction, rotate/scale, and per-phase speeds
 */

document.addEventListener("DOMContentLoaded", () => {
  const floater = document.querySelector(".r3d-floater");
  if (!floater) return;

  // --- Read & sanitize dataset ---
  const sanitizeInt = (val, def) => {
    const v = parseInt(String(val ?? "").trim(), 10);
    return Number.isFinite(v) ? v : def;
  };
  const sanitizeDir = (val) => {
    const d = String(val ?? "right").trim().toLowerCase();
    return ["top", "right", "bottom", "left"].includes(d) ? d : "right";
  };

  let direction = sanitizeDir(floater.dataset.direction);
  const speedIn  = Math.max(0, Math.min(10000, sanitizeInt(floater.dataset.speedIn, 800)));
  const speedOut = Math.max(0, Math.min(10000, sanitizeInt(floater.dataset.speedOut, 800)));
  const width    = Math.max(1, sanitizeInt(floater.dataset.width, 560));
  const height   = Math.max(1, sanitizeInt(floater.dataset.height, 400));
  const zIndex   = sanitizeInt(floater.dataset.zindex, 2147483647);
  const autoOpen = String(floater.dataset.autoOpen) === "true";

  const rotateStartDeg = sanitizeInt(floater.dataset.rotateStart, -90); // e.g. -90
  const scaleStartPct  = sanitizeInt(floater.dataset.scaleStart, 30);   // e.g. 30
  const scaleStart     = Math.max(0.01, scaleStartPct / 100);

  // --- Apply base styles/vars ---
  floater.style.width = `${width}px`;
  floater.style.height = `${height}px`;
  floater.style.zIndex = String(zIndex);

  // Start with "in" duration; we will switch to out duration on close.
  floater.style.setProperty("--r3d-dur", `${speedIn}ms`);

  // Start rotation/scale (used when hidden). Visible state overrides to 0/1.
  floater.style.setProperty("--r3d-rot", `${rotateStartDeg}deg`);
  floater.style.setProperty("--r3d-scale", `${scaleStart}`);

  // Ensure exactly one direction class is present
  floater.classList.remove("r3d-floater--from-top","r3d-floater--from-right","r3d-floater--from-bottom","r3d-floater--from-left");
  floater.classList.add(`r3d-floater--from-${direction}`);

  // Helper to force a reflow between class changes (ensures transition runs)
  const nextFrame = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));

  // --- Open (to center) ---
  const openFloater = () => {
    floater.style.setProperty("--r3d-dur", `${speedIn}ms`);
    floater.setAttribute("aria-hidden", "false");

    // Keep direction class; visible overrides CSS vars to the centered ones
    nextFrame(() => {
      floater.classList.add("r3d-floater--visible");
    });
  };

  // --- Close (back to off-screen in same direction) ---
  const closeFloater = () => {
    floater.style.setProperty("--r3d-dur", `${speedOut}ms`);
    floater.classList.remove("r3d-floater--visible");
    floater.classList.add("r3d-floater--closing"); // for potential styling hooks
    floater.setAttribute("aria-hidden", "true");
  };

  // Cleanup after the closing transition
  const onTransitionEnd = (e) => {
    if (e.propertyName !== "transform") return;
    if (!floater.classList.contains("r3d-floater--visible")) {
      floater.classList.remove("r3d-floater--closing");
      // Keep direction class so next open has a correct off-screen start
    }
  };
  floater.addEventListener("transitionend", onTransitionEnd);

  // Auto-open (optional)
  if (autoOpen) {
    // tiny delay to ensure initial styles apply before we flip to visible
    setTimeout(openFloater, 150);
  }

  // Close button
  const closeBtn = floater.querySelector(".r3d-floater__close");
  if (closeBtn) closeBtn.addEventListener("click", closeFloater);
});
