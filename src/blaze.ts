import * as shader from "./shader.js";
import { Texture } from "./texture.js";

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
};

export { Blaze, Texture }