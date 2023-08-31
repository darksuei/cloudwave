import LeftSideBar from "./Reusable/LeftSideBar";
import UserInfo from "./Settings/UserInfo";
import Theme from "./Settings/Theme";
import Footer from "./Settings/Footer";
import { useContext } from "react";
import { LocationContext } from "../Contexts/LocationContext";

export default function Settings() {
  const Location = useContext(LocationContext);
  Location.setLocation("settings");

  return (
    <div className="flex flex-row w-full bg-slate-200 min-h-screen">
      <LeftSideBar />
      <div className="flex flex-col w-full md:w-10/12 relative">
        <UserInfo />
        <Theme />
        <Footer />
      </div>
    </div>
  );
}
