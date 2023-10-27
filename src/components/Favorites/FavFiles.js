import { useState, useEffect } from "react";
import { ImagePreview, Loading } from "../Reusable";
import axios from "axios";
import Cookies from "js-cookie";

export function FavFiles() {
  const [data, setData] = useState([]);
  const [showPreview, setShowPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const authToken = Cookies.get("authToken");

  const togglePreview = (e, item) => {
    e.stopPropagation();
    setShowPreview(item);
  };

  const getData = async (authToken) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/favorites`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setLoading(false);
      return response.data.favs;
    } catch (error) {
      console.error("Files error:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    document.addEventListener("click", (e) => {
      setShowPreview(null);
    });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", (e) => {
        setShowPreview(null);
      });
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favsData = await getData(authToken);
        if (favsData) {
          setData(favsData);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    if (authToken) {
      fetchData();
    }
    return () => {};
  }, [authToken]);

  return (
    <div className={`w-full p-2.5`}>
      {showPreview && (
        <div
          className="fixed top-0 left-0 flex justify-center items-center w-full z-50"
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
                setShowPreview(null);
              }}
            >
              <i className="fas fa-times-circle text-red-700 text-lg rounded-full"></i>
            </button>
            <ImagePreview item={showPreview} favorite={true} />
          </div>
        </div>
      )}
      <h1 className="text-blue-500 font-black text-xl md:text-2xl py-3">
        Favorite Files
      </h1>
      <div className="flex flex-row w-full gap-x-8 flex-wrap gap-y-7 justify-center md:justify-start">
        {data.length === 0 ? (
          loading ? (
            <div className="w-full flex items-center justify-center h-12">
              <Loading />
            </div>
          ) : (
            <div className="text-xl md:text-2xl pt-6 text-center text-slate-400 w-full">
              No favorite files..
            </div>
          )
        ) : (
          data.map((item, idx) => {
            return (
              <div
                className="flex flex-col bg-white p-3 rounded-lg w-9/12 md:w-1/5 gap-y-1.5 hover:transform hover:scale-110 transition-transform duration-300 cursor-pointer"
                key={idx}
                onClick={(e) => togglePreview(e, item)}
              >
                <div className="h-24 w-full flex items-center justify-center bg-slate-200">
                  <i className="fas fa-file-alt text-gray-500 text-3xl"></i>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-col gap-y-1.5">
                    <h3 className="text-indigo-500 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                  <i className="fas fa-star text-amber-500 mr-3"></i>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
