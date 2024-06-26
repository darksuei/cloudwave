import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
//Assets
import "../../index.css";

export function Storage({ width }) {
  const authToken = Cookies.get("authToken");
  const [usedSpace, setUsedSpace] = useState(0);
  const [unit, setUnit] = useState("MB");
  const [spaceLeft, setSpaceLeft] = useState(100);
  const [percentageUsed, setPercentageUsed] = useState("0%");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filesData = await getFiles(authToken);
        setUsedSpace(filesData[0]);
        setUnit(filesData[1]);
        setSpaceLeft(100 - filesData[2]);
        setPercentageUsed(String(filesData[2]) + "%");
      } catch (error) {
        console.error("Error fetching storage:", error);
      }
    };

    if (authToken) {
      fetchData();
    }
    return () => {};
  }, [authToken]);

  async function getFiles(authToken) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/storage`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return [response.data.storageUsed, response.data.unit, response.data.percentage];
    } catch (error) {
      console.error("Files error:", error);
    }
  }

  return (
    <div className={`flex flex-col bg-gray-200 rounded-xl noSelect ${width ? width : "w-full"} p-3 gap-y-3`}>
      <div className='text-sm flex flex-row justify-between'>
        <h1 className='text-blue-500 font-extrabold text-xs'>Your Storage</h1>
        <p className='text-emerald-500 text-xs'>{spaceLeft}% left</p>
      </div>
      <div className='text-xs text-blue-500'>
        {usedSpace} {unit} OF 3 GB USED
      </div>
      <div className={`loading-bar-container ${!usedSpace && "loading"}`}>
        <div className='loading-bar' style={{ width: percentageUsed }}></div>
      </div>
    </div>
  );
}
