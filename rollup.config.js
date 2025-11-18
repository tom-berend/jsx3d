
import { rollup } from "rollup";

export default {
    input: './build/jsxgraph/jsxgraph.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs' //cjs stands for common js file
    }
}
