import { block } from "million/react";
import "../index.css";
import { Intro } from "../components/Reusable";

export const Default = block(function Default() {
  return (
    <div id="bg" className="h-screen w-screen text-white">
      <Intro />
    </div>
  );
});
