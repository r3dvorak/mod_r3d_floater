<?php
/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @creation    2025-09-02
 * @author      Richard Dvorak, r3d.de
 * @copyright   Copyright (C) 2025 Richard Dvorak, https://r3d.de
 * @license     GNU GPL v3 or later (https://www.gnu.org/licenses/gpl-3.0.html)
 * @version     5.0.0
 * @file        modules/mod_r3d_floater/mod_r3d_floater.php
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Helper\ModuleHelper;

$doc = Factory::getApplication()->getDocument();
$wa = $doc->getWebAssetManager();
$wa->useStyle('mod_r3d_floater.style');
$wa->useScript('mod_r3d_floater.floater');

require __DIR__ . '/helper.php';

// Build render data
$data = [
    'module_id' => (int) $module->id,
    'title' => $module->title,
    'direction' => $params->get('direction', 'right'),
    'width' => (int) $params->get('width', 560),
    'height' => (int) $params->get('height', 400),
    'auto_open' => (int) $params->get('auto_open', 1) === 1,
    'show_close' => (int) $params->get('show_close', 1) === 1,
    'frequency' => $params->get('frequency', 'session'), // every, session, day, week
    'cookie_prefix' => trim((string) $params->get('cookie_prefix', 'r3dFloater')),
    'content_html' => '',
];

$contentSource = $params->get('content_source', 'custom'); // custom|module
if ($contentSource === 'module') {
    $embedId = (int) $params->get('embed_module_id', 0);
    $data['content_html'] = $embedId ? R3dFloaterHelper::renderModuleById($embedId) : '';
} else {
    $raw = (string) $params->get('custom_html', '');
    $data['content_html'] = R3dFloaterHelper::prepareContent($raw);
}

require ModuleHelper::getLayoutPath('mod_r3d_floater', $params->get('layout', 'default'));
