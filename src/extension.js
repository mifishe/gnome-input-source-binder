/* extension.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

/* exported init */

const SHORTCUT_PREFIX = "switch-to-input-source-"

import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import Meta from 'gi://Meta'
import Shell from 'gi://Shell'
import { InputSourceManager }  from 'resource:///org/gnome/shell/ui/status/keyboard.js';
import { Extension, gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';

function setInputSource(index) {
    return () => {
        InputSourceManager.inputSources[index].activate()
    };
}


export default class InputSourceBinderExtension extends Extension {

    enable() {
        const source_number = Object.keys(InputSourceManager.inputSources).length;
        this.input_source_count = Math.min(5, source_number)
        
        const settings = this.getSettings()

        for (let i = 0; i < this.input_source_count; i++) {
            Main.wm.addKeybinding(
                SHORTCUT_PREFIX + (i + 1), settings,
                Meta.KeyBindingFlags.IGNORE_AUTOREPEAT,
                Shell.ActionMode.NORMAL | Shell.ActionMode.OVERVIEW,
                setInputSource(i));
        }
    }

    disable() {
        for (let i = 0; i < this.input_count; i++) {
            Main.wm.removeKeyBinding(SHORTCUT_PREFIX + (i + 1));
        }
    }
}