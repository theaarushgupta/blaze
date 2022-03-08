#version 300 es

precision highp float; // high precision

uniform sampler2D u_image;

in vec2 v_textureCoordinates;

out vec4 o_color; // declare output

void main() {
    o_color = texture(u_image, v_textureCoordinates); // source color from texture
}