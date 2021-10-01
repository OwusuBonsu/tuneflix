import { getChart, listCharts } from "billboard-top-100";
import { atom, useRecoilValue, useRecoilState } from "recoil";
import axios from "axios";
import { useEffect, useState } from "react";
import { Textfit } from "react-textfit";

export default function TopSingles() {
  const tokenState = atom({
    key: "tokenState",
  });
  const [spotifyToken, getSpotifyToken] = useRecoilState(tokenState);
  const [songs, getSongs] = useState([]);

  const tokenHeader = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + spotifyToken,
    },
  };
  useEffect(() => {
    if (spotifyToken === undefined) {
      return null;
    } else {
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
              songName: song.track.name,
              songCover: song.track.album.images[0].url,
              songID: song.track.id,
            };
            tempSongArray.push(songObject);
          });
          getSongs(tempSongArray);
        });
    }
  }, [spotifyToken]);

  useEffect(() => {
    console.log(songs);
  }, [songs]);

  console.log("Token state: " + spotifyToken);
  return (
    <>
      <p className="text-5xl font-extrabold text-black text-opacity-70 mx-3">
        Billboard Top 10
      </p>
      <div className="flex flex-nowrap flex-row overflow-x-scroll bg-gray-800 m-3 py-3 px-6 no-scrollbar bg-opacity-60 rounded-3xl">
        {songs.map((song) => (
          <div className="grid grid-cols-1 h-72 w-60 flex-shrink-0 mx-3">
            <div className="text-center mx-auto min-h-full h-full max-h-4 w-60 min-w-full max-w-full inline-block text-white">
              <Textfit
                mode="single"
                forceSingleModeWidth={false}
                className="max-h-full"
              >
                {song.songName}
              </Textfit>
            </div>
            <div className="h-full  min-w-full overflow-hidden">
              <img
                className="rounded-3xl mx-auto max-h-60 h-full min-w-full"
                src={song.songCover}
              ></img>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
