import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import React, { useState } from "react";
//Assets & Components
import "../../index.css";
import LoadingScreen from "./LoadingScreen";

export default function DragDrop() {
  const [highlight, setHighlight] = useState(false);
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
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
    handleFileUpload(e);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setLoadingScreen(true);
    let files;
    e.dataTransfer !== undefined
      ? (files = e.dataTransfer.files)
      : (files = e.target.files);

    const formData = new FormData(); // Create FormData object

    // Append each file to the FormData object
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setLoadingScreen(false);
      if (response.status === 400) {
        toast.warn("Upload failed. Storage limit exceeded!");
      }
      if (response.status === 201) {
        toast.success("Upload successful!");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred!");
    }
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
          <div className="loading-bar-container">
            <div className="loading-bar"></div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-4">
          <i className="fas fa-upload text-indigo-500 text-3xl"></i>
          <p className="text-gray-400 text-sm font-semibold">
            <span className="hidden md:inline">Drag and drop files here</span>
            <a
              href="/upload"
              className="inline md:hidden underline font-black text-md noSelect"
            >
              Choose a file to Upload
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
