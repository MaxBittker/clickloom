let canvas = document.getElementById("paint");
let target = document.getElementById("target");
let canvasRatio = 0.5;
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;

ctx = canvas.getContext("2d", { alpha: false });
// ctx.translate(canvas.width, 0);
// ctx.scale(-1, 1);

const r = 25;
function drawLine(pointer) {
  ctx.fillStyle = `#C5C`;
  ctx.strokeStyle = `#C5C`;
  ctx.lineWidth = r;

  ctx.beginPath();
  ctx.moveTo(pointer.prevX * canvasRatio, pointer.prevY * canvasRatio);
  ctx.lineTo(pointer.x * canvasRatio, pointer.y * canvasRatio);
  ctx.stroke();
  ctx.beginPath();

  ctx.arc(
    pointer.x * canvasRatio,
    pointer.y * canvasRatio,
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
