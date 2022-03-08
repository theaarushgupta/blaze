#version 300 es

in vec2 a_position; // input from buffer

uniform vec2 u_resolution;

void main() { 
    vec2 zeroToOne = a_position / u_resolution; // convert position from pixels to 0.0 to 1.0
    vec2 zeroToTwo = zeroToOne * 2.0; // 0->1 to 0->2
    vec2 clipSpace = zeroToTwo - 1.0; // 0->2 to -1->+1 (clip space)
    gl_Position = vec4(clipSpace, 0, 1);
}