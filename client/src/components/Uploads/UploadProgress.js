import '../../index.css';
import { useState, useEffect, useContext } from 'react';
import { UploadContext } from '../../Contexts/UploadContext';

export default function UploadProgress(){
    const [loaded, setLoaded] = useState(100);
    const [data, setData] = useState([]);
    const Uploads = useContext(UploadContext);

    useEffect(() => {
        setData(Uploads.uploads);
        return () => {};
    }, [Uploads.uploads]);

    return (
        data.length >= 1 && <div className="bg-white w-full md:8/12 lg:w-7/12 flex items-center flex-col rounded-xl p-7 gap-y-5">
        <div className='text-blue-700 flex flex-row items-center gap-x-3'>
            <h1 className='font-black text-md'>Uploaded</h1>
        </div>
        {data.map((file, index) => {
            return <div className='bg-slate-200 flex flex-row gap-x-3 w-full md:w-11/12 justify-between p-3 rounded-lg items-center cursor-pointer hover:transform hover:scale-105 transition-transform duration-300' key={index}>
                <div className='bg-emerald-500 rounded-lg p-2.5 flex items-center'>
                    <i className={`fas ${file.category === 'document' ? 'fa-file-alt': 'fa-'+file.category} text-white md:text-md text-sm`}></i>
                </div>
                <div className='flex flex-col w-10/12 justify-center gap-y-3 h-full'>
                    <div className='flex flew-row items-center justify-between'>
                        <div className='flex flex-row gap-x-2 items-center'>
                            <h3 className='text-blue-700 text-sm'>{file.name}</h3>
                        </div>
                        <p className='text-xs text-slate-400'>{ Math.round(file.size/1024) < ( 1024*1024 ) ? `${Math.round(file.size/1024)} KB` : `${Math.round(file.size/(1024*1024))} MB` }</p>
                    </div>
                    <div className="loading-bar-container">
                        <div className="loading-bar" style={{ width: `${loaded}%` }}></div>
                    </div>
                </div>
                <div className='p-1.5 flex items-center'>
                    <i className='fas fa-check text-emerald-600 text-xl'></i>
                </div>
            </div>
        })}
    </div>
    )
}