import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { Textfit } from "react-textfit";
import { Link } from "react-router-dom";
import { tokenSpotify } from "./App";

export default function PopularArtists() {
  const [artistState, getArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useRecoilValue(tokenSpotify);
  const scrollContainer = useRef();

  const horizontalScroll = () => {
    scrollContainer.current.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      scrollContainer.current.scrollLeft += evt.deltaY;
    });
  };

  const tokenHeader = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  //Get most popular artists from Last.FM, save to state
  useEffect(() => {
    axios
      .get(
        "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=106089bc8ef07ebb20e19f75f7557606&limit=10&format=json"
      )
      .then((res) => {
        populateArtists(res.data.artists.artist);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const populateArtists = (artistArray) => {
    artistArray.forEach((artist) => {
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
    setIsLoading(false);
  };

  if (isLoading || token === undefined) {
    return <div>"Loading...</div>;
  }

  return (
    <>
      <p className="text-5xl font-extrabold text-black text-opacity-70 mx-3 ">
        Top Artists
      </p>
      <div
        className="flex flex-nowrap flex-row overflow-x-scroll bg-gray-800 m-3 py-3 px-6 no-scrollbar bg-opacity-60 rounded-3xl"
        ref={scrollContainer}
        onWheel={horizontalScroll}
      >
        {artistState.map((artist) => (
          <Link to={`/artist/${artist.id}`} key={artist.id}>
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
                  alt={artist.name}
                ></img>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
