
/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Andreas Walter,
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


export enum COORDS_BY {
    /**  Constant: user coordinates relative to the coordinates system defined by the bounding box.  */
   SCREEN = 0x0001,
   /** Constant: screen coordinates in pixel relative to the upper left corner of the div element. */
    USER = 0x0002
}

export enum OBJECT_TYPE {
    // object types
    ARC,
    ARROW,
    AXIS,
    AXISPOINT,
    TICKS,
    CIRCLE,
    CONIC,
    CURVE,
    GLIDER,
    IMAGE,
    LINE1,
    POINT,
    SLIDER, // unused
    CAS,
    GXTCAS,
    POLYGON,
    SECTOR,
    TEXT,
    ANGLE,
    INTERSECTION,
    TURTLE,
    VECTOR,
    OPROJECT,
    GRID,
    TANGENT,
    HTMLSLIDER,
    CHECKBOX,
    INPUT,
    BUTTON,
    TRANSFORMATION,
    FOREIGNOBJECT,

    VIEW3D,
    POINT3D,
    LINE3D,
    PLANE3D,
    CURVE3D,
    SURFACE3D,

    MEASUREMENT,

    INTERSECTION_LINE3D,
    SPHERE3D,
    CIRCLE3D,
    INTERSECTION_CIRCLE3D,
    TEXT3D,
    FACE3D,
    POLYHEDRON3D,
    POLYGON3D,

    NOTYETASSIGNED
}

// IMPORTANT:
// ----------
// For being able to differentiate between the (sketchometry specific) SPECIAL_OBJECT_TYPEs and
// (core specific) OBJECT_TYPEs, the non-sketchometry types MUST NOT be changed
// to values > 100.

export enum OBJECT_CLASS {
    // object classes
    POINT,
    LINE,
    CIRCLE,
    CURVE,
    AREA,
    OTHER,
    TEXT,
    _3D,
}


export enum BOARD_MODE {

    /**
     * Board is in no special mode, objects are highlighted on mouse over and objects may be
     * clicked to start drag&drop.
     * @type Number
     * @constant
     */
    NONE = 0x0000,

    /**
     * Board is in drag mode, objects aren't highlighted on mouse over and the object referenced in
     * {@link JXG.Board#mouse} is updated on mouse movement.
     * @type Number
     * @constant
     */
    DRAG = 0x0001,

    /**
     * In this mode a mouse move changes the origin's screen coordinates.
     * @type Number
     * @constant
     */
    MOVE_ORIGIN = 0x0002,

    /**
     * Update is made with high quality, e.g. graphs are evaluated at much more points.
     * @type Number
     * @constant
     * @see JXG.Board#updateQuality
     */
    ZOOM = 0x0011,
}

export enum BOARD_QUALITY{
    /**
     * Update is made with low quality, e.g. graphs are evaluated at a lesser amount of points.
     * @type Number
     * @constant
     * @see JXG.Board#updateQuality
     */
    LOW = 0x1,
    HIGHLOW = 0x1,

    /**
     * Update is made with high quality, e.g. graphs are evaluated at much more points.
     * @type Number
     * @constant
     * @see JXG.Board#updateQuality
     */
    HIGH = 0x2,
}



// pastel colors
// feb07c   // svg.ts
// f9ce90   // abstract.ts
// f9f1da
// b8d1c0
// af97c7
// ec9bb0
