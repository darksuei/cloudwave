import { useState, useEffect } from "react";
import ImagePreview from "../Reusable/ImagePreview";
import Loading from "../Reusable/Loading";
import Cloudwavehome from "../../assets/Cloudwavehome.jpeg";
import axios from "axios";
import Cookies from "js-cookie";

export default function FavFiles() {
  const [data, setData] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const getData = async (authToken) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/favorites`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      return response.data.favs;
    } catch (error) {
      console.error("Files error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const favsData = await getData(authToken);
        if (favsData) {
          setData(favsData);
          setLoading(false);
        }
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
        <div className="flex p-8 bg-white absolute w-11/12 md:w-9/12 h-4/6 rounded-xl top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 border">
          <button
            className="absolute top-2 right-2 text-white"
            onClick={togglePreview}
          >
            <i className="fas fa-times-circle text-red-700 text-xl rounded-full"></i>
          </button>
          <ImagePreview
            imageUrl={Cloudwavehome}
            fileCategory={"Personal"}
            uploadDate={"JUNE 1, 2022"}
            togglePreview={togglePreview}
          />
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
              <div className="text-xl md:text-2xl pt-6 text-center text-slate-400">
                No favorite files..
              </div>
            )
        ) : (
          data.map((item, idx) => {
            return (
              <div
                className="flex flex-col bg-white p-3 rounded-lg w-9/12 md:w-1/5 gap-y-1.5 hover:transform hover:scale-110 transition-transform duration-300 cursor-pointer"
                key={idx}
                onClick={() => togglePreview()}
              >
                <div className="h-24 w-full flex items-center justify-center bg-slate-200">
                  <i className="fas fa-image text-gray-500 text-3xl"></i>
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
