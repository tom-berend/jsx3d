// import { describe, expect, it } from

describe("A suite", function () {
    it("contains a spec with an expectation", function () {
        expect(true).toBe(true);
    });
});


import { Type, LooseObject } from '../jsxgraph/utils/type.js';

console.error('tom tom tom')

describe('deepcopy', () => {
    it('adds obj2 to obj1 NOT lowercalse', () => {
        let obj1 = { a: 1, b: 2 }
        let obj2 = { c: 3 }
        expect(Type.deepCopy(obj1, obj2)).toEqual({ a: 1, b: 2, c: 3 });   // .toEqual for objects
        expect(Type.deepCopy(obj1, obj2)).not.toEqual({ a: 1, b: 2, d: 3 });   // .not.toEqual for objects

        let obj3 = { B: 4 }
        expect(Type.deepCopy(obj1, obj3)).toEqual({ a: 1, b: 2, B: 4 });
        expect(Type.deepCopy(obj1, obj3, true)).toEqual({ a: 1, b: 4 });

        let obj4 = { B: 4, C: { d: 5, e: { f: 6 } } }  // nested objects
        expect(Type.deepCopy(obj1, obj4)).toEqual({ a: 1, b: 2, B: 4, C: { d: 5, e: { f: 6 } } });
        expect(Type.deepCopy(obj1, obj4, true)).toEqual({ a: 1, b: 4, c: { d: 5, e: { f: 6 } }});
    });
});