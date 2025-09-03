<?php
/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @creation    2025-09-02
 * @author      Richard Dvorak, r3d.de
 * @copyright   Copyright (C) 2025 Richard Dvorak, https://r3d.de
 * @license     GNU GPL v3 or later (https://www.gnu.org/licenses/gpl-3.0.html)
 * @version     5.4.0
 * @file        modules/mod_r3d_floater/tmpl/default.php
 */

defined('_JEXEC') or die;

// Normalize parameters (with safe fallbacks)
$mid = (int) ($data['module_id'] ?? 0);
$w = (int) ($data['width'] ?? 560);
$h = (int) ($data['height'] ?? 400);
$sin = (int) ($data['speed_in'] ?? 800);
$sout = (int) ($data['speed_out'] ?? 800);
$freq = (string) ($data['frequency'] ?? 'session');
$pref = (string) ($data['cookie_prefix'] ?? '');
$z = (int) ($data['zindex'] ?? 2147483647);

// NEW: optional rotate/scale
$rotateStart = (int) ($data['rotate_start'] ?? -90);
$scaleStart = (int) ($data['scale_start'] ?? 30);

// Apply validation & defaults
$width = $w > 0 ? $w : 560;
$height = $h > 0 ? $h : 400;
$speed_in = max(0, min($sin, 10000));
$speed_out = max(0, min($sout, 10000));
$auto_open = !empty($data['auto_open']);
$show_close = !empty($data['show_close']);

// IMPORTANT: match your XML options
$allowedFreq = ['every', 'session', 'day', 'week'];
$frequency = in_array($freq, $allowedFreq, true) ? $freq : 'session';

$key_prefix = $pref !== '' ? $pref : 'r3dFloater';
$zindex = $z >= 0 ? $z : 2147483647;

// Direction cleanup
$validDirections = ['top', 'right', 'bottom', 'left'];
$direction = strtolower(trim((string) ($data['direction'] ?? 'right')));
if (!in_array($direction, $validDirections, true)) {
    $direction = 'right';
}
?>
<div id="r3d-floater-<?php echo $mid; ?>" class="r3d-floater r3d-floater--hidden"
    style="width:<?php echo $width; ?>px; height:<?php echo $height; ?>px;" data-mid="<?php echo $mid; ?>"
    data-direction="<?php echo $direction; ?>" data-width="<?php echo $width; ?>" data-height="<?php echo $height; ?>"
    data-auto-open="<?php echo $auto_open ? 'true' : 'false'; ?>"
    data-show-close="<?php echo $show_close ? 'true' : 'false'; ?>" data-frequency="<?php echo $frequency; ?>"
    data-key-prefix="<?php echo htmlspecialchars($key_prefix, ENT_QUOTES, 'UTF-8'); ?>"
    data-speed-in="<?php echo $speed_in; ?>" data-speed-out="<?php echo $speed_out; ?>"
    data-rotate-start="<?php echo $rotateStart; ?>" data-scale-start="<?php echo $scaleStart; ?>"
    data-zindex="<?php echo $zindex; ?>" aria-hidden="true" role="dialog">

    <div class="r3d-floater__panel" role="document">
        <?php if ($show_close): ?>
            <button type="button" class="r3d-floater__close" aria-label="Close">&times;</button>
        <?php endif; ?>
        <div class="r3d-floater__content">
            <?php echo $data['content_html'] ?? ''; ?>
        </div>
    </div>
</div>