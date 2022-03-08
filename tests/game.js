import { Blaze } from "../dist/blaze.js";

const blaze = new Blaze(
    document.getElementById("app")
);

let program = blaze.shader.load({
    vertex: "../res/shaders/vertex.glsl",
    fragment: "../res/shaders/fragment.glsl"
})

blaze.draw(program, [
    10, 20,
    80, 20,
    10, 30,
    10, 30,
    80, 20,
    80, 30,
]);