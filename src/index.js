import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Homepage from "./Homepage";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import TopSingles from "./TopSingles";
import Searchbar from "./Searchbar";

ReactDOM.render(
  <RecoilRoot>
    <React.StrictMode>
      <Searchbar />
      <Homepage />
    </React.StrictMode>
  </RecoilRoot>,
  document.getElementById("root")
);
