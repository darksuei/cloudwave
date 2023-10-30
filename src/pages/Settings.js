import { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";
//Components
import { UserInfo } from "../components";
import { LeftSideBar, Footer } from "../components/Reusable";

export function Settings() {
  const Location = useContext(LocationContext);
  Location.setLocation("settings");

  return (
    <div className="flex flex-row w-full bg-slate-300 min-h-screen relative">
      <LeftSideBar />
      <div className="flex flex-col w-full md:w-10/12 relative">
        <UserInfo />
        <div className="bg-slate-800 w-full absolute bottom-0">
          <Footer />
        </div>
      </div>
    </div>
  );
}
