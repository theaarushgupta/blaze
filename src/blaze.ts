import * as shader from "./shader.js";
import * as buffer from "./buffer.js";

interface Blaze {
    state: State;
    shader: shader.Shader;
    buffer: buffer.Buffer;
}

class Blaze {
    constructor(app: HTMLCanvasElement) {
        this.state = {
            gl: app.getContext("webgl2")
        };
        if ( this.state.gl == null ) { return; }
        this.clear();
        this.shader = new shader.Shader(this.state);
    }

    clear(): void {
        this.state.gl.clearColor(0.0, 0.8, 0.0, 1.0); // green
        this.state.gl.clear(this.state.gl.COLOR_BUFFER_BIT);
    }
};

export { Blaze }