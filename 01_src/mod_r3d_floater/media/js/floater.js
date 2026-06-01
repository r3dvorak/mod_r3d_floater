/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @file        media/mod_r3d_floater/js/floater.js
 * @version     5.5.0
 * @description Controls opening, closing, animation and positioning of the floater
 */

document.addEventListener("DOMContentLoaded", () => {
  const floater = document.querySelector(".r3d-floater");
  if (!floater) return;

  // === Params ===
  const direction      = (floater.dataset.direction || "right").trim().toLowerCase();
  const speedIn        = parseInt(floater.dataset.speedIn  || "800", 10);
  const speedOut       = parseInt(floater.dataset.speedOut || "800", 10);
  const zIndex         = parseInt(floater.dataset.zindex   || "2147483647", 10);
  const width          = parseInt(floater.dataset.width    || "560", 10);
  const height         = parseInt(floater.dataset.height   || "400", 10);
  const startDelay     = parseInt(floater.dataset.startDelay || "0", 10);
  const rotateStart    = parseInt(floater.dataset.rotateStart || "-90", 10);
  const scaleStart     = Math.max(0.05, Math.min(5, (parseInt(floater.dataset.scaleStart || "30", 10) / 100)));
  const autoCloseDelay = parseInt(floater.dataset.autoclose || "0", 10);
  const frequency      = floater.dataset.frequency || "every";
  const cookieKey      = (floater.dataset.keyPrefix || "r3dFloater") + "_" + (floater.dataset.mid || "0");

  // === Cookie helpers ===
  function setCookie(name, value, days) {
    let expires = "";
    if (days > 0) {
      const d = new Date();
      d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + d.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

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
    floater.style.transition = `transform ${speedIn}ms ease-in-out, opacity ${speedIn}ms ease-in-out`;
    floater.classList.add("r3d-floater--visible");
    floater.setAttribute("aria-hidden", "false");

    // === NEW: Auto close if set ===
    if (autoCloseDelay > 0) {
      setTimeout(() => {
        closeFloater();
      }, autoCloseDelay);
    }

    // Save cookie depending on frequency
    if (frequency === "once") {
      setCookie(cookieKey, "1", 3650); // ~10 years
    } else if (frequency === "day") {
      setCookie(cookieKey, "1", 1);
    } else if (frequency === "week") {
      setCookie(cookieKey, "1", 7);
    } else if (frequency === "month") {
      setCookie(cookieKey, "1", 30);
    } else if (frequency === "session") {
      setCookie(cookieKey, "1", 0); // session cookie
    }
  };

  const closeFloater = () => {
    floater.style.transition = `transform ${speedOut}ms ease-in-out, opacity ${speedOut}ms ease-in-out`;
    floater.classList.remove("r3d-floater--visible");
    floater.classList.add("r3d-floater--closing");
    floater.setAttribute("aria-hidden", "true");

    setTimeout(() => {
      floater.classList.remove("r3d-floater--closing");
    }, speedOut);
  };

  // === Auto-open with frequency + delay check ===
  let shouldShow = true;
  const existing = getCookie(cookieKey);

  if (frequency === "once"    && existing) shouldShow = false;
  if (frequency === "day"     && existing) shouldShow = false;
  if (frequency === "week"    && existing) shouldShow = false;
  if (frequency === "month"   && existing) shouldShow = false;
  if (frequency === "session" && existing) shouldShow = false;

  if (shouldShow) {
    setTimeout(openFloater, startDelay);
  }

  // Close button
  const closeBtn = floater.querySelector(".r3d-floater__close");
  if (closeBtn) closeBtn.addEventListener("click", closeFloater);
});
