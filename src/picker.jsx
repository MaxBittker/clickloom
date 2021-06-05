import * as React from "react";
import { useEffect, useCallback, useRef, useState } from "react";
import * as ReactDOM from "react-dom";

let defaultPallette = document.getElementById("defaultPallette");

let ctx;

defaultPallette.addEventListener("load", () => {
  if (ctx);
  ctx.drawImage(defaultPallette, 0, 0, width, height);
});
function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  return ((r << 16) | (g << 8) | b).toString(16);
}

function convertEventCoordinates(canvas, event) {
  let boundingRect = canvas.getBoundingClientRect();

  boundingRect = {
    left: boundingRect.left,
    top: boundingRect.top,
    width: boundingRect.width,
    height: boundingRect.height,
  };
  const scaleX = canvas.width / boundingRect.width;
  const scaleY = canvas.height / boundingRect.height;

  const canvasLeft = (event.clientX - boundingRect.left) * scaleX;
  const canvasTop = (event.clientY - boundingRect.top) * scaleY;

  const x = Math.floor(canvasLeft);
  const y = Math.floor(canvasTop);
  return [x, y];
}

function draw(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "blue";
  ctx.shadowColor = "black";
  ctx.lineWidth = 5;
  ctx.shadowBlur = 4;

  ctx.beginPath();

  ctx.moveTo(0, 0);
  ctx.lineTo(width, height);
  ctx.stroke();
}
function PipettePicker() {
  const canvasRef = React.useRef();
  const width = 250;
  const height = 250;
  let [color, setColor] = useState("#000");
  let [previewColor, setPreviewColor] = useState(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!ctx) ctx = canvas.getContext("2d");
    ctx.drawImage(defaultPallette, 0, 0, width, height);

    // draw(ctx, width, height);
  }, [canvasRef]);

  useEffect(() => {
    window.color = color;
  }, [color]);

  const [error, setError] = useState();

  const onSelectFile = useCallback(
    (e) => {
      const files = e.target.files;

      if (!files || files?.length === 0) {
        setError("No file selected, try again");
        return;
      }

      const file = files[0];

      if (!file.type.startsWith("image")) {
        setError("Selected file is not an image, try again");
        return;
      }

      if (error) {
        setError(null);
      }

      const image = new Image();

      image.addEventListener("load", () => {
        ctx.drawImage(image, 0, 0, width, height);
        // updateValue(createPreviewDataURL(image));
      });

      image.src = URL.createObjectURL(file);
    },
    [error, setError]
  );

  const fileInputRef = useRef(null);

  return (
    <div>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={onSelectFile}
        ref={fileInputRef}
      />
      <button
        icon="Upload"
        onClick={() => {
          fileInputRef.current?.click();
        }}
      >
        Browse Files...
      </button>

      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={(e) => {
          let [x, y] = convertEventCoordinates(canvasRef.current, e);
          var p = ctx.getImageData(x, y, 1, 1).data;
          var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
          setColor(hex);
        }}
        onMouseMove={(e) => {
          let [x, y] = convertEventCoordinates(canvasRef.current, e);
          var p = ctx.getImageData(x, y, 1, 1).data;
          var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
          setPreviewColor(hex);
        }}
        onMouseLeave={(e) => {
          setPreviewColor(null);
        }}
      ></canvas>
      <div
        className="colorBox"
        style={{ backgroundColor: previewColor || color, borderColor: color }}
      ></div>
    </div>
  );
}

export { PipettePicker };
