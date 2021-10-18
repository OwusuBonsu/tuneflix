import { getChart, listCharts } from "billboard-top-100";
import { atom, useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";
import { Textfit } from "react-textfit";
import { Link } from "react-router-dom";
import { tokenSpotify } from "./App";

export default function TopSingles() {
  const [songs, getSongs] = useState([]);
  const token = useRecoilValue(tokenSpotify);

  const tokenHeader = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    console.log(token);
  }, [token]);

  useEffect(() => {
    var tempSongArray = [];
    axios
      .get(
        `https://api.spotify.com/v1/playlists/6UeSakyzhiEt4NB3UAd6NQ/tracks?limit=10&offset=0`,
        tokenHeader
      )
      .then((res) => {
        const songList = res.data.items;
        songList.map((song) => {
          const songObject = {
            name: song.track.name,
            cover: song.track.album.images[0].url,
            id: song.track.id,
          };
          tempSongArray.push(songObject);
          console.log(tempSongArray);
        });
        getSongs(tempSongArray);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <>
      <p className="text-5xl font-extrabold text-black text-opacity-70 mx-3">
        Billboard Top 10
      </p>
      <div className="flex flex-nowrap flex-row overflow-x-scroll bg-gray-800 m-3 py-3 px-6 no-scrollbar bg-opacity-60 rounded-3xl">
        {songs.map((song) => (
          <Link to={`/song/${song.id}`}>
            <div className="grid grid-cols-1 h-72 w-60 flex-shrink-0 mx-3">
              <div className="text-center mx-auto min-h-full h-full max-h-4 w-60 min-w-full max-w-full inline-block text-white">
                <Textfit
                  mode="single"
                  forceSingleModeWidth={false}
                  className="max-h-full"
                >
                  {song.name}
                </Textfit>
              </div>
              <div className="h-full  min-w-full overflow-hidden">
                <img
                  className="rounded-3xl mx-auto max-h-60 h-full min-w-full"
                  src={song.cover}
                ></img>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
