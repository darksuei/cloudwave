import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import React, { useState, useEffect } from "react";
//Assets & Components
import "../../index.css";
import { LoadingScreen } from "./LoadingScreen";
import { createAvatar } from "@dicebear/core";
import { adventurerNeutral } from "@dicebear/collection";

const avatarOptions = [
  "Lucky",
  "Charlie",
  "Lilie",
  "Max",
  "Simon",
  "Lucy",
  "Molly",
  "Chloe",
  "Buster",
  "Simba",
  "Loki",
  "Baby",
  "Cali",
];

const avatar = createAvatar(adventurerNeutral, {
  seed: avatarOptions[Math.floor(Math.random() * avatarOptions.length)],
});

const dataUri = await avatar.toDataUri();

export function Avatar({ size, hidePen, imgSize }) {
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    if (authToken) {
      getUser();
    }
    return () => {};
  }, [authToken]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setAvatar(response.data.dataBase64);
    } catch (error) {
      console.error("Error getting user info:", error);
    }
  };

  async function handleAvatarUpload(e) {
    e.preventDefault();
    e.stopPropagation();
    setLoadingAvatar(true);
    let files;
    e.dataTransfer !== undefined
      ? (files = e.dataTransfer.files)
      : (files = e.target.files);

    const formData = new FormData();

    for (let file of files) {
      formData.append("files", file);
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/uploadavatar`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      getUser();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to update avatar!");
    }
    setLoadingAvatar(false);
  }

  return (
    <div className="flex justify-center items-center relative h-24">
      <div
        className={`relative rounded-full ${
          imgSize ? imgSize : " h-16 w-16 "
        } md:h-16 md:w-16 flex items-center justify-center`}
      >
        {loadingAvatar && <LoadingScreen roundedAbs={true} />}
        {avatar ? (
          <img
            src={"data:image/png;base64," + avatar}
            alt="Preview"
            className="rounded-full object-cover"
            style={{ width: "100%", height: "100%" }}
          />
        ) : dataUri ? (
          <div className="bg-slate-300 rounded-full">
            <img
              src={dataUri}
              alt="Preview"
              className="rounded-full object-cover"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        ) : (
          <i
            className={`fas fa-user-circle ${size} text-white rounded-full bg-slate-400 cursor-pointer`}
          ></i>
        )}
        <input
          type="file"
          className="bg-black absolute top-0 left-0 w-full h-full z-20 opacity-0 cursor-pointer"
          name="file"
          onChange={handleAvatarUpload}
          multiple
        />
        {!hidePen && (
          <div className="rounded-full bg-black p-1 absolute right-1 bottom-1 flex items-center justify-center opacity-70">
            <i className="fas fa-pen text-gray-100 text-xs cursor-pointer z-50"></i>
          </div>
        )}
      </div>
    </div>
  );
}
