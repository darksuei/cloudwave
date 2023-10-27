import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { LocationContext } from "../contexts";
//Components
import { UploadMain } from "../components";
import { LeftSideBar } from "../components/Reusable";

export function Uploads() {
  const Location = useContext(LocationContext);
  Location.setLocation("upload");
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));

  useEffect(() => {
    if (!authToken) {
      window.location.href = "/login";
    }
  }, [authToken]);

  return (
    <div className="flex flex-row bg-slate-200 min-h-screen">
      <LeftSideBar />
      <UploadMain />
    </div>
  );
}
