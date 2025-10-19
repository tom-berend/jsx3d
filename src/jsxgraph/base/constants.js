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
export var COORDS_BY;
(function (COORDS_BY) {
    /**  Constant: user coordinates relative to the coordinates system defined by the bounding box.  */
    COORDS_BY[COORDS_BY["SCREEN"] = 1] = "SCREEN";
    /** Constant: screen coordinates in pixel relative to the upper left corner of the div element. */
    COORDS_BY[COORDS_BY["USER"] = 2] = "USER";
})(COORDS_BY || (COORDS_BY = {}));
export var OBJECT_TYPE;
(function (OBJECT_TYPE) {
    // object types
    OBJECT_TYPE[OBJECT_TYPE["ARC"] = 0] = "ARC";
    OBJECT_TYPE[OBJECT_TYPE["ARROW"] = 1] = "ARROW";
    OBJECT_TYPE[OBJECT_TYPE["AXIS"] = 2] = "AXIS";
    OBJECT_TYPE[OBJECT_TYPE["AXISPOINT"] = 3] = "AXISPOINT";
    OBJECT_TYPE[OBJECT_TYPE["TICKS"] = 4] = "TICKS";
    OBJECT_TYPE[OBJECT_TYPE["CIRCLE"] = 5] = "CIRCLE";
    OBJECT_TYPE[OBJECT_TYPE["CONIC"] = 6] = "CONIC";
    OBJECT_TYPE[OBJECT_TYPE["CURVE"] = 7] = "CURVE";
    OBJECT_TYPE[OBJECT_TYPE["GLIDER"] = 8] = "GLIDER";
    OBJECT_TYPE[OBJECT_TYPE["IMAGE"] = 9] = "IMAGE";
    OBJECT_TYPE[OBJECT_TYPE["LINE1"] = 10] = "LINE1";
    OBJECT_TYPE[OBJECT_TYPE["POINT"] = 11] = "POINT";
    OBJECT_TYPE[OBJECT_TYPE["SLIDER"] = 12] = "SLIDER";
    OBJECT_TYPE[OBJECT_TYPE["CAS"] = 13] = "CAS";
    OBJECT_TYPE[OBJECT_TYPE["GXTCAS"] = 14] = "GXTCAS";
    OBJECT_TYPE[OBJECT_TYPE["POLYGON"] = 15] = "POLYGON";
    OBJECT_TYPE[OBJECT_TYPE["SECTOR"] = 16] = "SECTOR";
    OBJECT_TYPE[OBJECT_TYPE["TEXT"] = 17] = "TEXT";
    OBJECT_TYPE[OBJECT_TYPE["ANGLE"] = 18] = "ANGLE";
    OBJECT_TYPE[OBJECT_TYPE["INTERSECTION"] = 19] = "INTERSECTION";
    OBJECT_TYPE[OBJECT_TYPE["TURTLE"] = 20] = "TURTLE";
    OBJECT_TYPE[OBJECT_TYPE["VECTOR"] = 21] = "VECTOR";
    OBJECT_TYPE[OBJECT_TYPE["OPROJECT"] = 22] = "OPROJECT";
    OBJECT_TYPE[OBJECT_TYPE["GRID"] = 23] = "GRID";
    OBJECT_TYPE[OBJECT_TYPE["TANGENT"] = 24] = "TANGENT";
    OBJECT_TYPE[OBJECT_TYPE["HTMLSLIDER"] = 25] = "HTMLSLIDER";
    OBJECT_TYPE[OBJECT_TYPE["CHECKBOX"] = 26] = "CHECKBOX";
    OBJECT_TYPE[OBJECT_TYPE["INPUT"] = 27] = "INPUT";
    OBJECT_TYPE[OBJECT_TYPE["BUTTON"] = 28] = "BUTTON";
    OBJECT_TYPE[OBJECT_TYPE["TRANSFORMATION"] = 29] = "TRANSFORMATION";
    OBJECT_TYPE[OBJECT_TYPE["FOREIGNOBJECT"] = 30] = "FOREIGNOBJECT";
    OBJECT_TYPE[OBJECT_TYPE["VIEW3D"] = 31] = "VIEW3D";
    OBJECT_TYPE[OBJECT_TYPE["POINT3D"] = 32] = "POINT3D";
    OBJECT_TYPE[OBJECT_TYPE["LINE3D"] = 33] = "LINE3D";
    OBJECT_TYPE[OBJECT_TYPE["PLANE3D"] = 34] = "PLANE3D";
    OBJECT_TYPE[OBJECT_TYPE["CURVE3D"] = 35] = "CURVE3D";
    OBJECT_TYPE[OBJECT_TYPE["SURFACE3D"] = 36] = "SURFACE3D";
    OBJECT_TYPE[OBJECT_TYPE["MEASUREMENT"] = 37] = "MEASUREMENT";
    OBJECT_TYPE[OBJECT_TYPE["INTERSECTION_LINE3D"] = 38] = "INTERSECTION_LINE3D";
    OBJECT_TYPE[OBJECT_TYPE["SPHERE3D"] = 39] = "SPHERE3D";
    OBJECT_TYPE[OBJECT_TYPE["CIRCLE3D"] = 40] = "CIRCLE3D";
    OBJECT_TYPE[OBJECT_TYPE["INTERSECTION_CIRCLE3D"] = 41] = "INTERSECTION_CIRCLE3D";
    OBJECT_TYPE[OBJECT_TYPE["TEXT3D"] = 42] = "TEXT3D";
    OBJECT_TYPE[OBJECT_TYPE["FACE3D"] = 43] = "FACE3D";
    OBJECT_TYPE[OBJECT_TYPE["POLYHEDRON3D"] = 44] = "POLYHEDRON3D";
    OBJECT_TYPE[OBJECT_TYPE["POLYGON3D"] = 45] = "POLYGON3D";
})(OBJECT_TYPE || (OBJECT_TYPE = {}));
// IMPORTANT:
// ----------
// For being able to differentiate between the (sketchometry specific) SPECIAL_OBJECT_TYPEs and
// (core specific) OBJECT_TYPEs, the non-sketchometry types MUST NOT be changed
// to values > 100.
export var OBJECT_CLASS;
(function (OBJECT_CLASS) {
    // object classes
    OBJECT_CLASS[OBJECT_CLASS["POINT"] = 0] = "POINT";
    OBJECT_CLASS[OBJECT_CLASS["LINE"] = 1] = "LINE";
    OBJECT_CLASS[OBJECT_CLASS["CIRCLE"] = 2] = "CIRCLE";
    OBJECT_CLASS[OBJECT_CLASS["CURVE"] = 3] = "CURVE";
    OBJECT_CLASS[OBJECT_CLASS["AREA"] = 4] = "AREA";
    OBJECT_CLASS[OBJECT_CLASS["OTHER"] = 5] = "OTHER";
    OBJECT_CLASS[OBJECT_CLASS["TEXT"] = 6] = "TEXT";
    OBJECT_CLASS[OBJECT_CLASS["_3D"] = 7] = "_3D";
})(OBJECT_CLASS || (OBJECT_CLASS = {}));
export var BOARD_MODE;
(function (BOARD_MODE) {
    /**
     * Board is in no special mode, objects are highlighted on mouse over and objects may be
     * clicked to start drag&drop.
     * @type Number
     * @constant
     */
    BOARD_MODE[BOARD_MODE["NONE"] = 0] = "NONE";
    /**
     * Board is in drag mode, objects aren't highlighted on mouse over and the object referenced in
     * {@link JXG.Board#mouse} is updated on mouse movement.
     * @type Number
     * @constant
     */
    BOARD_MODE[BOARD_MODE["DRAG"] = 1] = "DRAG";
    /**
     * In this mode a mouse move changes the origin's screen coordinates.
     * @type Number
     * @constant
     */
    BOARD_MODE[BOARD_MODE["MOVE_ORIGIN"] = 2] = "MOVE_ORIGIN";
    /**
     * Update is made with high quality, e.g. graphs are evaluated at much more points.
     * @type Number
     * @constant
     * @see JXG.Board#updateQuality
     */
    BOARD_MODE[BOARD_MODE["ZOOM"] = 17] = "ZOOM";
})(BOARD_MODE || (BOARD_MODE = {}));
export var BOARD_QUALITY;
(function (BOARD_QUALITY) {
    /**
     * Update is made with low quality, e.g. graphs are evaluated at a lesser amount of points.
     * @type Number
     * @constant
     * @see JXG.Board#updateQuality
     */
    BOARD_QUALITY[BOARD_QUALITY["LOW"] = 1] = "LOW";
    /**
     * Update is made with high quality, e.g. graphs are evaluated at much more points.
     * @type Number
     * @constant
     * @see JXG.Board#updateQuality
     */
    BOARD_QUALITY[BOARD_QUALITY["HIGH"] = 2] = "HIGH";
})(BOARD_QUALITY || (BOARD_QUALITY = {}));
