import { useContext } from "react";
import { LocationContext } from "../contexts";
//Components
import { MyMain } from "../components";
import { LeftSideBar } from "../components/Reusable";

export default function MyFiles() {
  const Location = useContext(LocationContext);
  Location.setLocation("shared");

  return (
    <div className="flex flex-row bg-slate-200 w-full min-h-screen">
      <LeftSideBar />
      <MyMain />
    </div>
  );
}
