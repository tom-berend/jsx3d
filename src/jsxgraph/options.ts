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
    but WITHOUT ANY WARRAN
    TY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License and
    the MIT License along with JSXGraph. If not, see <https://www.gnu.org/licenses/>
    and <https://opensource.org/licenses/MIT/>.
 */

/*global JXG:true define: true*/
/*jslint nomen: true plusplus: true*/

import { JXG } from "./jxg.js";
import { Board } from "./base/board.js";
import { JSXMath } from "./math/jsxmath.js";
import { Color } from "./utils/color.js";
import { Type } from "./utils/type.js";

import {
    BoardOptions, GeometryElementOptions, GridOptions, LayerOptions,
    NavbarOptions, PointOptions, TextOptions, LegendOptions,
    TickOptions, CurveOptions, PrecisionOptions,
    HatchOptions, AngleOptions, ArcOptions, ArrowOptions,
    AxisOptions,
    BisectorOptions,
    BisectorlinesOptions,
    BoxplotOptions,
    CardinalsplineOptions,
    ChartOptions,
    CircleOptions,
    CircumcircleOptions,
    CircumcirclearcOptions,
} from "./optionInterfaces.js"

/**
 * Options Namespace
 * @description These are the default options of the board and of all geometry elements.
 * @namespace
 * @name JXG.Options
 */

// Board and GeometryElement extend Events.  CoordsElement extends Coords.



export class Options {

    static layer: LayerOptions = {
        numlayers: 20, // only important in SVG
        unused9: 19,
        unused8: 18,
        unused7: 17,
        unused6: 16,
        unused5: 15,
        unused4: 14,
        unused3: 13,
        unused2: 12,
        unused1: 11,
        unused0: 10,
        text: 9,
        point: 9,
        glider: 9,
        arc: 8,
        line: 7,
        circle: 6,
        curve: 5,
        turtle: 5,
        polygon: 3,
        sector: 3,
        angle: 3,
        integral: 3,
        axis: 2,
        ticks: 2,
        grid: 1,
        image: 0,
        trace: 0
    }


    static jc: {
        enabled: true
        compile: true
    }

