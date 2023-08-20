import { useState, useEffect, useContext } from 'react';
import { UploadContext } from '../../Contexts/UploadContext';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function UploadFiles(){

    const [highlight, setHighlight] = useState(false);
    const [authToken, setAuthToken] = useState(Cookies.get('authToken'));
    const Uploads = useContext(UploadContext);

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

    const handleFileUpload = async (e) => {
      e.preventDefault();
      
      let files;
      e.dataTransfer !== undefined ? (files = e.dataTransfer.files) : (files = e.target.files);
      
      const formData = new FormData();
      
      // Append each file to the FormData object
      for (let file of files) {
        formData.append('files', file);
        console.log(file)
        Uploads.setUploads([...Uploads.uploads, file]);
      }
    
      try {
        const response = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`, 
          },
        });
        console.log('Upload success:', response.data);
      } catch (error) {
        console.error('Upload error:', error);
      }
    };
    useEffect(() => {
      console.log("UPLOADS: ", Uploads.uploads)
    },[Uploads.uploads])

    return (
        <div className="flex flex-col p-4 items-center bg-white w-7/12 rounded-lg gap-y-5">
            <h1 className="text-2xl text-blue-500 font-black py-2">Upload Files</h1>
            <div className={`flex flex-col w-11/12 py-11 items-center bg-slate-200 rounded-lg cursor-pointer hover:transform hover:scale-105 transition-transform duration-300
            ${highlight ? ' border-2 border-blue-500 ' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
                <div className='flex flex-col justify-center items-center gap-y-7 text-blue-500 '>
                    <i className="fas fa-cloud-upload-alt text-4xl"></i>
                    <div className="flex flex-col gap-y-2.5 items-center">
                        <p className='text-sm font-extrabold'>Drag and drop your files here</p>
                        <p className="text-xs text-gray-500">or</p>
                        <button className="text-sm border-current border py-2.5 px-7 rounded-lg hover:bg-blue-500 hover:text-white relative overflow-hidden">
                        <span className="relative z-10">Choose a file from your computer</span>
                        <input
                            type="file"
                            className="bg-black absolute top-0 left-0 w-full h-full z-20 opacity-0 cursor-pointer"
                            name="file"
                            onChange={handleFileUpload}
                            multiple
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}