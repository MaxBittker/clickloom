let paintElement = document.getElementById("paint");
let targetElement = document.getElementById("target");

const { setupOverlay } = require("regl-shader-error-overlay");
setupOverlay();

let pixelRatio = Math.min(window.devicePixelRatio, 2.0);
const regl = require("regl")({
  canvas: targetElement,
  pixelRatio,
  // extensions: ["OES_texture_float"],
  optionalExtensions: [
    // "oes_texture_float_linear",
    "WEBGL_debug_renderer_info",
    "WEBGL_debug_shaders",
  ],
});

let postShaders = require("./src/post.shader.js");
let setupHandlers = require("./src/touch.js");
let { getContext, drawDot } = require("./src/paint.js");

var doPop = false;
drawDot();
// var undoStack = [];

function pushState() {
  var gl = regl._gl;
  undoStack.push(stored_pixels);
  if (undoStack.length > 30) {
    undoStack.shift();
  }
}
function popState() {
  var gl = regl._gl;
  undoStack.pop();
  var stored_pixels = undoStack[undoStack.length - 1];
  doPop = true;
}
let { getPointers, processQueue } = setupHandlers(
  regl._gl.canvas,
  pixelRatio,
  pushState,
  popState
);

pointers = getPointers();
postShaders.on("change", () => {
  console.log("update");
  vert = shaders.vertex;
  frag = shaders.fragment;
  let overlay = document.getElementById("regl-overlay-error");
  overlay && overlay.parentNode.removeChild(overlay);
});

let paintTexture = regl.texture(paintElement);

const drawFboBlurred = regl({
  frag: () => postShaders.fragment,
  vert: () => postShaders.vertex,

  attributes: {
    position: [-4, -4, 4, -4, 0, 4],
  },
  uniforms: {
    t: ({ time }) => time,
    tex: paintTexture,
    resolution: ({ viewportWidth, viewportHeight }) => [
      viewportWidth,
      viewportHeight,
    ],
    wRcp: ({ viewportWidth }) => 1.0 / viewportWidth,
    hRcp: ({ viewportHeight }) => 1.0 / viewportHeight,
    pixelRatio,
  },
  depth: { enable: false },
  count: 3,
});

regl.frame(function ({ viewportWidth, viewportHeight, tick }) {
  ctx = getContext();
  // console.log(viewportWidth);
  // return;
  // paintTexture.resize(window.viewportWidth * 4, window.viewportHeight * 4);
  paintTexture.subimage(ctx);

  drawFboBlurred();
});
