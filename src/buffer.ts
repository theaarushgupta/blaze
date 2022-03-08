import { State } from "./state.js";

interface Buffer {
    state: State;
    position: number;
    resolution: WebGLUniformLocation;
}

class Buffer {
    constructor(state: State, program: WebGLProgram | null) {
        this.state = state
        if (program) {
            this.position = this.state.gl.getAttribLocation(program, "a_position");
            this.resolution = this.state.gl.getUniformLocation(program, "u_resolution")
        } else {
            return null;
        }
        this.#bind();
    }

    allocate(positions: number[]): void {
        this.state.gl.bufferData(
            this.state.gl.ARRAY_BUFFER,
            new Float32Array(positions),
            this.state.gl.STATIC_DRAW
        );
    }

    #bind(): void {
        let buffer = this.state.gl.createBuffer();
        this.state.gl.bindBuffer(this.state.gl.ARRAY_BUFFER, buffer); // bind buffer to point
        // setup data extraction from buffer
        let vao = this.state.gl.createVertexArray(); // collection of attribute states (Vertex Array Object)
        this.state.gl.bindVertexArray(vao); // make primary
        this.state.gl.enableVertexAttribArray(this.position); // make dynamic
        let size = 2; // 2 components per iteration
        let type = this.state.gl.FLOAT; // 32-bit float
        let normalize = false;
        let stride = 0; // size * sizeof(type)
        let offset = 0;
        this.state.gl.vertexAttribPointer(
            this.position,
            size,
            type,
            normalize,
            stride,
            offset
        ); // binds ARRAY_BUFFER to attribute (frees for next use-case)
        this.state.gl.viewport(
            0,
            0,
            this.state.gl.canvas.width,
            this.state.gl.canvas.height
        );
        this.state.gl.uniform2f(
            this.resolution,
            this.state.gl.canvas.width,
            this.state.gl.canvas.height
        ); // pass canvas resolution to convert from pixels to clip space
    }
};

export { Buffer }