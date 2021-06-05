import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import classNames from "classnames";
import { PipettePicker } from "./picker.jsx";

const App = () => {
  let [mode, setMode] = useState("color");

  useEffect(() => {
    window.mode = mode;
  }, mode);
  return (
    <div className="buttonGroup">
      <button id="undo">Undo</button>
      <PipettePicker mode={mode} setMode={setMode} />
      <button
        id="color"
        className={classNames({ active: mode === "color" })}
        onClick={() => setMode("color")}
      >
        color
      </button>
      <br></br>
      <button
        id="plain"
        className={classNames({ active: mode === "plain" })}
        onClick={() => setMode("plain")}
      >
        plain
      </button>
      <button
        id="twill"
        className={classNames({ active: mode === "twill" })}
        onClick={() => setMode("twill")}
      >
        twill
      </button>
      <button
        id="reverse plain"
        className={classNames({ active: mode === "reverse plain" })}
        onClick={() => setMode("reverse plain")}
      >
        reverse plain
      </button>
      <button
        id="reverse twill"
        className={classNames({ active: mode === "reverse twill" })}
        onClick={() => setMode("reverse twill")}
      >
        reverse twill
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
