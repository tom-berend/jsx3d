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

/*
* In TypeScript, the concept of a "static class" as it exists in languages like C# (where you explicitly
* declare a class with the static keyword) does not directly apply. In TypeScript (and JavaScript), you
* cannot declare an entire class as static.
*
 * Instead, you achieve a similar effect by making all members (properties and methods) within a class
 * static. This means that these members belong to the class itself, rather than to instances of the class.
 * You can then access these members directly using the class name, without needing to create an object from
 * the class.
 *
 * JXG is a static class
*/




/*global JXG: true, define: true, jQuery: true, window: true, document: true, navigator: true, require: true, module: true, console: true */
/*jslint nomen:true, plusplus:true, forin:true*/

/**
 * @fileoverview The JSXGraph object is defined in this file. JSXGraph controls all boards.
 * It has methods to create, save, load and free boards. Additionally some helper functions are
 * defined in this file directly in the JXG namespace.
 */

// import { Board } from "./base/board.js"
// import { JSXGraph } from "./jsxgraph.js";
// import { Type, LooseObject } from "./utils/type.js";
// import { GeometryElement } from "./base/element.js";
// import {Text} from './base/text.js'
// import {Point} from './base/point.js'

// // calling the files this way lets them register their element
// import './base/text.js'
// import './base/point.js'
// import "./base/element.js";
// import "./options.js";


// TODO: this needs to be replace with real types
export interface LooseObject {
    [key: string]: any
}




///////// start of global function that pollute the namespace
///////// addresses 'temporal dead zone'
///////// fix is to remove registration and  reference every possible class

export var JXG_elements: LooseObject;

/**
 * This registers a new construction element to JSXGraph for the construction via the {@link this.Board.create}
 * interface.
 * @param {String} element The elements name. This is case-insensitive, existing elements with the same name
 * will be overwritten.
 * @param {Function} creator A reference to a function taking three parameters: First the board, the element is
 * to be created on, a parent element array, and an attributes object. See {@link this.createPoint} or any other
 * <tt>this.create...</tt> function for an example.
 */
export function JXG_registerElement(element: string, creator: Function) {
    if (JXG_elements == undefined) {   // static so must intialize
        JXG_elements = {}
    }

    element = element.toLowerCase();
    JXG_elements[element] = creator;
}

// export function JXG_createElement(elementType: string,parents:any[],attributes:object) {
//     if (!JXG_elements.hasOwnProperty(elementType)) {
//         throw new Error('JSXGraph: create: Unknown element type given: ' + elementType);
//     }

//     let el: GeometryElement
//     if (Type.isFunction(JXG_elements[elementType])) {
//         el = JXG_elements[elementType](this, parents, attributes);
//     } else {
//         throw new Error('JSXGraph: create: Unknown element type given: ' + elementType);
//     }

//     if (!Type.exists(el)) {
//         throw new Error('JSXGraph: create: failure creating ' + elementType);
//         // JXG.debug('JSXGraph: create: failure creating ' + elementType);
//         return el;
//     }
// }


///////// end of two global function that pollute the namespace




// this file now incorporates parts of constants.js, type.js

const VERSION = '1.12.1-beta';

/**
 * JXG is the top object of JSXGraph and defines the namespace
 */
export class JXG  {
    /**  Constant: the currently used JSXGraph version.  */
    static version = VERSION; // -dev  -beta ??



    /**
     * Store a reference to every board in this central list. This will at some point
     * replace this.JSXGraph.boards.
     * @type Object
     */
    static boards: object = {};

    /**
     * Store the available file readers in this structure.
     * @type Object
     */
    static readers: object = {};

    /**
     * Associative array that keeps track of all constructable elements registered
     * via {@link this.registerElement}.
     * @type Object
     */
    static elements: Object = {};

    static themes: Object = {};

    // We need the following two methods "extend" and "shortcut" to create the JXG object via this.extend.

    /**
     * Copy all properties of the <tt>extension</tt> object to <tt>object</tt>.
     * @param  object
     * @param  extension
     * @param  [onlyOwn=false] Only consider properties that belong to extension itself, not any inherited properties.
     * @param  [toLower=false] If true the keys are convert to lower case. This is needed for visProp, see JXG#copyAttributes
     */


    static extend(object: Object, extension: Object, onlyOwn: boolean=false, toLower: boolean=false) {
        var e, e2;

        console.warn ('Extend - Eliminate this')
        onlyOwn = onlyOwn || false;
        toLower = toLower || false;

        // the purpose of this for...in loop is indeed to use hasOwnProperty only if the caller
        // explicitly wishes so.
        for (e in extension) {
            if (!onlyOwn || (onlyOwn && extension.hasOwnProperty(e))) {
                if (toLower) {
                    e2 = e.toLowerCase();
                } else {
                    e2 = e;
                }

                object[e2] = extension[e];
            }
        }
    };

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
    static registerElement(element: string, creator: Function) {

        element = element.toLowerCase();
        this.elements[element] = creator;
    }

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

    static shortcut(obj: Object, funct: string) {
        return () => {
            obj[funct].apply(obj, funct);
        };
    }

    // /**
    //  * s may be a string containing the name or id of an element or even a reference
    //  * to the element itself. This function returns a reference to the element. Search order: id, name.
    //  * @param board Reference to the board the element belongs to.
    //  * @param s String or reference to a JSXGraph element.
    //  * @returns  Reference to the object given in parameter object
    //  * @deprecated Use {@link this.Board#select}
    //  */
    // static getRef(board: Board, s: string) {
    //     this.deprecated('this.getRef()', 'Board.select()');
    //     return board.select(s, false); //TODO second param should be unnecesary (default in select() -here and other p)
    // }

    // /**
    //  * This is just a shortcut to {@link this.getRef}.
    //  * @deprecated Use {@link this.Board#select}.
    //  */
    // static getReference(board: Board, s: string) {
    //     this.deprecated('this.getReference()', 'Board.select()');
    //     return board.select(s, false);
    // }

    /**
     * s may be the string containing the id of an HTML tag that hosts a JSXGraph board.
     * This function returns the reference to the board.
     * @param  s String of an HTML tag that hosts a JSXGraph board
     * @returns Reference to the board or null.
     */
    static getBoardByContainerId(s: string): Object | null {
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
    static deprecated(what: string, replacement: string) {
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
    static warn(warning: string) {
        if (typeof window === 'object' && window.console && console.warn) {
            console.warn('WARNING:', warning);
        } else if (typeof document === 'object') {
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
    static debugInt(...s: any[]) {
        for (let i = 0; i < arguments.length; i++) {
            let p = arguments[i];
            if (window) {
                if (typeof window === 'object' && window.console && console.log) {
                    console.log(p);
                }
            } else if (document) {
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
    static debugWST(...s: any[]) {
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
    static debugLine(...s: any[]) {
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
    static debug(...s: any[]) {
        // TODO  This is opaque without knowing who 'this' is

        for (let i = 0; i < arguments.length; i++) {
            console.warn(arguments[i])
            // this.debugInt.apply(this, arguments[i]);
        }
    }

    // static forcePreload(){
    //     throw new Error('should NEVER call this, it just forces object loading')
    //     let x:any

    //     let b = new Board('j','svg','preload',[0,0],1,1,1,1,1000,1000,{})
    //     x = new Text(b,[0,0],{},'preload')
    //     x = new Point(b,[0,0],{})
    // }

}
