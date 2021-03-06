import { State } from "./state.js";

interface LoadPaths {
    vertex: string;
    fragment: string;
}

class Shader {
    state: State;

    constructor(state: State) {
        this.state = state;
    }

    load(paths: LoadPaths): WebGLProgram | null {
        let vertex = paths.vertex;
        let fragment = paths.fragment;
        let vertex_ = this.#fetch(vertex);
        let fragment_ = this.#fetch(fragment);
        let vertexCompiled = this.compile(this.state.gl.VERTEX_SHADER, vertex_);
        let fragmentCompiled = this.compile(this.state.gl.FRAGMENT_SHADER, fragment_);
        let program = this.link(vertexCompiled, fragmentCompiled);
        return program;
    }

    #fetch(path: string): string | null {
        let request = null;
        request = new XMLHttpRequest();
        request.open("GET", path, false);
        try {
            request.send();
        } catch (error) {
            console.log(`[error] failed to load shader from ${path}`);
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
        let success = this.state.gl.getProgramParameter(
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