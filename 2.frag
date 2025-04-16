// vim:ft=glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    // clip space coordinates
    vec2 uv = (gl_FragCoord.xy * 2.0 / u_resolution.xy - 1.0);

    // rotate uv by 180 degrees
    vec2 uv1 = uv * mat2(-1, 0, 0, -1);

    // not really sure what i'm doing here but it looks cool
    float t = u_time / 4.0;
    uv1.x *= sin(t - uv1.y);
    uv1.y *= cos(t - uv1.x);

    // create the 4 quadrants
    vec3 col = vec3(step(.0, uv1), 0.5);

    // subtracting from the color vector to create black circles
    // fract takes the fractional part of the argument
    // this creates an oscillating value as the distance increases
    // multiplying the input to fract increases the amount of repetitions
    col -= step(0.2, vec3(fract(length(uv1) * 10.0)));

    gl_FragColor = vec4(col, 1.0);
}
