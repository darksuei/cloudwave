import { useState, useContext, useEffect } from "react";
import { LocationContext } from "../../contexts";
import { HamburgerContext } from "../../contexts";
//Assets & Components
import "../../index.css";
import "@fortawesome/fontawesome-free/css/all.css";
import Hamburger from "../../assets/hamburger.png";
import Close from "../../assets/close.png";
import { Avatar } from "./Avatar";
import { LogoutButton } from "./LogoutButton";

export function LeftSideBar() {
  const Location = useContext(LocationContext);
  const isHamburger = useContext(HamburgerContext);
  const [showMenu, setShowMenu] = useState(false);

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
        <img
          src={Close}
          alt="Menu"
          width={25}
          className="block fixed top-5 left-5 md:hidden z-40"
          onClick={(e) => toggleMenu(e)}
        />
      ) : (
        isHamburger.hamburger && (
          <img
            src={Hamburger}
            alt="Menu"
            width={20}
            className="block fixed top-6 left-6 md:hidden z-40"
            onClick={(e) => toggleMenu(e)}
          />
        )
      )}

      <nav
        className={`${
          showMenu ? "flex w-7/12 left-0 top-0" : "hidden"
        } md:flex md:w-3/12 lg:w-2/12 bg-blue-600 text-white text-xs md:text-sm font-semibold fixed md:relative z-30`}
        style={{ height: height }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ul className="flex flex-col gap-y-0 w-full relative">
          <Avatar size={"text-6xl"} />
          <div className="flex flex-col gap-y-0">
            <a href="/home">
              <li
                className={`${
                  Location.location === "home" ||
                  Location.location === "settings"
                    ? "bg-blue-900"
                    : ""
                } justify-center py-4 flex items-center gap-x-1 md:gap-x-2 hover:bg-blue-800 noSelect`}
              >
                <div className="p-1 w-5">
                  <i className="fas fa-home"></i>
                </div>
                <span className="md:hidden inline">HOME</span>
                <span className="md:inline hidden">Home</span>
              </li>
            </a>
            <a href="/myfiles">
              <li
                className={`${
                  Location.location === "shared" ? "bg-blue-900" : ""
                } justify-center py-4 flex items-center gap-x-1 md:gap-x-2 hover:bg-blue-800 noSelect`}
              >
                <div className="p-1 w-5">
                  <i className="fas fa-share-alt"></i>
                </div>
                <span className="md:hidden inline">FILES</span>
                <span className="md:inline hidden">My Files</span>
              </li>
            </a>
            <a href="/favorites">
              <li
                className={`${
                  Location.location === "favorites" ? "bg-blue-900" : ""
                } justify-center py-4 flex items-center gap-x-1 md:gap-x-2 hover:bg-blue-800 noSelect`}
              >
                <div className="p-1 w-5">
                  <i className="fas fa-star"></i>
                </div>
                <span className="md:hidden inline">FAVORITES</span>
                <span className="md:inline hidden">Favorites</span>
              </li>
            </a>
            <a href="/upload">
              <li
                className={`${
                  Location.location === "upload" ? "bg-blue-900" : ""
                } justify-center py-4 flex items-center gap-x-1 md:gap-x-2 hover:bg-blue-800 noSelect`}
              >
                <div className="p-1 w-5">
                  <i className="fas fa-upload"></i>
                </div>
                <span className="md:hidden inline">UPLOAD</span>
                <span className="hidden md:inline">Upload Files</span>
              </li>
            </a>
          </div>
          <div className="absolute bottom-3.5 w-full">
            <a href="/settings">
              <li className="px-10 md:px-14 py-3 md:py-4 flex items-center justify-center gap-x-2 hover:bg-blue-800 noSelect">
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
