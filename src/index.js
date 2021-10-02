import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import Homepage from "./Homepage";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import ArtistPage from "./ArtistPage";
import Searchbar from "./Searchbar";

ReactDOM.render(
  <RecoilRoot>
    <React.StrictMode>
      <Searchbar />
      <Router>
        <Route exact path="/" component={Homepage} />
        <Route path="/artist/:artistID" component={ArtistPage} />
      </Router>
    </React.StrictMode>
  </RecoilRoot>,
  document.getElementById("root")
);
