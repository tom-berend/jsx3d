////////////////// prototype test
describe('type suite description', () => {
    it('test description', () => {
        let a = 0
        expect(a).toBe(0)
    });
});
//////////////////////////////////////////////////
import { LooseObject} from '../src/jxg.js'
import { Type } from '../src/utils/type.js';
import { Options } from '../src/options.js';

// // temporary for testing
// class Board {
//     BOARD_MODE_NONE = 0
//     objects = {}
//     jc = {}
//     update = () => { }
//     containerObj = true
//     id = 'string'
// }
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
// describe("isBoard", function () {
//     it("tests whether the parameter is really a Board", function () {
//         let b = new Board()
//         expect(Type.isBoard(b)).toBeTrue();
//     });
// });
describe("isObject", function () {
    it('surprisingly hard to verify that something is an object', () => {
        expect(Type.isObject({})).toBe(true);
        expect(Type.isObject(null)).toBe(false);
        expect(Type.isObject(() => { })).toBe(false);
    });
});
describe('mergeAttr(attr, special, toLower, ignoreUndefinedSpecials)', () => {
    it('in-place (deep) merge of attributes', () => {
        let a = {
            a1: 'string',
            a2: true,
            a3: 3.14,
            a4: { x: { y: 1, z: [1] } }
        }
        let b = {       // basic test plus lowercase test
            B1: 'alien',
            B2: false,
            B3: 123456
        }
        let c = {
            a1: 'STRING'
        }
        let d = {       // replace a single value in a deep
            a4: { x: { y: 1, z: [2] } }
        }
        let e = {       // change flat to object and vice versa
            a2: { enabled: true },
            a4: false
        }
        expect(Type.mergeAttrHelper(a, b)).toEqual({ a1: 'string', a2: true, a3: 3.14, a4: { x: { y: 1, z: [1] } }, b1: 'alien', b2: false, b3: 123456 })
        expect(Type.mergeAttrHelper(a, b, false)).toEqual({ a1: 'string', a2: true, a3: 3.14, a4: { x: { y: 1, z: [1] } }, B1: 'alien', B2: false, B3: 123456 })
        expect(Type.mergeAttrHelper(a, c)).toEqual({ a1: 'STRING', a2: true, a3: 3.14, a4: { x: { y: 1, z: [1] } } })
        expect(Type.mergeAttrHelper(a, d)).toEqual({ a1: 'string', a2: true, a3: 3.14, a4: { x: { y: 1, z: [2] } } })
        expect(Type.mergeAttrHelper(a, e)).toEqual({ a1: 'string', a2: { enabled: true }, a3: 3.14, a4: false })

        // only the second element is converted to lowercase
        let x = { A: true }
        let y = { B: true }
        expect(Type.mergeAttrHelper(x, y, false)).toEqual({ A: true, B: true })
        expect(Type.mergeAttrHelper(x, y)).toEqual({ A: true, b: true })
        expect(Type.mergeAttrHelper(y, x)).toEqual({ a: true, B: true })


        let x1 = {enabled:true, compile:true}
        let y1 = {enabled:false}
        let z1 = Type.mergeAttrHelper(x1,y1)
        expect(z1).toEqual({enabled:false, compile:true})
        let y2 = {Enabled:false}
        let z2 = Type.mergeAttrHelper(x1,y2)  // 'enabled' vs 'Enabled', merge always takes to lowercase
        expect(z1).toEqual({enabled:false, compile:true})
    });
});
describe('getObjectDiff(a:object, b:object): object)', () => {
    it('Generates an attributes object overwritten by the user specified attributes.', () => {
        let a = { a: true, b: false, c: { d: true } }
        let b = { a: true, b: false, c: { d: true } }
        let c = { a: true, c: { d: true } }     // missing b
        let d = { a: true, b: false, c: { d: true }, f: 'added' }

        expect(Type.getObjectDiff(a, b)).toEqual({})   // same
        expect(Type.getObjectDiff(a, c)).toEqual({ b: { expect: false, found: undefined } })
        expect(Type.getObjectDiff(a, d)).toEqual({ f: { expect: undefined, found: 'added' } })
    });
});
////////////////// prototype test
describe(' keysToLowerCase(obj:object):object', () => {
    it('Converts an object to a new object containing only lower case properties', () => {
        let a: LooseObject = { A: 1 }
        expect(Type.keysToLowerCase(a)).toEqual({ a: 1 })
    });
});
describe('copyAttributes(attributes, options, ...s)', () => {
    it('Generates an attributes object overwritten by the user specified attributes.', () => {
        let lowerCaseLabelOptions = Type.keysToLowerCase(Options.label)  // merge converts to lower by default
        let testAttributes = { test: true }

        // we lose 'boo' because ??
        // we lose 'dummy' because ??
        // dummyOption asks for partial from jc
        expect(Type.copyAttributes({}, Options.board, 'jc')).toEqual({ enabled: true, compile:true, label: lowerCaseLabelOptions })
        expect(Type.copyAttributes({enabled:true}, Options.board, 'jc')).toEqual({ enabled: true, compile:true, label: lowerCaseLabelOptions })
        expect(Type.copyAttributes({enabled:false}, Options.board, 'jc')).toEqual({ enabled: false, compile:true, label: lowerCaseLabelOptions })

        // expect(Type.copyAttributes({ compile: true }, dummyOption, 'jc')).toEqual({ enabled: false, label: lowerCaseLabelOptions })

        /*
                // this grabs the 'jc' options, plus the default label options in lower case
                expect(Type.copyAttributes({}, Options, 'jc')).toEqual({ enabled: true, compile: true, label: lowerCaseLabelOptions })
                // this grabs the 'jc' options, plus the default label options in lower case
                expect(Type.copyAttributes({}, Options, 'board')).toEqual({ enabled: true, compile: true, label: lowerCaseLabelOptions })


                // expect(Type.copyAttributes({ boo: 'boo' }, Options.dummyOption, 'jc')).toEqual({ boo: 'boo', enabled: false, label: lowerCaseLabelOptions })

                // let exp = Type.mergeAttrHelper( Options.navbar,Options.label  )
                // expect(Type.copyAttributes(Options.elements, Options, 'navbar')).toEqual( exp )

        */
    });
});
