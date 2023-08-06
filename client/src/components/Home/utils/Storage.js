import '../../../index.css';
export default function Storage() {
    return (
        <div className="flex flex-col bg-gray-200 rounded-xl w-full p-3 gap-y-3">
            <div className='text-sm flex flex-row justify-between'>
                <h1 className='text-blue-500 font-semibold' >Your Storage</h1>
                <p className='text-emerald-600'>20% left</p>
            </div>
            <div className='text-xs text-blue-500'>0 GB OF 100 GB USED</div>
            <div class="loading-bar-container">
                <div class="loading-bar">{updateLoadingBar(0, 100)}</div>
            </div>
        </div>
    )
}

function updateLoadingBar(usedSpace, totalSpace) {
    const loadingBar = document.querySelector(".loading-bar");
    if(loadingBar !== null) {
        const progress = (usedSpace / totalSpace) * 100;
        loadingBar.style.width = `${progress}%`;
    }
}