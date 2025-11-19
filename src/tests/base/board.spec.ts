////////////////// prototype test
describe('board suite description', () => {
    it('test description', () => {
        let a = 0
        expect(a).toBe(0)
    });
});
//
//
import { Board } from "../../jsxgraph/base/board.js";

////////////////// prototype test
describe('board creation', () => {
    it('test description', () => {
        let b = new Board('abc')
        expect(b.container).toBe('abc')

    });
});

