describe("A suite", function () {
    it("contains a spec with an expectation", function () {
        expect(true).toBe(true);
    });
});




import { Type } from '../jsxgraph/utils/type.js';
// // import { describe, test, expect } from '../../node_modules/jasmine-core/lib/jasmine-core/jasmine.js'

// function exists(v, checkEmptyString = false) {
//     /* eslint-disable eqeqeq */
//     var result = !(v == undefined || v === null);

//     if (checkEmptyString) {
//         return result && v !== '';
//     }
//     return result;
// }

// function isArray(v) {
//     var r;

//     // use the ES5 isArray() method and if that doesn't exist use a fallback.
//     if (Array.isArray) {
//         r = Array.isArray(v);
//     } else {
//         r =
//             v !== null &&
//             typeof v === 'object' &&
//             typeof v.splice === 'function' &&
//             typeof v.join === 'function';
//     }

//     return r;
// }

// function deepCopy(obj: Object, obj2: Object, toLower: boolean = false): Object {

//     var c, i, prop, i2;

//     toLower = toLower || false;
//     if (typeof obj !== 'object' || obj === null) {
//         return obj;
//     }

//     // Missing hasOwnProperty is on purpose in this function
//     if (isArray(obj)) {
//         c = [];
//         for (i = 0; i < Object.keys(obj).length; i++) {  // warning: Object.keys() can be slow!
//             prop = obj[i];
//             // Attention: typeof null === 'object'
//             if (prop !== null && typeof prop === 'object') {
//                 // We certainly do not want to recurse into a JSXGraph object.
//                 // This would for sure result in an infinite recursion.
//                 // As alternative we copy the id of the object.
//                 if (exists(prop.board)) {
//                     c[i] = prop.id;
//                 } else {
//                     c[i] = deepCopy(prop, {}, toLower);
//                 }
//             } else {
//                 c[i] = prop;
//             }
//         }
//     } else {
//         c = {};
//         for (i in obj) {
//             if (obj.hasOwnProperty(i)) {
//                 i2 = toLower ? i.toLowerCase() : i;
//                 prop = obj[i];
//                 if (prop !== null && typeof prop === 'object') {
//                     if (exists(prop.board)) {
//                         c[i2] = prop.id;
//                     } else {
//                         c[i2] = deepCopy(prop, {}, toLower);
//                     }
//                 } else {
//                     c[i2] = prop;
//                 }
//             }
//         }

//         for (i in obj2) {
//             if (obj2.hasOwnProperty(i)) {
//                 i2 = toLower ? i.toLowerCase() : i;

//                 prop = obj2[i];
//                 if (prop !== null && typeof prop === 'object') {
//                     if (isArray(prop) || !exists(c[i2])) {
//                         c[i2] = deepCopy(prop, {}, toLower);
//                     } else {
//                         c[i2] = deepCopy(c[i2], prop, toLower);
//                     }
//                 } else {
//                     c[i2] = prop;
//                 }
//             }
//         }
//     }

//     return c;
// }



describe('deepcopy', () => {
    it('adds obj2 to obj1 NOT lowercalse', () => {
        let obj1 = { a: 1, b: 2 }
        let obj2 = { c: 3 }
        expect(Type.deepCopy(obj1, obj2)).toEqual({ a: 1, b: 2, c: 3 });   // .toEqual for objects
        expect(Type.deepCopy(obj1, obj2)).not.toEqual({ a: 1, b: 2, d: 3 });   // .not.toEqual for objects

        obj2 = { B: 4 }
        expect(Type.deepCopy(obj1, obj2)).toEqual({ a: 1, b: 2, B: 4 });
        expect(Type.deepCopy(obj1, obj2, true)).toEqual({ a: 1, b: 4 });
    });
});