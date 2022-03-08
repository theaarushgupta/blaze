import * as shader from "./shader.js";
import * as buffer from "./buffer.js";

import { State } from "./state.js";

class Blaze {
    state: State;
    shader: shader.Shader;

    constructor(app: HTMLCanvasElement) {
        this.state = {
            gl: app.getContext("webgl2"),
            program: null
        };
        if ( this.state.gl == null ) { return; }
        this.clear();
        this.shader = new shader.Shader(this.state);
    }

    clear(): void {
        this.state.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.state.gl.clear(this.state.gl.COLOR_BUFFER_BIT);
    }

    draw(program: WebGLProgram, positions: number[]): void {
        let buffer_ = new buffer.Buffer(this.state, program);
        buffer_.allocate(positions)
        this.state.gl.drawArrays(this.state.gl.TRIANGLES, 0, 6);
    }
};

export { Blaze }