import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useRecoilState, atom } from "recoil";
import qs from "qs";
import {
  Link,
  BrowserRouter as Router,
  Route,
  useParams,
} from "react-router-dom";
import { Textfit } from "react-textfit";

export default function ArtistPage() {
  let { artistID } = useParams();
  const tokenState = atom({
    key: "tokenState",
  });
  const [spotifyToken, getSpotifyToken] = useRecoilState(tokenState);
  const [artistSpotify, getArtistSpotify] = useState({});
  const [artistLFM, getArtistLFM] = useState({});
  const [artistTopTracks, getTopTracks] = useState([]);
  const [isLoading, setLoading] = useState(true);

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

  if (!spotifyToken) {
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
  }

  useEffect(() => {
    axios(`https://api.spotify.com/v1/artists/${artistID}`, tokenHeader).then(
      (res) => {
        console.log(res);
        getArtistSpotify(res.data);
        lastfm(res.data.name);
        albums(artistID);
        topTracks(artistID);
      }
    );
  }, []);

  async function lastfm(name) {
    axios(
      `http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=106089bc8ef07ebb20e19f75f7557606&format=json`
    ).then((res) => {
      const lastFMInfo = res.data.artist;
      getArtistLFM(lastFMInfo);
      setLoading(false);
    });
  }

  async function albums(artistID) {
    axios(
      `https://api.spotify.com/v1/artists/${artistID}/albums?market=US&include_groups=album`,
      tokenHeader
    ).then((res) => console.log(res));
  }

  async function topTracks(artistID) {
    axios(
      `https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=US`,
      tokenHeader
    ).then((res) => {
      console.log(res);
      const allTopTracks = res.data.tracks.map((track) => {
        return {
          artist: track.artists[0].name,
          title: track.name,
          img: track.album.images[0].url,
        };
      });
      getTopTracks(allTopTracks.slice(0, 5));
    });
  }

  useEffect(() => {
    console.log(artistTopTracks);
  }, [artistTopTracks]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen">
      <div className="flex flex-row flex-nowrap bg-gray-800 m-3 my-6  px-6 h-5/6 no-scrollbar bg-opacity-60 rounded-3xl">
        <div className="order-1 justify-center flex-col w-4/12 max-w-full text-center m-10">
          <img
            src={artistSpotify.images[0].url}
            className="rounded-full block ml-auto mr-auto w-2/3"
          />
          <p className="text-5xl font-bold text-white text-opacity-90 max-w-full">
            {artistSpotify.name}
          </p>
          <p className="text-xl font-extrabold text-white text-opacity-90 max-w-full capitalize">
            {artistLFM.tags.tag[0].name}
          </p>
        </div>

        <div className="flex-shrink w-8/12 order-2 overflow-y-auto text-white py-3">
          <p className="text-5xl font-bold text-white text-opacity-90 max-w-full">
            About
          </p>
          {artistLFM.bio.summary}
          <p className="text-5xl font-bold text-white text-opacity-90 max-w-full">
            Top Tracks
          </p>
          <div className="space-x-5 h-auto mt-2">
            {artistTopTracks.map((track) => (
              <>
                <div className="inline-block align-top w-1/6 ">
                  <img className="rounded-lg" src={track.img} />
                  <p className="text-center align-text-bottom">{track.title}</p>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
