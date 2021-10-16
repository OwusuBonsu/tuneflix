import { useHistory, withRouter, Redirect } from "react-router-dom";
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
      <div className="flex justify-end">
        <input
          className="w-72 h-10 mx-3 my-2 opacity-60 rounded-3xl bg-gray-800 text-white text-center"
          id="search"
          placeholder="Search..."
          type="text"
          value={searchTerm}
          onChange={(e) => handleChange(e.target.value)}
          onKeyUp={handleKeyPress}
        />
      </div>
    </>
  );
}
