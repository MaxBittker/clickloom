
precision highp float;
varying vec2 uv;
uniform sampler2D tex;
uniform float wRcp, hRcp;
uniform vec2 resolution;
uniform float gridSize;
uniform float t;

// clang-format off
// #pragma glslify: dither = require(glsl-dither)
// #pragma glslify: dither = require(glsl-dither/8x8)
// #pragma glslify: dither = require(glsl-dither/4x4)
// #pragma glslify: dither = require(glsl-dither/2x2)
// clang-format on

void main()
{
    float halfG = gridSize / 2.0;
    float fillRate = 0.7;
    float weftRatio = 0.8;
    vec2 pixel = 1.0 / resolution;
    vec3 color = vec3(0.9);
    vec2 coord = (uv)*resolution / gridSize;
    vec2 index = vec2(floor(coord.x), floor(coord.y));
    vec2 threadIndex = index * gridSize / resolution;

    vec2 local = (coord - index) * gridSize - vec2(halfG);
    vec3 weaveType = texture2D(tex, vec2(threadIndex.x, 1.0 - threadIndex.y)).rgb;
    vec3 warpColor = texture2D(tex, vec2(0, 1.0 - threadIndex.y)).rgb;
    vec3 weftColor = texture2D(tex, vec2(threadIndex.x, 0)).rgb;
    vec3 overColor = warpColor;
    vec3 underColor = weftColor;


    float weaveRun = floor((weaveType.r * 16.) + 0.1);
    // weaveRun =2.0;
    float weaveEdge= floor((weaveType.g * 16.) + 0.1);
    // weaveEdge =1.0;

    float flip = 1.0;
    if(weaveType.b*255. > 2.){
      flip = -1.0;
    }
    if (mod(index.x + index.y, weaveRun) < weaveEdge) {
        overColor = weftColor;
        underColor = warpColor;
    }
   
    else {
        //  color.g = 0.2;
        local.xy = local.yx;
    }
     if(flip>0.){
        local.xy = local.yx;
        vec3 temp = overColor;
        overColor = underColor;
        underColor = temp;

    }

    gl_FragColor.a = 1.0;

    if (abs(local.y) < halfG * fillRate) {

        color = underColor;
    }
    else if (abs(local.x) < halfG * fillRate) {
        float shadow = 1.0 - abs(halfG - abs(local.y)) / halfG;
        color = overColor * shadow;
    }
    else {
        // gl_FragColor.a = 0.0;
    }
    // if(length(local)<halfG*0.8){
    //   color*=2.;
    // }

    gl_FragColor.rgb = color;
    // gl_FragColor.rgb-= data;

    // gl_FragColor.a=1.0;
    // gl_FragColor = dither(uv, vec4(color,1.0));
}
