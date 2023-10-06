import "../../index.css";
import React, { useState, useEffect, useContext } from "react";
import { HamburgerContext } from "../../Contexts/HamburgerContext";

export default function Search(props) {
  let defaultVal = "";
  if (props.defaultVal) defaultVal = props.defaultVal;
  const [searchQuery, setSearchQuery] = useState(defaultVal);
  const [isFocused, setIsFocused] = useState(false);
  const isHamburger = useContext(HamburgerContext);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && searchQuery.trim() !== "") {
        e.preventDefault();
        window.location.href = `/search?query=${encodeURIComponent(
          searchQuery
        )}`;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [searchQuery]);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setViewportWidth(window.innerWidth)
    );
    document.addEventListener("click", (e) => {
      setIsFocused(false);
      isHamburger.setHamburger(true);
    });
    return () => {
      document.removeEventListener("click", (e) => {
        setIsFocused(false);
      });
      window.removeEventListener("resize", () =>
        setViewportWidth(window.innerWidth)
      );
    };
  }, []);

  async function handleSearchClick(e) {
    e.preventDefault();
    e.stopPropagation();
    setIsFocused(true);
  }

  return (
    <>
      {isFocused && viewportWidth < 900 && <div className="w-full h-28"></div>}
      <div
        className={`flex justify-end md:justify-center pr-3 ${
          isFocused && viewportWidth < 900
            ? " fixed top-0 left-0 bg-black opacity-50 h-screen w-full z-50"
            : "w-11/12"
        }`}
      >
        <div
          className={`bg-white w-8/12 md:w-10/12 flex flex-row gap-x-0.5 items-center justify-center rounded-3xl border-gray-300 hover:shadow-md noSelect ${
            isFocused ? " search-focus " : "  "
          } `}
          onClick={(e) => {
            handleSearchClick(e);
            // isHamburger.setHamburger(false);
          }}
        >
          <i
            className={`fa fas fa-search ${
              isFocused && viewportWidth < 900
                ? "text-gray-900"
                : "text-gray-400"
            } text-lg cursor-pointer `}
            aria-hidden="true"
          ></i>
          <input
            type="text"
            className={` ${
              isFocused ? "w-10/12" : "w-9/12"
            } md:w-11/12 h-10 px-2 focus:outline-none`}
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
