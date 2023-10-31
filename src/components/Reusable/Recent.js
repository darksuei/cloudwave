import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

//Assets & Components
import "../../index.css";
import { SharePopUp } from "./SharePopUp";
import { ImagePreview } from "./ImagePreview";
import { LoadingScreen } from "./LoadingScreen";
import { LoadingContent } from "./LoadingContent";

export function Recent({
  title,
  showAll,
  category,
  SearchResults,
  padding,
  headerPadding,
  titleStyle,
}) {
  const [dropdownState, setDropdownState] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const [share, setShare] = useState(false);
  const [showPreview, setShowPreview] = useState([]);
  const [blob, setBlob] = useState([]);
  const [link, setLink] = useState("");
  const [fav, setFav] = useState("");
  const [loading, setLoading] = useState(true);
  const [renameFile, setRenameFile] = useState(false);
  const [newName, setNewName] = useState("");
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const authToken = Cookies.get("authToken");

  let api;

  if (category) {
    api = `${process.env.REACT_APP_SERVER_URL}/api/files/${category}`;
  } else {
    api = `${process.env.REACT_APP_SERVER_URL}/api/files`;
  }

  //Handle Resize
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Fn to slice data name
  function itemName(item) {
    if (viewportWidth < 500) {
      if (item.name.length < 11) return item.name;
      return item.name.slice(0, 14) + "...";
    } else {
      return item.name.length > 23 ? item.name.slice(0, 20) + "..." : item.name;
    }
  }

  //Handle data fetching
  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        try {
          const filesData = await getFiles(authToken);
          setLoading(false);
          if (filesData) {
            if (showAll === true) {
              setBlob(filesData);
            } else {
              setBlob(
                filesData.slice(-Math.min(5, filesData.length)).reverse()
              );
            }
          }
        } catch (error) {
          // Handle errors here
        }
      }
    };

    if (SearchResults) {
      setBlob(SearchResults);
      setLoading(false);
    } else if (authToken && !SearchResults) {
      fetchData();
    }
  }, []);

  //Fn to get files
  async function getFiles(authToken) {
    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data.files;
    } catch (error) {
      console.error("Files error:", error);
    }
  }

  //Fn to toggle preview
  const togglePreview = async (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownState(dropdownState.filter((itemIndex) => itemIndex !== item));

    if (showPreview.includes(item)) {
      setShowPreview(showPreview.filter((itemIndex) => itemIndex !== item));
    } else {
      setShowPreview([...showPreview, item]);
    }
  };

  //Remove any active dropdown or modal on document click
  useEffect(() => {
    function handleDocumentClick() {
      setDropdownState([]);
      setShowPreview([]);
    }
    document.body.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  //Fn to open & close dropdown
  function handleDropdownClick(index, e) {
    e.stopPropagation();
    if (dropdownState.includes(index)) {
      setDropdownState(
        dropdownState.filter((itemIndex) => itemIndex !== index)
      );
    } else {
      setDropdownState([...dropdownState, index]);
    }
  }

  //Fn to set share modal
  function handleShare(e, item) {
    e.preventDefault();
    e.stopPropagation();
    setShare(!share);
    setLink(item.link);
  }

  //Fn for auto download link
  function handleAutoDownloadShare(e, item) {
    e.preventDefault();
    e.stopPropagation();
    setShare(!share);
    setLink(item.autoDownloadLink);
  }

  //Fn to download file
  function handleDownload(e, item) {
    e.preventDefault();
    e.stopPropagation();
    setDropdownState([]);
    const base64ImageData = `data:image/jpeg;base64,${item.base64}`;

    const a = document.createElement("a");
    a.href = base64ImageData;
    a.download = item.name;
    a.click();
  }

  //Fn to rename file
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
        toast.success("Rename success!");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      toast.error("Rename failed");
    }
  };

  //Fn to delete file
  async function handleDelete(e, name) {
    setDropdownState([]);
    setLoadingScreen(true);
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/delete/${name}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        setBlob(data.filter((file) => file.name !== name));
        setLoadingScreen(false);
        toast.success("Delete success!");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  }

  //Update favorites
  useEffect(() => {
    const updateFavorites = async () => {
      try {
        await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/api/updatefav/${fav}`,
          {
            isFavorite: true,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    };
    if (fav) {
      updateFavorites();
    }
    return () => {};
  }, [fav]);

  //Fn to toggle favorites
  async function handleFav(e, item) {
    setLoadingScreen(true);
    e.preventDefault();
    e.stopPropagation();
    setFav(item.name);
    setDropdownState(dropdownState.filter((itemIndex) => itemIndex !== item));
    setLoadingScreen(false);
    window.location.reload();
  }

  return (
    <div
      className={`h-full flex gap-y-4 flex-col p-12 ${
        padding ? padding : "px-0 md:px-4"
      } md:px-12 py-4 w-full`}
      id="recents"
    >
      {loadingScreen && <LoadingScreen />}
      {share && (
        <SharePopUp isOpen={share} link={link} width={"w-11/12 md:w-4/12"} />
      )}
      <h1
        className={`text-blue-700 text-xl font-extrabold ${
          titleStyle && titleStyle
        } ${headerPadding && headerPadding}`}
      >
        {title}
      </h1>
      <div className={`flex flex-col gap-y-2.5`}>
        {loading && <LoadingContent />}
        {blob.length > 0
          ? blob.map((item) => {
              return (
                <div
                  className={`flex flex-row justify-between bg-white p-2.5 rounded-xl items-center gap-x-1.5 pr-4 cursor-pointer hover:border hover:shadow-md noSelect`}
                  onClick={(e) => togglePreview(item, e)}
                  key={item.id}
                >
                  {showPreview.includes(item) && (
                    <div
                      className="fixed top-0 left-0 flex justify-center items-center w-full  z-50"
                      style={{ height: viewportHeight }}
                    >
                      <div
                        className={`flex p-5 md:p-8 bg-slate-400 w-11/12 md:w-9/12 relative h-4/6 md:h-5/6 rounded-xl border`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <button
                          className="absolute top-1 right-1 md:top-2 md:right-2 text-white"
                          onClick={(e) => {
                            togglePreview(item, e);
                          }}
                        >
                          <i className="fas fa-times-circle text-red-700 text-lg rounded-full"></i>
                        </button>
                        <ImagePreview item={item} />
                      </div>
                    </div>
                  )}
                  <div className="bg-indigo-500 p-2 rounded-lg w-9 h-9 flex items-center justify-center">
                    <i
                      className={`fas ${
                        item.icon ? item.icon : "fa-file-alt"
                      } text-white text-sm`}
                    ></i>
                  </div>
                  {renameFile === true ? (
                    <input
                      type="text"
                      className="w-8/12 md:w-10/12 text-sm md:text-base text-slate-700 font-bold p-2"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      autoFocus
                      onBlur={() => setRenameFile(false)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          setDropdownState([]);
                          handleRename(e, item.name);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex flex-row w-9/12 justify-between items-center">
                      <h2
                        className={`break-all md:break-normal w-9/12 p-2 text-sm md:text-md`}
                      >
                        {itemName(item)}
                      </h2>
                      <div
                        className="px-1 rounded-full hover:bg-gray-200 hover:bg-slate-100"
                        onClick={(e) => handleShare(e, item)}
                      >
                        <i className="fas fa-share-alt text-indigo-500 cursor-pointer"></i>
                      </div>
                    </div>
                  )}
                  <div
                    className={`${
                      showPreview.includes(item) ? " " : "relative"
                    } w-2/12 text-right`}
                  >
                    <button
                      type="button"
                      className="inline-flex items-center p-1 focus:outline-none hover:bg-gray-100 hover:bg-slate-100 rounded-2xl"
                      onClick={(e) => handleDropdownClick(item, e)}
                    >
                      <i className="fas fa-ellipsis-h text-indigo-500 text-lg z-10"></i>
                    </button>
                    {dropdownState.includes(item) && (
                      <div className="origin-top-right absolute right-0 mt-2 w-36 md:w-40 rounded-md shadow-lg bg-slate-300 ring-1 ring-black ring-opacity-5 z-50">
                        <div
                          className="py-1 flex flex-col"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <button
                            className="px-4 relative py-2 text-xs md:text-sm text-gray-700 hover:bg-slate-200 w-full flex flex-row justify-between items-center border-b"
                            role="menuitem"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setDropdownState(
                                dropdownState.filter(
                                  (itemIndex) => itemIndex !== item
                                )
                              );
                              setRenameFile(true);
                            }}
                          >
                            <span>Rename</span>
                            <i
                              className={`fas fa-pen text-xs text-slate-700 absolute right-3`}
                            ></i>
                          </button>
                          <button
                            className="px-4 py-2 relative text-xs md:text-sm text-gray-700 hover:bg-slate-200 w-full flex flex-row justify-between items-center border-b"
                            role="menuitem"
                            onClick={(e) => handleDownload(e, item)}
                          >
                            <span>Download</span>
                            <i className="fas fa-download text-xs text-blue-500 absolute right-3"></i>
                          </button>
                          <button
                            className="px-4 relative py-2 text-xs md:text-sm text-gray-700 hover:bg-slate-200 w-full flex flex-row justify-between items-center border-b text-left"
                            role="menuitem"
                            onClick={(e) => handleFav(e, item)}
                          >
                            <span>
                              {(item.isFavorite === false) | undefined
                                ? "Add to favorites"
                                : "Remove from favorites"}
                            </span>
                            <i
                              className={`fas fa-star text-sm  absolute right-2.5 ${
                                item.isFavorite === true
                                  ? "text-amber-500"
                                  : "text-white"
                              }`}
                            ></i>
                          </button>
                          <button
                            className="px-4 relative py-2 text-xs md:text-sm text-gray-700 hover:bg-slate-200 w-full flex flex-row justify-between items-center border-b"
                            role="menuitem"
                            onClick={(e) => handleDelete(e, item.name)}
                          >
                            <span>Delete</span>
                            <i
                              className={`fas fa-trash text-xs text-red-700 absolute right-3`}
                            ></i>
                          </button>
                          <button
                            className="px-4 relative py-2 text-xs md:text-sm text-gray-700 hover:bg-slate-200 w-full flex flex-row justify-between items-center"
                            role="menuitem"
                            onClick={(e) => handleAutoDownloadShare(e, item)}
                          >
                            <span className="text-left">
                              Auto Download Link
                            </span>
                            <i className="fas fa-link text-xs text-blue-500 absolute right-3"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          : !loading && (
              <div className="text-xl md:text-2xl pt-6 text-center text-slate-400">
                No {category ? category : "files"}{" "}
                {category === "audio" && "files"} found..
              </div>
            )}
      </div>
    </div>
  );
}
