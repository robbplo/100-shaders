// vim:ft=glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

// literally just some random
float random(vec2 uv) {
    return fract(
        sin(dot(uv, vec2(23.49787, 9.3817)))
            * 36728.3019
    );
}

void main() {
    // clip space coordinates
    vec2 uv = (gl_FragCoord.xy * 2.0 / u_resolution.xy - 1.0);

    vec3 col = vec3(random(uv));

    gl_FragColor = vec4(col, 1.0);
}
