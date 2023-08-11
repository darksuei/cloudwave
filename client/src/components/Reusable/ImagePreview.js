import React, { useState } from 'react';

export default function ImagePreview({ imageUrl,fileCategory, uploadDate }){

  return (
    <div className="flex flex-col w-full h-4/5">
        <div className="relative h-full flex items-center justify-center">
          <img src={imageUrl} alt="Preview" style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '0.5rem' }}/>
        </div>
        <div className='flex flex-row justify-between'>
          <div className='flex flex-col gap-y-3 p-3'>
            <h1 className="text-blue-500 font-black text-lg">IMG_1</h1>
            <p className="text-xs text-gray-400">{uploadDate}</p>
            <div className='text-sm bg-emerald-100 text-emerald-500 flex items-center rounded-xl px-4'>{fileCategory}</div>
          </div>
          <div className='flex flex-row gap-x-3 p-3'>
            <i className="fas fa-share-alt text-blue-700 cursor-pointer h-fit p-1.5 rounded-full hover:bg-slate-200"></i>
            <i className="fas fa-trash text-blue-700 cursor-pointer h-fit p-1.5 rounded-full hover:bg-slate-200"></i>
            <i className="fas fa-ellipsis-v text-blue-700 cursor-pointer h-fit p-1.5 rounded-full hover:bg-slate-200"></i>
          </div>
        </div>
    </div>
  );
};
