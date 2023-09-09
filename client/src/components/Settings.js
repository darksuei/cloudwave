import LeftSideBar from "./Reusable/LeftSideBar";
import UserInfo from "./Settings/UserInfo";
import Footer from "./Settings/Footer";
import { useContext } from "react";
import { LocationContext } from "../Contexts/LocationContext";

export default function Settings() {
  const Location = useContext(LocationContext);
  Location.setLocation("settings");

  return (
    <div className="flex flex-row w-full bg-slate-200 min-h-screen relative">
      <LeftSideBar />
      <div className="flex flex-col w-full md:w-10/12 relative">
        <UserInfo />
        <Footer />
        <a href="mailto:folarinraphael@outlook.com" className="absolute right-7 bottom-10 bg-emerald-400 w-20 h-20 rounded-full flex items-center justify-center">
          <svg 
          className="w-12 h-12" 
          fill="#ffffff" 
          viewBox="0 0 1920 1920" 
          xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier"> 
              <path d="M84 0v1423.143h437.875V1920l621.235-496.857h692.39V0H84Zm109.469 109.464H1726.03V1313.57h-621.235l-473.452 378.746V1313.57H193.469V109.464Z" fill-rule="evenodd"></path> 
            </g>
          </svg>
        </a>
      </div>
    </div>
  );
}
