let canvas = document.getElementById("paint");
let target = document.getElementById("target");
let canvasRatio = 0.5;
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;

let ctx = canvas.getContext("2d", { alpha: false });
// ctx.translate(canvas.width, 0);
// ctx.scale(-1, 1);
ctx.fillStyle = `#f9f`;
ctx.fillRect(0, 0, window.innerWidth, 5);
ctx.fillStyle = `#Ccf`;

ctx.fillRect(0, 0, 5, window.innerHeight);
const r = 5;
function drawLine(pointer) {
  //   ctx.fillStyle = `#C5C`;
  //   ctx.strokeStyle = `#C5C`;
  ctx.strokeStyle = window.color;
  //    `rgb(${Math.random() * 250},${Math.random() * 250},${Math.random() * 250})`;
  ctx.fillStyle = ctx.strokeStyle;
  ctx.lineWidth = r;

  let scaleX = 1;
  let scaleY = 1;
  if (window.mode === "weft") {
    scaleX = 0;
  } else if (window.mode === "warp") {
    scaleY = 0;
  }
  ctx.beginPath();
  ctx.moveTo(
    pointer.prevX * canvasRatio * scaleX,
    pointer.prevY * canvasRatio * scaleY
  );
  ctx.lineTo(
    pointer.x * canvasRatio * scaleX,
    pointer.y * canvasRatio * scaleY
  );
  ctx.stroke();
  ctx.beginPath();

  ctx.arc(
    pointer.x * canvasRatio * scaleX,
    pointer.y * canvasRatio * scaleY,
    r / 2,
    0,
    2 * Math.PI
  );
  ctx.fill();
}
function getContext() {
  return ctx;
}
module.exports = { getContext, drawLine };
