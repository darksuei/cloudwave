import { useState, useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";
//Components
import { UserInfo, Footer } from "../components";
import { LeftSideBar } from "../components/Reusable";

export default function Settings() {
  const [bg, setBg] = useState("");
  const Location = useContext(LocationContext);
  Location.setLocation("settings");

  return (
    <div className="flex flex-row w-full bg-slate-200 min-h-screen relative">
      <LeftSideBar />
      <div className="flex flex-col w-full md:w-10/12 relative">
        <UserInfo />
        <Footer />
        <a
          href="mailto:folarinraphael@outlook.com"
          className="absolute right-10 bottom-14 md:block hidden"
        >
          <svg
            className={`w-12 h-12 hover:${bg}`}
            fill="#3B82F6"
            viewBox="0 0 1920 1920"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M84 0v1423.143h437.875V1920l621.235-496.857h692.39V0H84Zm109.469 109.464H1726.03V1313.57h-621.235l-473.452 378.746V1313.57H193.469V109.464Z"
                fill-rule="evenodd"
              ></path>
            </g>
          </svg>
        </a>
      </div>
    </div>
  );
}
