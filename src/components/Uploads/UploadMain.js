import UploadFiles from "./UploadFiles";
import UploadProgress from "./UploadProgress";
import { UploadContext } from "../../Contexts/UploadContext";
import { useState } from "react";

export default function UploadMain() {
  const [uploads, setUploads] = useState([]);
  return (
    <UploadContext.Provider value={{ uploads, setUploads }}>
      <div className="w-full mt-6 md:w-10/12 flex flex-col gap-y-5 bg-slate-200 items-center p-5 md:p-10">
        <UploadFiles />
        {/* <UploadProgress /> */}
      </div>
    </UploadContext.Provider>
  );
}
