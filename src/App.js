import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  Link,
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from "react-router-dom";
import Homepage from "./Homepage";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import ArtistPage from "./ArtistPage";
import SongPage from "./SongPage";
import Searchbar from "./Searchbar";
import SearchResults from "./SearchResults";
import axios from "axios";
import qs from "qs";

function App() {
  const spotifyHeader = {
    headers: {
      Accept: "application/json",
    },
    auth: {
      username: "ac6d1c45676c42b4920d3b8499e03271",
      password: "aeea7ec5b4324825b9f007cc73c4f1fc",
    },
  };
  const body = {
    grant_type: "client_credentials",
  };

  useEffect(() => {
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(body),
        spotifyHeader
      )
      .then((res) => {
        console.log(res);
        const token = res.data.access_token;

        localStorage.setItem("spotToken", token);
      });
  }, []);

  return (
    <React.StrictMode>
      <Router>
        <Searchbar />
        <Route exact path="/" component={Homepage} />
        <Route path="/artist/:artistID" component={ArtistPage} />
        <Route path="/song/:songID" component={SongPage} />
        <Route path="/search/:search" component={SearchResults} />
      </Router>
    </React.StrictMode>
  );
}

export default App;
