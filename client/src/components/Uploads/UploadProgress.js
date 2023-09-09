import "../../index.css";
import { useState, useEffect, useContext } from "react";
import { UploadContext } from "../../Contexts/UploadContext";

export default function UploadProgress() {
  const [loaded, setLoaded] = useState(100);
  const [data, setData] = useState([]);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const Uploads = useContext(UploadContext);

  useEffect(() => {
    setData(Uploads.uploads);
    return () => {};
  }, [Uploads.uploads]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    }
    document.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('resize', handleResize);
    }
  })

  function itemName(item) {
    if (viewportWidth < 500) {
      if (item.name.length < 11) return item.name;
      return item.name.slice(0, 11) + "...";
    } else {
      return item.name.slice(0, 20) + "...";
    }
  }

  return (
    data.length >= 1 && (
      <div className="bg-white w-full md:8/12 lg:w-7/12 flex items-center flex-col rounded-xl p-4 md:p-7 gap-y-5">
        <div className="text-blue-600 flex flex-row items-center gap-x-3">
          <h1 className="font-black text-lg">Uploaded</h1>
        </div>
        {data.map((file, index) => {
          return (
            <div
              className="bg-slate-200 flex flex-row gap-x-3 w-full md:w-11/12 justify-between p-3 rounded-lg items-center cursor-pointer"
              key={index}
            >
              <div className="bg-emerald-500 rounded-lg p-2.5 flex items-center">
                <i
                  className={`fas ${
                    file.category === "document"
                      ? "fa-file-alt"
                      : "fa-" + file.category
                  } text-white md:text-md text-sm`}
                ></i>
              </div>
              <div className="flex flex-col w-10/12 justify-center gap-y-3 h-full">
                <div className="flex flew-row items-center justify-between">
                  <div className="flex flex-row gap-x-2 items-center">
                    <h3 className="text-blue-700 text-sm inline">{itemName(file)}</h3>
                  </div>
                  <p className="text-xs text-slate-400">
                    {Math.round(file.size / 1024) < 1024 * 1024
                      ? `${Math.round(file.size / 1024)} KB`
                      : `${Math.round(file.size / (1024 * 1024))} MB`}
                  </p>
                </div>
                <div className="loading-bar-container">
                  <div
                    className="loading-bar"
                    style={{ width: `${loaded}%` }}
                  ></div>
                </div>
              </div>
              <div className="p-1.5 flex items-center border border-slate-400 rounded-lg">
                <i className="fas fa-check text-emerald-600 text-xl"></i>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
}
