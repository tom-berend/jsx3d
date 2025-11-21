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
        document.body.innerHTML =
        `<!DOCTYPE html><html lang="en"><head></head><body><div id="box" class="jxgbox" style="width:500px; aspect-ratio: 1/1;"></div></body></html>`

        let b = new Board('box')
        expect(b.container).toBe('box')

    });
});

