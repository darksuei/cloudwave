import axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import "../../index.css";

export function Categories(props) {
  const [count, setCount] = useState({
    pictures: 0,
    videos: 0,
    audio: 0,
    documents: 0,
  });
  const authToken = Cookies.get("authToken");
  const [favorites, setFavorites] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [categories, setCategories] = useState([
    {
      icon: "fas fa-image",
      color: "bg-sky-600",
      title: "Pictures",
      count: count.pictures,
      iconColor: "text-sky-600",
      href: "/files/pictures",
    },
    {
      icon: "fas fa-video",
      color: "bg-sky-600",
      title: "Videos",
      count: count.videos,
      iconColor: "text-sky-600",
      href: "/files/videos",
    },
    {
      icon: "fas fa-headphones",
      color: "bg-sky-600",
      title: "Audio",
      count: count.audio,
      iconColor: "text-sky-600",
      href: "/files/audio",
    },
    {
      icon: "fas fa-file-alt",
      color: "bg-sky-600",
      title: "Documents",
      count: count.documents,
      iconColor: "text-sky-600",
      href: "/files/documents",
    },
    // { color: "bg-gray-100", noIcons: true },
  ]);

  let countUrl;
  props.favs
    ? (countUrl = `${process.env.REACT_APP_SERVER_URL}/api/file/count?favorites=true`)
    : (countUrl = `${process.env.REACT_APP_SERVER_URL}/api/file/count`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const counts = await getCount(authToken);
        if (counts) {
          setCount(counts);
          setCategories((prev) => {
            prev[0].count = counts.pictures;
            prev[1].count = counts.videos;
            prev[2].count = counts.audio;
            prev[3].count = counts.documents;
            return prev;
          });
        }
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    if (authToken) {
      fetchData();
    }
    return () => {};
  }, [authToken]);

  const getCount = async (authToken) => {
    try {
      const response = await axios.get(countUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data.categories;
    } catch (error) {
      console.error("Files error:", error);
    }
  };

  useEffect(() => {
    function handleDocumentClick() {
      setShowInput(false);
    }
    document.body.addEventListener("click", handleDocumentClick);

    if (props.favs) {
      setCategories(categories.filter((category) => category.noIcons !== true));
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  //Fn to add new category
  function toggleNewCategory(value) {
    let updatedCategories = [...categories];
    updatedCategories.splice(categories.length - 1, 0, {
      icon: "fas fa-folder-open",
      color: "bg-emerald-500",
      title: value,
      count: 0,
      iconColor: "text-emerald-500",
      isFavorite: false,
    });
    setCategories(updatedCategories);
    setShowInput(false);
  }

  //Fn to toggle input
  function toggleInput(e) {
    e.preventDefault();
    e.stopPropagation();
    setShowInput(!showInput);
  }

  //Fn to change fav
  const toggleFavorite = (item, index, e) => {
    e.preventDefault();
    e.stopPropagation();

    const updatedCategoryData = categories.map((cat) => (cat === item ? { ...cat, isFavorite: true } : cat));

    setCategories(updatedCategoryData);
    if (favorites.includes(index)) {
      setFavorites(favorites.filter((itemIndex) => itemIndex !== index));
    } else {
      setFavorites([...favorites, index]);
    }
  };

  return (
    <div className={`flex flex-col p-3 ${props.bg || "bg-gray-200"} rounded-xl w-full md:w-full gap-y-2.5`}>
      {props.title}
      <div className={`${props.style}`}>
        {categories.map(
          (category, index) =>
            (!props.checkFav || (props.checkFav && favorites.includes(index))) && (
              <a
                href={category.href || "/files"}
                key={index}
                className={`rounded-xl w-11/12 lg:w-10/12 cursor-pointer ${category.color} hover:transform hover:scale-105 transition-transform duration-300 noSelect`}
              >
                {category.noIcons ? (
                  !props.favs && (
                    <div
                      className='flex justify-center items-center w-40 md:w-full h-28 rounded--xl'
                      onClick={(e) => toggleInput(e)}
                    >
                      {showInput ? (
                        <div className='w-full p-3 h-full'>
                          <input
                            type='text'
                            className='w-full p-2 text-xs'
                            placeholder='Enter title'
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                toggleNewCategory(e.target.value);
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <i className={`fas fa-plus text-gray-400 text-lg cursor-pointer`}></i>
                      )}
                    </div>
                  )
                ) : (
                  <div className='w-40 md:w-full flex flex-row items-center p-3.5 lg:px-5'>
                    <div className='flex gap-y-1.5 flex-col w-8/12 h-20'>
                      <i
                        className={`${category.icon} ${category.iconColor} bg-white p-2 rounded-full w-fit text-md`}
                      ></i>
                      <div className='text-white font-bold text-xs md:text-sm'>{category.title}</div>
                      <div className='text-xs text-gray-200 w-full italic'>
                        {category.count > 1 && category.count + " files"}
                        {category.count === 1 && category.count + " file"}
                        {category.count === 0 && "Empty"}
                      </div>
                    </div>
                    <i
                      className={`fas fa-star white text-lg ml-4 cursor-pointer ${
                        favorites.includes(index) ? "favorite" : ""
                      } ${props.favs ? "favorite" : ""}`}
                      onClick={(e) => toggleFavorite(category, index, e)}
                    ></i>
                  </div>
                )}
              </a>
            )
        )}
      </div>
    </div>
  );
}
