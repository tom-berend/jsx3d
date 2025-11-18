////////////////// prototype test
describe('coords suite description', () => {
    it('test description', () => {
        let a = 0
        expect(a).toBe(1)
    });
});
//
//
import { Board } from "../../jsxgraph/base/board";
import { COORDS_BY } from "../../jsxgraph/base/constants";
import { Coords } from "../../jsxgraph/base/coords";
describe('test the Coords constructor', () => {
    it('basic coordinates', () => {
        let board = new Board('x')
        let coords = new Coords(COORDS_BY.USER,[1,1],board)
        console.log('warn')
        expect(coords.usrCoords).toEqual([1,1,1])
    });
});
