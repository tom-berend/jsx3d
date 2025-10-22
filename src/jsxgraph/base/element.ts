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


import { JXG } from "../jxg.js";
import { Board } from "../base/board.js";
import { OBJECT_TYPE, OBJECT_CLASS, COORDS_BY } from "./constants.js";
import { Coords } from "./coords.js";
import { CoordsElement } from "./coordselement.js";
import { JSXMath } from "../math/jsxmath.js";
import {Statistics} from "../math/statistics.js";
import { Options } from "../options.js";
import { Events } from "../utils/event.js";
import { Color } from "../utils/color.js";
import { Type } from "../utils/type.js";



interface ShortcutAttributes {
    // these are the 'shortcuts' in options.js.  we don't define them, but TypeScript needs to know they exist

    /** color is a shortcut for  ['strokeColor', 'fillColor']  */
    color?: string | Function
    /** opacity is a shortcut for ['strokeOpacity', 'fillOpacity']  */
    opacity?: number | Function
    /** highlightColor is a shortcut for ['highlightStrokeColor', 'highlightFillColor']  */
    highlightColor?: string | Function
    /** highlightOpacity is a shortcut for ['highlightStrokeOpacity', 'highlightFillOpacity'] */
    highlightOpacity?: number | Function
    /** strokeWidth is a shortcut for ['strokeWidth', 'highlightStrokeWidth'] */
    strokeWidth?: number | Function
    /** the name of the object used in labels */

    name?: string | Function  // CAN'T FIND THIS AT ALL !?!
    /** size of the element in px */
    size?: number | Function  // CAN'T FIND THIS for POINT3D - not on inheritance path
    /** label attributes eg:  {position: 'top', offset: 10}  */
    label?: LabelAttributes
    /** use Katex for math notation */
    useKatex?: Boolean
    // /** why is this not in Line3D ?? */
    // lastArrow?: Boolean | Object
    // /** why is this not in ParallelPoint ?? */
    parallelpoint?: PointAttributes
}

export interface AriaAttributes {
    /** default false */
    enabled?: Boolean,
    /** default ''   */
    label?: string,
    /** Politeness setting.  default 'assertive'   */
    live?: string,
    /** ignore  ?? see Alfred comment in https://github.com/jsxgraph/jsxgraph/pull/737#event-16103541603 */
    ignore?: Boolean
}


export interface GeometryElementAttributes extends ShortcutAttributes {
    /** Apply CSS classes to an element in highlighted view. It is possible to supply one or more CSS classes separated by blanks. <p> For non-text and non-image elements, this feature is available for the SVG renderer, only. */
    highlightCssClass?: string
    /** If this is set to true, the element is updated in every update call of the board. If set to false, the element is updated only after zoom events or more generally, when the bounding box has been changed. Examples for the latter behavior should be axes. */
    needsRegularUpdate?: Boolean
    /** Precision options for JSXGraph elements. This attributes takes either the value 'inherit' or an object of the form: <pre> precision: { touch: 30, mouse: 4, pen: 4 } </pre> In the first case, the global, JSXGraph-wide values of JXGraph.Options.precision are taken. */
    precision?: string
    /** A private element will be inaccessible in certain environments, e.g. a graphical user interface. */
    priv?: Boolean
    /** Transition duration (in milliseconds) for certain cahnges of properties like color and opacity. The properties can be set in the attribute transitionProperties Works in SVG renderer, only. */
    transitionDuration?: number
    /** Properties which change smoothly in the time set in transitionDuration. Possible values are ['fill', 'fill-opacity', 'stroke', 'stroke-opacity', 'stroke-width', 'width', 'height', 'rx', 'ry'] (and maybe more) for geometry elements and ['color', 'opacity', 'all'] for HTML texts. */
    transitionProperties?: string[]
    /** ARIA settings for the element. */
    aria?: AriaAttributes
    /** Apply CSS classes to an element in non-highlighted view. */
    cssClass?: string
    /** Apply CSS classes to an element in non-highlighted view. */
    cssStyle?: string | Function
    /** The fill color of this geometry element. */
    fillColor?: string | Function
    /** Opacity for fill color. */
    fillOpacity?: number | Function
    /** The stroke color of the given geometry element. */
    strokeColor?: string | Function
    /** Opacity for element's stroke color. */
    strokeOpacity?: number | Function
    /** Width of the element's stroke. */
    strokeWidth?: number | Function
    /** If false the element won't be visible on the currentBoard, otherwise it is shown. */
    visible?: Boolean | Function
    /** Determines the elements border-style. Possible values are: 0 for a solid line 1 for a dotted line 2 for a line with small dashes 3 for a line with medium dashes 4 for a line with big dashes 5 for a line with alternating medium and big dashes and large gaps 6 for a line with alternating medium and big dashes and small gaps 7 for a dotted line. Needs JXG.GeometryElement#linecap set to ”round” for round dots.The dash patterns are defined in JXG.AbstractRenderer#dashArray. */
    dash?: number
    /** if true the element will be drawn in grey scale colors (as default) to visualize that it's only a draft. */
    draft?: Boolean
    /** If true the element is fixed and can not be dragged around. The element will be repositioned on zoom and moveOrigin events. */
    fixed?: Boolean
    /** If true a label will display the element's name. */
    withLabel?: Boolean
    /** If enabled:true the (stroke) element will get a customized shadow.Customize color and opacity: If the object's RGB stroke color is [r,g,b] and its opacity is op, and the shadow parameters color is given as [r', g', b'] and opacity as op' the shadow will receive the RGB color[blend*r + r', blend*g + g', blend*b + b']and its opacity will be equal to op * op'. Further, the parameters blur and offset can be adjusted.This attribute is only available with SVG, not with canvas. */
    shadow?: Object
    /** Snaps the element or its parents to the grid. Currently only relevant for points, circles, and lines. Points are snapped to grid directly, on circles and lines it's only the parent points that are snapped */
    snapToGrid?: Boolean
    /** If some size of an element is controlled by a function, like the circle radius or segments of fixed length, this attribute controls what happens if the value is negative. By default, the absolute value is taken. If true, the maximum of 0 and the value is used. */
    nonnegativeOnly?: Boolean
    /** If true, the dash pattern is multiplied by strokeWidth / 2. */
    dashScale?: Boolean
    /** If the element is dragged it will be moved on mousedown or touchstart to the top of its layer. Works only for SVG renderer and for simple elements consisting of one SVG node. */
    dragToTopOfLayer?: Boolean
    /** If true the element is fixed and can not be dragged around. The element will even stay at its position on zoom and moveOrigin events. Only free elements like points, texts, curves can be frozen. */
    frozen?: Boolean
    /** Gradient type. Possible values are 'linear'. 'radial' or null. */
    gradient?: 'linear' | 'radial' | 'null'
    /** Angle (in radians) of the gradiant in case the gradient is of type 'linear'. If the angle is 0, the first color is on the left and the second color is on the right. If the angle is π/2 the first color is on top and the second color at the bottom. */
    gradientAngle?: number
    /** From the SVG specification: ‘cx’, ‘cy’ and ‘r’ define the largest (i.e., outermost) circle for the radial gradient. The gradient will be drawn such that the 100% gradient stop is mapped to the perimeter of this largest (i.e., outermost) circle. For radial gradients in canvas this is the value 'x1'. Takes a value between 0 and 1. */
    gradientCX?: number
    /** From the SVG specification: ‘cx’, ‘cy’ and ‘r’ define the largest (i.e., outermost) circle for the radial gradient. The gradient will be drawn such that the 100% gradient stop is mapped to the perimeter of this largest (i.e., outermost) circle. For radial gradients in canvas this is the value 'y1'. Takes a value between 0 and 1. */
    gradientCY?: number
    /** The gradientEndOffset attribute is a number (ranging from 0 to 1) which indicates where the second gradient stop is placed, see the SVG specification for more information. For linear gradients, this attribute represents a location along the gradient vector. For radial gradients, it represents a percentage distance from (fx,fy) to the edge of the outermost/largest circle. */
    gradientEndOffset?: number
    /** This attribute defines the radius of the start circle of the radial gradient. The gradient will be drawn such that the 0% <stop> is mapped to the perimeter of the start circle. For radial gradients in canvas this is the value 'r0'. Takes a value between 0 and 1. */
    gradientFR?: number
    /** `fx` and `fy` define the focal point for the radial gradient. The gradient will be drawn such that the 0% gradient stop is mapped to (fx, fy). For radial gradients in canvas this is the value 'x0'. Takes a value between 0 and 1. */
    gradientFX?: number
    /** y-coordinate of the circle center for the second color in case of gradient 'radial'. (The attribute fy in SVG) For radial gradients in canvas this is the value 'y0'. Takes a value between 0 and 1. */
    gradientFY?: number
    /** From the SVG specification: ‘cx’, ‘cy’ and ‘r’ define the largest (i.e., outermost) circle for the radial gradient. The gradient will be drawn such that the 100% gradient stop is mapped to the perimeter of this largest (i.e., outermost) circle. For radial gradients in canvas this is the value 'r1'. Takes a value between 0 and 1. */
    gradientR?: number
    /** Second color for gradient. */
    gradientSecondColor?: String
    /** Opacity of second gradient color. Takes a value between 0 and 1. */
    gradientSecondOpacity?: number
    /** The gradientStartOffset attribute is a number (ranging from 0 to 1) which indicates where the first gradient stop is placed, see the SVG specification for more information. For linear gradients, this attribute represents a location along the gradient vector. For radial gradients, it represents a percentage distance from (fx,fy) to the edge of the outermost/largest circle. */
    gradientStartOffset?: number
    /** Should the element use highlight attributes on mouseOver? */
    highlight?: Boolean
    /** The fill color of the given geometry element when the mouse is pointed over it. */
    highlightFillColor?: string | Function
    /** Opacity for fill color when the object is highlighted. */
    highlightFillOpacity?: number | Function
    /** The stroke color of the given geometry element when the user moves the mouse over it. */
    highlightStrokeColor?: string | Function
    /** Opacity for stroke color when the object is highlighted. */
    highlightStrokeOpacity?: number | Function
    /** Width of the element's stroke when the mouse is pointed over it. */
    highlightStrokeWidth?: number | Function
    /** Display layer which will contain the element. */
    layer?: number
    /** Line endings (linecap) of a stroke element, i.e. line, circle, curve. Possible values are:'butt','round','square'. */
    lineCap?: 'butt' | 'round' | 'square'
    /** Determines whether two-finger manipulation may rotate this object. If set to false, the object can only be scaled and translated.In case the element is a polygon or line and it has the attribute ”rotatable:false”, moving the element with two fingers results in a rotation or translation.If an element is set to be neither scalable nor rotatable, it can only be translated.In case of a polygon, scaling is only possible if no vertex has snapToGrid or snapToPoints enabled and no vertex is fixed by some other constraint. Also, the polygon itself has to have snapToGrid disabled. */
    rotatable?: Boolean
    /** Determines whether two-finger manipulation of this object may change its size. If set to false, the object is only rotated and translated.In case the element is a horizontal or vertical line having ticks, ”scalable:true” enables zooming of the currentBoard by dragging ticks lines. This feature is enabled, for the ticks element of the line element the attribute ”fixed” has to be false and the line element's scalable attribute has to be true.In case the element is a polygon or line and it has the attribute ”scalable:false”, moving the element with two fingers results in a rotation or translation.If an element is set to be neither scalable nor rotatable, it can only be translated.In case of a polygon, scaling is only possible if no vertex has snapToGrid or snapToPoints enabled and no vertex is fixed by some other constraint. Also, the polygon itself has to have snapToGrid disabled. */
    scalable?: Boolean
    /** Controls if an element can get the focus with the tab key. tabindex corresponds to the HTML attribute of the same name. See descriptiona at MDN. The additional value ”null” completely disables focus of an element. The value will be ignored if keyboard control of the currentBoard is not enabled or the element is fixed or not visible. */
    tabindex?: number
    /** If true the element will be traced, i.e. on every movement the element will be copied to the background. Use JXG.GeometryElement#clearTrace to delete the trace elements.The calling of element.setAttribute({trace:false}) additionally deletes all traces of this element. By calling element.setAttribute({trace:'pause'}) the removal of already existing traces can be prevented.The visual appearance of the trace can be influenced by JXG.GeometryElement#traceAttributes. */
    trace?: Boolean
    /** Extra visual properties for traces of an element */
    // traceAttributes?: PointAttributes
}




