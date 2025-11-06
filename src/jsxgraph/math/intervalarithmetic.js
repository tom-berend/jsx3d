/*
    Copyright 2008-2025
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Alfred Wassermann

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
define(["require", "exports", "../utils/type.js"], function (require, exports, type_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Interval = exports.DoubleBits = void 0;
    var DoubleBits = /** @class */ (function () {
        function DoubleBits() {
            var _this = this;
            this.DOUBLE_VIEW = new Float64Array(1);
            this.UINT_VIEW = new Uint32Array(this.DOUBLE_VIEW.buffer);
            // doubleBits,
            // toDouble,
            // lowUint,
            // highUint,
            // hasTypedArrays = false,
            if (Float64Array !== undefined) {
                this.DOUBLE_VIEW[0] = 1.0;
                // hasTypedArrays = true;
                if (this.UINT_VIEW[1] === 0x3ff00000) {
                    // Use little endian
                    this.doubleBitsLE = function (n) {
                        _this.DOUBLE_VIEW[0] = n;
                        return [_this.UINT_VIEW[0], _this.UINT_VIEW[1]];
                    };
                    this.toDoubleLE = function (lo, hi) {
                        _this.UINT_VIEW[0] = lo;
                        _this.UINT_VIEW[1] = hi;
                        return _this.DOUBLE_VIEW[0];
                    };
                    this.lowUintLE = function (n) {
                        _this.DOUBLE_VIEW[0] = n;
                        return _this.UINT_VIEW[0];
                    };
                    this.highUintLE = function (n) {
                        _this.DOUBLE_VIEW[0] = n;
                        return _this.UINT_VIEW[1];
                    };
                    this.doubleBits = this.doubleBitsLE;
                    this.pack = this.toDoubleLE;
                    this.lo = this.lowUintLE;
                    this.hi = this.highUintLE;
                }
                else if (this.UINT_VIEW[0] === 0x3ff00000) {
                    // Use big endian
                    this.doubleBitsBE = function (n) {
                        _this.DOUBLE_VIEW[0] = n;
                        return [_this.UINT_VIEW[1], _this.UINT_VIEW[0]];
                    };
                    this.toDoubleBE = function (lo, hi) {
                        _this.UINT_VIEW[1] = lo;
                        _this.UINT_VIEW[0] = hi;
                        return _this.DOUBLE_VIEW[0];
                    };
                    this.lowUintBE = function (n) {
                        _this.DOUBLE_VIEW[0] = n;
                        return _this.UINT_VIEW[1];
                    };
                    this.highUintBE = function (n) {
                        _this.DOUBLE_VIEW[0] = n;
                        return _this.UINT_VIEW[0];
                    };
                    this.doubleBits = this.doubleBitsBE;
                    this.pack = this.toDoubleBE;
                    this.lo = this.lowUintBE;
                    this.hi = this.highUintBE;
                    // } else {
                    //     hasTypedArrays = false;
                }
            }
            // if (!hasTypedArrays) {
            //     var buffer = new Buffer(8)
            //     doubleBits = function(n) {
            //         buffer.writeDoubleLE(n, 0, true);
            //         return [buffer.readUInt32LE(0, true), buffer.readUInt32LE(4, true)];
            //     };
            //     toDouble = function(lo, hi) {
            //         buffer.writeUInt32LE(lo, 0, true);
            //         buffer.writeUInt32LE(hi, 4, true);
            //         return buffer.readDoubleLE(0, true);
            //     };
            //     lowUint = function(n) {
            //         buffer.writeDoubleLE(n, 0, true);
            //         return buffer.readUInt32LE(0, true);
            //     };
            //     highUint = function(n) {
            //         buffer.writeDoubleLE(n, 0, true);
            //         return buffer.readUInt32LE(4, true);
            //     };
            //     this.doubleBits = doubleBits;
            //     this.pack = toDouble;
            //     this.lo = lowUint;
            //     this.hi = highUint;
            // }
        }
        ;
        DoubleBits.prototype.sign = function (n) {
            return this.hi(n) >>> 31;
        };
        DoubleBits.prototype.exponent = function (n) {
            var b = this.hi(n);
            return ((b << 1) >>> 21) - 1023;
        };
        DoubleBits.prototype.fraction = function (n) {
            var lo = this.lo(n), hi = this.hi(n), b = hi & ((1 << 20) - 1);
            if (hi & 0x7ff00000) {
                b += 1 << 20;
            }
            return [lo, b];
        };
        DoubleBits.prototype.denormalized = function (n) {
            var hi = this.hi(n);
            return !(hi & 0x7ff00000);
        };
        return DoubleBits;
    }());
    exports.DoubleBits = DoubleBits;
    var doubleBits = new DoubleBits();
    /**
     * Interval for interval arithmetics. Consists of the properties
     * <ul>
     *  <li>lo
     *  <li>hi
     * </ul>
     * @name JXG.Math.Interval
     * @type Object
     */
    var Interval = /** @class */ (function () {
        function Interval(lo, hi) {
            /*
        * Constants
        */
            this.piLow = (3373259426.0 + 273688.0 / (1 << 21)) / (1 << 30);
            this.piHigh = (3373259426.0 + 273689.0 / (1 << 21)) / (1 << 30);
            this.piHalfLow = ((3373259426.0 + 273688.0 / (1 << 21)) / (1 << 30)) * 0.5;
            this.piHalfHigh = ((3373259426.0 + 273689.0 / (1 << 21)) / (1 << 30)) * 0.5;
            this.piTwiceLow = ((3373259426.0 + 273688.0 / (1 << 21)) / (1 << 30)) * 2;
            this.piTwiceHigh = ((3373259426.0 + 273689.0 / (1 << 21)) / (1 << 30)) * 2;
            this.PI = new Interval(this.piLow, this.piHigh);
            this.PI_HALF = new Interval(this.piHalfLow, this.piHalfHigh);
            this.PI_TWICE = new Interval(this.piTwiceLow, this.piTwiceHigh);
            this.ZERO = new Interval(0);
            this.ONE = new Interval(1);
            this.WHOLE = new Interval().setWhole();
            this.EMPTY = new Interval().setEmpty();
            // if (typeof lo == 'number' && typeof hi == 'number') {
            // possible cases:
            // - Interval(1, 2)
            // - Interval(Interval(1, 1), Interval(2, 2))     // singletons are required
            if (lo instanceof Interval) { // (this.isInterval(lo)) {
                if (!this.isSingleton(lo)) {
                    throw new TypeError("JXG.Math.IntervalArithmetic: interval `lo` must be a singleton");
                }
                this.lo = lo.lo;
            }
            else if (typeof lo == 'number') {
                this.lo = lo;
            }
            else {
                this.lo = 0;
            }
            // possible cases:
            // - Interval(1, 2)
            // - Interval(Interval(1, 1), Interval(2, 2))     // singletons are required
            if (hi instanceof Interval) { // (this.isInterval(lo)) {
                if (!this.isSingleton(lo)) {
                    throw new TypeError("JXG.Math.IntervalArithmetic: interval `lo` must be a singleton");
                }
                this.lo = lo.lo;
            }
            else if (typeof lo == 'number') {
                this.lo = lo;
            }
            else {
                this.lo = 0;
            }
        }
        Interval.prototype.print = function () {
            console.log("[", this.lo, this.hi, "]");
        };
        Interval.prototype.set = function (lo, hi) {
            this.lo = lo;
            this.hi = hi;
            return this;
        };
        Interval.prototype.bounded = function (lo, hi) {
            return this.set(this.prev(lo), this.next(hi));
        };
        Interval.prototype.boundedSingleton = function (v) {
            return this.bounded(v, v);
        };
        Interval.prototype.assign = function (lo, hi) {
            if (typeof lo !== "number" || typeof hi !== "number") {
                throw new TypeError("JXG.Math.Interval#assign: arguments must be numbers");
            }
            if (isNaN(lo) || isNaN(hi) || lo > hi) {
                return this.setEmpty();
            }
            return this.set(lo, hi);
        };
        Interval.prototype.setEmpty = function () {
            return this.set(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY);
        };
        Interval.prototype.setWhole = function () {
            return this.set(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
        };
        Interval.prototype.open = function (lo, hi) {
            return this.assign(this.next(lo), this.prev(hi));
        };
        Interval.prototype.halfOpenLeft = function (lo, hi) {
            return this.assign(this.next(lo), hi);
        };
        Interval.prototype.halfOpenRight = function (lo, hi) {
            return this.assign(lo, this.prev(hi));
        };
        Interval.prototype.toArray = function () {
            return [this.lo, this.hi];
        };
        Interval.prototype.clone = function () {
            return new Interval().set(this.lo, this.hi);
        };
        /**
         * Object for interval arithmetics.
         * @name JXG.Math.IntervalArithmetic
         * @namespace
         *
         * Interval arithmetic is a technique used to mitigate rounding and measurement errors in mathematical computation
         * by computing function bounds. Instead of representing a value as a single number, interval arithmetic represents each value as a range.
         * <br><br>
         *
         * For example, we wish to calculate the area of a rectangle from direct measurements using a standard meter stick with an uncertainty
         * of 0.0005 m (half the “least count measurement” of 1 mm). We measure one side nominally as L=1,
         * so 0.9995 ≤ L ≤ 1.0005, the other nominally as W=2 so the interval is [1.9995, 2.0005].
         *
         * <pre>
         * let L = JXG.Math.IntervalArithmetic.Interval(0.9995, 1.0005)
         * let W = JXG.Math.IntervalArithmetic.Interval(1.9995, 2.0005)
         *
         * let A = JXG.Math.IntervalArithmetic.mul(L, W)
         *
         * console.log('area:', A) // {hi: 2.0015002500000003, lo: 1.99850025}
         * </pre>
         *
         */
        Interval.prototype.Interval = function (lo, hi) {
            return new Interval(lo, hi);
        };
        Interval.prototype.isInterval = function (i) {
            return (i !== null &&
                typeof i === "object" &&
                typeof i.lo === "number" &&
                typeof i.hi === "number");
        };
        Interval.prototype.isSingleton = function (i) {
            return i.lo === i.hi;
        };
        /*
         * Arithmetics
         */
        /**
         * Addition
         *
         * @param {JXG.Math.Interval|Number} x
         * @param {JXG.Math.Interval|Number} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.add = function (x, y) {
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (type_js_1.Type.isNumber(y)) {
                y = this.Interval(y);
            }
            return new Interval(this.addLo(x.lo, y.lo), this.addHi(x.hi, y.hi));
        };
        /**
         * Subtraction
         *
         * @param {JXG.Math.Interval|Number} x
         * @param {JXG.Math.Interval|Number} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.sub = function (x, y) {
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (type_js_1.Type.isNumber(y)) {
                y = this.Interval(y);
            }
            return new Interval(this.subLo(x.lo, y.hi), this.subHi(x.hi, y.lo));
        };
        /**
         * Multiplication
         *
         * @param {JXG.Math.Interval|Number} x
         * @param {JXG.Math.Interval|Number} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.mul = function (x, y) {
            var xl, xh, yl, yh, out;
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (type_js_1.Type.isNumber(y)) {
                y = this.Interval(y);
            }
            if (this.isEmpty(x) || this.isEmpty(y)) {
                return this.EMPTY.clone();
            }
            xl = x.lo;
            xh = x.hi;
            yl = y.lo;
            yh = y.hi;
            out = new Interval();
            if (xl < 0) {
                if (xh > 0) {
                    if (yl < 0) {
                        if (yh > 0) {
                            // mixed * mixed
                            out.lo = Math.min(this.mulLo(xl, yh), this.mulLo(xh, yl));
                            out.hi = Math.max(this.mulHi(xl, yl), this.mulHi(xh, yh));
                        }
                        else {
                            // mixed * negative
                            out.lo = this.mulLo(xh, yl);
                            out.hi = this.mulHi(xl, yl);
                        }
                    }
                    else {
                        if (yh > 0) {
                            // mixed * positive
                            out.lo = this.mulLo(xl, yh);
                            out.hi = this.mulHi(xh, yh);
                        }
                        else {
                            // mixed * zero
                            out.lo = 0;
                            out.hi = 0;
                        }
                    }
                }
                else {
                    if (yl < 0) {
                        if (yh > 0) {
                            // negative * mixed
                            out.lo = this.mulLo(xl, yh);
                            out.hi = this.mulHi(xl, yl);
                        }
                        else {
                            // negative * negative
                            out.lo = this.mulLo(xh, yh);
                            out.hi = this.mulHi(xl, yl);
                        }
                    }
                    else {
                        if (yh > 0) {
                            // negative * positive
                            out.lo = this.mulLo(xl, yh);
                            out.hi = this.mulHi(xh, yl);
                        }
                        else {
                            // negative * zero
                            out.lo = 0;
                            out.hi = 0;
                        }
                    }
                }
            }
            else {
                if (xh > 0) {
                    if (yl < 0) {
                        if (yh > 0) {
                            // positive * mixed
                            out.lo = this.mulLo(xh, yl);
                            out.hi = this.mulHi(xh, yh);
                        }
                        else {
                            // positive * negative
                            out.lo = this.mulLo(xh, yl);
                            out.hi = this.mulHi(xl, yh);
                        }
                    }
                    else {
                        if (yh > 0) {
                            // positive * positive
                            out.lo = this.mulLo(xl, yl);
                            out.hi = this.mulHi(xh, yh);
                        }
                        else {
                            // positive * zero
                            out.lo = 0;
                            out.hi = 0;
                        }
                    }
                }
                else {
                    // zero * any other value
                    out.lo = 0;
                    out.hi = 0;
                }
            }
            return out;
        };
        /**
         * Division
         *
         * @param {JXG.Math.Interval|Number} x
         * @param {JXG.Math.Interval|Number} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.div = function (x, y) {
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (type_js_1.Type.isNumber(y)) {
                y = this.Interval(y);
            }
            if (this.isEmpty(x) || this.isEmpty(y)) {
                return this.EMPTY.clone();
            }
            if (this.zeroIn(y)) {
                if (y.lo !== 0) {
                    if (y.hi !== 0) {
                        return this.divZero(x);
                    }
                    return this.divNegative(x, y.lo);
                }
                if (y.hi !== 0) {
                    return this.divPositive(x, y.hi);
                }
                return this.EMPTY.clone();
            }
            return this.divNonZero(x, y);
        };
        /**
         * Return +x (i.e. identity)
         *
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.positive = function (x) {
            return new Interval(x.lo, x.hi);
        };
        /**
         * Return -x
         *
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.negative = function (x) {
            if (type_js_1.Type.isNumber(x)) {
                return new Interval(-x);
            }
            return new Interval(-x.hi, -x.lo);
        };
        /*
         * Utils
         */
        /**
         * Test if interval is empty set.
         * @param {JXG.Math.Interval} i
         * @returns Boolean
         */
        Interval.prototype.isEmpty = function (i) {
            return i.lo > i.hi;
        };
        /**
         * Test if interval is (-Infinity, Infinity).
         * @param {JXG.Math.Interval} i
         * @returns Boolean
         */
        Interval.prototype.isWhole = function (i) {
            return i.lo === -Infinity && i.hi === Infinity;
        };
        /**
         * Test if interval contains 0.
         * @param {JXG.Math.Interval} i
         * @returns Boolean
         */
        Interval.prototype.zeroIn = function (i) {
            return this.hasValue(i, 0);
        };
        /**
         * Test if interval contains a specific value.
         * @param {JXG.Math.Interval} i
         * @param {Number} value
         * @returns Boolean
         */
        Interval.prototype.hasValue = function (i, value) {
            if (this.isEmpty(i)) {
                return false;
            }
            return i.lo <= value && value <= i.hi;
        };
        /**
         * Test if interval x contains interval y.
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns Boolean
         */
        Interval.prototype.hasInterval = function (x, y) {
            if (this.isEmpty(x)) {
                return true;
            }
            return !this.isEmpty(y) && y.lo <= x.lo && x.hi <= y.hi;
        };
        /**
         * Test if intervals x and y have non-zero intersection.
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns Boolean
         */
        Interval.prototype.intervalsOverlap = function (x, y) {
            if (this.isEmpty(x) || this.isEmpty(y)) {
                return false;
            }
            return (x.lo <= y.lo && y.lo <= x.hi) || (y.lo <= x.lo && x.lo <= y.hi);
        };
        /*
         * Division
         */
        /**
         * @private
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.divNonZero = function (x, y) {
            var xl = x.lo, xh = x.hi, yl = y.lo, yh = y.hi, out = new Interval();
            if (xh < 0) {
                if (yh < 0) {
                    out.lo = this.divLo(xh, yl);
                    out.hi = this.divHi(xl, yh);
                }
                else {
                    out.lo = this.divLo(xl, yl);
                    out.hi = this.divHi(xh, yh);
                }
            }
            else if (xl < 0) {
                if (yh < 0) {
                    out.lo = this.divLo(xh, yh);
                    out.hi = this.divHi(xl, yh);
                }
                else {
                    out.lo = this.divLo(xl, yl);
                    out.hi = this.divHi(xh, yl);
                }
            }
            else {
                if (yh < 0) {
                    out.lo = this.divLo(xh, yh);
                    out.hi = this.divHi(xl, yl);
                }
                else {
                    out.lo = this.divLo(xl, yh);
                    out.hi = this.divHi(xh, yl);
                }
            }
            return out;
        };
        /**
         * @private
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.divPositive = function (x, v) {
            if (x.lo === 0 && x.hi === 0) {
                return x;
            }
            if (this.zeroIn(x)) {
                // mixed considering zero in both ends
                return this.WHOLE;
            }
            if (x.hi < 0) {
                // negative / v
                return new Interval(Number.NEGATIVE_INFINITY, this.divHi(x.hi, v));
            }
            // positive / v
            return new Interval(this.divLo(x.lo, v), Number.POSITIVE_INFINITY);
        };
        /**
         * @private
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.divNegative = function (x, v) {
            if (x.lo === 0 && x.hi === 0) {
                return x;
            }
            if (this.zeroIn(x)) {
                // mixed considering zero in both ends
                return this.WHOLE;
            }
            if (x.hi < 0) {
                // negative / v
                return new Interval(this.divLo(x.hi, v), Number.POSITIVE_INFINITY);
            }
            // positive / v
            return new Interval(Number.NEGATIVE_INFINITY, this.divHi(x.lo, v));
        };
        /**
         * @private
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.divZero = function (x) {
            if (x.lo === 0 && x.hi === 0) {
                return x;
            }
            return this.WHOLE;
        };
        /*
         * Algebra
         */
        /**
         * x mod y:  x - n * y
         * @param {JXG.Math.Interval|Number} x
         * @param {JXG.Math.Interval|Number} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.fmod = function (x, y) {
            var yb, n;
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (type_js_1.Type.isNumber(y)) {
                y = this.Interval(y);
            }
            if (this.isEmpty(x) || this.isEmpty(y)) {
                return this.EMPTY.clone();
            }
            yb = x.lo < 0 ? y.lo : y.hi;
            n = x.lo / yb;
            if (n < 0) {
                n = Math.ceil(n);
            }
            else {
                n = Math.floor(n);
            }
            // x mod y = x - n * y
            return this.sub(x, this.mul(y, new Interval(n)));
        };
        /**
         * 1 / x
         * @param {JXG.Math.Interval|Number} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.multiplicativeInverse = function (x) {
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (this.isEmpty(x)) {
                return this.EMPTY.clone();
            }
            if (this.zeroIn(x)) {
                if (x.lo !== 0) {
                    if (x.hi !== 0) {
                        // [negative, positive]
                        return this.WHOLE;
                    }
                    // [negative, zero]
                    return new Interval(Number.NEGATIVE_INFINITY, this.divHi(1, x.lo));
                }
                if (x.hi !== 0) {
                    // [zero, positive]
                    return new Interval(this.divLo(1, x.hi), Number.POSITIVE_INFINITY);
                }
                // [zero, zero]
                return this.EMPTY.clone();
            }
            // [positive, positive]
            return new Interval(this.divLo(1, x.hi), this.divHi(1, x.lo));
        };
        /**
         * x<sup>power</sup>
         * @param {JXG.Math.Interval|Number} x
         * @param {JXG.Math.Interval|Number} power
         * @returns JXG.Math.Interval
         */
        Interval.prototype.pow = function (x, power) {
            var yl, yh;
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (this.isEmpty(x)) {
                return this.EMPTY.clone();
            }
            if (this.isInterval(power)) {
                if (!this.isSingleton(power)) {
                    return this.EMPTY.clone();
                }
                power = power.lo;
            }
            if (power === 0) {
                if (x.lo === 0 && x.hi === 0) {
                    // 0^0
                    return this.EMPTY.clone();
                }
                // x^0
                return this.ONE.clone();
            }
            if (power < 0) {
                // compute [1 / x]^-power if power is negative
                return this.pow(this.multiplicativeInverse(x), -power);
            }
            // power > 0
            if (power % 1 === 0) {
                // isSafeInteger(power) as boolean) {
                // power is integer
                if (x.hi < 0) {
                    // [negative, negative]
                    // assume that power is even so the operation will yield a positive interval
                    // if not then just switch the sign and order of the interval bounds
                    yl = this.powLo(-x.hi, power);
                    yh = this.powHi(-x.lo, power);
                    if ((power & 1) === 1) {
                        // odd power
                        return new Interval(-yh, -yl);
                    }
                    // even power
                    return new Interval(yl, yh);
                }
                if (x.lo < 0) {
                    // [negative, positive]
                    if ((power & 1) === 1) {
                        return new Interval(-this.powLo(-x.lo, power), this.powHi(x.hi, power));
                    }
                    // even power means that any negative number will be zero (min value = 0)
                    // and the max value will be the max of x.lo^power, x.hi^power
                    return new Interval(0, this.powHi(Math.max(-x.lo, x.hi), power));
                }
                // [positive, positive]
                return new Interval(this.powLo(x.lo, power), this.powHi(x.hi, power));
            }
            console.warn("power is not an integer, you should use nth-root instead, returning an empty interval");
            return this.EMPTY.clone();
        };
        /**
         * sqrt(x)
         * @param {JXG.Math.Interval|Number} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.sqrt = function (x) {
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            return this.nthRoot(x, 2);
        };
        /**
         * x<sup>1/n</sup>
         * @param {JXG.Math.Interval|Number} x
         * @param {Number} n
         * @returns JXG.Math.Interval
         */
        Interval.prototype.nthRoot = function (x, n) {
            var power, yl, yh, yp, yn;
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (this.isEmpty(x) || n < 0) {
                // compute 1 / x^-power if power is negative
                return this.EMPTY.clone();
            }
            // singleton interval check
            if (this.isInterval(n)) {
                if (!this.isSingleton(n)) {
                    return this.EMPTY.clone();
                }
                n = n.lo;
            }
            power = 1 / n;
            if (x.hi < 0) {
                // [negative, negative]
                //if ((isSafeInteger(n) as boolean) && (n & 1) === 1) {
                if (n % 1 === 0 && (n & 1) === 1) {
                    // when n is odd we can always take the nth root
                    yl = this.powHi(-x.lo, power);
                    yh = this.powLo(-x.hi, power);
                    return new Interval(-yl, -yh);
                }
                // n is not odd therefore there's no nth root
                return this.EMPTY.clone();
            }
            if (x.lo < 0) {
                // [negative, positive]
                yp = this.powHi(x.hi, power);
                // if ((isSafeInteger(n) as boolean) && (n & 1) === 1) {
                if (n % 1 === 0 && (n & 1) === 1) {
                    // nth root of x.lo is possible (n is odd)
                    yn = -this.powHi(-x.lo, power);
                    return new Interval(yn, yp);
                }
                return new Interval(0, yp);
            }
            // [positive, positive]
            return new Interval(this.powLo(x.lo, power), this.powHi(x.hi, power));
        };
        /*
         * Misc
         */
        /**
         *
         * @param {JXG.Math.Interval|Number} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.exp = function (x) {
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (this.isEmpty(x)) {
                return this.EMPTY.clone();
            }
            return new Interval(this.expLo(x.lo), this.expHi(x.hi));
        };
        /**
         * Natural log
         * @param {JXG.Math.Interval|Number} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.log = function (x) {
            var l;
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (this.isEmpty(x)) {
                return this.EMPTY.clone();
            }
            l = x.lo <= 0 ? Number.NEGATIVE_INFINITY : this.logLo(x.lo);
            return new Interval(l, this.logHi(x.hi));
        };
        /**
         * Natural log, alias for {@link JXG.Math.IntervalArithmetic#log}.
         * @param {JXG.Math.Interval|Number} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.ln = function (x) {
            return this.log(x);
        };
        // export const LOG_EXP_10 = this.log(new MatInterval(10, 10))
        // export const LOG_EXP_2 = log(new MatInterval(2, 2))
        /**
         * Logarithm to base 10.
         * @param {JXG.Math.Interval|Number} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.log10 = function (x) {
            if (this.isEmpty(x)) {
                return this.EMPTY.clone();
            }
            return this.div(this.log(x), this.log(new Interval(10, 10)));
        };
        /**
         * Logarithm to base 2.
         * @param {JXG.Math.Interval|Number} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.log2 = function (x) {
            if (this.isEmpty(x)) {
                return this.EMPTY.clone();
            }
            return this.div(this.log(x), this.log(new Interval(2, 2)));
        };
        /**
         * Hull of intervals x and y
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.hull = function (x, y) {
            var badX = this.isEmpty(x), badY = this.isEmpty(y);
            if (badX && badY) {
                return this.EMPTY.clone();
            }
            if (badX) {
                return y.clone();
            }
            if (badY) {
                return x.clone();
            }
            return new Interval(Math.min(x.lo, y.lo), Math.max(x.hi, y.hi));
        };
        /**
         * Intersection of intervals x and y
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.intersection = function (x, y) {
            var lo, hi;
            if (this.isEmpty(x) || this.isEmpty(y)) {
                return this.EMPTY.clone();
            }
            lo = Math.max(x.lo, y.lo);
            hi = Math.min(x.hi, y.hi);
            if (lo <= hi) {
                return new Interval(lo, hi);
            }
            return this.EMPTY.clone();
        };
        /**
         * Union of overlapping intervals x and y
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.union = function (x, y) {
            if (!this.intervalsOverlap(x, y)) {
                throw new Error("Interval#unions do not overlap");
            }
            return new Interval(Math.min(x.lo, y.lo), Math.max(x.hi, y.hi));
        };
        /**
         * Difference of overlapping intervals x and y
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.difference = function (x, y) {
            if (this.isEmpty(x) || this.isWhole(y)) {
                return this.EMPTY.clone();
            }
            if (this.intervalsOverlap(x, y)) {
                if (x.lo < y.lo && y.hi < x.hi) {
                    // difference creates multiple subsets
                    throw new Error("Interval.difference: difference creates multiple intervals");
                }
                // handle corner cases first
                if ((y.lo <= x.lo && y.hi === Infinity) || (y.hi >= x.hi && y.lo === -Infinity)) {
                    return this.EMPTY.clone();
                }
                // NOTE: empty interval is handled automatically
                // e.g.
                //
                //    n = difference([0,1], [0,1]) // n = Interval(next(1), 1) = EMPTY
                //    isEmpty(n) === true
                //
                if (y.lo <= x.lo) {
                    return new Interval().halfOpenLeft(y.hi, x.hi);
                }
                // y.hi >= x.hi
                return new Interval().halfOpenRight(x.lo, y.lo);
            }
            return x.clone();
        };
        /**
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.width = function (x) {
            if (this.isEmpty(x)) {
                return 0;
            }
            return this.subHi(x.hi, x.lo);
        };
        /**
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.abs = function (x) {
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (this.isEmpty(x)) {
                return this.EMPTY.clone();
            }
            if (x.lo >= 0) {
                return x.clone();
            }
            if (x.hi <= 0) {
                return this.negative(x);
            }
            return new Interval(0, Math.max(-x.lo, x.hi));
        };
        /**
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.max = function (x, y) {
            var badX = this.isEmpty(x), badY = this.isEmpty(y);
            if (badX && badY) {
                return this.EMPTY.clone();
            }
            if (badX) {
                return y.clone();
            }
            if (badY) {
                return x.clone();
            }
            return new Interval(Math.max(x.lo, y.lo), Math.max(x.hi, y.hi));
        };
        /**
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns JXG.Math.Interval
         */
        Interval.prototype.min = function (x, y) {
            var badX = this.isEmpty(x), badY = this.isEmpty(y);
            if (badX && badY) {
                return this.EMPTY.clone();
            }
            if (badX) {
                return y.clone();
            }
            if (badY) {
                return x.clone();
            }
            return new Interval(Math.min(x.lo, y.lo), Math.min(x.hi, y.hi));
        };
        /*
         * Trigonometric
         */
        Interval.prototype.onlyInfinity = function (x) {
            return !isFinite(x.lo) && x.lo === x.hi;
        };
        Interval.prototype._handleNegative = function (interval) {
            var n;
            if (interval.lo < 0) {
                if (interval.lo === -Infinity) {
                    interval.lo = 0;
                    interval.hi = Infinity;
                }
                else {
                    n = Math.ceil(-interval.lo / this.piTwiceLow);
                    interval.lo += this.piTwiceLow * n;
                    interval.hi += this.piTwiceLow * n;
                }
            }
            return interval;
        };
        /**
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.cos = function (x) {
            var cache, pi2, t, cosv, lo, hi, rlo, rhi;
            if (this.isEmpty(x) || this.onlyInfinity(x)) {
                return this.EMPTY.clone();
            }
            // create a clone of `x` because the clone is going to be modified
            cache = new Interval().set(x.lo, x.hi);
            this._handleNegative(cache);
            pi2 = this.PI_TWICE;
            t = this.fmod(cache, pi2);
            if (this.width(t) >= pi2.lo) {
                return new Interval(-1, 1);
            }
            // when t.lo > pi it's the same as
            // -cos(t - pi)
            if (t.lo >= this.piHigh) {
                cosv = this.cos(this.sub(t, this.PI));
                return this.negative(cosv);
            }
            lo = t.lo;
            hi = t.hi;
            rlo = this.cosLo(hi);
            rhi = this.cosHi(lo);
            // it's ensured that t.lo < pi and that t.lo >= 0
            if (hi <= this.piLow) {
                // when t.hi < pi
                // [cos(t.lo), cos(t.hi)]
                return new Interval(rlo, rhi);
            }
            if (hi <= pi2.lo) {
                // when t.hi < 2pi
                // [-1, max(cos(t.lo), cos(t.hi))]
                return new Interval(-1, Math.max(rlo, rhi));
            }
            // t.lo < pi and t.hi > 2pi
            return new Interval(-1, 1);
        };
        /**
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.sin = function (x) {
            if (this.isEmpty(x) || this.onlyInfinity(x)) {
                return this.EMPTY.clone();
            }
            return this.cos(this.sub(x, this.PI_HALF));
        };
        /**
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.tan = function (x) {
            var cache, t, pi;
            if (this.isEmpty(x) || this.onlyInfinity(x)) {
                return this.EMPTY.clone();
            }
            // create a clone of `x` because the clone is going to be modified
            cache = new Interval().set(x.lo, x.hi);
            this._handleNegative(cache);
            pi = this.PI;
            t = this.fmod(cache, pi);
            if (t.lo >= this.piHalfLow) {
                t = this.sub(t, pi);
            }
            if (t.lo <= -this.piHalfLow || t.hi >= this.piHalfLow) {
                return this.WHOLE.clone();
            }
            return new Interval(this.tanLo(t.lo), this.tanHi(t.hi));
        };
        /**
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.asin = function (x) {
            var lo, hi;
            if (this.isEmpty(x) || x.hi < -1 || x.lo > 1) {
                return this.EMPTY.clone();
            }
            lo = x.lo <= -1 ? -this.piHalfHigh : this.asinLo(x.lo);
            hi = x.hi >= 1 ? this.piHalfHigh : this.asinHi(x.hi);
            return new Interval(lo, hi);
        };
        /**
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.acos = function (x) {
            var lo, hi;
            if (this.isEmpty(x) || x.hi < -1 || x.lo > 1) {
                return this.EMPTY.clone();
            }
            lo = x.hi >= 1 ? 0 : this.acosLo(x.hi);
            hi = x.lo <= -1 ? this.piHigh : this.acosHi(x.lo);
            return new Interval(lo, hi);
        };
        /**
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.acot = function (x) {
            if (this.isEmpty(x)) {
                return this.EMPTY.clone();
            }
            return new Interval(this.acotLo(x.lo), this.acotHi(x.hi));
        };
        /**
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.atan = function (x) {
            if (this.isEmpty(x)) {
                return this.EMPTY.clone();
            }
            return new Interval(this.atanLo(x.lo), this.atanHi(x.hi));
        };
        /**
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.sinh = function (x) {
            if (this.isEmpty(x)) {
                return this.EMPTY.clone();
            }
            return new Interval(this.sinhLo(x.lo), this.sinhHi(x.hi));
        };
        /**
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.cosh = function (x) {
            if (this.isEmpty(x)) {
                return this.EMPTY.clone();
            }
            if (x.hi < 0) {
                return new Interval(this.coshLo(x.hi), this.coshHi(x.lo));
            }
            if (x.lo >= 0) {
                return new Interval(this.coshLo(x.lo), this.coshHi(x.hi));
            }
            return new Interval(1, this.coshHi(-x.lo > x.hi ? x.lo : x.hi));
        };
        /**
         * @param {JXG.Math.Interval} x
         * @returns JXG.Math.Interval
         */
        Interval.prototype.tanh = function (x) {
            if (this.isEmpty(x)) {
                return this.EMPTY.clone();
            }
            return new Interval(this.tanhLo(x.lo), this.tanhHi(x.hi));
        };
        /*
         * Relational
         */
        /**
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns Boolean
         */
        Interval.prototype.equal = function (x, y) {
            if (this.isEmpty(x)) {
                return this.isEmpty(y);
            }
            return !this.isEmpty(y) && x.lo === y.lo && x.hi === y.hi;
        };
        // almostEqual: function(x, y): void {
        //     x = Array.isArray(x) ? x : x.toArray();
        //     y = Array.isArray(y) ? y : y.toArray();
        //     assertEps(x[0], y[0])
        //     assertEps(x[1], y[1])
        // }
        /**
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns Boolean
         */
        Interval.prototype.notEqual = function (x, y) {
            if (this.isEmpty(x)) {
                return !this.isEmpty(y);
            }
            return this.isEmpty(y) || x.hi < y.lo || x.lo > y.hi;
        };
        /**
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns Boolean
         */
        Interval.prototype.lt = function (x, y) {
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (type_js_1.Type.isNumber(y)) {
                y = this.Interval(y);
            }
            if (this.isEmpty(x) || this.isEmpty(y)) {
                return false;
            }
            return x.hi < y.lo;
        };
        /**
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns Boolean
         */
        Interval.prototype.gt = function (x, y) {
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (type_js_1.Type.isNumber(y)) {
                y = this.Interval(y);
            }
            if (this.isEmpty(x) || this.isEmpty(y)) {
                return false;
            }
            return x.lo > y.hi;
        };
        /**
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns Boolean
         */
        Interval.prototype.leq = function (x, y) {
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (type_js_1.Type.isNumber(y)) {
                y = this.Interval(y);
            }
            if (this.isEmpty(x) || this.isEmpty(y)) {
                return false;
            }
            return x.hi <= y.lo;
        };
        /**
         * @param {JXG.Math.Interval} x
         * @param {JXG.Math.Interval} y
         * @returns Boolean
         */
        Interval.prototype.geq = function (x, y) {
            if (type_js_1.Type.isNumber(x)) {
                x = this.Interval(x);
            }
            if (type_js_1.Type.isNumber(y)) {
                y = this.Interval(y);
            }
            if (this.isEmpty(x) || this.isEmpty(y)) {
                return false;
            }
            return x.lo >= y.hi;
        };
        /*
         * Round
         * Rounding functions for numbers
         */
        Interval.prototype.identity = function (v) {
            return v;
        };
        Interval.prototype._prev = function (v) {
            if (v === Infinity) {
                return v;
            }
            return this.nextafter(v, -Infinity);
        };
        Interval.prototype._next = function (v) {
            if (v === -Infinity) {
                return v;
            }
            return this.nextafter(v, Infinity);
        };
        Interval.prototype.prev = function (v) {
            return this._prev(v);
        };
        Interval.prototype.next = function (v) {
            return this._next(v);
        };
        Interval.prototype.toInteger = function (x) {
            return x < 0 ? Math.ceil(x) : Math.floor(x);
        };
        Interval.prototype.addLo = function (x, y) {
            return this.prev(x + y);
        };
        Interval.prototype.addHi = function (x, y) {
            return this.next(x + y);
        };
        Interval.prototype.subLo = function (x, y) {
            return this.prev(x - y);
        };
        Interval.prototype.subHi = function (x, y) {
            return this.next(x - y);
        };
        Interval.prototype.mulLo = function (x, y) {
            return this.prev(x * y);
        };
        Interval.prototype.mulHi = function (x, y) {
            return this.next(x * y);
        };
        Interval.prototype.divLo = function (x, y) {
            return this.prev(x / y);
        };
        Interval.prototype.divHi = function (x, y) {
            return this.next(x / y);
        };
        Interval.prototype.intLo = function (x) {
            return this.toInteger(this.prev(x));
        };
        Interval.prototype.intHi = function (x) {
            return this.toInteger(this.next(x));
        };
        Interval.prototype.logLo = function (x) {
            return this.prev(Math.log(x));
        };
        Interval.prototype.logHi = function (x) {
            return this.next(Math.log(x));
        };
        Interval.prototype.expLo = function (x) {
            return this.prev(Math.exp(x));
        };
        Interval.prototype.expHi = function (x) {
            return this.next(Math.exp(x));
        };
        Interval.prototype.sinLo = function (x) {
            return this.prev(Math.sin(x));
        };
        Interval.prototype.sinHi = function (x) {
            return this.next(Math.sin(x));
        };
        Interval.prototype.cosLo = function (x) {
            return this.prev(Math.cos(x));
        };
        Interval.prototype.cosHi = function (x) {
            return this.next(Math.cos(x));
        };
        Interval.prototype.tanLo = function (x) {
            return this.prev(Math.tan(x));
        };
        Interval.prototype.tanHi = function (x) {
            return this.next(Math.tan(x));
        };
        Interval.prototype.asinLo = function (x) {
            return this.prev(Math.asin(x));
        };
        Interval.prototype.asinHi = function (x) {
            return this.next(Math.asin(x));
        };
        Interval.prototype.acosLo = function (x) {
            return this.prev(Math.acos(x));
        };
        Interval.prototype.acosHi = function (x) {
            return this.next(Math.acos(x));
        };
        Interval.prototype.acotLo = function (x) {
            return this.prev(Mat.acot(x));
        };
        Interval.prototype.acotHi = function (x) {
            return this.next(Mat.acot(x));
        };
        Interval.prototype.atanLo = function (x) {
            return this.prev(Math.atan(x));
        };
        Interval.prototype.atanHi = function (x) {
            return this.next(Math.atan(x));
        };
        Interval.prototype.sinhLo = function (x) {
            return this.prev(Mat.sinh(x));
        };
        Interval.prototype.sinhHi = function (x) {
            return this.next(Mat.sinh(x));
        };
        Interval.prototype.coshLo = function (x) {
            return this.prev(Mat.cosh(x));
        };
        Interval.prototype.coshHi = function (x) {
            return this.next(Mat.cosh(x));
        };
        Interval.prototype.tanhLo = function (x) {
            return this.prev(Mat.tanh(x));
        };
        Interval.prototype.tanhHi = function (x) {
            return this.next(Mat.tanh(x));
        };
        Interval.prototype.sqrtLo = function (x) {
            return this.prev(Math.sqrt(x));
        };
        Interval.prototype.sqrtHi = function (x) {
            return this.next(Math.sqrt(x));
        };
        Interval.prototype.powLo = function (x, power) {
            var y;
            if (power % 1 !== 0) {
                // power has decimals
                return this.prev(Math.pow(x, power));
            }
            y = (power & 1) === 1 ? x : 1;
            power >>= 1;
            while (power > 0) {
                x = this.mulLo(x, x);
                if ((power & 1) === 1) {
                    y = this.mulLo(x, y);
                }
                power >>= 1;
            }
            return y;
        };
        Interval.prototype.powHi = function (x, power) {
            var y;
            if (power % 1 !== 0) {
                // power has decimals
                return this.next(Math.pow(x, power));
            }
            y = (power & 1) === 1 ? x : 1;
            power >>= 1;
            while (power > 0) {
                x = this.mulHi(x, x);
                if ((power & 1) === 1) {
                    y = this.mulHi(x, y);
                }
                power >>= 1;
            }
            return y;
        };
        /**
         * @ignore
         * @private
         */
        Interval.prototype.disable = function () {
            this.next = this.prev = this.identity;
        };
        /**
         * @ignore
         * @private
         */
        Interval.prototype.enable = function (v) {
            var _this = this;
            this.prev = function (v) {
                return _this._prev(v);
            };
            this.next = function (v) {
                return _this._next(v);
            };
        };
        Interval.prototype.nextafter = function (x, y) {
            var lo, hi;
            if (isNaN(x) || isNaN(y)) {
                return NaN;
            }
            if (x === y) {
                return x;
            }
            if (x === 0) {
                if (y < 0) {
                    return -this.SMALLEST_DENORM;
                }
                return this.SMALLEST_DENORM;
            }
            hi = doubleBits.hi(x);
            lo = doubleBits.lo(x);
            if (y > x === x > 0) {
                if (lo === this.UINT_MAX) {
                    hi += 1;
                    lo = 0;
                }
                else {
                    lo += 1;
                }
            }
            else {
                if (lo === 0) {
                    lo = this.UINT_MAX;
                    hi -= 1;
                }
                else {
                    lo -= 1;
                }
            }
            return doubleBits.pack(lo, hi);
        };
        /*
         * nextafter
         */
        Interval.SMALLEST_DENORM = Math.pow(2, -1074);
        Interval.UINT_MAX = -1 >>> 0;
        return Interval;
    }());
    exports.Interval = Interval;
});
