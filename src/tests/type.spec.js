define(["require", "exports", "../jsxgraph/utils/type.js"], function (require, exports, type_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ////////////////// prototype test
    describe('suite description', function () {
        it('test description', function () {
            var a = 0;
            expect(a).toBe(0);
        });
    });
    // temporary for testing
    var Board = /** @class */ (function () {
        function Board() {
            this.BOARD_MODE_NONE = 0;
            this.objects = {};
            this.jc = {};
            this.update = function () { };
            this.containerObj = true;
            this.id = 'string';
        }
        return Board;
    }());
    describe('deepcopy', function () {
        it('adds obj2 to obj1 NOT lowercalse', function () {
            var obj1 = { a: 1, b: 2 };
            var obj2 = { c: 3 };
            expect(type_js_1.Type.deepCopy(obj1, obj2)).toEqual({ a: 1, b: 2, c: 3 }); // .toEqual for objects
            expect(type_js_1.Type.deepCopy(obj1, obj2)).not.toEqual({ a: 1, b: 2, d: 3 }); // .not.toEqual for objects
            var obj3 = { B: 4 };
            expect(type_js_1.Type.deepCopy(obj1, obj3)).toEqual({ a: 1, b: 2, B: 4 });
            expect(type_js_1.Type.deepCopy(obj1, obj3, true)).toEqual({ a: 1, b: 4 });
            var obj4 = { B: 4, C: { d: 5, e: { f: 6 } } }; // nested objects
            expect(type_js_1.Type.deepCopy(obj1, obj4)).toEqual({ a: 1, b: 2, B: 4, C: { d: 5, e: { f: 6 } } });
            expect(type_js_1.Type.deepCopy(obj1, obj4, true)).toEqual({ a: 1, b: 4, c: { d: 5, e: { f: 6 } } });
        });
    });
    describe("isBoard", function () {
        it("tests whether a parameter is really a Board", function () {
            var b = new Board();
            expect(type_js_1.Type.isBoard(b)).toBe(true); // missing param
        });
    });
    describe("isObject", function () {
        it('surprisingly hard to verify that something is an object', function () {
            expect(type_js_1.Type.isObject({})).toBe(true);
            expect(type_js_1.Type.isObject(null)).toBe(false);
            expect(type_js_1.Type.isObject(function () { })).toBe(false);
        });
    });
    describe('mergeAttr(attr, special, toLower, ignoreUndefinedSpecials)', function () {
        it('in-place (deep) merge of attributes', function () {
            var a = {
                a1: 'string',
                a2: true,
                a3: 3.14,
                a4: { x: { y: 1, z: [1] } }
            };
            var b = {
                B1: 'alien',
                B2: false,
                B3: 123456
            };
            var c = {
                a1: 'STRING'
            };
            var d = {
                a4: { x: { y: 1, z: [2] } }
            };
            var e = {
                a2: { enabled: true },
                a4: false
            };
            expect(type_js_1.Type.mergeAttrHelper(a, b)).toEqual({ a1: 'string', a2: true, a3: 3.14, a4: { x: { y: 1, z: [1] } }, b1: 'alien', b2: false, b3: 123456 });
            expect(type_js_1.Type.mergeAttrHelper(a, b, false)).toEqual({ a1: 'string', a2: true, a3: 3.14, a4: { x: { y: 1, z: [1] } }, B1: 'alien', B2: false, B3: 123456 });
            expect(type_js_1.Type.mergeAttrHelper(a, c)).toEqual({ a1: 'STRING', a2: true, a3: 3.14, a4: { x: { y: 1, z: [1] } } });
            expect(type_js_1.Type.mergeAttrHelper(a, d)).toEqual({ a1: 'string', a2: true, a3: 3.14, a4: { x: { y: 1, z: [2] } } });
            expect(type_js_1.Type.mergeAttrHelper(a, e)).toEqual({ a1: 'string', a2: { enabled: true }, a3: 3.14, a4: false });
        });
    });
    describe('copyAttributes(attributes, options, ...s)', function () {
        it('adds obj2 to obj1 NOT lowercalse', function () {
        });
    });
});
