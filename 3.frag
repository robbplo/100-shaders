// vim:ft=glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// random number generation based on input uv
// dot product with uv and a random vector creates
// sin of the result and multiply by a random float
// fract to return an output between 0.0 and 1.0
float random(vec2 uv) {
    return fract(
        sin(dot(uv, vec2(23.49787, 9.3817)))
            * 86728.3019
    );
}

void main() {
    // clip space coordinates
    vec2 uv = (gl_FragCoord.xy * 2.0 / u_resolution.xy - 1.0);

    // translate uv by a miniscule value
    // the pattern on the left pulsates slowly while the right is still
    uv.y += u_time / 1000000.0;

    // 0.0 for left, 1.0 for right
    float mask = step(0.0, uv.x);

    // scale the coordinate system by 10
    // floor the result to create larger pixels
    vec2 uv2 = floor(uv * 10.0);

    // mix performs linear interpolation between two values
    vec3 col = mix(vec3(random(uv)), vec3(random(uv2)), mask);

    gl_FragColor = vec4(col, 1.0);
}
