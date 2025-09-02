<?php
/**
 * @package     Joomla.Module
 * @subpackage  mod_r3d_floater
 * @creation    2025-09-02
 * @author      Richard Dvorak, r3d.de
 * @copyright   Copyright (C) 2025 Richard Dvorak, https://r3d.de
 * @license     GNU GPL v3 or later (https://www.gnu.org/licenses/gpl-3.0.html)
 * @version     5.0.0
 * @file        modules/mod_r3d_floater/helper.php
 */

defined('_JEXEC') or die;

use Joomla\CMS\Factory;
use Joomla\CMS\Helper\ModuleHelper;

class R3dFloaterHelper
{
    public static function renderModuleById(int $id): string
    {
        $db = Factory::getDbo();
        $query = $db->getQuery(true)
            ->select('*')
            ->from($db->quoteName('#__modules'))
            ->where($db->quoteName('id') . ' = ' . (int) $id)
            ->where($db->quoteName('published') . ' = 1');
        $db->setQuery($query);
        $row = $db->loadObject();

        if (!$row) {
            return '';
        }

        // Build a module object compatible with ModuleHelper::renderModule
        $module = new stdClass();
        $module->id = (int) $row->id;
        $module->title = $row->title;
        $module->module = $row->module;
        $module->position = $row->position;
        $module->content = '';
        $module->showtitle = 0;
        $module->params = $row->params;

        return ModuleHelper::renderModule($module, ['style' => 'none']);
    }

    public static function prepareContent(string $html): string
    {
        // Run content plugins so {loadmoduleid} etc. work if user uses them
        $app = Factory::getApplication();
        $context = 'mod_r3d_floater.content';
        $obj = (object) ['text' => $html];
        $app->triggerEvent('onContentPrepare', [$context, &$obj, new Joomla\Registry\Registry(), 0]);
        return $obj->text;
    }
}
