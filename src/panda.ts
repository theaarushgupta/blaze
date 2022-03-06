class Panda {
    GL: WebGL2RenderingContext | null;

    constructor(app: HTMLCanvasElement) {
        this.GL = app.getContext("webgl2");
        this.setup();
    }

    setup() {
        if ( this.GL == null ) { return };
        this.GL.clearColor(0.0, 0.8, 0.0, 1.0); // green
        this.GL.clear(this.GL.COLOR_BUFFER_BIT);
    }
};

export { Panda }