
precision highp float;
varying vec2 uv;
uniform sampler2D tex;
uniform float wRcp, hRcp;
uniform vec2 resolution;
float t;

// clang-format off
#pragma glslify: dither = require(glsl-dither/2x2)
// clang-format on


void main() {
  float gridSize = 12.0;
  float halfG = gridSize/2.0;
  float fillRate = 0.7;
  float weftRatio = 0.8;
  vec2 pixel = 1.0 /resolution;
  vec3 color = vec3(0.9);
  vec3 data = texture2D(tex, vec2(uv.x,1.0-uv.y)).rgb;
  vec2 coord = (uv)* resolution/gridSize;
  vec2 index = vec2(floor(coord.x),floor(coord.y)); 
  vec2 threadIndex = index * gridSize/resolution;

  vec2 local = (coord - index)*gridSize - vec2(halfG);
  vec3 warpColor = texture2D(tex, vec2(0,1.0-threadIndex.y)).rgb;
  vec3 weftColor = texture2D(tex, vec2(threadIndex.x,0)).rgb;
  vec3 overColor = warpColor;
  vec3 underColor = weftColor;
  if(  mod( index.x+index.y,2.0) <1.0){
       overColor = weftColor;
   underColor = warpColor;
  }else{
  //  color.g = 0.2;
   local.xy= local.yx;
  }
   if(abs(local.y)<halfG*fillRate){

    color = underColor ;

  }else   if(abs(local.x)<halfG*fillRate){
    float shadow = 1.0 - abs(halfG-abs(local.y))/halfG;
    color = overColor *shadow;
  }
  // if(length(local)<halfG*0.8){
  //   color*=2.;
  // }

  gl_FragColor.rgb = color;
  // gl_FragColor.rgb-= data;

  gl_FragColor.a=1.0;
  // gl_FragColor = dither(uv, gl_FragColor.rgba);


}
