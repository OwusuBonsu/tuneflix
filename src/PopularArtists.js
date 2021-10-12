import axios from "axios";
import qs from "qs";
import { useCallback, useState, useEffect } from "react";
import { atom, useRecoilState } from "recoil";
import { Textfit } from "react-textfit";
import { Link } from "react-router-dom";

export default function PopularArtists() {
  const [artistState, getArtists] = useState([]);
  const [popularArtists, getPopularArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const tokenState = atom({
    key: "tokenState",
    default: "",
  });
  const [spotifyToken, getSpotifyToken] = useRecoilState(tokenState);

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
  const tokenHeader = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyToken,
    },
  };

  //Get most popular artists from Last.FM, save to state
  useEffect(() => {
    axios
      .get(
        "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=106089bc8ef07ebb20e19f75f7557606&limit=10&format=json"
      )
      .then((res) => {
        getPopularArtists(res.data.artists.artist);
        getToken();
      });
  }, []);

  //Get Spotify Token. SHOULD RUN FIRST
  const getToken = () => {
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        qs.stringify(body),
        spotifyHeader
      )
      .then((res) => {
        console.log(res);
        getSpotifyToken(res.data.access_token);
      });
  };

  useEffect(() => {
    var tempArray = [];
    popularArtists.map((artist) => {
      axios
        .get(
          `https://api.spotify.com/v1/search?query=${encodeURI(
            artist.name
          )}&type=artist&market=US&offset=0&limit=1`,
          tokenHeader
        )
        .then((res) => {
          var artistsObject = {
            name: artist.name,
            image: res.data.artists.items[0].images[0].url,
            id: res.data.artists.items[0].id,
          };
          getArtists((artistState) => artistState.concat(artistsObject));
        })
        .catch((err) => {
          console.log(artist.name + " " + err);
          return null;
        });
    });
  }, [spotifyToken]);

  useEffect(() => {
    setIsLoading(false);
  }, [artistState]);

  useEffect(() => {
    console.log(artistState);
  }, [artistState]);

  if (isLoading) {
    return <div>"Loading...</div>;
  }

  return (
    <>
      <p className="text-5xl font-extrabold text-black text-opacity-70 mx-3 ">
        Top Artists
      </p>
      <div className="flex flex-nowrap flex-row overflow-x-scroll bg-gray-800 m-3 py-3 px-6 no-scrollbar bg-opacity-60 rounded-3xl ">
        {artistState.map((artist) => (
          <Link to={`/artist/${artist.id}`}>
            <div className="grid grid-cols-1 h-72 w-60 mx-3 flex-shrink-0">
              <div className="flex justify-center mx-auto min-h-full w-60 min-w-full">
                <div className="flex min-h-full content-center text-center text-white">
                  <Textfit mode="single">{artist.name}</Textfit>
                </div>
              </div>
              <div className=" h-full  min-w-full overflow-hidden">
                <img
                  className="rounded-full mx-auto max-h-60 h-full min-w-full"
                  src={artist.image}
                ></img>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
