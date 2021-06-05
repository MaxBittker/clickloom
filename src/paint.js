let canvas = document.getElementById("paint");
let target = document.getElementById("target");
let canvasRatio = 0.5;
canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight / 2;

let ctx = canvas.getContext("2d", { alpha: false });
// ctx.translate(canvas.width, 0);
// ctx.scale(-1, 1);
ctx.fillStyle = `#210`;
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
ctx.fillStyle = `#f9f`;
ctx.fillRect(0, 0, window.innerWidth, 5);
ctx.fillStyle = `#Ccf`;
ctx.fillRect(0, 0, 5, window.innerHeight);

function delta(pointer) {
  return [pointer.x - pointer.prevX, pointer.y - pointer.prevY];
}
function distance(pointer) {
  let [dx, dy] = delta(pointer);
  return Math.sqrt(dx * dx + dy * dy);
}
let r = 30;
function drawLine(pointer) {
  //   ctx.fillStyle = `#C5C`;
  //   ctx.strokeStyle = `#C5C`;
  ctx.strokeStyle = window.color;
  //    `rgb(${Math.random() * 250},${Math.random() * 250},${Math.random() * 250})`;
  ctx.lineWidth = r;

  let scaleX = 1;
  let scaleY = 1;
  //   console.log(Math.floor(distance(pointer)));
  if (distance(pointer) < 5) {
    return;
  }
  let [dx, dy] = delta(pointer);

  if (window.mode === "color") {
    r = 4;
    if (Math.abs(dx) < Math.abs(dy)) {
      scaleX = 0;
    } else {
      scaleY = 0;
    }
  } else if (window.mode === "plain") {
    ctx.strokeStyle = `#210`;
  } else if (window.mode === "twill") {
    ctx.strokeStyle = `#310`;
  } else if (window.mode === "reverse plain") {
    ctx.strokeStyle = `#215`;
  } else if (window.mode === "reverse twill") {
    ctx.strokeStyle = `#315`;
  }
  ctx.fillStyle = ctx.strokeStyle;

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

  pointer.prevX = pointer.x;
  pointer.prevY = pointer.y;
}
function getContext() {
  return ctx;
}
module.exports = { getContext, drawLine };
