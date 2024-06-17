import { useState } from "react";
import { UploadFiles } from "./UploadFiles";
import { UploadContext } from "../../contexts";

export function UploadMain() {
  const [uploads, setUploads] = useState([]);
  return (
    <UploadContext.Provider value={{ uploads, setUploads }}>
      <div className='w-full mt-6 md:w-10/12 flex flex-col gap-y-5 bg-slate-300 items-center p-5 md:p-10'>
        <UploadFiles />
        {/* <UploadProgress /> */}
      </div>
    </UploadContext.Provider>
  );
}
