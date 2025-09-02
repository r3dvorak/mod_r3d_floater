/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @creation    2025-09-02
 * @author      Richard Dvorak
 * @license     GNU GPL v3 or later
 * @version     5.0.0
 * @file        modules/mod_r3d_floater/media/mod_r3d_floater/js/floater.js
 */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function key(mid, prefix) {
    return prefix + ':' + mid;
  }

  function shouldShow(el) {
    var mid   = el.dataset.mid;
    var freq  = el.dataset.frequency || 'session';
    var pref  = el.dataset.keyPrefix || 'r3dFloater';
    var k     = key(mid, pref);

    if (freq === 'every') return true;

    try {
      if (freq === 'session') {
        if (sessionStorage.getItem(k)) return false;
        sessionStorage.setItem(k, Date.now().toString());
        return true;
      }
      var now = Date.now();
      var last = parseInt(localStorage.getItem(k) || '0', 10);
      var ms = 0;
      if (freq === 'day') ms = 24 * 60 * 60 * 1000;
      if (freq === 'week') ms = 7 * 24 * 60 * 60 * 1000;
      if (!last || (now - last) > ms) {
        localStorage.setItem(k, now.toString());
        return true;
      }
      return false;
    } catch (e) {
      // Storage blocked? Fallback: show once.
      return true;
    }
  }

  function openFloater(el) {
    var dir = el.dataset.direction || 'right';
    var panel = el.querySelector('.r3d-floater__panel');
    if (!panel) return;

    panel.classList.remove('r3d-anim-left','r3d-anim-right','r3d-anim-top','r3d-anim-bottom');
    panel.classList.add('r3d-anim-' + dir);

    el.classList.remove('r3d-floater--hidden');
    el.setAttribute('aria-hidden', 'false');
  }

  function closeFloater(el) {
    el.classList.add('r3d-floater--hidden');
    el.setAttribute('aria-hidden', 'true');
  }

  ready(function () {
    document.querySelectorAll('.r3d-floater').forEach(function (el) {
      var auto = el.dataset.autoOpen === 'true';
      var showClose = el.dataset.showClose === 'true';

      if (showClose) {
        var btn = el.querySelector('.r3d-floater__close');
        if (btn) btn.addEventListener('click', function () { closeFloater(el); });
      }

      if (auto && shouldShow(el)) {
        openFloater(el);
      }
    });
  });
})();
