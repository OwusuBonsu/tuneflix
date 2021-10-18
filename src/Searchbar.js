import { Link, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Searchbar() {
  const [searchTerm, setSearchTerm] = useState("");

  let history = useHistory();

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      update();
    }
  };

  const handleChange = (val) => {
    setSearchTerm(val);
    console.log(val);
  };

  const update = () => {
    history.push(`/search/${searchTerm}`);
  };

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);
  return (
    <>
      <div className="flex w-screen">
        <div className="w-3/4  ml-3 text-4xl font-extrabold text-black text-opacity-70">
          <Link to="/">
            <span className="inline-block align-text-bottom">Playbaxx</span>
          </Link>
        </div>
        <div className="flex justify-end w-1/4">
          <input
            className="w-72  h-10 mx-3 my-2 opacity-60 rounded-3xl bg-gray-800 text-white text-center"
            id="search"
            placeholder="Search..."
            type="text"
            value={searchTerm}
            onChange={(e) => handleChange(e.target.value)}
            onKeyUp={handleKeyPress}
          />
        </div>
      </div>
    </>
  );
}