export class GeometryElement extends Events {

    /**
     * Controls if updates are necessary
     * @type Boolean
     * @default true
     */
    public needsUpdate: Boolean = true;
    /**
     * Controls if this element can be dragged. In GEONExT only
     * free points and gliders can be dragged.
     * @type Boolean
     * @default false
     */
    public isDraggable = false;

    /**
     * If element is in two dimensional real space this is true, else false.
     * @type Boolean
     * @default true
     */
    public isReal = true;

    /**
     * Stores all dependent objects to be updated when this point is moved.
     * @type Object
     */
    public childElements = {};

    /**
     * If element has a label subelement then this property will be set to true.
     * @type Boolean
     * @default false
     */
    public hasLabel = false;

    /**
     * True, if the element is currently highlighted.
     * @type Boolean
     * @default false
     */
    public highlighted = false;

    /**
     * Stores all Intersection Objects which in this moment are not real and
     * so hide this element.
     * @type Object
     */
    public notExistingParents = {};

    /**
     * Keeps track of all objects drawn as part of the trace of the element.
     * @see JXG.GeometryElement#clearTrace
     * @see JXG.GeometryElement#numTraces
     * @type Object
     */
    public traces = {};

    /**
     * Counts the number of objects drawn as part of the trace of the element.
     * @see JXG.GeometryElement#clearTrace
     * @see JXG.GeometryElement#traces
     * @type Number
     */
    public numTraces = 0;

    /**
     * Stores the  transformations which are applied during update in an array
     * @type Array
     * @see JXG.Transformation
     */
    public transformations = [];

    /**
     * @type JXG.GeometryElement
     * @default null
     * @private
     */
    public baseElement = null;

    /**
     * Elements depending on this element are stored here.
     * @type Object
     */
    public descendants = {};

    /**
     * Elements on which this element depends on are stored here.
     * @type Object
     */
    public ancestors = {};

    /**
     * Ids of elements on which this element depends directly are stored here.
     * @type Object
     */
    public parents = [];

    /**
     * Stores variables for symbolic computations
     * @type Object
     */
    public symbolic = {};

    /**  Reference to the board associated with the element.   */
    public board: Board;

    /**  Type of the element.   */
    public type: number
    /**  Class of the element.   */
    public class: number

    /**
     * Original type of the element at construction time. Used for removing glider property.
     * @constant
     * @type Number
    */
    private _org_type: number;

    /**
     * The element's class.
     * @constant
     * @type Number
    */
    public elementClass: number

    /**
     * Unique identifier for the element. Equivalent to id-attribute of renderer element.
     * @type String
    */
    public id: string


    /**
     * Stores the SVG (or VML) rendering node for the element. This enables low-level
     * access to SVG nodes. The properties of such an SVG node can then be changed
     * by calling setAttribute(). Note that there are a few elements which consist
     * of more than one SVG nodes:
     * <ul>
     * <li> Elements with arrow tail or head: rendNodeTriangleStart, rendNodeTriangleEnd
     * <li> SVG (or VML) texts: rendNodeText
     * <li> Button: rendNodeForm, rendNodeButton, rendNodeTag
     * <li> Checkbox: rendNodeForm, rendNodeCheckbox, rendNodeLabel, rendNodeTag
     * <li> Input: rendNodeForm, rendNodeInput, rendNodeLabel, rendNodeTag
     * </ul>
     *
     * Here is are two examples: The first example shows how to access the SVG node,
     * the second example demonstrates how to change SVG attributes.
     * @example
     *     var p1 = board.create('point', [0, 0]);
     *     console.log(p1.rendNode);
     *     // returns the full SVG node details of the point p1, something like:
     *     // &lt;ellipse id='box_jxgBoard1P6' stroke='#ff0000' stroke-opacity='1' stroke-width='2px'
     *     //   fill='#ff0000' fill-opacity='1' cx='250' cy='250' rx='4' ry='4'
     *     //   style='position: absolute;'&gt;
     *     // &lt;/ellipse&gt;
     *
     * @example
     *     var s = board.create('segment', [p1, p2], {strokeWidth: 60});
     *     s.rendNode.setAttribute('stroke-linecap', 'round');
     *
     * @type Object
     */
    public rendNode = null;

    /**
     * Storage for HTMLElements for arrows
     */
    public rendNodeTriangleStart = null
    /**
     * Storage for HTMLElements for arrows
     */
    public rendNodeTriangleEnd = null


    /**
     * The string used with {@link JXG.Board#create}
     * @type String
     */
    public elType = "";

    /**
     * The element is saved with an explicit entry in the file (<tt>true</tt>) or implicitly
     * via a composition.
     * @type Boolean
     * @default true
     */
    public dump = true;

    /**
     * Subs contains the subelements, created during the create method.
     * @type Object
     */
    public subs = {};

    /**
     * Inherits contains the subelements, which may have an attribute
     * (in particular the attribute "visible") having value 'inherit'.
     * @type Object
     */
    public inherits = [];

    /**
     * The position of this element inside the {@link JXG.Board#objectsList}.
     * @type Number
     * @default -1
     * @private
     */
    public _pos = -1;

    /**
     * [c, b0, b1, a, k, r, q0, q1]
     *
     * See
     * A.E. Middleditch, T.W. Stacey, and S.B. Tor:
     * "Intersection Algorithms for Lines and Circles",
     * ACM Transactions on Graphics, Vol. 8, 1, 1989, pp 25-40.
     *
     * The meaning of the parameters is:
     * Circle: points p=[p0, p1] on the circle fulfill
     *  a&lt;p, p&gt; + &lt;b, p&gt; + c = 0
     * For convenience we also store
     *  r: radius
     *  k: discriminant = sqrt(&lt;b,b&gt;-4ac)
     *  q=[q0, q1] center
     *
     * Points have radius = 0.
     * Lines have radius = infinity.
     * b: normalized vector, representing the direction of the line.
     *
     * Should be put into Coords, when all elements possess Coords.
     */
    public stdform: number[] = [1, 0, 0, 0, 1, 1, 0, 0];

    /**
     * The methodMap determines which methods can be called from within JessieCode and under which name it
     * can be used. The map is saved in an object, the name of a property is the name of the method used in JessieCode,
     * the value of a property is the name of the method in JavaScript.
     * @type Object
     */
    public methodMap = {
        setLabel: "setLabel",
        label: "label",
        setName: "setName",
        getName: "getName",
        Name: "getName",
        addTransform: "addTransform",
        setProperty: "setAttribute",
        setAttribute: "setAttribute",
        addChild: "addChild",
        animate: "animate",
        on: "on",
        off: "off",
        trigger: "trigger",
        addTicks: "addTicks",
        removeTicks: "removeTicks",
        removeAllTicks: "removeAllTicks",
        Bounds: "bounds"
    };

