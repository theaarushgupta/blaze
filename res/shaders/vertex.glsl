#version 300 es

in vec4 a_position; // input from buffer

void main() { 
    gl_Position = a_position;
}