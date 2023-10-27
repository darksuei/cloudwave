import { block } from "million/react";
import Cloudwavehome from "../assets/Cloudwavehome.jpeg";

const Default = block(function Default() {
  return (
    <div className="bg-white flex flex-col-reverse md:flex-row w-full h-screen items-center justify-center gap-y-1 md:gap-y-5">
      <div className="w-full md:w-6/12 flex flex-col justify-center items-center gap-y-1 md:gap-y-5 h-8/12 md:h-screen">
        <div className="p-5 w-10/12 flex flex-col gap-y-6 md:gap-y-7">
          <h1 className="text-blue-700 text-2xl md:text-5xl font-black">
            All your files in one safe place
          </h1>
          <p className="text-xs md:text-sm text-blue-400">
            <span className="hidden md:inline">
              Free file storage for everyone.
            </span>{" "}
            Store your files securely in the cloud and access them from any
            device.
          </p>
        </div>
        <div className="w-10/12 px-4">
          <a href="/login">
            <button
              className="bg-blue-500 rounded-lg py-3 px-6 text-white hover:bg-blue-600 text-xs md:text-md"
              onClick={() => (window.location.href = "/login")}
              type="button"
            >
              Start Uploading ✨
            </button>
          </a>
        </div>
      </div>
      <div className="w-7/12 md:w-6/12 bg-white flex items-center justify-center h-4/12 md:h-screen">
        <img src={Cloudwavehome} alt="Home Background" className="w-full" />
      </div>
    </div>
  );
});

export default Default;
