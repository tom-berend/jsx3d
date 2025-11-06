////////////////// prototype test
describe('suite description', () => {
    it('test description', () => {
        let a = 0
        expect (a).toBe(0)
    });
});
//////////////////////////////////////////////////
import { LooseObject, Type } from '../jsxgraph/utils/type.js';
// temporary for testing
class Board {
    BOARD_MODE_NONE=0
    objects = {}
    jc = {}
    update = ()=>{}
    containerObj = true
    id='string'
}
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
        expect(Type.deepCopy(obj1, obj4, true)).toEqual({ a: 1, b: 4, c: { d: 5, e: { f: 6 } } });
    });
});
describe("isBoard", function () {
    it("tests whether a parameter is really a Board", function () {
        let b = new Board()
        expect(Type.isBoard(b)).toBe(true);   // missing param
    });
});
describe("isObject", function () {
    it('surprisingly hard to verify that something is an object', () => {
        expect(Type.isObject({})).toBe(true);
        expect(Type.isObject(null)).toBe(false);
        expect(Type.isObject(()=>{})).toBe(false);
    });
});
describe('mergeAttr(attr, special, toLower, ignoreUndefinedSpecials)', () => {
    it('in-place (deep) merge of attributes', () => {
        let a = {
            a1:'string',
            a2: true,
            a3: 3.14,
            a4: {x:{y:1,z:[1]}}
        }
        let b = {       // basic test plus lowercase test
            B1:'alien',
            B2:false,
            B3: 123456
        }
        let c ={
            a1:'STRING'
        }
        let d = {       // replace a single value in a deep
            a4: {x:{y:1,z:[2]}}
        }
        let e = {       // change flat to object and vice versa
            a2: {enabled:true},
            a4: false
        }
        expect (Type.mergeAttrHelper(a,b)).toEqual({a1:'string',a2:true,a3:3.14,a4:{x:{y:1,z:[1]}},b1:'alien',b2:false,b3:123456})
        expect (Type.mergeAttrHelper(a,b,false)).toEqual({a1:'string',a2:true,a3:3.14,a4:{x:{y:1,z:[1]}},B1:'alien',B2:false,B3:123456})
        expect (Type.mergeAttrHelper(a,c)).toEqual({a1:'STRING',a2:true,a3:3.14,a4:{x:{y:1,z:[1]}}})
        expect (Type.mergeAttrHelper(a,d)).toEqual({a1:'string',a2:true,a3:3.14,a4:{x:{y:1,z:[2]}}})
        expect (Type.mergeAttrHelper(a,e)).toEqual({a1:'string',a2:{enabled:true},a3:3.14,a4:false})

    });
});
describe('copyAttributes(attributes, options, ...s)', () => {
    it('adds obj2 to obj1 NOT lowercalse', () => {

    });
});
