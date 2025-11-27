import { Board } from "./base/board.js";
import { JSXGraph } from "./jsxgraph.js"
import { SVGRenderer } from "./renderer/svg.js"


export class IndexTests {
    newBoard: Board
    oldBoard: any

    constructor() {
        this.newBoard = JSXGraph.initBoard(
            'box', {
            boundingBox: [-10, 10, 10, -10],
            // axis: true
        });
        this.oldBoard = (window as any).JXG.JSXGraph.initBoard(
            'box2', {
            boundingBox: [-10, 10, 10, -10],
            // axis: true
        });

        this.point()
        // this.text()

    }

    point() {
        let a = this.newBoard.create('point', [1, 3])
        let b = this.oldBoard.create('point', [1, 3])
    }
    text() {
        let a = this.newBoard.create('text', [2, 3,"test"],{name:'foo',strokecolor:'red'})
        let b = this.oldBoard.create('text', [2, 3,"test"],{name:'foo',strokecolor:'red'})
    }

}