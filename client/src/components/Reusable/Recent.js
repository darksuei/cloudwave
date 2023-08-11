import data from '../../data';
import '../../index.css';
import { useState, useEffect } from 'react';
 

export default function Recent({title}){
    const [dropdownState, setDropdownState] = useState([]);

    useEffect(() => {
        function handleDocumentClick() {
          setDropdownState([]);
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

    return(
        <div className=' flex gap-y-4 flex-col p-12 py-4 w-full'>
            <h1 className='text-blue-700 text-xl font-extrabold'>Recently {title}</h1>
            <div className='flex flex-col gap-y-2.5'>
            {Object.values(data).map((item,idx) => {
                return(
                    <div className='flex flex-row bg-white p-2.5 rounded-xl items-center gap-x-1.5 pr-4 relative cursor-pointer'>
                        <div className='bg-indigo-500 p-2 rounded-lg w-9 h-9 flex items-center justify-center'><i className="fas fa-image text-white text-sm"></i></div>
                        <div className='flex flex-row w-9/12 justify-between items-center'>
                            <h2 className='w-4/12 p-2'>{item.image}</h2>
                            <p className='text-gray-400 text-sm'>{item.when}</p>
                            <div><i className="fas fa-share-alt text-indigo-500 cursor-pointer"></i></div>
                        </div>
                        <div className="absolute right-5 inline-block">
                            <button
                                type="button"
                                className="inline-flex items-center p-1 focus:outline-none"
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