import React, { useState, useEffect } from "react";
import "../../index.css";
import Cookies from "js-cookie";
import axios from "axios";

export default function Storage({ width }) {
  const [usedSpace, setUsedSpace] = useState(0);
  const [unit, setUnit] = useState("MB");
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [spaceLeft, setSpaceLeft] = useState(100);

  useEffect(() => {
    updateLoadingBar(usedSpace);
    return () => {};
  }, [usedSpace]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filesData = await getFiles(authToken);
        setUsedSpace(filesData[0]);
        setUnit(filesData[1]);
        setSpaceLeft(100 - filesData[2]);
      } catch (error) {
        console.error("Error fetching storage:", error);
      }
    };

    if (authToken) {
      fetchData();
    }
    return () => {};
  }, [authToken]);

  const getFiles = async (authToken) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/storage`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      return [
        response.data.storageUsed,
        response.data.unit,
        response.data.percentage,
      ];
    } catch (error) {
      console.error("Files error:", error);
    }
  };

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
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
    </div>
  );
}
