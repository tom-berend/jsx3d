/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Andreas Walter,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph and JSXCompressor.

    JSXGraph is free software dual licensed under the GNU LGPL or MIT License.
    JSXCompressor is free software dual licensed under the GNU LGPL or Apache License.

    You can redistribute it and/or modify it under the terms of the

      * GNU Lesser General Public License as published by
        the Free Software Foundation, either version 3 of the License, or
        (at your option) any later version
      OR
      * MIT License: https://github.com/jsxgraph/jsxgraph/blob/master/LICENSE.MIT
      OR
      * Apache License Version 2.0

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License, Apache
    License, and the MIT License along with JSXGraph. If not, see
    <https://www.gnu.org/licenses/>, <https://www.apache.org/licenses/LICENSE-2.0.html>,
    and <https://opensource.org/licenses/MIT/>.

 */
import { JSXGraph } from "./jsxgraph.js";
// this file now incorporates parts of constants.js, type.js
const VERSION = '1.12.1-beta';
/**
 * JXG is the top object of JSXGraph and defines the namespace
 */
export class JXG extends JSXGraph {
    // We need the following two methods "extend" and "shortcut" to create the JXG object via this.extend.
    /**
     * Copy all properties of the <tt>extension</tt> object to <tt>object</tt>.
     * @param  object
     * @param  extension
     * @param  [onlyOwn=false] Only consider properties that belong to extension itself, not any inherited properties.
     * @param  [toLower=false] If true the keys are convert to lower case. This is needed for visProp, see JXG#copyAttributes
     */
    // ELMINATE THIS !!
    // extend(object: Object, extension: Object, onlyOwn: boolean, toLower: boolean) {
    //     var e, e2;
    //     onlyOwn = onlyOwn || false;
    //     toLower = toLower || false;
    //     // the purpose of this for...in loop is indeed to use hasOwnProperty only if the caller
    //     // explicitly wishes so.
    //     for (e in extension) {
    //         if (!onlyOwn || (onlyOwn && extension.hasOwnProperty(e))) {
    //             if (toLower) {
    //                 e2 = e.toLowerCase();
    //             } else {
    //                 e2 = e;
    //             }
    //             object[e2] = extension[e];
    //         }
    //     }
    // };
    /**
     * Set a constant <tt>name</tt> in <tt>object</tt> to <tt>value</tt>. The value can't be changed after declaration.
     * @param  object
     * @param  name
     * @param  value
     * @param  ignoreRedefine This should be left at its default: false.
     */
    // THIS IS ONLY USED IN 'extendConstants' which we also don't want
    // defineConstant(object: Object, name: string, value: number | string | boolean, ignoreRedefine = false) {
    //     if (ignoreRedefine && !object[name]) {
    //         return;
    //     }
    //     Object.defineProperty(object, name, {
    //         value: value,
    //         writable: false,
    //         enumerable: true,
    //         configurable: false
    //     });
    // };
    /**
     * Copy all properties of the <tt>constants</tt> object in <tt>object</tt> as a constant.
     * @param {Object} object
     * @param {Object} constants
     * @param {Boolean} [onlyOwn=false] Only consider properties that belong to extension itself, not any inherited properties.
     * @param {Boolean} [toUpper=false] If true the keys are convert to lower case. This is needed for visProp, see JXG#copyAttributes
     */
    // TODO: eliminate this
    // extendConstants(object, constants, onlyOwn, toUpper) {
    //     var e, e2;
    //     onlyOwn = onlyOwn || false;
    //     toUpper = toUpper || false;
    //     // The purpose of this for...in loop is indeed to use hasOwnProperty only if the caller explicitly wishes so.
    //     for (e in constants) {
    //         if (!onlyOwn || (onlyOwn && constants.hasOwnProperty(e))) {
    //             if (toUpper) {
    //                 e2 = e.toUpperCase();
    //             } else {
    //                 e2 = e;
    //             }
    //             this.defineConstant(object, e2, constants[e]);
    //         }
    //     }
    // };
    /**
     * This registers a new construction element to JSXGraph for the construction via the {@link this.Board.create}
     * interface.
     * @param {String} element The elements name. This is case-insensitive, existing elements with the same name
     * will be overwritten.
     * @param {Function} creator A reference to a function taking three parameters: First the board, the element is
     * to be created on, a parent element array, and an attributes object. See {@link this.createPoint} or any other
     * <tt>this.create...</tt> function for an example.
     */
    // shouldn't be needed
    static registerElement(element, creator) {
        throw new Error("This shouldn't be necessary in ES6");
    }
    // registerElement(element, creator) {
    //     element = element.toLowerCase();
    //     this.elements[element] = creator;
    // }
    /**
     * Register a file reader.
     * @param {function} reader A file reader. This object has to provide two methods: <tt>prepareString()</tt>
     *  and <tt>read()</tt>.
     * @param {Array} ext
     */
    // TODO is this used in JSXGraph (sees to be for geogebra)
    // registerReader(reader:FileReader, ext) {
    //     var i, e;
    //     for (i = 0; i < ext.length; i++) {
    //         e = ext[i].toLowerCase();
    //         if (typeof this.readers[e] !== "function") {
    //             this.readers[e] = reader;
    //         }
    //     }
    // }
    /**
     * Creates a shortcut to a method, e.g. {@link this.Board#createElement} is a shortcut to {@link this.Board#create}.
     * Sometimes the target is undefined by the time you want to define the shortcut so we need this little helper.
     * @param obj The object the method we want to create a shortcut for belongs to.
     * @param funct The method we want to create a shortcut for.
     * @returns A function that calls the given method.
     */
    /////// in ES6 you can create a shortcut easily
    // import {func1, func2, func3} from "./functions"
    // class MyClass {
    //    public foo: string = "bar"
    //    public func1 = func1.bind(this)
    //    public func2 = func2.bind(this)
    //    public func3 = func3.bind(this)
    //}
    static shortcut(obj, funct) {
        return () => {
            obj[funct].apply(obj, funct);
        };
    }
    /**
     * s may be a string containing the name or id of an element or even a reference
     * to the element itself. This function returns a reference to the element. Search order: id, name.
     * @param board Reference to the board the element belongs to.
     * @param s String or reference to a JSXGraph element.
     * @returns  Reference to the object given in parameter object
     * @deprecated Use {@link this.Board#select}
     */
    static getRef(board, s) {
        this.deprecated('this.getRef()', 'Board.select()');
        return board.select(s, false); //TODO second param should be unnecesary (default in select() -here and other p)
    }
    /**
     * This is just a shortcut to {@link this.getRef}.
     * @deprecated Use {@link this.Board#select}.
     */
    static getReference(board, s) {
        this.deprecated('this.getReference()', 'Board.select()');
        return board.select(s, false);
    }
    /**
     * s may be the string containing the id of an HTML tag that hosts a JSXGraph board.
     * This function returns the reference to the board.
     * @param  s String of an HTML tag that hosts a JSXGraph board
     * @returns Reference to the board or null.
     */
    static getBoardByContainerId(s) {
        for (const [key, value] of Object.entries(this.boards)) {
            if (value.container === s) {
                return value;
            }
        }
        return null;
    }
    /**
     * This method issues a warning to the developer that the given function is deprecated
     * and, if available, offers an alternative to the deprecated function.
     * @param  what Describes the function that is deprecated
     * @param  [replacement] The replacement that should be used instead.
     */
    static deprecated(what, replacement) {
        var warning = what + ' is deprecated.';
        if (replacement) {
            warning += ' Please use ' + replacement + ' instead.';
        }
        this.warn(warning);
    }
    /**
     * Outputs a warning via console.warn(), if available. If console.warn() is
     * unavailable this function will look for an HTML element with the id 'warning'
     * and append the warning to this element's innerHTML.
     * @param warning The warning text
     */
    static warn(warning) {
        if (typeof window === 'object' && window.console && console.warn) {
            console.warn('WARNING:', warning);
        }
        else if (typeof document === 'object') {
            let warning = document.getElementById('warning');
            if (warning) {
                warning.innerHTML += 'WARNING: ' + warning + '<br />';
            }
        }
    }
    /**
     * Add something to the debug log. If available a JavaScript debug console is used. Otherwise
     * we're looking for a HTML div with id "debug". If this doesn't exist, too, the output is omitted.
     * @param s An arbitrary number of parameters.
     * @see this.debugWST
     */
    static debugInt(...s) {
        for (let i = 0; i < arguments.length; i++) {
            let p = arguments[i];
            if (window) {
                if (typeof window === 'object' && window.console && console.log) {
                    console.log(p);
                }
            }
            else if (document) {
                if (typeof document === 'object') {
                    let debug = document.getElementById('debug');
                    if (debug) {
                        debug.innerHTML += p + '<br/>';
                    }
                }
            }
        }
    }
    /**
     * Add something to the debug log. If available a JavaScript debug console is used. Otherwise
     * we're looking for a HTML div with id "debug". If this doesn't exist, too, the output is omitted.
     * This method adds a stack trace (if available).
     * @param s An arbitrary number of parameters.
     * @see this.debug
     */
    static debugWST(...s) {
        var e = new Error();
        for (let i = 0; i < arguments.length; i++) {
            this.debugInt.apply(this, arguments[i]);
        }
        if (e && e.stack) {
            this.debugInt('stacktrace');
            this.debugInt(e.stack.split('\n').slice(1).join('\n'));
        }
    }
    /**
     * Add something to the debug log. If available a JavaScript debug console is used. Otherwise
     * we're looking for a HTML div with id "debug". If this doesn't exist, too, the output is omitted.
     * This method adds a line of the stack trace (if available).
     *
     * @param s An arbitrary number of parameters.
     * @see this.debug
     */
    static debugLine(...s) {
        var e = new Error();
        for (let i = 0; i < arguments.length; i++) {
            this.debugInt.apply(this, arguments[i]);
        }
        if (e && e.stack) {
            this.debugInt('Called from', e.stack.split('\n').slice(2, 3).join('\n'));
        }
    }
    /**
     * Add something to the debug log. If available a JavaScript debug console is used. Otherwise
     * we're looking for a HTML div with id "debug". If this doesn't exist, too, the output is omitted.
     * @param s An arbitrary number of parameters.
     * @see this.debugWST
     * @see this.debugLine
     * @see this.debugInt
     */
    static debug(...s) {
        for (let i = 0; i < arguments.length; i++) {
            this.debugInt.apply(this, arguments[i]);
        }
    }
}
/**  Constant: the currently used JSXGraph version.  */
JXG.version = VERSION; // -dev  -beta ??
/**
 * Constant: the small gray version indicator in the top left corner of every JSXGraph board (if
 * showCopyright is not set to false on board creation).
 */
JXG.licenseText = `JSXGraph v${VERSION} \u00A9 jsxgraph.org`;
/**
 * JSXGraph logo: base64 data-URL of img/png/screen/jsxgraph-logo_black-square-solid.png
 */
JXG.licenseLogo = 'data:image/png;base64,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';
/**
 * Store a reference to every board in this central list. This will at some point
 * replace this.JSXGraph.boards.
 * @type Object
 */
JXG.boards = {};
/**
 * Store the available file readers in this structure.
 * @type Object
 */
JXG.readers = {};
/**
 * Associative array that keeps track of all constructable elements registered
 * via {@link this.registerElement}.
 * @type Object
 */
JXG.elements = {};
JXG.themes = {};
