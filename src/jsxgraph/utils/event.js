/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */
import { Type } from "./type.js";
/**
 * Event namespace
 * @namespace
 */
export class Events {
    constructor() {
        /** initially this.trigger() */
        this.triggerEventHandlers = this.trigger;
        // /**
        //  * @description Implements the functionality from this interface in the given object.
        //  * All objects getting their event handling
        //  * capabilities from this method should document it by adding
        //  * the <tt>on, off, triggerEventHandlers</tt> via the
        //  * borrows tag as methods to their documentation:
        //  * <pre>@borrows JXG.EventEmitter#on as this.on</pre>
        //  * @param {Object} o
        //  */
        // eventify(o: Coords | CoordsElement | GeometryElement) {
        //     o.eventHandlers = {
        //         clicks: 0 // Needed to handle dblclicks
        //     };
        //     o.on = this.on;
        //     o.off = this.off;
        //     o.triggerEventHandlers = this.trigger;
        //     o.trigger = this.trigger;
        //     o.suspended = {};
        // }
    }
    /**
     * Triggers all event handlers of this element for a given event.
     * Not called directly, serves as default function for triggerEventHandlers
     * @param {
     * @param {Array} args The arguments passed onto the event handler
     * @returns Reference to the object.
     */
    trigger(event, args) {
        let len1 = event.length;
        for (let j = 0; j < len1; j++) {
            let evt = this.eventHandlers[event[j]];
            if (!this.suspended[event[j]]) {
                this.suspended[event[j]] = true;
                if (evt) {
                    for (let i = 0; i < evt.length; i++) {
                        let h = evt[i];
                        h.handler.apply(h.context, args);
                    }
                }
                this.suspended[event[j]] = false;
            }
        }
        return this;
    }
    /**
     * Register a new event handler. For a list of possible events see documentation
     * of the elements and objects implementing
     * the {@link EventEmitter} interface.
     *
     * As of version 1.5.0, it is only possible to access the element via "this" if the event listener
     * is supplied as regular JavaScript function and not as arrow function.
     *
     * @param {String} event
     * @param {Function} handler
     * @param {Object} [context] The context the handler will be called in, default is the element itself.
     * @returns Reference to the object.
     */
    on(event, handler, context = this) {
        // have we initialized this event yet?
        if (!Type.isArray(this.eventHandlers[event])) {
            this.eventHandlers[event] = [];
        }
        context = Type.def(context, this);
        this.eventHandlers[event].push({
            handler: handler,
            context: context
        });
        return this;
    }
    /** Unregister an event handler.
     * @returns Reference to the context object.
     */
    off(event, handler) {
        // if eventhandler not initialized we can quick-exit
        if (!event || !Type.isArray(this.eventHandlers[event])) {
            return this;
        }
        if (handler) {
            let i = Type.indexOf(this.eventHandlers[event], handler, "handler");
            if (i > -1) {
                // found it
                this.eventHandlers[event].splice(i, 1);
            }
            if (this.eventHandlers[event].length === 0) {
                delete this.eventHandlers[event];
            }
        }
        else {
            delete this.eventHandlers[event];
        }
        return this;
    }
}
