import * as shader from "./shader";

interface Panda {
    state: State;
    shader: shader.Shader;
}

class Panda {
    constructor(app: HTMLCanvasElement) {
        this.state = {
            gl: app.getContext("webgl2")
        };
        this.setup();
    }

    clear(): void {
        this.state.gl.clearColor(0.0, 0.8, 0.0, 1.0); // green
        this.state.gl.clear(this.state.gl.COLOR_BUFFER_BIT);
    }

    setup(): void {
        if ( this.state.gl == null ) { return; }
        this.clear();
        this.shader = new shader.Shader(this.state);
    }
};

export { Panda }