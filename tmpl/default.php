<?php
/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @creation    2025-09-02
 * @author      Richard Dvorak, r3d.de
 * @copyright   Copyright (C) 2025 Richard Dvorak, https://r3d.de
 * @license     GNU GPL v3 or later (https://www.gnu.org/licenses/gpl-3.0.html)
 * @version     5.2.5
 * @file        modules/mod_r3d_floater/tmpl/default.php
 */

defined('_JEXEC') or die;

$speed_in = (int) ($params->get('speed_in', 800));   // default 800ms
$speed_out = (int) ($params->get('speed_out', 800));  // default 800ms

$mid = (int) $data['module_id'];
$dir = htmlspecialchars($data['direction'], ENT_QUOTES, 'UTF-8');
$w = (int) $data['width'];
$h = (int) $data['height'];
$auto = $data['auto_open'] ? 'true' : 'false';
$close = $data['show_close'] ? 'true' : 'false';
$freq = htmlspecialchars($data['frequency'], ENT_QUOTES, 'UTF-8');
$pref = htmlspecialchars($data['cookie_prefix'], ENT_QUOTES, 'UTF-8');
$sin = (int) $data['speed_in'];
$sout = (int) $data['speed_out'];
$z = (int) $data['zindex'];
?>
<div id="r3d-floater-<?php echo $module->id; ?>"
    class="r3d-floater r3d-floater--from-<?php echo htmlspecialchars($params->get('direction', 'right')); ?>"
    style="width:<?php echo (int) $params->get('width', 400); ?>px; height:<?php echo (int) $params->get('height', 400); ?>px;"
    data-mid="<?php echo $module->id; ?>"
    data-direction="<?php echo htmlspecialchars($params->get('direction', 'right')); ?>"
    data-width="<?php echo (int) $params->get('width', 400); ?>"
    data-height="<?php echo (int) $params->get('height', 400); ?>"
    data-auto-open="<?php echo $params->get('auto_open', 1) ? 'true' : 'false'; ?>"
    data-show-close="<?php echo $params->get('show_close', 1) ? 'true' : 'false'; ?>"
    data-frequency="<?php echo htmlspecialchars($params->get('frequency', 'every')); ?>" data-key-prefix="r3dFloater"
    data-speed-in="<?php echo $speed_in; ?>" data-speed-out="<?php echo $speed_out; ?>"
    data-zindex="<?php echo (int) $params->get('zindex', 2147483647); ?>" aria-hidden="true" role="dialog">

    <div class="r3d-floater__panel" role="document">
        <?php if ($data['show_close']): ?>
            <button type="button" class="r3d-floater__close" aria-label="Close">&times;</button>
        <?php endif; ?>
        <div class="r3d-floater__content">
            <?= $data['content_html']; ?>
        </div>
    </div>
</div>