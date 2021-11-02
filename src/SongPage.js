import axios from "axios";
import { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import qs from "qs";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { tokenSpotify } from "./App";

export default function SongPage() {
  let { songID } = useParams();
  const token = useRecoilValue(tokenSpotify);
  const [songObject, getSongObject] = useState();
  const [isLoading, setLoading] = useState(true);
  const [vidID, getVidID] = useState("");
  const tokenHeader = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  useEffect(() => {
    axios(`https://api.spotify.com/v1/tracks/${songID}`, tokenHeader)
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        getSongObject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  useEffect(() => {
    if (songObject === undefined) {
      return null;
    } else {
      axios(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURI(
          songObject.artists[0].name + " " + songObject.name
        )}s&type=video&key=AIzaSyDGdtNAVwQuEkVA1GHslN5QB4N5wn-OdLA`
      )
        .then((res) => {
          getVidID(res.data.items[0].id.videoId);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [songObject]);

  if (isLoading || token === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full">
      <div className="md:flex md:flex-row flex:col flex-nowrap bg-gray-800 m-3 my-6 p-6 h-5/6 no-scrollbar bg-opacity-60 rounded-3xl">
        <div className="flex order-1 justify-center md:h-auto h-36 flex-row md:flex-col md:w-4/12 max-w-full text-center m-10 ">
          <img
            src={songObject.album.images[0].url}
            className="rounded-3xl self-start block ml-auto mr-auto min-w-1/2 h-full md:w-full md:h-auto"
            alt={songObject.name}
          />
          <div className="flex justify-center align-middle flex-col">
            <p className="text-2xl font-bold text-white text-opacity-90 max-w-full">
              {songObject.name}
            </p>
            <p className="text-xl font-extrabold text-white text-opacity-90 max-w-full capitalize align">
              {songObject.artists[0].name}
            </p>
          </div>
        </div>

        <div className="flex-shrink w-full md:w-8/12 order-2 overflow-y-hidden text-white py-3">
          <p className="text-5xl font-bold text-white text-opacity-90 max-w-full">
            Video
          </p>
          {
            <div className="rounded-3xl mt-5 h-full">
              <ReactPlayer
                width="75%"
                height="75%"
                url={`https://youtu.be/${vidID}`}
              />
            </div>
          }
          <p className="text-5xl font-bold text-white text-opacity-90 max-w-full"></p>
          <div className="space-x-5 h-auto mt-2"></div>
        </div>
      </div>
    </div>
  );
}
