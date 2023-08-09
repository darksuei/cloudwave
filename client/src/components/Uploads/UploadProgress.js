import '../../index.css';
import { useState, useEffect } from 'react';

export default function UploadProgress(props){
    const [loaded, setLoaded] = useState(45);

    useEffect(() => {
        updateLoadingBar(loaded);
    }, [loaded]);

    const updateLoadingBar = (loaded) => {
        const loadingBar = document.querySelector(".loading-bar");

        if (loadingBar !== null) {
            const progress = loaded;
            loadingBar.style.width = `${progress}%`;
        }
    };
    return (
        <div className="bg-white w-7/12 flex items-center flex-col rounded-xl p-7 gap-y-5">
            <div className='text-blue-700 flex flex-row items-center gap-x-3'>
                <i className='fas fa-spinner loading-spinner'></i>
                <h1 className='font-black text-md'>Upload progress</h1>
            </div>
            <div className='bg-slate-200 flex flex-row w-11/12 justify-between p-3 rounded-lg items-center cursor-pointer'>
                <div className='bg-emerald-500 rounded-lg p-2.5 flex items-center'>
                    <i className='fas fa-music text-white'></i>
                </div>
                <div className='flex flex-col w-10/12 justify-center gap-y-3 h-full'>
                    <div className='flex flew-row items-center justify-between'>
                        <h3 className='text-blue-700 text-sm'>Hello.mp3</h3>
                        <p className='text-xs text-slate-400'>1.2 MB</p>
                    </div>
                    <div className="loading-bar-container">
                        <div className="loading-bar"></div>
                    </div>
                </div>
                <div className='p-1.5 flex items-center'>
                    <i className='fas fa-times text-blue-400 text-2xl'></i>
                </div>
            </div>
        </div>
    )
}