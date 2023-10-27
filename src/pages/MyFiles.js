import { useContext } from "react";
import { LocationContext } from "../contexts";
//Components
import { MainFiles } from "../components";
import { LeftSideBar } from "../components/Reusable";

export function MyFiles() {
  const Location = useContext(LocationContext);
  Location.setLocation("shared");

  return (
    <div className="flex flex-row bg-slate-200 w-full min-h-screen">
      <LeftSideBar />
      <MainFiles />
    </div>
  );
}
