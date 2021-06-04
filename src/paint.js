let canvas = document.getElementById("paint");
let target = document.getElementById("target");
canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 2;
target.width = window.innerWidth * 2;
target.height = window.innerHeight * 2;
ctx = canvas.getContext("2d", { alpha: false });
// ctx.translate(canvas.width, 0);
// ctx.scale(-1, 1);

function drawDot() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = `#49F`;
  ctx.strokeStyle = `#C5C`;
  ctx.lineWidth = 15;

  ctx.beginPath();
  ctx.arc(520, 575, canvas.width / 4, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}
function getContext() {
  return ctx;
}
module.exports = { getContext, drawDot };
