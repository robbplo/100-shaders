// vim:ft=glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float random(vec2 uv) {
    return fract(
        sin(dot(uv, vec2(23.49787, 9.3817)))
            * 86728.3019
    );
}

// overload for float input
float random(float f) {
    return fract(
        sin(dot(vec2(f), vec2(23.49787, 9.3817)))
            * 86728.3019
    );
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv0 = uv;

    // horizontal split
    float mask = step(0.5, uv.y);

    // these variables are inverted, increasing them makes speed and width decrease
    float speed = 10.0;
    float width = 100.0;
    // floor of u_time/4.0 makes a stepper function which increases every 4 seconds
    float rand = random(floor(u_time / 4.0));

    width -= rand * 50.0;
    speed += rand * 50.0;

    uv.x += u_time / speed;
    uv.y = floor(uv.y * 2.);
    uv.x = floor(uv.x * width);

    // two uvs because i could not figure out how to make them go in different directions
    vec2 uv2 = uv0;
    uv2.x -= u_time / speed;
    uv2.y = floor(uv2.y * 2.);
    uv2.x = floor(uv2.x * width);

    vec3 col = mix(
            vec3(step(0.2, length(random(uv)))),
            vec3(step(0.2, length(random(uv2)))),
            mask
        );

    gl_FragColor = vec4(col, 1.0);
}
