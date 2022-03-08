import { State } from "./state.js"

class Texture {
    state: State;
    url: string;
    #image: HTMLImageElement;
    #buffer: WebGLBuffer;
    #vertex: WebGLVertexArrayObject;

    constructor(state: State, url: string) {
        this.state = state;
        this.url = url;
        this.#image = new Image();
        this.#image.src = this.url;
        this.#image.onload = () => {
            this.#bufferize();
            this.#bind(this.#image);
        }
    }

    #bufferize(): void {
        if (!this.state.program) { return null; }
        let textureCoordinates = this.state.gl.getAttribLocation(this.state.program, "a_texCoord");
        this.#vertex = this.state.gl.createVertexArray();
        this.state.gl.bindVertexArray(this.#vertex);
        this.#buffer = this.state.gl.createBuffer();
        this.state.gl.bindBuffer(this.state.gl.ARRAY_BUFFER, this.#buffer);
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

    apply(x: number, y: number): void {
        this.state.gl.viewport(
            0,
            0,
            this.state.gl.canvas.width,
            this.state.gl.canvas.height
        ); // covert from clip space to canvas pixels
        this.state.gl.useProgram(this.state.program);
        this.state.gl.bindVertexArray(this.#vertex);
        let resolution = this.state.gl.getUniformLocation(this.state.program, "u_resolution");
        let image_ = this.state.gl.getUniformLocation(this.state.program, "u_image");
        this.state.gl.uniform2f(
            resolution,
            this.state.gl.canvas.width,
            this.state.gl.canvas.height
        );
        this.state.gl.uniform1i(image_, 0);
        this.state.gl.bindBuffer(this.state.gl.ARRAY_BUFFER, this.#buffer);
        let xOpposite = x + this.state.gl.canvas.width;
        let yOpposite = y + this.state.gl.canvas.height;
        this.state.gl.bufferData(
            this.state.gl.ARRAY_BUFFER,
            new Float32Array([
                x, y,
                xOpposite, y,
                x, yOpposite,
                x, yOpposite,
                xOpposite, y,
                xOpposite, yOpposite,
            ]),
            this.state.gl.STATIC_DRAW
        )
    }
}

export { Texture }