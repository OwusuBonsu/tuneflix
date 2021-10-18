import axios from "axios";
import { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenSpotify } from "./App";

export default function ArtistPage() {
  let { artistID } = useParams();
  const [artistSpotify, getArtistSpotify] = useState({});
  const [artistLFM, getArtistLFM] = useState({});
  const [artistTopTracks, getTopTracks] = useState([]);
  const [isLoading, setLoading] = useState(true);
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
      axios(`https://api.spotify.com/v1/artists/${artistID}`, tokenHeader).then(
        (res) => {
          console.log(res);
          getArtistSpotify(res.data);
          lastfm(res.data.name);
          albums(artistID);
          topTracks(artistID);
        }
      );
    }
  }, [token]);

  async function lastfm(name) {
    axios(
      `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${name}&api_key=106089bc8ef07ebb20e19f75f7557606&format=json`
    )
      .then((res) => {
        const lastFMInfo = res.data.artist;
        getArtistLFM(lastFMInfo);
        setLoading(false);
      })
      .catch((err) => console.log(err));
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
          id: track.id,
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
    <div className="h-full">
      <div className="md:flex flex-col overflow-hidden md:flex-row flex-nowrap bg-gray-800 m-3 mb-10 p-6 h-auto md:h-5/6 no-scrollbar bg-opacity-60 rounded-3xl ">
        <div className="flex order-1 justify-center md:h-auto h-36 flex-row md:flex-col md:w-4/12 max-w-full text-center m-10 ">
          <img
            src={artistSpotify.images[0]?.url}
            className="rounded-full self-start block ml-auto mr-auto min-w-1/2 h-full md:w-full md:h-auto"
          />
          <div className="flex justify-center align-middle flex-col">
            <p className="text-2xl font-bold text-white text-opacity-90 max-w-full">
              {artistSpotify.name}
            </p>
            <p className="text-xl font-extrabold text-white text-opacity-90 max-w-full capitalize align">
              {artistLFM.tags.tag[0]?.name}
            </p>
          </div>
        </div>

        <div className="flex-shrink overflow-hidden w-full md:w-8/12  order-2 md:overflow-y-auto md:overflow-x-hidden text-white py-3">
          <p className="text-5xl font-bold text-white text-opacity-90 max-w-full">
            About
          </p>
          {artistLFM.bio?.summary}
          <p className="text-5xl font-bold text-white text-opacity-90 max-w-full">
            Top Tracks
          </p>
          <div className=" space-x-3 md:space-x-5 h-auto mt-2 ">
            {artistTopTracks.map((track) => (
              <Link to={`/song/${track.id}`}>
                <div className="flex md:inline-block md:align-top md:w-1/6 flex-row md:flex-col ">
                  <div className="md:order-1 w-1/4 md:w-full">
                    <img className="rounded-lg " src={track.img} />
                  </div>
                  <div className=" my-auto w-3/4 h-full md:w-full">
                    <p className=" text-center align-text-bottom">
                      {track.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
