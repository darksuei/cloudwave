import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useState } from "react";
// import { UploadContext } from "../../contexts";
import { LoadingScreen } from "../Reusable";
import "../../index.css";

export function UploadFiles() {
  const authToken = Cookies.get("authToken");
  // const Uploads = useContext(UploadContext);
  const [highlight, setHighlight] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  // const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setHighlight(true);
  };

  const handleDragLeave = () => {
    setHighlight(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setHighlight(false);
    handleFileUpload(e);
  };

  const getCategory = (file) => {
    const filetype = file.type.split("/")[1];

    const categories = {
      image: ["jpg", "jpeg", "png", "gif"],
      music: ["mp3", "wav", "ogg"],
      video: ["mp4", "avi", "mov", "mkv"],
      "file-alt": ["pdf", "doc", "docx", "txt"],
    };

    for (const category in categories) {
      if (categories[category].includes(filetype)) {
        return category;
      }
    }

    return "document";
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    setLoadingScreen(true);
    let files;
    e.dataTransfer !== undefined ? (files = e.dataTransfer.files) : (files = e.target.files);

    const formData = new FormData();

    // Append each file to the FormData object
    for (let file of files) {
      formData.append("files", file);
      // file.category = getCategory(file);
      // setUploadedFiles((prev) => [...prev, file]);
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.status === 201 || response.status === 200) {
        toast.success("Upload successful!");
        // Uploads.setUploads((prev) => [...prev, ...uploadedFiles]);
      } else {
        toast.error("Failed to upload file!");
      }
    } catch (error) {
      toast.error("Failed to upload file!");
    }
    setLoadingScreen(false);
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className='flex flex-col p-4 items-center bg-white w-full md:w-8/12 lg:w-7/12 rounded-lg gap-y-5'>
      {loadingScreen && <LoadingScreen />}
      <h1 className='text-xl md:text-2xl text-blue-600 font-black py-1 md:py-2'>Upload Files</h1>
      <div
        className={`flex flex-col w-full md:w-11/12 py-11 items-center bg-slate-200 rounded-lg noSelect
            ${highlight ? " border-2 border-blue-500 " : ""}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className='flex flex-col justify-center items-center gap-y-7 text-blue-500 '>
          <i className='fas fa-cloud-upload-alt text-4xl'></i>
          <div className='flex flex-col gap-y-2.5 items-center'>
            <p className='text-sm font-extrabold'>Drag and drop your files here</p>
            <p className='text-xs text-gray-500'>or</p>
            <button className='cursor-pointer w-10/12 md:w-fit text-xs md:text-sm border-current border py-2.5 px-7 hover:bg-blue-500 hover:text-white hover:w-11/12 md:hover:w-full relative overflow-hidden'>
              <span className='relative z-10 hidden md:block'>Choose a file from your device</span>
              <span className='relative z-10 block md:hidden'>Select file</span>
              <input
                type='file'
                className='bg-black absolute top-0 left-0 w-full h-full z-20 opacity-0 cursor-pointer'
                name='file'
                onChange={handleFileUpload}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
