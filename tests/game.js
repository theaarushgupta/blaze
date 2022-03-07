import { Blaze } from "../dist/blaze.js";

const blaze = new Blaze(
    document.getElementById("app")
);

let program = blaze.shader.load(
    "../res/shaders/vertex.glsl",
    "../res/shaders/fragment.glsl"
)

blaze.draw(program, [
    0, 0,
    0, 0.5,
    0.7, 0,
]);