import LeftSideBar from "./Reusable/LeftSideBar";
import UploadMain from "./Uploads/UploadMain";
import { useState, useEffect, useContext } from "react";
import { LocationContext } from "../Contexts/LocationContext";
import Cookies from 'js-cookie'

export default function Uploads() {
  const Location = useContext(LocationContext);
  Location.setLocation("upload");
  const [authToken, setAuthToken] = useState(Cookies.get('authToken'));

  useEffect(() => {
    if(!authToken) {
      window.location.href = "/login";
    }
  },[authToken]);

  return (
    <div className="flex flex-row bg-slate-200 min-h-screen">
      <LeftSideBar />
      <UploadMain />
    </div>
  );
}
