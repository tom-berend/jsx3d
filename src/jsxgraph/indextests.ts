import { JSXGraph } from "./jsxgraph.js"
import { SVGRenderer } from "./renderer/svg.js"

export class IndexTests {

    point() {
        let board = JSXGraph.initBoard(
            'box', {
            boundingBox: [-10, 10, 10, -10],
            // axis: true
        });
        // console.warn('about to create text')
        // board.create('text', [0, 0, 'message from tom'], { strokeColor: 'red' })

        // let svg = new SVGRenderer('box',{height:100,width:100})

        board.create('point', [2, 3])

        let b2 = (window as any).JXG.JSXGraph.initBoard(
            'box2', {
            boundingBox: [-10, 10, 10, -10],
            // axis: true
        });
        b2.create('point', [2, 3])

    }
}