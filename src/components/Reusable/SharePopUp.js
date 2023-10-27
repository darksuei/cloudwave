import { useState, useEffect } from "react";
//Assets
import "../../index.css";
import CopyLinkBox from "./CopyLink";

export default function SharePopUp({ link, isOpen, width }) {
  const [close, setClose] = useState(isOpen);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  function toggleClose(e) {
    e.preventDefault();
    e.stopPropagation();
    setClose(false);
    isOpen = !isOpen;
  }

  useEffect(() => {
    function handleDocumentClick() {
      setClose(false);
    }
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    document.body.addEventListener("click", handleDocumentClick);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    close && (
      <div
        className="w-full fixed flex items-center justify-center top-0 left-0 z-50"
        style={{ height: viewportHeight }}
      >
        <div
          className={`${width} bg-white rounded-2xl relative z-50 p-5 flex flex-col gap-y-5 shadow-md border z-50`}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-row gap-x-3 items-center h-fit">
            <i className="fas fa-share-alt text-blue-500"></i>
            <h1 className="text-md text-blue-500 font-black">Share</h1>
          </div>
          <h3 className="text-xs text-gray-500 ml-2.5">
            Copy this link to share
          </h3>
          <CopyLinkBox mylink={link} />
          <h3 className="text-xs text-gray-500 ml-2.5 mb-3">
            Anyone with this link can view this file!
          </h3>
          <button
            className="absolute top-3 right-3 noSelect"
            onClick={(e) => toggleClose(e)}
          >
            <i className="fas fa-times-circle text-red-700 text-xl rounded-full"></i>
          </button>
        </div>
      </div>
    )
  );
}
