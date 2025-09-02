<?php
/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @creation    2025-09-02
 * @author      Richard Dvorak, r3d.de
 * @copyright   Copyright (C) 2025 Richard Dvorak, https://r3d.de
 * @license     GNU GPL v3 or later (https://www.gnu.org/licenses/gpl-3.0.html)
 * @version     5.3.0
 * @file        modules/mod_r3d_floater/helper.php
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Helper\ModuleHelper;

/**
 * Helper class for mod_r3d_floater
 */
class ModR3dFloaterHelper
{
    /**
     * Build the data array for the floater template
     *
     * @param   \stdClass  $module  The module object
     * @param   \Joomla\Registry\Registry  $params  The module parameters
     *
     * @return  array
     */
    public static function getData(object $module, \Joomla\Registry\Registry $params): array
    {
        $data = [
            'module_id' => (int) $module->id,
            'direction' => $params->get('direction', 'right'),
            'width' => (int) $params->get('width', 560),
            'height' => (int) $params->get('height', 400),
            'auto_open' => (bool) $params->get('auto_open', 1),
            'show_close' => (bool) $params->get('show_close', 1),
            'frequency' => $params->get('frequency', 'session'),
            'cookie_prefix' => $params->get('cookie_prefix', 'r3dFloater'),
            'speed_in' => (int) $params->get('speed_in', 800),
            'speed_out' => (int) $params->get('speed_out', 800),
            'zindex' => (int) $params->get('zindex', 2147483647),
            'rotate_start' => (int) $params->get('rotate_start', -90),
            'scale_start' => (int) $params->get('scale_start', 30),
            'content_html' => '',
        ];

        $source = $params->get('content_source', 'custom');

        if ($source === 'custom') {
            $data['content_html'] = $params->get('custom_html', '');
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

        return $data;
    }
}
