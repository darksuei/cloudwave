import axios from "axios";
import { useState, useEffect } from "react";
import { ImagePreview, LoadingScreen } from "../components/Reusable";
import { toast } from "sonner";

export function GeneralPreview() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const location = window.location.pathname;
    const encrypted = location.split("/")[2];
    const url = process.env.REACT_APP_SERVER_URL + `/api/decryptfile/${encrypted}`;
    axios
      .get(url)
      .then((res) => {
        setData(res.data.file);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch file. Please try again later.");
      });
  }, []);

  return (
    <div className='bg-slate-300 w-full h-screen'>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div className='fixed top-0 left-0 flex justify-center items-center w-full h-screen z-50'>
          <div
            className={`flex p-5 md:p-8 bg-slate-400 w-11/12 md:w-9/12 relative h-4/6 md:h-5/6 rounded-xl border`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <ImagePreview showImg={false} item={data} />
          </div>
        </div>
      )}
    </div>
  );
}
