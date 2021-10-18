import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router";
import { Link } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { tokenSpotify } from "./App";

export default function SearchResults() {
  const { search } = useParams();
  const [artists, getArtists] = useState({});
  const [tracks, getTracks] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const token = useRecoilValue(tokenSpotify);

  const tokenHeader = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    if (token === undefined) {
      return null;
    } else {
      axios
        .get(
          `https://api.spotify.com/v1/search?query=${encodeURI(
            search
          )}&type=track%2Cartist&market=US&offset=0&limit=10`,
          tokenHeader
        )
        .then((res) => {
          console.log(res);
          var artistsObject = res.data.artists.items;
          var trackObject = res.data.tracks.items;
          getArtists(artistsObject);
          getTracks(trackObject);
          setIsLoading(false);
        });
    }
  }, [search]);

  useEffect(() => {
    console.log(artists);
  }, [artists]);

  if (isLoading === true || artists === undefined || tracks === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen">
      <div className="flex flex-row flex-nowrap bg-gray-800 m-3 my-6  px-6 h-5/6 no-scrollbar bg-opacity-60 rounded-3xl">
        {artists.map((artist) => (
          <Link to={`/artist/${artist.id}`}>
            <div>
              <img src={artist.images[0]?.url} className="rounded-full" />
              <div>{artist.name} </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
