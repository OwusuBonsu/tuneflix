import App from "./App";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import Me from "./Me";

ReactDOM.render(
  <RecoilRoot>
    <div className="h-full">
      <App />
      <Me />
    </div>
  </RecoilRoot>,

  document.getElementById("root")
);
