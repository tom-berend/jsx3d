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

/*global JXG: true, define: true, AMprocessNode: true, MathJax: true, document: true */
/*jslint nomen: true, plusplus: true, newcap:true, unparam: true*/
/*eslint no-unused-vars: "off"*/

/**
 * @fileoverview JSXGraph can use various technologies to render the contents of a construction, e.g.
 * SVG, VML, and HTML5 Canvas. To accomplish this, The rendering and the logic and control mechanisms
 * are completely separated from each other. Every rendering technology has it's own class, called
 * Renderer, e.g. SVGRenderer for SVG, the same for VML and Canvas. The common base for all available
 * renderers is the class AbstractRenderer.
 */

import { JXG } from "../jxg.js";
import { AbstractRenderer } from "./abstract.js";

import { Options } from "../options.js";
import { OBJECT_CLASS, OBJECT_TYPE } from "../base/constants.js";
import { Type } from "../utils/type.js";
import { Color } from "../utils/color.js";
import { Base64 } from "../utils/base64.js";
import { Numerics } from "../math/numerics.js";
import { LayerOptions } from "../optionInterfaces.js";
import { GeometryElement } from "../base/element.js";
import { Board } from "../base/board.js";

import { Dim } from "../interfaces.js"

/**
 * This renderer draws nothing. It is intended to be used in environments where none of our rendering engines
 * are available, e.g. WebWorkers. All methods are empty.
 *
 * @class JXG.NoRenderer
 * @augments JXG.AbstractRenderer
 * @see JXG.AbstractRenderer
 */

export class NoRenderer extends AbstractRenderer {

    /**
     * If this property is set to <tt>true</tt> the visual properties of the elements are updated
     * on every update. Visual properties means: All the stuff stored in the
     * {@link JXG.GeometryElement#visProp} property won't be set if enhancedRendering is <tt>false</tt>
     * @type Boolean
     * @default true
     */
    enhancedRendering = false;

    /**
     * This is used to easily determine which renderer we are using
     * @example if (board.renderer.type === 'vml') {
     *     // do something
     * }
     * @type String
     */
    type = 'no';

    constructor(containerName: string, dim: Dim) {  // width height
        super()

    }
    // All methods are already documented in JXG.AbstractRenderer

    /* ********* Point related stuff *********** */

    drawPoint(el) { }

    updatePoint(el) { }

    changePointStyle(el) { }

    /* ********* Line related stuff *********** */

    drawLine(el) { }

    updateLine(el) { }

    drawTicks(el) { }

    updateTicks(el) { }

    /* ********* Curve related stuff *********** */

    drawCurve(el) { }

    updateCurve(el) { }

    /* ********* Circle related stuff *********** */

    drawEllipse(el) { }

    updateEllipse(el) { }

    /* ********* Polygon related stuff *********** */

    drawPolygon(el) { }

    updatePolygon(el) { }

    /* ********* Text related stuff *********** */

    displayCopyright(str, fontsize) { }

    drawInternalText(el) { }

    updateInternalText(el) { }

    // drawText(el) { }

    updateText(el) { }

    //updateTextStyle(el, doHighlight) { }

    updateInternalTextStyle(el, strokeColor, strokeOpacity) { }

    /* ********* Image related stuff *********** */

    drawImage(el) { }

    updateImage(el) { }

    updateImageURL(el) { }

    /* ********* Render primitive objects *********** */

    appendChildPrim(node, level) { }

    appendNodesToElement(el, type) { }

    remove(node) { }

    makeArrows(el) { }

    updateEllipsePrim(node, x, y, rx, ry) { }

    updateLinePrim(node, p1x, p1y, p2x, p2y, board) { }

    updatePathPrim(node, pathString, board) { }

    updatePathStringPoint(el, size, type) { }

    updatePathStringPrim(el) { }

    updatePathStringBezierPrim(el) { }

    updatePolygonPrim(node, el) { }

    updateRectPrim(node, x, y, w, h) { }

    setPropertyPrim(node, key, val) { }

    /* ********* Set attributes *********** */

    show(el) { }

    hide(el) { }

    setBuffering(node, type) { }

    setDashStyle(el) { }

    setDraft(el) { }

    removeDraft(el) { }

    setGradient(el) { }

    updateGradient(el) { }

    setObjectTransition(el, duration) { }

    setObjectFillColor(el, color, opacity) { }

    setObjectStrokeColor(el, color, opacity) { }

    setObjectStrokeWidth(el, width) { }

    setShadow(el) { }

    // highlight(el) { }

    // noHighlight(el) { }

    /* ********* Renderer control *********** */

    suspendRedraw() { }

    unsuspendRedraw() { }

    drawNavigationBar(board) { }

    getElementById(id) { return null; }

    resize(w, h) { }

    removeToInsertLater() { return function () { }; }

    /*  stuff missing when we started conversion to TS */

    _setArrowWidth() { }
    _setLineCap() { }
    displayLogo() { }
    transformRect() { }
    setLineCap() { }
    drawForeignObject() { }
    updateForeignObject() { }
    createPrim():HTMLElement { return null as HTMLElement}
    display() { }
    setARIA() { }
    setCssClass() { }
    setLayer() { }
    setTabindex() { }
    createTouchpoints() { }
    showTouchpoint() { }
    hideTouchpoint() { }
    updateTouchpoint() { }
    dumpToDataURI() { }
    dumpToCanvas() { }
    screenshot() { }
    uniqName() { }
}


