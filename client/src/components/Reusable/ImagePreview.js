import Cookies from "js-cookie";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
//Assets & Components
import "../../index.css";
import { SharePopUp } from "./SharePopUp";
import { LoadingScreen } from "./LoadingScreen";

export function ImagePreview({ item }) {
  const [fav, setFav] = useState("");
  const [showImg, setShowImg] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
  const [showAudio, setShowAudio] = useState(false);
  const [loadingImg, setLoadingImg] = useState(true);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [previewItemUrl, setPreviewItemUrl] = useState("");
  const [previewVideoUrl, setPreviewVideoUrl] = useState("");
  const [previewAudioUrl, setPreviewAudioUrl] = useState("");
  const [previewDocUrl, setPreviewDocUrl] = useState("");
  const [extension, setExtension] = useState("");
  const [renameFile, setRenameFile] = useState(false);
  const [newName, setNewName] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [share, setShare] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const authToken = Cookies.get("authToken");

  let isfav = item.isFavorite;

  useEffect(() => {
    if (item.category === "pictures") {
      const fetchImg = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/image/${item.name}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setExtension(response.data.extension);
        setShowImg(true);
        setPreviewItemUrl(response.data.dataBase64);
        setLoadingImg(false);
      };
      fetchImg();
    } else if (item.category === "videos") {
      const fetchImg = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/image/${item.name}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setExtension(response.data.extension);
        setShowVideo(true);
        setPreviewVideoUrl(response.data.dataBase64);
        setLoadingImg(false);
      };
      fetchImg();
    } else if (item.category === "audio") {
      const fetchImg = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/image/${item.name}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setExtension(response.data.extension);
        setShowAudio(true);
        setPreviewAudioUrl(response.data.dataBase64);
        setLoadingImg(false);
      };
      fetchImg();
    } else if (item.category === "documents") {
      const fetchImg = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/image/${item.name}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setExtension(response.data.extension);
        setShowDoc(true);
        setPreviewDocUrl(response.data.dataBase64);
        setLoadingImg(false);
      };
      fetchImg();
    } else {
      setLoadingImg(false);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Fn to share file
  function handleShare(e, item) {
    e.preventDefault();
    e.stopPropagation();
    setShare(!share);
  }

  //toggle dropdown
  function toggleDropDown(e) {
    e.stopPropagation();
    setDropDown(!dropDown);
  }

  //Fn to close active modals on doc click
  useEffect(() => {
    function handleDocumentClick() {
      setDropDown(false);
    }
    document.body.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  //Update favorites
  useEffect(() => {
    const updateFavorites = async () => {
      try {
        await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/api/updatefav/${fav}`,
          {
            isFavorite: !isfav,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        window.location.reload();
      } catch (error) {
        console.error("Error updating favorites:", error);
        toast.error("Error updating favorites");
      }
    };
    if (fav) {
      updateFavorites();
    }
    return () => {};
  }, [fav]);

  //Fn to return item name in specific length
  function itemName(item) {
    if (viewportWidth < 500) {
      if (item.name.length < 11) return item.name;
      return item.name.slice(0, 14) + "...";
    } else {
      return item.name.length > 23 ? item.name.slice(0, 20) + "..." : item.name;
    }
  }

  //Fn to download
  function handleDownload(e, item) {
    e.preventDefault();
    e.stopPropagation();
    setDropDown(false);
    const base64ImageData = `data:image/jpeg;base64,${previewItemUrl}`;

    const a = document.createElement("a");
    a.href = base64ImageData;
    a.download = item.name;
    a.click();
  }

  //Rename file
  const handleRename = async (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/api/rename/${name}`,
        {
          newName: appendFileExtension(newName, item),
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      toast.success("Rename success");
      if (response.status === 200) {
        setRenameFile(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error renaming file:", error);
      toast.error("Rename failed.");
    }
  };

  function appendFileExtension(str, item) {
    if (str.split(".").pop() === item.name.split(".").pop()) {
      return str;
    }
    return str + "." + item.name.split(".").pop();
  }

  //Set favorite
  async function handleFav(e, itemname) {
    e.preventDefault();
    e.stopPropagation();
    setFav(itemname);
  }

  //Fn to delete
  async function handleDelete(e) {
    setLoadingScreen(true);
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/delete/${item.name}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setLoadingScreen(false);
      toast.success("Delete success");
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Delete failed.");
    }
  }
  return (
    <div
      className={`relative z-50 flex flex-col w-full bg-slate-400 noSelect h-full ${
        showImg | showVideo | showDoc | showAudio ? "md:h-4/5" : "md:h-full"
      }`}
      onClick={(e) => {
        e.stopPropagation();
        setDropDown(false);
        setShare(false);
      }}
    >
      {loadingScreen && <LoadingScreen darkness={" z-40 "} />}
      {share && <SharePopUp isOpen={share} link={item.link} width={"w-full md:w-4/12 lg:w-6/12"} />}
      <div
        className={`relative h-full flex items-center justify-center w-full ${
          previewItemUrl ? "bg-gray-600" : "bg-gray-300"
        } rounded-lg`}
      >
        {loadingImg && <LoadingScreen absolute={true} />}
        {previewItemUrl && (
          <img
            src={`data:image/${extension};base64,` + previewItemUrl}
            alt='Preview'
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              borderRadius: "0.5rem",
            }}
          />
        )}
        {previewVideoUrl && (
          <video
            controls
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              borderRadius: "0.5rem",
            }}
            title={item.name}
            autoPlay
            playsInline
          >
            <source src={`data:video/${extension};base64,` + previewVideoUrl} type='video/mp4' />
          </video>
        )}
        {previewAudioUrl && (
          <audio
            controls
            style={{
              objectFit: "contain",
              width: "100%",
              height: "100%",
              borderRadius: "0.5rem",
            }}
            autoPlay
            volume='0.5'
          >
            <source src={`data:audio/${extension};base64,` + previewAudioUrl} type='audio/mp3' />
          </audio>
        )}
        {previewDocUrl && (
          <iframe
            src={
              extension && extension === "pdf"
                ? `data:application/pdf;base64,` + previewDocUrl
                : `data:text/html;base64,` + previewDocUrl
            }
            style={{ width: "100%", height: "100%", borderRadius: "0.5rem" }}
            title={item.name}
            scrolling='yes'
          ></iframe>
        )}
        {!previewItemUrl && !previewVideoUrl && !previewAudioUrl && !previewDocUrl && (
          <i className={`fas ${item.icon ? item.icon : "fa-file-alt"} text-gray-400 text-6xl`}></i>
        )}
      </div>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col gap-y-3 py-3'>
          <span className='flex flex-row gap-x-1 items-center'>
            <i className='fas fa-star text-amber-500 text-lg'></i>
            {renameFile === true ? (
              <input
                type='text'
                className='w-8/12 md:w-10/12 text-sm md:text-base text-slate-700 font-bold p-2'
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                autoFocus
                onBlur={() => setRenameFile(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleRename(e, item.name);
                  }
                }}
              />
            ) : (
              <h1 className='text-blue-600 font-black text-lg'>{itemName(item)}</h1>
            )}
          </span>
          <p className='text-xs text-gray-400'>{item.time.toUpperCase()}</p>
          <span className='text-sm bg-emerald-200 text-emerald-600 flex items-center rounded-xl px-4 w-fit'>
            Personal
          </span>
        </div>
        <div className='relative flex flex-row justify-center h-fit items-center gap-x-2 py-3'>
          <i
            className='fas fa-share-alt text-blue-700 cursor-pointer h-fit p-1.5 rounded-full hover:bg-slate-300'
            onClick={(e) => handleShare(e, item)}
          ></i>
          <i
            className='fas fa-trash text-blue-700 cursor-pointer h-fit p-1.5 rounded-full hover:bg-slate-300 text-red-700'
            onClick={(e) => handleDelete(e)}
          ></i>
          <i
            className='fas fa-ellipsis-v text-blue-700 cursor-pointer h-fit p-1 px-2.5 rounded-full hover:bg-slate-300'
            onClick={(e) => toggleDropDown(e)}
          ></i>
          {dropDown && (
            <div className='origin-top-right absolute bottom-0 right-6 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50'>
              <div
                className='py-1 flex flex-col'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='options-menu'
              >
                <button
                  className='px-4 relative py-2 text-xs md:text-sm text-gray-700 hover:bg-slate-200 w-full flex flex-row justify-between items-center'
                  role='menuitem'
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDropDown(false);
                    setRenameFile(true);
                  }}
                >
                  <span>Rename</span>
                  <i className={`fas fa-pen text-xs text-slate-700 absolute right-3`}></i>
                </button>
                <button
                  className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-slate-100 w-full flex flex-row justify-between items-center border-b'
                  role='menuitem'
                  onClick={(e) => handleDownload(e, item)}
                >
                  <span>Download</span>
                  <i className='fas fa-download text-xs text-blue-500'></i>
                </button>
                <button
                  className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-slate-100 w-full flex flex-row justify-between items-center text-left'
                  role='menuitem'
                  onClick={(e) => handleFav(e, item.name)}
                >
                  <span>
                    {(item.isFavorite === false) | undefined ? "Add to favorites" : "Remove from favorites"}
                  </span>
                  <i className={`fas fa-star text-xs ${item.isFavorite === true ? "favorite" : ""}`}></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
