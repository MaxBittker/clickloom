
precision highp float;
varying vec2 uv;
uniform sampler2D tex;
uniform float wRcp, hRcp;
uniform vec2 resolution;
float t;

// clang-format off

#pragma glslify: dither = require(glsl-dither/2x2)
// clang-format on


// out vec4 fragColor, in vec2 fragCoord

void main() {
  vec2 pixel = 1.0 /resolution;
  vec4 color = texture2D(tex, vec2(uv.x,1.0-uv.y));
  vec2 coord = (uv)* resolution/4.;
  if(  mod(floor(coord.x),4.0) <2.0){
   color.r = 1.0;
  }
  // gl_FragColor = vec4(1.0, 1., 1.0, 1.0);
  // gl_FragColor = dither(gl_FragCoord.xy, color);
  gl_FragColor = color;
  // gl_FragColor = color.rbga;
}
