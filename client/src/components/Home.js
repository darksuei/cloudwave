import LeftSideBar from "./Reusable/LeftSideBar";
import RightSideBar from "./Home/RightSideBar";
import Main from "./Home/Main";

export default function Home() {
  const height = window.innerHeight;
  return (
    <div className="flex flex-row gap-x-8 bg-slate-200" style={{minHeight:height}}>
      <LeftSideBar />
      <Main />
      <RightSideBar />
    </div>
  );
}
