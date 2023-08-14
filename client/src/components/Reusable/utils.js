import React, { useState, useEffect } from 'react';
import '../../index.css';

export default function DragDrop(){
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [highlight, setHighlight] = useState(false);

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

    const handleFileUpload = (e) => {
        let files;
        e.dataTransfer !== undefined ? files = e.dataTransfer.files : files = e.target.files 
        const newUploadedFiles = [...uploadedFiles];
    
        for (let file of files) {
          newUploadedFiles.push(file);
        }
    
        setUploadedFiles(newUploadedFiles);
      };

      useEffect(() => {
        console.log(uploadedFiles);
      },[uploadedFiles]);

    return(
        <div className={`flex flex-col w-9/12 py-11 items-center bg-white border-dashed border border-gray-500 cursor-pointer hover:transform hover:scale-105 hover:border-none hover:rounded-lg transition-transform duration-300 ${highlight ? ' border-2 border-blue-500 ' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <div>
                <div className="loading-bar-container">
                    <div className="loading-bar"></div>
                </div>
            </div>
                <div className='flex flex-col justify-center items-center gap-y-4'>
                    <i className="fas fa-upload text-gray-500 text-3xl"></i>
                    <p className='text-gray-400 text-sm font-semibold'>Drag and drop files here</p>
            </div>
        </div>
    )
}

export function Avatar ({size}){
    const [userImage, setUserImage] = useState('');
    function handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
          setUserImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    return(
        <div className='flex justify-center items-center py-5 relative'>
            <div className='relative rounded-full' onClick={(e)=>handleImageChange(e)}>
                <i className={`fas fa-user-circle ${size} text-white rounded-full bg-slate-400 cursor-pointer`}></i>
                <div className='rounded-full bg-blue-500 p-1 absolute right-0 bottom-1 flex items-center justify-center'><i className='fas fa-pen text-gray-200 text-xs cursor-pointer'></i></div>
            </div>
        </div>    
    )
}

export function Categories(props) {
    const categoryData = [
        { icon: 'fas fa-image', color: 'bg-indigo-500', title: 'Pictures', count: 427, iconColor: 'text-indigo-500' },
        { icon: 'fas fa-file-alt', color: 'bg-emerald-500', title: 'Documents', count: 139, iconColor: 'text-emerald-500' },
        { icon: 'fas fa-video', color: 'bg-red-500', title: 'Videos', count: 63, iconColor: 'text-red-500' },
        { icon: 'fas fa-headphones', color: 'bg-sky-600', title: 'Audio', count: 6, iconColor: 'text-sky-600' },
        { color: 'bg-gray-100', noIcons : true }
    ];
    const [favorites, setFavorites] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [categories, setCategories] = useState(categoryData);

    useEffect(() => {
        function handleDocumentClick() {
          setShowInput(false);
        }
        document.body.addEventListener("click", handleDocumentClick);
    
        return () => {
          document.removeEventListener("click", handleDocumentClick);
        };
      }, []);

    function toggleNewCategory(value){
        let updatedCategories = [...categories];
        updatedCategories.splice(categories.length - 1, 0, { icon: 'fas fa-folder-open', color: 'bg-emerald-500', title: value, count: 0, iconColor: 'text-emerald-500' });
        setCategories(updatedCategories);
        setShowInput(false);
    }
    function toggleInput(e){
        e.preventDefault();
        e.stopPropagation();
        setShowInput(!showInput);

    }

    const toggleFavorite = (index,e) => {
        e.preventDefault();
        e.stopPropagation();
        if (favorites.includes(index)) {
            setFavorites(favorites.filter(itemIndex => itemIndex !== index));
        } else {
            setFavorites([...favorites, index]);
        }
    };
    
    return (
        <div className='flex flex-col p-3 bg-gray-200 rounded-xl w-full gap-y-2.5'>
            {props.title}
            <div className={props.style}>
                {categories.map((category, index) => (
                    (!props.checkFav || (props.checkFav && favorites.includes(index))) && (
                            <a href='/files' key={index} className={`rounded-xl ${props.elementWidth? props.elementWidth : 'w-9/12'} cursor-pointer ${category.color} hover:transform hover:scale-105 transition-transform duration-300`}>
                        {category.noIcons ? (
                           <div className='flex justify-center items-center w-full h-28 rounded--xl'
                           onClick={(e)=>toggleInput(e)}>
                            {showInput ? (
                                <div className='w-full p-3 h-full'>
                                    <input type='text' className='w-full p-2 text-xs' placeholder='Enter title' onClick={(e)=>{e.stopPropagation(); e.preventDefault()}}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          toggleNewCategory(e.target.value);
                                        }
                                      }} />
                                </div>
                            ) : (
                             <i
                                className={`fas fa-plus text-gray-400 text-lg cursor-pointer`}
                            ></i>)
                            }
                           </div>)
                         : (
                            <div className='flex flex-row items-center p-3.5'>
                                <div className='flex gap-y-1.5 flex-col w-8/12 h-20'>
                                    <i className={`${category.icon} ${category.iconColor} bg-white p-2 rounded-full w-fit text-md`}></i>
                                    <div className='text-white font-bold text-sm'>{category.title}</div>
                                    <div className='text-xs text-gray-200 w-full'>{category.count} files</div>
                                </div>
                                <i
                                    className={`fas fa-star white text-lg ml-4 cursor-pointer ${favorites.includes(index) ? 'favorite' : ''}`}
                                    onClick={(e) => toggleFavorite(index,e)}
                                ></i>
                            </div>
                        )}
                    </a>
                    )
                ))}
            </div>
        </div>
    );
    
};
