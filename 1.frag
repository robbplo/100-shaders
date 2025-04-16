// vim:ft=glsl
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

void main() {
    // clip space coordinates
    //
    // range is (-1.0, 1.0)
    // double the fragment coordinate creates a range from 0.0 to 2.0
    // subtracting 1.0 creates the clip space range
    vec2 uv = (gl_FragCoord.xy * 2.0 / u_resolution.xy - 1.0);

    // step defines a threshold as the first argument
    // the second argument is the value
    // if the value exceeds the threshold, 1.0 is returned
    // otherwise, 0.0 is returned
    vec3 col = vec3(step(.0, uv), 0.5);

    // creates a circle by multiplying the color based on the length of uv
    // the length of uv is equal to the distance from the origin
    // when the length is less than 0.1, the color vector is multiplied by 0
    col *= step(0.1, length(uv));

    gl_FragColor = vec4(col, 1.0);
}
