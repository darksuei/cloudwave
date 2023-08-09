import React, { useState } from 'react';
import '../../index.css';

export default function DragDrop(){
    return(
        <div className='flex flex-col w-9/12 py-11 items-center bg-white border-dashed border-2 border-gray-500 cursor-pointer'>
            <div className='flex flex-col justify-center items-center gap-y-4'>
                <i className="fas fa-upload text-gray-500 text-3xl"></i>
                <p className='text-gray-400 text-sm font-semibold'>Drag and drop files here</p>
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

export function Categories(props) {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (index) => {
        if (favorites.includes(index)) {
            setFavorites(favorites.filter(itemIndex => itemIndex !== index));
        } else {
            setFavorites([...favorites, index]);
        }
    };

    const categoryData = [
        { icon: 'fas fa-image', color: 'bg-indigo-500', title: 'Pictures', count: 427, iconColor: 'text-indigo-500' },
        { icon: 'fas fa-file-alt', color: 'bg-emerald-500', title: 'Documents', count: 139, iconColor: 'text-emerald-500' },
        { icon: 'fas fa-video', color: 'bg-red-500', title: 'Videos', count: 63, iconColor: 'text-red-500' },
        { icon: 'fas fa-headphones', color: 'bg-sky-600', title: 'Audio', count: 6, iconColor: 'text-sky-600' },
        { color: 'bg-gray-100', noIcons : true }
    ];
    
    return (
        <div className='flex flex-col p-3 bg-gray-200 rounded-xl w-full gap-y-2.5'>
            {props.title}
            <div className={props.style}>
                {categoryData.map((category, index) => (
                    (!props.checkFav || (props.checkFav && favorites.includes(index))) && (
                        <div key={index} className={`rounded-xl p-3.5 flex flex-row ${props.elementWidth? props.elementWidth : 'w-9/12'} items-center cursor-pointer ${category.color}`}>
                        {category.noIcons ? (
                           <div className='flex justify-center items-center w-full h-20'>
                             <i
                                className={`fas fa-plus text-gray-400 text-lg cursor-pointer ${favorites.includes(index) ? 'favorite' : ''}`}
                                onClick={() => toggleFavorite(index)}
                            ></i>
                           </div>
                        ) : (
                            <>
                                <div className='flex gap-y-1.5 flex-col w-8/12 h-20'>
                                    <i className={`${category.icon} ${category.iconColor} bg-white p-2 rounded-full w-fit text-md`}></i>
                                    <div className='text-white font-bold text-sm'>{category.title}</div>
                                    <div className='text-xs text-gray-200 w-full'>{category.count} files</div>
                                </div>
                                <i
                                    className={`fas fa-star white text-lg ml-4 cursor-pointer ${favorites.includes(index) ? 'favorite' : ''}`}
                                    onClick={() => toggleFavorite(index)}
                                ></i>
                            </>
                        )}
                    </div>
                    )
                ))}
            </div>
        </div>
    );
    
};
