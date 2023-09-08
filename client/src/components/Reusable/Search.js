import "../../index.css";
import React, { useState, useEffect } from "react";

export default function Search(props) {
  let defaultVal = "";
  if (props.defaultVal) defaultVal = props.defaultVal;
  const [searchQuery, setSearchQuery] = useState(defaultVal);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && searchQuery.trim() !== "") {
        e.preventDefault();
        window.location.href = `/search?query=${encodeURIComponent(
          searchQuery,
        )}`;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchQuery]);

  return (
    <div className="flex justify-end md:justify-center w-11/12 pr-3">
      <div className="bg-white w-7/12 md:w-10/12 flex flex-row gap-x-0.5 items-center justify-center rounded-3xl border-gray-300 hover:shadow-md noSelect">
          <i
            className="fa fas fa-search text-gray-400 text-lg cursor-pointer"
            aria-hidden="true"
          ></i>
          <input
            type="text"
            className="w-9/12 md:w-11/12 h-10 px-2 focus:outline-none"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
      </div>
    </div>
  );
}