    /**
     * Quadratic form representation of circles (and conics)
     * @type Array
     * @default [[1,0,0],[0,1,0],[0,0,1]]
     */
    public quadraticform = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
    ];

    /**
     * An associative array containing all visual properties.
     * @type Object
     * @default empty object
     */
    public visProp = {};

    /**
     * An associative array containing visual properties which are calculated from
     * the attribute values (i.e. visProp) and from other constraints.
     * An example: if an intersection point does not have real coordinates,
     * visPropCalc.visible is set to false.
     * Additionally, the user can control visibility with the attribute "visible",
     * even by supplying a functions as value.
     *
     * @type Object
     * @default empty object
     */
    public visPropCalc = {
        visible: false
    };


    /**
     * Is the mouse over this element?
     * @type Boolean
     * @default false
    */
    public mouseover = false;

    /**
     * Time stamp containing the last time this element has been dragged.
     * @type Date
     * @default creation time
    */
    public lastDragTime = new Date();

    public view = null;



    /**
     * Constructs a new GeometryElement object.
     * @class This is the parent class for all geometry elements like points, circles, lines, curves...
     * @constructor
     * @param  board Reference to the board the element is constructed on.
     * @param {Object} attributes Hash of attributes and their values.
     * @param {Number} type Element type (a <tt>JXG.OBJECT_TYPE_</tt> value).
     * @param {Number} oclass The element's class (a <tt>JXG.OBJECT_CLASS_</tt> value).
     * @borrows JXG.EventEmitter#on as this.on
     * @borrows JXG.EventEmitter#off as this.off
     * @borrows JXG.EventEmitter#triggerEventHandlers as this.triggerEventHandlers
     * @borrows JXG.EventEmitter#eventHandlers as this.eventHandlers
     */
    constructor(board: Board, attributes: Object, type: OBJECT_TYPE, oclass: OBJECT_CLASS) {
        super() // eventify

        var name, key, attr;

        this.board = board;

        if (arguments.length > 0) {
            this.board = board;

            /**
             * Type of the element.
             * @constant
             * @type Number
                */
            this.type = type;

            /**
             * Original type of the element at construction time. Used for removing glider property.
             * @constant
             * @type Number
            */
            this._org_type = type;

            /**
             * The element's class.
             * @constant
             * @type Number
            */
            this.elementClass = oclass || OBJECT_CLASS.OTHER;

            // /**
            //  * Unique identifier for the element. Equivalent to id-attribute of renderer element.
            //  * @type String
            // */
            // this.id = attributes.id;

            name = attributes.name;
            /* If name is not set or null or even undefined, generate an unique name for this object */
            if (!Type.exists(name)) {
                name = this.board.generateName(this);
            }

            if (name !== "") {
                this.board.elementsByName[name] = this;
            }

            /**
             * Not necessarily unique name for the element.
             * @type String
             * @default Name generated by {@link JXG.Board#generateName}.
             * @see JXG.Board#generateName
            */
            this.name = name;

            this.needsRegularUpdate = attributes.needsregularupdate;

            // create this.visPropOld and set default values
            Type.clearVisPropOld(this);

            attr = this.resolveShortcuts(attributes);
            for (key in attr) {
                if (attr.hasOwnProperty(key)) {
                    this._set(key, attr[key]);
                }
            }

            this.visProp.draft = attr.draft && attr.draft.draft;
            //this.visProp.gradientangle = '270';
            // this.visProp.gradientsecondopacity = this.evalVisProp('fillopacity');
            //this.visProp.gradientpositionx = 0.5;
            //this.visProp.gradientpositiony = 0.5;
        }

        // EventEmitter.eventify(this);  // tb now handled by class hierarchy
    }
    /**
     * Add an element as a child to the current element. Can be used to model dependencies between geometry elements.
     * @param {JXG.GeometryElement} obj The dependent object.
     */
    addChild(obj) {
        var el, el2;

        this.childElements[obj.id] = obj;
        this.addDescendants(obj);  // TODO TomBerend removed this. Check if it is possible.
        obj.ancestors[this.id] = this;

        for (el in this.descendants) {
            if (this.descendants.hasOwnProperty(el)) {
                this.descendants[el].ancestors[this.id] = this;

                for (el2 in this.ancestors) {
                    if (this.ancestors.hasOwnProperty(el2)) {
                        this.descendants[el].ancestors[this.ancestors[el2].id] =
                            this.ancestors[el2];
                    }
                }
            }
        }

        for (el in this.ancestors) {
            if (this.ancestors.hasOwnProperty(el)) {
                for (el2 in this.descendants) {
                    if (this.descendants.hasOwnProperty(el2)) {
                        this.ancestors[el].descendants[this.descendants[el2].id] =
                            this.descendants[el2];
                    }
                }
            }
        }
        return this;
    }

    /**
     * @param {JXG.GeometryElement} obj The element that is to be added to the descendants list.
     * @private
     * @return this
    */
    // Adds the given object to the descendants list of this object and all its child objects.
    addDescendants(obj) {
        var el;

        this.descendants[obj.id] = obj;
        for (el in obj.childElements) {
            if (obj.childElements.hasOwnProperty(el)) {
                this.addDescendants(obj.childElements[el]);
            }
        }
        return this;
    }

    /**
     * Adds ids of elements to the array this.parents. This method needs to be called if some dependencies
     * can not be detected automatically by JSXGraph. For example if a function graph is given by a function
     * which refers to coordinates of a point, calling addParents() is necessary.
     *
     * @param {Array} parents Array of elements or ids of elements.
     * Alternatively, one can give a list of objects as parameters.
     * @returns {JXG.Object} reference to the object itself.
     *
     * @example
     * // Movable function graph
     * var A = board.create('point', [1, 0], {name:'A'}),
     *     B = board.create('point', [3, 1], {name:'B'}),
     *     f = board.create('functiongraph', function(x) {
     *          var ax = A.X(),
     *              ay = A.Y(),
     *              bx = B.X(),
     *              by = B.Y(),
     *              a = (by - ay) / ( (bx - ax) * (bx - ax) );
     *           return a * (x - ax) * (x - ax) + ay;
     *      } {fixed: false});
     * f.addParents([A, B]);
     * </pre><div class="jxgbox" id="JXG7c91d4d2-986c-4378-8135-24505027f251" style="width: 400px; height: 400px;"></div>
     * <script type="text/javascript">
     * (function() {
     *   var board = JXG.JSXGraph.initBoard('JXG7c91d4d2-986c-4378-8135-24505027f251', {boundingbox: [-1, 9, 9, -1], axis: true, showcopyright: false, shownavigation: false});
     *   var A = board.create('point', [1, 0], {name:'A'}),
     *       B = board.create('point', [3, 1], {name:'B'}),
     *       f = board.create('functiongraph', function(x) {
     *            var ax = A.X(),
     *                ay = A.Y(),
     *                bx = B.X(),
     *                by = B.Y(),
     *                a = (by - ay) / ( (bx - ax) * (bx - ax) );
     *             return a * (x - ax) * (x - ax) + ay;
     *        } {fixed: false});
     *   f.addParents([A, B]);
     * })();
     * </script><pre>
     *
     **/
    addParents(parents) {
        var i, len, par;

        if (Type.isArray(parents)) {
            par = parents;
        } else {
            par = arguments;
        }

        len = par.length;
        for (i = 0; i < len; ++i) {
            if (!Type.exists(par[i])) {
                continue;
            }
            if (Type.isId(this.board, par[i])) {
                this.parents.push(par[i]);
            } else if (Type.exists(par[i].id)) {
                this.parents.push(par[i].id);
            }
        }
        this.parents = Type.uniqueArray(this.parents);
    }

    /**
     * Sets ids of elements to the array this.parents.
     * First, this.parents is cleared. See {@link JXG.GeometryElement#addParents}.
     * @param {Array} parents Array of elements or ids of elements.
     * Alternatively, one can give a list of objects as parameters.
     * @returns {JXG.Object} reference to the object itself.
     **/
    setParents(parents) {
        this.parents = [];
        this.addParents(parents);
    }

    /**
     * Add dependence on elements in JessieCode functions.
     * @param {Array} function_array Array of functions containing potential properties "deps" with
     * elements the function depends on.
     * @returns {JXG.Object} reference to the object itself
     * @private
     */
    addParentsFromJCFunctions(function_array) {
        var i, e, obj;
        for (i = 0; i < function_array.length; i++) {
            for (e in function_array[i].deps) {
                obj = function_array[i].deps[e];
                this.addParents(obj);
                obj.addChild(this);
            }
        }
        return this;
    }

    /**
     * Remove an element as a child from the current element.
     * @param {JXG.GeometryElement} obj The dependent object.
     * @returns {JXG.Object} reference to the object itself
     */
    removeChild(obj) {
        //var el, el2;

        delete this.childElements[obj.id];
        this.removeDescendants(obj);
        delete obj.ancestors[this.id];

        /*
         // I do not know if these addDescendants stuff has to be adapted to removeChild. A.W.
        for (el in this.descendants) {
            if (this.descendants.hasOwnProperty(el)) {
                delete this.descendants[el].ancestors[this.id];

                for (el2 in this.ancestors) {
                    if (this.ancestors.hasOwnProperty(el2)) {
                        this.descendants[el].ancestors[this.ancestors[el2].id] = this.ancestors[el2];
                    }
                }
            }
        }

        for (el in this.ancestors) {
            if (this.ancestors.hasOwnProperty(el)) {
                for (el2 in this.descendants) {
                    if (this.descendants.hasOwnProperty(el2)) {
                        this.ancestors[el].descendants[this.descendants[el2].id] = this.descendants[el2];
                    }
                }
            }
        }
        */
        return this;
    }

    /**
     * Removes the given object from the descendants list of this object and all its child objects.
     * @param {JXG.GeometryElement} obj The element that is to be removed from the descendants list.
     * @private
     * @returns {JXG.Object} reference to the object itself
     */
    removeDescendants(obj) {
        var el;

        delete this.descendants[obj.id];
        for (el in obj.childElements) {
            if (obj.childElements.hasOwnProperty(el)) {
                this.removeDescendants(obj.childElements[el]);
            }
        }
        return this;
    }

    /**
     * Counts the direct children of an object without counting labels.
     * @private
     * @returns {number} Number of children
     */
    countChildren() {
        var prop,
            d,
            s = 0;

        d = this.childElements;
        for (prop in d) {
            if (d.hasOwnProperty(prop) && prop.indexOf("Label") < 0) {
                s++;
            }
        }
        return s;
    }

    /**
     * Returns the elements name. Used in JessieCode.
     * @returns {String}
     */
    getName() {
        return this.name;
    }

    /**
     * Add transformations to this element.
     * @param {JXG.Transformation|Array} transform Either one {@link JXG.Transformation}
     * or an array of {@link JXG.Transformation}s.
     * @returns {JXG.GeometryElement} Reference to the element.
     */
    addTransform(transform) {
        return this;
    }

    /**
     * Decides whether an element can be dragged. This is used in
     * {@link JXG.GeometryElement#setPositionDirectly} methods
     * where all parent elements are checked if they may be dragged, too.
     * @private
     * @returns {boolean}
     */
    draggable() {
        return (
            this.isDraggable &&
            !this.evalVisProp('fixed') &&
            // !this.visProp.frozen &&
            this.type !== Const.OBJECT_TYPE_GLIDER
        );
    }

    /**
     * Translates the object by <tt>(x, y)</tt>. In case the element is defined by points, the defining points are
     * translated, e.g. a circle constructed by a center point and a point on the circle line.
     * @param {Number} method The type of coordinates used here.
     * Possible values are {@link JXG.COORDS_BY_USER} and {@link JXG.COORDS_BY_SCREEN}.
     * @param {Array} coords array of translation vector.
     * @returns {JXG.GeometryElement} Reference to the element object.
     *
     * @see JXG.GeometryElement3D#setPosition2D
     */
    setPosition(method, coords) {
        var parents = [],
            el,
            i, len, t;

        if (!Type.exists(this.parents)) {
            return this;
        }

        len = this.parents.length;
        for (i = 0; i < len; ++i) {
            el = this.board.select(this.parents[i]);
            if (Type.isPoint(el)) {
                if (!el.draggable()) {
                    return this;
                }
                parents.push(el);
            }
        }

        if (coords.length === 3) {
            coords = coords.slice(1);
        }

        t = this.board.create("transform", coords, { type: "translate" });

        // We distinguish two cases:
        // 1) elements which depend on free elements, i.e. arcs and sectors
        // 2) other elements
        //
        // In the first case we simply transform the parents elements
        // In the second case we add a transform to the element.
        //
        len = parents.length;
        if (len > 0) {
            t.applyOnce(parents);

            // Handle dragging of a 3D element
            if (Type.exists(this.view) && this.view.elType === 'view3d') {
                for (i = 0; i < this.parents.length; ++i) {
                    // Search for the parent 3D element
                    el = this.view.select(this.parents[i]);
                    if (Type.exists(el.setPosition2D)) {
                        el.setPosition2D(t);
                    }
                }
            }

        } else {
            if (
                this.transformations.length > 0 &&
                this.transformations[this.transformations.length - 1].isNumericMatrix
            ) {
                this.transformations[this.transformations.length - 1].melt(t);
            } else {
                this.addTransform(t);
            }
        }

        /*
         * If - against the default configuration - defining gliders are marked as
         * draggable, then their position has to be updated now.
         */
        for (i = 0; i < len; ++i) {
            if (parents[i].type === Const.OBJECT_TYPE_GLIDER) {
                parents[i].updateGlider();
            }
        }

        return this;
    }

    /**
     * Moves an element by the difference of two coordinates.
     * @param {Number} method The type of coordinates used here.
     * Possible values are {@link JXG.COORDS_BY_USER} and {@link JXG.COORDS_BY_SCREEN}.
     * @param {Array} coords coordinates in screen/user units
     * @param {Array} oldcoords previous coordinates in screen/user units
     * @returns {JXG.GeometryElement} this element
     */
    setPositionDirectly(method, coords, oldcoords) {
        var c = new Coords(method, coords, this.board, false),
            oldc = new Coords(method, oldcoords, this.board, false),
            dc = Statistics.subtract(c.usrCoords, oldc.usrCoords);

        this.setPosition(JXG.COORDS_BY_USER, dc);

        return this;
    }

    /**
     * Array of strings containing the polynomials defining the element.
     * Used for determining geometric loci the groebner way.
     * @returns {Array} An array containing polynomials describing the locus of the current object.
     * @public
     */
    generatePolynomial() {
        return [];
    }

    /**
     * Animates properties for that object like stroke or fill color, opacity and maybe
     * even more later.
     * @param {Object} hash Object containing properties with target values for the animation.
     * @param {number} time Number of milliseconds to complete the animation.
     * @param {Object} [options] Optional settings for the animation:<ul><li>callback: A function that is called as soon as the animation is finished.</li></ul>
     * @returns {JXG.GeometryElement} A reference to the object
     */
    animate(hash, time, options) {
        options = options || {};
        var r,
            p,
            i,
            delay = this.board.attr.animationdelay,
            steps = Math.ceil(time / delay),
            self = this
        let animateColor = function (startRGB, endRGB, property) {
            var hsv1, hsv2, sh, ss, sv;
            hsv1 = Color.rgb2hsv(startRGB);
            hsv2 = Color.rgb2hsv(endRGB);

            sh = (hsv2[0] - hsv1[0]) / steps;
            ss = (hsv2[1] - hsv1[1]) / steps;
            sv = (hsv2[2] - hsv1[2]) / steps;
            self.animationData[property] = [];

            for (i = 0; i < steps; i++) {
                self.animationData[property][steps - i - 1] = Color.hsv2rgb(
                    hsv1[0] + (i + 1) * sh,
                    hsv1[1] + (i + 1) * ss,
                    hsv1[2] + (i + 1) * sv
                );
            }
        }
        let animateFloat = function (start, end, property, round) {
            var tmp, s;

            start = parseFloat(start);
            end = parseFloat(end);

            // we can't animate without having valid numbers.
            // And parseFloat returns NaN if the given string doesn't contain
            // a valid float number.
            if (isNaN(start) || isNaN(end)) {
                return;
            }

            s = (end - start) / steps;
            self.animationData[property] = [];

            for (i = 0; i < steps; i++) {
                tmp = start + (i + 1) * s;
                self.animationData[property][steps - i - 1] = round
                    ? Math.floor(tmp)
                    : tmp;
            }
        };

        this.animationData = {};

        for (r in hash) {
            if (hash.hasOwnProperty(r)) {
                p = r.toLowerCase();

                switch (p) {
                    case "strokecolor":
                    case "fillcolor":
                        animateColor(this.visProp[p], hash[r], p);
                        break;
                    case "size":
                        if (!Type.isPoint(this)) {
                            break;
                        }
                        animateFloat(this.visProp[p], hash[r], p, true);
                        break;
                    case "strokeopacity":
                    case "strokewidth":
                    case "fillopacity":
                        animateFloat(this.visProp[p], hash[r], p, false);
                        break;
                }
            }
        }

        this.animationCallback = options.callback;
        this.board.addAnimation(this);
        return this;
    }

    /**
     * General update method. Should be overwritten by the element itself.
     * Can be used sometimes to commit changes to the object.
     * @return {JXG.GeometryElement} Reference to the element
     */
    update() {
        if (this.evalVisProp('trace')) {
            this.cloneToBackground();
        }
        return this;
    }

    /**
     * Provide updateRenderer method.
     * @return {JXG.GeometryElement} Reference to the element
     * @private
     */
    updateRenderer() {
        return this;
    }

    /**
     * Run through the full update chain of an element.
     * @param  {Boolean} visible Set visibility in case the elements attribute value is 'inherit'. null is allowed.
     * @return {JXG.GeometryElement} Reference to the element
     * @private
     */
    fullUpdate(visible) {
        return this.prepareUpdate().update().updateVisibility(visible).updateRenderer();
    }

    /**
     * Show the element or hide it. If hidden, it will still exist but not be
     * visible on the board.
     * <p>
     * Sets also the display of the inherits elements. These can be
     * JSXGraph elements or arrays of JSXGraph elements.
     * However, deeper nesting than this is not supported.
     *
     * @param  {Boolean} val true: show the element, false: hide the element
     * @return {JXG.GeometryElement} Reference to the element
     * @private
     */
    setDisplayRendNode(val) {
        var i, len, s, len_s, obj;

        if (val === undefined) {
            val = this.visPropCalc.visible;
        }

        if (val === this.visPropOld.visible) {
            return this;
        }

        // Set display of the element itself
        this.board.renderer.display(this, val);

        // Set the visibility of elements which inherit the attribute 'visible'
        len = this.inherits.length;
        for (s = 0; s < len; s++) {
            obj = this.inherits[s];
            if (Type.isArray(obj)) {
                len_s = obj.length;
                for (i = 0; i < len_s; i++) {
                    if (
                        Type.exists(obj[i]) &&
                        Type.exists(obj[i].rendNode) &&
                        obj[i].evalVisProp('visible') === 'inherit'
                    ) {
                        obj[i].setDisplayRendNode(val);
                    }
                }
            } else {
                if (
                    Type.exists(obj) &&
                    Type.exists(obj.rendNode) &&
                    obj.evalVisProp('visible') === 'inherit'
                ) {
                    obj.setDisplayRendNode(val);
                }
            }
        }

        // Set the visibility of the label if it inherits the attribute 'visible'
        if (this.hasLabel && Type.exists(this.label) && Type.exists(this.label.rendNode)) {
            if (this.label.evalVisProp('visible') === "inherit") {
                this.label.setDisplayRendNode(val);
            }
        }

        return this;
    }

    /**
     * Hide the element. It will still exist but not be visible on the board.
     * Alias for "element.setAttribute({visible: false});"
     * @return {JXG.GeometryElement} Reference to the element
     */
    hide() {
        this.setAttribute({ visible: false });
        return this;
    }

    /**
     * Hide the element. It will still exist but not be visible on the board.
     * Alias for {@link JXG.GeometryElement#hide}
     * @returns {JXG.GeometryElement} Reference to the element
     */
    hideElement() {
        this.hide();
        return this;
    }

    /**
     * Make the element visible.
     * Alias for "element.setAttribute({visible: true});"
     * @return {JXG.GeometryElement} Reference to the element
     */
    show() {
        this.setAttribute({ visible: true });
        return this;
    }

    /**
     * Make the element visible.
     * Alias for {@link JXG.GeometryElement#show}
     * @returns {JXG.GeometryElement} Reference to the element
     */
    showElement() {
        this.show();
        return this;
    }

    /**
     * Set the visibility of an element. The visibility is influenced by
     * (listed in ascending priority):
     * <ol>
     * <li> The value of the element's attribute 'visible'
     * <li> The visibility of a parent element. (Example: label)
     * This overrules the value of the element's attribute value only if
     * this attribute value of the element is 'inherit'.
     * <li> being inside of the canvas
     * </ol>
     * <p>
     * This method is called three times for most elements:
     * <ol>
     * <li> between {@link JXG.GeometryElement#update}
     * and {@link JXG.GeometryElement#updateRenderer}. In case the value is 'inherit', nothing is done.
     * <li> Recursively, called by itself for child elements. Here, 'inherit' is overruled by the parent's value.
     * <li> In {@link JXG.GeometryElement#updateRenderer} if the element is outside of the canvas.
     * </ol>
     *
     * @param  {Boolean} parent_val Visibility of the parent element.
     * @return {JXG.GeometryElement} Reference to the element.
     * @private
     */
    updateVisibility(parent_val) {
        var i, len, s, len_s, obj, val;

        if (this.needsUpdate) {
            if (Type.exists(this.view) && this.view.evalVisProp('visible') === false) {
                // Handle hiding of view3d
                this.visPropCalc.visible = false;

            } else {
                // Handle the element
                if (parent_val !== undefined) {
                    this.visPropCalc.visible = parent_val;
                } else {
                    val = this.evalVisProp('visible');

                    // infobox uses hiddenByParent
                    if (Type.exists(this.hiddenByParent) && this.hiddenByParent) {
                        val = false;
                    }
                    if (val !== "inherit") {
                        this.visPropCalc.visible = val;
                    }
                }

                // Handle elements which inherit the visibility
                len = this.inherits.length;
                for (s = 0; s < len; s++) {
                    obj = this.inherits[s];
                    if (Type.isArray(obj)) {
                        len_s = obj.length;
                        for (i = 0; i < len_s; i++) {
                            if (
                                Type.exists(obj[i]) /*&& Type.exists(obj[i].rendNode)*/ &&
                                obj[i].evalVisProp('visible') === "inherit"
                            ) {
                                obj[i]
                                    .prepareUpdate()
                                    .updateVisibility(this.visPropCalc.visible);
                            }
                        }
                    } else {
                        if (
                            Type.exists(obj) /*&& Type.exists(obj.rendNode)*/ &&
                            obj.evalVisProp('visible') === "inherit"
                        ) {
                            obj.prepareUpdate().updateVisibility(this.visPropCalc.visible);
                        }
                    }
                }
            }

            // Handle the label if it inherits the visibility
            if (
                Type.exists(this.label) &&
                Type.exists(this.label.visProp) &&
                this.label.evalVisProp('visible')
            ) {
                this.label.prepareUpdate().updateVisibility(this.visPropCalc.visible);
            }
        }
        return this;
    }

    /**
     * Sets the value of attribute <tt>key</tt> to <tt>value</tt>.
     * Here, mainly hex strings for rga(a) colors are parsed and values of type object get a special treatment.
     * Other values are just set to the key.
     *
     * @param {String} key The attribute's name.
     * @param value The new value
     * @private
     */
    _set(key, value) {
        var el;

        key = key.toLocaleLowerCase();

        // Search for entries in visProp with "color" as part of the key name
        // and containing a RGBA string
        if (
            this.visProp.hasOwnProperty(key) &&
            key.indexOf("color") >= 0 &&
            Type.isString(value) &&
            value.length === 9 &&
            value.charAt(0) === "#"
        ) {
            value = Color.rgba2rgbo(value);
            this.visProp[key] = value[0];
            // Previously: *=. But then, we can only decrease opacity.
            this.visProp[key.replace("color", "opacity")] = value[1];
        } else {
            if (
                value !== null &&
                Type.isObject(value) &&
                !Type.exists(value.id) &&
                !Type.exists(value.name)
            ) {
                // value is of type {prop: val, prop: val,...}
                // Convert these attributes to lowercase, too
                this.visProp[key] = {};
                for (el in value) {
                    if (value.hasOwnProperty(el)) {
                        this.visProp[key][el.toLocaleLowerCase()] = value[el];
                    }
                }
            } else {
                this.visProp[key] = value;
            }
        }
    }

    /**
     * Resolves attribute shortcuts like <tt>color</tt> and expands them, e.g. <tt>strokeColor</tt> and <tt>fillColor</tt>.
     * Writes the expanded attributes back to the given <tt>attributes</tt>.
     * @param {Object} attributes object
     * @returns {Object} The given attributes object with shortcuts expanded.
     * @private
     */
    resolveShortcuts(attributes) {
        var key, i, j,
            subattr = ["traceattributes", "traceAttributes"];

        for (key in Options.shortcuts) {
            if (Options.shortcuts.hasOwnProperty(key)) {
                if (Type.exists(attributes[key])) {
                    for (i = 0; i < Options.shortcuts[key].length; i++) {
                        if (!Type.exists(attributes[Options.shortcuts[key][i]])) {
                            attributes[Options.shortcuts[key][i]] = attributes[key];
                        }
                    }
                }
                for (j = 0; j < subattr.length; j++) {
                    if (Type.isObject(attributes[subattr[j]])) {
                        attributes[subattr[j]] = this.resolveShortcuts(attributes[subattr[j]]);
                    }
                }
            }
        }
        return attributes;
    }

    /**
     * Sets a label and its text
     * If label doesn't exist, it creates one
     * @param {String} str
     */
    setLabel(str) {
        if (!this.hasLabel) {
            this.setAttribute({ withlabel: true });
        }
        this.setLabelText(str);
    }

    /**
     * Updates the element's label text, strips all html.
     * @param {String} str
     */
    setLabelText(str) {
        if (Type.exists(this.label)) {
            str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            this.label.setText(str);
        }

        return this;
    }

    /**
     * Updates the element's label text and the element's attribute "name", strips all html.
     * @param {String} str
     */
    setName(str) {
        str = str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        if (this.elType !== "slider") {
            this.setLabelText(str);
        }
        this.setAttribute({ name: str });
    }

    /**
     * Deprecated alias for {@link JXG.GeometryElement#setAttribute}.
     * @deprecated Use {@link JXG.GeometryElement#setAttribute}.
     */
    setProperty() {
        JXG.deprecated("setProperty()", "setAttribute()");
        this.setAttribute.apply(this, arguments);
    }

    /**
     * Sets an arbitrary number of attributes. This method has one or more
     * parameters of the following types:
     * <ul>
     * <li> object: {key1:value1,key2:value2,...}
     * <li> string: 'key:value'
     * <li> array: ['key', value]
     * </ul>
     * @param {Object} attributes An object with attributes.
     * @returns {JXG.GeometryElement} A reference to the element.
     *
     * @function
     * @example
     * // Set attribute directly on creation of an element using the attributes object parameter
     * var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-1, 5, 5, 1]};
     * var p = board.create('point', [2, 2], {visible: false});
     *
     * // Now make this point visible and fixed:
     * p.setAttribute({
     *     fixed: true,
     *     visible: true
     * });
     */
    setAttribute(attr) {
        var i, j, le, key, value, arg,
            opacity, pair, oldvalue,
            attributes = {};

        // Normalize the user input
        for (i = 0; i < arguments.length; i++) {
            arg = arguments[i];
            if (Type.isString(arg)) {
                // pairRaw is string of the form 'key:value'
                pair = arg.split(":");
                attributes[Type.trim(pair[0])] = Type.trim(pair[1]);
            } else if (!Type.isArray(arg)) {
                // pairRaw consists of objects of the form {key1:value1,key2:value2,...}
                JXG.extend(attributes, arg);
            } else {
                // pairRaw consists of array [key,value]
                attributes[arg[0]] = arg[1];
            }
        }

        // Handle shortcuts
        attributes = this.resolveShortcuts(attributes);

        for (i in attributes) {
            if (attributes.hasOwnProperty(i)) {
                key = i.replace(/\s+/g, "").toLowerCase();
                value = attributes[i];

                // This handles the subobjects, if the key:value pairs are contained in an object.
                // Example:
                // ticks.setAttribute({
                //      strokeColor: 'blue',
                //      label: {
                //          visible: false
                //      }
                // })
                // Now, only the supplied label attributes are overwritten.
                // Otherwise, the value of label would be {visible:false} only.
                if (Type.isObject(value) && Type.exists(this.visProp[key])) {
                    // this.visProp[key] = Type.merge(this.visProp[key], value);
                    if (!Type.isObject(this.visProp[key]) && value !== null && Type.isObject(value)) {
                        // Handle cases like key=firstarrow and
                        // firstarrow==false and value = { type:1 }.
                        // That is a primitive type is replaced by an object.
                        this.visProp[key] = {};
                    }
                    Type.mergeAttr(this.visProp[key], value);

                    // First, handle the special case
                    // ticks.setAttribute({label: {anchorX: "right", ..., visible: true});
                    if (this.type === Const.OBJECT_TYPE_TICKS && Type.exists(this.labels)) {
                        le = this.labels.length;
                        for (j = 0; j < le; j++) {
                            this.labels[j].setAttribute(value);
                        }
                    } else if (Type.exists(this[key])) {
                        // Attribute looks like: point1: {...}
                        // Handle this in the sub-element: this.point1.setAttribute({...})
                        if (Type.isArray(this[key])) {
                            for (j = 0; j < this[key].length; j++) {
                                this[key][j].setAttribute(value);
                            }
                        } else {
                            this[key].setAttribute(value);
                        }
                    } else {
                        // Cases like firstarrow: {...}
                        oldvalue = null;
                        this.triggerEventHandlers(["attribute:" + key], [oldvalue, value, this]);
                    }
                    continue;
                }

                oldvalue = this.visProp[key];
                switch (key) {
                    case "checked":
                        // checkbox Is not available on initial call.
                        if (Type.exists(this.rendNodeTag)) {
                            this.rendNodeCheckbox.checked = !!value;
                        }
                        break;
                    case "disabled":
                        // button, checkbox, input. Is not available on initial call.
                        if (Type.exists(this.rendNodeTag)) {
                            this.rendNodeTag.disabled = !!value;
                        }
                        break;
                    case "face":
                        if (Type.isPoint(this)) {
                            this.visProp.face = value;
                            this.board.renderer.changePointStyle(this);
                        }
                        break;
                    case "generatelabelvalue":
                        if (
                            this.type === Const.OBJECT_TYPE_TICKS &&
                            Type.isFunction(value)
                        ) {
                            this.generateLabelValue = value;
                        }
                        break;
                    case "gradient":
                        this.visProp.gradient = value;
                        this.board.renderer.setGradient(this);
                        break;
                    case "gradientsecondcolor":
                        value = Color.rgba2rgbo(value);
                        this.visProp.gradientsecondcolor = value[0];
                        this.visProp.gradientsecondopacity = value[1];
                        this.board.renderer.updateGradient(this);
                        break;
                    case "gradientsecondopacity":
                        this.visProp.gradientsecondopacity = value;
                        this.board.renderer.updateGradient(this);
                        break;
                    case "infoboxtext":
                        if (Type.isString(value)) {
                            this.infoboxText = value;
                        } else {
                            this.infoboxText = false;
                        }
                        break;
                    case "labelcolor":
                        value = Color.rgba2rgbo(value);
                        opacity = value[1];
                        value = value[0];
                        if (opacity === 0) {
                            if (Type.exists(this.label) && this.hasLabel) {
                                this.label.hideElement();
                            }
                        }
                        if (Type.exists(this.label) && this.hasLabel) {
                            this.label.visProp.strokecolor = value;
                            this.board.renderer.setObjectStrokeColor(
                                this.label,
                                value,
                                opacity
                            );
                        }
                        if (this.elementClass === OBJECT_CLASS.TEXT) {
                            this.visProp.strokecolor = value;
                            this.visProp.strokeopacity = opacity;
                            this.board.renderer.setObjectStrokeColor(this, value, opacity);
                        }
                        break;
                    case "layer":
                        this.board.renderer.setLayer(this, this.eval(value));
                        this._set(key, value);
                        break;
                    case "maxlength":
                        // input. Is not available on initial call.
                        if (Type.exists(this.rendNodeTag)) {
                            this.rendNodeTag.maxlength = !!value;
                        }
                        break;
                    case "name":
                        oldvalue = this.name;
                        delete this.board.elementsByName[this.name];
                        this.name = value;
                        this.board.elementsByName[this.name] = this;
                        break;
                    case "needsregularupdate":
                        this.needsRegularUpdate = !(value === "false" || value === false);
                        this.board.renderer.setBuffering(
                            this,
                            this.needsRegularUpdate ? "auto" : "static"
                        );
                        break;
                    case "onpolygon":
                        if (this.type === Const.OBJECT_TYPE_GLIDER) {
                            this.onPolygon = !!value;
                        }
                        break;
                    case "radius":
                        if (
                            this.type === Const.OBJECT_TYPE_ANGLE ||
                            this.type === Const.OBJECT_TYPE_SECTOR
                        ) {
                            this.setRadius(value);
                        }
                        break;
                    case "rotate":
                        if (
                            (this.elementClass === OBJECT_CLASS.TEXT &&
                                this.evalVisProp('display') === "internal") ||
                            this.type === Const.OBJECT_TYPE_IMAGE
                        ) {
                            this.addRotation(value);
                        }
                        break;
                    case "tabindex":
                        if (Type.exists(this.rendNode)) {
                            this.rendNode.setAttribute("tabindex", value);
                            this._set(key, value);
                        }
                        break;
                    // case "ticksdistance":
                    //     if (this.type === Const.OBJECT_TYPE_TICKS && Type.isNumber(value)) {
                    //         this.ticksFunction = this.makeTicksFunction(value);
                    //     }
                    //     break;
                    case "trace":
                        if (value === "false" || value === false) {
                            this.clearTrace();
                            this.visProp.trace = false;
                        } else if (value === "pause") {
                            this.visProp.trace = false;
                        } else {
                            this.visProp.trace = true;
                        }
                        break;
                    case "visible":
                        if (value === "false") {
                            this.visProp.visible = false;
                        } else if (value === "true") {
                            this.visProp.visible = true;
                        } else {
                            this.visProp.visible = value;
                        }

                        this.setDisplayRendNode(this.evalVisProp('visible'));
                        if (
                            this.evalVisProp('visible') &&
                            Type.exists(this.updateSize)
                        ) {
                            this.updateSize();
                        }

                        break;
                    case "withlabel":
                        this.visProp.withlabel = value;
                        if (!this.evalVisProp('withlabel')) {
                            if (this.label && this.hasLabel) {
                                //this.label.hideElement();
                                this.label.setAttribute({ visible: false });
                            }
                        } else {
                            if (!this.label) {
                                this.createLabel();
                            }
                            //this.label.showElement();
                            this.label.setAttribute({ visible: "inherit" });
                            //this.label.setDisplayRendNode(this.evalVisProp('visible'));
                        }
                        this.hasLabel = value;
                        break;
                    case "straightfirst":
                    case "straightlast":
                        this._set(key, value);
                        for (j in this.childElements) {
                            if (this.childElements.hasOwnProperty(j) && this.childElements[j].elType === 'glider') {
                                this.childElements[j].fullUpdate();
                            }
                        }
                        break;
                    default:
                        if (Type.exists(this.visProp[key]) &&
                            (!JXG.Validator[key] ||                                   // No validator for this key => OK
                                (JXG.Validator[key] && JXG.Validator[key](value)) ||  // Value passes the validator => OK
                                (JXG.Validator[key] &&                                // Value is function, function value passes the validator => OK
                                    Type.isFunction(value) && JXG.Validator[key](value(this))
                                )
                            )
                        ) {
                            value = (value.toLowerCase && value.toLowerCase() === "false")
                                ? false
                                : value;
                            this._set(key, value);
                        } else {
                            if (!(key in Options.shortcuts)) {
                                JXG.warn("attribute '" + key + "' does not accept type '" + (typeof value) + "' of value " + value + ".");
                            }
                        }
                        break;
                }
                this.triggerEventHandlers(["attribute:" + key], [oldvalue, value, this]);
            }
        }

        this.triggerEventHandlers(["attribute"], [attributes, this]);

        if (!this.evalVisProp('needsregularupdate')) {
            this.board.fullUpdate();
        } else {
            this.board.update(this);
        }
        if (this.elementClass === OBJECT_CLASS.TEXT) {
            this.updateSize();
        }

        return this;
    }

    /**
     * Deprecated alias for {@link JXG.GeometryElement#getAttribute}.
     * @deprecated Use {@link JXG.GeometryElement#getAttribute}.
     */
    getProperty() {
        JXG.deprecated("getProperty()", "getAttribute()");
        this.getProperty.apply(this, arguments);
    }

    /**
     * Get the value of the property <tt>key</tt>.
     * @param {String} key The name of the property you are looking for
     * @returns The value of the property
     */
    getAttribute(key) {
        var result;
        key = key.toLowerCase();

        switch (key) {
            case "needsregularupdate":
                result = this.needsRegularUpdate;
                break;
            case "labelcolor":
                result = this.label.visProp.strokecolor;
                break;
            case "infoboxtext":
                result = this.infoboxText;
                break;
            case "withlabel":
                result = this.hasLabel;
                break;
            default:
                result = this.visProp[key];
                break;
        }

        return result;
    }

    /**
     * Get value of an attribute. If the value that attribute is a function, call the function and return its value.
     * In that case, the function is called with the GeometryElement as (only) parameter. For label elements (i.e.
     * if the attribute "islabel" is true), the anchor element is supplied. The label element can be accessed as
     * sub-object "label".
     * If the attribute does not exist, undefined will be returned.
     *
     * @param {String} key Attribute key
     * @returns {String|Number|Boolean} value of attribute "key" (evaluated in case of a function) or undefined
     *
     * @see GeometryElement#eval
     * @see JXG#evaluate
     */
    evalVisProp(key: string) {
        var val, arr, i, le,
            e, o, found;

        key = key.toLowerCase();
        if (key.indexOf('.') === -1) {
            // e.g. 'visible'
            val = this.visProp[key];
        } else {
            // e.g. label.visible
            arr = key.split('.');
            le = arr.length;
            val = this.visProp;
            for (i = 0; i < le; i++) {
                if (Type.exists(val)) {
                    val = val[arr[i]];
                }
            }
        }

        if (Type.isFunction(val)) {
            // For labels supply the anchor element as parameter.
            if (this.visProp.islabel === true && Type.exists(this.visProp.anchor)) {
                // 3D: supply the 3D element
                if (this.visProp.anchor.visProp.element3d !== null) {
                    return val(this.visProp.anchor.visProp.element3d);
                }
                // 2D: supply the 2D element
                return val(this.visProp.anchor);
            }
            // For 2D elements representing 3D elements, return the 3D element.
            if (Type.exists(this.visProp.element3d)) {
                return val(this.visProp.element3d);
            }
            // In all other cases, return the element itself
            return val(this);
        }
        // val is not of type function

        if (val === 'inherit') {
            for (e in this.descendants) {
                if (this.descendants.hasOwnProperty(e)) {
                    o = this.descendants[e];
                    // Check if this is in inherits of one of its descendant
                    found = false;
                    le = o.inherits.length;
                    for (i = 0; i < le; i++) {
                        if (this.id === o.inherits[i].id) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        val = o.evalVisProp(key);
                        break;
                    }
                }
            }
        }

        return val;
    }

    // /**
    //  * Get value of a parameter. If the parameter is a function, call the function and return its value.
    //  * In that case, the function is called with the GeometryElement as (only) parameter. For label elements (i.e.
    //  * if the attribute "islabel" is true), the anchor element is supplied. The label of an element can be accessed as
    //  * sub-object "label" then.
    //  *
    //  * @param {String|Number|Function|Object} val If not a function, it will be returned as is. If function it will be evaluated, where the GeometryElement is
    //  * supplied as the (only) parameter of that function.
    //  * @returns {String|Number|Object}
    //  *
    //  * @see GeometryElement#evalVisProp
    //  * @see JXG#evaluate
    //  */
    // jsxEval(val) {
    //     if (JXG.isFunction(val)) {
    //         // For labels supply the anchor element as parameter.
    //         if (this.visProp.islabel === true && Type.exists(this.visProp.anchor)) {
    //             // 3D: supply the 3D element
    //             if (this.visProp.anchor.visProp.element3d !== null) {
    //                 return val(this.visProp.anchor.visProp.element3d);
    //             }
    //             // 2D: supply the 2D element
    //             return val(this.visProp.anchor);
    //         }
    //         // For 2D elements representing 3D elements, return the 3D element.
    //         if (this.visProp.element3d !== null) {
    //             return val(this.visProp.element3d);
    //         }
    //         // In all other cases, return the element itself
    //         return val(this);
    //     }
    //     // val is not of type function
    //     return val;


    /**
     * Set the dash style of an object. See {@link JXG.GeometryElement#dash}
     * for a list of available dash styles.
     * You should use {@link JXG.GeometryElement#setAttribute} instead of this method.
     *
     * @param {number} dash Indicates the new dash style
     * @private
     */
    setDash(dash) {
        this.setAttribute({ dash: dash });
        return this;
    }

    /**
     * Notify all child elements for updates.
     * @private
     */
    prepareUpdate() {
        this.needsUpdate = true;
        return this;
    }

    /**
     * Removes the element from the construction.  This only removes the SVG or VML node of the element and its label (if available) from
     * the renderer, to remove the element completely you should use {@link JXG.Board#removeObject}.
     */
    remove() {
        // this.board.renderer.remove(this.board.renderer.getElementById(this.id));
        this.board.renderer.remove(this.rendNode);

        if (this.hasLabel) {
            this.board.renderer.remove(this.board.renderer.getElementById(this.label.id));
        }
        return this;
    }

    /**
     * Returns the coords object where a text that is bound to the element shall be drawn.
     * Differs in some cases from the values that getLabelAnchor returns.
     * @returns {JXG.Coords} JXG.Coords Place where the text shall be drawn.
     * @see JXG.GeometryElement#getLabelAnchor
     */
    getTextAnchor() {
        return new Coords(JXG.COORDS_BY_USER, [0, 0], this.board);
    }

    /**
     * Returns the coords object where the label of the element shall be drawn.
     * Differs in some cases from the values that getTextAnchor returns.
     * @returns {JXG.Coords} JXG.Coords Place where the text shall be drawn.
     * @see JXG.GeometryElement#getTextAnchor
     */
    getLabelAnchor() {
        return new Coords(JXG.COORDS_BY_USER, [0, 0], this.board);
    }

    /**
     * Determines whether the element has arrows at start or end of the arc.
     * If it is set to be a "typical" vector, ie lastArrow == true,
     * then the element.type is set to VECTOR.
     * @param {Boolean} firstArrow True if there is an arrow at the start of the arc, false otherwise.
     * @param {Boolean} lastArrow True if there is an arrow at the end of the arc, false otherwise.
     */
    setArrow(firstArrow, lastArrow) {
        this.visProp.firstarrow = firstArrow;
        this.visProp.lastarrow = lastArrow;
        if (lastArrow) {
            this.type = Const.OBJECT_TYPE_VECTOR;
            this.elType = "arrow";
        }

        this.prepareUpdate().update().updateVisibility().updateRenderer();
        return this;
    }

    /**
     * Creates a gradient nodes in the renderer.
     * @see JXG.SVGRenderer#setGradient
     * @private
     */
    createGradient() {
        var ev_g = this.evalVisProp('gradient');
        if (ev_g === "linear" || ev_g === "radial") {
            this.board.renderer.setGradient(this);
        }
    }

    /**
     * Creates a label element for this geometry element.
     * @see JXG.GeometryElement#addLabelToElement
     */
    createLabel() {
        var attr,
            that = this;

        // this is a dirty hack to resolve the text-dependency. If there is no text element available,
        // just don't create a label. This method is usually not called by a user, so we won't throw
        // an exception here and simply output a warning via JXG.debug.
        if (JXG.elements.text) {
            attr = Type.deepCopy(this.visProp.label, null);
            attr.id = this.id + "Label";
            attr.isLabel = true;
            attr.anchor = this;
            attr.priv = this.visProp.priv;

            if (this.visProp.withlabel) {
                this.label = JXG.elements.text(
                    this.board,
                    [
                        0,
                        0,
                        function () {
                            if (Type.isFunction(that.name)) {
                                return that.name(that);
                            }
                            return that.name;
                        }
                    ],
                    attr
                );
                this.label.needsUpdate = true;
                this.label.dump = false;
                this.label.fullUpdate();

                this.hasLabel = true;
            }
        } else {
            JXG.debug(
                "JSXGraph: Can't create label: text element is not available. Make sure you include base/text"
            );
        }

        return this;
    }

    /**
     * Highlights the element.
     * @private
     * @param {Boolean} [force=false] Force the highlighting
     * @returns {JXG.Board}
     */
    highlight(force) {
        force = Type.def(force, false);
        // I know, we have the JXG.Board.highlightedObjects AND JXG.GeometryElement.highlighted and YES we need both.
        // Board.highlightedObjects is for the internal highlighting and GeometryElement.highlighted is for user highlighting
        // initiated by the user, e.g. through custom DOM events. We can't just pick one because this would break user
        // defined highlighting in many ways:
        //  * if overriding the highlight() methods the user had to handle the highlightedObjects stuff, otherwise he'd break
        //    everything (e.g. the pie chart example https://jsxgraph.org/wiki/index.php/Pie_chart (not exactly
        //    user defined but for this type of chart the highlight method was overridden and not adjusted to the changes in here)
        //    where it just kept highlighting until the radius of the pie was far beyond infinity...
        //  * user defined highlighting would get pointless, everytime the user highlights something using .highlight(), it would get
        //    dehighlighted immediately, because highlight puts the element into highlightedObjects and from there it gets dehighlighted
        //    through dehighlightAll.

        // highlight only if not highlighted
        if (this.evalVisProp('highlight') && (!this.highlighted || force)) {
            this.highlighted = true;
            this.board.highlightedObjects[this.id] = this;
            this.board.renderer.highlight(this);
        }
        return this;
    }

    /**
     * Uses the "normal" properties of the element.
     * @returns {JXG.Board}
     */
    noHighlight() {
        // see comment in JXG.GeometryElement.highlight()

        // dehighlight only if not highlighted
        if (this.highlighted) {
            this.highlighted = false;
            delete this.board.highlightedObjects[this.id];
            this.board.renderer.noHighlight(this);
        }
        return this;
    }

    /**
     * Removes all objects generated by the trace function.
     */
    clearTrace() {
        var obj;

        for (obj in this.traces) {
            if (this.traces.hasOwnProperty(obj)) {
                this.board.renderer.remove(this.traces[obj]);
            }
        }

        this.numTraces = 0;
        return this;
    }

    /**
     * Copy the element to background. This is used for tracing elements.
     * @returns {JXG.GeometryElement} A reference to the element
     */
    cloneToBackground() {
        return this;
    }

    /**
     * Dimensions of the smallest rectangle enclosing the element.
     * @returns {Array} The coordinates of the enclosing rectangle in a format
     * like the bounding box in {@link JXG.Board#setBoundingBox}.
     *
     * @returns {Array} similar to {@link JXG.Board#setBoundingBox}.
     */
    bounds() {
        return [0, 0, 0, 0];
    }

    /**
     * Normalize the element's standard form.
     * @private
     */
    normalize() {
        this.stdform = Mat.normalize(this.stdform);
        return this;
    }

    /**
     * EXPERIMENTAL. Generate JSON object code of visProp and other properties.
     * @type String
     * @private
     * @ignore
     * @deprecated
     * @returns JSON string containing element's properties.
     */
    toJSON() {
        var vis,
            key,
            json = ['{"name":', this.name];

        json.push(", " + '"id":' + this.id);

        vis = [];
        for (key in this.visProp) {
            if (this.visProp.hasOwnProperty(key)) {
                if (Type.exists(this.visProp[key])) {
                    vis.push('"' + key + '":' + this.visProp[key]);
                }
            }
        }
        json.push(', "visProp":{' + vis.toString() + "}");
        json.push("}");

        return json.join("");
    }

    /**
     * Rotate texts or images by a given degree.
     * @param {number} angle The degree of the rotation (90 means vertical text).
     * @see JXG.GeometryElement#rotate
     */
    addRotation(angle) {
        var tOffInv,
            tOff,
            tS,
            tSInv,
            tRot,
            that = this;

        if (
            (this.elementClass === OBJECT_CLASS.TEXT ||
                this.type === Const.OBJECT_TYPE_IMAGE) &&
            angle !== 0
        ) {
            tOffInv = this.board.create(
                "transform",
                [
                    function () {
                        return -that.X();
                    },
                    function () {
                        return -that.Y();
                    }
                ],
                { type: "translate" }
            );

            tOff = this.board.create(
                "transform",
                [
                    function () {
                        return that.X();
                    },
                    function () {
                        return that.Y();
                    }
                ],
                { type: "translate" }
            );

            tS = this.board.create(
                "transform",
                [
                    function () {
                        return that.board.unitX / that.board.unitY;
                    },
                    function () {
                        return 1;
                    }
                ],
                { type: "scale" }
            );

            tSInv = this.board.create(
                "transform",
                [
                    function () {
                        return that.board.unitY / that.board.unitX;
                    },
                    function () {
                        return 1;
                    }
                ],
                { type: "scale" }
            );

            tRot = this.board.create(
                "transform",
                [
                    function () {
                        return (that.eval(angle) * Math.PI) / 180;
                    }
                    //TODO something missing here....
                ],
                { type: "rotate" }
            );

            tOffInv.bindTo(this);
            tS.bindTo(this);
            tRot.bindTo(this);
            tSInv.bindTo(this);
            tOff.bindTo(this);
        }

        return this;
    }

    /**
     * Set the highlightStrokeColor of an element
     * @ignore
     * @name JXG.GeometryElement#highlightStrokeColorMethod
     * @param {String} sColor String which determines the stroke color of an object when its highlighted.
     * @see JXG.GeometryElement#highlightStrokeColor
     * @deprecated Use {@link JXG.GeometryElement#setAttribute}
     */
    highlightStrokeColor(sColor) {
        JXG.deprecated("highlightStrokeColor()", "setAttribute()");
        this.setAttribute({ highlightStrokeColor: sColor });
        return this;
    }

    /**
     * Set the strokeColor of an element
     * @ignore
     * @name JXG.GeometryElement#strokeColorMethod
     * @param {String} sColor String which determines the stroke color of an object.
     * @see JXG.GeometryElement#strokeColor
     * @deprecated Use {@link JXG.GeometryElement#setAttribute}
     */
    strokeColor(sColor) {
        JXG.deprecated("strokeColor()", "setAttribute()");
        this.setAttribute({ strokeColor: sColor });
        return this;
    }

    /**
     * Set the strokeWidth of an element
     * @ignore
     * @name JXG.GeometryElement#strokeWidthMethod
     * @param {Number} width Integer which determines the stroke width of an outline.
     * @see JXG.GeometryElement#strokeWidth
     * @deprecated Use {@link JXG.GeometryElement#setAttribute}
     */
    strokeWidth(width) {
        JXG.deprecated("strokeWidth()", "setAttribute()");
        this.setAttribute({ strokeWidth: width });
        return this;
    }

    /**
     * Set the fillColor of an element
     * @ignore
     * @name JXG.GeometryElement#fillColorMethod
     * @param {String} fColor String which determines the fill color of an object.
     * @see JXG.GeometryElement#fillColor
     * @deprecated Use {@link JXG.GeometryElement#setAttribute}
     */
    fillColor(fColor) {
        JXG.deprecated("fillColor()", "setAttribute()");
        this.setAttribute({ fillColor: fColor });
        return this;
    }

    /**
     * Set the highlightFillColor of an element
     * @ignore
     * @name JXG.GeometryElement#highlightFillColorMethod
     * @param {String} fColor String which determines the fill color of an object when its highlighted.
     * @see JXG.GeometryElement#highlightFillColor
     * @deprecated Use {@link JXG.GeometryElement#setAttribute}
     */
    highlightFillColor(fColor) {
        JXG.deprecated("highlightFillColor()", "setAttribute()");
        this.setAttribute({ highlightFillColor: fColor });
        return this;
    }

    /**
     * Set the labelColor of an element
     * @ignore
     * @param {String} lColor String which determines the text color of an object's label.
     * @see JXG.GeometryElement#labelColor
     * @deprecated Use {@link JXG.GeometryElement#setAttribute}
     */
    labelColor(lColor) {
        JXG.deprecated("labelColor()", "setAttribute()");
        this.setAttribute({ labelColor: lColor });
        return this;
    }

    /**
     * Set the dash type of an element
     * @ignore
     * @name JXG.GeometryElement#dashMethod
     * @param {Number} d Integer which determines the way of dashing an element's outline.
     * @see JXG.GeometryElement#dash
     * @deprecated Use {@link JXG.GeometryElement#setAttribute}
     */
    dash(d) {
        JXG.deprecated("dash()", "setAttribute()");
        this.setAttribute({ dash: d });
        return this;
    }

    /**
     * Set the visibility of an element
     * @ignore
     * @name JXG.GeometryElement#visibleMethod
     * @param {Boolean} v Boolean which determines whether the element is drawn.
     * @see JXG.GeometryElement#visible
     * @deprecated Use {@link JXG.GeometryElement#setAttribute}
     */
    visible(v) {
        JXG.deprecated("visible()", "setAttribute()");
        this.setAttribute({ visible: v });
        return this;
    }

    /**
     * Set the shadow of an element
     * @ignore
     * @name JXG.GeometryElement#shadowMethod
     * @param {Boolean} s Boolean which determines whether the element has a shadow or not.
     * @see JXG.GeometryElement#shadow
     * @deprecated Use {@link JXG.GeometryElement#setAttribute}
     */
    shadow(s) {
        JXG.deprecated("shadow()", "setAttribute()");
        this.setAttribute({ shadow: s });
        return this;
    }

    /**
     * The type of the element as used in {@link JXG.Board#create}.
     * @returns {String}
     */
    getType() {
        return this.elType;
    }

    /**
     * List of the element ids resp. values used as parents in {@link JXG.Board#create}.
     * @returns {Array}
     */
    getParents() {
        return Type.isArray(this.parents) ? this.parents : [];
    }

    /**
     * @ignore
     * Snaps the element to the grid. Only works for points, lines and circles. Points will snap to the grid
     * as defined in their properties {@link JXG.Point#snapSizeX} and {@link JXG.Point#snapSizeY}. Lines and circles
     * will snap their parent points to the grid, if they have {@link JXG.Point#snapToGrid} set to true.
     * @private
     * @returns {JXG.GeometryElement} Reference to the element.
     */
    snapToGrid() {
        return this;
    }

    /**
     * Snaps the element to points. Only works for points. Points will snap to the next point
     * as defined in their properties {@link JXG.Point#attractorDistance} and {@link JXG.Point#attractorUnit}.
     * Lines and circles
     * will snap their parent points to points.
     * @private
     * @returns {JXG.GeometryElement} Reference to the element.
     */
    snapToPoints() {
        return this;
    }

    /**
     * Retrieve a copy of the current visProp.
     * @returns {Object}
     */
    getAttributes() {
        var attributes = Type.deepCopy(this.visProp),
            /*
            cleanThis = ['attractors', 'snatchdistance', 'traceattributes', 'frozen',
                'shadow', 'gradientangle', 'gradientsecondopacity', 'gradientpositionx', 'gradientpositiony',
                'needsregularupdate', 'zoom', 'layer', 'offset'],
            */
            cleanThis = [],
            i,
            len = cleanThis.length;

        attributes.id = this.id;
        attributes.name = this.name;

        for (i = 0; i < len; i++) {
            delete attributes[cleanThis[i]];
        }

        return attributes;
    }

    /**
     * Checks whether (x,y) is near the element.
     * @param {Number} x Coordinate in x direction, screen coordinates.
     * @param {Number} y Coordinate in y direction, screen coordinates.
     * @returns {Boolean} True if (x,y) is near the element, False otherwise.
     */
    hasPoint(x, y) {
        return false;
    }

    /**
     * Adds ticks to this line or curve. Ticks can be added to a curve or any kind of line: line, arrow, and axis.
     * @param {JXG.Ticks} ticks Reference to a ticks object which is describing the ticks (color, distance, how many, etc.).
     * @returns {String} Id of the ticks object.
     */
    addTicks(ticks) {
        if (ticks.id === "" || !Type.exists(ticks.id)) {
            ticks.id = this.id + "_ticks_" + (this.ticks.length + 1);
        }

        this.board.renderer.drawTicks(ticks);
        this.ticks.push(ticks);

        return ticks.id;
    }

    /**
     * Removes all ticks from a line or curve.
     */
    removeAllTicks() {
        var t;
        if (Type.exists(this.ticks)) {
            for (t = this.ticks.length - 1; t >= 0; t--) {
                this.removeTicks(this.ticks[t]);
            }
            this.ticks = [];
            this.board.update();
        }
    }

    /**
     * Removes ticks identified by parameter named tick from this line or curve.
     * @param {JXG.Ticks} tick Reference to tick object to remove.
     */
    removeTicks(tick) {
        var t, j;

        if (Type.exists(this.defaultTicks) && this.defaultTicks === tick) {
            this.defaultTicks = null;
        }

        if (Type.exists(this.ticks)) {
            for (t = this.ticks.length - 1; t >= 0; t--) {
                if (this.ticks[t] === tick) {
                    this.board.removeObject(this.ticks[t]);

                    if (this.ticks[t].ticks) {
                        for (j = 0; j < this.ticks[t].ticks.length; j++) {
                            if (Type.exists(this.ticks[t].labels[j])) {
                                this.board.removeObject(this.ticks[t].labels[j]);
                            }
                        }
                    }

                    delete this.ticks[t];
                    break;
                }
            }
        }
    }

    /**
     * Determine values of snapSizeX and snapSizeY. If the attributes
     * snapSizex and snapSizeY are greater than zero, these values are taken.
     * Otherwise, determine the distance between major ticks of the
     * default axes.
     * @returns {Array} containing the snap sizes for x and y direction.
     * @private
     */
    getSnapSizes() {
        var sX, sY, ticks;

        sX = this.evalVisProp('snapsizex');
        sY = this.evalVisProp('snapsizey');

        if (sX <= 0 && this.board.defaultAxes && this.board.defaultAxes.x.defaultTicks) {
            ticks = this.board.defaultAxes.x.defaultTicks;
            sX = ticks.ticksDelta * (ticks.evalVisProp('minorticks') + 1);
        }

        if (sY <= 0 && this.board.defaultAxes && this.board.defaultAxes.y.defaultTicks) {
            ticks = this.board.defaultAxes.y.defaultTicks;
            sY = ticks.ticksDelta * (ticks.evalVisProp('minorticks') + 1);
        }

        return [sX, sY];
    }

    /**
     * Move an element to its nearest grid point.
     * The function uses the coords object of the element as
     * its actual position. If there is no coords object or if the object is fixed, nothing is done.
     * @param {Boolean} force force snapping independent from what the snaptogrid attribute says
     * @param {Boolean} fromParent True if the drag comes from a child element. This is the case if a line
     *    through two points is dragged. In this case we do not try to force the points to stay inside of
     *    the visible board, but the distance between the two points stays constant.
     * @returns {JXG.GeometryElement} Reference to this element
     */
    handleSnapToGrid(force, fromParent) {
        var x, y, rx, ry, rcoords,
            mi, ma,
            boardBB, res, sX, sY,
            needsSnapToGrid = false,
            attractToGrid = this.evalVisProp('attracttogrid'),
            ev_au = this.evalVisProp('attractorunit'),
            ev_ad = this.evalVisProp('attractordistance');

        if (!Type.exists(this.coords) || this.evalVisProp('fixed')) {
            return this;
        }

        needsSnapToGrid =
            this.evalVisProp('snaptogrid') || attractToGrid || force === true;

        if (needsSnapToGrid) {
            x = this.coords.usrCoords[1];
            y = this.coords.usrCoords[2];
            res = this.getSnapSizes();
            sX = res[0];
            sY = res[1];

            // If no valid snap sizes are available, don't change the coords.
            if (sX > 0 && sY > 0) {
                boardBB = this.board.getBoundingBox();
                rx = Math.round(x / sX) * sX;
                ry = Math.round(y / sY) * sY;

                rcoords = new JXG.Coords(JXG.COORDS_BY_USER, [rx, ry], this.board);
                if (
                    !attractToGrid ||
                    rcoords.distance(
                        ev_au === "screen" ? JXG.COORDS_BY_SCREEN : JXG.COORDS_BY_USER,
                        this.coords
                    ) < ev_ad
                ) {
                    x = rx;
                    y = ry;
                    // Checking whether x and y are still within boundingBox.
                    // If not, adjust them to remain within the board.
                    // Otherwise a point may become invisible.
                    if (!fromParent) {
                        mi = Math.min(boardBB[0], boardBB[2]);
                        ma = Math.max(boardBB[0], boardBB[2]);
                        if (x < mi && x > mi - sX) {
                            x += sX;
                        } else if (x > ma && x < ma + sX) {
                            x -= sX;
                        }

                        mi = Math.min(boardBB[1], boardBB[3]);
                        ma = Math.max(boardBB[1], boardBB[3]);
                        if (y < mi && y > mi - sY) {
                            y += sY;
                        } else if (y > ma && y < ma + sY) {
                            y -= sY;
                        }
                    }
                    this.coords.setCoordinates(JXG.COORDS_BY_USER, [x, y]);
                }
            }
        }
        return this;
    }

    getBoundingBox() {
        var i, le, v,
            x, y, r,
            bb = [Infinity, Infinity, -Infinity, -Infinity];

        if (this.type === Const.OBJECT_TYPE_POLYGON) {
            le = this.vertices.length - 1;
            if (le <= 0) {
                return bb;
            }
            for (i = 0; i < le; i++) {
                v = this.vertices[i].X();
                bb[0] = v < bb[0] ? v : bb[0];
                bb[2] = v > bb[2] ? v : bb[2];
                v = this.vertices[i].Y();
                bb[1] = v < bb[1] ? v : bb[1];
                bb[3] = v > bb[3] ? v : bb[3];
            }
        } else if (this.elementClass === OBJECT_CLASS.CIRCLE) {
            x = this.center.X();
            y = this.center.Y();
            bb = [x - this.radius, y + this.radius, x + this.radius, y - this.radius];
        } else if (this.elementClass === OBJECT_CLASS.CURVE) {
            le = this.points.length;
            if (le === 0) {
                return bb;
            }
            for (i = 0; i < le; i++) {
                v = this.points[i].usrCoords[1];
                bb[0] = v < bb[0] ? v : bb[0];
                bb[2] = v > bb[2] ? v : bb[2];
                v = this.points[i].usrCoords[2];
                bb[1] = v < bb[1] ? v : bb[1];
                bb[3] = v > bb[3] ? v : bb[3];
            }
        } else if (this.elementClass === OBJECT_CLASS.POINT) {
            x = this.X();
            y = this.Y();
            r = this.evalVisProp('size');
            bb = [x - r / this.board.unitX, y - r / this.board.unitY, x + r / this.board.unitX, y + r / this.board.unitY];
        } else if (this.elementClass === OBJECT_CLASS.LINE) {
            v = this.point1.coords.usrCoords[1];
            bb[0] = v < bb[0] ? v : bb[0];
            bb[2] = v > bb[2] ? v : bb[2];
            v = this.point1.coords.usrCoords[2];
            bb[1] = v < bb[1] ? v : bb[1];
            bb[3] = v > bb[3] ? v : bb[3];

            v = this.point2.coords.usrCoords[1];
            bb[0] = v < bb[0] ? v : bb[0];
            bb[2] = v > bb[2] ? v : bb[2];
            v = this.point2.coords.usrCoords[2];
            bb[1] = v < bb[1] ? v : bb[1];
            bb[3] = v > bb[3] ? v : bb[3];
        }

        return bb;
    }

    // /**
    //  * Alias of {@link JXG.EventEmitter.on}.
    //  *
    //  * @name addEvent
    //  * @memberof JXG.GeometryElement
    //  * @function
    //  */
    // addEvent(){
    //     return JXG.shortcut(JXG.GeometryElement.prototype, 'on'),
    // }

    // /**
    //  * Alias of {@link JXG.EventEmitter.off}.
    //  *
    //  * @name removeEvent
    //  * @memberof JXG.GeometryElement
    //  * @function
    //  */
    // removeEvent(){
    //     return JXG.shortcut(JXG.GeometryElement.prototype, 'off'),
    // }

    /**
     * Format a number according to the locale set in the attribute "intl".
     * If in the options of the intl-attribute "maximumFractionDigits" is not set,
     * the optional parameter digits is used instead.
     * See <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat</a>
     * for more  information about internationalization.
     *
     * @param {Number} value Number to be formatted
     * @param {Number} [digits=undefined] Optional number of digits
     * @returns {String|Number} string containing the formatted number according to the locale
     * or the number itself of the formatting is not possible.
     */
    formatNumberLocale(value, digits) {
        var loc, opt, key,
            optCalc = {}
        // These options are case sensitive:
        let translate = {
            maximumfractiondigits: 'maximumFractionDigits',
            minimumfractiondigits: 'minimumFractionDigits',
            compactdisplay: 'compactDisplay',
            currencydisplay: 'currencyDisplay',
            currencysign: 'currencySign',
            localematcher: 'localeMatcher',
            numberingsystem: 'numberingSystem',
            signdisplay: 'signDisplay',
            unitdisplay: 'unitDisplay',
            usegrouping: 'useGrouping',
            roundingmode: 'roundingMode',
            roundingpriority: 'roundingPriority',
            roundingincrement: 'roundingIncrement',
            trailingzerodisplay: 'trailingZeroDisplay',
            minimumintegerdigits: 'minimumIntegerDigits',
            minimumsignificantdigits: 'minimumSignificantDigits',
            maximumsignificantdigits: 'maximumSignificantDigits'
        };

        if (Type.exists(Intl) &&
            this.useLocale()) {

            loc = this.evalVisProp('intl.locale') ||
                this.eval(this.board.attr.intl.locale);
            opt = this.evalVisProp('intl.options') || {};

            // Transfer back to camel case if necessary and evaluate
            for (key in opt) {
                if (opt.hasOwnProperty(key)) {
                    if (translate.hasOwnProperty(key)) {
                        optCalc[translate[key]] = this.eval(opt[key]);
                    } else {
                        optCalc[key] = this.eval(opt[key]);
                    }
                }
            }

            // If maximumfractiondigits is not set,
            // the value of the attribute "digits" is taken instead.
            key = 'maximumfractiondigits';
            if (!Type.exists(opt[key])) {
                optCalc[translate[key]] = digits;

                // key = 'minimumfractiondigits';
                // if (!this.eval(opt[key]) || this.eval(opt[key]) > digits) {
                //     optCalc[translate[key]] = digits;
                // }
            }

            return Intl.NumberFormat(loc, optCalc).format(value);
        }

        return value;
    }

    /**
     * Checks if locale is enabled in the attribute. This may be in the attributes of the board,
     * or in the attributes of the text. The latter has higher priority. The board attribute is taken if
     * attribute "intl.enabled" of the text element is set to 'inherit'.
     *
     * @returns {Boolean} if locale can be used for number formatting.
     */
    useLocale() {
        var val;

        // Check if element supports intl
        if (!Type.exists(this.visProp.intl) ||
            !Type.exists(this.visProp.intl.enabled)) {
            return false;
        }

        // Check if intl is supported explicitly enabled for this element
        val = this.evalVisProp('intl.enabled');

        if (val === true) {
            return true;
        }

        // Check intl attribute of the board
        if (val === 'inherit') {
            if (this.eval(this.board.attr.intl.enabled) === true) {
                return true;
            }
        }

        return false;
    }

    // /* **************************
    //  *     EVENT DEFINITION
    //  * for documentation purposes
    //  * ************************** */

    // //region Event handler documentation
    // /**
    //  * @event
    //  * @description This event is fired whenever the user is hovering over an element.
    //  * @name JXG.GeometryElement#over
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__over(e) { }

    // /**
    //  * @event
    //  * @description This event is fired whenever the user puts the mouse over an element.
    //  * @name JXG.GeometryElement#mouseover
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__mouseover(e) { }

    // /**
    //  * @event
    //  * @description This event is fired whenever the user is leaving an element.
    //  * @name JXG.GeometryElement#out
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__out(e) { }

    // /**
    //  * @event
    //  * @description This event is fired whenever the user puts the mouse away from an element.
    //  * @name JXG.GeometryElement#mouseout
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__mouseout(e) { }

    // /**
    //  * @event
    //  * @description This event is fired whenever the user is moving over an element.
    //  * @name JXG.GeometryElement#move
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__move(e) { }

    // /**
    //  * @event
    //  * @description This event is fired whenever the user is moving the mouse over an element.
    //  * @name JXG.GeometryElement#mousemove
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__mousemove(e) { }

    // /**
    //  * @event
    //  * @description This event is fired whenever the user drags an element.
    //  * @name JXG.GeometryElement#drag
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__drag(e) { }

    // /**
    //  * @event
    //  * @description This event is fired whenever the user drags the element with a mouse.
    //  * @name JXG.GeometryElement#mousedrag
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__mousedrag(e) { }

    // /**
    //  * @event
    //  * @description This event is fired whenever the user drags the element with a pen.
    //  * @name JXG.GeometryElement#pendrag
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__pendrag(e) { }

    // /**
    //  * @event
    //  * @description This event is fired whenever the user drags the element on a touch device.
    //  * @name JXG.GeometryElement#touchdrag
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__touchdrag(e) { }

    // /**
    //  * @event
    //  * @description This event is fired whenever the user drags the element by pressing arrow keys
    //  * on the keyboard.
    //  * @name JXG.GeometryElement#keydrag
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__keydrag(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user starts to touch or click an element.
    //  * @name JXG.GeometryElement#down
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__down(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user starts to click an element.
    //  * @name JXG.GeometryElement#mousedown
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__mousedown(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user taps an element with the pen.
    //  * @name JXG.GeometryElement#pendown
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__pendown(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user starts to touch an element.
    //  * @name JXG.GeometryElement#touchdown
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__touchdown(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user clicks on an element.
    //  * @name JXG.Board#click
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__click(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user double clicks on an element.
    //  * This event works on desktop browser, but is undefined
    //  * on mobile browsers.
    //  * @name JXG.Board#dblclick
    //  * @param {Event} e The browser's event object.
    //  * @see JXG.Board#clickDelay
    //  * @see JXG.Board#dblClickSuppressClick
    //  */
    // __evt__dblclick(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user clicks on an element with a mouse device.
    //  * @name JXG.Board#mouseclick
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__mouseclick(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user double clicks on an element with a mouse device.
    //  * @name JXG.Board#mousedblclick
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__mousedblclick(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user clicks on an element with a pointer device.
    //  * @name JXG.Board#pointerclick
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__pointerclick(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user double clicks on an element with a pointer device.
    //  * This event works on desktop browser, but is undefined
    //  * on mobile browsers.
    //  * @name JXG.Board#pointerdblclick
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__pointerdblclick(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user stops to touch or click an element.
    //  * @name JXG.GeometryElement#up
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__up(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user releases the mousebutton over an element.
    //  * @name JXG.GeometryElement#mouseup
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__mouseup(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user lifts the pen over an element.
    //  * @name JXG.GeometryElement#penup
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__penup(e) { }

    // /**
    //  * @event
    //  * @description Whenever the user stops touching an element.
    //  * @name JXG.GeometryElement#touchup
    //  * @param {Event} e The browser's event object.
    //  */
    // __evt__touchup(e) { }

    // /**
    //  * @event
    //  * @description Notify every time an attribute is changed.
    //  * @name JXG.GeometryElement#attribute
    //  * @param {Object} o A list of changed attributes and their new value.
    //  * @param {Object} el Reference to the element
    //  */
    // __evt__attribute(o, el) { }

    // /**
    //  * @event
    //  * @description This is a generic event handler. It exists for every possible attribute that can be set for
    //  * any element, e.g. if you want to be notified everytime an element's strokecolor is changed, is the event
    //  * <tt>attribute:strokecolor</tt>.
    //  * @name JXG.GeometryElement#attribute:key
    //  * @param val The old value.
    //  * @param nval The new value
    //  * @param {Object} el Reference to the element
    //  */
    // __evt__attribute_(val, nval, el) { }



}
