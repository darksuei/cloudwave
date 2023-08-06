import '../../../index.css';
export default function DragDrop(){
    return(
        <div className='flex flex-col w-9/12 py-11 items-center bg-white border-dashed border-2 border-indigo-500 cursor-pointer'>
            <div className='flex flex-col justify-center items-center gap-y-4'>
                <i className="fas fa-upload text-indigo-500 text-3xl"></i>
                <p className='text-gray-400 text-sm text-indigo-500'>Drag and drop files here</p>
            </div>
        </div>
    )
}

export function Avatar (){
    return(
        <div className='flex justify-center items-center py-5 '>
            <i className="fas fa-user-circle text-6xl text-white rounded-full bg-slate-400 cursor-pointer"></i>
        </div>    
    )
}
export function Categories(){
    return(
        <div className='flex flex-col p-3 bg-gray-200 rounded-lg w-full'>
            <h2 className='text-lg p-2 text-indigo-500'>Categories</h2>
            <div className='flex flex-col items-center justify-center gap-y-2.5'>
                <div className='bg-indigo-500 rounded-xl p-3.5 flex flex-row w-8/12 items-center cursor-pointer'>
                    <div className='flex gap-y-1.5 flex-col w-8/12'>
                        <i className="fas fa-image text-indigo-500 bg-white p-1.5 rounded-full w-fit text-sm"></i>
                        <div className='text-white font-bold text-sm'>Pictures</div>
                        <div className='text-xs text-gray-200 w-full'>427 files</div>
                    </div>
                    <i className="fas fa-star white text-lg ml-4 cursor-pointer" id='fav'></i>
                </div>
                <div className='bg-emerald-500 rounded-xl p-3.5 flex flex-row w-8/12 items-center cursor-pointer'>
                    <div className='flex gap-y-1.5 flex-col w-8/12'>
                        <i className="fas fa-file-alt text-indigo-500 bg-white p-1.5 rounded-full w-fit text-sm"></i>
                        <div className='text-white font-bold text-sm'>Documents</div>
                        <div className='text-xs text-gray-200 w-full'>139 files</div>
                    </div>
                    <i className="fas fa-star white text-lg ml-4 cursor-pointer" id='fav'></i>
                </div>
                <div className='bg-red-500 rounded-xl p-3.5 flex flex-row w-8/12 items-center cursor-pointer'>
                    <div className='flex gap-y-1.5 flex-col w-8/12'>
                        <i className="fas fa-video text-indigo-500 bg-white p-1.5 rounded-full w-fit text-sm"></i>
                        <div className='text-white font-bold text-sm'>Videos</div>
                        <div className='text-xs text-gray-200 w-full'>63 files</div>
                    </div>
                    <i className="fas fa-star white text-lg ml-4 cursor-pointer" id='fav'></i>
                </div>
                <div className='bg-sky-600 rounded-xl p-3.5 flex flex-row w-8/12 items-center cursor-pointer'>
                    <div className='flex gap-y-1.5 flex-col w-8/12'>
                        <i className="fas fa-headphones text-indigo-500 bg-white p-1.5 rounded-full w-fit text-sm"></i>
                        <div className='text-white font-bold text-sm'>Audio</div>
                        <div className='text-xs text-gray-200 w-full'>6 files</div>
                    </div>
                    <i className="fas fa-star white text-lg ml-4 cursor-pointer" id='fav'></i>
                </div>
            </div>
        </div>
        
    )
}

const favButtons = document.querySelectorAll('#fav');

favButtons.forEach((button) => {
    button.addEventListener('click', () => {
      button.classList.toggle('favorite');
    });
  });