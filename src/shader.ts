interface Shader {
    state: State;
}

class Shader {
    constructor(state: State) {
        this.state = state;
    }

    load(path: string): string | null {
        let request = null;
        request = new XMLHttpRequest();
        request.open("GET", path, false);
        try {
            request.send();
        } catch (error) {
            throw new Error(`failed to load shader from ${path}`);
            return null;
        }
        request = request.responseText;
        return request;
    }

    compile(type: number, source: string): WebGLShader | null {
        let shader = this.state.gl.createShader(type);
        this.state.gl.shaderSource(shader, source);
        this.state.gl.compileShader(shader);
        let success = this.state.gl.getShaderParameter(
            shader,
            this.state.gl.COMPILE_STATUS
        )
        if (!success) {
            console.log(`[error] cannot compile shader ${this.state.gl.getShaderInfoLog(shader)}`)
        }
        return shader;
    }

    link(vertex: WebGLShader | null, fragment: WebGLShader | null): WebGLProgram | null {
        if (!vertex && !fragment) { return null; }
        let program = this.state.gl.createProgram();
        this.state.gl.attachShader(program, vertex);
        this.state.gl.attachShader(program, fragment);
        this.state.gl.linkProgram(program);
        let success = this.state.gl.getShaderParameter(
            program,
            this.state.gl.LINK_STATUS
        )
        if (success) {
            return program;
        }
        console.log(`[error] cannot link shaders ${this.state.gl.getProgramInfoLog(program)}`)
        this.state.gl.deleteProgram(program);
        
    }
};

export { Shader }