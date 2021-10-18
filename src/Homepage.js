import { useEffect } from "react";
import PopularArtists from "./PopularArtists";
import TopSingles from "./TopSingles";
import { tokenSpotify } from "./App";
import { useRecoilValue } from "recoil";

export default function Homepage() {
  const token = useRecoilValue(tokenSpotify);

  return (
    <>
      <PopularArtists />
      <TopSingles />
    </>
  );
}
