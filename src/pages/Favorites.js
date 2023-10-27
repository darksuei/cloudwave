import { useContext } from "react";
//Components
import { LocationContext } from "../contexts";
import { FavMain } from "../components";
import { LeftSideBar } from "../components/Reusable";

export function Favorites() {
  const Location = useContext(LocationContext);
  Location.setLocation("favorites");

  return (
    <div className="flex flex-row bg-slate-200 min-h-screen overflow-hidden">
      <LeftSideBar activePage={"favorites"} />
      <FavMain />
    </div>
  );
}
