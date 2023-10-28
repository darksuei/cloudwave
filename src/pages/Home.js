import { useEffect, useContext } from "react";
//Components
import { RightSideBar, Main } from "../components";
import { LeftSideBar } from "../components/Reusable";
import { AuthContext } from "../contexts";

export function Home() {
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, []);

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
