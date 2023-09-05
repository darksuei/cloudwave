import "../../index.css";
import Hamburger from "../../assets/hamburger.png";
import "@fortawesome/fontawesome-free/css/all.css";
import { Avatar } from "./utils";
import LogoutButton from "./LogoutButton";
import { useState, useContext, useEffect } from "react";
import { LocationContext } from "../../Contexts/LocationContext";

export default function LeftSideBar() {
  const [showMenu, setShowMenu] = useState(false);
  const Location = useContext(LocationContext);

  const height = window.innerHeight;

  function toggleMenu(e) {
    e.stopPropagation();
    setShowMenu(!showMenu);
  }

  useEffect(() => {
    const handleClickOutside = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      {showMenu ? (
        <i
          className="fas fa-times-circle text-red-700 text-xl rounded-full z-50 fixed top-5 left-5 bg-white hover:transform hover:scale-80 transition-transform duration-300"
          onClick={(e) => toggleMenu(e)}
        ></i>
      ) : (
        <img
          src={Hamburger}
          alt="Menu"
          width={25}
          className="block fixed top-7 left-6 md:hidden z-50"
          onClick={(e) => toggleMenu(e)}
        />
      )}

      <nav
        className={`${
          showMenu ? "flex w-7/12 left-0 top-0" : "hidden"
        } md:flex md:w-3/12 lg:w-2/12 bg-blue-700 text-white text-xs md:text-sm font-semibold fixed md:relative z-40`} style={{height: height}}
      >
        <ul className="flex flex-col w-full relative">
          <Avatar size={"text-6xl"} />
          <div>
            <a href="/home">
              <li
                className={`${
                  Location.location === "home" ||
                  Location.location === "settings"
                    ? "bg-blue-900"
                    : ""
                } justify-center py-4 flex items-center gap-x-1 md:gap-x-2 rounded-r-2xl hover:bg-blue-800`}
              >
                <div className="p-1 w-5">
                  <i className="fas fa-home"></i>
                </div>
                Home
              </li>
            </a>
            <a href="/myfiles">
              <li
                className={`${
                  Location.location === "shared" ? "bg-blue-900" : ""
                } justify-center py-4 flex items-center gap-x-1 md:gap-x-2 rounded-r-2xl hover:bg-blue-800`}
              >
                <div className="p-1 w-5">
                  <i className="fas fa-share-alt"></i>
                </div>
                <span className="md:hidden inline">Files</span>
                <span className="md:inline hidden">My Files</span>
              </li>
            </a>
            <a href="/favorites">
              <li
                className={`${
                  Location.location === "favorites" ? "bg-blue-900" : ""
                } justify-center py-4 flex items-center gap-x-1 md:gap-x-2 rounded-r-2xl hover:bg-blue-800`}
              >
                <div className="p-1 w-5">
                  <i className="fas fa-star"></i>
                </div>
                Favorites
              </li>
            </a>
            <a href="/upload">
              <li
                className={`${
                  Location.location === "upload" ? "bg-blue-900" : ""
                } justify-center py-4 flex items-center gap-x-1 md:gap-x-2 rounded-r-2xl hover:bg-blue-800`}
              >
                <div className="p-1 w-5">
                  <i className="fas fa-upload"></i>
                </div>
                <span className="md:hidden inline">Upload</span>
                <span className="hidden md:inline">Upload Files</span>
              </li>
            </a>
          </div>
          <div className="absolute bottom-3.5 w-full">
            <a href="/settings">
              <li className="px-10 md:px-14 py-4 flex items-center gap-x-2 rounded-r-2xl hover:bg-blue-800">
                <div className="p-1 w-5">
                  <i className="fas fa-cog"></i>
                </div>
                Settings
              </li>
            </a>
            <LogoutButton />
          </div>
        </ul>
      </nav>
    </>
  );
}