    /*
     * Options that are used directly within the board class
     */
    static board: BoardOptions = {
        animationDelay: 35,
        axis: false,
        boundingBox: [-5, 5, 5, -5],
        browserPan: false,
        clickDelay: 600,
        dblClickSuppressClick: false,
        defaultAxes: {
            x: {
                name: 'x',
                fixed: true,
                needsRegularUpdate: false,
                ticks: {
                    label: {
                        visible: 'inherit',
                        anchorX: 'middle',
                        anchorY: 'top',
                        fontSize: 12,
                        offset: [0, -3]
                    },
                    tickEndings: [0, 1],
                    majorTickEndings: [1, 1],
                    drawZero: false,
                    visible: 'inherit'
                }
            },
            y: {
                name: 'y',
                fixed: true,
                needsRegularUpdate: false,
                ticks: {
                    label: {
                        visible: 'inherit',
                        anchorX: 'right',
                        anchorY: 'middle',
                        fontSize: 12,
                        offset: [-6, 0]
                    },
                    tickEndings: [1, 0],
                    majorTickEndings: [1, 1],
                    drawZero: false,
                    visible: 'inherit',
                }
            }
        },
        document: null,
        drag: { enabled: true },
        fullscreen: {
            symbol: '<svg height="1em" width="1em" version="1.1" viewBox="10 10 18 18"><path fill="#666" d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z"></path><path fill="#666" d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z"></path><path fill="#666" d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z"></path><path fill="#666" d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z"></path></svg>',
            // symbol: '\u26f6', // '\u26f6' (not supported by MacOS),
            scale: 0.85,
            id: null
        },
        ignoreLabels: true,
        intl: { enabled: false },
        keepAspectRatio: false,
        keyboard: { enabled: true, dx: 10, dy: 10, panShift: true, panCtrl: false },
        logging: { enabled: false },
        minimizeReflow: 'none',
        maxBoundingBox: [Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
        maxFrameRate: 40,
        maxNameLength: 1,
        moveTarget: null,
        offsetX: 0,
        offsetY: 0,
        pan: { enabled: true, needShift: true, needTwoFingers: false, },
        registerEvents: true,
        renderer: 'auto',
        resize: { enabled: true, throttle: 10, },
        screenshot: {
            scale: 1,
            type: 'png',
            symbol: '\u2318', //'\u22b9', //'\u26f6',
            css: 'background-color:#eeeeee; opacity:1.0; border:2px solid black; border-radius:10px; text-align:center',
            cssButton: 'padding: 4px 10px; border: solid #356AA0 1px; border-radius: 5px; position: absolute; right: 2ex; top: 2ex; background-color: rgba(255, 255, 255, 0.3);'
        },
        selection: {
            enabled: false, name: 'selectionPolygon', needShift: false, needCtrl: true, fillColor: '#ffff00',
            // immutable:
            visible: false, withLines: false, vertices: { visible: false, },
        },
        showClearTraces: false,
        showCopyright: true,
        showFullscreen: false,
        showInfobox: true,
        showLogo: false,
        showNavigation: true,
        showReload: false,
        showScreenshot: false,
        showZoom: true,
        takeFirst: false,
        takeSizeFromFile: false,
        theme: 'default',
        title: '',
        zoom: {
            enabled: true,
            factorX: 1.25,
            factorY: 1.25,
            wheel: true,
            needShift: true,
            center: 'auto',
            min: 0.0001,
            max: 10000.0,
            pinch: true,
            pinchHorizontal: true,
            pinchVertical: true,
            pinchSensitivity: 7,
        },
        zoomX: 1,
        zoomY: 1,
    }

    navbar: NavbarOptions = {
        strokeColor: '#333333',
        fillColor: 'transparent', //#f5f5f5',
        highlightFillColor: '#aaaaaa',
        padding: '2px',
        position: 'absolute',
        fontSize: '14px',
        cursor: 'pointer',
        zIndex: '100',
        right: '5px',
        bottom: '5px'
    }


    static elements: GeometryElementOptions = {

        aria: { enabled: false, label: '', live: 'assertive', },
        cssClass: '',
        highlightCssClass: '',
        dash: 0,
        dashScale: false,
        draft: { draft: false, strokeColor: '#565656', fillColor: '#565656', strokeOpacity: 0.8, fillOpacity: 0.8, strokeWidth: 1, },
        dragToTopOfLayer: false,
        element3D: null,
        fillColor: Color.palette.red,
        fillOpacity: 1,
        fixed: false,
        frozen: false,
        gradient: null,
        gradientAngle: 0,
        gradientCX: 0.5,
        gradientCY: 0.5,
        gradientEndOffset: 1.0,
        gradientFX: 0.5,
        gradientFY: 0.5,
        gradientFR: 0.0,
        gradientR: 0.5,
        gradientSecondColor: '#ffffff',
        gradientSecondOpacity: 1,
        gradientStartOffset: 0.0,
        highlight: true,
        highlightFillColor: 'none',
        highlightFillOpacity: 1,
        highlightStrokeColor: '#c3d9ff',
        highlightStrokeOpacity: 1,
        highlightStrokeWidth: 2,
        isLabel: false,
        layer: 0,
        lineCap: 'butt',
        needsRegularUpdate: true,
        nonnegativeOnly: false,
        precision: 'inherit',
        priv: false,
        rotatable: true,
        scalable: true,
        shadow: { enabled: false, color: [0, 0, 0], opacity: 1, blur: 3, blend: 0.1, offset: [5, 5] },
        snapToGrid: false,
        strokeColor: Color.palette.blue,
        strokeOpacity: 1,
        strokeWidth: 2,
        tabindex: -1,
        trace: false,
        traceAttributes: {},
        transitionDuration: 100,
        transitionProperties: ['fill', 'fill-opacity', 'stroke', 'stroke-opacity', 'stroke-width'],
        visible: true,
        withLabel: false,
        ignoreForLabelAutoposition: false
    }

    static text: TextOptions = {
        fontSize: 12,
        fontUnit: 'px',
        formatNumber: false,
        digits: 2,
        intl: {
            enabled: 'inherit',
            options: {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            }
        },
        parse: true,
        useCaja: false,
        isLabel: false,
        strokeColor: '#000000',
        highlightStrokeColor: '#000000',
        highlightStrokeOpacity: 0.666666,
        cssDefaultStyle: 'font-family: Arial, Helvetica, Geneva, sans-serif;',
        highlightCssDefaultStyle: 'font-family: Arial, Helvetica, Geneva, sans-serif;',
        cssStyle: '',
        highlightCssStyle: '',
        transitionProperties: ['color', 'opacity'],
        useASCIIMathML: false,
        useMathJax: false,
        useKatex: false,
        katexMacros: {},
        toFraction: false,
        display: 'html',
        anchor: null,
        anchorX: 'left',
        anchorY: 'middle',
        cssClass: 'JXGtext',
        highlightCssClass: 'JXGtext',
        dragArea: 'all',
        withLabel: false,
        rotate: 0,
        visible: true,
        snapSizeX: 1,
        snapSizeY: 1,
        attractors: []
    }


    static point: PointOptions = {
        withLabel: true,
        label: {},
        style: 5,
        face: 'o',
        size: 3,
        sizeUnit: 'screen',
        strokeWidth: 2,
        transitionProperties: ['fill', 'fill-opacity', 'stroke', 'stroke-opacity', 'stroke-width', 'width', 'height', 'rx', 'ry'],
        fillColor: Color.palette.red,
        strokeColor: Color.palette.red,
        highlightFillColor: '#c3d9ff',
        highlightStrokeColor: '#c3d9ff',
        zoom: false,
        showInfobox: 'inherit',
        infoboxDigits: 'auto',
        draft: false,
        attractors: [],
        attractorUnit: 'user',
        attractorDistance: 0.0,
        snatchDistance: 0.0,
        snapToGrid: false,
        attractToGrid: false,
        snapSizeX: 1,
        snapSizeY: 1,
        snapToPoints: false,
        ignoredSnapToPoints: [],
    }

    static grid: GridOptions = {
        needsRegularUpdate: false,
        hasGrid: false,  // Used in standardoptions
        highlight: false,
        majorStep: 'auto',
        minorElements: 0,
        forceSquare: false,
        includeBoundaries: false,
        size: undefined,
        face: undefined,
        margin: undefined,
        drawZero: undefined,
        polygonVertices: undefined,
        major: { size: 5, margin: 0, drawZero: true, polygonVertices: 6 },
        minor: { visible: 'inherit', size: 3, face: 'point', margin: 0, drawZero: true, polygonVertices: 6 },
        snapToGrid: false,
        strokeColor: '#c0c0c0',
        strokeWidth: 1,
        strokeOpacity: 0.5,
        dash: 0,
        theme: 0,
        themes: [
            {
                // default values
            },

            {   // Theme 1: quadratic grid appearance with distance of major grid elements in x- and y-direction set to the primarily smaller one
                forceSquare: 'min',
                major: {
                    face: 'line'
                }
            },

            {   // Theme 2: lines and points in between
                major: {
                    face: 'line'
                },
                minor: {
                    size: 3,
                    face: 'point'
                },
                minorElements: 'auto'
            },

            {   // Theme 3: lines and thinner lines in between
                major: {
                    face: 'line'
                },
                minor: {
                    face: 'line',
                    strokeOpacity: 0.25
                },
                minorElements: 'auto'
            },

            {   // Theme 4: lines with grid of '+'s plotted in between
                major: {
                    face: 'line'
                },
                minor: {
                    face: '+',
                    size: '95%'
                },
                minorElements: 'auto'
            },

            {   // Theme 5: grid of '+'s and more points in between
                major: {
                    face: '+',
                    size: 10,
                    strokeOpacity: 1
                },
                minor: {
                    face: 'point',
                    size: 3
                },
                minorElements: 'auto'
            },

            {   // Theme 6: grid of circles with points in between
                major: {
                    face: 'circle',
                    size: 8,
                    fillColor: '#c0c0c0'
                },
                minor: {
                    face: 'point',
                    size: 3
                },
                minorElements: 'auto'
            },
        ]
    }
    static label: LabelOptions = {
        /**#@+
         * @visprop
         */

        visible: 'inherit',
        strokeColor: '#000000',
        strokeOpacity: 1,
        highlightStrokeOpacity: 0.666666,
        highlightStrokeColor: '#000000',
        fixed: true,
        tabindex: null,
        position: 'urt',
        distance: 1.5,
        offset: [10, 10],
        autoPosition: false,
        autoPositionMinDistance: 12,
        autoPositionMaxDistance: 28,
        autoPositionWhitelist: []
    }

    /* special legend options */
    static legend: LegendOptions = {
        style: 'vertical',
        labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
        colors: ['#B02B2C', '#3F4C6B', '#C79810', '#D15600', '#FFFF88', '#c3d9ff', '#4096EE', '#008C00'],
        lineLength: 1,
        strokeOpacity: [1],
        rowHeight: 20,
        strokeWidth: 5,
        frozen: false,
    }









    /*
     *  Generic options used by {@link JXG.Ticks}
     */
    static ticks: TickOptions = {
        generateLabelText: null,
        generateLabelValue: null,
        drawLabels: false,
        label: { tabindex: null, layer: 7, highlight: false, autoPosition: false }, // line layer
        beautifulScientificTickLabels: false,
        useUnicodeMinus: true,
        anchor: 'left',
        drawZero: false,
        insertTicks: false,
        minTicksDistance: 10,
        minorHeight: 4,
        majorHeight: 10,
        tickEndings: [1, 1],
        majorTickEndings: [1, 1],
        ignoreInfiniteTickEndings: true,
        minorTicks: 4,
        ticksPerLabel: false,
        scale: 1,
        scaleSymbol: '',
        labels: [],
        maxLabelLength: 5,
        precision: 3,
        digits: 3,
        ticksDistance: 1,
        face: '|',
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeColor: '#000000',
        highlightStrokeColor: '#888888',
        fillColor: 'none',
        highlightFillColor: 'none',
        visible: 'inherit',
        includeBoundaries: false,
        type: 'linear',
        intl: {
            enabled: 'inherit',
            options: {}
        },

        // TODO implementation and documentation
        minorTicksInArrow: false,
        majorTicksInArrow: true,
        labelInArrow: true,
        minorTicksInMargin: false,
        majorTicksInMargin: true,
        labelInMargin: true,

        ignoreForLabelAutoposition: true,

        // close the meta tag
        /**#@-*/
    }

    /*
     *  Generic options used by {@link JXG.Hatch}
     */
    static hatch: HatchOptions = {
        drawLabels: false,
        drawZero: true,
        majorHeight: 20,
        anchor: 'middle',
        face: '|',
        strokeWidth: 2,
        strokeColor: Color.palette.blue,
        ticksDistance: 0.2
    }

    /**
     * Precision options, defining how close a pointer device (mouse, finger, pen) has to be
     * to an object such that the object is highlighted or can be dragged.
     * These values are board-wide and can be overwritten for individual elements by
     * changing their precision attribute.
     *
     * The default values are
     * <pre>
     * JXG.Options.precision: {
     *   touch: 30,
     *   touchMax: 100,
     *   mouse: 4,
     *   pen: 4,
     *   epsilon: 0.0001,
     *   hasPoint: 4
     * }
     * </pre>
     *
     * @type Object
     * @name JXG.Options#precision
     * @see JXG.GeometryElement#precision
     */
    static precision: PrecisionOptions = {
        touch: 30,
        touchMax: 100,
        mouse: 4,
        pen: 4,
        epsilon: 0.0001, // Unused
        hasPoint: 4
    }

    /* special angle options */
    static angle: AngleOptions = {
        withLabel: true,
        radius: 'auto',
        type: 'sector',
        orthoType: 'square',
        orthoSensitivity: 1.0,
        fillColor: Color.palette.orange,
        highlightFillColor: Color.palette.orange,
        strokeColor: Color.palette.orange,
        fillOpacity: 0.3,
        highlightFillOpacity: 0.3,
        radiuspoint: { withLabel: false, visible: false, name: '', },
        pointsquare: { withLabel: false, visible: false, name: '', },
        dot: { visible: false, strokeColor: 'none', fillColor: '#000000', size: 2, face: 'o', withLabel: false, name: '', },
        label: { position: 'top', offset: [0, 0], strokeColor: Color.palette.blue, },
        arc: { visible: false, fillColor: 'none', },
    }

    /* special arc options */
    static arc: ArcOptions = {
        selection: 'auto',
        hasInnerPoints: false,
        label: { anchorX: 'auto', anchorY: 'auto', },
        firstArrow: false,
        lastArrow: false,
        fillColor: 'none',
        highlightFillColor: 'none',
        strokeColor: Color.palette.blue,
        highlightStrokeColor: '#c3d9ff',
        useDirection: false,
        center: null,  // was {}
        radiusPoint: null, // was {}
        anglePoint: null, // was {}

        /**#@-*/
    }

    /* special arrow options */
    static arrow: ArrowOptions = {
        firstArrow: false,
        lastArrow: { type: 1, highlightSize: 6, size: 6 },
    }

    /* special arrowparallel options */
    static arrowparallel: ArrowOptions = {
        firstArrow: false,
        lastArrow: { type: 1, highlightSize: 6, size: 6 },
    }


    /* special axis options */
    static axis: AxisOptions = {
        name: '',                            // By default, do not generate names for axes.
        needsRegularUpdate: false,           // Axes only updated after zooming and moving of the origin.
        strokeWidth: 1,
        lastArrow: { type: 1, highlightSize: 8, size: 8 },
        strokeColor: '#666666',
        highlightStrokeWidth: 1,
        highlightStrokeColor: '#888888',
        position: 'static',
        anchor: '',
        anchorDist: '10%',
        ticksAutoPos: false,
        ticksAutoPosThreshold: '5%',
        withTicks: true,
        straightFirst: true,
        straightLast: true,
        margin: -4,
        withLabel: false,
        scalable: false,

        /**
         * Attributes for ticks of the axis.
         *
         * @type Ticks
         * @name Axis#ticks
         */
        ticks: {
            // [4,-15] seems to be a good offset for 12 point fonts
            label: { offset: [4, -15], parse: false, needsRegularUpdate: false, display: 'internal', visible: 'inherit', layer: 9, },
            visible: 'inherit',
            needsRegularUpdate: false,
            strokeWidth: 1,
            strokeColor: '#666666',
            highlightStrokeColor: '#888888',
            drawLabels: true,
            drawZero: false,
            insertTicks: true,
            minTicksDistance: 5,
            minorHeight: 10,          // if <0: full width and height
            majorHeight: -1,          // if <0: full width and height
            tickEndings: [0, 1],
            majorTickEndings: [1, 1],
            minorTicks: 4,
            ticksDistance: 1,         // TODO doc
            strokeOpacity: 0.25
        },
        point1: { needsRegularUpdate: false, visible: false, },    // Default values for point1 if created by line
        point2: { needsRegularUpdate: false, visible: false, },
        tabindex: -1,
        label: { position: 'lft', offset: [10, 10], },
        ignoreForLabelAutoposition: true

    }

    /* special options for angle bisector of 3 points */
    static bisector: BisectorOptions = {
        strokeColor: '#000000', // Bisector line
        point: {               // Bisector point
            visible: false,
            fixed: false,
            withLabel: false,
            name: '',
        }
    }

    /* special options for the 2 bisectors of 2 lines */
    static bisectorlines: BisectorlinesOptions = {
        line1: { strokeColor: '#000000', },
        line2: { strokeColor: '#000000', },
    }


    /* special options for boxplot curves */
    static boxplot: BoxplotOptions = {
        dir: 'vertical',
        smallWidth: 0.5,
        strokeWidth: 2,
        strokeColor: Color.palette.blue,
        fillColor: Color.palette.blue,
        fillOpacity: 0.2,
        highlightStrokeWidth: 2,
        highlightStrokeColor: Color.palette.blue,
        highlightFillColor: Color.palette.blue,
        highlightFillOpacity: 0.1
    }

    /* special button options */
    button: {
        /**#@+
         * @visprop
         */

        /**
         * Control the attribute "disabled" of the HTML button.
         *
         * @name disabled
         * @memberOf Button.prototype
         *
         * @type Boolean
         * @default false
         */
        disabled: false

        display: 'html'

        /**#@-*/
    }

    /* special cardinal spline options */
    static cardinalspline: CardinalsplineOptions = {
        createPoints: true,
        isArrayOfCoordinates: true,
        points: {
            strokeOpacity: 0.05,
            fillOpacity: 0.05,
            highlightStrokeOpacity: 1.0,
            highlightFillOpacity: 1.0,
            withLabel: false,
            name: '',
            fixed: false
        }
    }

    /* special chart options */
    static chart: ChartOptions = {
        chartStyle: 'line',
        colors: ['#B02B2C', '#3F4C6B', '#C79810', '#D15600', '#FFFF88', '#c3d9ff', '#4096EE', '#008C00'],
        highlightcolors: null,
        fillcolor: 'none',
        highlightonsector: false,
        highlightbysize: false,

        fillOpacity: 0.6,
        withLines: false,

        label: {}
    }

    /* special html slider options */
    checkbox: {
        /**#@+
         * @visprop
         */

        /**
         * Control the attribute "disabled" of the HTML checkbox.
         *
         * @name disabled
         * @memberOf Checkbox.prototype
         *
         * @type Boolean
         * @default false
         */
        disabled: false

        /**
         * Control the attribute "checked" of the HTML checkbox.
         *
         * @name checked
         * @memberOf Checkbox.prototype
         *
         * @type Boolean
         * @default false
         */
        checked: false

        display: 'html'

        /**#@-*/
    }

    /*special circle options */
    static circle: CircleOptions = {
        hasInnerPoints: false,

        fillColor: 'none',
        highlightFillColor: 'none',
        strokeColor: Color.palette.blue,
        highlightStrokeColor: '#c3d9ff',

        center: {
            visible: false,
            withLabel: false,
            fixed: false,
            fillColor: Color.palette.red,
            strokeColor: Color.palette.red,
            highlightFillColor: '#c3d9ff',
            highlightStrokeColor: '#c3d9ff',
            layer: 9,
            name: '',
        },
        point2: {
            fillColor: Color.palette.red,
            strokeColor: Color.palette.red,
            highlightFillColor: '#c3d9ff',
            highlightStrokeColor: '#c3d9ff',
            layer: 9,
            visible: false,
            withLabel: false,
            fixed: false,
            name: '',
        },
        label: { position: 'urt', }

        /**#@-*/
    }

    /* special options for circumcircle of 3 points */
    static circumcircle: CircumcircleOptions = {
        fillColor: 'none',
        highlightFillColor: 'none',
        strokeColor: Color.palette.blue,
        highlightStrokeColor: '#c3d9ff',
        center: {               // center point
            visible: false,
            fixed: false,
            withLabel: false,
            fillColor: Color.palette.red,
            strokeColor: Color.palette.red,
            highlightFillColor: '#c3d9ff',
            highlightStrokeColor: '#c3d9ff',
            name: ''
        }
        /**#@-*/
    }

    static circumcirclearc: CircumcirclearcOptions = {
        fillColor: 'none',
        highlightFillColor: 'none',
        strokeColor: Color.palette.blue,
        highlightStrokeColor: '#c3d9ff',
        useDirection: true

        /**
         * Attributes for center point.
         *
         * @type Point
         * @name CircumcircleArc#center
         */
        center: {
            visible: false
            withLabel: false
            fixed: false
            name: ''
        }
        /**#@-*/
    }

    /* special options for circumcircle sector of 3 points */
    circumcirclesector: {
        /**#@+
         * @visprop
         */

        useDirection: true
        fillColor: Color.palette.yellow,
        highlightFillColor: Color.palette.yellow,
        fillOpacity: 0.3,
        highlightFillOpacity: 0.3,
        strokeColor: Color.palette.blue,
        highlightStrokeColor: '#c3d9ff',

        /**
         * Attributes for center point.
         *
         * @type Point
         * @name Circle#point
         */
        point: {
            visible: false
            fixed: false
            withLabel: false
            name: ''
        }
        /**#@-*/
    }

    /* special options for comb */
    comb: {
        /**#@+
         * @visprop
         */

        /**
         * Frequency of comb elements.
         *
         * @type Number
         * @name Comb#frequency
         * @default 0.2
         */
        frequency: 0.2,

        /**
         * Width of the comb.
         *
         * @type Number
         * @name Comb#width
         * @default 0.4
         */
        width: 0.4,

        /**
         * Angle - given in radians - under which comb elements are positioned.
         *
         * @type Number
         * @name Comb#angle
         * @default Math.PI / 3 (i.e. &pi; /3  or 60^° degrees)
         */
        angle: 1.04719755,    // Math.PI /3   // TS doesn't like Math (namespace) or computations here

        /**
         * Should the comb go right to left instead of left to right.
         *
         * @type Boolean
         * @name Comb#reverse
         * @default false
         */
        reverse: false

        /**
         * Attributes for first defining point of the comb.
         *
         * @type Point
         * @name Comb#point1
         */
        point1: {
            visible: false
            withLabel: false
            fixed: false
            name: ''
        }

        /**
         * Attributes for second defining point of the comb.
         *
         * @type Point
         * @name Comb#point2
         */
        point2: {
            visible: false
            withLabel: false
            fixed: false
            name: ''
        }

        // /**
        //  * Attributes for the curve displaying the comb.
        //  *
        //  * @type Curve
        //  * @name Comb#curve
        //  */
        // curve: {
        //     strokeWidth: 1,
        //     strokeColor: '#0000ff',
        //     fillColor: 'none'
        // }
        strokeWidth: 1,
        strokeColor: '#0000ff',
        fillColor: 'none'
    }

    /* special conic options */
    conic: {
        /**#@+
         * @visprop
         */

        fillColor: 'none',
        highlightFillColor: 'none',
        strokeColor: Color.palette.blue,
        highlightStrokeColor: '#c3d9ff',

        /**
         * Attributes for foci points.
         *
         * @type Point
         * @name Conic#foci
         */
        foci: {
            // points
            fixed: false
            visible: false
            withLabel: false
            name: ''
        }

        /**
         * Attributes for center point.
         *
         * @type Point
         * @name Conic#center
         */
        center: {
            visible: false
            withLabel: false
            name: ''
        }

        /**
         * Attributes for five points defining the conic, if some of them are given as coordinates.
         *
         * @type Point
         * @name Conic#point
         */
        point: {
            withLabel: false
            name: ''
        }

        /**
         * Attributes for parabola line in case the line is given by two
         * points or coordinate pairs.
         *
         * @type Line
         * @name Conic#line
         */
        line: {
            visible: false
        }

        /**#@-*/
    }


    /* special curve options */
    static curve: CurveOptions = {
        /**#@+
         * @visprop
         */

        strokeWidth: 1,
        strokeColor: Color.palette.blue,
        fillColor: 'none',
        fixed: true,
        curveType: null,
        doAdvancedPlot: true,
        doAdvancedPlotOld: false,
        firstArrow: false,
        handDrawing: false,
        label: { position: 'lft' },
        lastArrow: false,
        lineCap: 'round',
        numberPointsHigh: 1600,  // Number of points on curves after mouseUp
        numberPointsLow: 400,    // Number of points on curves after mousemove
        plotVersion: 2,
        recursionDepthHigh: 17,
        recursionDepthLow: 15

        /**#@-*/
    }

    /* special foreignObject options */
    foreignobject: {
        /**#@+
         * @visprop
         */

        fixed: true
        visible: true
        needsRegularUpdate: false

        /**
         * List of attractor elements. If the distance of the foreignobject is less than
         * attractorDistance the foreignobject is made to glider of this element.
         *
         * @name ForeignObject#attractors
         *
         * @type Array
         * @default empty
         */
        attractors: [],

        /**
         * If set to true this object is only evaluated once and not re-evaluated on update.
         * This is necessary if you want to have a board within a foreignObject of another board.
         *
         * @name ForeignObject#evaluateOnlyOnce
         *
         * @type Boolean
         * @default false
         */
        evaluateOnlyOnce: false

        /**#@-*/
    }

    /* special functiongraph options */
    functiongraph: {
        /**#@+
         * @visprop
         */


        /**#@-*/
    }

    /* special glider options */
    glider: {
        /**#@+
         * @visprop
         */

        label: {}
        /**#@-*/
    }

    group: {
        needsRegularUpdate: true
    }

    /* special html slider options */
    htmlslider: {
        /**#@+
         * @visprop
         */

        // /**
        //  *
        //  * These affect the DOM element input type="range".
        //  * The other attributes affect the DOM element div containing the range element.
        //  */
        widthRange: 100,
        widthOut: 34,
        step: 0.01,

        frozen: true
        isLabel: false
        strokeColor: '#000000',
        display: 'html',
        anchorX: 'left',
        anchorY: 'middle',
        withLabel: false

        /**#@-*/
    }

    /* special image options */
    image: {
        /**#@+
         * @visprop
         */

        imageString: null
        fillOpacity: 1.0,
        highlightFillOpacity: 0.6,


        /**
         * Defines the CSS class used by the image. CSS attributes defined in
         * this class will overwrite the corresponding JSXGraph attributes, e.g.
         * opacity.
         * The default CSS class is defined in jsxgraph.css.
         *
         * @name Image#cssClass
         *
         * @see Image#highlightCssClass
         * @type String
         * @default 'JXGimage'
         * @see Image#highlightCssClass
         * @see Text#cssClass
         * @see JXG.GeometryElement#cssClass
         */
        cssClass: 'JXGimage',

        /**
         * Defines the CSS class used by the image when highlighted.
         * CSS attributes defined in this class will overwrite the
         * corresponding JSXGraph attributes, e.g. highlightFillOpacity.
         * The default CSS class is defined in jsxgraph.css.
         *
         * @name Image#highlightCssClass
         *
         * @see Image#cssClass
         * @type String
         * @default 'JXGimageHighlight'
         * @see Image#cssClass
         * @see Image#highlightCssClass
         * @see JXG.GeometryElement#highlightCssClass
         */
        highlightCssClass: 'JXGimageHighlight',

        /**
         * Image rotation in degrees.
         *
         * @name Image#rotate
         * @type Number
         * @default 0
         */
        rotate: 0,

        /**
         * Defines together with {@link Image#snapSizeY} the grid the image snaps on to.
         * The image will only snap on user coordinates which are
         * integer multiples to snapSizeX in x and snapSizeY in y direction.
         * If this value is equal to or less than <tt>0</tt>, it will use the grid displayed by the major ticks
         * of the default ticks of the default x axes of the board.
         *
         * @name Image#snapSizeX
         *
         * @see Point#snapToGrid
         * @see Image#snapSizeY
         * @see JXG.Board#defaultAxes
         * @type Number
         * @default 1
         */
        snapSizeX: 1,

        /**
         * Defines together with {@link Image#snapSizeX} the grid the image snaps on to.
         * The image will only snap on integer multiples to snapSizeX in x and snapSizeY in y direction.
         * If this value is equal to or less than <tt>0</tt>, it will use the grid displayed by the major ticks
         * of the default ticks of the default y axes of the board.
         *
         * @name Image#snapSizeY
         *
         * @see Point#snapToGrid
         * @see Image#snapSizeX
         * @see JXG.Board#defaultAxes
         * @type Number
         * @default 1
         */
        snapSizeY: 1,

        /**
         * List of attractor elements. If the distance of the image is less than
         * attractorDistance the image is made to glider of this element.
         *
         * @name Image#attractors
         *
         * @type Array
         * @default empty
         */
        attractors: []

        /**#@-*/
    }

    /* special implicitcurve options */
    implicitcurve: {
        /**#@+
         * @visprop
         */

        /**
         * Defines the margin (in user coordinates) around the JSXGraph board in which the
         * implicit curve is plotted.
         *
         * @name ImplicitCurve#margin
         * @type {Number|Function}
         * @default 1
         */
        margin: 1,

        /**
         * Horizontal resolution: distance (in pixel) between vertical lines to search for components of the implicit curve.
         * A small number increases the running time. For large number components may be missed.
         * Minimum value is 0.01.
         *
         * @name ImplicitCurve#resolution_outer
         * @type {Number|Function}
         * @default 5
         */
        resolution_outer: 5,

        /**
         * Vertical resolution (in pixel) to search for components of the implicit curve.
         * A small number increases the running time. For large number components may be missed.
         * Minimum value is 0.01.
         *
         * @name ImplicitCurve#resolution_inner
         * @type {Number|Function}
         * @default 5
         */
        resolution_inner: 5,

        /**
         * Maximum iterations for one component of the implicit curve.
         *
         * @name ImplicitCurve#max_steps
         * @type {Number|Function}
         * @default 1024
         */
        max_steps: 1024,

        /**
         * Angle &alpha;<sub>0</sub> between two successive tangents: determines the smoothness of
         * the curve.
         *
         * @name ImplicitCurve#alpha_0
         * @type {Number|Function}
         * @default 0.05
         */
        alpha_0: 0.05,

        /**
         * Tolerance to find starting points for the tracing phase of a component.
         *
         * @name ImplicitCurve#tol_0
         * @type {Number|Function}
         * @default JXG.Math.eps
         */
        tol_u0: 0.000001  // Mat.eps,

        /**
         * Tolerance for the Newton steps.
         *
         * @name ImplicitCurve#tol_newton
         * @type {Number|Function}
         * @default 1.0e-7
         */
        tol_newton: 1.0e-7,

        /**
         * Tolerance for cusp / bifurcation detection.
         *
         * @name ImplicitCurve#tol_cusp
         * @type {Number|Function}
         * @default 0.05
         */
        tol_cusp: 0.05,

        /**
         * If two points are closer than this value, we bail out of the tracing phase for that
         * component.
         *
         * @name ImplicitCurve#tol_progress
         * @type {Number|Function}
         * @default 0.0001
         */
        tol_progress: 0.0001,

        /**
         * Half of the box size (in user units) to search for existing line segments in the quadtree.
         *
         * @name ImplicitCurve#qdt_box
         * @type {Number|Function}
         * @default 0.2
         */
        qdt_box: 0.2,

        /**
         * Inverse of desired number of Newton steps.
         *
         * @name ImplicitCurve#kappa_0
         * @type {Number|Function}
         * @default 0.2
         */
        kappa_0: 0.2,

        /**
         * Allowed distance (in user units) of predictor point to curve.
         *
         * @name ImplicitCurve#delta_0
         * @type {Number|Function}
         * @default 0.05
         */
        delta_0: 0.05,

        /**
         * Initial step width (in user units).
         *
         * @name ImplicitCurve#h_initial
         * @type {Number|Function}
         * @default 0.1
         */
        h_initial: 0.1,

        /**
         * If h is below this threshold (in user units), we bail out
         * of the tracing phase of that component.
         *
         * @name ImplicitCurve#h_critical
         * @type {Number|Function}
         * @default 0.001
         */
        h_critical: 0.001,

        /**
         * Maximum step width (in user units).
         *
         * @name ImplicitCurve#h_max
         * @type {Number|Function}
         * @default 0.5
         */
        h_max: 0.5,

        /**
         * Allowed distance (in user units multiplied by actual step width) to detect loop.
         *
         * @name ImplicitCurve#loop_dist
         * @type {Number|Function}
         * @default 0.09
         */
        loop_dist: 0.09,

        /**
         * Minimum acos of angle to detect loop.
         *
         * @name ImplicitCurve#loop_dir
         * @type {Number|Function}
         * @default 0.99
         */
        loop_dir: 0.99,

        /**
         * Use Gosper's loop detector.
         *
         * @name ImplicitCurve#loop_detection
         * @type {Boolean|Function}
         * @default true
         */
        loop_detection: true

        /**#@-*/
    }

    /* special options for incircle of 3 points */
    incircle: {
        /**#@+
         * @visprop
         */

        fillColor: 'none',
        highlightFillColor: 'none',
        strokeColor: Color.palette.blue,
        highlightStrokeColor: '#c3d9ff',

        /**
         * Attributes of circle center.
         *
         * @type Point
         * @name Incircle#center
         */
        center: {               // center point
            visible: false
            fixed: false
            withLabel: false
            fillColor: Color.palette.red
            strokeColor: Color.palette.red
            highlightFillColor: '#c3d9ff',
            highlightStrokeColor: '#c3d9ff',
            name: ''
        }
        /**#@-*/
    }

    inequality: {
        /**#@+
         * @visprop
         */

        fillColor: Color.palette.red
        fillOpacity: 0.2,
        strokeColor: 'none',

        /**
         * By default an inequality is less (or equal) than. Set inverse to <tt>true</tt> will consider the inequality
         * greater (or equal) than.
         *
         * @type Boolean
         * @default false
         * @name Inequality#inverse
         * @visprop
         */
        inverse: false
        /**#@-*/
    }

    infobox: {
        /**#@+
         * @visprop
         */

        /**
         * Horizontal offset in pixel of the infobox text from its anchor point.
         *
         * @type Number
         * @default -20
         * @name JXG.Board.infobox#distanceX
         * @visprop
         */
        distanceX: -20,

        /**
         * Vertical offset in pixel of the infobox text from its anchor point.
         *
         * @type Number
         * @default 25
         * @name JXG.Board.infobox#distanceY
         * @visprop
         */
        distanceY: 25,

        /**
         * Internationalization support for infobox text.
         *
         * @name JXG.Board.infobox#intl
         * @type object
         * @default <pre>{
         *    enabled: 'inherit',
         *    options: {}
         * }</pre>
         * @visprop
         * @see JXG.Board#intl
         * @see Text#intl
         */
        intl: {
            enabled: 'inherit',
            options: {}
        }

        fontSize: 12,
        isLabel: false
        strokeColor: '#bbbbbb',
        display: 'html',             // 'html' or 'internal'
        anchorX: 'left',             //  'left', 'middle', or 'right': horizontal alignment
        //  of the text.
        anchorY: 'middle',           //  'top', 'middle', or 'bottom': vertical alignment
        //  of the text.
        cssClass: 'JXGinfobox',
        rotate: 0,                   // works for non-zero values only in combination
        // with display=='internal'
        visible: true
        parse: false
        transitionDuration: 0,
        needsRegularUpdate: false
        tabindex: null
        viewport: [0, 0, 0, 0],

        ignoreForLabelAutoposition: true
        /**#@-*/
    }

    /* special options for integral */
    integral: {
        /**#@+
         * @visprop
         */

        axis: 'x',        // 'x' or 'y'
        withLabel: true    // Show integral value as text
        fixed: true
        strokeWidth: 0,
        strokeOpacity: 0,
        fillColor: Color.palette.red
        fillOpacity: 0.3,
        highlightFillColor: Color.palette.red
        highlightFillOpacity: 0.2,

        /**
         * Attributes of the (left) starting point of the integral.
         *
         * @type Point
         * @name Integral#curveLeft
         * @see Integral#baseLeft
         */
        curveLeft: {    // Start point
            visible: true
            withLabel: false
            color: Color.palette.red
            fillOpacity: 0.8,
            layer: 9
        }

        /**
         * Attributes of the (left) base point of the integral.
         *
         * @type Point
         * @name Integral#baseLeft
         * @see Integral#curveLeft
         */
        baseLeft: {    // Start point
            visible: false
            fixed: false
            withLabel: false
            name: ''
        }

        /**
         * Attributes of the (right) end point of the integral.
         *
         * @type Point
         * @name Integral#curveRight
         * @see Integral#baseRight
         */
        curveRight: {      // End point
            visible: true
            withLabel: false
            color: Color.palette.red
            fillOpacity: 0.8,
            layer: 9
        }

        /**
         * Attributes of the (right) base point of the integral.
         *
         * @type Point
         * @name Integral#baseRight
         * @see Integral#curveRight
         */
        baseRight: {      // End point
            visible: false
            fixed: false
            withLabel: false
            name: ''
        }

        /**
         * Attributes for integral label.
         *
         * @type Label
         * @name Integral#label
         * @default <pre>{
         *      fontSize: 20,
         *      digits: 4,
         *      intl: {
         *          enabled: false
         *          options: {}
         *      }
         *    }</pre>
         */
        label: {
            fontSize: 20,
            digits: 4,
            intl: {
                enabled: false
                options: {}
            }
        }
        /**#@-*/
    }

    /* special input options */
    input: {
        /**#@+
         * @visprop
         */

        /**
         * Control the attribute "disabled" of the HTML input field.
         *
         * @name disabled
         * @memberOf Input.prototype
         *
         * @type Boolean
         * @default false
         */
        disabled: false

        /**
         * Control the attribute "maxlength" of the HTML input field.
         *
         * @name maxlength
         * @memberOf Input.prototype
         *
         * @type Number
         * @default 524288 (as in HTML)
         */
        maxlength: 524288,

        display: 'html'

        /**#@-*/
    }

    /* special intersection point options */
    intersection: {
        /**#@+
         * @visprop
         */

        /**
         * Used in {@link JXG.Intersection}.
         * This flag sets the behaviour of intersection points of e.g.
         * two segments. If true the intersection is treated as intersection of lines. If false
         * the intersection point exists if the segments intersect setwise.
         *
         * @name Intersection.alwaysIntersect
         * @type Boolean
         * @default true
         */
        alwaysIntersect: true

        /**#@-*/
    }

    /* special line options */
    line: {
        /**#@+
         * @visprop
         */

        /**
         * Configure the arrow head at the position of its first point or the corresponding
         * intersection with the canvas border
         *
         * The attribute firstArrow can be a Boolean or an object with the following sub-attributes:
         * <pre>
         * {
         *      type: 1, // possible values are 1, 2, ..., 7. Default value is 1.
         *      size: 6, // size of the arrow head. Default value is 6.
         *               // This value is multiplied with the strokeWidth of the line
         *               // Exception: for type=7 size is ignored
         *      highlightSize: 6, // size of the arrow head in case the element is highlighted. Default value
         * }
         * </pre>
         * type=7 is the default for curves if firstArrow: true
         * <p>
         * An arrow head can be turned off with line.setAttribute({firstArrow: false}).
         *
         * @example
         *     board.options.line.lastArrow = false;
         *     board.options.line.firstArrow = {size: 10, highlightSize: 10};
         *     board.options.line.point1 = {visible: false withLabel: true label: {visible: true anchorX: 'right'}};
         *     board.options.line.strokeWidth = 4;
         *     board.options.line.highlightStrokeWidth = 4;
         *
         *     board.create('segment', [[-5,4], [3,4]], {firstArrow: {type: 1} point1: {name: 'type:1'}});
         *     board.create('segment', [[-5,3], [3,3]], {firstArrow: {type: 2} point1: {name: 'type:2'}});
         *     board.create('segment', [[-5,2], [3,2]], {firstArrow: {type: 3} point1: {name: 'type:3'}});
         *     board.create('segment', [[-5,1], [3,1]], {firstArrow: {type: 4} point1: {name: 'type:4'}});
         *     board.create('segment', [[-5,0], [3,0]], {firstArrow: {type: 5} point1: {name: 'type:5'}});
         *     board.create('segment', [[-5,-1], [3,-1]], {firstArrow: {type: 6} point1: {name: 'type:6'}});
         *     board.create('segment', [[-5,-2], [3,-2]], {firstArrow: {type: 7} point1: {name: 'type:7'}});
         *
         * </pre><div id="JXGc94a93da-c942-4204-8bb6-b39726cbb09b" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXGc94a93da-c942-4204-8bb6-b39726cbb09b',
         *             {boundingbox: [-6, 6, 4,-4], axis: false showcopyright: false shownavigation: false});
         *         board.options.line.lastArrow = false;
         *         board.options.line.firstArrow = {size: 10, highlightSize: 10};
         *         board.options.line.point1 = {visible: false withLabel: true label: {visible: true anchorX: 'right'}};
         *         board.options.line.strokeWidth = 4;
         *         board.options.line.highlightStrokeWidth = 4;
         *
         *         board.create('segment', [[-5,4], [3,4]], {firstArrow: {type: 1} point1: {name: 'type:1'}});
         *         board.create('segment', [[-5,3], [3,3]], {firstArrow: {type: 2} point1: {name: 'type:2'}});
         *         board.create('segment', [[-5,2], [3,2]], {firstArrow: {type: 3} point1: {name: 'type:3'}});
         *         board.create('segment', [[-5,1], [3,1]], {firstArrow: {type: 4} point1: {name: 'type:4'}});
         *         board.create('segment', [[-5,0], [3,0]], {firstArrow: {type: 5} point1: {name: 'type:5'}});
         *         board.create('segment', [[-5,-1], [3,-1]], {firstArrow: {type: 6} point1: {name: 'type:6'}});
         *         board.create('segment', [[-5,-2], [3,-2]], {firstArrow: {type: 7} point1: {name: 'type:7'}});
         *
         *     })();
         *
         * </script><pre>
         *
         * @name Line#firstArrow
         * @see Line#lastArrow
         * @see Line#touchFirstPoint
         * @type Boolean | Object
         * @default false
         */
        firstArrow: false

        /**
         * Configure the arrow head at the position of its second point or the corresponding
         * intersection with the canvas border.
         *
         * The attribute lastArrow can be a Boolean or an object with the following sub-attributes:
         * <pre>
         * {
         *      type: 1, // possible values are 1, 2, ..., 7. Default value is 1.
         *      size: 6, // size of the arrow head. Default value is 6.
         *               // This value is multiplied with the strokeWidth of the line.
         *               // Exception: for type=7 size is ignored
         *      highlightSize: 6, // size of the arrow head in case the element is highlighted. Default value is 6.
         * }
         * </pre>
         * type=7 is the default for curves if lastArrow: true
         * <p>
         * An arrow head can be turned off with line.setAttribute({lastArrow: false}).
         *
         * @example
         *     var p1 = board.create('point', [-5, 2], {size:1});
         *     var p2 = board.create('point', [5, 2], {size:10});
         *     var li = board.create('segment', ['A','B'],
         *         {name:'seg',
         *          strokeColor:'#000000',
         *          strokeWidth:1,
         *          highlightStrokeWidth: 5,
         *          lastArrow: {type: 2, size: 8, highlightSize: 6}
         *          touchLastPoint: true
         *          firstArrow: {type: 3, size: 8}
         *         });
         *
         * </pre><div id="JXG184e915c-c2ef-11e8-bece-04d3b0c2aad3" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG184e915c-c2ef-11e8-bece-04d3b0c2aad3',
         *             {boundingbox: [-8, 8, 8,-8], axis: true showcopyright: false shownavigation: false});
         *         var p1 = board.create('point', [-5, 2], {size:1});
         *         var p2 = board.create('point', [5, 2], {size:10});
         *         var li = board.create('segment', ['A','B'],
         *             {name:'seg',
         *              strokeColor:'#000000',
         *              strokeWidth:1,
         *              highlightStrokeWidth: 5,
         *              lastArrow: {type: 2, size: 8, highlightSize: 6}
         *              touchLastPoint: true
         *              firstArrow: {type: 3, size: 8}
         *             });
         *     })();
         *
         * </script>
         *
         * @example
         *     board.options.line.strokeWidth = 4;
         *     board.options.line.highlightStrokeWidth = 4;
         *     board.options.line.firstArrow = false;
         *     board.options.line.lastArrow = {size: 10, highlightSize: 10};
         *     board.options.line.point2 = {visible: false withLabel: true label: {visible: true}};
         *
         *     board.create('segment', [[-5,4], [3,4]], {lastArrow: {type: 1} point2: {name: 'type:1'}});
         *     board.create('segment', [[-5,3], [3,3]], {lastArrow: {type: 2} point2: {name: 'type:2'}});
         *     board.create('segment', [[-5,2], [3,2]], {lastArrow: {type: 3} point2: {name: 'type:3'}});
         *     board.create('segment', [[-5,1], [3,1]], {lastArrow: {type: 4} point2: {name: 'type:4'}});
         *     board.create('segment', [[-5,0], [3,0]], {lastArrow: {type: 5} point2: {name: 'type:5'}});
         *     board.create('segment', [[-5,-1], [3,-1]], {lastArrow: {type: 6} point2: {name: 'type:6'}});
         *     board.create('segment', [[-5,-2], [3,-2]], {lastArrow: {type: 7} point2: {name: 'type:7'}});
         *
         * </pre><div id="JXGca206b1c-e319-4899-8b90-778f53fd926d" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXGca206b1c-e319-4899-8b90-778f53fd926d',
         *             {boundingbox: [-6, 6, 6,-4], axis: false showcopyright: false shownavigation: false});
         *         board.options.line.strokeWidth = 4;
         *         board.options.line.highlightStrokeWidth = 4;
         *         board.options.line.firstArrow = false;
         *         board.options.line.lastArrow = {size: 10, highlightSize: 10};
         *         board.options.line.point2 = {visible: false withLabel: true label: {visible: true}};
         *
         *         board.create('segment', [[-5,4], [3,4]], {lastArrow: {type: 1} point2: {name: 'type:1'}});
         *         board.create('segment', [[-5,3], [3,3]], {lastArrow: {type: 2} point2: {name: 'type:2'}});
         *         board.create('segment', [[-5,2], [3,2]], {lastArrow: {type: 3} point2: {name: 'type:3'}});
         *         board.create('segment', [[-5,1], [3,1]], {lastArrow: {type: 4} point2: {name: 'type:4'}});
         *         board.create('segment', [[-5,0], [3,0]], {lastArrow: {type: 5} point2: {name: 'type:5'}});
         *         board.create('segment', [[-5,-1], [3,-1]], {lastArrow: {type: 6} point2: {name: 'type:6'}});
         *         board.create('segment', [[-5,-2], [3,-2]], {lastArrow: {type: 7} point2: {name: 'type:7'}});
         *     })();
         *
         * </script><pre>
         *
         * @name Line#lastArrow
         * @see Line#firstArrow
         * @see Line#touchLastPoint
         * @type Boolean | Object
         * @default false
         */
        lastArrow: false

        /**
         * This number (pixel value) controls where infinite lines end at the canvas border. If zero, the line
         * ends exactly at the border, if negative there is a margin to the inside, if positive the line
         * ends outside of the canvas (which is invisible).
         *
         * @name Line#margin
         * @type Number
         * @default 0
         */
        margin: 0,

        /**
         * If true line stretches infinitely in direction of its first point.
         * Otherwise it ends at point1.
         *
         * @name Line#straightFirst
         * @see Line#straightLast
         * @type Boolean
         * @default true
         */
        straightFirst: true

        /**
         * If true line stretches infinitely in direction of its second point.
         * Otherwise it ends at point2.
         *
         * @name Line#straightLast
         * @see Line#straightFirst
         * @type Boolean
         * @default true
         */
        straightLast: true

        fillColor: 'none',           // Important for VML on IE
        highlightFillColor: 'none',  // Important for VML on IE
        strokeColor: Color.palette.blue,
        highlightStrokeColor: '#c3d9ff',
        withTicks: false

        /**
         * Attributes for first defining point of the line.
         *
         * @type Point
         * @name Line#point1
         */
        point1: {                  // Default values for point1 if created by line
            fillColor: Color.palette.red
            strokeColor: Color.palette.red
            highlightFillColor: '#c3d9ff',
            highlightStrokeColor: '#c3d9ff',
            layer: 9,

            visible: false
            withLabel: false
            fixed: false
            name: ''
        }

        /**
         * Attributes for second defining point of the line.
         *
         * @type Point
         * @name Line#point2
         */
        point2: {                  // Default values for point2 if created by line
            fillColor: Color.palette.red
            strokeColor: Color.palette.red
            highlightFillColor: '#c3d9ff',
            highlightStrokeColor: '#c3d9ff',
            layer: 9,

            visible: false
            withLabel: false
            fixed: false
            name: ''
        }

        /**
         * Attributes for ticks of the line.
         *
         * @name Line#ticks
         * @type Object
         * @see Ticks
         */
        ticks: {
            drawLabels: true
            label: {
                offset: [4, -15] // This seems to be a good offset for 12 point fonts
            }
            drawZero: false
            insertTicks: false
            ticksDistance: 1,
            minTicksDistance: 50,
            minorHeight: 4,          // if <0: full width and height
            majorHeight: -1,         // if <0: full width and height
            minorTicks: 4,
            strokeOpacity: 0.3,
            visible: 'inherit'
        }

        /**
         * Attributes for the line label.
         *
         * @type Object
         * @name Line#label
         * @see Label
         */
        label: {
            position: 'llft'
        }

        /**
         * If set to true the point will snap to a grid defined by
         * {@link Point#snapSizeX} and {@link Point#snapSizeY}.
         *
         * @see Point#snapSizeX
         * @see Point#snapSizeY
         * @type Boolean
         * @name Line#snapToGrid
         * @default false
         */
        snapToGrid: false

        /**
         * Defines together with {@link Point#snapSizeY} the grid the point snaps on to.
         * The point will only snap on integer multiples to snapSizeX in x and snapSizeY in y direction.
         * If this value is equal to or less than <tt>0</tt>, it will use the grid displayed by the major ticks
         * of the default ticks of the default x axes of the board.
         *
         * @see Point#snapToGrid
         * @see Point#snapSizeY
         * @see JXG.Board#defaultAxes
         * @type Number
         * @name Line#snapSizeX
         * @default 1
         */
        snapSizeX: 1,

        /**
         * Defines together with {@link Point#snapSizeX} the grid the point snaps on to.
         * The point will only snap on integer multiples to snapSizeX in x and snapSizeY in y direction.
         * If this value is equal to or less than <tt>0</tt>, it will use the grid displayed by the major ticks
         * of the default ticks of the default y axes of the board.
         *
         * @see Point#snapToGrid
         * @see Point#snapSizeX
         * @see JXG.Board#defaultAxes
         * @type Number
         * @name Line#snapSizeY
         * @default 1
         */
        snapSizeY: 1,

        /**
         * If set to true {@link Line#firstArrow} is set to true and the point is visible,
         * the arrow head will just touch the circle line of the start point of the line.
         *
         * @see Line#firstArrow
         * @type Boolean
         * @name Line#touchFirstPoint
         * @default false
         */
        touchFirstPoint: false

        /**
         * If set to true {@link Line#lastArrow} is set to true and the point is visible,
         * the arrow head will just touch the circle line of the start point of the line.
         * @see Line#firstArrow
         * @type Boolean
         * @name Line#touchLastPoint
         * @default false
         */
        touchLastPoint: false

        /**#@-*/
    }

    /* special options for locus curves */
    locus: {
        /**#@+
         * @visprop
         */

        translateToOrigin: false
        translateTo10: false
        stretch: false
        toOrigin: null
        to10: null
        /**#@-*/
    }

    /* special measurement options */
    measurement: {
        /**#@+
         * @visprop
         */

        /**
         * This specifies the unit of measurement in dimension 1 (e.g. length).
         * A power is automatically added to the string.
         * If you want to use different units for each dimension, see {@link Measurement#units}.
         *
         * @example
         * var p1 = board.create("point", [0,1]),
         *     p2 = board.create("point", [3,1]),
         *     c = board.create("circle", [p1, p2]);
         *
         * board.create("measurement", [-2, -3, ["Perimeter", c]], {
         *     baseUnit: " m"
         * });
         * board.create("measurement", [1, -3, ["Area", c]], {
         *     baseUnit: " m"
         * });
         *
         * </pre><div id="JXG6cb6a7e7-553b-4f2a-af99-ddd78b7ba118" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG6cb6a7e7-553b-4f2a-af99-ddd78b7ba118',
         *             {boundingbox: [-8, 8, 8,-8], axis: false grid: false showcopyright: false shownavigation: false});
         *
         *     var p1 = board.create("point", [0,1]),
         *         p2 = board.create("point", [3,1]),
         *         c = board.create("circle", [p1, p2]);
         *
         *     board.create("measurement", [-2, -3, ["Perimeter", c]], {
         *         baseUnit: " m"
         *     });
         *     board.create("measurement", [1, -3, ["Area", c]], {
         *         baseUnit: " m"
         *     });
         *
         *     })();
         * </script><pre>
         *
         * @see Measurement#units
         * @name Measurement#baseUnit
         * @type String
         * @default ''
         */
        baseUnit: ''

        /**
         * This attribute expects an object that has the dimension numbers as keys (as integer or in the form of "dimxx")
         * and assigns a string to each dimension.
         * If a dimension has no specification, {@link Measurement#baseUnit} is used.
         *
         * @example
         * var p1 = board.create("point", [0,1]),
         *     p2 = board.create("point", [3,1]),
         *     c = board.create("circle", [p1, p2]);
         *
         * board.create("measurement", [-3, -3, ["Perimeter", c]], {
         *     baseUnit: " m",
         *     units: {
         *          1: " length unit",
         *       2: " area unit"
         *     }
         * });
         * board.create("measurement", [1, -3, ["Area", c]], {
         *     baseUnit: " m",
         *     units: {
         *          dim1: " length unit",
         *       dim2: " area unit"
         *     }
         * });
         *
         * </pre><div id="JXGe06456d5-255e-459b-8c8e-4d7d2af7efb8" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXGe06456d5-255e-459b-8c8e-4d7d2af7efb8',
         *             {boundingbox: [-8, 8, 8,-8], axis: false grid: false showcopyright: false shownavigation: false});
         *     var p1 = board.create("point", [0,1]),
         *         p2 = board.create("point", [3,1]),
         *         c = board.create("circle", [p1, p2]);
         *
         *     board.create("measurement", [-3, -3, ["Perimeter", c]], {
         *         baseUnit: " m",
         *         units: {
         *          1: " length unit",
         *           2: " area unit"
         *         }
         *     });
         *     board.create("measurement", [1, -3, ["Area", c]], {
         *         baseUnit: " m",
         *         units: {
         *          dim1: " length unit",
         *           dim2: " area unit"
         *         }
         *     });
         *
         *     })();
         * </script><pre>
         *
         * @see Measurement#baseUnit
         * @name Measurement#units
         * @type Object
         * @default {}
         */
        units: {}

        /**
         * Determines whether a prefix is displayed before the measurement value and unit.
         *
         * @see Measurement#prefix
         * @name Measurement#showPrefix
         * @type Boolean
         * @default true
         */
        showPrefix: true

        /**
         * Determines whether a suffix is displayed after the measurement value and unit.
         *
         * @see Measurement#suffix
         * @name Measurement#showSuffix
         * @type Boolean
         * @default true
         */
        showSuffix: true

        /**
         * String that is displayed before the measurement and its unit.
         *
         * @see Measurement#showPrefix
         * @name Measurement#prefix
         * @type String
         * @default ''
         */
        prefix: ''

        /**
         * String that is displayed after the measurement and its unit.
         *
         * @see Measurement#showSuffix
         * @name Measurement#suffix
         * @type String
         * @default ''
         */
        suffix: ''

        /**
         * Dimension of the measured data. This measurement can only be combined with a measurement of a suitable dimension.
         * Overwrites the dimension returned by the Dimension() method.
         * Normally, the default value null is used here to automatically determine the dimension.
         *
         * However, if the coordinates or a direction vector are measured the value is usually returned as an array.
         * To tell the measurement that the function {@link Measurement#formatCoords} or {@link Measurement#formatDirection} should be used
         * to display the array properly, 'coords' or 'direction' must be specified here.
         *
         * @see Measurement#formatCoords
         * @see Measurement#formatDirection
         * @name Measurement#dim
         * @type Number|'coords'|'direction'
         * @default null
         */
        dim: null

        /**
         * Function to format coordinates. Does only have an effect, if {@link Measurement#dim} is set to 'coords'.
         *
         * @example
         * var p = board.create("point", [-2, 0]);
         *
         * board.create("measurement", [0, -3, ["Coords", p]], {
         *     dim: 'coords',
         *     formatCoords: function (_,x,y,z) {
         *         if (parseFloat(z) !== 1)
         *             return 'Infinit coords';
         *         else
         *             return '(' + x + ' | ' + y + ')';
         *     }
         * });
         *
         * </pre><div id="JXGa0606ad6-971b-47d4-9a72-ca7df65890f5" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXGa0606ad6-971b-47d4-9a72-ca7df65890f5',
         *             {boundingbox: [-8, 8, 8,-8], axis: true showcopyright: false shownavigation: false});
         *     var p = board.create("point", [-2, 0]);
         *
         *     board.create("measurement", [0, -3, ["Coords", p]], {
         *         dim: 'coords',
         *         formatCoords: function (_,x,y,z) {
         *             if (parseFloat(z) !== 1)
         *                 return 'Infinit coords';
         *             else
         *                 return '(' + x + ' | ' + y + ')';
         *         }
         *     });
         *     })();
         * </script><pre>
         *
         * @see Measurement#dim
         * @name Measurement#formatCoords
         * @type Function
         * @param {Measurement} self Pointer to the measurement object itself
         * @param {Number} x c-coordinate
         * @param {Number} y c-coordinate
         * @param {Number} z c-coordinate
         * @returns String
         */
        formatCoords: Function = (self, x, y, z: string) => (parseFloat(z) !== 1)?'Infinit coords': '(' + x + ', ' + y + ')';


        /**
         * Function to format direction vector. Does only have an effect, if {@link Measurement#dim} is set to 'direction'.
         *
         * @example
         * var p1 = board.create("point", [0,1]),
         *     p2 = board.create("point", [3,1]),
         *     s = board.create("segment", [p1, p2]);
         *
         * board.create("measurement", [0, -2, ["Direction", s]], {
         *     dim: 'direction',
         *     formatDirection: function (self,x,y) {
         *        return '\\[\\frac{' + x + '}{' + y + '} = ' +
         *            (!isFinite(x/y) ? '\\infty' : JXG.toFixed(x/y, self.visProp.digits)) +
         *            '\\]';
         *     }
         *     useMathJax: true
         * });
         *
         * </pre><div id="JXG57435de0-16f2-42be-94d8-3d2b31caefcd" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG57435de0-16f2-42be-94d8-3d2b31caefcd',
         *             {boundingbox: [-8, 8, 8,-8], axis: false grid: false showcopyright: false shownavigation: false});
         *     var p1 = board.create("point", [0,1]),
         *         p2 = board.create("point", [3,1]),
         *         s = board.create("segment", [p1, p2]);
         *
         *     board.create("measurement", [0, -2, ["Direction", s]], {
         *         dim: 'direction',
         *         formatDirection: function (self,x,y) {
         *            return '\\[\\frac{' + x + '}{' + y + '} = ' +
         *                (!isFinite(x/y) ? '\\infty' : JXG.toFixed(x/y, self.visProp.digits)) +
         *                '\\]';
         *         }
         *         useMathJax: true
         *     });
         *
         *     })();
         *
         * </script><pre>
         *
         * @name Measurement#formatDirection
         * @type Function
         * @param {Measurement} self Pointer to the measurement object itself
         * @param {Number} x c-coordinate
         * @param {Number} y c-coordinate
         * @returns String
         */
        formatDirection: Function = (self, x, y) => '(' + x + ', ' + y + ')';


        /**#@-*/
    }

    /* special metapost spline options */
    metapostspline: {
        /**#@+
         * @visprop
         */

        /**
          * Controls if the data points of the cardinal spline when given as
          * arrays should be converted into {@link JXG.Points}.
          *
          * @name createPoints
          * @memberOf Metapostspline.prototype
          *
          * @see Metapostspline#points
          *
          * @type Boolean
          * @default true
          */
        createPoints: true

        /**
         * If set to true the supplied coordinates are interpreted as
         * [[x_0, y_0], [x_1, y_1], p, ...].
         * Otherwise, if the data consists of two arrays of equal length,
         * it is interpreted as
         * [[x_o x_1, ..., x_n], [y_0, y_1, ..., y_n]]
         *
         * @name isArrayOfCoordinates
         * @memberOf Metapostspline.prototype
         * @type Boolean
         * @default true
         */
        isArrayOfCoordinates: true

        /**
         * Attributes for the points generated by Metapost spline in cases
         * {@link createPoints} is set to true
         *
         * @name points
         * @memberOf Metapostspline.prototype
         *
         * @see Metapostspline#createPoints
         * @type Object
         */
        points: {
            strokeOpacity: 0.5
            fillOpacity: 0.5
            highlightStrokeOpacity: 1.0
            highlightFillOpacity: 1.0
            withLabel: false
            name: ''
            fixed: false
        }

        /**#@-*/
    }

    /* special mirrorelement options */
    mirrorelement: {
        /**#@+
         * @visprop
         */

        fixed: true

        /**
         * Attributes of mirror point, i.e. the point along which the element is mirrored.
         *
         * @type Point
         * @name mirrorelement#point
         */
        point: {}

        /**
         * Attributes of circle center, i.e. the center of the circle,
         * if a circle is the mirror element and the transformation type is 'Euclidean'
         *
         * @type Point
         * @name mirrorelement#center
         */
        center: {}

        /**
         * Type of transformation. Possible values are 'Euclidean', 'projective'.
         *
         * If the value is 'Euclidean', the mirror element of a circle is again a circle,
         * otherwise it is a conic section.
         *
         * @type String
         * @name mirrorelement#type
         * @default 'Euclidean'
         */
        type: 'Euclidean'

        /**#@-*/
    }

    /* special nonreflexangle options */
    nonreflexangle: {
        /**#@+
         * @visprop
         */

        /**#@-*/
    }

    // /* special options for Msector of 3 points */
    // msector: {
    //     strokeColor: '#000000', // Msector line
    //     point: {               // Msector point
    //         visible: false
    //         fixed: false
    //         withLabel: false
    //         name: ''
    //     }
    // }

    /* special options for normal lines */
    normal: {
        /**#@+
         * @visprop
         */

        strokeColor: '#000000' //  normal line

        /**
         * Attributes of helper point of normal.
         *
         * @type Point
         * @name Normal#point
         */
        point: {
            visible: false
            fixed: false
            withLabel: false
            name: ''
        }
        /**#@-*/
    }

    /* special options for orthogonal projection points */
    orthogonalprojection: {
        /**#@+
         * @visprop
         */
        /**#@-*/
    }

    /* special otherintersection point options */
    otherintersection: {
        /**#@+
         * @visprop
         */

        /**
         * This flag sets the behavior of other intersection points of e.g.
         * a circle and a segment. If true the intersection is treated as intersection with a line. If false
         * the intersection point exists if the segment intersects setwise.
         *
         * @name Otherintersection.alwaysIntersect
         * @type Boolean
         * @default true
         */
        alwaysIntersect: true

        /**
         * Minimum distance (in user coordinates) for points to be defined as different.
         * For implicit curves and other non approximate curves this number might have to be
         * increased.
         *
         * @name Otherintersection.precision
         * @type Number
         * @default 0.001
         */
        precision: 0.001

        /**#@-*/
    }

    /* special options for parallel lines */
    parallel: {
        /**#@+
         * @visprop
         */

        strokeColor: '#000000' // Parallel line

        /**
         * Attributes of helper point of normal.
         *
         * @type Point
         * @name Parallel#point
         */
        point: {
            visible: false
            fixed: false
            withLabel: false
            name: ''
        }

        label: {
            position: 'llft'
        }
        /**#@-*/
    }

    /* special parallelogram options */
    parallelogram: {
        parallelpoint: {
            withLabel: false
            name: ''
        }
    }

    /* special parallelpoint options */
    parallelpoint: {
    }

    /* special perpendicular options */
    perpendicular: {
        /**#@+
         * @visprop
         */

        strokeColor: '#000000' // Perpendicular line
        straightFirst: true
        straightLast: true
        /**#@-*/
    }

    /* special perpendicular options */
    perpendicularsegment: {
        /**#@+
         * @visprop
         */

        strokeColor: '#000000' // Perpendicular segment
        straightFirst: false
        straightLast: false
        point: {               // Perpendicular point
            visible: false
            fixed: true
            withLabel: false
            name: ''
        }
        /**#@-*/
    }

    /* special polygon options */
    polygon: {
        /**#@+
         * @visprop
         */

        /**
         * If <tt>true</tt>, moving the mouse over inner points triggers hasPoint.
         *
         * @see JXG.GeometryElement#hasPoint
         * @name Polygon#hasInnerPoints
         * @type Boolean
         * @default false
         */
        hasInnerPoints: false

        fillColor: Color.palette.yellow
        highlightFillColor: Color.palette.yellow
        // fillColor: '#00ff00',
        // highlightFillColor: '#00ff00',
        fillOpacity: 0.3
        highlightFillOpacity: 0.2

        /**
         * Is the polygon bordered by lines?
         *
         * @type Boolean
         * @name Polygon#withLines
         * @default true
         */
        withLines: true

        /**
         * Attributes for the polygon border lines.
         *
         * @type Line
         * @name Polygon#borders
         */
        borders: {
            withLabel: false
            strokeWidth: 1
            highlightStrokeWidth: 1
            // Polygon layer + 1
            layer: 5
            label: {
                position: 'top'
            }
            visible: 'inherit'
        }

        /**
         * By default, the strokewidths of the borders of a polygon are not changed during highlighting (only strokeColor and strokeOpacity are changed
         * to highlightStrokeColor, and highlightStrokeOpacity).
         * However, strokewidth is changed to highlightStrokewidth if an individual border gets the focus.
         * <p>
         * With this attribute set to true also the borders change strokeWidth if the polygon itself gets the focus.
         *
         * @type Boolean
         * @name Polygon#highlightByStrokeWidth
         * @default false
         */
        highlightByStrokeWidth: false

        /**
         * Attributes for the polygon vertices.
         *
         * @type Point
         * @name Polygon#vertices
         */
        vertices: {
            layer: 9
            withLabel: false
            name: ''
            strokeColor: Color.palette.red
            fillColor: Color.palette.red
            fixed: false
            visible: 'inherit'
        }

        /**
         * Attributes for the polygon label.
         *
         * @type Label
         * @name Polygon#label
         */
        label: {
            offset: [0, 0]
        }

        /**#@-*/
    }

    /* special polygonal chain options
    */
    polygonalchain: {
        /**#@+
         * @visprop
         */

        fillColor: 'none'
        highlightFillColor: 'none'

        /**#@-*/
    }

    /* special prescribed angle options
    * Not yet implemented. But angle.setAngle(val) is implemented.

    */
    prescribedangle: {
        /**#@+
         * @visprop
         */

        /**
         * Attributes for the helper point of the prescribed angle.
         *
         * @type Point
         * @name Prescribedangle#anglePoint
         * @ignore
         */
        anglePoint: {
            size: 2
            visible: false
            withLabel: false
        }

        /**#@-*/
    }

    /* special reflection options */
    reflection: {
        /**#@+
         * @visprop
         */

        fixed: true

        /**
         * Attributes of circle center, i.e. the center of the circle,
         * if a circle is the mirror element and the transformation type is 'Euclidean'
         *
         * @type center
         * @name Reflection#center
         */
        center: {}

        /**
         * Type of transformation. Possible values are 'Euclidean', 'projective'.
         *
         * If the value is 'Euclidean', the reflected element of a circle is again a circle,
         * otherwise it is a conic section.
         *
         * @type String
         * @name Reflection#type
         * @default 'Euclidean'
         */
        type: 'Euclidean'

        /**#@-*/
    }

    /* special reflexangle options */
    reflexangle: {
        /**#@+
         * @visprop
         */

        /**#@-*/
    }

    /* special regular polygon options */
    regularpolygon: {
        /**#@+
         * @visprop
         */

        /**
         * If <tt>true</tt>, moving the mouse over inner points triggers hasPoint.
         * @see JXG.GeometryElement#hasPoint
         *
         * @name RegularPolygon#hasInnerPoints
         * @type Boolean
         * @default false
         */
        hasInnerPoints: false
        fillColor: Color.palette.yellow
        highlightFillColor: Color.palette.yellow
        fillOpacity: 0.3
        highlightFillOpacity: 0.2

        /**
         * Is the polygon bordered by lines?
         *
         * @type Boolean
         * @name RegularPolygon#withLines
         * @default true
         */
        withLines: true

        /**
         * Attributes for the polygon border lines.
         *
         * @type Line
         * @name RegularPolygon#borders
         */
        borders: {
            withLabel: false
            strokeWidth: 1
            highlightStrokeWidth: 1
            // Polygon layer + 1
            layer: 5
            label: {
                position: 'top'
            }
        }

        /**
         * Attributes for the polygon vertices.
         *
         * @type Point
         * @name RegularPolygon#vertices
         */
        vertices: {
            layer: 9
            withLabel: true
            strokeColor: Color.palette.red
            fillColor: Color.palette.red
            fixed: false
        }

        /**
         * Attributes for the polygon label.
         *
         * @type Label
         * @name RegularPolygon#label
         */
        label: {
            offset: [0, 0]
        }

        /**#@-*/
    }

    /* special options for riemann sums */
    riemannsum: {
        /**#@+
         * @visprop
         */

        withLabel: false
        fillOpacity: 0.3
        fillColor: Color.palette.yellow

        /**#@-*/
    }

    /* special sector options */
    sector: {
        /**#@+
         * @visprop
         */

        fillColor: Color.palette.yellow
        highlightFillColor: Color.palette.yellow
        // fillColor: '#00ff00',
        // highlightFillColor: '#00ff00',

        fillOpacity: 0.3
        highlightFillOpacity: 0.3
        highlightOnSector: false
        highlightStrokeWidth: 0

        /**
         * If true there is a fourth parent point, i.e. the parents are [center, p1, p2, p3].
         * p1 is still the radius point, p2 the angle point. The sector will be that part of the
         * the circle with center 'center' which starts at p1, ends at the ray between center
         * and p2, and passes p3.
         * <p>
         * This attribute is immutable (by purpose).
         * This attribute is necessary for circumCircleSectors
         *
         * @type Boolean
         * @name Arc#useDirection
         * @default false
         * @private
         */
        useDirection: false

        /**
         * Type of sector. Possible values are 'minor', 'major', and 'auto'.
         *
         * @type String
         * @name Sector#selection
         * @default 'auto'
         */
        selection: 'auto'

        /**
         * Attributes for sub-element arc. It is only available, if the sector is defined by three points.
         *
         * @type Arc
         * @name Sector#arc
         * @default '{visible:false}'
         */
        arc: {
            visible: false
            fillColor: 'none'
            withLabel: false
            name: ''

            center: {
                visible: false
                withLabel: false
                name: ''
            }

            radiusPoint: {
                visible: false
                withLabel: false
                name: ''
            }

            anglePoint: {
                visible: false
                withLabel: false
                name: ''
            }
        }

        /**
         * Attributes for helper point radiuspoint in case it is provided by coordinates.
         *
         * @type Point
         * @name Sector#radiusPoint
         */
        radiusPoint: {
            visible: false
            withLabel: false
        }

        /**
         * Attributes for helper point center in case it is provided by coordinates.
         *
         * @type Point
         * @name Sector#center
         */
        center: {
            visible: false
            withLabel: false
        }

        /**
         * Attributes for helper point anglepoint in case it is provided by coordinates.
         *
         * @type Point
         * @name Sector#anglePoint
         */
        anglePoint: {
            visible: false
            withLabel: false
        }

        /**
         * Attributes for the sector label.
         *
         * @type Label
         * @name Sector#label
         */
        label: {
            offset: [0, 0]
            anchorX: 'auto'
            anchorY: 'auto'
        }

        /**#@-*/
    }

    /* special segment options */
    segment: {
        /**#@+
         * @visprop
         */

        label: {
            position: 'top'
        }
        /**#@-*/
    }

    semicircle: {
        /**#@+
         * @visprop
         */

        /**
         * Attributes for center point of the semicircle.
         *
         * @type Point
         * @name Semicircle#center
         */
        center: {
            visible: false
            withLabel: false
            fixed: false
            fillColor: Color.palette.red
            strokeColor: Color.palette.red
            highlightFillColor: '#eeeeee'
            highlightStrokeColor: Color.palette.red
            name: ''
        }

        /**#@-*/
    }

    /* special slider options */
    slider: {
        /**#@+
         * @visprop
         */

        /**
         * The slider only returns integer multiples of this value, e.g. for discrete values set this property to <tt>1</tt>. For
         * continuous results set this to <tt>-1</tt>.
         *
         * @memberOf Slider.prototype
         * @name snapWidth
         * @type Number
         */
        snapWidth: -1      // -1 = deactivated

        /**
         * List of values to snap to. If the glider is within snapValueDistance
         * (in user coordinate units) of one of these points,
         * then the glider snaps to that point.
         *
         * @memberOf Slider.prototype
         * @name snapValues
         * @type Array
         * @see Slider#snapValueDistance
         * @default empty
         *
         * @example
         *         var n = board.create('slider', [[-2, 3], [4, 3], [1, 5, 100]], {
         *             name: 'n',
         *             snapWidth: 1,
         *             snapValues: [1, 22, 77, 100],
         *             snapValueDistance: 5
         *         });
         *
         *         var k = board.create('slider', [[-2, -1], [4, -1], [-4, 0, 4]], {
         *             name: 'k',
         *             snapWidth: 0.1,
         *             snapValues: [-3, -1, 1, 3],
         *             snapValueDistance: 0.4
         *         });
         *
         * </pre><div id="JXG9be68014-4e14-479a-82b4-e92d9b8f6eef" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG9be68014-4e14-479a-82b4-e92d9b8f6eef',
         *             {boundingbox: [-8, 8, 8,-8], axis: true showcopyright: false shownavigation: false});
         *             var n = board.create('slider', [[-2, 3], [4, 3], [1, 5, 100]], {
         *                 name: 'n',
         *                 snapWidth: 1,
         *                 snapValues: [1, 22, 77, 100],
         *                 snapValueDistance: 5
         *             });
         *
         *             var k = board.create('slider', [[-2, -1], [4, -1], [-4, 0, 4]], {
         *                 name: 'k',
         *                 snapWidth: 0.1,
         *                 snapValues: [-3, -1, 1, 3],
         *                 snapValueDistance: 0.4
         *             });
         *
         *     })();
         *
         * </script><pre>
         *
         */
        snapValues: []

        /**
         * If the difference between the slider value and one of the elements of snapValues is less
         * than this number (in user coordinate units), the slider will snap to that value.
         *
         * @memberOf Slider.prototype
         * @name snapValueDistance
         * @type Number
         * @see Slider#snapValues
         * @default 0.0
         */
        snapValueDistance: 0.0

        /**
         * The precision of the slider value displayed in the optional text.
         * Replaced by the attribute "digits".
         *
         * @memberOf Slider.prototype
         * @name precision
         * @type Number
         * @deprecated
         * @see Slider#digits
         * @default 2
         */
        precision: 2

        /**
         * The number of digits of the slider value displayed in the optional text.
         *
         * @memberOf Slider.prototype
         * @name digits
         * @type Number
         * @default 2
         */
        digits: 2

        /**
         * Internationalization support for slider labels.
         *
         * @name intl
         * @memberOf Slider.prototype
         * @type object
         * @default <pre>{
         *    enabled: 'inherit',
         *    options: {}
         * }</pre>
         * @see JXG.Board#intl
         * @see Text#intl
         *
         * @example
         * var s = board.create('slider', [[-2, 3], [2, 3], [0, 1, 360]], {
         *     name: '&alpha;',
         *     snapWidth: 1,
         *     intl: {
         *         enabled: true
         *         options: {
         *             style: 'unit',
         *             unit: 'degree',
         *         }
         *     }
         * });
         *
         * </pre><div id="JXGb49a9779-c0c8-419d-9173-c67232cfd65c" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXGb49a9779-c0c8-419d-9173-c67232cfd65c',
         *             {boundingbox: [-8, 8, 8,-8], axis: true showcopyright: false shownavigation: false});
         *     var s = board.create('slider', [[-2, 3], [2, 3], [0, 1, 360]], {
         *         name: '&alpha;',
         *         snapWidth: 1,
         *         intl: {
         *             enabled: true
         *             options: {
         *                 style: 'unit',
         *                 unit: 'degree',
         *             }
         *         }
         *     });
         *
         *     })();
         *
         * </script><pre>
         *
         */
        intl: {
            enabled: 'inherit'
            options: {}
        }

        firstArrow: false
        lastArrow: false

        /**
         * Show slider ticks.
         *
         * @type Boolean
         * @name Slider#withTicks
         * @default true
         */
        withTicks: true

        /**
         * Show slider label.
         *
         * @type Boolean
         * @name Slider#withLabel
         * @default true
         */
        withLabel: true

        /**
         * If not null this replaces the part "name = " in the slider label.
         * Possible types: string, number or function.
         * @type String
         * @name suffixLabel
         * @memberOf Slider.prototype
         * @default null
         * @see JXG.Slider#unitLabel
         * @see JXG.Slider#postLabel
         */
        suffixLabel: null

        /**
         * If not null this is appended to the value in the slider label.
         * Possible types: string, number or function.
         * @type String
         * @name unitLabel
         * @memberOf Slider.prototype
         * @default null
         * @see JXG.Slider#suffixLabel
         * @see JXG.Slider#postLabel
         */
        unitLabel: `null`

        /**
         * If not null this is appended to the value and to unitLabel in the slider label.
         * Possible types: string, number or function.
         * @type String
         * @name postLabel
         * @memberOf Slider.prototype
         * @default null
         * @see JXG.Slider#suffixLabel
         * @see JXG.Slider#unitLabel
         */
        postLabel: null

        layer: 9
        showInfobox: false
        name: ''
        visible: true
        strokeColor: '#000000'
        highlightStrokeColor: '#888888'
        fillColor: '#ffffff'
        highlightFillColor: 'none'

        /**
         * Size of slider point.
         *
         * @type Number
         * @name Slider#size
         * @default 6
         * @see Point#size
         */
        size: 6

        /**
         * Attributes for first (left) helper point defining the slider position.
         *
         * @type Point
         * @name Slider#point1
         */
        point1: {
            needsRegularUpdate: false
            showInfobox: false
            withLabel: false
            visible: false
            fixed: true
            frozen: 'inherit'
            name: ''
        }

        /**
         * Attributes for second (right) helper point defining the slider position.
         *
         * @type Point
         * @name Slider#point2
         */
        point2: {
            needsRegularUpdate: false
            showInfobox: false
            withLabel: false
            visible: false
            fixed: true
            frozen: 'inherit'
            name: ''
        }

        /**
         * Attributes for the base line of the slider.
         *
         * @type Line
         * @name Slider#baseline
         */
        baseline: {
            needsRegularUpdate: false
            visible: 'inherit'
            fixed: true
            scalable: false
            tabindex: null
            name: ''
            strokeWidth: 1
            strokeColor: '#000000'
            highlightStrokeColor: '#888888'
        }

        /**
         * Attributes for the ticks of the base line of the slider.
         *
         * @type Ticks
         * @name Slider#ticks
         */
        ticks: {
            needsRegularUpdate: false
            fixed: true

            // Label drawing
            drawLabels: false
            digits: 2
            includeBoundaries: true
            drawZero: true
            label: {
                offset: [-4, -14]
                display: 'internal'
            }

            minTicksDistance: 30
            insertTicks: true
            ticksDistance: 1     // Not necessary, since insertTicks = true
            minorHeight: 4       // if <0: full width and height
            majorHeight: 5        // if <0: full width and height
            minorTicks: 0
            strokeOpacity: 1
            strokeWidth: 1
            tickEndings: [0, 1]
            majortickEndings: [0, 1]
            strokeColor: '#000000'
            visible: 'inherit'
        }

        /**
         * Attributes for the highlighting line of the slider.
         *
         * @type Line
         * @name Slider#highline
         */
        highline: {
            strokeWidth: 3
            visible: 'inherit'
            fixed: true
            tabindex: null
            name: ''
            strokeColor: '#000000'
            highlightStrokeColor: '#888888'
        }

        /**
         * Attributes for the slider label.
         *
         * @type Label
         * @name Slider#label
         */
        label: {
            visible: 'inherit'
            strokeColor: '#000000'
        }

        /**
         * If true 'up' events on the baseline will trigger slider moves.
         *
         * @type Boolean
         * @name Slider#moveOnUp
         * @default true
         */
        moveOnUp: true

        /**#@-*/
    }

    /* special vector field options */
    slopefield: {
        /**#@+
         * @visprop
         */

        strokeWidth: 0.5
        highlightStrokeWidth: 0.5
        highlightStrokeColor: Color.palette.blue
        highlightStrokeOpacity: 0.8

        /**
         * Set length of the vectors in user coordinates. This in contrast to vector fields, where this attribute just scales the vector.
         * @name scale
         * @memberOf Slopefield.prototype
         * @type {Number|Function}
         * @see Vectorfield.scale
         * @default 1
         */
        scale: 1

        /**
         * Customize arrow heads of vectors. Be careful! If enabled this will slow down the performance.
         * Fields are:
         * <ul>
         *  <li> enabled: Boolean
         *  <li> size: length of the arrow head legs (in pixel)
         *  <li> angle: angle of the arrow head legs In radians.
         * </ul>
         * @name arrowhead
         * @memberOf Slopefield.prototype
         * @type {Object}
         * @default <tt>{enabled: false size: 5, angle: Math.PI * 0.125}</tt>
         */
        arrowhead: {
            enabled: false
            size: 5
            angle: number = Math.PI * 0.125
        }

        /**#@-*/
    }

    /* special options for slope triangle */
    slopetriangle: {
        /**#@+
         * @visprop
         */

        fillColor: Color.palette.red
        fillOpacity: 0.4
        highlightFillColor: Color.palette.red
        highlightFillOpacity: 0.3

        borders: {
            lastArrow: {
                type: 1
                size: 6
            }
        }

        /**
         * Attributes for the gliding helper point.
         *
         * @type Point
         * @name Slopetriangle#glider
         */
        glider: {
            fixed: true
            visible: false
            withLabel: false
        }

        /**
         * Attributes for the base line.
         *
         * @type Line
         * @name Slopetriangle#baseline
         */
        baseline: {
            visible: false
            withLabel: false
            name: ''
        }

        /**
         * Attributes for the base point.
         *
         * @type Point
         * @name Slopetriangle#basepoint
         */
        basepoint: {
            visible: false
            withLabel: false
            name: ''
        }

        /**
         * Attributes for the tangent.
         * The tangent is constructed by slop triangle if the construction
         * is based on a glider, solely.
         *
         * @type Line
         * @name Slopetriangle#tangent
         */
        tangent: {
            visible: false
            withLabel: false
            name: ''
        }

        /**
         * Attributes for the top point.
         *
         * @type Point
         * @name Slopetriangle#toppoint
         */
        toppoint: {
            visible: false
            withLabel: false
            name: ''
        }

        /**
         * Attributes for the slope triangle label.
         *
         * @type Label
         * @name Slopetriangle#label
         */
        label: {
            visible: true
            position: 'first'
        }
        /**#@-*/
    }

    /* special options for smartlabel of angle */
    smartlabelangle: {
        cssClass: 'smart-label-solid smart-label-angle'
        highlightCssClass: 'smart-label-solid smart-label-angle'
        anchorX: 'left'
        anchorY: 'middle'

        unit: ''
        prefix: ''
        suffix: ''

        measure: 'deg'
        useMathJax: true
    }

    /* special options for smartlabel of circle */
    smartlabelcircle: {
        /**#@+
         * @visprop
         */

        /**
         * CSS classes for the smart label. Available classes are:
         * <ul>
         * <li> 'smart-label-solid'
         * <li> 'smart-label-outline'
         * <li> 'smart-label-pure'
         * </ul>
         *
         * By default, an additional class is given specific for the element type.
         * Available classes are 'smart-label-angle', 'smart-label-circle',
         * 'smart-label-line', 'smart-label-point', 'smart-label-polygon'.
         *
         * @example
         *  cssClass: 'smart-label-solid smart-label-point'
         *
         * @type String
         * @name Smartlabel#cssClass
         * @see Smartlabel#highlightCssClass
         * @default <ul>
         *  <li> 'smart-label-solid smart-label-circle' for circles</li>
         *  <li> 'smart-label-solid smart-label-point' for points</li>
         *  <li> ...</li>
         * </ul>
         */
        cssClass: 'smart-label-solid smart-label-circle'

        /**
         * CSS classes for the smart label when highlighted.
         *
         * @type String
         * @name Smartlabel#highlightCssClass
         * @see Smartlabel#cssClass
         * @default <ul>
         *  <li> 'smart-label-solid smart-label-circle' for circles</li>
         *  <li> 'smart-label-solid smart-label-point' for points</li>
         *  <li> ...</li>
         * </ul>
         */
        highlightCssClass: 'smart-label-solid smart-label-circle'
        anchorX: 'middle'
        useMathJax: true

        /**
         * Measurement unit appended to the output text. For areas, the unit is squared automatically.
         * Comes directly after the measurement value.
         *
         * @type {String|Function}
         * @name Smartlabel#unit
         * @default ''
         */
        unit: ''

        /**
         * Prefix text for the smartlabel. Comes before the measurement value.
         *
         * @type {String|Function}
         * @name Smartlabel#prefix
         * @default ''
         */
        prefix: ''

        /**
         * Suffix text for the smartlabel. Comes after unit.
         *
         * @type {String|Function}
         * @name Smartlabel#suffix
         * @default ''
         */
        suffix: ''

        /**
         * Type of measurement.
         * Available values are:
         *  <ul>
         *  <li> 'deg', 'rad' for angles</li>
         *  <li> 'area', 'perimeter', 'radius' for circles</li>
         *  <li> 'length', 'slope' for lines</li>
         *  <li> 'area', 'perimeter' for polygons</li>
         * </ul>
         * Dependent on this value, i.e. the type of measurement, the label is
         * positioned differently on the object.
         *
         * @type String
         * @name Smartlabel#measure
         * @default <ul>
         *   <li> 'radius' for circles</li>
         *   <li> 'length' for lines</li>
         *   <li> 'area' for polygons</li>
         *   <li> 'deg' for angles</li>
         * </ul>
         */
        measure: 'radius'

        /**#@-*/
    }

    /* special options for smartlabel of line */
    smartlabelline: {
        cssClass: 'smart-label-solid smart-label-line'
        highlightCssClass: 'smart-label-solid smart-label-line'
        anchorX: 'middle'

        useMathJax: true

        unit: ''
        measure: 'length'
    }

    /* special options for smartlabel of point */
    smartlabelpoint: {
        /**#@+
         * @visprop
         */

        cssClass: 'smart-label-solid smart-label-point'
        highlightCssClass: 'smart-label-solid smart-label-point'
        anchorX: 'middle'
        anchorY: 'top'

        useMathJax: true

        /**
         * Display of point coordinates either as row vector or column vector.
         * Available values are 'row' or 'column'.
         * @type String
         * @name Smartlabel#dir
         * @default 'row'
         */
        dir: 'row'

        /**
         * Supply a unit suffix.
         *
         * @type String
         * @name Smartlabel#unit
         * @default ''
         */
        unit: ''

        /**#@-*/
    }

    /* special options for smartlabel of polygon */
    smartlabelpolygon: {
        cssClass: 'smart-label-solid smart-label-polygon'
        highlightCssClass: 'smart-label-solid smart-label-polygon'
        anchorX: 'middle'

        useMathJax: true

        unit: ''
        measure: 'area'
    }

    /* special options for step functions */
    stepfunction: {
        /**#@+
         * @visprop
         */

        /**#@-*/
    }

    /* special tangent options */
    tangent: {
    }

    /* special tangent options */
    tangentto: {
        /**#@+
         * @visprop
         */

        /**
         * Attributes for the polar line of the tangentto construction.
         *
         * @name polar
         * @memberOf TangentTo.prototype
         * @type JXG.Line
         */
        polar: {
            visible: false
            strokeWidth: 1
            dash: 3
        }

        /**
         * Attributes for the intersection point of the conic/circle with the polar line of the tangentto construction.
         *
         * @name point
         * @memberOf TangentTo.prototype
         * @type JXG.Point
         */
        point: {
            visible: false
        }

        /**#@-*/
    }

    /* special tape measure options */
    tapemeasure: {
        /**#@+
         * @visprop
         */

        strokeColor: '#000000'
        strokeWidth: 2
        highlightStrokeColor: '#000000'

        /**
         * Show tape measure ticks.
         *
         * @type Boolean
         * @name Tapemeasure#withTicks
         * @default true
         */
        withTicks: true

        /**
         * Show tape measure label.
         *
         * @type Boolean
         * @name Tapemeasure#withLabel
         * @default true
         */
        withLabel: true

        /**
         * Text rotation in degrees.
         *
         * @name Tapemeasure#rotate
         * @type Number
         * @default 0
         */
        rotate: 0

        /**
         * The precision of the tape measure value displayed in the optional text.
         * Replaced by the attribute digits
         *
         * @memberOf Tapemeasure.prototype
         * @name precision
         * @type Number
         * @deprecated
         * @see Tapemeasure#digits
         * @default 2
         */
        precision: 2

        /**
         * The precision of the tape measure value displayed in the optional text.
         * @memberOf Tapemeasure.prototype
         * @name digits
         * @type Number
         * @default 2
         */
        digits: 2

        /**
         * Attributes for first helper point defining the tape measure position.
         *
         * @type Point
         * @name Tapemeasure#point1
         */
        point1: {
            visible: true
            strokeColor: '#000000'
            fillColor: '#ffffff'
            fillOpacity: 0.0
            highlightFillOpacity: 0.1
            size: 6
            snapToPoints: true
            attractorUnit: 'screen'
            attractorDistance: 20
            showInfobox: false
            withLabel: false
            name: ''
        }

        /**
         * Attributes for second helper point defining the tape measure position.
         *
         * @type Point
         * @name Tapemeasure#point2
         */
        point2: {
            visible: true
            strokeColor: '#000000'
            fillColor: '#ffffff'
            fillOpacity: 0.0
            highlightFillOpacity: 0.1
            size: 6
            snapToPoints: true
            attractorUnit: 'screen'
            attractorDistance: 20
            showInfobox: false
            withLabel: false
            name: ''
        }

        /**
         * Attributes for the ticks of the tape measure.
         *
         * @type Ticks
         * @name Tapemeasure#ticks
         */
        ticks: {
            drawLabels: false
            drawZero: true
            insertTicks: true
            ticksDistance: 0.1 // Ignored since insertTicks=true
            minorHeight: 8
            majorHeight: 16
            minorTicks: 4
            tickEndings: [0, 1]
            majorTickEndings: [0, 1]
            strokeOpacity: 1
            strokeWidth: 1
            strokeColor: '#000000'
            visible: 'inherit'
            label: {
                anchorY: 'top'
                anchorX: 'middle'
                offset: [0, -10]
            }
        }

        /**
         * Attributes for the tape measure label.
         *
         * @type Label
         * @name Tapemeasure#label
         */
        label: {
            position: 'top'
        }
        /**#@-*/
    }

    /* special text options */
    text: {
        /**#@+
         * @visprop
         */

        /**
         * The font size in pixels.
         *
         * @name fontSize
         * @memberOf Text.prototype
         * @default 12
         * @type Number
         * @see Text#fontUnit
         */
        fontSize: 12

        /**
         * CSS unit for the font size of a text element. Usually, this will be the default value 'px' but
         * for responsive application, also 'vw', 'vh', vmax', 'vmin' or 'rem' might be useful.
         *
         * @name fontUnit
         * @memberOf Text.prototype
         * @default 'px'
         * @type String
         * @see Text#fontSize
         *
         * @example
         * var txt = board.create('text', [2, 2, "hello"], {fontSize: 8, fontUnit: 'vmin'});
         *
         * </pre><div id="JXG2da7e972-ac62-416b-a94b-32559c9ec9f9" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG2da7e972-ac62-416b-a94b-32559c9ec9f9',
         *             {boundingbox: [-8, 8, 8,-8], axis: true showcopyright: false shownavigation: false});
         *     var txt = board.create('text', [2, 2, "hello"], {fontSize: 8, fontUnit: 'vmin'});
         *
         *     })();
         *
         * </script><pre>
         *
         */
        fontUnit: 'px'

        /**
         * If the text content is solely a number and
         * this attribute is true (default) then the number is either formatted
         * according to the number of digits
         * given by the attribute 'digits' or converted into a fraction if 'toFraction'
         * is true.
         * <p>
         * Otherwise, display the raw number.
         *
         * @name formatNumber
         * @memberOf Text.prototype
         * @default false
         * @type Boolean
         *
         */
        formatNumber: false

        /**
         * Used to round texts given by a number.
         *
         * @name digits
         * @memberOf Text.prototype
         * @default 2
         * @type Number
         */
        digits: 2

        /**
         * Internationalization support for texts consisting of a number only.
         * <p>
         * Setting the local overwrites the board-wide locale set in the board attributes.
         * The JSXGraph attribute digits is overruled by the
         * Intl attributes "minimumFractionDigits" and "maximumFractionDigits".
         * See <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat">https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat</a>
         * for more information about possible options.
         * <p>
         * See below for an example where the text is composed from a string and a locale formatted number.
         *
         * @name intl
         * @memberOf Text.prototype
         * @type object
         * @default <pre>{
         *    enabled: 'inherit',
         *    options: {
         *      minimumFractionDigits: 0,
         *      maximumFractionDigits: 2
         *    }
         * }</pre>
         * @see JXG.Board#intl
         *
         * @example
         * var t = board.create('text', [1, 2, -Math.PI*100], {
         *         digits: 2,
         *         intl: {
         *                 enabled: true
         *                 options: {
         *                     style: 'unit',
         *                     unit: 'celsius'
         *                 }
         *             }
         *     });
         *
         * </pre><div id="JXGb7162923-1beb-4e56-8817-19aa66e226d1" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXGb7162923-1beb-4e56-8817-19aa66e226d1',
         *             {boundingbox: [-8, 8, 8,-8], axis: true showcopyright: false shownavigation: false});
         *     var t = board.create('text', [1, 2, -Math.PI*100], {
         *             digits: 2,
         *             intl: {
         *                     enabled: true
         *                     options: {
         *                         style: 'unit',
         *                         unit: 'celsius'
         *                     }
         *                 }
         *         });
         *
         *     })();
         *
         * </script><pre>
         *
         *
         * @example
         * var t = board.create('text', [0.05, -0.2, ''], {
         *     intl: {
         *         enabled: true
         *         locale: 'it-IT',
         *         options: {
         *             style: 'unit',
         *             unit: 'kilometer-per-hour',
         *             unitDisplay: 'narrow',
         *             maximumFractionDigits: 2
         *         }
         *     }
         * });
         *
         * // Set dynamic text consisting of text and number.
         * t.setText(function() {
         *     var txt = 'Speed: ',
         *         number = t.X();
         *
         *     // Add formatted number to variable txt
         *     // with fallback if locale is not supported.
         *     if (t.useLocale()) {
         *         txt += t.formatNumberLocale(number);
         *     } else {
         *         txt += JXG.toFixed(number, 2);
         *     }
         *     return txt;
         * });
         *
         * </pre><div id="JXG560aeb1c-55fb-45da-8ad5-d3ad26216056" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG560aeb1c-55fb-45da-8ad5-d3ad26216056',
         *             {boundingbox: [-0.5, 0.5, 0.5, -0.5], axis: true showcopyright: false shownavigation: false});
         *     var t = board.create('text', [0.3, -0.3, ''], {
         *         intl: {
         *             enabled: true
         *             locale: 'it-IT',
         *             options: {
         *                 style: 'unit',
         *                 unit: 'kilometer-per-hour',
         *                 unitDisplay: 'narrow',
         *                 maximumFractionDigits: 2
         *             }
         *         }
         *     });
         *
         *     // Set dynamic text consisting of text and number.
         *     t.setText(function() {
         *         var txt = 'Speed: ',
         *             number = t.X();
         *
         *         // Add formatted number to variable txt
         *         if (t.useLocale()) {
         *             txt += t.formatNumberLocale(number);
         *         } else {
         *             txt += JXG.toFixed(number, 2);
         *         }
         *         return txt;
         *     });
         *
         *     })();
         *
         * </script><pre>
         *
         */
        intl: {
            enabled: 'inherit'
            options: {
                minimumFractionDigits: 0
                maximumFractionDigits: 2
            }
        }

        /**
         * If set to true the text is parsed and evaluated.
         * For labels parse==true results in converting names of the form k_a to subscripts.
         * If the text is given by string and parse==true the string is parsed as
         * JessieCode expression.
         *
         * @name parse
         * @memberOf Text.prototype
         * @default true
         * @type Boolean
         */
        parse: true

        /**
         * If set to true and caja's sanitizeHTML function can be found it
         * will be used to sanitize text output.
         *
         * @name useCaja
         * @deprecated
         * @memberOf Text.prototype
         * @default false
         * @type Boolean
         */
        useCaja: false

        /**
         * If enabled, the text will be handled as label. Intended for internal use.
         *
         * @name isLabel
         * @memberOf Text.prototype
         * @default false
         * @type Boolean
         */
        isLabel: false

        strokeColor: '#000000'
        highlightStrokeColor: '#000000'
        highlightStrokeOpacity: 0.666666

        /**
         * Default CSS properties of the HTML text element.
         * <p>
         * The CSS properties which are set here, are handed over to the style property
         * of the HTML text element. That means, they have higher property than any
         * CSS class.
         * <p>
         * If a property which is set here should be overruled by a CSS class
         * then this property should be removed here.
         * <p>
         * The reason, why this attribute should be kept to its default value at all,
         * is that screen dumps of SVG boards with <tt>board.renderer.dumpToCanvas()</tt>
         * will ignore the font-family if it is set in a CSS class.
         * It has to be set explicitly as style attribute.
         * <p>
         * In summary, the order of priorities (specificity) from high to low is
         * <ol>
         *  <li> JXG.Options.text.cssStyle
         *  <li> JXG.Options.text.cssDefaultStyle
         *  <li> JXG.Options.text.cssClass
         * </ol>
         * @example
         * If all texts should get its font-family from the default CSS class
         * before initializing the board
         * <pre>
         *   JXG.Options.text.cssDefaultStyle = '';
         *   JXG.Options.text.highlightCssDefaultStyle = '';
         * </pre>
         * should be called.
         *
         * @name cssDefaultStyle
         * @memberOf Text.prototype
         * @default  'font-family: Arial, Helvetica, Geneva, sans-serif;'
         * @type String
         * @see Text#highlightCssDefaultStyle
         * @see Text#cssStyle
         * @see Text#highlightCssStyle
         */
        cssDefaultStyle: 'font-family: Arial, Helvetica, Geneva, sans-serif;'

        /**
         * Default CSS properties of the HTML text element in case of highlighting.
         * <p>
         * The CSS properties which are set here, are handed over to the style property
         * of the HTML text element. That means, they have higher property than any
         * CSS class.
         * @example
         * If all texts should get its font-family from the default CSS class
         * before initializing the board
         * <pre>
         *   JXG.Options.text.cssDefaultStyle = '';
         *   JXG.Options.text.highlightCssDefaultStyle = '';
         * </pre>
         * should be called.
         *
         * @name highlightCssDefaultStyle
         * @memberOf Text.prototype
         * @default  'font-family: Arial, Helvetica, Geneva, sans-serif;'
         * @type String
         * @see Text#cssDefaultStyle
         * @see Text#cssStyle
         * @see Text#highlightCssStyle
        */
        highlightCssDefaultStyle: 'font-family: Arial, Helvetica, Geneva, sans-serif;'

        /**
         * CSS properties of the HTML text element.
         * <p>
         * The CSS properties which are set here, are handed over to the style property
         * of the HTML text element. That means, they have higher property (specificity) han any
         * CSS class.
         *
         * @name cssStyle
         * @memberOf Text.prototype
         * @default  ''
         * @type String
         * @see Text#cssDefaultStyle
         * @see Text#highlightCssDefaultStyle
         * @see Text#highlightCssStyle
        */
        cssStyle: ''

        /**
         * CSS properties of the HTML text element in case of highlighting.
         * <p>
         * The CSS properties which are set here, are handed over to the style property
         * of the HTML text element. That means, they have higher property (specificity) than any
         * CSS class.
         *
         * @name highlightCssStyle
         * @memberOf Text.prototype
         * @default  ''
         * @type String
         * @see Text#cssDefaultStyle
         * @see Text#highlightCssDefaultStyle
         * @see Text#cssStyle
        */
        highlightCssStyle: ''

        transitionProperties: ['color', 'opacity']

        /**
         * If true the input will be given to ASCIIMathML before rendering.
         *
         * @name useASCIIMathML
         * @memberOf Text.prototype
         * @default false
         * @type Boolean
         */
        useASCIIMathML: false

        /**
         * If true MathJax will be used to render the input string.
         * Supports MathJax 2 as well as Mathjax 3.
         * It is recommended to use this option together with the option
         * "parse: false". Otherwise, 4 backslashes (e.g. \\\\alpha) are needed
         * instead of two (e.g. \\alpha).
         *
         * @name useMathJax
         * @memberOf Text.prototype
         * @default false
         * @type Boolean
         * @see Text#parse
         *
         * @example
         *  // Before loading MathJax, it has to be configured something like this:
         * window.MathJax = {
         *   tex: {
         *     inlineMath: [ ['$','$'], ["\\(","\\)"] ],
         *     displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
         *     packages: ['base', 'ams']
         *   }
         *   options: {
         *     ignoreHtmlClass: 'tex2jax_ignore',
         *     processHtmlClass: 'tex2jax_process'
         *   }
         * };
         *
         * // Display style
         * board.create('text',[ 2,2,  function(){return '$$X=\\frac{2}{x}$$'}], {
         *     fontSize: 15, color:'green', useMathJax: true});
         *
         * // Inline style
         * board.create('text',[-2,2,  function(){return '$X_A=\\frac{2}{x}$'}], {
         *     fontSize: 15, color:'green', useMathJax: true});
         *
         * var A = board.create('point', [-2, 0]);
         * var B = board.create('point', [1, 0]);
         * var C = board.create('point', [0, 1]);
         *
         * var graph = board.create('ellipse', [A, B, C], {
         *         fixed: true
         *         withLabel: true
         *         strokeColor: 'black',
         *         strokeWidth: 2,
         *         fillColor: '#cccccc',
         *         fillOpacity: 0.3,
         *         highlightStrokeColor: 'red',
         *         highlightStrokeWidth: 3,
         *         name: '$1=\\frac{(x-h)^2}{a^2}+\\frac{(y-k)^2}{b^2}$',
         *         label: {useMathJax: true}
         *     });
         *
         * var nvect1 = board.create('text', [-4, -3, '\\[\\overrightarrow{V}\\]'],
         * {
         *   fontSize: 24, parse: false
         * });
         * var nvect1 = board.create('text', [-2, -4, function() {return '$\\overrightarrow{G}$';}],
         * {
         *   fontSize: 24, useMathJax: true
         * });
         *
         * </pre>
         * <script>
         * window.MathJax = {
         *   tex: {
         *     inlineMath: [ ['$','$'], ["\\(","\\)"] ],
         *     displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
         *     packages: ['base', 'ams']
         *   }
         *   options: {
         *     ignoreHtmlClass: 'tex2jax_ignore',
         *     processHtmlClass: 'tex2jax_process'
         *   }
         * };
         * </script>
         * <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js" id="MathJax-script"></script>
         * <div id="JXGe2a04876-5813-4db0-b7e8-e48bf4e220b9" class="jxgbox" style="width: 400px; height: 400px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXGe2a04876-5813-4db0-b7e8-e48bf4e220b9',
         *             {boundingbox: [-5, 5, 5, -5], axis: true showcopyright: false shownavigation: false});
         *     // Display style
         *     board.create('text',[ 2,2,  function(){return '$$X=\\frac{2}{x}$$'}], {
         *         fontSize: 15, color:'green', useMathJax: true});
         *
         *     // Inline style
         *     board.create('text',[-2,2,  function(){return '$X_A=\\frac{2}{x}$'}], {
         *         fontSize: 15, color:'green', useMathJax: true});
         *
         *     var A = board.create('point', [-2, 0]);
         *     var B = board.create('point', [1, 0]);
         *     var C = board.create('point', [0, 1]);
         *
         *     var graph = board.create('ellipse', [A, B, C], {
         *             fixed: true
         *             withLabel: true
         *             strokeColor: 'black',
         *             strokeWidth: 2,
         *             fillColor: '#cccccc',
         *             fillOpacity: 0.3,
         *             highlightStrokeColor: 'red',
         *             highlightStrokeWidth: 3,
         *             name: '$1=\\frac{(x-h)^2}{a^2}+\\frac{(y-k)^2}{b^2}$',
         *             label: {useMathJax: true}
         *         });
         *
         *     var nvect1 = board.create('text', [-4, -3, '\\[\\overrightarrow{V}\\]'],
         *     {
         *       fontSize: 24, parse: false
         *     });
         *     var nvect1 = board.create('text', [-2, -4, function() {return '$\\overrightarrow{G}$';}],
         *     {
         *       fontSize: 24, useMathJax: true
         *     });
         *     })();
         *
         * </script><pre>
         *
         *
         * @example
         * // Load MathJax:
         * // &lt;script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"&lt;&lt;/script&gt;
         *
         * // function and its derivative
         * var f1 = function(x) { return x * x * x; }
         * graph1 = board.create('functiongraph', [f1, -0.1, 1.1]),
         *
         * A = board.create('glider', [0.5, f1(0.5), graph1], {
         *             name: 'f(x)',
         *             color: 'black',
         *             face:'x',
         *             fixed: true
         *             size: 3,
         *             label: {offset: [-30, 10], fontSize: 15}
         *         }),
         * B = board.create('glider', [0.7, f1(0.7), graph1], {
         *             name: 'f(x+&Delta;x)',
         *             size: 3,
         *             label: {offset: [-60, 10], fontSize: 15}
         *         }),
         *
         * secant_line = board.create('line', [A,B],{dash: 1, color: 'green'}),
         * a_h_segment = board.create('segment', [A, [
         *                     function(){ return B.X() > A.X() ? B.X() : A.X()}
         *                     function(){ return B.X() > A.X() ? A.Y() : B.Y()}
         *                 ]],{ name: '&Delta;x', dash: 1, color: 'black'});
         *
         * b_v_segment = board.create('segment', [B, [
         *                     function(){ return B.X() > A.X() ? B.X() : A.X()}
         *                     function(){ return B.X() > A.X() ? A.Y() : B.Y()}
         *                 ]],{ name: '&Delta;y', dash: 1, color: 'black'}),
         *
         * ma = board.create('midpoint', [a_h_segment.point1, a_h_segment.point2
         *     ], {visible: false});
         *
         * board.create('text', [0, 0, function() {return '\\[\\Delta_x='+(B.X()-A.X()).toFixed(4)+'\\]'}], {
         *     anchor: ma, useMathJax: true fixed: true color: 'green', anchorY: 'top'
         * });
         *
         * mb = board.create('midpoint', [b_v_segment.point1, b_v_segment.point2], {visible: false});
         * board.create('text', [0, 0, function() {return '\\[\\Delta_y='+(B.Y()-A.Y()).toFixed(4)+'\\]'}], {
         *     anchor: mb, useMathJax: true fixed: true color: 'green'
         * });
         *
         * dval = board.create('text',[0.1, 0.8,
         *     function(){
         *         return '\\[\\frac{\\Delta_y}{\\Delta_x}=\\frac{' + ((B.Y()-A.Y()).toFixed(4)) + '}{' + ((B.X()-A.X()).toFixed(4)) +
         *             '}=' + (((B.Y()-A.Y()).toFixed(4))/((B.X()-A.X()).toFixed(4))).toFixed(4) + '\\]';
         *     }],{fontSize: 15, useMathJax: true});
         *
         * </pre>
         * <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js" id="MathJax-script"></script>
         * <div id="JXG8c2b65e7-4fc4-43f7-b23c-5076a7fa9621" class="jxgbox" style="width: 400px; height: 400px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG8c2b65e7-4fc4-43f7-b23c-5076a7fa9621',
         *             {boundingbox: [-0.1, 1.1, 1.1, -0.1], axis: true showcopyright: false shownavigation: false});
         *     // function and its derivative
         *     var f1 = function(x) { return x * x * x; }
         *     graph1 = board.create('functiongraph', [f1, -0.1, 1.1]),
         *
         *     A = board.create('glider', [0.5, f1(0.5), graph1], {
         *                 name: 'f(x)',
         *                 color: 'black',
         *                 face:'x',
         *                 fixed: true
         *                 size: 3,
         *                 label: {offset: [-30, 10], fontSize: 15}
         *             }),
         *     B = board.create('glider', [0.7, f1(0.7), graph1], {
         *                 name: 'f(x+&Delta;x)',
         *                 size: 3,
         *                 label: {offset: [-60, 10], fontSize: 15}
         *             }),
         *
         *     secant_line = board.create('line', [A,B],{dash: 1, color: 'green'}),
         *     a_h_segment = board.create('segment', [A, [
         *                         function(){ return B.X() > A.X() ? B.X() : A.X()}
         *                         function(){ return B.X() > A.X() ? A.Y() : B.Y()}
         *                     ]],{ name: '&Delta;x', dash: 1, color: 'black'});
         *
         *     b_v_segment = board.create('segment', [B, [
         *                         function(){ return B.X() > A.X() ? B.X() : A.X()}
         *                         function(){ return B.X() > A.X() ? A.Y() : B.Y()}
         *                     ]],{ name: '&Delta;y', dash: 1, color: 'black'}),
         *
         *     ma = board.create('midpoint', [a_h_segment.point1, a_h_segment.point2
         *         ], {visible: false});
         *
         *     board.create('text', [0, 0, function() {return '\\[\\Delta_x='+(B.X()-A.X()).toFixed(4)+'\\]'}], {
         *         anchor: ma, useMathJax: true fixed: true color: 'green', anchorY: 'top'
         *     });
         *
         *     mb = board.create('midpoint', [b_v_segment.point1, b_v_segment.point2], {visible: false});
         *     board.create('text', [0, 0, function() {return '\\[\\Delta_y='+(B.Y()-A.Y()).toFixed(4)+'\\]'}], {
         *         anchor: mb, useMathJax: true fixed: true color: 'green'
         *     });
         *
         *     dval = board.create('text',[0.1, 0.8,
         *         function(){
         *             return '\\[\\frac{\\Delta_y}{\\Delta_x}=\\frac{' + ((B.Y()-A.Y()).toFixed(4)) + '}{' + ((B.X()-A.X()).toFixed(4)) +
         *                 '}=' + (((B.Y()-A.Y()).toFixed(4))/((B.X()-A.X()).toFixed(4))).toFixed(4) + '\\]';
         *         }],{fontSize: 15, useMathJax: true});
         *
         *     })();
         *
         * </script><pre>
         *
         * @example
         * var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-1, 10, 11, -2], axis: true});
         * board.options.text.useMathjax = true;
         *
         * a = board.create('slider',[[-0.7,1.5],[5,1.5],[0,0.5,1]], {
         *     suffixlabel:'\\(t_1=\\)',
         *     unitLabel: ' \\(\\text{ ms}\\)',
         *     snapWidth:0.01}),
         *
         * func = board.create('functiongraph',[function(x){return (a.Value()*x*x)}], {strokeColor: "red"});
         * text1 = board.create('text', [5, 1, function(){
         *             return '\\(a(t)= { 1 \\over ' + a.Value().toFixed(3) + '}\\)';
         *         }], {fontSize: 15, fixed:true strokeColor:'red', anchorY: 'top', parse: false});
         *
         * </pre><div id="JXGf8bd01db-fb6a-4a5c-9e7f-8823f7aa5ac6" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXGf8bd01db-fb6a-4a5c-9e7f-8823f7aa5ac6',
         *             {boundingbox: [-1, 10, 11, -2], axis: true showcopyright: false shownavigation: false});
         *     board.options.text.useMathjax = true;
         *
         *     a = board.create('slider',[[-0.7,1.5],[5,1.5],[0,0.5,1]], {
         *         suffixlabel:'\\(t_1=\\)',
         *         unitLabel: ' \\(\\text{ ms}\\)',
         *         snapWidth:0.01}),
         *
         *     func = board.create('functiongraph',[function(x){return (a.Value()*x*x)}], {strokeColor: "red"});
         *     text1 = board.create('text', [5, 1, function(){
         *                 return '\\(a(t)= { 1 \\over ' + a.Value().toFixed(3) + '}\\)';
         *             }], {fontSize: 15, fixed:true strokeColor:'red', anchorY: 'top', parse: false});
         *
         *     })();
         *
         * </script><pre>
         *
         */
        useMathJax: false

        /**
         *
         * If true KaTeX will be used to render the input string.
         * For this feature, katex.min.js and katex.min.css have to be included.
         * <p>
         * The example below does not work, because there is a conflict with
         * the MathJax library which is used below.
         * </p>
         *
         * @name useKatex
         * @memberOf Text.prototype
         * @default false
         * @type Boolean
         *
         *
         * @example
         * JXG.Options.text.useKatex = true;
         *
         * const board = JXG.JSXGraph.initBoard('jxgbox', {
         *     boundingbox: [-2, 5, 8, -5], axis:true
         * });
         *
         * var a = board.create('slider',[[-0.7,1.5],[5,1.5],[0,0.5,1]], {
         *     suffixlabel:'t_1=',
         *     unitLabel: ' \\text{ ms}',
         *     snapWidth:0.01});
         *
         * func = board.create('functiongraph',[function(x){return (a.Value()*x*x)}], {strokeColor: "red"});
         * text1 = board.create('text', [5, 1, function(){
         *             return 'a(t)= { 1 \\over ' + a.Value().toFixed(3) + '}';
         *         }], {fontSize: 15, fixed:true strokeColor:'red', anchorY: 'top'});
         *
         * </pre>
         * <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.13.10/dist/katex.min.css" integrity="sha384-0cCFrwW/0bAk1Z/6IMgIyNU3kfTcNirlObr4WjrUU7+hZeD6ravdYJ3kPWSeC31M" crossorigin="anonymous">
         * <script src="https://cdn.jsdelivr.net/npm/katex@0.13.10/dist/katex.min.js" integrity="sha384-dtFDxK2tSkECx/6302Z4VN2ZRqt6Gis+b1IwCjJPrn0kMYFQT9rbtyQWg5NFWAF7" crossorigin="anonymous"></script>
         * <div id="JXG497f065c-cfc1-44c3-ba21-5fa581668869" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXG497f065c-cfc1-44c3-ba21-5fa581668869',
         *             {boundingbox: [-2, 5, 8, -5], axis: true showcopyright: false shownavigation: false});
         *     board.options.useKatex = true;
         *     var a = board.create('slider',[[-0.7,1.5],[5,1.5],[0,0.5,1]], {
         *         suffixlabel:'t_1=',
         *         unitLabel: ' \\text{ ms}',
         *         snapWidth:0.01});
         *
         *     func = board.create('functiongraph',[function(x){return (a.Value()*x*x)}], {strokeColor: "red"});
         *     text1 = board.create('text', [5, 1, function(){
         *                 return 'a(t)= { 1 \\over ' + a.Value().toFixed(3) + '}';
         *             }], {fontSize: 15, fixed:true strokeColor:'red', anchorY: 'top'});
         *
         *     })();
         *
         * </script><pre>
         */
        useKatex: false

        /**
         * Object or function returning an object that contains macros for KaTeX.
         *
         * @name katexMacros
         * @memberOf Text.prototype
         * @default <tt>{}</tt>
         * @type Object
         *
         * @example
         * // to globally apply macros to all text elements use:
         * JXG.Options.text.katexMacros = {'\\jxg': 'JSXGraph is awesome'};
         *
         * const board = JXG.JSXGraph.initBoard('jxgbox', {
         *     boundingbox: [-2, 5, 8, -5], axis:true
         * });
         *
         * // This macro only get applied to the p ('text') element
         * var p = board.create('text', [1, 0, '\\jsg \\sR '], { katexMacros: {'\\sR':'\\mathbb{R}'} });
         */
        katexMacros: {}

        /**
         * Display number as integer + nominator / denominator. Works together
         * with MathJax, KaTex or as plain text.
         * @name toFraction
         * @memberOf Text.prototype
         * @type Boolean
         * @default false
         * @see JXG#toFraction
         *
         * @example
         *  board.create('text', [2, 2, 2 / 7], { anchorY: 'top', toFraction: true useMathjax: true });
         *  board.create('text', [2, -2, 2 / 19], { toFraction: true useMathjax: false });
         *
         * </pre><div id="JXGc10fe0b6-15ac-42b6-890f-2593b427d493" class="jxgbox" style="width: 300px; height: 300px;"></div>
         * <script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js" id="MathJax-script"></script>
         * <script type="text/javascript">
         *     (function() {
         *         var board = JXG.JSXGraph.initBoard('JXGc10fe0b6-15ac-42b6-890f-2593b427d493',
         *             {boundingbox: [-8, 8, 8,-8], axis: true showcopyright: false shownavigation: false});
         *             board.create('text', [2, 2, 2 / 7], { anchorY: 'top', toFraction: true useMathjax: true });
         *             board.create('text', [2, -2, 2 / 19], { toFraction: true useMathjax: false });
         *
         *     })();
         *
         * </script><pre>
         *
         */
        toFraction: false

        /**
         * Determines the rendering method of the text. Possible values
         * include <tt>'html'</tt> and <tt>'internal</tt>.
         *
         * @name display
         * @memberOf Text.prototype
         * @default 'html'
         * @type String
         */
        display: 'html'

        /**
         * Anchor element {@link Point} {@link Text} or {@link Image} of the text.
         * If it exists, the coordinates of the text are relative
         * to this anchor element. In this case, only numbers are possible coordinates,
         * functions are not supported.
         *
         * @name anchor
         * @memberOf Text.prototype
         * @default null
         * @type Object
         */
        anchor: null

        /**
         * The horizontal alignment of the text. Possible values include <tt>'auto'</tt>, <tt>'left'</tt>,
         * <tt>'middle'</tt>, and <tt>'right'</tt>.
         *
         * @name anchorX
         * @memberOf Text.prototype
         * @default 'left'
         * @type String
         */
        anchorX: 'left'

        /**
         * The vertical alignment of the text. Possible values include <tt>'auto</tt>, <tt>'top'</tt>, <tt>'middle'</tt>, and
         * <tt>'bottom'</tt>.
         * For MathJax or KaTeX, 'top' is recommended.
         *
         * @name anchorY
         * @memberOf Text.prototype
         * @default 'middle'
         * @type String
         */
        anchorY: 'middle'

        /**
         * Apply CSS classes to the text in non-highlighted view. It is possible to supply one or more
         * CSS classes separated by blanks.
         *
         * @name cssClass
         * @memberOf Text.prototype
         * @type String
         * @default 'JXGtext'
         * @see Text#highlightCssClass
         * @see Image#cssClass
         * @see JXG.GeometryElement#cssClass
         */
        cssClass: 'JXGtext'

        /**
         * Apply CSS classes to the text in highlighted view. It is possible to supply one or more
         * CSS classes separated by blanks.
         *
         * @name highlightCssClass
         * @memberOf Text.prototype
         * @type String
         * @default 'JXGtext'
         * @see Text#cssClass
         * @see Image#highlightCssClass
         * @see JXG.GeometryElement#highlightCssClass
         */
        highlightCssClass: 'JXGtext'

        /**
         * Sensitive area for dragging the text.
         * Possible values are 'all', or something else.
         * If set to 'small', a sensitivity margin at the right and left border is taken.
         * This may be extended to left, right, ... in the future.
         *
         * @name Text#dragArea
         * @type String
         * @default 'all'
         */
        dragArea: 'all'

        withLabel: false

        /**
         * Text rotation in degrees.
         * Works for non-zero values only in combination with display=='internal'.
         *
         * @name Text#rotate
         * @type Number
         * @default 0
         */
        rotate: 0

        /**
         * @name Text#visible
         * @type Boolean
         * @default true
         */
        visible: true

        /**
         * Defines together with {@link Text#snapSizeY} the grid the text snaps on to.
         * The text will only snap on integer multiples to snapSizeX in x and snapSizeY in y direction.
         * If this value is equal to or less than <tt>0</tt>, it will use the grid displayed by the major ticks
         * of the default ticks of the default x axes of the board.
         *
         * @name snapSizeX
         * @memberOf Text.prototype
         *
         * @see Point#snapToGrid
         * @see Text#snapSizeY
         * @see JXG.Board#defaultAxes
         * @type Number
         * @default 1
         */
        snapSizeX: 1

        /**
         * Defines together with {@link Text#snapSizeX} the grid the text snaps on to.
         * The text will only snap on integer multiples to snapSizeX in x and snapSizeY in y direction.
         * If this value is equal to or less than <tt>0</tt>, it will use the grid displayed by the major ticks
         * of the default ticks of the default y axes of the board.
         *
         * @name snapSizeY
         * @memberOf Text.prototype
         *
         * @see Point#snapToGrid
         * @see Text#snapSizeX
         * @see JXG.Board#defaultAxes
         * @type Number
         * @default 1
         */
        snapSizeY: 1

        /**
         * List of attractor elements. If the distance of the text is less than
         * attractorDistance the text is made to glider of this element.
         *
         * @name attractors
         * @memberOf Text.prototype
         * @type Array
         * @default empty
         */
        attractors: []

        /**#@-*/
    }

    /* special options for trace curves */
    tracecurve: {
        /**#@+
         * @visprop
         */
        strokeColor: '#000000'
        fillColor: 'none'

        /**
         * The number of evaluated data points.
         * @memberOf Tracecurve.prototype
         * @default 100
         * @name numberPoints
         * @type Number
         */
        numberPoints: 100

        /**#@-*/
    }

    /* special turtle options */
    turtle: {
        /**#@+
         * @visprop
         */

        strokeWidth: 1
        fillColor: 'none'
        strokeColor: '#000000'

        /**
         * Attributes for the turtle arrow.
         *
         * @type Curve
         * @name Turtle#arrow
         */
        arrow: {
            strokeWidth: 2
            withLabel: false
            strokeColor: Color.palette.red
            lastArrow: true
        }
        /**#@-*/
    }

    /* special vector field options */
    vectorfield: {
        /**#@+
         * @visprop
         */

        strokeWidth: 0.5
        highlightStrokeWidth: 0.5
        highlightStrokeColor: Color.palette.blue
        highlightStrokeOpacity: 0.8

        /**
         * Scaling factor of the vectors. This in contrast to slope fields, where this attribute sets the vector to the given length.
         * @name scale
         * @memberOf Vectorfield.prototype
         * @type {Number|Function}
         * @see Slopefield.scale
         * @default 1
         */
        scale: 1

        /**
         * Customize arrow heads of vectors. Be careful! If enabled this will slow down the performance.
         * Fields are:
         * <ul>
         *  <li> enabled: Boolean
         *  <li> size: length of the arrow head legs (in pixel)
         *  <li> angle: angle of the arrow head legs In radians.
         * </ul>
         * @name arrowhead
         * @memberOf Vectorfield.prototype
         * @type {Object}
         * @default <tt>{enabled: true size: 5, angle: Math.PI * 0.125}</tt>
         */
        arrowhead: {
            enabled: true
            size: 5
            angle: number = Math.PI * 0.125
        }

        /**#@-*/
    }

    /**
     * Abbreviations of attributes. Setting the shortcut means setting abbreviated properties
     * to the same value.
     * It is used in {@link JXG.GeometryElement#setAttribute} and in
     * the constructor {@link JXG.GeometryElement}.
     * Attention: In Options.js abbreviations are not allowed.
     * @type Object
     * @name JXG.Options#shortcuts
     *
     */
    shortcuts: {
        color: ['strokeColor', 'fillColor']
        opacity: ['strokeOpacity', 'fillOpacity']
        highlightColor: ['highlightStrokeColor', 'highlightFillColor']
        highlightOpacity: ['highlightStrokeOpacity', 'highlightFillOpacity']
        strokeWidth: ['strokeWidth', 'highlightStrokeWidth']
    }


    /**
     * Holds all possible properties and the according validators for geometry elements.
     * A validator is either a function
     * which takes one parameter and returns true if the value is valid for the property,
     * or it is false if no validator is required.
     */
    Validator() {
        var i
        let validatePixel = function (v) { return (/^[0-9]+px$/).test(v); }
        let validateDisplay = function (v) { return (v === 'html' || v === 'internal'); }
        let validateColor = function (v) { return Type.isString(v); }       // for now this should do it...
        let validatePointFace = function (v) { return Type.exists(this.normalizePointFace(v)); }
        let validateNumber = function (v) { return Type.isNumber(v, true, false); }
        let validateInteger = function (v) { return (Math.abs(v - Math.round(v)) < JSXMath.eps); }
        let validateNotNegativeInteger = function (v) { return validateInteger(v) && v >= 0; }
        let validatePositiveInteger = function (v) { return validateInteger(v) && v > 0; }
        // validateScreenCoords = function (v) {
        //     return v.length >= 2 && validateInteger(v[0]) && validateInteger(v[1]);
        // }
        let validateRenderer = function (v) { return (v === 'vml' || v === 'svg' || v === 'canvas' || v === 'no'); }
        let validatePositive = function (v) { return v > 0; }
        let validateNotNegative = function (v) { return v >= 0; }

        let v = {}
        let validators = {
            attractorDistance: validateNotNegative,
            color: validateColor,
            // defaultDistance: validateNumber,
            display: validateDisplay,
            doAdvancedPlot: false,
            draft: false,
            drawLabels: false,
            drawZero: false,
            face: validatePointFace,
            factor: validateNumber,
            fillColor: validateColor,
            fillOpacity: validateNumber,
            firstArrow: false,
            fontSize: validateInteger,
            dash: validateInteger,
            gridX: validateNumber,
            gridY: validateNumber,
            // POI: Do we have to add something here?
            hasGrid: false,
            highlightFillColor: validateColor,
            highlightFillOpacity: validateNumber,
            highlightStrokeColor: validateColor,
            highlightStrokeOpacity: validateNumber,
            insertTicks: false,
            //: validateScreenCoords,
            lastArrow: false,
            layer: validateNotNegativeInteger,
            majorHeight: validateInteger,
            minorHeight: validateInteger,
            minorTicks: validateNotNegative,
            minTicksDistance: validatePositiveInteger,
            numberPointsHigh: validatePositiveInteger,
            numberPointsLow: validatePositiveInteger,
            opacity: validateNumber,
            radius: validateNumber,
            RDPsmoothing: false,
            renderer: validateRenderer,
            right: validatePixel,
            showCopyright: false,
            showInfobox: false,
            showNavigation: false,
            size: validateNotNegative, //validateInteger,
            snapSizeX: validatePositive,
            snapSizeY: validatePositive,
            snapWidth: validateNumber,
            snapToGrid: false,
            snatchDistance: validateNotNegative,
            straightFirst: false,
            straightLast: false,
            stretch: false,
            strokeColor: validateColor,
            strokeOpacity: validateNumber,
            strokeWidth: validateNotNegative, //validateInteger,
            takeFirst: false,
            takeSizeFromFile: false,
            to10: false,
            toOrigin: false,
            translateTo10: false,
            translateToOrigin: false,
            useASCIIMathML: false,
            useDirection: false,
            useMathJax: false,
            withLabel: false,
            withTicks: false,
            zoom: false,
        };

        // this seems like a redundant step but it makes sure that
        // all properties in the validator object have lower case names
        // and the validator object is easier to read.
        for (i in validators) {
            if (validators.hasOwnProperty(i)) {
                v[i.toLowerCase()] = validators[i];
            }
        }

        return v;
    }

    /**
     * All point faces can be defined with more than one name, e.g. a cross faced point can be given
     * by face equal to 'cross' or equal to 'x'. This method maps all possible values to fixed ones to
     * simplify if- and switch-clauses regarding point faces. The translation table is as follows:
     * <table>
     * <tr><th>Input</th><th>Output</th></tr>
     * <tr><td>cross</td><td>x</td></tr>
     * <tr><td>circle</td><td>o</td></tr>
     * <tr><td>square, []</td><td>[]</td></tr>
     * <tr><td>plus</td><td>+</td></tr>
     * <tr><td>minus</td><td>-</td></tr>
     * <tr><td>divide</td><td>|</td></tr>
     * <tr><td>diamond</td><td>&lt;&gt;</td></tr>
     * <tr><td>triangleup</td><td>^, a, A</td></tr>
     * <tr><td>triangledown</td><td>v</td></tr>
     * <tr><td>triangleleft</td><td>&lt;</td></tr>
     * <tr><td>triangleright</td><td>&gt;</td></tr>
     * </table>
     * @param {String} s A string which should determine a valid point face.
     * @returns {String} Returns a normalized string or undefined if the given string is not a valid
     * point face.
     */
    normalizePointFace(s) {
        var map = {
            cross: 'x',
            x: 'x',
            circle: 'o',
            o: 'o',
            square: '[]',
            '[]': '[]',
            plus: '+',
            '+': '+',
            divide: '|',
            '|': '|',
            minus: '-',
            '-': '-',
            diamond: '<>',
            '<>': '<>',
            diamond2: '<<>>',
            '<<>>': '<<>>',
            triangleup: '^',
            A: '^',
            a: '^',
            '^': '^',
            triangledown: 'v',
            v: 'v',
            triangleleft: '<',
            '<': '<',
            triangleright: '>',
            '>': '>'
        };

        return map[s];
    };

    /**
     * Apply the options stored in this object to all objects on the given board.
     * @param {JXG.Board} board The board to which objects the options will be applied.
     */

    //TODO this is never used
    /*
   function useStandardOptions(board: Board) {
       var el, t, p, copyProps,
           o = this,   // make it easy if we move to individual elements
           boardHadGrid = board.hasGrid;

       board.options.grid.hasGrid = o.grid.hasGrid;
       board.options.grid.gridX = o.grid.gridX;
       board.options.grid.gridY = o.grid.gridY;
       // POI: Do we have to add something here?
       board.options.grid.gridColor = o.grid.gridColor;
       board.options.grid.gridOpacity = o.grid.gridOpacity;
       board.options.grid.gridDash = o.grid.gridDash;
       board.options.grid.snapToGrid = o.grid.snapToGrid;
       board.options.grid.snapSizeX = o.grid.SnapSizeX;
       board.options.grid.snapSizeY = o.grid.SnapSizeY;
       board.takeSizeFromFile = o.takeSizeFromFile;

       copyProps = function (p, o) {
           p.visProp.fillcolor = o.fillColor;
           p.visProp.highlightfillcolor = o.highlightFillColor;
           p.visProp.strokecolor = o.strokeColor;
           p.visProp.highlightstrokecolor = o.highlightStrokeColor;
       };

       for (el in board.objects) {
           if (board.objects.hasOwnProperty(el)) {
               p = board.objects[el];
               if (p.elementClass === Const.OBJECT_CLASS_POINT) {
                   copyProps(p, o.point);
               } else if (p.elementClass === Const.OBJECT_CLASS_LINE) {
                   copyProps(p, o.line);

                   for (t = 0; t < p.ticks.length; t++) {
                       p.ticks[t].majorTicks = o.line.ticks.majorTicks;
                       p.ticks[t].minTicksDistance = o.line.ticks.minTicksDistance;
                       p.ticks[t].visProp.minorheight = o.line.ticks.minorHeight;
                       p.ticks[t].visProp.majorheight = o.line.ticks.majorHeight;
                   }
               } else if (p.elementClass === Const.OBJECT_CLASS_CIRCLE) {
                   copyProps(p, o.circle);
               } else if (p.type === Const.OBJECT_TYPE_ANGLE) {
                   copyProps(p, o.angle);
               } else if (p.type === Const.OBJECT_TYPE_ARC) {
                   copyProps(p, o.arc);
               } else if (p.type === Const.OBJECT_TYPE_POLYGON) {
                   copyProps(p, o.polygon);
               } else if (p.type === Const.OBJECT_TYPE_CONIC) {
                   copyProps(p, o.conic);
               } else if (p.type === Const.OBJECT_TYPE_CURVE) {
                   copyProps(p, o.curve);
               } else if (p.type === Const.OBJECT_TYPE_SECTOR) {
                   p.arc.visProp.fillcolor = o.sector.fillColor;
                   p.arc.visProp.highlightfillcolor = o.sector.highlightFillColor;
                   p.arc.visProp.fillopacity = o.sector.fillOpacity;
                   p.arc.visProp.highlightfillopacity = o.sector.highlightFillOpacity;
               }
           }
       }

       board.fullUpdate();
       if (boardHadGrid && !board.hasGrid) {
           board.removeGrids(board);
       } else if (!boardHadGrid && board.hasGrid) {
           board.create('grid', []);
       }
   };
   */


    /**
     * Converts all color values to greyscale and calls useStandardOption to put them onto the board.
     * @param {JXG.Board} board The board to which objects the options will be applied.
     * @see JXG.useStandardOptions
     */
    /*
    useBlackWhiteOptions(board: Board) {
        var o = this // JXG.Options;
        o.point.fillColor = Color.rgb2bw(o.point.fillColor);
        o.point.highlightFillColor = Color.rgb2bw(o.point.highlightFillColor);
        o.point.strokeColor = Color.rgb2bw(o.point.strokeColor);
        o.point.highlightStrokeColor = Color.rgb2bw(o.point.highlightStrokeColor);

        o.line.fillColor = Color.rgb2bw(o.line.fillColor);
        o.line.highlightFillColor = Color.rgb2bw(o.line.highlightFillColor);
        o.line.strokeColor = Color.rgb2bw(o.line.strokeColor);
        o.line.highlightStrokeColor = Color.rgb2bw(o.line.highlightStrokeColor);

        o.circle.fillColor = Color.rgb2bw(o.circle.fillColor);
        o.circle.highlightFillColor = Color.rgb2bw(o.circle.highlightFillColor);
        o.circle.strokeColor = Color.rgb2bw(o.circle.strokeColor);
        o.circle.highlightStrokeColor = Color.rgb2bw(o.circle.highlightStrokeColor);

        o.arc.fillColor = Color.rgb2bw(o.arc.fillColor);
        o.arc.highlightFillColor = Color.rgb2bw(o.arc.highlightFillColor);
        o.arc.strokeColor = Color.rgb2bw(o.arc.strokeColor);
        o.arc.highlightStrokeColor = Color.rgb2bw(o.arc.highlightStrokeColor);

        o.polygon.fillColor = Color.rgb2bw(o.polygon.fillColor);
        o.polygon.highlightFillColor = Color.rgb2bw(o.polygon.highlightFillColor);

        o.sector.fillColor = Color.rgb2bw(o.sector.fillColor);
        o.sector.highlightFillColor = Color.rgb2bw(o.sector.highlightFillColor);

        o.curve.strokeColor = Color.rgb2bw(o.curve.strokeColor);
        o.grid.gridColor = Color.rgb2bw(o.grid.gridColor);

        this.useStandardOptions(board);
    }
    */
}