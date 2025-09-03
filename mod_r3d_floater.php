<?php
/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @creation    2025-09-02
 * @author      Richard Dvorak, r3d.de
 * @copyright   Copyright (C) 2025 Richard Dvorak, https://r3d.de
 * @license     GNU GPL v3 or later (https://www.gnu.org/licenses/gpl-3.0.html)
 * @version     5.4.0
 * @file        modules/mod_r3d_floater/mod_r3d_floater.php
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Helper\ModuleHelper;
use Joomla\CMS\Uri\Uri;

// Media assets (Uri::root() absolute is fine; Uri::root(true) would be path-only)
$doc = Factory::getApplication()->getDocument();
$base = Uri::root() . 'media/mod_r3d_floater/';

$doc->addStyleSheet($base . 'css/style.css');
$doc->addScript($base . 'js/floater.js');

// Collect params for the layout (include animation params!)
$data = [
    'module_id' => (int) $module->id,

    'zindex' => (int) $params->get('zindex', 2147483647),
    'direction' => (string) $params->get('direction', 'right'),
    'width' => (int) $params->get('width', 560),
    'height' => (int) $params->get('height', 400),

    'auto_open' => (bool) $params->get('auto_open', 1),
    'show_close' => (bool) $params->get('show_close', 1),
    'frequency' => (string) $params->get('frequency', 'session'),
    'cookie_prefix' => (string) $params->get('cookie_prefix', 'r3dFloater'),

    // NEW / IMPORTANT: animation-related params
    'speed_in' => (int) $params->get('speed_in', 800),
    'speed_out' => (int) $params->get('speed_out', 800),
    'rotate_start' => (int) $params->get('rotate_start', -90),
    'scale_start' => (int) $params->get('scale_start', 30),

    'content_html' => '',
];

// Content source
$source = (string) $params->get('content_source', 'custom');

if ($source === 'custom') {
    $data['content_html'] = (string) $params->get('custom_html', '');
} elseif ($source === 'module') {
    $embedId = (int) $params->get('embed_module_id');
    if ($embedId > 0) {
        $db = Factory::getContainer()->get('DatabaseDriver');
        $query = $db->getQuery(true)
            ->select('*')
            ->from($db->quoteName('#__modules'))
            ->where($db->quoteName('id') . ' = :id')
            ->bind(':id', $embedId, \PDO::PARAM_INT);
        $db->setQuery($query);
        $embedModule = $db->loadObject();

        if ($embedModule && $embedModule->module) {
            $data['content_html'] = ModuleHelper::renderModule($embedModule);
        }
    }
}

// Render layout
require ModuleHelper::getLayoutPath('mod_r3d_floater', $params->get('layout', 'default'));
