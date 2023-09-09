import LeftSideBar from "./Reusable/LeftSideBar";
import RightSideBar from "./Home/RightSideBar";
import Main from "./Home/Main";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function Home() {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));

  useEffect(() => {
    if (!authToken) {
      window.location.href = "/login";
    }
  }, [authToken]);

  const height = window.innerHeight;
  return (
    <div
      className="flex flex-row gap-x-8 bg-slate-200"
      style={{ minHeight: height }}
    >
      <LeftSideBar />
      <Main />
      <RightSideBar />
    </div>
  );
}
