import axios from "axios";
import React, { useState, useEffect } from "react";
import useSWR from "swr";
//Assets
import "../../index.css";
import { fetcher } from "../../services";

export function Storage({ width }) {
  const { data, error } = useSWR(
    `${process.env.REACT_APP_SERVER_URL}/api/storage`,
    fetcher
  );
  const [usedSpace, setUsedSpace] = useState(0);
  const [unit, setUnit] = useState("MB");
  const [spaceLeft, setSpaceLeft] = useState(100);

  useEffect(() => {
    if (data) {
      setUsedSpace(data.storageUsed);
      setUnit(data.unit);
      setSpaceLeft(100 - data.percentage);
    }
  }, [data]);

  useEffect(() => {
    updateLoadingBar(usedSpace);
    return () => {};
  }, [usedSpace]);

  const updateLoadingBar = (usedSpace) => {
    const loadingBar = document.querySelector(".loading-bar");

    if (loadingBar !== null) {
      const progress = (usedSpace / 100) * 100;
      loadingBar.style.width = `${progress}%`;
    }
  };

  return (
    <div
      className={`flex flex-col bg-gray-200 rounded-xl noSelect ${
        width ? width : "w-full"
      } p-3 gap-y-3`}
    >
      <div className="text-sm flex flex-row justify-between">
        <h1 className="text-blue-500 font-extrabold text-xs">Your Storage</h1>
        <p className="text-emerald-500 text-xs">{spaceLeft}% left</p>
      </div>
      <div className="text-xs text-blue-500">
        {usedSpace} {unit} OF 3 GB USED
      </div>
      <div className={`loading-bar-container ${!usedSpace && "loading"}`}>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}
