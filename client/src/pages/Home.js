import { useEffect, useContext } from "react";
import { RightSideBar, Main } from "../components";
import { LeftSideBar } from "../components/Reusable";
import { AuthContext } from "../contexts";

export function Home() {
  const height = window.innerHeight;
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className='flex flex-row gap-x-8 bg-slate-300' style={{ height }}>
      <LeftSideBar />
      <Main />
      <RightSideBar />
    </div>
  );
}
