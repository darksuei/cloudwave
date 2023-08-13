import React, { useState,useEffect } from 'react';
import SharePopUp from './SharePopUp';

export default function ImagePreview({ imageUrl,fileCategory, uploadDate }){
  const [dropDown, setDropDown] = useState(false);
  const [share, setShare] = useState(false);

  function handleShare(e){
    e.preventDefault();
    e.stopPropagation();
    setShare(!share);
  }
  function toggleDropDown(e){
    e.stopPropagation();
    setDropDown(!dropDown);
  };
  useEffect(() => {
    function handleDocumentClick() {
      setDropDown(false);
    }
    document.body.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    }
  }, []);
  return (
    <div className=" relative z-50 flex flex-col w-full h-4/5">
      {share && (
                <SharePopUp toggle={handleShare} width={'w-6/12'}/>
            )}
        <div className="relative h-full flex items-center justify-center">
          <img src={imageUrl} alt="Preview" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '0.5rem' }}/>
        </div>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col gap-y-3 py-3'>
            <h1 className="text-blue-500 font-black text-lg">IMG_1</h1>
            <p className="text-xs text-gray-400">{uploadDate}</p>
            <div className='text-sm bg-emerald-100 text-emerald-500 flex items-center rounded-xl px-4'>{fileCategory}</div>
          </div>
          <div className='relative flex flex-row gap-x-3 py-3'>
            <i className="fas fa-share-alt text-blue-700 cursor-pointer h-fit p-1.5 rounded-full hover:bg-slate-200" onClick={(e)=>handleShare(e)}></i>
            <i className="fas fa-trash text-blue-700 cursor-pointer h-fit p-1.5 rounded-full hover:bg-slate-200"></i>
            <i className="fas fa-ellipsis-v text-blue-700 cursor-pointer h-fit p-1.5 rounded-full hover:bg-slate-200" onClick={(e)=>toggleDropDown(e)}></i>
            {dropDown && (
                                <div className="origin-top-right absolute bottom-0 right-6 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                    <div class="py-1 flex flex-col" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <button class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-slate-100 w-full flex flex-row justify-between items-center border-b" role="menuitem">
                                            <span>Download</span>
                                            <i class="fas fa-download text-xs"></i>
                                        </button>
                                        <button class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:bg-slate-100 w-full flex flex-row justify-between items-center" role="menuitem">
                                            <span>Rename</span>
                                            <i class="fas fa-edit text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                              )}
          </div>
        </div>
    </div>
  );
};
