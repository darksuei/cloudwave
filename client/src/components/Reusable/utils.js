import React, { useState, useEffect, useContext } from 'react';
import '../../index.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FavoritesContext } from '../../Contexts/FavoritesContext';

export default function DragDrop(){
    const [highlight, setHighlight] = useState(false);
    const [authToken, setAuthToken] = useState(Cookies.get('authToken'));

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

    const handleFileUpload = async (e) => {
        e.preventDefault();
        let files;
        e.dataTransfer !== undefined ? (files = e.dataTransfer.files) : (files = e.target.files);
        
        const formData = new FormData(); // Create FormData object
        
        // Append each file to the FormData object
        for (let file of files) {
            formData.append('files', file);
        }
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${authToken}`, 
            },
            });
            if (response.status === 201){
                setTimeout(() => {
                    window.location.reload();
                }, 500)
            }
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    return(
        <div className={`flex flex-col w-10/12 md:w-9/12 py-11 items-center bg-white border-dashed border border-gray-500 cursor-pointer hover:transform hover:scale-105 hover:border-none hover:rounded-lg transition-transform duration-300 ${highlight ? ' border-2 border-blue-500 ' : ''}`}
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
                    <i className="fas fa-upload text-indigo-500 text-3xl"></i>
                    <p className='text-gray-400 text-sm font-semibold'>Drag and drop files here or <a href='/upload' className='underline font-black text-md'>Upload</a></p>
            </div>
        </div>
    )
}

export function Avatar ({size}){
    const [userImage, setUserImage] = useState('');
    function handleImageChange(e) {
        e.preventDefault();
        alert('Image upload feature coming soon!')
        // let reader = new FileReader();
        // let file = e.target.files[0];
        // reader.onloadend = () => {
        //   setUserImage(reader.result);
        // };
        // reader.readAsDataURL(file);
      }
    return(
        <div className='flex justify-center items-center py-5 relative'>
            <div className='relative rounded-full' onClick={(e)=>handleImageChange(e)}>
                <i className={`fas fa-user-circle ${size} text-white rounded-full bg-slate-400 cursor-pointer`}></i>
                <div className='rounded-full bg-black p-1 absolute right-0 bottom-1 flex items-center justify-center opacity-70'><i className='fas fa-pen text-gray-100 text-xs cursor-pointer opoacity-100'></i></div>
            </div>
        </div>    
    )
}

export function Categories(props) {
    const [count, setCount] = useState({
        pictures: 0,
        videos: 0,
        audio: 0,
        documents: 0
    });
    const [authToken, setAuthToken] = useState(Cookies.get('authToken'));
    const [favorites, setFavorites] = useState([]);
    const FavCategory = useContext(FavoritesContext);
    const [showInput, setShowInput] = useState(false);
    const [categories, setCategories] = useState([
        { icon: 'fas fa-image', color: 'bg-indigo-500', title: 'Pictures', count: count.pictures, iconColor: 'text-indigo-500', href: '/files/pictures' },
        { icon: 'fas fa-video', color: 'bg-red-500', title: 'Videos', count: count.videos, iconColor: 'text-red-500', href: '/files/videos'  },
        { icon: 'fas fa-headphones', color: 'bg-sky-600', title: 'Audio', count: count.audio, iconColor: 'text-sky-600', href: '/files/audio' },
        { icon: 'fas fa-file-alt', color: 'bg-emerald-500', title: 'Documents', count: count.documents, iconColor: 'text-emerald-500', href: '/files/documents' },
        { color: 'bg-gray-100', noIcons : true }
    ]);
    let countUrl;
    props.favs ? countUrl = `${process.env.REACT_APP_SERVER_URL}/api/file/count?favorites=true` : countUrl = `${process.env.REACT_APP_SERVER_URL}/api/file/count`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const counts = await getCount(authToken);
                setCount(counts);
                setCategories(prev => {prev[0].count = counts.pictures;
                    prev[1].count = counts.videos; 
                    prev[2].count = counts.audio; 
                    prev[3].count = counts.documents; 
                    return prev;});
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        if (authToken) {
            fetchData();
        }
        return ()=>{};
    }, [authToken]);

    const getCount = async (authToken) => {
        try {
          const response = await axios.get(countUrl , {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          return response.data.categories;
        } catch (error) {
          console.error('Files error:', error);
        }
      };

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
        updatedCategories.splice(categories.length - 1, 0, { icon: 'fas fa-folder-open', color: 'bg-emerald-500', title: value, count: 0, iconColor: 'text-emerald-500', isFavorite: false });
        setCategories(updatedCategories);
        setShowInput(false);
    }
    function toggleInput(e){
        e.preventDefault();
        e.stopPropagation();
        setShowInput(!showInput);
    }

    const toggleFavorite = (item,index,e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const updatedCategoryData = categories.map(cat =>
            cat === item ? { ...cat, isFavorite: true } : cat
          );

        setCategories(updatedCategoryData);
        const updatedFavs = categories.filter(cat => cat.isFavorite === true)
        FavCategory.setFavoriteCategory(updatedFavs);
        Cookies.set('favoriteCategory', JSON.stringify(updatedFavs), { expires: 1 });

        if (favorites.includes(index)) {
            setFavorites(favorites.filter(itemIndex => itemIndex !== index));
        } else {
            setFavorites([...favorites, index]);
        }
    };
    
    return (
        <div className='flex flex-col p-3 bg-gray-200 rounded-xl w-full md:w-full gap-y-2.5'>
            {props.title}
            <div className={props.style} id='snap-x-mandatory'> 
                {categories.map((category, index) => (
                    (!props.checkFav || (props.checkFav && favorites.includes(index))) && (
                            <a href={category.href || '/files'} key={index} className={`rounded-xl w-11/12 lg:w-10/12 cursor-pointer ${category.color} hover:transform hover:scale-105 transition-transform duration-300`}>
                        {category.noIcons ? (
                           <div className='flex justify-center items-center w-40 md:w-full h-28 rounded--xl'
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
                            <div className='w-40 md:w-full flex flex-row items-center p-3.5'>
                                <div className='flex gap-y-1.5 flex-col w-8/12 h-20'>
                                    <i className={`${category.icon} ${category.iconColor} bg-white p-2 rounded-full w-fit text-md`}></i>
                                    <div className='text-white font-bold text-sm'>{category.title}</div>
                                    <div className='text-xs text-gray-200 w-full'>{category.count} files</div>
                                </div>
                                <i
                                    className={`fas fa-star white text-lg ml-4 cursor-pointer ${favorites.includes(index) ? 'favorite' : ''} ${props.favs ? 'favorite' : ''}`}
                                    onClick={(e) => toggleFavorite(category,index,e)}
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
