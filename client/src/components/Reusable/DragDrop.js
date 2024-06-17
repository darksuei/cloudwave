import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import React, { useState } from "react";
import "../../index.css";
import { LoadingScreen } from "./LoadingScreen";

export function DragDrop() {
  const [highlight, setHighlight] = useState(false);
  const authToken = Cookies.get("authToken");
  const [loadingScreen, setLoadingScreen] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  const handleDragLeave = () => {
    setHighlight(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setHighlight(false);

    let files;

    if (e.dataTransfer && e.dataTransfer.files) {
      files = e.dataTransfer.files;
    } else {
      files = e.target.files;
    }
    handleFileUpload(e, files);
  };

  const handleFileUpload = async (e, files) => {
    e.preventDefault();
    setLoadingScreen(true);

    const formData = new FormData(); // Create FormData object

    // Append each file to the FormData object
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      setLoadingScreen(false);

      toast.success("Upload successful!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1250);
  };

  return (
    <>
      {loadingScreen && <LoadingScreen />}
      <div
        className={`flex flex-col w-10/12 md:w-9/12 py-9 md:py-11 items-center bg-white border-dashed border border-gray-500 cursor-pointer hover:transform hover:scale-105 hover:border-none hover:rounded-lg transition-transform duration-300 ${
          highlight ? " border-2 border-blue-500 " : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div>
          <div className='loading-bar-container'>
            <div className='loading-bar'></div>
          </div>
        </div>
        <div className='flex flex-col justify-center items-center gap-y-4'>
          <i className='fas fa-upload text-indigo-500 text-3xl'></i>
          <p className='text-gray-400 text-sm font-semibold'>
            <span className='hidden md:inline'>Drag and drop files here</span>
            <a href='/upload' className='inline md:hidden underline font-black text-md noSelect'>
              Choose a file to Upload
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
