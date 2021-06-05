import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as ReactDOM from "react-dom";
import classNames from "classnames";
import { PipettePicker } from "./picker.jsx";

const App = () => {
  let [mode, setMode] = useState("weft");

  useEffect(() => {
    window.mode = mode;
  }, mode);
  return (
    <div>
      <button id="undo">Undo</button>
      <button
        id="weft"
        className={classNames({ active: mode === "weft" })}
        onClick={() => setMode("weft")}
      >
        weft
      </button>
      <button
        id="warp"
        className={classNames({ active: mode === "warp" })}
        onClick={() => setMode("warp")}
      >
        warp
      </button>
      <PipettePicker />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
