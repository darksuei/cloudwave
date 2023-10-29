import { useContext } from "react";
import { LocationContext } from "../contexts";
//Components
import { UploadMain } from "../components";
import { LeftSideBar } from "../components/Reusable";

export function Uploads() {
  const Location = useContext(LocationContext);
  Location.setLocation("upload");

  return (
    <div className="flex flex-row bg-slate-300 min-h-screen">
      <LeftSideBar />
      <UploadMain />
    </div>
  );
}
