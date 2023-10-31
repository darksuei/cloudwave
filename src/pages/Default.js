import { block } from "million/react";
import "../index.css";
import { Intro, Footer } from "../components/Reusable";

export const Default = block(function Default() {
  return (
    <div className="h-fit">
      <div id="bg" className="h-screen w-screen text-white">
        <Intro />
      </div>
      <div className="bg-slate-800 md:hidden">
        <Footer />
      </div>
    </div>
  );
});
