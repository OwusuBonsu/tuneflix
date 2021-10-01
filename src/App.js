import "./App.css";
import { useQuery, QueryClient } from "react-query";
import axios from "axios";
import PopularArtists from "./PopularArtists";

function App() {
  const { isLoading, error, topArtists } = useQuery("fetchArtists", () =>
    axios(
      "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=106089bc8ef07ebb20e19f75f7557606&format=json"
    )
  );
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  console.log(topArtists);

  return <div>{topArtists.data.artists.artist.map}</div>;
}

export default App;
