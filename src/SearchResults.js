import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenSpotify, tokenHeaderr } from "./App";

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
          console.log(res.data.tracks.items);
          getArtists(artistsObject);
          getTracks(trackObject);
          setIsLoading(false);
        });
    }
  }, [search]);

  if (isLoading === true || artists === undefined || tracks === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen">
      <div className=" bg-gray-800 m-3 my-6  px-6 h-5/6 overflow-scroll no-scrollbar bg-opacity-60 rounded-3xl">
        <p className="text-5xl font-extrabold text-white mx-3 ">Artists</p>
        <div className="flex flex-row flex-shrink flex-wrap">
          {artists.map((artist) => (
            <Link to={`/artist/${artist.id}`} key={artist.id}>
              <div className="flex flex-col w-full m-4 justify-center">
                <div className="flex justify-center">
                  <img
                    src={artist.images[0]?.url}
                    className="rounded-full max-h-20"
                    alt={artist.name}
                  />
                </div>
                <div className="flex justify-center text-white">
                  {artist.name}{" "}
                </div>
                <br />
              </div>
            </Link>
          ))}
        </div>

        <p className="text-5xl font-extrabold text-white mx-3 ">Tracks</p>
        <div className="flex flex-row flex-shrink flex-wrap">
          {tracks.map((track) => (
            <Link to={`/song/${track.id}`} key={track.id}>
              <div className="flex flex-col w-full m-4 justify-center">
                <div className="flex justify-center">
                  <img
                    src={track.album.images[0]?.url}
                    className="rounded-md max-h-20"
                    alt={track.name}
                  />
                </div>
                <div className="flex justify-center text-white">
                  {track.name}{" "}
                </div>
                <br />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
