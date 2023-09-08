import React, { useState, useEffect } from "react";
import SharePopUp from "./SharePopUp";
import Cookies from "js-cookie";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import '../../index.css'

export default function ImagePreview({ item, favorite }) {
  const [fav, setFav] = useState("");
  const [showImg, setShowImg] = useState(false);
  const [loadingImg, setLoadingImg] = useState(true);
  const [loadingScreen, setLoadingScreen] = useState(false); 
  const [previewItemUrl, setPreviewItemUrl] = useState("");
  const [renameFile, setRenameFile] = useState(false);
  const [newName, setNewName] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [share, setShare] = useState(false);
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [link, setLink] = useState("");

  let isfav = item.isFavorite;

  useEffect(() => {
    if(item.category === 'pictures') {
      const fetchImg = async () => {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/image/${item.name}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
          );
        setShowImg(true);
        setPreviewItemUrl(response.data.dataBase64);
        setLoadingImg(false);
      }
      fetchImg();
    }
    else{
      setLoadingImg(false);
    }
  },[])

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function getFile(name) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/getfile/${name}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      if (response.status === 200) {
        return response.data.file;
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  }

  function handleShare(e, item) {
    e.preventDefault();
    e.stopPropagation();
    setSelectedItemData(item.name);
    setShare(!share);
  }

  function toggleDropDown(e) {
    e.stopPropagation();
    setDropDown(!dropDown);
  }
  useEffect(() => {
    function handleDocumentClick() {
      setDropDown(false);
    }
    document.body.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

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
          },
        );
        window.location.reload();
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    };
    if (fav) {
      updateFavorites();
    }
    return () => {};
  }, [fav]);

  function itemName(item) {
    if (viewportWidth < 500) {
      if (item.name.length < 11) return item.name;
      return item.name.slice(0, 14) + "...";
    } else {
      return item.name.length > 23 ? item.name.slice(0, 20) + "..." : item.name;
    }
  }

  function handleDownload(e, item) {
    e.preventDefault();
    e.stopPropagation();
    setDropDown(false);
    setSelectedItemData(item.name);
    const base64ImageData = `data:image/jpeg;base64,${previewItemUrl}`;

    const a = document.createElement('a');
    a.href = base64ImageData;
    a.download = item.name;
    a.click();
  }

  const handleRename = async (e, name) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/api/rename/${name}`,
        {
          newName: newName,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        setRenameFile(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error renaming file:', error);
    }
  };

  async function handleFav(e, itemname) {
    e.preventDefault();
    e.stopPropagation();
    setFav(itemname);
  }

  async function handleDelete(e) {
    setLoadingScreen(true)
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/delete/${item.name}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      setLoadingScreen(false);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      window.location.reload();
    }
  }
  return (
    <div
      className={`relative z-50 flex flex-col w-full bg-slate-400 noSelect ${
        showImg ? "h-4/5" : "h-full"
      }`}
    >
      {loadingScreen && <LoadingScreen darkness={ ' z-40 ' } />}
      {share && (
        <SharePopUp
          isOpen={share}
          link={link}
          width={"w-full md:w-4/12 lg:w-6/12"}
        />
      )}
      <div className={`relative h-full flex items-center justify-center w-full ${ previewItemUrl ? 'bg-gray-600' : 'bg-gray-300' } rounded-lg`}>
        { loadingImg && <LoadingScreen absolute={ true } /> }
        { !previewItemUrl ? <i className={`fas fa-file-alt text-gray-400 text-6xl`}></i> 
        :
        <img src={"data:image/png;base64," + previewItemUrl} alt="Preview" style={{ objectFit: 'contain', width: '100%', height: '100%', borderRadius: '0.5rem' }}/> 
        }
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-y-3 py-3">
          <span className="flex flex-row gap-x-1 items-center">
            <i className="fas fa-star text-amber-500 text-lg"></i>
            { renameFile === true ? (
                    <input
                      type="text"
                      className="w-8/12 md:w-10/12 text-sm md:text-base text-slate-700 font-bold p-2"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      autoFocus
                      onBlur={() => setRenameFile(false)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleRename(e, item.name);
                        }
                      }}
                    />
                  ) : (
            <h1 className="text-blue-600 font-black text-lg">{itemName(item)}</h1>
                  )}
          </span>
          <p className="text-xs text-gray-400">{item.time.toUpperCase()}</p>
          <span className="text-sm bg-emerald-200 text-emerald-600 flex items-center rounded-xl px-4 w-fit">
            Personal
          </span>
        </div>
        <div className="relative flex flex-row gap-x-2 md:gap-x-3 py-3">
          <i
            className="fas fa-share-alt text-blue-700 cursor-pointer h-fit p-1.5 rounded-full hover:bg-slate-300"
            onClick={(e) => handleShare(e, item)}
          ></i>
          <i
            className="fas fa-trash text-blue-700 cursor-pointer h-fit p-1.5 rounded-full hover:bg-slate-300 text-red-700"
            onClick={(e) => handleDelete(e)}
          ></i>
          <i
            className="fas fa-ellipsis-v text-blue-700 cursor-pointer h-fit p-1.5 rounded-full hover:bg-slate-300"
            onClick={(e) => toggleDropDown(e)}
          ></i>
          {dropDown && (
            <div className="origin-top-right absolute bottom-0 right-6 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
              <div
                class="py-1 flex flex-col"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <button
                  className="px-4 relative py-2 text-xs md:text-sm text-gray-700 hover:bg-slate-200 w-full flex flex-row justify-between items-center"
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDropDown(false);
                    setRenameFile(true)
                  }}
                >
                  <span>Rename</span>
                  <i
                    className={`fas fa-pen text-xs text-slate-700 absolute right-3`}
                  ></i>
                </button>
                <button
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-slate-100 w-full flex flex-row justify-between items-center border-b"
                  role="menuitem"
                  onClick={(e) => handleDownload(e, item)}
                >
                  <span>Download</span>
                  <i className="fas fa-download text-xs text-blue-500"></i>
                </button>
                <button
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-slate-100 w-full flex flex-row justify-between items-center text-left"
                  role="menuitem"
                  onClick={(e) => handleFav(e, item.name)}
                >
                  <span>
                    {(item.isFavorite === false) | undefined
                      ? "Add to favorites"
                      : "Remove from favorites"}
                  </span>
                  <i
                    className={`fas fa-star text-xs ${
                      item.isFavorite === true ? "favorite" : ""
                    }`}
                  ></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
