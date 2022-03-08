import { State } from "./state.js"

class Texture {
    state: State;
    url: string;

    constructor(state: State, url: string) {
        this.state = state;
        this.url = url;
        let image = new Image();
        image.src = this.url;
        image.onload = () => {
            this.#bufferize();
            this.#bind(image);
        }
    }

    #bufferize(): void {
        if (!this.state.program) { return null; }
        let position = this.state.gl.getAttribLocation(this.state.program, "a_position");
        let textureCoordinates = this.state.gl.getAttribLocation(this.state.program, "a_texCoord");
        let resolution = this.state.gl.getUniformLocation(this.state.program, "u_resolution");
        let image_ = this.state.gl.getUniformLocation(this.state.program, "u_image");
        let vertex = this.state.gl.createVertexArray();
        this.state.gl.bindVertexArray(vertex);
        let buffer = this.state.gl.createBuffer();
        this.state.gl.bindBuffer(this.state.gl.ARRAY_BUFFER, buffer);
        this.state.gl.bufferData(
            this.state.gl.ARRAY_BUFFER,
            new Float32Array([
                0.0,  0.0,
                1.0,  0.0,
                0.0,  1.0,
                0.0,  1.0,
                1.0,  0.0,
                1.0,  1.0
            ]),
            this.state.gl.STATIC_DRAW
        );
        this.state.gl.enableVertexAttribArray(textureCoordinates);
        let size = 2; // 2 components per iteration
        let type = this.state.gl.FLOAT; // 32-bit float
        let normalize = false;
        let stride = 0; // size * sizeof(type)
        let offset = 0;
        this.state.gl.vertexAttribPointer(
            textureCoordinates,
            size,
            type,
            normalize,
            stride,
            offset
        );
    }

    #bind(image: HTMLImageElement): void {
        let texture = this.state.gl.createTexture();
        this.state.gl.activeTexture(this.state.gl.TEXTURE0 + 0); // make unit 0 active
        this.state.gl.bindTexture(this.state.gl.TEXTURE_2D, texture); // bind to TEXTURE_2D
        // set texture parameters
        this.state.gl.texParameteri(this.state.gl.TEXTURE_2D, this.state.gl.TEXTURE_WRAP_S, this.state.gl.CLAMP_TO_EDGE);
        this.state.gl.texParameteri(this.state.gl.TEXTURE_2D, this.state.gl.TEXTURE_WRAP_T, this.state.gl.CLAMP_TO_EDGE);
        this.state.gl.texParameteri(this.state.gl.TEXTURE_2D, this.state.gl.TEXTURE_MIN_FILTER, this.state.gl.NEAREST);
        this.state.gl.texParameteri(this.state.gl.TEXTURE_2D, this.state.gl.TEXTURE_MAG_FILTER, this.state.gl.NEAREST);
        // add image to texture
        let mipLevel = 0; // largest MIP
        let internal = this.state.gl.RGBA; // texture format
        let format = this.state.gl.RGBA; // image format
        let type = this.state.gl.UNSIGNED_BYTE; // image source
        this.state.gl.texImage2D(
            this.state.gl.TEXTURE_2D,
            mipLevel,
            internal,
            format,
            type,
            image
        );
    }
}

export { Texture }