<?php
/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @creation    2025-09-02
 * @author      Richard Dvorak, r3d.de
 * @copyright   Copyright (C) 2025 Richard Dvorak, https://r3d.de
 * @license     GNU GPL v3 or later (https://www.gnu.org/licenses/gpl-3.0.html)
 * @version     5.2.0
 * @file        modules/mod_r3d_floater/tmpl/default.php
 */

defined('_JEXEC') or die;

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
<div id="r3d-floater-<?= $mid; ?>" class="r3d-floater r3d-floater--hidden"
    style="width:<?= $w; ?>px; height:<?= $h; ?>px;" data-mid=<?= $mid; ?> data-direction="<?= $dir; ?>"
    data-width=<?= $w; ?> data-height=<?= $h; ?> data-auto-open="<?= $auto; ?>" data-show-close="<?= $close; ?>"
    data-frequency="<?= $freq; ?>" data-key-prefix="<?= $pref; ?>" data-speed-in=<?= $sin; ?> data-speed-out=<?= $sout; ?>
    data-zindex=<?= $z; ?> aria-hidden="true" role="dialog">

    <div class="r3d-floater__panel" role="document">
        <?php if ($data['show_close']): ?>
            <button type="button" class="r3d-floater__close" aria-label="Close">&times;</button>
        <?php endif; ?>
        <div class="r3d-floater__content">
            <?= $data['content_html']; ?>
        </div>
    </div>
</div>