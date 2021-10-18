import App from "./App";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <RecoilRoot>
    <div className="h-full">
      <App />
    </div>
  </RecoilRoot>,

  document.getElementById("root")
);
