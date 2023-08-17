// import data from '../../data';
import '../../index.css';
import { useState, useEffect } from 'react';
import SharePopUp from './SharePopUp';
import ImagePreview from './ImagePreview';
import Cloudwavehome from '../../assets/Cloudwavehome.jpeg';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Recent({title}){
    const [dropdownState, setDropdownState] = useState([]);
    const [share,setShare] = useState(false);
    const [showPreview, setShowPreview] = useState([]);
    const [previewItemUrl, setPreviewItemUrl] = useState('');
    const [authToken, setAuthToken] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
      const authToken = Cookies.get('authToken');
      console.log('Token from cookie:', authToken);
      setAuthToken(authToken);
      const filesData = getFiles(authToken);
            setData(filesData);
    }, []);

    const getFiles = async (authToken) => {
        try {
          const response = await axios.get('http://localhost:5000/api/files', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          console.log('Files:', response.data.files);
          return response.data.files;
        } catch (error) {
          console.error('Files error:', error);
        }
      };
    
    const togglePreview = (item,e) => {
        e.preventDefault();
        e.stopPropagation();
        setPreviewItemUrl(Cloudwavehome);
        if (showPreview.includes(item)) {
            setShowPreview(showPreview.filter(itemIndex => itemIndex !== item));
        } else {
        setShowPreview([...showPreview, item]);
        }
};

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
    
    function handleDropdownClick(index,e) {
    e.stopPropagation();
    if (dropdownState.includes(index)) {
        setDropdownState(dropdownState.filter(itemIndex => itemIndex !== index));
        } else {
        setDropdownState([...dropdownState, index]);
        } 
    }
    function handleShare(e){
        e.preventDefault();
        e.stopPropagation();
        setShare(!share);
      }

    return(
        <div className={`h-full flex gap-y-4 flex-col p-12 py-4 w-full`}>
            {share && (
                <SharePopUp toggle={handleShare} width={'w-4/12'}/>
            )}
            <h1 className='text-blue-700 text-xl font-extrabold'>{title}</h1> 
            <div className={`flex flex-col gap-y-2.5`}>
            {data.map((item) => {
                return(
                    <div className='flex flex-row justify-between bg-white p-2.5 rounded-xl items-center gap-x-1.5 pr-4 cursor-pointer hover:border hover:shadow-md' onClick={(e)=>togglePreview(item,e)} key={item.id}>
                        {showPreview.includes(item) && ( 
                            <div className='absolute top-0 left-0 flex justify-center items-center w-full h-screen'>
                                <div className={`flex p-8 bg-slate-100 w-9/12 relative h-5/6 rounded-xl border`} onClick={(e)=>{e.stopPropagation()}}>
                                <button className="absolute top-2 right-2 text-white" onClick={(e)=>{togglePreview(item,e)}}>
                                    <i className="fas fa-times-circle text-red-700 text-xl rounded-full"></i>
                                </button>
                                <ImagePreview imageUrl={previewItemUrl} fileCategory={'Personal'} uploadDate={'JUNE 1, 2022'}/>
                            </div></div>
                        )}
                        <div className='bg-indigo-500 p-2 rounded-lg w-9 h-9 flex items-center justify-center'><i className="fas fa-image text-white text-sm"></i></div>
                        <div className='flex flex-row w-9/12 justify-between items-center'>
                            <h2 className='w-4/12 p-2'>{item.name}</h2>
                            <p className='text-gray-400 text-sm'>{item.time}</p>
                            <div className='px-1 rounded-full hover:bg-gray-200 hover:bg-slate-100' onClick={(e)=>handleShare(e)}><i className="fas fa-share-alt text-indigo-500 cursor-pointer"></i></div>
                        </div>
                        <div className={`${showPreview.includes(item)? ' ': 'relative'} w-2/12 text-right`}>
                            <button
                                type="button"
                                className="inline-flex items-center p-1 focus:outline-none hover:bg-gray-100 hover:bg-slate-100"
                                onClick={(e) => handleDropdownClick(item,e)}
                            >
                                <i className="fas fa-ellipsis-h text-indigo-500 text-lg"></i>
                            </button>
                            {dropdownState.includes(item) && (
                                <div className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                    <div class="py-1 flex flex-col" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <button class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-slate-100 w-full flex flex-row justify-between items-center border-b" role="menuitem">
                                            <span>Download</span>
                                            <i class="fas fa-download text-xs"></i>
                                        </button>
                                        <button class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-slate-100 w-full flex flex-row justify-between items-center border-b" role="menuitem">
                                            <span>Rename</span>
                                            <i class="fas fa-edit text-xs"></i>
                                        </button>
                                        <button class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-slate-100 w-full flex flex-row justify-between items-center" role="menuitem">
                                            <span>Delete</span>
                                            <i class="fas fa-trash text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}