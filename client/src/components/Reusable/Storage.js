import React, { useState, useEffect } from 'react';
import '../../index.css';

export default function Storage() {
    const [usedSpace, setUsedSpace] = useState(8);

    useEffect(() => {
        updateLoadingBar(usedSpace);
    }, [usedSpace]);

    const updateLoadingBar = (usedSpace) => {
        const loadingBar = document.querySelector(".loading-bar");

        if (loadingBar !== null) {
            const progress = (usedSpace / 100) * 100;
            loadingBar.style.width = `${progress}%`;
        }
    };

    return (
        <div className="flex flex-col bg-gray-200 rounded-xl w-full p-3 gap-y-3">
            <div className='text-sm flex flex-row justify-between'>
                <h1 className='text-blue-500 font-semibold'>Your Storage</h1>
                <p className='text-emerald-500'>{100 - usedSpace}% left</p>
            </div>
            <div className='text-xs text-blue-500'>{usedSpace} GB OF 100 GB USED</div>
            <div className="loading-bar-container">
                <div className="loading-bar"></div>
            </div>
        </div>
    );
}
