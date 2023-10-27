import LeftSideBar from "./Reusable/LeftSideBar";
import FavMain from "./Favorites/FavMain";
import { useContext } from "react";
import { LocationContext } from "../Contexts/LocationContext";

export default function Favorites() {
  const Location = useContext(LocationContext);
  Location.setLocation("favorites");

  return (
    <div className="flex flex-row bg-slate-200 min-h-screen overflow-hidden">
      <LeftSideBar activePage={"favorites"} />
      <FavMain />
    </div>
  );
}
