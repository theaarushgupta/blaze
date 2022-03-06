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
        this.shader = new shader.Shader(this.state);
        this.setup();
    }

    setup(): void {
        if ( this.state.gl == null ) { return; }
        this.state.gl.clearColor(0.0, 0.8, 0.0, 1.0); // green
        this.state.gl.clear(this.state.gl.COLOR_BUFFER_BIT);
    }
};

export { Panda }