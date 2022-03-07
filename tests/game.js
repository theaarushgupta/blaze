import { Blaze } from "../dist/blaze.js";

const blaze = new Blaze(
    document.getElementById("app")
);

let vertexSource = blaze.shader.load("../res/shaders/vertex.glsl");
let fragmentSource = blaze.shader.load("../res/shaders/fragment.glsl");
let vertex = blaze.shader.compile(blaze.state.gl.VERTEX_SHADER, vertexSource);
let fragment = blaze.shader.compile(blaze.state.gl.FRAGMENT_SHADER, fragmentSource);
let program = blaze.shader.link(vertex, fragment);

blaze.draw(program, [
    0, 0,
    0, 0.5,
    0.7, 0,
]);